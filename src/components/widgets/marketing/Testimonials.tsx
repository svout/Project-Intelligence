'use client';

import { useMemo, useState } from 'react';
import SectionContainer from '@/components/elements/SectionContainer';
import TestimonialCard from '@/components/elements/TestimonialCard';

const testimonials = [
  {
    quote: 'We stopped losing critical context from standups. The AI follow-ups alone saved us multiple firefights.',
    author: 'Sarah Chen',
    role: 'CTO, Series A Startup',
  },
  {
    quote: 'Finally one place that understands both our Jira and our meetings. Risk visibility went from reactive to proactive.',
    author: 'Marcus Webb',
    role: 'Engineering Manager',
  },
  {
    quote: 'As a founder I need to know where we’re really at. This gives me that without another tool to check.',
    author: 'Jordan Lee',
    role: 'Startup Founder',
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = useMemo(() => testimonials[activeIndex] ?? testimonials[0], [activeIndex]);

  return (
    <SectionContainer>
      <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-16 items-start">
        <div className="space-y-4">
          <p className="text-tiny uppercase tracking-[0.16em] text-text-muted">Proof</p>
          <h2 className="text-section font-semibold text-text-primary max-w-xl">
            Teams stop losing context. Risk becomes visible.
          </h2>
          <p className="text-body text-text-secondary max-w-xl">
            The outcome is consistent: fewer firefights, faster decisions, and follow-ups that actually ship.
          </p>

          <div className="rounded-2xl bg-bg-secondary border border-border-subtle p-6">
            <p className="text-body-lg text-text-primary font-semibold leading-relaxed">
              &ldquo;{active.quote}&rdquo;
            </p>
            <div className="mt-4">
              <p className="text-small font-semibold text-text-primary">{active.author}</p>
              <p className="text-tiny text-text-secondary">{active.role}</p>
            </div>
            <div className="mt-4 flex gap-2 text-tiny text-text-secondary">
              <span className="text-accent-indigo">●</span>
              <span>Fast context recovery across Jira + meetings</span>
            </div>
          </div>
        </div>

        <div>
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-2 px-2 [scrollbar-width:none]">
            <style jsx global>{`
              *::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {testimonials.map((t, i) => (
              <div
                key={t.author}
                className={`snap-start min-w-[360px] transition-all duration-200 ${
                  activeIndex === i ? 'ring-1 ring-accent-indigo/60' : 'ring-0'
                } rounded-2xl`}
                onMouseEnter={() => setActiveIndex(i)}
              >
                <TestimonialCard
                  quote={t.quote}
                  author={t.author}
                  role={t.role}
                  delay={i * 0.06}
                />
              </div>
            ))}
          </div>

          <p className="text-tiny text-text-muted mt-2">
            Hover a card to update the quote.
          </p>
        </div>
      </div>
    </SectionContainer>
  );
}
