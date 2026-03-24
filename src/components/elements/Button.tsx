'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  fullWidth?: boolean;
  href?: string;
}

export const Button = React.forwardRef<HTMLButtonElement & HTMLAnchorElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      icon,
      iconPosition = 'left',
      loading = false,
      fullWidth = false,
      href,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const variants = {
      primary: 'bg-accent-indigo text-white hover:bg-accent-indigo/90 hover:shadow-glow-indigo',
      secondary: 'border border-white/[0.12] bg-white/[0.05] text-text-primary hover:bg-white/[0.1] hover:border-white/[0.2]',
      ghost: 'text-text-secondary hover:text-text-primary hover:bg-white/[0.05]',
      danger: 'bg-semantic-danger text-white hover:bg-semantic-danger/90',
    };

    const sizes = {
      sm: 'px-4 py-2 text-tiny',
      md: 'px-6 py-3 text-small',
      lg: 'px-8 py-4 text-body',
    };

    const classes = cn(
      'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-300',
      'focus:outline-none focus:ring-2 focus:ring-accent-indigo/50 focus:ring-offset-2 focus:ring-offset-background-primary',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none',
      'active:scale-[0.98]',
      variants[variant],
      sizes[size],
      fullWidth && 'w-full',
      className
    );

    if (href) {
      return (
        <Link href={href} className={classes} ref={ref as React.Ref<HTMLAnchorElement>}>
          {!loading && icon && iconPosition === 'left' && icon}
          {children}
          {!loading && icon && iconPosition === 'right' && icon}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        type="button"
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && icon && iconPosition === 'left' && icon}
        {children}
        {!loading && icon && iconPosition === 'right' && icon}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
