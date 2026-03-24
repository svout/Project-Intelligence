'use client';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  as?: 'span' | 'h1' | 'h2' | 'h3';
}

export default function GradientText({ children, className = '', as: Tag = 'span' }: GradientTextProps) {
  return (
    <Tag className={`bg-gradient-to-r from-accent-primary via-indigo-400 to-accent-secondary bg-clip-text text-transparent ${className}`}>
      {children}
    </Tag>
  );
}
