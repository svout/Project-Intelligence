// components/ui/Badge.tsx
// AI Project Intelligence - Badge Component

import React from 'react';

export interface BadgeProps {
  variant: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  pulse?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  variant,
  size = 'md',
  children,
  icon,
  pulse = false,
}) => {
  const variants = {
    success: 'badge-success',
    warning: 'badge-warning',
    danger: 'badge-danger',
    info: 'badge-info',
    neutral: 'bg-white/[0.1] text-text-secondary border border-white/[0.08]',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-tiny',
    md: 'px-3 py-1 text-tiny',
    lg: 'px-4 py-1.5 text-small',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-medium ${variants[variant]} ${sizes[size]}`}>
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
        </span>
      )}
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );
};

export interface StatusBadgeProps {
  status: 'completed' | 'in_progress' | 'blocked' | 'todo' | 'at_risk' | 'healthy';
  showIcon?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  showIcon = true,
}) => {
  const statusConfig = {
    completed: {
      variant: 'success' as const,
      label: 'Completed',
      icon: '✓',
    },
    in_progress: {
      variant: 'info' as const,
      label: 'In Progress',
      icon: '●',
    },
    blocked: {
      variant: 'danger' as const,
      label: 'Blocked',
      icon: '!',
      pulse: true,
    },
    todo: {
      variant: 'neutral' as const,
      label: 'To Do',
      icon: '○',
    },
    at_risk: {
      variant: 'warning' as const,
      label: 'At Risk',
      icon: '⚠',
    },
    healthy: {
      variant: 'success' as const,
      label: 'Healthy',
      icon: '✓',
    },
  };

  const config = statusConfig[status];
  const pulse = 'pulse' in config ? !!config.pulse : false;

  return (
    <Badge
      variant={config.variant}
      icon={showIcon ? <span>{config.icon}</span> : undefined}
      pulse={pulse}
    >
      {config.label}
    </Badge>
  );
};

export interface PriorityBadgeProps {
  priority: 'critical' | 'high' | 'medium' | 'low';
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  const priorityConfig = {
    critical: {
      variant: 'danger' as const,
      label: 'Critical',
      pulse: true,
    },
    high: {
      variant: 'danger' as const,
      label: 'High',
    },
    medium: {
      variant: 'warning' as const,
      label: 'Medium',
    },
    low: {
      variant: 'info' as const,
      label: 'Low',
    },
  };

  const config = priorityConfig[priority];
  const pulse = 'pulse' in config ? !!config.pulse : false;

  return (
    <Badge variant={config.variant} size="sm" pulse={pulse}>
      {config.label}
    </Badge>
  );
};
