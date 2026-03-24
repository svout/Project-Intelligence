'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { gsap } from '@/lib/gsap';
import Button from '@/components/elements/Button';
import GradientText from '@/components/elements/GradientText';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    gsap.from(el, { y: -20, opacity: 0, duration: 0.6, ease: 'power3.out' });
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-surface/80 backdrop-blur-xl border-b border-border`}
    >
      <div className="max-w-content mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-text-primary">
            AI Project <GradientText>Intelligence</GradientText>
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <a href="#problem" className="text-text-secondary hover:text-text-primary text-body transition-colors">
            Problem
          </a>
          <a href="#solution" className="text-text-secondary hover:text-text-primary text-body transition-colors">
            Solution
          </a>
          <a href="#how-it-works" className="text-text-secondary hover:text-text-primary text-body transition-colors">
            How it works
          </a>
          <a href="#features" className="text-text-secondary hover:text-text-primary text-body transition-colors">
            Features
          </a>
          <a href="/pricing" className="text-text-secondary hover:text-text-primary text-body transition-colors">
            Pricing
          </a>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-text-secondary hover:text-text-primary text-body font-medium transition-colors">
            Sign in
          </Link>
          <Button href="/login" size="md">
            Get early access
          </Button>
        </div>
      </div>
    </nav>
  );
}
