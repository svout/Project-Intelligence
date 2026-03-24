'use client';

import { ReactNode } from 'react';

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export default function SectionContainer({ children, className = '', id }: SectionContainerProps) {
  return (
    <section id={id} className={`py-section max-w-content mx-auto px-6 ${className}`}>
      {children}
    </section>
  );
}
