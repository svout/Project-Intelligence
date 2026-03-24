'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';

type FAQItem = { q: string; a: string };

function AccordionItem({
  index,
  item,
  openIndex,
  setOpenIndex,
  panelRef,
}: {
  index: number;
  item: FAQItem;
  openIndex: number;
  setOpenIndex: (i: number) => void;
  panelRef: (el: HTMLDivElement | null) => void;
}) {
  const isOpen = openIndex === index;

  return (
    <div className="rounded-2xl border border-border-subtle bg-bg-secondary/40 overflow-hidden">
      <button
        type="button"
        className="w-full text-left px-6 py-4 flex items-start justify-between gap-4"
        onClick={() => setOpenIndex(isOpen ? -1 : index)}
      >
        <span className="text-small font-semibold text-text-primary">{item.q}</span>
        <span
          className={`shrink-0 w-8 h-8 rounded-xl border border-border-subtle flex items-center justify-center transition-transform ${isOpen ? 'rotate-180 border-accent-indigo/50' : ''
            }`}
        >
          <span className="text-sm">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </span>
        </span>
      </button>

      <div
        ref={panelRef}
        className="h-0 opacity-0 overflow-hidden"
        aria-hidden={!isOpen}
      >
        <div className="px-6 pb-4 pt-2 text-tiny text-text-secondary leading-relaxed">
          {item.a}
        </div>
      </div>
    </div>
  );
}

export default function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number>(0);
  const panelElsRef = useRef<Array<HTMLDivElement | null>>([]);

  const safeOpenIndex = useMemo(() => openIndex, [openIndex]);

  useEffect(() => {
    panelElsRef.current.forEach((panel, i) => {
      if (!panel) return;
      const inner = panel.firstElementChild as HTMLElement | null;
      const height = inner?.scrollHeight ?? 0;

      gsap.to(panel, {
        height: i === safeOpenIndex ? height : 0,
        opacity: i === safeOpenIndex ? 1 : 0,
        duration: 0.35,
        ease: 'power3.out',
      });
    });
  }, [safeOpenIndex]);

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <AccordionItem
          key={item.q}
          index={index}
          item={item}
          openIndex={safeOpenIndex}
          setOpenIndex={setOpenIndex}
          panelRef={(el) => {
            panelElsRef.current[index] = el;
          }}
        />
      ))}
    </div>
  );
}

