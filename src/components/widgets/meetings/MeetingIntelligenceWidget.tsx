// components/meetings/MeetingIntelligenceWidget.tsx
'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card } from '@/components/elements/Card';
import { MeetingIntelligenceSkeleton } from '@/components/elements/AppSkeleton';

interface IntelligenceStats {
  total_meetings: number;
  processed_meetings: number;
  today_insights: number;
  blockers_count: number;
  followups_count: number;
  decisions_count: number;
}

export const MeetingIntelligenceWidget = () => {
  const [stats, setStats] = useState<IntelligenceStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      const supabase = createClient();

      // Get meeting counts
      const { count: totalCount } = await supabase
        .from('meetings')
        .select('*', { count: 'exact', head: true });

      const { count: processedCount } = await supabase
        .from('meetings')
        .select('*', { count: 'exact', head: true })
        .eq('processed', true);

      // Get today's insights
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const { data: todayInsights } = await supabase
        .from('ai_insights')
        .select('type')
        .gte('created_at', today.toISOString());

      const insightCounts = {
        blockers: todayInsights?.filter(i => i.type === 'blocker').length || 0,
        followups: todayInsights?.filter(i => i.type === 'followup').length || 0,
        decisions: todayInsights?.filter(i => i.type === 'decision').length || 0,
      };

      setStats({
        total_meetings: totalCount || 0,
        processed_meetings: processedCount || 0,
        today_insights: todayInsights?.length || 0,
        blockers_count: insightCounts.blockers,
        followups_count: insightCounts.followups,
        decisions_count: insightCounts.decisions,
      });
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <MeetingIntelligenceSkeleton />;
  }

  return (
    <Card className="p-6 h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-white/5 border border-border-subtle flex items-center justify-center">
          <svg
            className="w-4 h-4 text-text-secondary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2v4m7.07 1.93l-2.83 2.83M22 12h-4M18.07 17.07l-2.83-2.83M12 22v-4M5.93 17.07l2.83-2.83M2 12h4M5.93 6.93l2.83 2.83"
            />
            <path
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 7a5 5 0 100 10 5 5 0 000-10z"
            />
          </svg>
        </div>
        <div>
          <h3 className="text-h3 font-semibold text-text-primary">Meeting intelligence</h3>
          <p className="text-small text-text-muted">AI-powered signals</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="card-base p-4">
          <p className="text-tiny text-text-muted uppercase mb-2">Total meetings</p>
          <p className="text-h2 font-semibold text-text-primary">{stats?.total_meetings || 0}</p>
        </div>
        <div className="card-base p-4">
          <p className="text-tiny text-text-muted uppercase mb-2">Analyzed</p>
          <p className="text-h2 font-semibold text-semantic-info">{stats?.processed_meetings || 0}</p>
        </div>
      </div>

      <div className="card-base p-4">
        <p className="text-small font-medium text-text-primary mb-3">Today&apos;s AI actions</p>
        <div className="space-y-2">
          <div className="flex justify-between items-center text-small">
            <span className="text-text-muted">Blockers detected</span>
            <span className="text-semantic-danger font-medium">{stats?.blockers_count || 0}</span>
          </div>
          <div className="flex justify-between items-center text-small">
            <span className="text-text-muted">Follow-ups created</span>
            <span className="text-semantic-success font-medium">{stats?.followups_count || 0}</span>
          </div>
          <div className="flex justify-between items-center text-small">
            <span className="text-text-muted">Decisions recorded</span>
            <span className="text-semantic-info font-medium">{stats?.decisions_count || 0}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
