'use client';

import Card, { FeatureCard as DesignFeatureCard } from './Card';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  delay?: number;
}

export default function FeatureCard({ icon, title, description, className = '', delay }: FeatureCardProps) {
  return (
    <div className={className}>
      <DesignFeatureCard
        icon={icon}
        title={title}
        description={description}
        delay={delay}
      />
    </div>
  );
}
