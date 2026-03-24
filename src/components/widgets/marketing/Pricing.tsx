'use client';

import SectionContainer from '@/components/elements/SectionContainer';
import PricingCard from '@/components/elements/PricingCard';

const plans = [
  {
    name: 'Starter',
    price: '$29',
    period: '/month',
    description: 'For small teams getting started with AI project insights.',
    features: ['Up to 5 team members', '1 project', 'Meeting analysis', 'Risk dashboard'],
    cta: 'Start free trial',
    href: '/login',
    highlighted: false,
  },
  {
    name: 'Team',
    price: '$79',
    period: '/month',
    description: 'For growing teams that need full visibility and follow-ups.',
    features: ['Up to 25 members', 'Unlimited projects', 'AI follow-ups', 'Integrations', 'Priority support'],
    cta: 'Get early access',
    href: '/login',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For organizations with advanced security and compliance needs.',
    features: ['Unlimited everything', 'SSO & audit logs', 'Dedicated success', 'SLA'],
    cta: 'Contact sales',
    href: '/login',
    highlighted: false,
  },
];

export default function Pricing() {
  const comparison = [
    {
      label: 'AI meeting intelligence',
      starter: 'Included',
      team: 'Included',
      enterprise: 'Included',
    },
    {
      label: 'Autonomous follow-ups',
      starter: 'Included',
      team: 'Most active',
      enterprise: 'Most active',
    },
    {
      label: 'Cross-tool dependency context',
      starter: 'Basic',
      team: 'Advanced',
      enterprise: 'Advanced',
    },
    {
      label: 'Support & success',
      starter: 'Standard',
      team: 'Priority support',
      enterprise: 'Dedicated success + SLA',
    },
  ];

  return (
    <SectionContainer id="pricing">
      <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-16 items-start">
        <div className="space-y-4">
          <p className="text-tiny uppercase tracking-[0.16em] text-text-muted">Pricing</p>
          <h2 className="text-section font-semibold text-text-primary max-w-xl">
            Start small. Automate the project layer. Scale to full visibility.
          </h2>
          <p className="text-body text-text-secondary max-w-xl">
            AI Project Intelligence is built for engineering teams. Pay for the level of
            visibility and automation you want—without forcing your workflow to change.
          </p>

          <div className="rounded-2xl bg-bg-secondary border border-border-subtle p-6">
            <p className="text-tiny uppercase tracking-[0.16em] text-text-muted">Recommendation</p>
            <p className="text-small font-semibold text-text-primary mt-2">
              Most teams choose <span className="text-accent-indigo">Team</span> for follow-up automation and shared risk visibility.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-tiny text-text-secondary bg-white/[0.04] border border-border-subtle">
                No credit card for trial
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-tiny text-text-secondary bg-white/[0.04] border border-border-subtle">
                Cancel anytime
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {plans.map((p, i) => (
              <PricingCard key={p.name} {...p} delay={i * 0.1} />
            ))}
          </div>

          <div className="rounded-2xl bg-bg-secondary border border-border-subtle p-6">
            <div className="flex items-center justify-between gap-6">
              <p className="text-tiny uppercase tracking-[0.16em] text-text-muted">Plan comparison</p>
              <p className="text-tiny text-text-secondary">Snapshot of what changes as you scale</p>
            </div>
            <div className="mt-4 overflow-hidden rounded-xl border border-border-subtle">
              <div className="grid grid-cols-4 bg-bg-primary border-b border-border-subtle">
                <div className="px-4 py-3 text-tiny text-text-muted">Capability</div>
                <div className="px-4 py-3 text-tiny text-text-muted">Starter</div>
                <div className="px-4 py-3 text-tiny text-text-muted text-accent-indigo">Team</div>
                <div className="px-4 py-3 text-tiny text-text-muted">Enterprise</div>
              </div>
              {comparison.map((row) => (
                <div key={row.label} className="grid grid-cols-4 bg-bg-secondary border-t border-border-subtle">
                  <div className="px-4 py-3 text-small text-text-primary">{row.label}</div>
                  <div className="px-4 py-3 text-small text-text-secondary">{row.starter}</div>
                  <div className="px-4 py-3 text-small text-text-secondary text-accent-indigo/90">{row.team}</div>
                  <div className="px-4 py-3 text-small text-text-secondary">{row.enterprise}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
