'use client';

import Link from 'next/link';
import Button from '@/components/elements/Button';
import { Card } from '@/components/elements/Card';

const steps = [
  {
    title: 'Connect integrations',
    description: 'Connect Jira, Slack, Notion, or Loom so AI can see your project activity.',
    cta: { label: 'Open integrations', href: '/settings/integrations' },
  },
  {
    title: 'Upload a meeting or connect Loom',
    description: 'Upload a transcript or connect Loom to automatically analyze recordings.',
    cta: { label: 'Upload meeting', href: '/meetings/upload' },
  },
  {
    title: 'View AI insights dashboard',
    description: 'See blockers, risks, and follow-ups on your AI-powered dashboard.',
    cta: { label: 'Go to dashboard', href: '/dashboard' },
  },
];

export default function OnboardingPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-10">
      <div className="text-center space-y-3">
        <p className="text-tiny font-medium tracking-[0.18em] uppercase text-text-muted">
          Welcome to Project Intelligence
        </p>
        <h1 className="text-h1 font-semibold text-text-primary">
          Get set up in three steps
        </h1>
        <p className="text-body text-text-secondary max-w-2xl mx-auto">
          Connect your tools, analyze your first meeting, and unlock AI insights on your
          projects.
        </p>
      </div>

      <div className="flex items-center gap-3 justify-center">
        {steps.map((_, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-accent-indigo/20 border border-accent-indigo/40 flex items-center justify-center text-tiny text-accent-indigo">
              {index + 1}
            </div>
            {index < steps.length - 1 && (
              <div className="w-12 h-px bg-white/10" />
            )}
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((step) => (
          <Card key={step.title} depth={1} hover className="flex flex-col justify-between">
            <div className="space-y-3">
              <h2 className="text-h3 font-semibold text-text-primary">{step.title}</h2>
              <p className="text-small text-text-secondary">{step.description}</p>
            </div>
            <div className="pt-4">
              <Link href={step.cta.href}>
                <Button variant="secondary" size="sm">
                  {step.cta.label}
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

