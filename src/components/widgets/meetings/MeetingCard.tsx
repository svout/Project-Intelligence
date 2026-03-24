// components/meetings/MeetingCard.tsx
'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import type { MeetingWithInsights } from '@/types/meetings';

interface MeetingCardProps {
  meeting: MeetingWithInsights;
  index: number;
}

export const MeetingCard: React.FC<MeetingCardProps> = ({ meeting, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.from(cardRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.6,
        delay: index * 0.1,
        ease: 'power3.out',
      });
    }
  }, [index]);

  const handleHover = (isHovering: boolean) => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        y: isHovering ? -4 : 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  return (
    <Link href={`/dashboard/meetings/${meeting.id}`}>
      <div
        ref={cardRef}
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
        className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 transition-colors hover:border-accent-indigo/50 cursor-pointer"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-h3 font-semibold text-text-primary mb-2">
              {meeting.title}
            </h3>
            <div className="flex items-center gap-4 text-small text-text-muted">
              <span>
                {new Date(meeting.meeting_date || meeting.created_at).toLocaleDateString()}
              </span>
              {meeting.duration_seconds && (
                <span>{Math.round(meeting.duration_seconds / 60)} min</span>
              )}
              {meeting.source === 'loom' && (
                <span className="inline-flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                  </svg>
                  Loom
                </span>
              )}
            </div>
          </div>

          {meeting.processed ? (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-tiny font-medium bg-semantic-success/10 text-semantic-success border border-semantic-success/20">
              Analyzed
            </span>
          ) : (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-tiny font-medium bg-semantic-warning/10 text-semantic-warning border border-semantic-warning/20">
              Pending
            </span>
          )}
        </div>

        {/* AI Insights Summary */}
        {meeting.processed && meeting.insights_count && (
          <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
            {meeting.insights_count.blockers > 0 && (
              <div className="text-center">
                <div className="text-h2 font-semibold text-semantic-danger mb-1">
                  {meeting.insights_count.blockers}
                </div>
                <div className="text-tiny text-text-muted">Blockers</div>
              </div>
            )}
            {meeting.insights_count.followups > 0 && (
              <div className="text-center">
                <div className="text-h2 font-semibold text-accent-indigo mb-1">
                  {meeting.insights_count.followups}
                </div>
                <div className="text-tiny text-text-muted">Follow-ups</div>
              </div>
            )}
            {meeting.insights_count.decisions > 0 && (
              <div className="text-center">
                <div className="text-h2 font-semibold text-semantic-success mb-1">
                  {meeting.insights_count.decisions}
                </div>
                <div className="text-tiny text-text-muted">Decisions</div>
              </div>
            )}
          </div>
        )}

        {/* AI Summary Preview */}
        {meeting.ai_summary && (
          <p className="mt-4 text-small text-text-secondary line-clamp-2">
            {meeting.ai_summary}
          </p>
        )}
      </div>
    </Link>
  );
};
