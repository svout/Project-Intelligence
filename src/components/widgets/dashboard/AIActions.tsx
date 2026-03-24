'use client';

import { useCallback, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { AIActionsSummary } from '@/types/followup';
import { DashboardCard } from '@/components/elements/Card';
import { EmptyState } from '@/components/elements/EmptyState';

interface AIActionsProps {
  projectId: string;
}

export default function AIActions({ projectId }: AIActionsProps) {
  const [actions, setActions] = useState<AIActionsSummary['today'] | null>(null);
  const [loading, setLoading] = useState(true);

  const loadAIActions = useCallback(async () => {
    try {
      const supabase = createClient();

      const { data: todayData } = await supabase
        .from('ai_actions_today')
        .select('*')
        .eq('project_id', projectId)
        .single();

      if (todayData) {
        setActions({
          followups_created: todayData.followups_created || 0,
          blockers_detected: todayData.blockers_detected || 0,
          reminders_sent: todayData.reminders_sent || 0,
          completed_today: todayData.completed_today || 0,
        });
      } else {
        setActions({
          followups_created: 0,
          blockers_detected: 0,
          reminders_sent: 0,
          completed_today: 0,
        });
      }
    } catch (error) {
      console.error('Error loading AI actions:', error);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    void loadAIActions();
  }, [loadAIActions]);

  if (loading) {
    return (
      <DashboardCard title="🤖 AI Actions Today" subtitle="Autonomous actions" loading>
        <div />
      </DashboardCard>
    );
  }

  if (!actions) return null;

  const stats = [
    { label: 'Follow-ups Created', value: actions.followups_created, icon: '📋', color: 'text-accent-indigo' },
    { label: 'Blockers Detected', value: actions.blockers_detected, icon: '🚫', color: 'text-semantic-danger' },
    { label: 'Reminders Sent', value: actions.reminders_sent, icon: '🔔', color: 'text-semantic-warning' },
    { label: 'Completed Today', value: actions.completed_today, icon: '✓', color: 'text-semantic-success' },
  ];

  const totalActions = actions.followups_created + actions.blockers_detected + actions.reminders_sent;

  return (
    <DashboardCard
      title="🤖 AI Actions Today"
      subtitle="Autonomous actions taken by AI"
    >
      {totalActions === 0 ? (
        <EmptyState
          icon={
            <svg className="w-4 h-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2l10 5-10 5L2 7l10-5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 7v10l10 5 10-5V7" />
            </svg>
          }
          title="No AI actions yet"
          description="AI actions appear after meeting analysis. Upload a transcript to trigger autonomous follow-ups."
          primaryAction={{ label: 'Upload meeting', href: '/meetings/upload' }}
          secondaryAction={{ label: 'Open inbox', href: '/inbox' }}
        />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.05] transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{stat.icon}</span>
                <span className={`text-h2 font-semibold ${stat.color}`}>{stat.value}</span>
              </div>
              <div className="text-small font-medium text-text-secondary">{stat.label}</div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center gap-2 text-small text-text-muted">
        <div className="w-2 h-2 bg-semantic-success rounded-full animate-pulse" />
        <span>AI monitoring active</span>
      </div>
    </DashboardCard>
  );
}
