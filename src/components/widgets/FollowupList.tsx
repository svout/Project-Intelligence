'use client';

import { useState } from 'react';
import type { FollowupWithContext } from '@/types/followup';
import { DashboardCard } from '@/components/elements/Card';
import { Badge } from '@/components/elements/Badge';
import Button from '@/components/elements/Button';
import { EmptyState } from '@/components/elements/EmptyState';

interface FollowupListProps {
  followups: FollowupWithContext[];
  onStatusChange?: (followupId: string, newStatus: string) => void;
  showFilters?: boolean;
}

const priorityVariant: Record<string, 'danger' | 'warning' | 'info' | 'neutral'> = {
  critical: 'danger',
  high: 'danger',
  medium: 'warning',
  low: 'info',
};

const statusVariant: Record<string, 'success' | 'info' | 'danger' | 'neutral'> = {
  completed: 'success',
  in_progress: 'info',
  blocked: 'danger',
  open: 'neutral',
};

export default function FollowupList({
  followups,
  onStatusChange,
  showFilters = true,
}: FollowupListProps) {
  const [filter, setFilter] = useState<'all' | 'open' | 'completed'>('all');
  const [priorityFilter, setPriorityFilter] = useState<
    'all' | 'critical' | 'high' | 'medium' | 'low'
  >('all');

  const filteredFollowups = followups.filter((f) => {
    const statusMatch =
      filter === 'all' ||
      (filter === 'open' && f.status === 'open') ||
      (filter === 'completed' && f.status === 'completed');

    const priorityMatch =
      priorityFilter === 'all' || f.priority === priorityFilter;

    return statusMatch && priorityMatch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'blocker':
        return '🚫';
      case 'commitment':
        return '🤝';
      case 'action_item':
        return '✅';
      case 'clarification':
        return '❓';
      case 'deadline_reminder':
        return '⏰';
      default:
        return '📋';
    }
  };

  const isOverdue = (deadline?: string) => {
    if (!deadline) return false;
    return new Date(deadline) < new Date();
  };

  const formatDeadline = (deadline?: string) => {
    if (!deadline) return 'No deadline';
    const date = new Date(deadline);
    const now = new Date();
    const diffHours = Math.floor(
      (date.getTime() - now.getTime()) / (1000 * 60 * 60),
    );

    if (diffHours < 0) return 'Overdue';
    if (diffHours < 24) return `${diffHours}h remaining`;
    if (diffHours < 48) return 'Tomorrow';
    return date.toLocaleDateString();
  };

  return (
    <DashboardCard
      title={`AI Follow-ups (${filteredFollowups.length})`}
      subtitle="From meeting analysis"
    >
      {showFilters && (
        <div className="flex gap-3 flex-wrap mb-6">
          <div className="flex gap-2">
            {(['all', 'open', 'completed'] as const).map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setFilter(status)}
                className={`px-3 py-1.5 rounded-lg text-small font-medium transition-colors ${
                  filter === status
                    ? 'bg-accent-indigo text-white'
                    : 'bg-white/[0.08] text-text-secondary hover:bg-white/[0.12] hover:text-text-primary'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            {(['all', 'critical', 'high', 'medium', 'low'] as const).map(
              (priority) => (
                <button
                  key={priority}
                  type="button"
                  onClick={() => setPriorityFilter(priority)}
                  className={`px-3 py-1.5 rounded-lg text-small font-medium transition-colors ${
                    priorityFilter === priority
                      ? 'bg-accent-indigo text-white'
                      : 'bg-white/[0.08] text-text-secondary hover:bg-white/[0.12] hover:text-text-primary'
                  }`}
                >
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </button>
              ),
            )}
          </div>
        </div>
      )}

      {filteredFollowups.length === 0 ? (
        <EmptyState
          icon={
            <svg className="w-4 h-4 text-accent-indigo" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          title="No follow-ups yet"
          description="Upload a meeting transcript to let AI generate commitments, action items and deadlines for your project."
          primaryAction={{ label: 'Upload meeting', href: '/meetings/upload' }}
          secondaryAction={{ label: 'View meetings', href: '/meetings' }}
        />
      ) : (
        <div className="space-y-4 divide-y divide-white/[0.06]">
          {filteredFollowups.map((followup) => (
            <div
              key={followup.id}
              className="pt-4 first:pt-0 hover:bg-white/[0.02] -mx-2 px-2 py-3 rounded-xl transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="text-2xl flex-shrink-0 mt-0.5">
                  {getTypeIcon(followup.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1">
                      <h3 className="text-h3 font-semibold text-text-primary mb-1">
                        {followup.title}
                      </h3>
                      <p className="text-small text-text-secondary">
                        {followup.description}
                      </p>
                    </div>
                    <Badge variant={priorityVariant[followup.priority] ?? 'neutral'} size="sm">
                      {followup.priority}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 text-small text-text-muted mt-3 flex-wrap">
                    {followup.owner && (
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>{followup.owner}</span>
                      </div>
                    )}

                    {followup.deadline && (
                      <div className={`flex items-center gap-1 ${isOverdue(followup.deadline) ? 'text-semantic-danger font-medium' : ''}`}>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{formatDeadline(followup.deadline)}</span>
                      </div>
                    )}

                    {followup.task && (
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <span className="text-accent-indigo">{followup.task.title}</span>
                      </div>
                    )}

                    <Badge variant={statusVariant[followup.status] ?? 'neutral'} size="sm">
                      {followup.status.replace('_', ' ')}
                    </Badge>
                  </div>

                  {followup.ai_reasoning && (
                    <details className="mt-3">
                      <summary className="text-tiny text-text-muted cursor-pointer hover:text-text-secondary">
                        AI Reasoning ({Math.round((followup.confidence_score || 0) * 100)}% confidence)
                      </summary>
                      <p className="text-tiny text-text-secondary mt-2 pl-4 border-l-2 border-white/[0.12]">
                        {followup.ai_reasoning}
                      </p>
                    </details>
                  )}

                  {onStatusChange && followup.status !== 'completed' && (
                    <div className="mt-4 flex gap-2">
                      <Button variant="primary" size="sm" onClick={() => onStatusChange(followup.id, 'in_progress')}>
                        Start
                      </Button>
                      <Button variant="secondary" size="sm" onClick={() => onStatusChange(followup.id, 'completed')}>
                        Complete
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => onStatusChange(followup.id, 'dismissed')}>
                        Dismiss
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardCard>
  );
}

