'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { Elements } from '@/components';
import { ModalProvider } from '@/contexts/ModalContext';
import { maybeInitGA, maybeSendPageView } from '@/lib/ga';
import { initClientStores } from '@/store/initClientStores';

export default function AppProviders({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    initClientStores();
    maybeInitGA();
  }, []);

  useEffect(() => {
    maybeSendPageView(pathname);
  }, [pathname]);

  return (
    <ModalProvider>
      {children}
      <Elements.ConsentBanner />
    </ModalProvider>
  );
}

