'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  checked: boolean;
}

export const Toggle: React.FC<ToggleProps> = ({ checked, className, ...props }) => {
  return (
    <button
      type="button"
      aria-pressed={checked}
      className={cn(
        'relative inline-flex h-6 w-11 items-center rounded-full border border-white/10 transition-colors duration-200',
        checked ? 'bg-accent-indigo' : 'bg-white/[0.05]',
        className
      )}
      {...props}
    >
      <span
        className={cn(
          'inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200',
          checked ? 'translate-x-5' : 'translate-x-1'
        )}
      />
    </button>
  );
};

export default Toggle;

