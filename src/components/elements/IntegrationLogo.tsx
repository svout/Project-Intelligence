'use client';

interface IntegrationLogoProps {
  name: string;
  icon?: React.ReactNode;
  className?: string;
}

export default function IntegrationLogo({ name, icon, className = '' }: IntegrationLogoProps) {
  return (
    <div
      className={`flex items-center justify-center gap-2 px-6 py-4 rounded-card bg-surface-card border border-border text-text-secondary hover:text-text-primary hover:border-border-hover transition-colors shrink-0 ${className}`}
    >
      {icon ?? <span className="text-xl font-semibold">{name.slice(0, 2)}</span>}
      <span className="font-medium">{name}</span>
    </div>
  );
}
