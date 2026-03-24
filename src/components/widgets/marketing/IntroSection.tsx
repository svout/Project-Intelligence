'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import SectionContainer from '@/components/elements/SectionContainer';

const blocks = [
  {
    title: 'No manual status theater',
    body: 'AI Project Intelligence reads the work where it already happens—tickets, threads, docs and meetings—so leaders get clarity without begging for updates.',
  },
  {
    title: 'Automation that feels natural',
    body: 'Instead of yet another inbox, the system creates precise follow-ups, pings and summaries directly in the tools your engineering teams use every day.',
  },
  {
    title: 'Clarity across fragmented tools',
    body: 'Jira shows tickets. Slack shows conversations. Notion shows plans. AI Project Intelligence connects them into a single story: where the project really stands.',
  },
];

export default function IntroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.intro-block', {
        y: 32,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <SectionContainer>
      <div
        ref={sectionRef}
        className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)] items-start"
      >
        <div className="space-y-4">
          <p className="text-tiny uppercase tracking-[0.16em] text-text-muted">
            Why this exists
          </p>
          <h2 className="text-section font-semibold text-text-primary max-w-xl">
            Projects fail quietly long before they miss a date.
          </h2>
          <p className="text-body text-text-secondary max-w-xl">
            We built AI Project Intelligence because traditional project management tools see
            tasks, not reality. The risk lives in side conversations, meeting notes and docs
            that nobody has time to keep in sync.
          </p>
        </div>

        <div className="space-y-4">
          {blocks.map((block) => (
            <div
              key={block.title}
              className="intro-block rounded-2xl bg-bg-secondary border border-border-subtle px-4 py-4"
            >
              <h3 className="text-small font-semibold text-text-primary mb-1">
                {block.title}
              </h3>
              <p className="text-tiny text-text-secondary">{block.body}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}

