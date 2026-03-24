'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Meeting } from '@/types';
import { Card } from '@/components/elements/Card';
import Button from '@/components/elements/Button';
import { Badge } from '@/components/elements/Badge';

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMeetings();
  }, []);

  async function loadMeetings() {
    try {
      const response = await fetch('/api/meetings');
      const { data } = await response.json();
      if (data) setMeetings(data);
    } catch (error) {
      console.error('Error loading meetings:', error);
    } finally {
      setLoading(false);
    }
  }

  const getStatusVariant = (status: Meeting['status']): 'success' | 'warning' | 'danger' => {
    switch (status) {
      case 'analyzed': return 'success';
      case 'pending': return 'warning';
      case 'failed': return 'danger';
      default: return 'warning';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-background-primary">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent-indigo border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-text-secondary text-small">Loading meetings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-h1 font-semibold text-text-primary">Meetings</h1>
          <p className="text-text-secondary text-small mt-1">
            {meetings.length} meetings analyzed
          </p>
        </div>
        <Button href="/meetings/upload" variant="primary" size="md">
          + Upload Meeting
        </Button>
      </div>

      {meetings.length === 0 ? (
        <Card depth={1} className="text-center py-16">
          <svg className="w-20 h-20 text-text-muted mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="text-h2 font-semibold text-text-primary mb-2">No meetings yet</h3>
          <p className="text-text-secondary text-body mb-6">
            Upload your first meeting transcript to get AI-powered insights
          </p>
          <Button href="/meetings/upload" variant="primary" size="lg">
            Upload Meeting Transcript
          </Button>
        </Card>
      ) : (
        <div className="grid gap-4">
          {meetings.map((meeting) => (
            <Link key={meeting.id} href={`/meetings/${meeting.id}`}>
              <Card depth={1} hover className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="text-h3 font-semibold text-text-primary">{meeting.title}</h3>
                      <Badge variant={getStatusVariant(meeting.status)} size="sm">
                        {meeting.status}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-small text-text-secondary mb-3 flex-wrap">
                      <span>📅 {new Date(meeting.meeting_date).toLocaleDateString()}</span>
                      {meeting.participants && meeting.participants.length > 0 && (
                        <span>👥 {meeting.participants.length} participants</span>
                      )}
                      {meeting.duration_minutes && <span>⏱️ {meeting.duration_minutes} min</span>}
                    </div>

                    {meeting.analysis && (
                      <div className="flex gap-4 text-small flex-wrap">
                        {meeting.analysis.blockers?.length > 0 && (
                          <span className="text-semantic-danger">🚫 {meeting.analysis.blockers.length} blockers</span>
                        )}
                        {meeting.analysis.risks?.length > 0 && (
                          <span className="text-semantic-warning">⚠️ {meeting.analysis.risks.length} risks</span>
                        )}
                        {meeting.analysis.action_items?.length > 0 && (
                          <span className="text-semantic-info">✓ {meeting.analysis.action_items.length} action items</span>
                        )}
                      </div>
                    )}
                  </div>
                  <svg className="w-6 h-6 text-text-muted flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
