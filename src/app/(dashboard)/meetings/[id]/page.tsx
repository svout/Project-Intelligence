'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import type { Meeting } from '@/types';

export default function MeetingDetailPage() {
  const params = useParams();
  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      loadMeeting(params.id as string);
    }
  }, [params.id]);

  async function loadMeeting(id: string) {
    try {
      const response = await fetch(`/api/meetings/${id}`);
      const { data } = await response.json();
      if (data) {
        setMeeting(data);
      }
    } catch (error) {
      console.error('Error loading meeting:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Loading meeting...</p>
        </div>
      </div>
    );
  }

  if (!meeting) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="text-center py-16">
          <p className="text-slate-600">Meeting not found</p>
          <Link
            href="/meetings"
            className="text-blue-600 hover:text-blue-700 mt-4 inline-block"
          >
            ← Back to meetings
          </Link>
        </div>
      </div>
    );
  }

  const analysis = meeting.analysis;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <Link
          href="/meetings"
          className="text-blue-600 hover:text-blue-700 mb-4 inline-flex items-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to meetings
        </Link>
        <h1 className="text-3xl font-bold text-slate-900 mt-2">
          {meeting.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-slate-600 mt-2">
          <span>
            📅 {new Date(meeting.meeting_date).toLocaleDateString()}
          </span>
          {meeting.participants && meeting.participants.length > 0 && (
            <span>👥 {meeting.participants.join(', ')}</span>
          )}
          {meeting.duration_minutes && (
            <span>⏱️ {meeting.duration_minutes} minutes</span>
          )}
        </div>
      </div>

      {analysis ? (
        <div className="space-y-6">
          {analysis.summary && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-blue-900 mb-2">
                📝 Meeting Summary
              </h2>
              <p className="text-blue-800">{analysis.summary}</p>
            </div>
          )}

          {analysis.blockers && analysis.blockers.length > 0 && (
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                🚫 Blockers ({analysis.blockers.length})
              </h2>
              <div className="space-y-4">
                {analysis.blockers.map((blocker, i) => (
                  <div
                    key={i}
                    className="bg-red-50 border border-red-200 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-semibold text-red-900">
                        {blocker.title}
                      </h3>
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-700">
                        {blocker.severity.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-red-800 mb-2">
                      {blocker.description}
                    </p>
                    {blocker.affected_tasks &&
                      blocker.affected_tasks.length > 0 && (
                        <p className="text-xs text-red-700">
                          Affects: {blocker.affected_tasks.join(', ')}
                        </p>
                      )}
                    {blocker.suggested_resolution && (
                      <div className="mt-3 pt-3 border-t border-red-200">
                        <p className="text-sm text-red-900">
                          <strong>Suggested resolution:</strong>{' '}
                          {blocker.suggested_resolution}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {analysis.risks && analysis.risks.length > 0 && (
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                ⚠️ Risks ({analysis.risks.length})
              </h2>
              <div className="space-y-4">
                {analysis.risks.map((risk, i) => (
                  <div
                    key={i}
                    className="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-semibold text-yellow-900">
                        {risk.title}
                      </h3>
                      <div className="flex gap-2">
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-700">
                          {risk.probability} probability
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-700">
                          {risk.impact} impact
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-yellow-800 mb-2">
                      {risk.description}
                    </p>
                    {risk.mitigation_strategy && (
                      <div className="mt-3 pt-3 border-t border-yellow-200">
                        <p className="text-sm text-yellow-900">
                          <strong>Mitigation:</strong>{' '}
                          {risk.mitigation_strategy}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {analysis.action_items && analysis.action_items.length > 0 && (
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                ✅ Action Items ({analysis.action_items.length})
              </h2>
              <div className="space-y-3">
                {analysis.action_items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg"
                  >
                    <input
                      type="checkbox"
                      className="mt-1 w-4 h-4 text-blue-600 rounded"
                    />
                    <div className="flex-1">
                      <p className="text-slate-900">{item.description}</p>
                      <div className="flex gap-4 mt-1 text-sm text-slate-600">
                        {item.owner && <span>Owner: {item.owner}</span>}
                        {item.due_date && (
                          <span>
                            Due:{' '}
                            {new Date(item.due_date).toLocaleDateString()}
                          </span>
                        )}
                        <span className="capitalize">
                          {item.priority} priority
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {analysis.next_meeting_agenda &&
            analysis.next_meeting_agenda.length > 0 && (
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">
                  📋 Suggested Next Meeting Agenda
                </h2>
                <div className="space-y-3">
                  {analysis.next_meeting_agenda.map((item, i) => (
                    <div key={i} className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-semibold text-blue-900">
                            {item.title}
                          </h3>
                          {item.description && (
                            <p className="text-sm text-blue-800 mt-1">
                              {item.description}
                            </p>
                          )}
                        </div>
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700">
                          {item.priority}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {analysis.key_decisions && analysis.key_decisions.length > 0 && (
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                💡 Key Decisions
              </h2>
              <ul className="space-y-2">
                {analysis.key_decisions.map((decision, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-slate-700">{decision}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <p className="text-yellow-800">
            This meeting has not been analyzed yet.
          </p>
        </div>
      )}

      <div className="mt-6 bg-white rounded-lg border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          📄 Transcript
        </h2>
        <div className="bg-slate-50 rounded-lg p-4">
          <pre className="text-sm text-slate-700 whitespace-pre-wrap font-mono">
            {meeting.transcript}
          </pre>
        </div>
      </div>
    </div>
  );
}
