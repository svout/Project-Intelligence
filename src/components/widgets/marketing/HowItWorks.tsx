'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import SectionContainer from '@/components/elements/SectionContainer';

const steps = [
  {
    num: '01',
    title: 'Connect your project surface',
    desc: 'Securely connect Jira, Slack, Notion and meeting transcripts for the projects you want AI to watch.',
    details: [
      'Choose which projects, channels and calendars to mirror.',
      'No change to how engineers create tickets or write docs.',
    ],
  },
  {
    num: '02',
    title: 'AI builds a live project model',
    desc: 'The engine continuously correlates tickets, threads and meetings into one understanding of progress and risk.',
    details: [
      'Flags tickets with risk signals from comments, standups and incidents.',
      'Detects missing owners, stale work and cross-team dependencies.',
    ],
  },
  {
    num: '03',
    title: 'Surface real actions&mdash;not another feed',
    desc: 'Leaders see the few things that matter: where delivery is at risk and what to do next.',
    details: [
      'AI-generated follow-ups assigned to the right person in your tools.',
      'Digestible project insights you can drop into planning docs or Slack.',
    ],
  },
];

export default function HowItWorks() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from(headlineRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: { trigger: headlineRef.current, start: 'top 85%' },
    });
    gsap.from(stepsRef.current?.children ?? [], {
      y: 48,
      opacity: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: { trigger: stepsRef.current, start: 'top 82%' },
    });
  }, []);

  return (
    <SectionContainer id="how-it-works">
      <div className="space-y-10">
        <div className="max-w-3xl">
          <h2
            ref={headlineRef}
            className="text-section font-semibold text-text-primary mb-4"
          >
            How it works in practice
          </h2>
          <p className="text-body text-text-secondary">
            Under the hood, AI Project Intelligence behaves like a staff PM that never sleeps:
            it reads what your team is already doing and turns it into concrete project
            insights, team productivity signals and workflow automation.
          </p>
        </div>

        <div
          ref={stepsRef}
          className="grid gap-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
        >
          {/* Steps list */}
          <div className="space-y-6">
            {steps.map((s) => (
              <div
                key={s.num}
                className="rounded-2xl bg-bg-secondary border border-border-subtle px-5 py-4"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-indigo to-accent-cyan flex items-center justify-center text-tiny font-semibold text-white">
                    {s.num}
                  </div>
                  <h3 className="text-small font-semibold text-text-primary">{s.title}</h3>
                </div>
                <p className="text-tiny text-text-secondary mb-2">{s.desc}</p>
                <ul className="space-y-1.5 text-tiny text-text-secondary">
                  {s.details.map((line) => (
                    <li key={line} className="flex gap-2">
                      <span className="mt-[3px] text-accent-indigo">•</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Example view / outcome */}
          <div className="rounded-2xl bg-bg-secondary border border-border-subtle px-5 py-5 lg:px-6 lg:py-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-tiny uppercase tracking-[0.16em] text-text-muted">
                  LIVE PROJECT SNAPSHOT
                </p>
                <p className="text-small font-medium text-text-primary">
                  &quot;Web onboarding revamp&quot;
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-semantic-warning/10 border border-semantic-warning/30 px-3 py-1 text-tiny text-semantic-warning">
                2 delivery risks
              </span>
            </div>

            <div className="space-y-3">
              <div className="rounded-xl bg-bg-primary border border-border-subtle px-4 py-3">
                <p className="text-tiny text-text-muted mb-1">AI project insight</p>
                <p className="text-small text-text-primary">
                  Sprint 12 is at risk: checkout refactor PRs are blocked waiting on API
                  contract decisions from the payments team.
                </p>
              </div>
              <div className="rounded-xl bg-bg-primary border border-border-subtle px-4 py-3">
                <p className="text-tiny text-text-muted mb-1">Workflow automation</p>
                <p className="text-small text-text-primary">
                  Created follow-up in Jira for &quot;Align payments API contract&quot; and
                  assigned to project tech lead. Posted summary and owners in #proj-onboarding
                  on Slack.
                </p>
              </div>
            </div>

            <div className="mt-2 flex flex-wrap gap-3 text-tiny text-text-secondary">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/[0.04] border border-border-subtle">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-indigo" />
                AI project management, not another PM tool
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/[0.04] border border-border-subtle">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
                Built to boost team productivity, not micromanage
              </span>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
