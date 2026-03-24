'use client';

import React, { useEffect, useRef } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import MuiSkeleton, { SkeletonProps as MuiSkeletonProps } from '@mui/material/Skeleton';
import { appMuiTheme } from '@/lib/mui/theme';
import { gsap } from '@/lib/gsap';

export interface AppSkeletonProps extends Omit<MuiSkeletonProps, 'variant'> {
  className?: string;
  variant?: MuiSkeletonProps['variant'];
}

export const AppSkeleton: React.FC<AppSkeletonProps> = ({ className, variant = 'rectangular', ...props }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' },
    );
  }, []);

  return (
    <ThemeProvider theme={appMuiTheme}>
      <div ref={ref} className={className}>
        <MuiSkeleton
          variant={variant}
          animation="pulse"
          {...props}
        />
      </div>
    </ThemeProvider>
  );
};

export const CardSkeleton: React.FC = () => {
  return (
    <div className="card-base space-y-3">
      <AppSkeleton variant="text" height={18} width="40%" />
      <AppSkeleton variant="text" height={14} width="65%" />
      <AppSkeleton variant="text" height={14} width="55%" />
    </div>
  );
};

export const TableSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => {
  return (
    <div className="card-base space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <AppSkeleton variant="circular" width={28} height={28} />
          <div className="flex-1 space-y-2">
            <AppSkeleton variant="text" height={14} width="40%" />
            <AppSkeleton variant="text" height={12} width="25%" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const SidebarSkeleton: React.FC<{ items?: number }> = ({ items = 5 }) => {
  return (
    <div className="space-y-2">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="rounded-[8px] px-3 py-2">
          <AppSkeleton variant="text" height={14} width="70%" />
        </div>
      ))}
    </div>
  );
};

export const InsightSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card-base">
          <div className="flex items-center justify-between mb-3">
            <AppSkeleton variant="text" height={16} width="45%" />
            <AppSkeleton variant="rectangular" height={18} width={80} />
          </div>
          <AppSkeleton variant="text" height={14} width="90%" />
          <AppSkeleton variant="text" height={14} width="70%" />
        </div>
      ))}
    </div>
  );
};

export const MetricCardSkeleton: React.FC = () => {
  return (
    <div className="card-base h-full">
      <div className="flex items-start justify-between mb-4">
        <AppSkeleton variant="text" height={14} width="45%" />
        <AppSkeleton variant="circular" width={20} height={20} />
      </div>
      <div className="flex items-end justify-between h-full">
        <AppSkeleton variant="text" height={22} width="55%" />
        <div className="flex items-center gap-2">
          <AppSkeleton variant="circular" width={10} height={10} />
          <AppSkeleton variant="text" height={12} width={36} />
        </div>
      </div>
    </div>
  );
};

export const MeetingIntelligenceSkeleton: React.FC = () => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <AppSkeleton variant="rectangular" width={48} height={48} />
        <div className="space-y-2">
          <AppSkeleton variant="text" height={18} width="55%" />
          <AppSkeleton variant="text" height={14} width="30%" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <AppSkeleton variant="text" height={12} width="60%" />
          <div className="mt-3">
            <AppSkeleton variant="text" height={28} width="55%" />
          </div>
        </div>
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <AppSkeleton variant="text" height={12} width="60%" />
          <div className="mt-3">
            <AppSkeleton variant="text" height={28} width="55%" />
          </div>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
        <AppSkeleton variant="text" height={14} width="70%" />
        <div className="space-y-3 mt-4">
          <div className="flex justify-between">
            <AppSkeleton variant="text" height={12} width="55%" />
            <AppSkeleton variant="text" height={12} width="18%" />
          </div>
          <div className="flex justify-between">
            <AppSkeleton variant="text" height={12} width="55%" />
            <AppSkeleton variant="text" height={12} width="18%" />
          </div>
          <div className="flex justify-between">
            <AppSkeleton variant="text" height={12} width="55%" />
            <AppSkeleton variant="text" height={12} width="18%" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const AIActionsSkeleton: React.FC = () => {
  return (
    <div className="card-base h-full">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="text-accent-indigo">
            <AppSkeleton variant="circular" width={20} height={20} />
          </div>
          <div className="space-y-2">
            <AppSkeleton variant="text" height={18} width="60%" />
            <AppSkeleton variant="text" height={14} width="45%" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="flex items-center justify-between mb-2">
              <AppSkeleton variant="circular" width={26} height={26} />
              <AppSkeleton variant="text" height={24} width={44} />
            </div>
            <AppSkeleton variant="text" height={14} width="70%" />
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center gap-2">
        <AppSkeleton variant="circular" width={8} height={8} />
        <AppSkeleton variant="text" height={14} width={120} />
      </div>
    </div>
  );
};

export const BlockedTasksSkeleton: React.FC = () => {
  return (
    <div className="card-base h-full">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <AppSkeleton variant="circular" width={22} height={22} />
          <div className="space-y-2">
            <AppSkeleton variant="text" height={18} width="55%" />
            <AppSkeleton variant="text" height={14} width="40%" />
          </div>
        </div>
      </div>
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 rounded-xl border border-semantic-danger/20 bg-semantic-danger/5"
          >
            <div className="flex-1 min-w-0">
              <AppSkeleton variant="text" height={14} width="80%" />
              <div className="mt-2">
                <AppSkeleton variant="text" height={12} width="60%" />
              </div>
              <div className="mt-3 flex items-center gap-2">
                <AppSkeleton variant="rectangular" height={18} width={72} />
                <AppSkeleton variant="rectangular" height={14} width={80} />
              </div>
            </div>
            <AppSkeleton variant="rectangular" height={22} width={64} />
          </div>
        ))}
      </div>
    </div>
  );
};

export const TeamInsightsSkeleton: React.FC = () => {
  return (
    <div className="card-base h-full">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <AppSkeleton variant="circular" width={22} height={22} />
          <div className="space-y-2">
            <AppSkeleton variant="text" height={18} width="55%" />
            <AppSkeleton variant="text" height={14} width="45%" />
          </div>
        </div>
      </div>
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.02]"
          >
            <div className="flex items-start gap-3">
              <AppSkeleton variant="circular" width={24} height={24} />
              <div className="flex-1 min-w-0 space-y-2">
                <AppSkeleton variant="text" height={14} width="70%" />
                <AppSkeleton variant="text" height={14} width="90%" />
                <div className="flex items-center justify-between">
                  <AppSkeleton variant="text" height={12} width={110} />
                  <AppSkeleton variant="text" height={12} width={70} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const FollowupListSkeleton: React.FC = () => {
  return (
    <div className="card-base h-full">
      <div className="space-y-3 mb-6">
        <AppSkeleton variant="text" height={18} width="55%" />
        <AppSkeleton variant="text" height={14} width="40%" />
      </div>
      <div className="flex gap-3 flex-wrap mb-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg px-3 py-1.5 bg-white/[0.08] border border-white/[0.06]">
            <AppSkeleton variant="text" height={12} width={70} />
          </div>
        ))}
      </div>
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="p-4 rounded-xl border border-white/[0.06] hover:bg-white/[0.02]">
            <div className="flex items-start gap-3">
              <AppSkeleton variant="circular" width={26} height={26} />
              <div className="flex-1 min-w-0 space-y-2">
                <AppSkeleton variant="text" height={14} width="85%" />
                <AppSkeleton variant="text" height={14} width="75%" />
                <AppSkeleton variant="text" height={12} width="55%" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const TaskCardSkeleton: React.FC = () => {
  return (
    <div className="card-base p-6 h-full">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <AppSkeleton variant="text" height={16} width="55%" />
            <AppSkeleton variant="rectangular" height={24} width={70} />
            <AppSkeleton variant="rectangular" height={24} width={86} />
          </div>
          <div className="space-y-3">
            <AppSkeleton variant="text" height={14} width="90%" />
            <AppSkeleton variant="text" height={14} width="78%" />
          </div>
          <div className="mt-4 flex items-center gap-4">
            <AppSkeleton variant="text" height={12} width={120} />
            <AppSkeleton variant="text" height={12} width={140} />
          </div>
        </div>
        <div className="flex-shrink-0">
          <AppSkeleton variant="rectangular" height={34} width={160} />
        </div>
      </div>
    </div>
  );
};

export const TasksPageSkeleton: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-1">
      <div className="mb-6">
        <AppSkeleton variant="text" height={22} width="180px" />
        <div className="mt-2 space-y-2">
          <AppSkeleton variant="text" height={14} width="260px" />
        </div>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl bg-white/[0.08] border border-border-subtle h-10 flex items-center px-4"
          >
            <AppSkeleton variant="text" height={12} width={70} />
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <TaskCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

