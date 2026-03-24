'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import SectionContainer from '@/components/elements/SectionContainer';
import FeatureCard from '@/components/elements/FeatureCard';
import AnimatedCard from '@/components/elements/AnimatedCard';

const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    title: 'AI Risk Radar',
    description:
      'Correlates Jira activity, threads and meeting signals to surface delivery risk before it becomes a roadmap problem.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    title: 'Autonomous Follow-ups',
    description:
      'Creates and tracks follow-ups from commitments—assigned to the right owner, posted back into Jira/Slack so nothing disappears.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Meeting Intelligence',
    description:
      'Parses transcripts for blockers, decisions, owners and due dates—then turns them into project signals leaders can act on.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: 'Sprint Prediction',
    description:
      'Flags scope creep and timeline drift using recent work patterns so teams can adjust before planning breaks.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'Team Insights',
    description:
      'Shows where teams stall, who is carrying load, and where handoffs are at risk—without digging through status updates.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    title: 'Dependency Mapping',
    description:
      'Builds cross-tool dependency context so alerts point to the chain—when it matters, not when it’s already late.',
  },
];

export default function Features() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const active = features[activeIndex] ?? features[0];
  const outputChips = useMemo(() => {
    const map: Record<number, string[]> = {
      0: ['Delivery risk', 'Stalled work', 'Decision gaps'],
      1: ['Follow-ups created', 'Owners assigned', 'Status backfilled'],
      2: ['Blockers found', 'Actions extracted', 'Agenda drafted'],
      3: ['Timeline drift', 'Scope creep', 'Planning adjustments'],
      4: ['Blocked teams', 'Capacity signals', 'Handoff alerts'],
      5: ['Dependency chains', 'At-risk links', 'Root cause hints'],
    };
    return map[activeIndex] ?? ['Project signals', 'Risk alerts', 'Actionable outputs'];
  }, [activeIndex]);

  useEffect(() => {
    gsap.from(headlineRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: { trigger: headlineRef.current, start: 'top 85%' },
    });
  }, []);

  return (
    <SectionContainer id="features">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-16 items-start">
        <div className="space-y-4">
          <p className="text-tiny uppercase tracking-[0.16em] text-text-muted">Key features</p>
          <h2
            ref={headlineRef}
            className="text-section font-semibold text-text-primary max-w-xl"
          >
            Signal / context / action, for engineering teams.
          </h2>
          <p className="text-body text-text-secondary max-w-xl">
            AI Project Intelligence isn&apos;t a task manager. It turns messy work across Jira,
            Slack, Notion and meetings into project insights and workflow automation your team can use.
          </p>

          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-tiny text-text-secondary bg-white/[0.04] border border-border-subtle">
              Workflow automation
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-tiny text-text-secondary bg-white/[0.04] border border-border-subtle">
              Project insights
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-tiny text-text-secondary bg-white/[0.04] border border-border-subtle">
              Team productivity signals
            </span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="relative rounded-2xl bg-bg-secondary border border-border-subtle overflow-hidden px-5 py-5 lg:px-6 lg:py-6">
            <div className="absolute inset-0 bg-gradient-mesh opacity-35 pointer-events-none" />
            <div className="relative z-10">
              <p className="text-tiny uppercase tracking-[0.16em] text-text-muted">
                Preview
              </p>
              <h3 className="text-small font-semibold text-text-primary mt-2">
                {active.title}
              </h3>
              <p className="text-tiny text-text-secondary mt-2">
                {active.description}
              </p>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                {outputChips.map((c) => (
                  <div
                    key={c}
                    className="rounded-xl bg-bg-primary border border-border-subtle px-3 py-2"
                  >
                    <p className="text-tiny text-text-primary font-medium">{c}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-2 px-2 [scrollbar-width:none]">
              {features.map((f, i) => (
                <div
                  key={f.title}
                  className="snap-start min-w-[320px] flex-shrink-0"
                  onMouseEnter={() => setActiveIndex(i)}
                >
                  <div
                    className={`rounded-2xl transition-all duration-300 ${
                      activeIndex === i
                        ? 'ring-1 ring-accent-indigo/50 bg-bg-secondary/30'
                        : 'bg-transparent'
                    }`}
                  >
                    <AnimatedCard delay={i * 0.06} className="h-full">
                      <FeatureCard icon={f.icon} title={f.title} description={f.description} />
                    </AnimatedCard>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-tiny text-text-muted mt-2">
              Hover a capability to update the preview.
            </p>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
