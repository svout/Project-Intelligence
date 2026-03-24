'use client';

import { useCallback, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import ProjectHealth from '@/components/widgets/dashboard/ProjectHealth';
import RiskScore from '@/components/widgets/dashboard/RiskScore';
import BlockedTasks from '@/components/widgets/dashboard/BlockedTasks';
import TeamInsights from '@/components/widgets/dashboard/TeamInsights';
import AIActions from '@/components/widgets/dashboard/AIActions';
import FollowupList from '@/components/widgets/FollowupList';
import { MetricCard } from '@/components/elements/Card';
import { MeetingIntelligenceWidget } from '@/components/widgets/meetings/MeetingIntelligenceWidget';
import type { Project, ProjectMetrics, Task, Insight } from '@/types';
import type { FollowupWithContext } from '@/types/followup';
import {
  CardSkeleton,
  InsightSkeleton,
  MetricCardSkeleton,
  MeetingIntelligenceSkeleton,
  AIActionsSkeleton,
  BlockedTasksSkeleton,
  TeamInsightsSkeleton,
  FollowupListSkeleton,
} from '@/components/elements/AppSkeleton';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<Project | null>(null);
  const [metrics, setMetrics] = useState<ProjectMetrics | null>(null);
  const [blockedTasks, setBlockedTasks] = useState<Task[]>([]);
  const [recentInsights, setRecentInsights] = useState<Insight[]>([]);
  const [followups, setFollowups] = useState<FollowupWithContext[]>([]);

  const loadProjectData = useCallback(async (projectId: string) => {
    const supabase = createClient();

    const { data: metricsData } = await supabase
      .from('project_metrics')
      .select('*')
      .eq('project_id', projectId)
      .single();

    if (metricsData) {
      setMetrics(metricsData);
    }

    const { data: tasks } = await supabase
      .from('tasks')
      .select('*')
      .eq('project_id', projectId)
      .eq('status', 'blocked')
      .order('created_at', { ascending: false });

    if (tasks) {
      setBlockedTasks(tasks);
    }

    const { data: insights } = await supabase
      .from('insights')
      .select('*')
      .eq('project_id', projectId)
      .eq('status', 'open')
      .order('created_at', { ascending: false })
      .limit(5);

    if (insights) {
      setRecentInsights(insights);
    }

    const { data: followupsData } = await supabase
      .from('followups')
      .select(
        `
        *,
        task:tasks(id, title, status),
        project:projects(id, name)
      `,
      )
      .eq('project_id', projectId)
      .eq('status', 'open')
      .order('priority', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(10);

    if (followupsData) {
      setFollowups(followupsData as any);
    }
  }, []);

  const loadDashboardData = useCallback(async () => {
    try {
      const supabase = createClient();

      const { data: projects } = await supabase
        .from('projects')
        .select('*')
        .eq('status', 'active')
        .limit(1);

      if (!projects || projects.length === 0) {
        const { data: newProject } = await supabase
          .from('projects')
          .insert({
            name: 'Demo Project',
            description: 'Your first AI-powered project',
            status: 'active',
          })
          .select()
          .single();

        if (newProject) {
          setProject(newProject);
          await loadProjectData(newProject.id);
        }
      } else {
        setProject(projects[0]);
        await loadProjectData(projects[0].id);
      }
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  }, [loadProjectData]);

  useEffect(() => {
    void loadDashboardData();
  }, [loadDashboardData]);

  const handleFollowupStatusChange = useCallback(
    async (followupId: string, newStatus: string) => {
      try {
        const supabase = createClient();

        const updateData: any = { status: newStatus };
        if (newStatus === 'completed') {
          updateData.completed_at = new Date().toISOString();
        }

        const { error } = await supabase
          .from('followups')
          .update(updateData)
          .eq('id', followupId);

        if (error) throw error;

        if (project) {
          await loadProjectData(project.id);
        }
      } catch (error) {
        console.error('Error updating follow-up:', error);
      }
    },
    [project, loadProjectData],
  );

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-h1 font-semibold text-text-primary">Dashboard</h1>
          <p className="text-body text-text-secondary mt-2">
            AI-powered project intelligence and autonomous follow-ups
          </p>
        </div>
        <div className="dashboard-grid gap-6">
          <div className="col-span-12 md:col-span-6 lg:col-span-3">
            <CardSkeleton />
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-3">
            <CardSkeleton />
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-3">
            <MetricCardSkeleton />
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-3">
              <MetricCardSkeleton />
          </div>
          <div className="col-span-12 lg:col-span-6">
              <MeetingIntelligenceSkeleton />
          </div>
          <div className="col-span-12 lg:col-span-6">
            <AIActionsSkeleton />
          </div>

          <div className="col-span-12">
            <FollowupListSkeleton />
          </div>

          <div className="col-span-12 lg:col-span-6">
            <BlockedTasksSkeleton />
          </div>
          <div className="col-span-12 lg:col-span-6">
            <TeamInsightsSkeleton />
          </div>
        </div>
      </div>
    );
  }

  const completed = metrics?.completed_tasks_count ?? 0;
  const total = metrics?.total_tasks_count ?? 0;
  const velocity = metrics?.velocity ?? 0;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-h1 font-semibold text-text-primary">
          {project?.name ?? 'Dashboard'}
        </h1>
        <p className="text-body text-text-secondary mt-2">
          AI-powered project intelligence and autonomous follow-ups
        </p>
      </div>

      <div className="dashboard-grid gap-6">
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <ProjectHealth metrics={metrics} />
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <RiskScore score={metrics?.risk_score ?? 0} />
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <MetricCard
            label="Tasks"
            value={`${completed}/${total}`}
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            }
          />
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <MetricCard
            label="Velocity"
            value={velocity.toFixed(1)}
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            }
          />
        </div>

        <div className="col-span-12 lg:col-span-6">
          <MeetingIntelligenceWidget />
        </div>

        {project && (
          <div className="col-span-12 lg:col-span-12">
            <AIActions projectId={project.id} />
          </div>
        )}

        {followups.length > 0 && (
          <div className="col-span-12">
            <FollowupList
              followups={followups}
              onStatusChange={handleFollowupStatusChange}
              showFilters
            />
          </div>
        )}

        <div className="col-span-12 lg:col-span-6">
          <BlockedTasks tasks={blockedTasks} projectId={project?.id} />
        </div>
        <div className="col-span-12 lg:col-span-6">
          <TeamInsights insights={recentInsights} />
        </div>
      </div>
    </div>
  );
}
