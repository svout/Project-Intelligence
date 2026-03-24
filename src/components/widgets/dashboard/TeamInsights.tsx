'use client';

import Link from 'next/link';
import type { Insight } from '@/types';
import { DashboardCard } from '@/components/elements/Card';
import { Badge } from '@/components/elements/Badge';
import Button from '@/components/elements/Button';
import { EmptyState } from '@/components/elements/EmptyState';

interface TeamInsightsProps {
  insights: Insight[];
}

export default function TeamInsights({ insights }: TeamInsightsProps) {
  const getInsightIcon = (type: Insight['type']) => {
    switch (type) {
      case 'blocker': return '🚫';
      case 'risk': return '⚠️';
      case 'opportunity': return '💡';
      case 'recommendation': return '✨';
      default: return '💡';
    }
  };

  const getBadgeVariant = (severity: Insight['severity']): 'danger' | 'warning' | 'info' | 'success' => {
    switch (severity) {
      case 'critical': return 'danger';
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'info';
    }
  };

  return (
    <DashboardCard
      title="Recent Insights"
      subtitle="From meetings and tasks"
      action={<Link href="/insights"><Button variant="ghost" size="sm">View all</Button></Link>}
    >
      {insights.length === 0 ? (
        <EmptyState
          icon={
            <svg className="w-4 h-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15V3" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          title="No insights yet"
          description="Views help you understand project risks. Upload a meeting transcript and Project Intelligence will generate insights."
          primaryAction={{ label: 'Upload meeting', href: '/meetings/upload' }}
          secondaryAction={{ label: 'View meetings', href: '/meetings' }}
        />
      ) : (
        <div className="space-y-3">
          {insights.slice(0, 5).map((insight) => (
            <div
              key={insight.id}
              className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
            >
              <div className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0">{getInsightIcon(insight.type)}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="text-small font-medium text-text-primary truncate">{insight.title}</h3>
                    <Badge variant={getBadgeVariant(insight.severity)} size="sm">{insight.type}</Badge>
                  </div>
                  <p className="text-small text-text-secondary line-clamp-2">{insight.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-tiny text-text-muted">
                    <span>{new Date(insight.created_at).toLocaleDateString()}</span>
                    <span className="capitalize">{insight.severity}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {insights.length > 5 && (
            <p className="text-small text-text-muted text-center pt-2">+{insights.length - 5} more insights</p>
          )}
        </div>
      )}
    </DashboardCard>
  );
}
