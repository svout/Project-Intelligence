'use client';

import Link from 'next/link';
import type { Task } from '@/types';
import { Card, DashboardCard } from '@/components/elements/Card';
import { PriorityBadge } from '@/components/elements/Badge';
import Button from '@/components/elements/Button';
import { EmptyState } from '@/components/elements/EmptyState';

interface BlockedTasksProps {
  tasks: Task[];
  projectId?: string;
}

const priorityMap = {
  urgent: 'critical' as const,
  high: 'high' as const,
  medium: 'medium' as const,
  low: 'low' as const,
};

export default function BlockedTasks({ tasks, projectId }: BlockedTasksProps) {
  return (
    <DashboardCard
      title="Blocked Tasks"
      subtitle="Requires immediate attention"
      icon={
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
      }
      action={projectId ? <Link href={`/tasks?project=${projectId}&status=blocked`}><Button variant="ghost" size="sm">View all</Button></Link> : undefined}
    >
      {tasks.length === 0 ? (
        <EmptyState
          icon={
            <svg className="w-4 h-4 text-semantic-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 11l3 3L22 4" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
            </svg>
          }
          title="No blocked tasks"
          description="Your project currently has no tasks marked as blocked. Keep the momentum—AI will surface blockers as they appear."
          primaryAction={{ label: 'View tasks', href: projectId ? `/tasks?project=${projectId}` : '/tasks' }}
          secondaryAction={{ label: 'Create a task', href: projectId ? `/tasks?project=${projectId}` : '/tasks' }}
        />
      ) : (
        <div className="space-y-3">
          {tasks.slice(0, 5).map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-4 rounded-xl border border-semantic-danger/20 bg-semantic-danger/5 hover:bg-semantic-danger/10 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="text-small font-medium text-text-primary mb-2">{task.title}</p>
                {task.blocked_reason && (
                  <p className="text-tiny text-text-secondary mb-2">🚫 {task.blocked_reason}</p>
                )}
                <div className="flex items-center gap-3 flex-wrap">
                  <PriorityBadge priority={priorityMap[task.priority] ?? 'medium'} />
                  {task.due_date && (
                    <span className="text-tiny text-text-muted">
                      Due: {new Date(task.due_date).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
              <span className="badge-danger ml-3">Blocked</span>
            </div>
          ))}
          {tasks.length > 5 && (
            <p className="text-small text-text-muted text-center pt-2">+{tasks.length - 5} more blocked tasks</p>
          )}
        </div>
      )}
    </DashboardCard>
  );
}
