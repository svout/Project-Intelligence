// lib/ai/analyzeMeeting.ts
// AI Meeting Analysis with Claude

import Anthropic from '@anthropic-ai/sdk';
import type { AIAnalysisResult, InsightData } from '@/types/meetings';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

/**
 * Analyze meeting transcript with Claude AI
 */
export async function analyzeMeetingTranscript(
  transcript: string,
  meetingTitle: string,
  participants?: string[]
): Promise<AIAnalysisResult> {
  const participantsInfo = participants?.length
    ? `\nParticipants: ${participants.join(', ')}`
    : '';

  const prompt = `You are an AI assistant analyzing a project meeting transcript.

Meeting Title: ${meetingTitle}${participantsInfo}

TRANSCRIPT:
${transcript}

---

Analyze this meeting transcript and extract structured project intelligence.

Return ONLY valid JSON (no markdown, no code blocks) with this exact structure:

{
  "summary": "2-3 sentence summary of the meeting",
  "blockers": [
    {
      "title": "Brief title",
      "description": "What is blocking progress",
      "suggestedAction": "How to resolve it",
      "severity": "low|medium|high|critical",
      "mentionedPeople": ["person names"],
      "transcriptExcerpt": "Relevant quote from transcript"
    }
  ],
  "followUps": [
    {
      "title": "Action item title",
      "description": "What needs to be done",
      "suggestedAction": "Next steps",
      "mentionedPeople": ["person responsible"],
      "transcriptExcerpt": "Relevant quote"
    }
  ],
  "decisions": [
    {
      "title": "Decision made",
      "description": "What was decided and why",
      "suggestedAction": "How to implement",
      "transcriptExcerpt": "Relevant quote"
    }
  ],
  "risks": [
    {
      "title": "Risk title",
      "description": "What could go wrong",
      "suggestedAction": "Mitigation strategy",
      "severity": "low|medium|high|critical",
      "transcriptExcerpt": "Relevant quote"
    }
  ],
  "taskMentions": [
    {
      "title": "Task mentioned",
      "description": "Details about the task",
      "mentionedPeople": ["assigned person"],
      "transcriptExcerpt": "Relevant quote"
    }
  ]
}

EXTRACTION RULES:

1. BLOCKERS:
   - Anything explicitly preventing work from progressing
   - Look for keywords: "blocking", "blocked", "stuck", "can't proceed"
   - Severity: critical if blocking multiple people or critical path
   - Extract who is blocked and what is blocking them

2. FOLLOW-UPS:
   - Action items, commitments, things someone said they will do
   - Look for: "I will", "we need to", "let's", "should do"
   - Must have a clear owner if mentioned
   - Include deadlines if mentioned ("by Friday", "tomorrow")

3. DECISIONS:
   - Explicit choices made during the meeting
   - Look for: "we decided", "let's go with", "we'll use"
   - Include rationale if mentioned

4. RISKS:
   - Concerns, uncertainties, potential problems
   - Look for: "worried about", "might", "could be an issue"
   - Severity based on impact and probability

5. TASK MENTIONS:
   - Any work items discussed (not necessarily commitments)
   - Project tasks referenced
   - Features or bugs mentioned

QUALITY REQUIREMENTS:
- Be specific and actionable
- Extract exact quotes for context
- Identify people by name when mentioned
- Assign severity based on actual impact
- If nothing found for a category, return empty array

OUTPUT:
Return ONLY the JSON object, no explanatory text.`;

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

    const analysis: AIAnalysisResult = JSON.parse(responseText);

    return analysis;
  } catch (error) {
    console.error('AI Analysis Error:', error);
    throw new Error(
      `Failed to analyze meeting: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Detect recurring insights (Project Memory)
 */
export async function detectRecurringPatterns(
  newInsights: InsightData[],
  historicalInsights: Array<{ title: string; type: string }>
): Promise<Map<string, number>> {
  const recurrenceCounts = new Map<string, number>();

  for (const newInsight of newInsights) {
    const normalizedTitle = normalizeInsightTitle(newInsight.title);
    
    // Count how many times similar insights appeared before
    const similarCount = historicalInsights.filter(historical => {
      const historicalNormalized = normalizeInsightTitle(historical.title);
      return calculateSimilarity(normalizedTitle, historicalNormalized) > 0.7;
    }).length;

    if (similarCount > 0) {
      recurrenceCounts.set(newInsight.title, similarCount + 1);
    }
  }

  return recurrenceCounts;
}

/**
 * Normalize insight title for comparison
 */
function normalizeInsightTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .trim();
}

/**
 * Calculate similarity between two strings (simple approach)
 */
function calculateSimilarity(str1: string, str2: string): number {
  const words1 = new Set(str1.split(' '));
  const words2 = new Set(str2.split(' '));
  
  const intersection = new Set([...words1].filter(word => words2.has(word)));
  const union = new Set([...words1, ...words2]);
  
  return intersection.size / union.size;
}

/**
 * Generate enhanced insight for recurring issues
 */
export function createRecurringInsightAlert(
  insight: InsightData,
  occurrenceCount: number
): InsightData {
  return {
    title: `Recurring ${insight.title}`,
    description: `This issue has appeared in ${occurrenceCount} meetings. ${insight.description}`,
    suggestedAction: `ESCALATE: ${insight.suggestedAction || 'Allocate additional resources or escalate to leadership.'}`,
    severity: occurrenceCount >= 3 ? 'critical' : 'high',
    mentionedPeople: insight.mentionedPeople,
  };
}
