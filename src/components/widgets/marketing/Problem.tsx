'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import SectionContainer from '@/components/elements/SectionContainer';

const problemNodes = [
  {
    id: 'jira',
    label: 'Jira',
    emoji: '📋',
    detail: 'Tickets change status, but nobody sees the story behind them.',
  },
  {
    id: 'slack',
    label: 'Slack',
    emoji: '💬',
    detail: 'Decisions are made in threads and lost 24 hours later.',
  },
  {
    id: 'notion',
    label: 'Notion',
    emoji: '📝',
    detail: 'Specs and context live in separate docs nobody has open.',
  },
  {
    id: 'meetings',
    label: 'Meetings',
    emoji: '📅',
    detail: 'Risks surface verbally and never make it into any system.',
  },
];

export default function Problem() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headlineRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: headlineRef.current, start: 'top 80%' },
      });

      gsap.from('.problem-node', {
        y: 32,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: mapRef.current, start: 'top 78%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <SectionContainer id="problem">
      <div ref={sectionRef} className="grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-16 items-start">
        {/* Left: narrative */}
        <div className="space-y-6">
          <h2
            ref={headlineRef}
            className="text-section font-semibold text-text-primary text-left max-w-xl"
          >
            Your team isn&apos;t slow.
            <span className="block text-accent-indigo">Your work is fragmented.</span>
          </h2>
          <p className="text-body text-text-secondary max-w-xl">
            Engineering teams ship inside a maze of tools&mdash;Jira, Slack, Notion, endless
            standups. Everyone sees a slice of the project, but no one sees the whole thing.
            Context lives in different places, owned by different people, with no shared memory.
          </p>
          <p className="text-body text-text-secondary max-w-xl">
            The result: decisions take days, risks hide in meeting notes, and
            <span className="text-text-primary font-medium"> project insight depends on who
            you ask, not what&apos;s actually happening.</span>
          </p>
          <div className="inline-flex flex-wrap gap-3 mt-4">
            <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-border text-tiny text-text-secondary">
              AI project management without yet another dashboard
            </span>
            <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-border text-tiny text-text-secondary">
              Built for product &amp; engineering leaders
            </span>
          </div>
        </div>

        {/* Right: fragmented tools map */}
        <div
          ref={mapRef}
          className="relative h-full min-h-[280px] rounded-2xl bg-gradient-to-br from-bg-secondary to-bg-primary border border-border-subtle overflow-visible px-3 py-4"
        >
          <div className="absolute inset-0 opacity-40 bg-gradient-mesh pointer-events-none" />

          {/* Center node: the missing picture */}
          <div className="problem-node absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 w-56 rounded-2xl bg-bg-primary border border-dashed border-border-subtle/80 px-4 py-3 shadow-subtle">
            <p className="text-tiny uppercase tracking-[0.16em] text-text-muted mb-1">
              Today
            </p>
            <p className="text-small font-medium text-text-primary">
              No single place shows
              <br />
              how the project is really doing.
            </p>
          </div>

          {/* Orbiting tool nodes */}
          <div className="absolute inset-0">
            {/* We intentionally offset positions slightly, but keep a clear composition */}
            <div className="problem-node absolute top-2 left-[-20%] w-52 rounded-2xl bg-bg-secondary/95 border border-border-subtle px-4 py-3 backdrop-blur-xl">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{problemNodes[0].emoji}</span>
                <span className="text-small font-medium text-text-primary">
                  {problemNodes[0].label}
                </span>
              </div>
              <p className="text-tiny text-text-secondary">{problemNodes[0].detail}</p>
            </div>

            <div className="problem-node absolute top-5 right-[-10%] w-56 rounded-2xl bg-bg-secondary/95 border border-border-subtle px-4 py-3 backdrop-blur-xl">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{problemNodes[1].emoji}</span>
                <span className="text-small font-medium text-text-primary">
                  {problemNodes[1].label}
                </span>
              </div>
              <p className="text-tiny text-text-secondary">{problemNodes[1].detail}</p>
            </div>

            <div className="problem-node absolute bottom-[-5%] left-[-20%] w-60 rounded-2xl bg-bg-secondary/95 border border-border-subtle px-4 py-3 backdrop-blur-xl">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{problemNodes[2].emoji}</span>
                <span className="text-small font-medium text-text-primary">
                  {problemNodes[2].label}
                </span>
              </div>
              <p className="text-tiny text-text-secondary">{problemNodes[2].detail}</p>
            </div>

            <div className="problem-node absolute bottom-[-10%] right-[-20%] w-48 rounded-2xl bg-bg-secondary/95 border border-border-subtle px-4 py-3 backdrop-blur-xl">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{problemNodes[3].emoji}</span>
                <span className="text-small font-medium text-text-primary">
                  {problemNodes[3].label}
                </span>
              </div>
              <p className="text-tiny text-text-secondary">{problemNodes[3].detail}</p>
            </div>

            {/* Dotted connection lines from center node to tools */}
            <div className="pointer-events-none absolute inset-0">
              {/* Left spoke */}
              <div className="absolute left-[6%] top-1/2 w-[32%] h-px -translate-y-1/2 border-t border-dashed border-border-subtle/60" />
              {/* Right spoke */}
              <div className="absolute right-[6%] top-1/2 w-[32%] h-px -translate-y-1/2 border-t border-dashed border-border-subtle/60" />
              {/* Top spoke */}
              <div className="absolute left-1/2 top-[10%] h-[32%] w-px -translate-x-1/2 border-l border-dashed border-border-subtle/60" />
              {/* Bottom spoke */}
              <div className="absolute left-1/2 bottom-[6%] h-[30%] w-px -translate-x-1/2 border-l border-dashed border-border-subtle/60" />
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
