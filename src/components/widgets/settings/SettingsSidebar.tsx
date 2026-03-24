'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  { label: 'Profile', href: '/settings/profile' },
  { label: 'Appearance', href: '/settings/appearance' },
  { label: 'Integrations', href: '/settings/integrations' },
  { label: 'Notifications', href: '/settings/notifications' },
  { label: 'Team', href: '/settings/team' },
  { label: 'Billing', href: '/settings/billing' },
  { label: 'Security', href: '/settings/security' },
];

export function SettingsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 pr-6 border-r border-white/[0.06]">
      <h2 className="text-small font-medium text-text-muted mb-4 uppercase tracking-[0.12em]">
        Settings
      </h2>
      <nav className="space-y-1">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={
                active
                  ? 'sidebar-item-active w-full'
                  : 'sidebar-item w-full'
              }
            >
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export default SettingsSidebar;

