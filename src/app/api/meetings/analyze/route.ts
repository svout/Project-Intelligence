// app/api/meetings/analyze/route.ts
// Analyze meeting transcript with AI

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { analyzeMeetingTranscript, detectRecurringPatterns, createRecurringInsightAlert } from '@/lib/ai/analyzeMeeting';
import type { AnalyzeMeetingResponse } from '@/types/meetings';

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    const supabase = await createClient();

    // Get authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { meeting_id } = body;

    if (!meeting_id) {
      return NextResponse.json(
        { error: 'meeting_id is required' },
        { status: 400 }
      );
    }

    // Fetch meeting
    const { data: meeting, error: meetingError } = await supabase
      .from('meetings')
      .select('*')
      .eq('id', meeting_id)
      .eq('user_id', user.id)
      .single();

    if (meetingError || !meeting) {
      return NextResponse.json(
        { error: 'Meeting not found' },
        { status: 404 }
      );
    }

    if (!meeting.transcript) {
      return NextResponse.json(
        { error: 'Meeting has no transcript to analyze' },
        { status: 400 }
      );
    }

    if (meeting.processed) {
      return NextResponse.json(
        { error: 'Meeting already processed' },
        { status: 400 }
      );
    }

    // Mark processing started
    await supabase
      .from('meetings')
      .update({
        processing_started_at: new Date().toISOString(),
      })
      .eq('id', meeting_id);

    // Analyze with AI
    const analysis = await analyzeMeetingTranscript(
      meeting.transcript,
      meeting.title,
      meeting.participants
    );

    // Fetch historical insights for recurrence detection
    const { data: historicalInsights } = await supabase
      .from('ai_insights')
      .select('title, type')
      .eq('user_id', user.id)
      .eq('status', 'open')
      .limit(100);

    // Detect recurring patterns for each insight type
    const allNewInsights = [
      ...analysis.blockers,
      ...analysis.followUps,
      ...analysis.risks,
    ];

    const recurrenceCounts = await detectRecurringPatterns(
      allNewInsights,
      historicalInsights || []
    );

    let insightsCreated = 0;

    // Helper to create insights
    const createInsights = async (
      insights: any[],
      type: string
    ) => {
      for (const insight of insights) {
        const recurrenceCount = recurrenceCounts.get(insight.title) || 1;
        
        // Create enhanced insight if recurring
        const insightData = recurrenceCount > 1
          ? createRecurringInsightAlert(insight, recurrenceCount)
          : insight;

        const { error } = await supabase.from('ai_insights').insert({
          meeting_id: meeting.id,
          user_id: user.id,
          project_id: meeting.project_id,
          type,
          severity: insightData.severity || 'medium',
          title: insightData.title,
          description: insightData.description,
          suggested_action: insightData.suggestedAction,
          transcript_excerpt: insightData.transcriptExcerpt,
          mentioned_people: insightData.mentionedPeople || [],
          status: 'open',
          recurrence_count: recurrenceCount,
          first_seen_meeting_id: meeting.id,
          last_seen_meeting_id: meeting.id,
        });

        if (!error) {
          insightsCreated++;
        }
      }
    };

    // Create insights for each type
    await createInsights(analysis.blockers, 'blocker');
    await createInsights(analysis.followUps, 'followup');
    await createInsights(analysis.decisions, 'decision');
    await createInsights(analysis.risks, 'risk');
    await createInsights(analysis.taskMentions, 'task_mention');

    // Update meeting as processed
    await supabase
      .from('meetings')
      .update({
        processed: true,
        processing_completed_at: new Date().toISOString(),
        ai_summary: analysis.summary,
        ai_metadata: {
          insights_count: insightsCreated,
          analysis_version: '1.0',
        },
      })
      .eq('id', meeting_id);

    const processingTime = Date.now() - startTime;

    const response: AnalyzeMeetingResponse = {
      meeting_id,
      insights_created: insightsCreated,
      processing_time_ms: processingTime,
    };

    return NextResponse.json({
      data: response,
      message: `Successfully analyzed meeting and created ${insightsCreated} insights`,
    });
  } catch (error) {
    console.error('Meeting analysis error:', error);

    // Mark processing as failed
    try {
      const { meeting_id } = await request.json();
      const supabase = await createClient();
      
      await supabase
        .from('meetings')
        .update({
          processing_error: error instanceof Error ? error.message : 'Unknown error',
        })
        .eq('id', meeting_id);
    } catch (updateError) {
      console.error('Failed to update error state:', updateError);
    }

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to analyze meeting',
      },
      { status: 500 }
    );
  }
}
