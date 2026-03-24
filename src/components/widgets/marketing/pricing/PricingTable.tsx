'use client';

import { useEffect, useRef } from 'react';
import type React from 'react';
import { gsap } from '@/lib/gsap';

type Interval = 'monthly' | 'yearly';

function CheckIcon({ highlight = false }: { highlight?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`w-4 h-4 ${highlight ? 'text-accent-indigo' : 'text-semantic-success'}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function DashIcon() {
  return (
    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-border-subtle text-tiny text-text-muted">
      —
    </span>
  );
}

type TableRow = {
  feature: string;
  starter: React.ReactNode;
  base: React.ReactNode;
  pro: React.ReactNode;
  highlight?: 'starter' | 'base' | 'pro';
};

export default function PricingTable({
  interval,
}: {
  interval: Interval;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.from(ref.current, {
      y: 40,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 85%' },
    });
  }, []);

  const priceLabel =
    interval === 'monthly'
      ? { starter: '$29/mo', base: '$79/mo', pro: '$109/mo' }
      : { starter: '$24.20/mo', base: '$65.80/mo', pro: '$90.80/mo' };

  const rows: TableRow[] = [
    {
      feature: 'Price',
      starter: priceLabel.starter,
      base: priceLabel.base,
      pro: priceLabel.pro,
      highlight: 'pro',
    },
    {
      feature: `Connected APIs`,
      starter: 'Jira + Meetings',
      base: 'Jira + Slack + Notion',
      pro: 'All + Zoom/Loom',
      highlight: 'pro',
    },
    {
      feature: 'Manual journal',
      starter: <DashIcon />,
      base: <DashIcon />,
      pro: (
        <span className="inline-flex items-center gap-2">
          <CheckIcon highlight />
          Read + verify
        </span>
      ),
    },
    {
      feature: 'Automatic tracking',
      starter: <DashIcon />,
      base: <CheckIcon />,
      pro: <CheckIcon highlight />,
      highlight: 'pro',
    },
    {
      feature: 'AI insights',
      starter: <CheckIcon />,
      base: <CheckIcon />,
      pro: <CheckIcon highlight />,
      highlight: 'pro',
    },
    {
      feature: 'Dashboards',
      starter: '1 project dashboard',
      base: 'Up to 5 projects',
      pro: 'Unlimited + cross-tool graph',
      highlight: 'pro',
    },
    {
      feature: 'Trade / task limits',
      starter: 'Up to 50 / month',
      base: 'Up to 250 / month',
      pro: 'Unlimited',
      highlight: 'pro',
    },
    {
      feature: 'Advanced functionality',
      starter: <DashIcon />,
      base: 'Dependency mapping',
      pro: 'Project memory + leader digest',
      highlight: 'pro',
    },
  ];

  return (
    <div ref={ref} className="rounded-2xl border border-border-subtle bg-bg-secondary/40 p-5 lg:p-7">
      <div className="flex items-end justify-between gap-6 flex-wrap">
        <div>
          <p className="text-tiny uppercase tracking-[0.16em] text-text-muted">
            Compare plans
          </p>
          <h3 className="text-section font-semibold text-text-primary mt-2">
            Compare plans and find your fit
          </h3>
          <p className="text-body text-text-secondary mt-2">
            Starter gives essentials. Pro unlocks full intelligence—so engineering teams stop
            losing context.
          </p>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-[820px] w-full border-collapse">
          <thead>
            <tr className="border-b border-border-subtle">
              <th className="text-left text-tiny text-text-muted font-medium py-4 pr-4">Feature</th>
              <th className="text-center text-tiny text-text-muted font-medium py-4 px-3">
                Starter
              </th>
              <th className="text-center text-tiny text-text-muted font-medium py-4 px-3">
                Base
              </th>
              <th className="text-center text-tiny text-text-muted font-medium py-4 px-3">
                Pro
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.feature} className="border-b border-border-subtle/50">
                <td className="py-4 pr-4 align-middle">
                  <div className="text-small font-medium text-text-primary">{row.feature}</div>
                </td>
                <td
                  className={`py-4 px-3 text-center align-middle ${
                    row.highlight === 'starter' ? 'text-accent-indigo' : 'text-text-secondary'
                  }`}
                >
                  {row.starter}
                </td>
                <td
                  className={`py-4 px-3 text-center align-middle ${
                    row.highlight === 'base' ? 'text-accent-indigo' : 'text-text-secondary'
                  }`}
                >
                  {row.base}
                </td>
                <td
                  className={`py-4 px-3 text-center align-middle ${
                    row.highlight === 'pro' ? 'text-accent-indigo' : 'text-text-secondary'
                  }`}
                >
                  {row.pro}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

