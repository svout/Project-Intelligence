export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  owner_id: string;
  status: 'active' | 'archived' | 'completed';
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: string;
  project_id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'blocked' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  owner_id?: string;
  assigned_to?: string;
  dependency_task_id?: string;
  blocked_reason?: string;
  due_date?: string;
  created_at: string;
  updated_at: string;
}

export interface Meeting {
  id: string;
  project_id: string;
  title: string;
  transcript: string;
  meeting_date: string;
  participants?: string[];
  duration_minutes?: number;
  analysis?: MeetingAnalysis;
  status: 'pending' | 'analyzed' | 'failed';
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface Insight {
  id: string;
  project_id: string;
  meeting_id?: string;
  type: 'blocker' | 'risk' | 'opportunity' | 'recommendation';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  affected_tasks?: string[];
  status: 'open' | 'acknowledged' | 'resolved' | 'dismissed';
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface ProjectMetrics {
  id: string;
  project_id: string;
  risk_score: number;
  health_status: 'healthy' | 'at_risk' | 'critical';
  blocked_tasks_count: number;
  completed_tasks_count: number;
  total_tasks_count: number;
  velocity: number;
  last_calculated: string;
  created_at: string;
}

export interface AgendaItem {
  id: string;
  meeting_id?: string;
  project_id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  related_task_id?: string;
  status: 'pending' | 'discussed' | 'deferred';
  created_at: string;
}

export interface MeetingAnalysis {
  summary: string;
  blockers: Blocker[];
  risks: Risk[];
  task_updates: TaskUpdate[];
  commitments: Commitment[];
  next_meeting_agenda: AgendaItem[];
  key_decisions: string[];
  action_items: ActionItem[];
}

export interface Blocker {
  id: string;
  title: string;
  description: string;
  affected_tasks: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
  owner?: string;
  suggested_resolution?: string;
}

export interface Risk {
  id: string;
  title: string;
  description: string;
  probability: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high';
  category: 'technical' | 'resource' | 'timeline' | 'scope' | 'external';
  mitigation_strategy?: string;
  affected_areas: string[];
}

export interface TaskUpdate {
  task_id?: string;
  task_title: string;
  previous_status?: string;
  new_status: string;
  progress_percentage?: number;
  notes: string;
  updated_by?: string;
}

export interface Commitment {
  id: string;
  description: string;
  owner: string;
  due_date?: string;
  type: 'task' | 'decision' | 'deliverable';
}

export interface ActionItem {
  id: string;
  description: string;
  owner?: string;
  priority: 'low' | 'medium' | 'high';
  due_date?: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface MeetingAnalysisRequest {
  transcript: string;
  project_id: string;
  existing_tasks?: Task[];
  meeting_context?: {
    title: string;
    participants: string[];
    date: string;
  };
}

export interface MeetingAnalysisResponse {
  meeting_id: string;
  analysis: MeetingAnalysis;
  insights_created: number;
  tasks_updated: number;
}

export interface DashboardData {
  project: Project;
  metrics: ProjectMetrics;
  recent_insights: Insight[];
  blocked_tasks: Task[];
  upcoming_tasks: Task[];
  recent_meetings: Meeting[];
  team_health: TeamHealth;
}

export interface TeamHealth {
  overall_score: number;
  blockers_trend: 'improving' | 'stable' | 'declining';
  velocity_trend: 'increasing' | 'stable' | 'decreasing';
  risk_level: 'low' | 'medium' | 'high';
  key_metrics: {
    on_track_tasks: number;
    at_risk_tasks: number;
    blocked_tasks: number;
  };
}

export interface TaskFilters {
  status?: Task['status'][];
  priority?: Task['priority'][];
  assigned_to?: string;
  has_blocker?: boolean;
  search?: string;
}

export interface InsightFilters {
  type?: Insight['type'][];
  severity?: Insight['severity'][];
  status?: Insight['status'][];
  date_range?: {
    start: string;
    end: string;
  };
}

export type SortDirection = 'asc' | 'desc';

export interface SortConfig<T> {
  key: keyof T;
  direction: SortDirection;
}

