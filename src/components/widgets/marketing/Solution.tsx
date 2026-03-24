'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import SectionContainer from '@/components/elements/SectionContainer';
import GradientText from '@/components/elements/GradientText';

export default function Solution() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from(headlineRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: { trigger: headlineRef.current, start: 'top 85%' },
    });
    gsap.from(diagramRef.current?.children ?? [], {
      y: 24,
      opacity: 0,
      duration: 0.6,
      stagger: 0.18,
      ease: 'power3.out',
      scrollTrigger: { trigger: diagramRef.current, start: 'top 80%' },
    });
  }, []);

  return (
    <SectionContainer id="solution">
      <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)] gap-16 items-center">
        {/* Left: copy */}
        <div>
          <h2
            ref={headlineRef}
            className="text-section font-semibold text-text-primary mb-6 max-w-xl"
          >
            <GradientText as="span">One system</GradientText> that understands your entire
            project.
          </h2>
          <p className="text-body text-text-secondary max-w-xl mb-4">
            AI Project Intelligence connects to the tools your engineering teams already live
            in&mdash;Jira, Slack, Notion and meeting recordings&mdash;and builds a single
            model of what&apos;s happening in the project right now.
          </p>
          <p className="text-body text-text-secondary max-w-xl">
            Instead of another place to update, it quietly reads the work you&apos;re already
            doing and turns it into live project insights, delivery risks, and workflow
            automation that actually reflect reality.
          </p>
          <ul className="mt-6 space-y-2 text-body text-text-secondary">
            <li className="flex gap-2">
              <span className="mt-[3px] text-accent-indigo">●</span>
              <span>
                Built for <span className="font-medium text-text-primary">AI project management</span>{' '}
                across product and engineering teams.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-[3px] text-accent-indigo">●</span>
              <span>
                Surfaces concrete <span className="font-medium text-text-primary">project insights</span>{' '}
                instead of noisy notifications.
              </span>
            </li>
          </ul>
        </div>

        {/* Right: input → AI → output diagram */}
        <div
          ref={diagramRef}
          className="relative rounded-2xl bg-bg-secondary border border-border-subtle px-6 py-6 lg:px-8 lg:py-7 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-mesh opacity-40 pointer-events-none" />
          <div className="relative z-10 grid gap-4">
            {/* Inputs */}
            <div className="flex flex-col gap-3">
              <p className="text-tiny uppercase tracking-[0.16em] text-text-muted">
                INPUT
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-bg-primary border border-border-subtle text-tiny text-text-secondary">
                  <span>📋</span>
                  <span>Jira issues &amp; sprints</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-bg-primary border border-border-subtle text-tiny text-text-secondary">
                  <span>💬</span>
                  <span>Slack channels &amp; alerts</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-bg-primary border border-border-subtle text-tiny text-text-secondary">
                  <span>📝</span>
                  <span>Notion specs &amp; docs</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-bg-primary border border-border-subtle text-tiny text-text-secondary">
                  <span>🎙️</span>
                  <span>Meeting transcripts</span>
                </div>
              </div>
            </div>

            {/* AI engine */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gradient-to-r from-border via-accent-indigo/60 to-border" />
              <div className="shrink-0 rounded-2xl bg-gradient-to-br from-accent-indigo/25 via-accent-cyan/20 to-accent-purple/25 border border-accent-indigo/50 px-5 py-4 shadow-subtle">
                <p className="text-tiny uppercase tracking-[0.16em] text-accent-cyan mb-1">
                  AI PROJECT ENGINE
                </p>
                <p className="text-small text-text-primary font-medium">
                  Correlates work, conversations and decisions into a live project model.
                </p>
                <p className="text-tiny text-text-secondary mt-2">
                  Detects conflicting signals, stalled work, emerging risks and missing owners
                  across tools&mdash;without changing how your team works.
                </p>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-border via-accent-cyan/60 to-border" />
            </div>

            {/* Outputs */}
            <div className="grid gap-3 md:grid-cols-2 mt-1">
              <div className="rounded-2xl bg-bg-primary border border-border-subtle px-4 py-3">
                <p className="text-tiny uppercase tracking-[0.16em] text-text-muted mb-1">
                  OUTPUT
                </p>
                <p className="text-small font-medium text-text-primary">
                  Project health &amp; delivery risk
                </p>
                <p className="text-tiny text-text-secondary mt-1">
                  Clear view of risk by project, team and sprint for faster decisions.
                </p>
              </div>
              <div className="rounded-2xl bg-bg-primary border border-border-subtle px-4 py-3">
                <p className="text-tiny uppercase tracking-[0.16em] text-text-muted mb-1">
                  AUTOMATION
                </p>
                <p className="text-small font-medium text-text-primary">
                  Workflow automation &amp; follow-ups
                </p>
                <p className="text-tiny text-text-secondary mt-1">
                  Targeted nudges to owners, prompted updates, and AI-written follow-ups that
                  unblock work instead of spamming the team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
