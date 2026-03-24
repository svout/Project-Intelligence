import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import {
  analyzeMeeting,
  calculateRiskScore,
  extractInsights,
} from '@/lib/claude/client';
import {
  generateFollowups,
  linkFollowupsToTasks,
  calculateDeadline,
  filterByConfidence,
} from '@/services/aiFollowupService';
import type { AnalyzeMeetingRequest } from '@/types/followup';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: AnalyzeMeetingRequest = await request.json();
    const { transcript, meeting_id, project_id } = body;

    if (!transcript || !project_id) {
      return NextResponse.json(
        { error: 'Missing required fields: transcript, project_id' },
        { status: 400 },
      );
    }

    const { data: project } = await supabase
      .from('projects')
      .select('name, description')
      .eq('id', project_id)
      .single();

    const { data: tasks } = await supabase
      .from('tasks')
      .select('*')
      .eq('project_id', project_id);

    let meetingId = meeting_id;
    let meetingData;

    if (meeting_id) {
      const { data } = await supabase
        .from('meetings')
        .select('*')
        .eq('id', meeting_id)
        .single();
      meetingData = data;
    } else {
      const { data, error } = await supabase
        .from('meetings')
        .insert({
          project_id,
          title: 'Untitled Meeting',
          transcript,
          created_by: user.id,
          status: 'pending',
        })
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to create meeting: ${error.message}`);
      }
      meetingData = data;
      meetingId = data.id;
    }

    const meetingContext = {
      title: meetingData.title,
      participants: meetingData.participants || [],
      date: meetingData.meeting_date,
    };

    const analysis = await analyzeMeeting({
      transcript,
      projectContext: project || undefined,
      existingTasks: tasks || undefined,
      meetingContext,
    });

    const followupResult = await generateFollowups({
      transcript,
      projectContext: project || undefined,
      existingTasks: tasks || undefined,
      meetingContext,
    });

    const linkedFollowups = linkFollowupsToTasks(
      followupResult.followups,
      tasks || [],
    );

    const highConfidenceFollowups = filterByConfidence(linkedFollowups, 0.5);

    const { error: updateError } = await supabase
      .from('meetings')
      .update({
        analysis: {
          ...analysis,
          followups: highConfidenceFollowups,
        } as any,
        status: 'analyzed',
      })
      .eq('id', meetingId);

    if (updateError) {
      throw new Error(`Failed to update meeting: ${updateError.message}`);
    }

    if (!meetingId) throw new Error('Meeting ID is required');
    const insights = extractInsights(analysis, project_id, meetingId);

    if (insights.length > 0) {
      const { error: insightsError } = await supabase
        .from('insights')
        .insert(insights);

      if (insightsError) {
        console.error('Error saving insights:', insightsError);
      }
    }

    const followupRecords = highConfidenceFollowups.map((followup) => {
      const matchedTask = tasks?.find(
        (t) =>
          followup.related_task &&
          (t.title.toLowerCase().includes(followup.related_task.toLowerCase()) ||
            followup.related_task.toLowerCase().includes(t.title.toLowerCase())),
      );

      return {
        project_id,
        meeting_id: meetingId,
        task_id: matchedTask?.id || null,
        type: followup.type,
        title: followup.title,
        description: followup.description,
        owner: followup.owner || null,
        priority: followup.priority,
        deadline: calculateDeadline(followup.deadline_type),
        deadline_type: followup.deadline_type || null,
        confidence_score: followup.confidence,
        ai_reasoning: followup.reasoning,
        status: 'open',
      };
    });

    let followupsCreated = 0;

    if (followupRecords.length > 0) {
      const { error: followupsError, data: createdFollowups } = await supabase
        .from('followups')
        .insert(followupRecords)
        .select();

      if (followupsError) {
        console.error('Error saving follow-ups:', followupsError);
      } else {
        followupsCreated = createdFollowups?.length || 0;
      }
    }

    if (analysis.next_meeting_agenda && analysis.next_meeting_agenda.length > 0) {
      const agendaItems = analysis.next_meeting_agenda.map((item) => ({
        project_id,
        title: item.title,
        description: item.description,
        priority: item.priority,
      }));

      const { error: agendaError } = await supabase
        .from('agenda_items')
        .insert(agendaItems);

      if (agendaError) {
        console.error('Error saving agenda items:', agendaError);
      }
    }

    const riskScore = calculateRiskScore(analysis);

    const { count: blockedCount } = await supabase
      .from('tasks')
      .select('*', { count: 'exact', head: true })
      .eq('project_id', project_id)
      .eq('status', 'blocked');

    let healthStatus: 'healthy' | 'at_risk' | 'critical' = 'healthy';
    if (riskScore > 0.7 || (blockedCount && blockedCount > 3)) {
      healthStatus = 'critical';
    } else if (riskScore > 0.4 || (blockedCount && blockedCount > 1)) {
      healthStatus = 'at_risk';
    }

    const { error: metricsError } = await supabase
      .from('project_metrics')
      .upsert(
        {
          project_id,
          risk_score: riskScore,
          health_status: healthStatus,
          blocked_tasks_count: blockedCount || 0,
          last_calculated: new Date().toISOString(),
        },
        {
          onConflict: 'project_id',
        },
      );

    if (metricsError) {
      console.error('Error updating metrics:', metricsError);
    }

    return NextResponse.json({
      success: true,
      data: {
        meeting_id: meetingId,
        analysis: {
          blockers: analysis.blockers,
          risks: analysis.risks,
          followups: highConfidenceFollowups,
          agenda: analysis.next_meeting_agenda,
          task_updates: analysis.task_updates,
          commitments: analysis.commitments,
          key_decisions: analysis.key_decisions,
        },
        followups_created: followupsCreated,
        insights_created: insights.length,
        risk_score: riskScore,
        health_status: healthStatus,
        summary: followupResult.summary,
      },
    });
  } catch (error) {
    console.error('Error analyzing meeting:', error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : 'Failed to analyze meeting',
      },
      { status: 500 },
    );
  }
}

