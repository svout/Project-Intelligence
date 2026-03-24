'use client';

import Button from '@/components/elements/Button';

export default function BillingSettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-h1 font-semibold text-text-primary mb-2">Billing</h1>
        <p className="text-body text-text-secondary max-w-2xl">
          Manage your plan and usage. Stripe integration will be wired here.
        </p>
      </div>

      <div className="glass-card max-w-2xl space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-small font-medium text-text-primary">Current plan</p>
            <p className="text-h2 font-semibold text-text-primary mt-1">Free</p>
          </div>
          <Button variant="primary" size="md">
            Upgrade
          </Button>
        </div>

        <div className="mt-4 space-y-2">
          <p className="text-small font-medium text-text-secondary">Usage limits</p>
          <ul className="text-small text-text-secondary list-disc list-inside space-y-1">
            <li>10 meetings per month</li>
            <li>5 AI analyses per day</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

