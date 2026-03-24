'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { ScrollTrigger } from '@/lib/gsap';
import SectionContainer from '@/components/elements/SectionContainer';
import Button from '@/components/elements/Button';

export default function CTA() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from(headlineRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: { trigger: headlineRef.current, start: 'top 85%' },
    });
    gsap.from(subRef.current, {
      y: 24,
      opacity: 0,
      duration: 0.6,
      delay: 0.1,
      scrollTrigger: { trigger: subRef.current, start: 'top 85%' },
    });
    gsap.from(ctaRef.current, {
      y: 24,
      opacity: 0,
      duration: 0.6,
      delay: 0.2,
      scrollTrigger: { trigger: ctaRef.current, start: 'top 85%' },
    });
  }, []);

  return (
    <SectionContainer>
      <div className="rounded-2xl bg-surface-card border border-border p-16 text-center">
        <h2 ref={headlineRef} className="text-section font-bold text-text-primary mb-4">
          Stop managing projects manually.
        </h2>
        <p ref={subRef} className="text-body-lg text-text-secondary max-w-xl mx-auto mb-10">
          Let AI run the operational layer.
        </p>
        <div ref={ctaRef}>
          <Button href="/login" size="lg" className="text-lg px-10 py-4">
            Get early access
          </Button>
        </div>
      </div>
    </SectionContainer>
  );
}
