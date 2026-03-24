'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { ScrollTrigger } from '@/lib/gsap';
import Card from './Card';
// Uses Card with depth=1 (default)

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  delay?: number;
}

export default function TestimonialCard({ quote, author, role, delay = 0 }: TestimonialCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.from(el, {
      y: 36,
      opacity: 0,
      duration: 0.7,
      delay,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%' },
    });
  }, [delay]);

  return (
    <Card ref={ref} className="h-full flex flex-col">
      <p className="text-text-primary text-body-lg mb-6 flex-1">&ldquo;{quote}&rdquo;</p>
      <div>
        <p className="font-semibold text-text-primary">{author}</p>
        <p className="text-sm text-text-secondary">{role}</p>
      </div>
    </Card>
  );
}
