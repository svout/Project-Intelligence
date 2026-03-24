'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { AppSkeleton } from '@/components/elements/AppSkeleton';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  hover?: boolean;
  depth?: 0 | 1 | 2;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', interactive = false, hover = false, depth, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'card-base',
          interactive && 'hover:-translate-y-[2px]',
          hover && !interactive && 'hover:-translate-y-[2px]',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = 'Card';

export interface DashboardCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  loading?: boolean;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  subtitle,
  icon,
  action,
  loading = false,
  className = '',
  children,
  ...props
}) => {
  return (
    <Card depth={1} hover className={className} {...props}>
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          {icon && <div className="text-accent-indigo">{icon}</div>}
          <div>
            <h3 className="text-h3 font-semibold text-text-primary">{title}</h3>
            {subtitle && <p className="text-small text-text-muted mt-1">{subtitle}</p>}
          </div>
        </div>
        {action && <div>{action}</div>}
      </div>

      {loading ? (
        <div className="space-y-3">
          <AppSkeleton variant="text" height={14} width="55%" />
          <AppSkeleton variant="text" height={14} width="75%" />
          <AppSkeleton variant="text" height={14} width="50%" />
        </div>
      ) : (
        children
      )}
    </Card>
  );
};

export interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  delay = 0,
}) => {
  return (
    <Card
      depth={1}
      hover
      interactive
      className="group h-full flex flex-col"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="mb-4 text-accent-indigo group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-h3 font-semibold text-text-primary mb-3">{title}</h3>
      <p className="text-body text-text-secondary leading-relaxed flex-1">
        {description}
      </p>
    </Card>
  );
};

export interface MetricCardProps {
  label: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  change,
  trend = 'neutral',
  icon,
}) => {
  const trendColors = {
    up: 'text-semantic-success',
    down: 'text-semantic-danger',
    neutral: 'text-text-muted',
  };

  const trendIcons = {
    up: '↑',
    down: '↓',
    neutral: '→',
  };

  return (
    <Card depth={1} hover className="h-full">
      <div className="flex items-start justify-between mb-4">
        <p className="text-small text-text-muted uppercase tracking-wider">
          {label}
        </p>
        {icon && <div className="text-accent-indigo">{icon}</div>}
      </div>

      <div className="flex items-end justify-between">
        <p className="text-display font-semibold text-text-primary">{value}</p>

        {change !== undefined && (
          <div className={cn('flex items-center gap-1 text-small font-medium', trendColors[trend])}>
            <span>{trendIcons[trend]}</span>
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default Card;
