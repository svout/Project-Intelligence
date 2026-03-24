'use client';

import type { ProjectMetrics } from '@/types';
import { Card } from '@/components/elements/Card';
import { StatusBadge } from '@/components/elements/Badge';

interface ProjectHealthProps {
  metrics: ProjectMetrics | null;
}

export default function ProjectHealth({ metrics }: ProjectHealthProps) {
  const healthStatus = metrics?.health_status || 'healthy';

  const statusMap = {
    healthy: 'healthy' as const,
    at_risk: 'at_risk' as const,
    critical: 'blocked' as const,
  };
  const badgeStatus = statusMap[healthStatus] ?? 'healthy';

  const config = {
    healthy: {
      label: 'Healthy',
      sub: 'All systems go',
      icon: '✓',
      wrapper: 'bg-semantic-success/10 border-semantic-success/20',
      iconBg: 'bg-semantic-success/20',
      text: 'text-semantic-success',
    },
    at_risk: {
      label: 'At Risk',
      sub: 'Attention needed',
      icon: '⚠',
      wrapper: 'bg-semantic-warning/10 border-semantic-warning/20',
      iconBg: 'bg-semantic-warning/20',
      text: 'text-semantic-warning',
    },
    critical: {
      label: 'Critical',
      sub: 'Immediate action required',
      icon: '!',
      wrapper: 'bg-semantic-danger/10 border-semantic-danger/20',
      iconBg: 'bg-semantic-danger/20',
      text: 'text-semantic-danger',
    },
  } as const;

  const c = config[healthStatus] ?? config.healthy;

  return (
    <Card depth={1} hover className="h-full">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-small font-medium text-text-muted uppercase tracking-wider">Project Health</h3>
        <svg className="w-5 h-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </div>

      <div className={`flex items-center justify-between p-4 rounded-xl border ${c.wrapper}`}>
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-lg ${c.iconBg} flex items-center justify-center`}>
            <span className={`text-2xl ${c.text}`}>{c.icon}</span>
          </div>
          <div>
            <p className="text-small font-medium text-text-primary">{c.label}</p>
            <p className="text-tiny text-text-muted mt-0.5">{c.sub}</p>
          </div>
        </div>
        <StatusBadge status={badgeStatus} showIcon />
      </div>

      {metrics && (
        <div className="mt-4 pt-4 border-t border-white/[0.08]">
          <div className="grid grid-cols-2 gap-4 text-small">
            <div className="p-3 rounded-lg bg-white/[0.02]">
              <span className="text-text-muted">Completed</span>
              <span className="ml-2 font-semibold text-text-primary">{metrics.completed_tasks_count}</span>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.02]">
              <span className="text-text-muted">Blocked</span>
              <span className="ml-2 font-semibold text-text-primary">{metrics.blocked_tasks_count}</span>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
