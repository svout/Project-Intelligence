import Anthropic from '@anthropic-ai/sdk';
import { MeetingAnalysis, Task } from '@/types';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export interface AnalyzeMeetingParams {
  transcript: string;
  projectContext?: {
    name: string;
    description?: string;
  };
  existingTasks?: Task[];
  meetingContext?: {
    title: string;
    participants: string[];
    date: string;
  };
}

export async function analyzeMeeting(
  params: AnalyzeMeetingParams,
): Promise<MeetingAnalysis> {
  const { transcript, projectContext, existingTasks, meetingContext } = params;

  const taskContext = existingTasks
    ? `\n\nEXISTING PROJECT TASKS:\n${existingTasks
        .map(
          (task) =>
            `- [${task.status.toUpperCase()}] ${task.title} (Priority: ${
              task.priority
            }${
              task.blocked_reason ? `, BLOCKED: ${task.blocked_reason}` : ''
            })`,
        )
        .join('\n')}`
    : '';

  const projectInfo = projectContext
    ? `\n\nPROJECT CONTEXT:\nName: ${projectContext.name}\nDescription: ${
        projectContext.description || 'N/A'
      }`
    : '';

  const meetingInfo = meetingContext
    ? `\n\nMEETING METADATA:\nTitle: ${meetingContext.title}\nDate: ${
        meetingContext.date
      }\nParticipants: ${meetingContext.participants.join(', ')}`
    : '';

  const prompt = `You are an AI project intelligence assistant analyzing a project meeting transcript.

Your goal is to extract actionable project insights including blockers, risks, task updates, and generate recommendations.

${projectInfo}${meetingInfo}${taskContext}

MEETING TRANSCRIPT:
${transcript}

---

Analyze this meeting transcript and provide a comprehensive project intelligence report in JSON format.

Return ONLY valid JSON (no markdown, no code blocks) with this exact structure:

{
  "summary": "A concise 2-3 sentence summary of the meeting",
  "blockers": [
    {
      "id": "unique-id",
      "title": "Brief blocker title",
      "description": "Detailed description of what is blocking progress",
      "affected_tasks": ["task titles or IDs mentioned"],
      "severity": "low|medium|high|critical",
      "owner": "Person responsible if mentioned",
      "suggested_resolution": "Recommended next steps"
    }
  ],
  "risks": [
    {
      "id": "unique-id",
      "title": "Risk title",
      "description": "What could go wrong and why",
      "probability": "low|medium|high",
      "impact": "low|medium|high",
      "category": "technical|resource|timeline|scope|external",
      "mitigation_strategy": "How to prevent or minimize this risk",
      "affected_areas": ["Which parts of the project are affected"]
    }
  ],
  "task_updates": [
    {
      "task_title": "Name of the task discussed",
      "previous_status": "Previous state if mentioned",
      "new_status": "Current state: todo|in_progress|blocked|done",
      "progress_percentage": 0-100,
      "notes": "Additional context about the update",
      "updated_by": "Person who provided the update"
    }
  ],
  "commitments": [
    {
      "id": "unique-id",
      "description": "What was committed to",
      "owner": "Person who made the commitment",
      "due_date": "ISO date if mentioned, else null",
      "type": "task|decision|deliverable"
    }
  ],
  "action_items": [
    {
      "id": "unique-id",
      "description": "What needs to be done",
      "owner": "Person responsible if mentioned",
      "priority": "low|medium|high",
      "due_date": "ISO date if mentioned, else null"
    }
  ],
  "next_meeting_agenda": [
    {
      "title": "Agenda item title",
      "description": "Why this should be discussed",
      "priority": "low|medium|high"
    }
  ],
  "key_decisions": [
    "Decision 1: What was decided and rationale",
    "Decision 2: ..."
  ]
}

ANALYSIS GUIDELINES:

1. BLOCKERS: Identify anything explicitly preventing work from progressing. Be specific about what is blocked and why.

2. RISKS: Look for concerns, uncertainties, dependencies, or potential problems mentioned. Assess both probability and impact.

3. TASK UPDATES: Extract any mentions of task progress, status changes, or completion. Cross-reference with existing tasks if provided.

4. COMMITMENTS: Capture promises made by team members to deliver something by a certain time.

5. ACTION ITEMS: Extract explicit next steps, todos, or follow-ups mentioned.

6. NEXT MEETING AGENDA: Based on unresolved issues, pending decisions, and upcoming milestones, suggest what should be discussed next.

7. KEY DECISIONS: Note any important choices made during the meeting.

IMPORTANT:
- Use IDs like "blocker-1", "risk-1", "commitment-1", etc.
- Be specific and actionable
- If a field is not applicable, use null or empty array
- Severity/priority should reflect actual impact on the project
- Extract names exactly as mentioned in the transcript
- Return ONLY the JSON object, no explanatory text`;

  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      temperature: 0.3,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const responseText = message.content
      .filter((block) => block.type === 'text')
      .map((block) => ('text' in block ? block.text : ''))
      .join('');

    const analysis: MeetingAnalysis = JSON.parse(responseText);

    return analysis;
  } catch (error) {
    console.error('Claude API Error:', error);
    throw new Error(
      `Failed to analyze meeting: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`,
    );
  }
}

export function calculateRiskScore(analysis: MeetingAnalysis): number {
  let score = 0;
  const maxScore = 100;

  const blockerScore = analysis.blockers.reduce((sum, blocker) => {
    const weights = { low: 5, medium: 10, high: 20, critical: 30 };
    return sum + weights[blocker.severity];
  }, 0);

  const riskScore = analysis.risks.reduce((sum, risk) => {
    const probWeights = { low: 1, medium: 2, high: 3 };
    const impactWeights = { low: 2, medium: 5, high: 10 };
    return sum + probWeights[risk.probability] * impactWeights[risk.impact];
  }, 0);

  score = Math.min(blockerScore + riskScore, maxScore);

  return Number((score / maxScore).toFixed(2));
}

export function extractInsights(
  analysis: MeetingAnalysis,
  projectId: string,
  meetingId: string,
) {
  const insights = [];

  for (const blocker of analysis.blockers) {
    insights.push({
      project_id: projectId,
      meeting_id: meetingId,
      type: 'blocker' as const,
      severity: blocker.severity,
      title: blocker.title,
      description: blocker.description,
      metadata: {
        affected_tasks: blocker.affected_tasks,
        owner: blocker.owner,
        suggested_resolution: blocker.suggested_resolution,
      },
      status: 'open' as const,
    });
  }

  for (const risk of analysis.risks) {
    if (risk.impact === 'high' || risk.probability === 'high') {
      insights.push({
        project_id: projectId,
        meeting_id: meetingId,
        type: 'risk' as const,
        severity:
          risk.impact === 'high' && risk.probability === 'high'
            ? ('critical' as const)
            : ('high' as const),
        title: risk.title,
        description: risk.description,
        metadata: {
          probability: risk.probability,
          impact: risk.impact,
          category: risk.category,
          mitigation_strategy: risk.mitigation_strategy,
          affected_areas: risk.affected_areas,
        },
        status: 'open' as const,
      });
    }
  }

  return insights;
}

