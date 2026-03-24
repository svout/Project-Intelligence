'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import SectionContainer from '@/components/elements/SectionContainer';

export default function ProductOverview() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(copyRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: copyRef.current, start: 'top 80%' },
      });

      gsap.from(visualRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: visualRef.current, start: 'top 82%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <SectionContainer id="product" className="pt-0">
      <div
        ref={sectionRef}
        className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)] gap-16 items-center"
      >
        {/* LEFT: copy */}
        <div ref={copyRef} className="space-y-5">
          <p className="text-tiny uppercase tracking-[0.16em] text-text-muted">
            Project Intelligence Platform
          </p>
          <h2 className="text-section font-semibold text-text-primary max-w-xl">
            Not a task manager.
            <span className="block text-accent-indigo">
              A system that understands your project.
            </span>
          </h2>
          <p className="text-body text-text-secondary max-w-xl">
            AI Project Intelligence reads Jira, Slack, Notion and meeting transcripts to
            maintain a live, shared understanding of your projects. It doesn&apos;t replace your
            tools; it connects them into one coherent view for product and engineering leaders.
          </p>
          <p className="text-body text-text-secondary max-w-xl">
            You get a continuously updated picture of delivery risk, project momentum and
            team productivity—without asking anyone to fill in another status report.
          </p>
          <p className="text-tiny text-text-muted max-w-xl">
            Works with: Jira, Linear (beta), Slack, Notion, Zoom / Loom transcripts, and more.
          </p>
          <p className="text-tiny text-text-secondary">
            Focused on: AI project management, project insights, workflow automation, engineering
            teams.
          </p>
        </div>

        {/* RIGHT: large visual dashboard mock */}
        <div
          ref={visualRef}
          className="relative rounded-2xl bg-bg-secondary border border-border-subtle px-5 py-5 lg:px-6 lg:py-6 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-mesh opacity-40 pointer-events-none" />

          <div className="relative z-10 space-y-4">
            {/* Top bar */}
            <div className="flex items-center justify-between gap-4 pb-2 border-b border-white/[0.06]">
              <div>
                <p className="text-tiny uppercase tracking-[0.16em] text-text-muted">
                  PROJECT OVERVIEW
                </p>
                <p className="text-small font-medium text-text-primary">
                  &quot;AI Project Intelligence core rollout&quot;
                </p>
              </div>
              <div className="flex items-center gap-2 text-tiny text-text-secondary">
                <span className="inline-flex items-center gap-1 rounded-full bg-semantic-success/10 border border-semantic-success/30 px-2.5 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-semantic-success" />
                  On track
                </span>
              </div>
            </div>

            {/* Metrics row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="rounded-xl bg-bg-primary border border-border-subtle px-3 py-3">
                <p className="text-tiny text-text-muted mb-1">Delivery risk</p>
                <p className="text-small font-semibold text-text-primary">12%</p>
              </div>
              <div className="rounded-xl bg-bg-primary border border-border-subtle px-3 py-3">
                <p className="text-tiny text-text-muted mb-1">Blocked tasks</p>
                <p className="text-small font-semibold text-semantic-danger">3</p>
              </div>
              <div className="rounded-xl bg-bg-primary border border-border-subtle px-3 py-3">
                <p className="text-tiny text-text-muted mb-1">AI follow-ups</p>
                <p className="text-small font-semibold text-accent-cyan">8 active</p>
              </div>
              <div className="rounded-xl bg-bg-primary border border-border-subtle px-3 py-3">
                <p className="text-tiny text-text-muted mb-1">Teams</p>
                <p className="text-small font-semibold text-text-primary">Platform, Web, Data</p>
              </div>
            </div>

            {/* Timeline / insights split */}
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
              {/* Left: timeline */}
              <div className="rounded-xl bg-bg-primary border border-border-subtle px-4 py-3 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-tiny text-text-muted uppercase tracking-[0.16em]">
                    Recent signals
                  </p>
                  <span className="text-tiny text-text-secondary">Last 24 hours</span>
                </div>
                <div className="space-y-2.5 text-tiny text-text-secondary">
                  <div className="flex gap-2">
                    <span className="mt-[3px] w-1.5 h-1.5 rounded-full bg-semantic-warning" />
                    <p>
                      AI flag: checkout refactor stories stuck in &quot;In review&quot; for 3 days
                      across two squads.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className="mt-[3px] w-1.5 h-1.5 rounded-full bg-semantic-danger" />
                    <p>
                      Meeting analysis: risk escalation from weekly sync—API contract still
                      undecided, launch date at risk.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className="mt-[3px] w-1.5 h-1.5 rounded-full bg-accent-cyan" />
                    <p>
                      Workflow automation: created follow-up for &quot;Align payments API
                      contract&quot; and assigned to tech lead.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: team view */}
              <div className="rounded-xl bg-bg-primary border border-border-subtle px-4 py-3 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-tiny text-text-muted uppercase tracking-[0.16em]">
                    Team snapshot
                  </p>
                  <span className="text-tiny text-text-secondary">Engineering</span>
                </div>
                <div className="space-y-2 text-tiny text-text-secondary">
                  {[
                    { name: 'Backend squad', status: '2 blockers • 1 at risk', color: 'text-semantic-warning' },
                    { name: 'Web squad', status: 'On track', color: 'text-semantic-success' },
                    { name: 'Data squad', status: 'Waiting on API decisions', color: 'text-semantic-danger' },
                  ].map((team) => (
                    <div key={team.name} className="flex items-center justify-between">
                      <span className="text-small text-text-primary">{team.name}</span>
                      <span className={`text-tiny ${team.color}`}>{team.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}

