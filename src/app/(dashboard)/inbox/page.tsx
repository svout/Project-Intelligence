'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import type { Database } from '@/types/database';

type FeedKind = 'task' | 'meeting' | 'ai';

type FeedItem = {
  id: string;
  kind: FeedKind;
  title: string;
  description?: string | null;
  createdAt: string;
  projectName?: string;
  indicator: 'success' | 'info' | 'warning' | 'danger';
};

function formatShortDate(dateIso?: string) {
  if (!dateIso) return '';
  const d = new Date(dateIso);
  return d.toLocaleDateString(undefined, { month: 'short', day: '2-digit' });
}

function formatShortTime(dateIso?: string) {
  if (!dateIso) return '';
  const d = new Date(dateIso);
  return d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
}

function kindDotClass(indicator: FeedItem['indicator']) {
  switch (indicator) {
    case 'success':
      return 'bg-semantic-success';
    case 'warning':
      return 'bg-semantic-warning';
    case 'danger':
      return 'bg-semantic-danger';
    default:
      return 'bg-semantic-info';
  }
}

export default function InboxPage() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<FeedItem[]>([]);
  const [projectName, setProjectName] = useState<string | undefined>(undefined);

  useEffect(() => {
    void loadInbox();
  }, []);

  async function loadInbox() {
    try {
      const supabase = createClient();

      const { data: projectRows } = await supabase
        .from('projects')
        .select('id, name')
        .eq('status', 'active')
        .limit(1);

      const project = projectRows?.[0];
      if (!project) {
        setItems([]);
        setProjectName(undefined);
        return;
      }

      setProjectName(project.name);

      const [tasksRes, meetingsRes, followupsRes, insightsRes] = await Promise.all([
        supabase
          .from('tasks')
          .select('id, title, status, blocked_reason, priority, created_at')
          .eq('project_id', project.id)
          .eq('status', 'blocked')
          .order('created_at', { ascending: false })
          .limit(10),
        supabase
          .from('meetings')
          .select('id, title, status, processed, created_at')
          .eq('project_id', project.id)
          .order('created_at', { ascending: false })
          .limit(10),
        supabase
          .from('followups')
          .select('id, title, status, type, priority, created_at')
          .eq('project_id', project.id)
          .eq('status', 'open')
          .order('created_at', { ascending: false })
          .limit(10),
        supabase
          .from('insights')
          .select('id, title, severity, type, created_at, status')
          .eq('project_id', project.id)
          .eq('status', 'open')
          .order('created_at', { ascending: false })
          .limit(6),
      ]);

      const tasks = tasksRes.data ?? [];
      const meetings = meetingsRes.data ?? [];
      const followups = followupsRes.data ?? [];
      const insights = insightsRes.data ?? [];

      const taskItems: FeedItem[] = tasks.map((t) => {
        const indicator =
          t.priority === 'urgent' || t.priority === 'high'
            ? 'danger'
            : t.priority === 'medium'
              ? 'warning'
              : 'info';
        return {
          id: `task:${t.id}`,
          kind: 'task',
          title: t.title,
          description: t.blocked_reason ?? 'Blocked task requires attention.',
          createdAt: t.created_at,
          projectName: project.name,
          indicator,
        };
      });

      const meetingItems: FeedItem[] = meetings.map((m) => {
        const indicator = m.processed ? 'success' : 'info';
        const description = m.processed
          ? 'Meeting analyzed. Insights are ready.'
          : m.status === 'pending'
            ? 'Meeting is waiting for analysis.'
            : 'Meeting processing status updated.';
        return {
          id: `meeting:${m.id}`,
          kind: 'meeting',
          title: m.title,
          description,
          createdAt: m.created_at,
          projectName: project.name,
          indicator,
        };
      });

      const followupItems: FeedItem[] = followups.map((f) => {
        const indicator = f.priority === 'high' || f.priority === 'critical' ? 'danger' : 'warning';
        return {
          id: `ai:${f.id}`,
          kind: 'ai',
          title: f.title,
          description: `Follow-up (${f.type.replaceAll('_', ' ')})`,
          createdAt: f.created_at,
          projectName: project.name,
          indicator,
        };
      });

      const insightItems: FeedItem[] = insights.map((i) => {
        const indicator =
          i.severity === 'critical' || i.severity === 'high' ? 'danger' : i.severity === 'medium' ? 'warning' : 'info';
        return {
          id: `ai-insight:${i.id}`,
          kind: 'ai',
          title: i.title,
          description: `${i.type.replaceAll('_', ' ')} · ${i.severity}`,
          createdAt: i.created_at,
          projectName: project.name,
          indicator,
        };
      });

      const merged = [...taskItems, ...meetingItems, ...followupItems, ...insightItems]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 25);

      setItems(merged);
    } catch (e) {
      console.error('Failed to load inbox:', e);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  const headerMeta = useMemo(() => {
    if (projectName) return projectName;
    return 'Your active project';
  }, [projectName]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="mb-6 space-y-2">
          <div className="h-6 w-56 bg-white/5 border border-border-subtle rounded-xl animate-pulse" />
          <div className="h-4 w-72 bg-white/5 border border-border-subtle rounded-xl animate-pulse" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="card-base flex items-center gap-3 py-3">
              <div className="h-6 w-6 rounded-full bg-white/5 border border-border-subtle animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-2/3 bg-white/5 border border-border-subtle rounded-xl animate-pulse" />
                <div className="h-3 w-1/2 bg-white/5 border border-border-subtle rounded-xl animate-pulse" />
              </div>
              <div className="h-3 w-16 bg-white/5 border border-border-subtle rounded-xl animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="mb-6">
          <h1 className="text-h1 font-semibold text-text-primary">Inbox</h1>
          <p className="text-body text-text-secondary mt-2">
            Unified activity feed for tasks, meetings and AI insights.
          </p>
        </div>

        <div className="card-base">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-border-subtle flex items-center justify-center">
              <svg className="w-4 h-4 text-text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-h2 font-medium text-text-primary">No activity yet</h2>
              <p className="text-body text-text-secondary mt-2">
                Upload a meeting or create a blocked task to start receiving AI follow-ups and insights in {headerMeta}.
              </p>
              <div className="mt-4 flex gap-2">
                <Link
                  href="/meetings/upload"
                  className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-small font-medium transition-colors bg-accent-indigo text-white hover:bg-accent-indigo/90"
                >
                  Upload meeting
                </Link>
                <Link
                  href="/tasks"
                  className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-small font-medium transition-colors border border-border-subtle bg-white/5 hover:bg-white/10"
                >
                  Create task
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <div className="mb-6">
        <h1 className="text-h1 font-semibold text-text-primary">Inbox</h1>
        <p className="text-body text-text-secondary mt-2">
          Unified activity feed for tasks, meetings and AI insights · {headerMeta}
        </p>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="card-base px-5 py-4">
            <div className="flex items-start gap-4">
              <div className="pt-1">
                <div className={`h-3.5 w-3.5 rounded-full ${kindDotClass(item.indicator)} opacity-90`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-small font-medium text-text-primary">
                        {item.kind === 'task' ? 'Task' : item.kind === 'meeting' ? 'Meeting' : 'AI'}
                      </span>
                      <span className="text-tiny text-text-muted">
                        {item.projectName ? item.projectName : 'Project'}
                      </span>
                    </div>
                    <div className="text-small font-semibold text-text-primary mt-1 line-clamp-2">
                      {item.title}
                    </div>
                    {item.description ? (
                      <div className="text-tiny text-text-secondary mt-1 line-clamp-2">
                        {item.description}
                      </div>
                    ) : null}
                  </div>
                  <div className="text-tiny text-text-muted whitespace-nowrap">
                    <div>{formatShortDate(item.createdAt)}</div>
                    <div>{formatShortTime(item.createdAt)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

