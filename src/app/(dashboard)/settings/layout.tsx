'use client';

import type { ReactNode } from 'react';
import SettingsSidebar from '@/components/widgets/settings/SettingsSidebar';

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 flex gap-8">
      <SettingsSidebar />
      <section className="flex-1 min-w-0 space-y-8">
        {children}
      </section>
    </div>
  );
}

