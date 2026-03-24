'use client';

import { useEffect, useMemo, useRef } from 'react';
import { gsap } from '@/lib/gsap';

export type BillingInterval = 'monthly' | 'yearly';

export default function PricingToggle({
  interval,
  onIntervalChange,
}: {
  interval: BillingInterval;
  onIntervalChange: (v: BillingInterval) => void;
}) {
  const thumbRef = useRef<HTMLDivElement | null>(null);

  const thumbX = useMemo(() => (interval === 'monthly' ? 0 : 1), [interval]);

  useEffect(() => {
    if (!thumbRef.current) return;
    gsap.to(thumbRef.current, {
      xPercent: thumbX === 0 ? 0 : 100,
      duration: 0.35,
      ease: 'power3.out',
    });
  }, [thumbX]);

  return (
    <div className="flex items-center justify-center">
      <div className="relative w-[360px] max-w-full rounded-full border border-border-subtle bg-white/[0.03] p-1">
        <div
          ref={thumbRef}
          className="absolute top-1 left-1 w-[calc(50%-8px)] h-[calc(100%-8px)] rounded-full bg-accent-indigo/20 border border-accent-indigo/40"
        />

        <div className="relative z-10 grid grid-cols-2">
          <button
            type="button"
            className={`py-3 text-small font-medium rounded-full transition-colors ${
              interval === 'monthly' ? 'text-text-primary' : 'text-text-muted'
            }`}
            onClick={() => onIntervalChange('monthly')}
          >
            Monthly
          </button>
          <button
            type="button"
            className={`py-3 text-small font-medium rounded-full transition-colors ${
              interval === 'yearly' ? 'text-text-primary' : 'text-text-muted'
            }`}
            onClick={() => onIntervalChange('yearly')}
          >
            Yearly
          </button>
        </div>

        <div className="absolute inset-0 pointer-events-none rounded-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-accent-indigo/10 via-transparent to-accent-cyan/10" />
        </div>
      </div>
    </div>
  );
}

