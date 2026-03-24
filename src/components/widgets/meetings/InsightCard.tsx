// components/meetings/InsightCard.tsx
'use client';

import { useState } from 'react';
import type { AIInsight } from '@/types/meetings';

interface InsightCardProps {
  insight: AIInsight;
  onResolve?: (insightId: string) => void;
}

export const InsightCard: React.FC<InsightCardProps> = ({ insight, onResolve }) => {
  const typeConfig = {
    blocker: { icon: '🚫', color: 'danger', label: 'Blocker' },
    followup: { icon: '✅', color: 'indigo', label: 'Follow-up' },
    decision: { icon: '⚖️', color: 'success', label: 'Decision' },
    risk: { icon: '⚠️', color: 'warning', label: 'Risk' },
    task_mention: { icon: '📋', color: 'info', label: 'Task' },
    opportunity: { icon: '💡', color: 'cyan', label: 'Opportunity' },
  };

  const config = typeConfig[insight.type];

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-3xl">{config.icon}</div>
          <div>
            <h3 className="text-body font-semibold text-text-primary mb-1">
              {insight.title}
            </h3>
            {insight.recurrence_count > 1 && (
              <span className="text-tiny text-semantic-danger">
                Recurring ({insight.recurrence_count}x)
              </span>
            )}
          </div>
        </div>
        {insight.status === 'open' && onResolve && (
          <button
            onClick={() => onResolve(insight.id)}
            className="px-3 py-1.5 text-tiny rounded-lg bg-semantic-success/10 text-semantic-success"
          >
            Resolve
          </button>
        )}
      </div>
      <p className="text-small text-text-secondary mb-4">{insight.description}</p>
      {insight.suggested_action && (
        <div className="p-4 rounded-xl bg-accent-indigo/5 border border-accent-indigo/10">
          <p className="text-tiny text-text-muted mb-1">Suggested Action</p>
          <p className="text-small text-text-primary">{insight.suggested_action}</p>
        </div>
      )}
    </div>
  );
};
