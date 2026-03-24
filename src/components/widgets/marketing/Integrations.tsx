'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import SectionContainer from '@/components/elements/SectionContainer';
import IntegrationLogo from '@/components/elements/IntegrationLogo';

const logos = ['Slack', 'Jira', 'Notion', 'GitHub', 'Google Meet'];

export default function Integrations() {
  const trackRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const tweenRef = useRef<any>(null);

  useEffect(() => {
    gsap.from(headlineRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: { trigger: headlineRef.current, start: 'top 85%' },
    });
    if (trackRef.current) {
      const width = trackRef.current.scrollWidth / 2;
      tweenRef.current = gsap.to(trackRef.current, {
        x: -width,
        duration: 20,
        repeat: -1,
        ease: 'none',
      });
    }

    return () => {
      tweenRef.current?.kill?.();
    };
  }, []);

  return (
    <SectionContainer>
      <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-16 items-start">
        <div className="space-y-4">
          <p className="text-tiny uppercase tracking-[0.16em] text-text-muted">Integrations</p>
          <h2
            ref={headlineRef}
            className="text-section font-semibold text-text-primary max-w-xl"
          >
            Connect tools. Keep workflows. Get project insights.
          </h2>
          <p className="text-body text-text-secondary max-w-xl">
            AI Project Intelligence listens in the background across the tools your engineering team uses.
            You&apos;re not forced to change how work happens.
          </p>
          <div className="flex flex-wrap gap-2">
            {['Jira', 'Slack', 'Notion', 'Meetings'].map((t) => (
              <span
                key={t}
                className="inline-flex items-center px-3 py-1 rounded-full text-tiny text-text-secondary bg-white/[0.04] border border-border-subtle"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden border border-border-subtle bg-bg-secondary px-6 py-6">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-bg-secondary to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-bg-secondary to-transparent" />

          <div
            className="overflow-hidden"
            onMouseEnter={() => tweenRef.current?.pause?.()}
            onMouseLeave={() => tweenRef.current?.resume?.()}
          >
            <div ref={trackRef} className="flex gap-6 w-max py-2">
              {[...logos, ...logos].map((name, i) => (
                <div key={`${name}-${i}`} className="shrink-0">
                  <IntegrationLogo name={name} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
