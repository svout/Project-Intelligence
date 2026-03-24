'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import SectionContainer from '@/components/elements/SectionContainer';
import Button from '@/components/elements/Button';

export default function PricingCTA() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.from(ref.current, {
      y: 40,
      opacity: 0,
      duration: 0.75,
      ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 85%' },
    });
  }, []);

  return (
    <SectionContainer>
      <div ref={ref} className="rounded-2xl border border-border-subtle bg-bg-secondary/40 px-6 py-10 md:px-12 md:py-14">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <p className="text-tiny uppercase tracking-[0.16em] text-text-muted">
            Next step
          </p>
          <h2 className="text-section font-semibold text-text-primary">
            Start improving your workflow today
          </h2>
          <p className="text-body text-text-secondary">
            Join teams that already use AI to manage projects smarter—less chasing, more clarity.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:justify-center pt-2">
            <Button href="/login" size="lg" variant="primary" className="px-10 py-4">
              Get started
            </Button>
            <Button href="/#how-it-works" size="lg" variant="secondary" className="px-10 py-4">
              Watch demo
            </Button>
          </div>

          <div className="pt-2 text-tiny text-text-muted">
            No setup calls required. Connect your tools and get your first signals.
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}

