'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import Button from '@/components/elements/Button';

type PlanKey = 'starter' | 'base' | 'pro';

export type PricingPlan = {
  key: PlanKey;
  name: string;
  description: string;
  highlighted?: boolean;
  prices: {
    monthly: number;
    yearlyMonthlyEq: number;
  };
  features: string[];
  cta: string;
  href: string;
};

export default function PricingCard({
  plan,
  interval,
  delay = 0,
}: {
  plan: PricingPlan;
  interval: 'monthly' | 'yearly';
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const priceRef = useRef<HTMLSpanElement | null>(null);

  const price =
    interval === 'monthly' ? plan.prices.monthly : plan.prices.yearlyMonthlyEq;

  useEffect(() => {
    if (!ref.current) return;
    gsap.from(ref.current, {
      y: 40,
      opacity: 0,
      duration: 0.7,
      delay,
      ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 85%' },
    });
  }, [delay]);

  useEffect(() => {
    if (!priceRef.current) return;
    gsap.fromTo(
      priceRef.current,
      { opacity: 0, scale: 0.98 },
      { opacity: 1, scale: 1, duration: 0.25, ease: 'power3.out' }
    );
  }, [interval, price]);

  return (
    <div
      ref={ref}
      className={[
        'pricing-card relative rounded-2xl border p-6 transition-all duration-300 h-full',
        plan.highlighted
          ? 'bg-bg-secondary border-accent-indigo/55 shadow-glow-indigo scale-[1.07] z-10'
          : 'bg-bg-secondary/60 border-border-subtle hover:border-border-hover hover:bg-bg-secondary',
      ].join(' ')}
    >
      <div className="flex h-full flex-col items-start text-left space-y-4">
        <div
          className={`w-full flex flex-col items-start space-y-2`}
        >
          <h3 className="text-small font-semibold text-text-primary">{plan.name}</h3>

          <p className="text-tiny text-text-secondary">{plan.description}</p>
        </div>

        <div className="w-full flex flex-col items-start space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold tracking-tight text-text-primary leading-none">
              <span ref={priceRef}>${price}</span>
            </span>
            <span className="text-text-secondary text-small leading-none">/mo</span>
          </div>
          {interval === 'yearly' ? (
            <p className="text-tiny text-text-secondary">Billed yearly. Equivalent to ${price}/mo.</p>
          ) : (
            <p className="text-tiny text-text-secondary">Billed monthly. Cancel anytime.</p>
          )}
        </div>

        <ul className="w-full space-y-3 pt-2">
          {plan.features.map((f) => (
            <li
              key={f}
              className="flex items-center justify-start gap-2 text-tiny text-text-secondary"
            >
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-semantic-success/10 border border-semantic-success/20">
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 text-semantic-success"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="leading-relaxed">{f}</span>
            </li>
          ))}
        </ul>

        <div className="w-full pt-4 mt-auto">
          <Button
            href={plan.href}
            variant={plan.highlighted ? 'primary' : 'secondary'}
            size="lg"
            className="w-full"
          >
            {plan.cta}
          </Button>
        </div>
      </div>
    </div>
  );
}

