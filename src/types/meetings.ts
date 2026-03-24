// types/meetings.ts
// Loom Meeting Intelligence - TypeScript Types

export interface Integration {
  id: string;
  user_id: string;
  provider: 'loom' | 'slack' | 'zoom';
  access_token: string;
  refresh_token?: string;
  token_expires_at?: string;
  workspace_id?: string;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface Meeting {
  id: string;
  user_id: string;
  project_id?: string;
  
  // Source
  source: 'loom' | 'upload' | 'zoom' | 'manual';
  external_id?: string;
  external_url?: string;
  
  // Details
  title: string;
  description?: string;
  transcript?: string;
  duration_seconds?: number;
  thumbnail_url?: string;
  
  // Participants
  participants?: string[];
  host?: string;
  
  // Processing
  processed: boolean;
  processing_started_at?: string;
  processing_completed_at?: string;
  processing_error?: string;
  
  // AI
  ai_summary?: string;
  ai_metadata?: Record<string, any>;
  
  // Timestamps
  meeting_date?: string;
  created_at: string;
  updated_at: string;
}

export interface AIInsight {
  id: string;
  meeting_id: string;
  user_id: string;
  project_id?: string;
  
  // Classification
  type: 'blocker' | 'followup' | 'decision' | 'risk' | 'task_mention' | 'opportunity';
  severity?: 'low' | 'medium' | 'high' | 'critical';
  
  // Content
  title: string;
  description: string;
  suggested_action?: string;
  
  // Context
  transcript_excerpt?: string;
  timestamp_seconds?: number;
  mentioned_people?: string[];
  
  // Tracking
  status: 'open' | 'in_progress' | 'resolved' | 'dismissed';
  resolved_at?: string;
  resolved_by?: string;
  
  // Recurrence (Project Memory)
  recurrence_count: number;
  first_seen_meeting_id?: string;
  last_seen_meeting_id?: string;
  related_insight_ids?: string[];
  
  created_at: string;
  updated_at: string;
}

// ============================================
// AI ANALYSIS TYPES
// ============================================

export interface AIAnalysisResult {
  summary: string;
  blockers: InsightData[];
  followUps: InsightData[];
  decisions: InsightData[];
  risks: InsightData[];
  taskMentions: InsightData[];
  opportunities?: InsightData[];
}

export interface InsightData {
  title: string;
  description: string;
  suggestedAction?: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  mentionedPeople?: string[];
  transcriptExcerpt?: string;
  timestampSeconds?: number;
}

// ============================================
// LOOM API TYPES
// ============================================

export interface LoomVideo {
  id: string;
  title: string;
  description?: string;
  thumbnail_url: string;
  duration: number; // seconds
  created_at: string;
  shared_url: string;
  owner: {
    id: string;
    name: string;
    email: string;
  };
  transcript?: {
    sentences: Array<{
      text: string;
      start: number; // seconds
      end: number;
    }>;
  };
}

export interface LoomTranscript {
  video_id: string;
  sentences: Array<{
    text: string;
    start: number;
    end: number;
  }>;
  full_text: string;
}

// ============================================
// DASHBOARD TYPES
// ============================================

export interface MeetingWithInsights extends Meeting {
  insights: AIInsight[];
  insights_count: {
    total: number;
    blockers: number;
    followups: number;
    decisions: number;
    risks: number;
    tasks: number;
  };
}

export interface MeetingIntelligenceSummary {
  total_meetings: number;
  processed_meetings: number;
  total_insights: number;
  recent_insights: AIInsight[];
  insights_by_type: {
    blockers: number;
    followups: number;
    decisions: number;
    risks: number;
    tasks: number;
  };
}

// ============================================
// PROJECT MEMORY TYPES
// ============================================

export interface RecurringInsight {
  title: string;
  type: AIInsight['type'];
  occurrence_count: number;
  meeting_ids: string[];
  first_seen: string;
  last_seen: string;
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface APIResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface SyncLoomResponse {
  synced_videos: number;
  new_meetings: number;
  updated_meetings: number;
}

export interface AnalyzeMeetingResponse {
  meeting_id: string;
  insights_created: number;
  processing_time_ms: number;
}
