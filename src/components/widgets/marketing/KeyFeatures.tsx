'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import SectionContainer from '@/components/elements/SectionContainer';

const featureGrid = [
  {
    title: 'AI meeting analysis',
    body: 'Every transcript is parsed for blockers, decisions, owners and dates. Insights are tied back to the right projects and tasks.',
  },
  {
    title: 'Delivery risk detection',
    body: 'Combines ticket history, comments and incident chatter to detect delivery risk before it hits the roadmap review.',
  },
  {
    title: 'Project memory',
    body: 'Keeps a long-lived memory of what was agreed and why—so you can reconstruct decisions weeks later without hunting through Slack.',
  },
  {
    title: 'Team productivity signals',
    body: 'Highlights where teams are blocked, where work is piling up and where there is room to take on more.',
  },
  {
    title: 'Workflow automation',
    body: 'Creates follow-ups, nudges and summaries automatically in Jira and Slack, reducing manual project management overhead.',
  },
  {
    title: 'Cross-tool context',
    body: 'Connects Jira issues, Notion docs, and Slack threads into one graph, so every insight is backed by traceable context.',
  },
  {
    title: 'Leader-friendly views',
    body: 'Gives product and engineering leaders the same, reliable picture of status—without asking engineers to change tools.',
  },
  {
    title: 'Private by design',
    body: 'Respects workspace boundaries and only analyzes the projects and channels you explicitly connect.',
  },
];

export default function KeyFeatures() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.key-feature', {
        y: 32,
        opacity: 0,
        duration: 0.55,
        stagger: 0.06,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <SectionContainer id="key-features">
      <div ref={sectionRef} className="space-y-6">
        <div className="max-w-3xl">
          <h2 className="text-section font-semibold text-text-primary mb-3">
            Depth where it matters.
          </h2>
          <p className="text-body text-text-secondary">
            Under the hood, AI Project Intelligence combines project analytics, AI meeting
            analysis and workflow automation into a single product built for engineering teams.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {featureGrid.map((f) => (
            <div
              key={f.title}
              className="key-feature rounded-2xl bg-bg-secondary border border-border-subtle px-4 py-4"
            >
              <h3 className="text-small font-semibold text-text-primary mb-1">
                {f.title}
              </h3>
              <p className="text-tiny text-text-secondary">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}

