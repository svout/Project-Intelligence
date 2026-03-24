'use client';

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

type ModalComponent<P = unknown> = React.ComponentType<P>;

type ModalEntry = {
  id: string;
  Component: ModalComponent<any>;
  props: any;
};

type ModalContextValue = {
  openModal: <P,>(Component: ModalComponent<P>, props: P) => string;
  closeModal: (id: string) => void;
};

const ModalContext = createContext<ModalContextValue | null>(null);

function createId() {
  // Prefer cryptographically-random IDs when available.
  const c = globalThis.crypto as Crypto | undefined;
  if (c?.randomUUID) return c.randomUUID();
  return `modal_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modals, setModals] = useState<ModalEntry[]>([]);

  const openModal = useCallback(<P,>(Component: ModalComponent<P>, props: P): string => {
    const id = createId();
    setModals((prev) => [...prev, { id, Component, props }]);
    return id;
  }, []);

  const closeModal = useCallback((id: string) => {
    setModals((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const value = useMemo(() => ({ openModal, closeModal }), [openModal, closeModal]);

  return (
    <ModalContext.Provider value={value}>
      {children}
      {modals.map(({ id, Component, props }) => (
        <div key={id} className="fixed inset-0 z-[1000]">
          <button
            type="button"
            aria-label="Close modal"
            className="absolute inset-0 w-full h-full bg-black/50"
            onClick={() => closeModal(id)}
          />
          <div className="absolute left-1/2 top-1/2 w-[min(640px,calc(100%-2rem))] -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <Component {...props} />
            </div>
          </div>
        </div>
      ))}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return ctx;
}

