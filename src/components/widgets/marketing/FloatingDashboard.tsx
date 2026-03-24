'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';

export default function FloatingDashboard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = [card1Ref.current, card2Ref.current, card3Ref.current].filter(Boolean) as HTMLDivElement[];
    if (cards.length === 0) return;
    gsap.to(cards, {
      y: -8,
      duration: 2.5,
      stagger: { each: 0.3, from: 'random' },
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    gsap.from(el, {
      opacity: 0,
      x: 60,
      duration: 1,
      delay: 0.4,
      ease: 'power3.out',
    });
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 rounded-2xl blur-2xl" />
      <div className="relative bg-surface-card border border-border rounded-2xl p-6 shadow-card space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-text-secondary text-sm font-medium">Sprint Risk</span>
          <span className="text-accent-secondary font-semibold">12%</span>
        </div>
        <div className="h-2 bg-surface-elevated rounded-full overflow-hidden">
          <div className="h-full w-[12%] bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full" />
        </div>

        <div ref={card1Ref} className="pt-4 border-t border-border">
          <p className="text-text-secondary text-sm mb-1">Blocked Tasks</p>
          <p className="text-text-primary font-semibold">1 — Auth API</p>
        </div>
        <div ref={card2Ref} className="bg-surface-elevated/50 rounded-xl p-3">
          <p className="text-text-secondary text-sm mb-1">AI Follow-ups</p>
          <p className="text-text-primary text-sm">3 open • 2 completed today</p>
        </div>
        <div ref={card3Ref} className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-text-secondary text-sm">AI monitoring active</span>
        </div>
      </div>
    </div>
  );
}
