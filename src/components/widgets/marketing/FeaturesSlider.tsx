'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import SectionContainer from '@/components/elements/SectionContainer';
import { cardHoverLift } from '@/lib/animations';

const differentiation = [
  {
    label: 'Signals, not noise',
    title: 'AI that points at 3 things, not 300 alerts',
    body: 'Every cycle, the system selects the few project risks that truly matter and explains why—based on tickets, threads and meetings.',
    tag: 'Unique prioritisation engine',
  },
  {
    label: 'Understands narrative',
    title: 'Project memory that survives beyond one meeting',
    body: 'AI remembers what was said, promised and decided across weeks of meetings and threads, so context doesn&apos;t reset every Monday.',
    tag: 'Long-horizon project memory',
  },
  {
    label: 'Works with your stack',
    title: 'No new workflow for engineering teams',
    body: 'Engineers keep using Jira, Slack and Notion. AI Project Intelligence listens in the background and automates what humans hate doing.',
    tag: 'Zero-friction adoption',
  },
  {
    label: 'Designed for leaders',
    title: 'One view for product & engineering leadership',
    body: 'Leaders see a single, reliable picture of delivery risk, team productivity and workflow automation—without chasing status.',
    tag: 'Shared source of truth',
  },
];

export default function FeaturesSlider() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (trackRef.current) {
        Array.from(trackRef.current.children).forEach((child) => {
          cardHoverLift(child as HTMLElement);
        });
      }

      gsap.from('.diff-card', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <SectionContainer>
      <div ref={sectionRef} className="space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-tiny uppercase tracking-[0.16em] text-text-muted">
              Why AI Project Intelligence is different
            </p>
            <h2 className="text-section font-semibold text-text-primary mt-2">
              Built for real projects, not demo data.
            </h2>
          </div>
          <p className="text-tiny text-text-secondary max-w-sm">
            A lot of &quot;AI for teams&quot; stops at pretty dashboards. We focus on the ugly
            middle: tangled dependencies, half-written tickets, and meetings that nobody has
            time to summarize.
          </p>
        </div>

        <div
          ref={trackRef}
          className="grid gap-4 lg:grid-cols-4 md:grid-cols-2 auto-rows-fr"
        >
          {differentiation.map((item) => (
            <div
              key={item.title}
              className="diff-card relative rounded-2xl bg-bg-secondary border border-border-subtle px-4 py-4 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent-indigo/10 via-transparent to-accent-cyan/10 opacity-60 pointer-events-none" />
              <div className="relative z-10 flex flex-col h-full gap-3">
                <p className="text-tiny text-text-muted uppercase tracking-[0.16em]">
                  {item.label}
                </p>
                <h3 className="text-small font-semibold text-text-primary">
                  {item.title}
                </h3>
                <p className="text-tiny text-text-secondary flex-1">{item.body}</p>
                <div className="mt-2 inline-flex items-center gap-2 text-tiny text-text-secondary">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-indigo" />
                  <span>{item.tag}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}

