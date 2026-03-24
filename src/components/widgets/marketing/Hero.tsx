// components/sections/HeroSection.tsx
// AI Project Intelligence - Hero Section with GSAP Animations

'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import Button from '@/components/elements/Button';
import { fadeUp, floatingAnimation } from '@/lib/animations';
import GradientText from '@/components/elements/GradientText';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      fadeUp('.hero-badge', { delay: 0.2, duration: 0.6 });
      fadeUp('.hero-button', { delay: 0.4, duration: 0.8 });
      fadeUp('.hero-title', { delay: 0.4, duration: 0.8 });
      fadeUp('.hero-description', { delay: 0.6, duration: 0.8 });

      const cards = cardsRef.current?.querySelectorAll('.float-card');
      if (cards?.length) {
        cards.forEach((card, index) => {
          floatingAnimation(card, {
            distance: 20 + index * 5,
            duration: 6 + index * 0.5,
            delay: index * 0.2,
          });
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative w-screen left-1/2 -translate-x-1/2 min-h-screen flex items-center justify-center overflow-hidden bg-transparent"
    >
      {/* Background layers - stay behind everything */}
      <div className="absolute inset-0 z-0 bg-gradient-mesh opacity-50" />
      <div className="absolute inset-0 z-0 grid-lines opacity-30" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 py-24 text-center">
        <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.12] bg-white/[0.05] backdrop-blur-sm mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-cyan"></span>
          </span>
          <span className="text-small text-text-secondary">AI-Powered Project Intelligence</span>
        </div>

        <h1 className="hero-title text-hero font-semibold text-text-primary mb-6 text-balance leading-tight">
          Never Miss a
          <br />
          <GradientText>Critical Signal</GradientText>
          <br />
          in Your Projects
        </h1>

        <p className="hero-description text-body text-text-secondary max-w-3xl mx-auto mb-12 leading-relaxed">
          AI that analyzes meetings, tasks, and team communication to detect risks,
          blockers, and project insights before they derail your timeline.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap gap-y-4">
          <Button
            href="/login"
            variant="primary"
            size="lg"
            className="hero-button"
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
          >
            Start Free Trial
          </Button>
          <Button
            href="#how-it-works"
            variant="secondary"
            size="lg"
            className="hero-button"
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          >
            Watch Demo
          </Button>
        </div>

        <div className="mt-16 flex items-center justify-center gap-8 gap-y-4 text-small text-text-muted flex-wrap">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-semantic-success" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-semantic-success" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>14-day free trial</span>
          </div>
        </div>
      </div>

      {/* Floating cards: constrain to 1440px content width */}
      <div
        ref={cardsRef}
        className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1440px] z-[2] pointer-events-none overflow-visible"
      >
        <div className="float-card absolute top-24 left-20 w-80 opacity-0 animate-fade-in" style={{ animationDelay: '1s' }}>
          <div className="glass-card p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-tiny text-text-muted uppercase">Sprint Risk</span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-tiny font-medium bg-semantic-success/10 text-semantic-success border border-semantic-success/20">
                Low
              </span>
            </div>
            <div className="text-display font-semibold text-text-primary">12%</div>
            <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
              <div className="h-full w-[12%] bg-semantic-success rounded-full" />
            </div>
          </div>
        </div>

        <div className="float-card absolute top-32 right-16 w-72 opacity-0 animate-fade-in" style={{ animationDelay: '1.2s' }}>
          <div className="glass-card p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-accent-indigo/10 flex items-center justify-center text-accent-indigo">
                🚫
              </div>
              <div className="flex-1">
                <p className="text-small font-medium text-text-primary">Blocker Detected</p>
                <p className="text-tiny text-text-muted">2 minutes ago</p>
              </div>
            </div>
            <p className="text-small text-text-secondary">API integration blocked by auth bug</p>
          </div>
        </div>

        <div className="float-card absolute bottom-40 left-20 w-64 opacity-0 animate-fade-in" style={{ animationDelay: '1.4s' }}>
          <div className="glass-card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-tiny text-text-muted uppercase">AI Actions Today</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-small">
                <span className="text-text-muted">Follow-ups</span>
                <span className="text-accent-indigo font-medium">7</span>
              </div>
              <div className="flex justify-between text-small">
                <span className="text-text-muted">Blockers</span>
                <span className="text-semantic-danger font-medium">2</span>
              </div>
              <div className="flex justify-between text-small">
                <span className="text-text-muted">Insights</span>
                <span className="text-accent-cyan font-medium">12</span>
              </div>
            </div>
          </div>
        </div>

        <div className="float-card absolute bottom-40 right-20 w-80 opacity-0 animate-fade-in" style={{ animationDelay: '1.6s' }}>
          <div className="glass-card p-4 space-y-3">
            <p className="text-small font-medium text-text-primary">Next Meeting Agenda</p>
            <div className="space-y-2">
              {['API versioning discussion', 'Auth bug post-mortem', 'Sprint planning'].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-small text-text-secondary">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-indigo" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
