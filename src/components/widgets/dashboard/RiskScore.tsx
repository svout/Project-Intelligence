'use client';

import { Card } from '@/components/elements/Card';

interface RiskScoreProps {
  score: number; // 0-1
}

export default function RiskScore({ score }: RiskScoreProps) {
  const percentage = Math.round(score * 100);

  const getLevel = () => {
    if (percentage >= 70) return { level: 'Critical', track: 'stroke-semantic-danger/30', ring: 'stroke-semantic-danger', text: 'text-semantic-danger' };
    if (percentage >= 40) return { level: 'At Risk', track: 'stroke-semantic-warning/30', ring: 'stroke-semantic-warning', text: 'text-semantic-warning' };
    return { level: 'Low', track: 'stroke-semantic-success/30', ring: 'stroke-semantic-success', text: 'text-semantic-success' };
  };

  const { level, track, ring, text } = getLevel();
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <Card depth={1} hover className="h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-small font-medium text-text-muted uppercase tracking-wider">Sprint Risk</h3>
        <svg className="w-5 h-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div>
          <div className={`text-display font-semibold ${text}`}>{percentage}%</div>
          <p className={`text-small font-medium mt-1 ${text}`}>{level} Risk</p>
        </div>
        <svg width="80" height="80" className="flex-shrink-0 transform -rotate-90">
          <circle cx="40" cy="40" r={radius} fill="none" strokeWidth="6" className={track} />
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`${ring} transition-all duration-1000 ease-out`}
          />
        </svg>
      </div>
    </Card>
  );
}
