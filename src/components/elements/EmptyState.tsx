'use client';

import React from 'react';
import Link from 'next/link';

export type EmptyStateAction = {
  label: string;
  href?: string;
  onClick?: () => void;
};

export interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  primaryAction: EmptyStateAction;
  secondaryAction?: EmptyStateAction;
}

export function EmptyState({
  icon,
  title,
  description,
  primaryAction,
  secondaryAction,
}: EmptyStateProps) {
  return (
    <div className="card-base">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-white/5 border border-border-subtle flex items-center justify-center">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-h2 font-medium text-text-primary">{title}</h2>
          <p className="text-body text-text-secondary mt-2">{description}</p>
          <div className="mt-4 flex gap-2 flex-wrap">
            {primaryAction.href ? (
              <Link
                href={primaryAction.href}
                className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-small font-medium bg-accent-indigo text-white hover:bg-accent-indigo/90 transition-colors"
              >
                {primaryAction.label}
              </Link>
            ) : (
              <button
                type="button"
                onClick={primaryAction.onClick}
                className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-small font-medium bg-accent-indigo text-white hover:bg-accent-indigo/90 transition-colors"
              >
                {primaryAction.label}
              </button>
            )}

            {secondaryAction ? (
              secondaryAction.href ? (
                <Link
                  href={secondaryAction.href}
                  className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-small font-medium border border-border-subtle bg-white/5 hover:bg-white/10 transition-colors"
                >
                  {secondaryAction.label}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={secondaryAction.onClick}
                  className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-small font-medium border border-border-subtle bg-white/5 hover:bg-white/10 transition-colors"
                >
                  {secondaryAction.label}
                </button>
              )
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

