'use client';

import { useMemo, useState } from 'react';
import Navbar from '@/components/widgets/marketing/Navbar';
import Footer from '@/components/widgets/marketing/Footer';
import SectionContainer from '@/components/elements/SectionContainer';

import PricingToggle, { type BillingInterval } from '@/components/pricing/PricingToggle';
import PricingCard, { type PricingPlan } from '@/components/pricing/PricingCard';
import PricingTable from '@/components/pricing/PricingTable';
import FAQAccordion from '@/components/pricing/FAQAccordion';
import PricingCTA from '@/components/pricing/PricingCTA';

export default function PricingPage() {
  const [interval, setInterval] = useState<BillingInterval>('yearly');

  const plans = useMemo<PricingPlan[]>(
    () => [
      {
        key: 'starter',
        name: 'Starter',
        description: 'Signals and fundamentals for focused teams.',
        prices: { monthly: 29, yearlyMonthlyEq: 24.2 },
        features: [
          'Meeting analysis + AI insights',
          'Risk visibility for 1 project',
          'Automation basics',
          'Email updates for follow-ups',
        ],
        cta: 'Start trial',
        href: '/login',
      },
      {
        key: 'pro',
        name: 'Pro',
        description: 'A unified story of delivery for leaders.',
        highlighted: true,
        badge: 'Most popular',
        prices: { monthly: 109, yearlyMonthlyEq: 90.8 },
        features: [
          'Full AI insights + project memory',
          'Unlimited projects + deeper dashboards',
          'Automation at scale (Jira + Slack)',
          'Leader digest + context recovery',
        ],
        cta: 'Get Pro',
        href: '/login',
      },
      {
        key: 'base',
        name: 'Base',
        description: 'Tracking + follow-ups for engineering teams.',
        prices: { monthly: 79, yearlyMonthlyEq: 65.8 },
        features: [
          'Automatic tracking across your tools',
          'Project health dashboards (up to 5)',
          'Autonomous follow-ups to owners',
          'Dependency mapping for cross-team clarity',
        ],
        cta: 'Choose Base',
        href: '/login',
      },
    ],
    []
  );

  const faqItems = useMemo(
    () => [
      {
        q: 'What is included in the free plan?',
        a: 'We don’t offer a permanent free plan. You can start with a trial on Starter after your first integration setup, so you can confirm risk signals and follow-ups match how your engineering team works.',
      },
      {
        q: 'Can I upgrade later?',
        a: 'Yes. Upgrade anytime. Your connected Jira/Slack/Notion sources and project history stay intact, and the AI continues using the same context model—no re-setup.',
      },
      {
        q: 'How does billing work?',
        a: 'Monthly bills immediately. Yearly bills once per year with a discount. Either way, your team keeps receiving insights and follow-ups continuously—no feature gaps.',
      },
      {
        q: 'Do you offer refunds?',
        a: 'We review refund requests case-by-case during the early trial/integration window. If you don’t see actionable AI signals, we’ll work with you on an alternative setup or refund.',
      },
      {
        q: 'What integrations are supported?',
        a: 'Jira, Slack, Notion, and meeting transcripts (Zoom/Loom). You can connect multiple projects and teams, and AI insights are scoped to what you explicitly choose.',
      },
      {
        q: 'Is my data used for training?',
        a: 'No. We only analyze what you connect to generate project insights and follow-ups for your workspace. We don’t train general models on your content.',
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar />

      {/* HERO */}
      <div className="max-w-[1440px] mx-auto px-6 pt-12 pb-6 md:pt-16">
        <div className="mx-auto max-w-2xl text-center space-y-4 pt-12">
          <h1 className="text-3xl font-semibold text-text-primary">
            Turn your project data into decisions.
            <br />
            Pricing for the AI Project Intelligence Platform
          </h1>
          <p className="text-body text-text-secondary">
            AI Project Intelligence connects Jira, Slack, Notion and meetings to deliver
            real project insights and workflow automation—without status chasing.
          </p>
        </div>
      </div>

      {/* PRICING CARDS + TOGGLE */}
      <SectionContainer id="pricing" className="pt-4">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
            <PricingToggle interval={interval} onIntervalChange={setInterval} />
            <p className="text-tiny text-text-muted text-center">
              {interval === 'yearly' ? 'Best value for active teams.' : 'Try monthly and upgrade anytime.'}
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3 items-stretch">
            {plans.map((plan, i) => (
              <div key={plan.key} className="h-full">
                <PricingCard plan={plan} interval={interval} delay={i * 0.05} />
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>

      {/* FEATURE COMPARISON TABLE */}
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="pt-6 pb-10">
          <PricingTable interval={interval} />
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionContainer className="pt-2 pb-14">
          <div>
            <h2 className="text-section text-center font-semibold text-text-primary mt-2">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mt-6">
            <FAQAccordion items={faqItems} />
          </div>
        </SectionContainer>
      </div>

      {/* FINAL CTA */}
      <PricingCTA />

      <Footer />
    </div>
  );
}

