export interface Followup {
  id: string;
  project_id: string;
  meeting_id?: string;
  task_id?: string;

  type:
    | 'blocker'
    | 'commitment'
    | 'action_item'
    | 'clarification'
    | 'deadline_reminder';
  title: string;
  description: string;

  owner?: string;
  assigned_to?: string;

  priority: 'low' | 'medium' | 'high' | 'critical';
  deadline?: string;
  deadline_type?: '24h' | '48h' | '1week' | 'end_of_sprint' | 'custom';

  status: 'open' | 'in_progress' | 'completed' | 'dismissed' | 'blocked';
  completed_at?: string;

  confidence_score?: number;
  ai_reasoning?: string;

  reminder_sent: boolean;
  reminder_sent_at?: string;

  created_at: string;
  updated_at: string;
}

export interface AIFollowup {
  type:
    | 'blocker'
    | 'commitment'
    | 'action_item'
    | 'clarification'
    | 'deadline_reminder';
  title: string;
  description: string;
  owner?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  deadline_type?: '24h' | '48h' | '1week' | 'end_of_sprint' | 'custom';

  related_task?: string;
  task_confidence?: number;

  reasoning: string;
  confidence: number;

  quoted_context?: string;
}

export interface FollowupAnalysisResult {
  followups: AIFollowup[];
  summary: {
    total_followups: number;
    blockers_count: number;
    commitments_count: number;
    high_priority_count: number;
    unassigned_count: number;
  };
  context: {
    meeting_id?: string;
    analyzed_at: string;
    model_used: string;
  };
}

export interface AIActionsSummary {
  today: {
    followups_created: number;
    blockers_detected: number;
    reminders_sent: number;
    completed_today: number;
  };
  thisWeek: {
    total_followups: number;
    completion_rate: number;
  };
  urgent: Followup[];
  overdue: Followup[];
}

export interface AnalyzeMeetingRequest {
  transcript: string;
  meeting_id?: string;
  project_id: string;
}

export interface AnalyzeMeetingResponse {
  success: boolean;
  data?: {
    meeting_id: string;
    analysis: {
      blockers: any[];
      risks: any[];
      followups: AIFollowup[];
      agenda: any[];
    };
    followups_created: number;
    insights_created: number;
  };
  error?: string;
}

export interface FollowupFilters {
  project_id?: string;
  status?: Followup['status'][];
  priority?: Followup['priority'][];
  type?: Followup['type'][];
  assigned_to?: string;
  overdue?: boolean;
  deadline_range?: {
    start: string;
    end: string;
  };
}

export interface FollowupWithContext extends Followup {
  task?: {
    id: string;
    title: string;
    status: string;
  };
  project?: {
    id: string;
    name: string;
  };
  assignee?: {
    id: string;
    email: string;
    full_name?: string;
  };
}

