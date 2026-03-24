'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { ScrollTrigger } from '@/lib/gsap';
import Button from './Button';

interface PricingCardProps {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  highlighted?: boolean;
  delay?: number;
}

export default function PricingCard({
  name,
  price,
  period = '/month',
  description,
  features,
  cta,
  href,
  highlighted = false,
  delay = 0,
}: PricingCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.from(el, {
      y: 40,
      opacity: 0,
      duration: 0.7,
      delay,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%' },
    });
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`relative rounded-2xl p-8 border transition-all duration-300 ${
        highlighted
          ? 'bg-surface-card border-accent-primary/50 shadow-glow-indigo scale-[1.02]'
          : 'bg-surface-card border-border hover:border-border-hover'
      }`}
    >
      <h3 className="text-xl font-semibold text-text-primary mb-2">{name}</h3>
      <div className="flex items-baseline gap-1 mb-4">
        <span className="text-4xl font-bold tracking-tight text-text-primary">{price}</span>
        <span className="text-text-secondary">{period}</span>
      </div>
      <p className="text-text-secondary text-body mb-6">{description}</p>
      <ul className="space-y-3 mb-8">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-text-secondary text-body">
            <span className="text-accent-secondary">✓</span>
            {f}
          </li>
        ))}
      </ul>
      <Button href={href} variant={highlighted ? 'primary' : 'secondary'} size="md" className="w-full">
        {cta}
      </Button>
    </div>
  );
}
