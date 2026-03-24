import Anthropic from '@anthropic-ai/sdk';
import type { Task } from '@/types';
import type { AIFollowup, FollowupAnalysisResult } from '@/types/followup';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export interface GenerateFollowupsParams {
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

export async function generateFollowups(
  params: GenerateFollowupsParams,
): Promise<FollowupAnalysisResult> {
  const { transcript, projectContext, existingTasks, meetingContext } = params;

  const taskContext = existingTasks
    ? `\n\nEXISTING PROJECT TASKS:\n${existingTasks
        .map(
          (task) =>
            `- ID: ${task.id}\n  Title: "${task.title}"\n  Status: ${
              task.status
            }\n  Priority: ${task.priority}${
              task.assigned_to ? `\n  Assigned to: ${task.assigned_to}` : ''
            }${
              task.blocked_reason ? `\n  Blocked: ${task.blocked_reason}` : ''
            }`,
        )
        .join('\n\n')}`
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

  const prompt = `You are an AI project assistant that creates actionable follow-ups from meeting discussions.

Your job is to analyze a meeting transcript and automatically generate follow-up actions, detect blockers, and track commitments.

${projectInfo}${meetingInfo}${taskContext}

MEETING TRANSCRIPT:
${transcript}

---

Analyze this meeting and generate follow-up actions in JSON format.

Your output must be ONLY valid JSON (no markdown, no code blocks) with this structure:

{
  "followups": [
    {
      "type": "blocker|commitment|action_item|clarification|deadline_reminder",
      "title": "Brief title (max 10 words)",
      "description": "Detailed description of what needs to be done",
      "owner": "Person's name or role mentioned in transcript (e.g., 'Sarah', 'backend developer')",
      "priority": "low|medium|high|critical",
      "deadline_type": "24h|48h|1week|end_of_sprint|custom",
      "related_task": "Task title from existing tasks if relevant, or null",
      "task_confidence": 0.0-1.0,
      "reasoning": "Why you created this follow-up",
      "confidence": 0.0-1.0,
      "quoted_context": "Exact quote from transcript that triggered this"
    }
  ],
  "summary": {
    "total_followups": 0,
    "blockers_count": 0,
    "commitments_count": 0,
    "high_priority_count": 0,
    "unassigned_count": 0
  }
}

FOLLOW-UP TYPES:

1. **blocker**: Something preventing progress (e.g., "Authentication bug blocking login flow")
   - Always high or critical priority
   - Link to related task if mentioned
   - Extract who is blocked and who can unblock

2. **commitment**: Someone committed to do something (e.g., "Mike will build the mock by Friday")
   - Include deadline if mentioned
   - Must have an owner
   - Medium to high priority

3. **action_item**: Something that needs to be done (e.g., "Test database migration in staging")
   - Clear actionable task
   - Assign owner if mentioned
   - Infer priority from context

4. **clarification**: Something unclear that needs discussion (e.g., "Team needs to decide on API versioning strategy")
   - Usually medium priority
   - May not have an owner yet

5. **deadline_reminder**: Existing deadline mentioned or at risk (e.g., "Production deployment Thursday - need DB migration tested")
   - High priority if deadline is soon
   - Link to task if applicable

RULES:

1. **Task Linking**: If a follow-up relates to an existing task, set "related_task" to the exact task title and confidence 0.7-1.0. Otherwise null.

2. **Owner Extraction**: 
   - Extract exact names from transcript (e.g., "Sarah", "Mike", "Bob")
   - If no name, use role (e.g., "backend developer", "DevOps", "Product team")
   - If unclear, leave null but note in reasoning

3. **Priority Assignment**:
   - critical: Blocks deployment, affects production, security issues
   - high: Blocks current sprint, affects multiple people, tight deadline
   - medium: Important but not urgent, can wait a few days
   - low: Nice to have, no immediate impact

4. **Deadline Inference**:
   - "by Friday" → end_of_sprint
   - "today/tonight" → 24h
   - "tomorrow" → 24h
   - "this week" → 1week
   - "before deployment" → 48h (if deployment mentioned as soon)
   - "next sprint" → end_of_sprint

5. **Confidence Scores**:
   - 0.9-1.0: Explicitly stated, clear owner and action
   - 0.7-0.9: Strongly implied, owner likely
   - 0.5-0.7: Inferred from context
   - <0.5: Don't create (too uncertain)

6. **Quoted Context**: Extract 1-2 sentences from transcript that led to this follow-up

QUALITY CHECKS:

- Only create follow-ups if confidence >= 0.5
- Every follow-up must have a clear, actionable description
- Don't create duplicate follow-ups for the same issue
- Prioritize blockers and commitments over vague action items
- If someone says "I'll do X", that's a commitment
- If something is "blocking" or "stuck", that's a blocker

OUTPUT:
Return ONLY the JSON object. No explanatory text.`;

  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      temperature: 0.2,
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

    const result: FollowupAnalysisResult = JSON.parse(responseText);

    result.context = {
      analyzed_at: new Date().toISOString(),
      model_used: 'claude-sonnet-4-20250514',
    };

    return result;
  } catch (error) {
    console.error('AI Follow-up Generation Error:', error);
    throw new Error(
      `Failed to generate follow-ups: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`,
    );
  }
}

export function linkFollowupsToTasks(
  followups: AIFollowup[],
  tasks: Task[],
): AIFollowup[] {
  return followups.map((followup) => {
    if (!followup.related_task || !tasks.length) {
      return followup;
    }

    const matchedTask = tasks.find(
      (task) =>
        task.title.toLowerCase().includes(followup.related_task!.toLowerCase()) ||
        followup.related_task!.toLowerCase().includes(task.title.toLowerCase()),
    );

    if (matchedTask) {
      followup.task_confidence = Math.min(
        (followup.task_confidence || 0) + 0.2,
        1.0,
      );
    }

    return followup;
  });
}

export function calculateDeadline(
  deadlineType?: '24h' | '48h' | '1week' | 'end_of_sprint' | 'custom',
): string | null {
  if (!deadlineType) return null;

  const now = new Date();

  switch (deadlineType) {
    case '24h':
      return new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString();
    case '48h':
      return new Date(now.getTime() + 48 * 60 * 60 * 1000).toISOString();
    case '1week':
      return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();
    case 'end_of_sprint': {
      const daysUntilFriday = ((5 - now.getDay() + 7) % 7) || 7;
      return new Date(
        now.getTime() + daysUntilFriday * 24 * 60 * 60 * 1000,
      ).toISOString();
    }
    default:
      return null;
  }
}

export function filterByConfidence(
  followups: AIFollowup[],
  minConfidence: number = 0.5,
): AIFollowup[] {
  return followups.filter((f) => f.confidence >= minConfidence);
}

export function groupFollowupsByType(followups: AIFollowup[]) {
  return {
    blockers: followups.filter((f) => f.type === 'blocker'),
    commitments: followups.filter((f) => f.type === 'commitment'),
    action_items: followups.filter((f) => f.type === 'action_item'),
    clarifications: followups.filter((f) => f.type === 'clarification'),
    deadline_reminders: followups.filter(
      (f) => f.type === 'deadline_reminder',
    ),
  };
}

