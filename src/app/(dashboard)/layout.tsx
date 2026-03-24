'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import Button from '@/components/elements/Button';
import { ProjectSwitcher } from '@/components/widgets/projects/ProjectSwitcher';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const checkUser = useCallback(async () => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
    setLoading(false);

    if (!user) {
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    void checkUser();
  }, [checkUser]);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    // Use full reload to reset all client state and layout
    window.location.href = '/';
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-bg-primary">
        <div className="w-8 h-8 border-2 border-text-secondary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      name: 'Meetings',
      href: '/meetings',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      name: 'Tasks',
      href: '/tasks',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
    },
    {
      name: 'Inbox',
      href: '/inbox',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12c0 4 4 8 8 8s8-4 8-8" opacity="0" />
        </svg>
      ),
    },
    {
      name: 'Settings',
      href: '/settings/profile',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.89 3.31.877 2.42 2.42a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.89 1.543-.877 3.31-2.42 2.42a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.89-3.31-.877-2.42-2.42a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.89-1.543.877-3.31 2.42-2.42.996.575 2.25.12 2.573-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="relative flex h-screen overflow-hidden bg-bg-primary text-text-primary">
      {/* Background layering: app → content → subtle mesh */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-bg-secondary/30" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-mesh opacity-40" />
      {/* Sidebar */}
      <aside className="relative z-[1] h-screen w-[240px] bg-bg-secondary flex flex-col px-3 py-4">
        <div className="mb-6 px-2">
          <span className="text-[11px] uppercase tracking-[0.16em] text-text-muted">
            Project Intelligence
          </span>
        </div>

        <nav className="flex-1">
          <div className="space-y-6">
            {/* Workspace */}
            <div className="space-y-1.5">
              <div className="px-2 text-[11px] uppercase tracking-[0.16em] text-text-muted">
                Workspace
              </div>
              <Link
                href="/projects"
                className={
                  pathname?.startsWith('/projects') ? 'sidebar-item-active' : 'sidebar-item'
                }
              >
                <span className="w-4 h-4 inline-flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
                  </svg>
                </span>
                <span>Projects</span>
              </Link>
            </div>

            {/* Teams */}
            <div className="space-y-1.5">
              <div className="px-2 text-[11px] uppercase tracking-[0.16em] text-text-muted">
                Teams
              </div>
              <Link
                href="/settings/team"
                className={
                  pathname?.startsWith('/settings/team') ? 'sidebar-item-active' : 'sidebar-item'
                }
              >
                <span className="w-4 h-4 inline-flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-5-3.87M9 20H4a4 4 0 015-3.87M16 20v-2a4 4 0 00-8 0v2" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12a4 4 0 100-8 4 4 0 000 8z" />
                  </svg>
                </span>
                <span>Team</span>
              </Link>
            </div>

            {/* Navigation */}
            <div className="space-y-1.5">
              <div className="px-2 text-[11px] uppercase tracking-[0.16em] text-text-muted">
                Navigation
              </div>
              <div className="space-y-1">
                {navigation
                  .filter((item) => item.href !== '/settings/profile')
                  .map((item) => {
                    const active =
                      item.href === '/settings/profile'
                        ? pathname?.startsWith('/settings')
                        : pathname === item.href || pathname?.startsWith(item.href + '/');
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={active ? 'sidebar-item-active w-full' : 'sidebar-item w-full'}
                      >
                        <span className="w-4 h-4 inline-flex items-center justify-center text-text-secondary">
                          {item.icon}
                        </span>
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}

                {/* Settings (subroutes keep active state) */}
                <Link
                  href="/settings/profile"
                  className={pathname?.startsWith('/settings') ? 'sidebar-item-active w-full' : 'sidebar-item w-full'}
                >
                  <span className="w-4 h-4 inline-flex items-center justify-center text-text-secondary">
                    {navigation.find((i) => i.href === '/settings/profile')?.icon}
                  </span>
                  <span>Settings</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <div className="mt-auto pt-4 px-1">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-bg-primary border border-border-subtle flex items-center justify-center text-[11px] text-text-secondary">
              {user?.email?.[0]?.toUpperCase() ?? '?'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-text-primary truncate">
                {user?.email}
              </p>
              <button
                type="button"
                onClick={handleSignOut}
                className="text-[11px] text-text-muted hover:text-text-primary transition-colors"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="relative z-[1] flex-1 flex flex-col border-l border-border-subtle bg-bg-secondary/10">
        <header className="h-14 flex items-center justify-between px-6 bg-bg-primary border-b border-border-subtle">
          <div className="flex items-center gap-3">
            <ProjectSwitcher />
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center bg-bg-secondary border border-border-subtle rounded-lg px-2 py-1.5 gap-2 text-[12px] text-text-muted">
              <span className="opacity-60">⌘K</span>
              <span>Search</span>
            </div>
          </div>
        </header>
        <main className="flex-1 px-6 py-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
