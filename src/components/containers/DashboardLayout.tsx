// components/layout/DashboardLayout.tsx
// AI Project Intelligence - YC-Style Dashboard Layout (design reference)

'use client';

import { useEffect, useRef, useState } from 'react';
import { staggerReveal } from '@/lib/animations';
import { DashboardCard, MetricCard } from '@/components/elements/Card';
import { StatusBadge, PriorityBadge } from '@/components/elements/Badge';
import Button from '@/components/elements/Button';

export const DashboardLayout = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (gridRef.current) {
      staggerReveal('.dashboard-card', { stagger: 0.08 });
    }
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background-primary">
      <aside className="fixed left-0 top-0 h-full w-64 border-r border-white/[0.08] bg-background-card/50 backdrop-blur-glass p-6">
        <div className="mb-8">
          <h1 className="text-h2 font-semibold gradient-text">AI Project Intel</h1>
        </div>

        <nav className="space-y-1">
          {[
            { name: 'Dashboard', icon: '📊', active: true },
            { name: 'Meetings', icon: '📅', active: false },
            { name: 'Tasks', icon: '✓', active: false },
            { name: 'Insights', icon: '💡', active: false },
            { name: 'Team', icon: '👥', active: false },
          ].map((item) => (
            <button
              key={item.name}
              type="button"
              className={item.active ? 'sidebar-item-active w-full text-left' : 'sidebar-item w-full text-left'}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-indigo to-accent-cyan" />
              <div>
                <p className="text-small font-medium text-text-primary">John Doe</p>
                <p className="text-tiny text-text-muted">john@company.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <main className="ml-64 min-h-screen">
        <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-background-card/80 backdrop-blur-glass">
          <div className="flex items-center justify-between px-8 py-4">
            <div>
              <h2 className="text-h2 font-semibold text-text-primary">Dashboard</h2>
              <p className="text-small text-text-muted mt-1">AI-powered project insights</p>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="secondary" size="sm">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Upload Meeting
              </Button>
              <Button variant="ghost" size="sm">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </Button>
            </div>
          </div>
        </header>

        <div ref={gridRef} className="p-8">
          <div className="dashboard-grid">
            <div className="col-span-3 dashboard-card">
              <MetricCard
                label="Sprint Risk"
                value="12%"
                change={-8}
                trend="up"
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                }
              />
            </div>

            <div className="col-span-3 dashboard-card">
              <MetricCard
                label="Blocked Tasks"
                value="2"
                change={-50}
                trend="up"
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                }
              />
            </div>

            <div className="col-span-3 dashboard-card">
              <MetricCard
                label="Velocity"
                value="8.2"
                change={12}
                trend="up"
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                }
              />
            </div>

            <div className="col-span-3 dashboard-card">
              <MetricCard
                label="AI Actions"
                value="24"
                change={30}
                trend="up"
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                }
              />
            </div>

            <div className="col-span-6 dashboard-card">
              <DashboardCard
                title="Project Health"
                subtitle="Real-time status monitoring"
                icon={
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-semantic-success/10 border border-semantic-success/20">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-semantic-success/20 flex items-center justify-center">
                        <span className="text-2xl">✓</span>
                      </div>
                      <div>
                        <p className="text-small font-medium text-text-primary">On Track</p>
                        <p className="text-tiny text-text-muted">All systems healthy</p>
                      </div>
                    </div>
                    <StatusBadge status="healthy" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-white/[0.02]">
                      <p className="text-tiny text-text-muted mb-2">Completion Rate</p>
                      <p className="text-h2 font-semibold text-text-primary">85%</p>
                    </div>
                    <div className="p-4 rounded-lg bg-white/[0.02]">
                      <p className="text-tiny text-text-muted mb-2">Sprint Days Left</p>
                      <p className="text-h2 font-semibold text-text-primary">8</p>
                    </div>
                  </div>
                </div>
              </DashboardCard>
            </div>

            <div className="col-span-6 dashboard-card">
              <DashboardCard
                title="🤖 AI Actions Today"
                subtitle="Autonomous insights generated"
                action={<Button variant="ghost" size="sm">View All</Button>}
              >
                <div className="space-y-3">
                  {[
                    { action: '7 follow-ups created', time: '2 min ago', type: 'success' },
                    { action: '2 blockers detected', time: '5 min ago', type: 'danger' },
                    { action: '12 insights generated', time: '10 min ago', type: 'info' },
                    { action: '3 reminders sent', time: '15 min ago', type: 'warning' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                      <span className="text-small text-text-primary">{item.action}</span>
                      <span className="text-tiny text-text-muted">{item.time}</span>
                    </div>
                  ))}
                </div>
              </DashboardCard>
            </div>

            <div className="col-span-12 dashboard-card">
              <DashboardCard
                title="Blocked Tasks"
                subtitle="Requires immediate attention"
                icon={
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                }
              >
                <div className="space-y-3">
                  {[
                    { task: 'Authentication bug blocking login flow', owner: 'Sarah', priority: 'critical' as const },
                    { task: 'Database migration needs testing', owner: 'Mike', priority: 'high' as const },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-semantic-danger/20 bg-semantic-danger/5">
                      <div className="flex-1">
                        <p className="text-small font-medium text-text-primary mb-2">{item.task}</p>
                        <div className="flex items-center gap-3">
                          <span className="text-tiny text-text-muted">Owner: {item.owner}</span>
                          <PriorityBadge priority={item.priority} />
                        </div>
                      </div>
                      <Button variant="secondary" size="sm">Resolve</Button>
                    </div>
                  ))}
                </div>
              </DashboardCard>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
