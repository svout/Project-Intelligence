'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import SectionContainer from '@/components/elements/SectionContainer';

export default function DashboardPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mockRef.current;
    if (!el) return;
    gsap.from(el, {
      y: 80,
      opacity: 0,
      scale: 0.98,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%' },
    });
    gsap.to(el, {
      y: -20,
      ease: 'none',
      scrollTrigger: { trigger: containerRef.current, start: 'top bottom', end: 'bottom top', scrub: 0.5 },
    });
  }, []);

  return (
    <SectionContainer>
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-16 items-center">
        <div className="space-y-4">
          <p className="text-tiny uppercase tracking-[0.16em] text-text-muted">Dashboard preview</p>
          <h2 className="text-section font-semibold text-text-primary max-w-xl">
            One view that stays correct while the team moves.
          </h2>
          <p className="text-body text-text-secondary max-w-xl">
            Instead of chasing updates, AI Project Intelligence merges what your team does in Jira,
            what gets decided in Slack and meetings, and what plans live in Notion into a reliable
            project picture for engineering teams.
          </p>

          <div className="space-y-2">
            {[
              { k: 'Project Health', v: 'Delivery risk & momentum' },
              { k: 'Blocked Tasks', v: 'Where work is stuck and why' },
              { k: 'AI Actions', v: 'Follow-ups created with owners' },
              { k: 'Team Insights', v: 'Capacity & handoff risk' },
            ].map((row) => (
              <div key={row.k} className="flex items-start justify-between gap-6 rounded-2xl bg-white/[0.03] border border-border-subtle px-4 py-3">
                <p className="text-small font-medium text-text-primary">{row.k}</p>
                <p className="text-tiny text-text-secondary text-right">{row.v}</p>
              </div>
            ))}
          </div>
        </div>

        <div ref={containerRef} className="rounded-2xl overflow-hidden">
          <div
            ref={mockRef}
            className="relative bg-surface-card border border-border-subtle rounded-2xl p-8 shadow-card-hover"
          >
            <div className="absolute inset-0 bg-gradient-mesh opacity-20 pointer-events-none" />
            <div className="relative z-10">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'Project Health', value: 'Healthy' },
                  { label: 'Blocked Tasks', value: '2 open' },
                  { label: 'AI Actions', value: '5 today' },
                  { label: 'Team Insights', value: '3 active' },
                ].map((card) => (
                  <div
                    key={card.label}
                    className="bg-surface-elevated rounded-card p-4 border border-border"
                  >
                    <p className="text-text-secondary text-sm mb-1">{card.label}</p>
                    <p className="text-text-primary font-semibold">{card.value}</p>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] gap-4">
                <div className="h-44 bg-surface-elevated rounded-card border border-border px-5 py-4">
                  <p className="text-tiny uppercase tracking-[0.16em] text-text-muted mb-3">
                    Risk signals
                  </p>
                  <div className="space-y-3 text-tiny text-text-secondary">
                    <div className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 mt-[6px] rounded-full bg-semantic-warning" />
                      <span>Checkout refactor delayed in &quot;In review&quot; for 3 days.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 mt-[6px] rounded-full bg-semantic-danger" />
                      <span>Meeting note shows unresolved API contract decision.</span>
                    </div>
                  </div>
                </div>
                <div className="h-44 bg-surface-elevated rounded-card border border-border px-5 py-4">
                  <p className="text-tiny uppercase tracking-[0.16em] text-text-muted mb-3">
                    AI follow-ups
                  </p>
                  <div className="space-y-3">
                    {[
                      { t: 'Assign owner', c: 'text-accent-indigo' },
                      { t: 'Post summary', c: 'text-accent-cyan' },
                      { t: 'Create follow-up in Jira', c: 'text-text-primary' },
                    ].map((item) => (
                      <div
                        key={item.t}
                        className="rounded-xl bg-bg-primary/40 border border-border-subtle px-3 py-2 flex items-center justify-between gap-4"
                      >
                        <span className={`text-tiny font-medium ${item.c}`}>{item.t}</span>
                        <span className="text-tiny text-text-muted">✓</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
