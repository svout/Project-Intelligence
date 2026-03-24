'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Task, Project } from '@/types';
import { Card } from '@/components/elements/Card';
import Button from '@/components/elements/Button';
import { Input, Textarea } from '@/components/elements/Input';
import { StatusBadge, PriorityBadge } from '@/components/elements/Badge';
import { TasksPageSkeleton } from '@/components/elements/AppSkeleton';

const statusForBadge = (s: Task['status']) => {
  if (s === 'done') return 'completed';
  if (s === 'in_progress') return 'in_progress';
  if (s === 'blocked') return 'blocked';
  return 'todo';
};

const priorityForBadge = (p: Task['priority']): 'critical' | 'high' | 'medium' | 'low' => {
  if (p === 'urgent') return 'critical';
  return p as 'high' | 'medium' | 'low';
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<
    'all' | 'todo' | 'in_progress' | 'blocked' | 'done'
  >('all');
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as Task['priority'],
  });

  useEffect(() => {
    loadTasks();
  }, [filter]);

  async function loadTasks() {
    try {
      const supabase = createClient();

      const { data: projects } = await supabase
        .from('projects')
        .select('*')
        .eq('status', 'active')
        .limit(1);

      if (projects && projects.length > 0) {
        setProject(projects[0]);

        let query = supabase
          .from('tasks')
          .select('*')
          .eq('project_id', projects[0].id)
          .order('created_at', { ascending: false });

        if (filter !== 'all') {
          query = query.eq('status', filter);
        }

        const { data: tasksData } = await query;
        if (tasksData) {
          setTasks(tasksData);
        }
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  }

  async function createTask() {
    if (!project || !newTask.title.trim()) return;

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project_id: project.id,
          title: newTask.title,
          description: newTask.description,
          priority: newTask.priority,
          status: 'todo',
        }),
      });

      if (response.ok) {
        setNewTask({ title: '', description: '', priority: 'medium' });
        setShowNewTaskForm(false);
        await loadTasks();
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  }

  async function updateTaskStatus(taskId: string, newStatus: Task['status']) {
    try {
      const response = await fetch('/api/tasks', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: taskId,
          status: newStatus,
        }),
      });

      if (response.ok) {
        await loadTasks();
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  }

  if (loading) {
    return <TasksPageSkeleton />;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-h1 font-semibold text-text-primary">Tasks</h1>
          <p className="text-text-secondary text-small mt-1">
            {project?.name ?? 'Project'} • {tasks.length} tasks
          </p>
        </div>
        <Button onClick={() => setShowNewTaskForm(true)} variant="primary" size="md">
          + New Task
        </Button>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {(['all', 'todo', 'in_progress', 'blocked', 'done'] as const).map(
          (status) => (
            <button
              key={status}
              type="button"
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-xl text-small font-medium transition-colors whitespace-nowrap ${
                filter === status
                  ? 'bg-accent-indigo text-white'
                  : 'glass-card text-text-secondary hover:bg-white/[0.08] hover:text-text-primary'
              }`}
            >
              {status === 'all' ? 'All' : status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1)}
            </button>
          )
        )}
      </div>

      {showNewTaskForm && (
        <Card depth={1} className="mb-6">
          <h3 className="text-h3 font-semibold text-text-primary mb-4">Create New Task</h3>
          <div className="space-y-4">
            <Input
              label="Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              placeholder="Task title..."
            />
            <Textarea
              label="Description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              placeholder="Task description..."
              rows={3}
            />
            <div>
              <label className="block text-small font-medium text-text-primary mb-2">Priority</label>
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as Task['priority'] })}
                className="input-base"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <div className="flex gap-3">
              <Button onClick={createTask} variant="primary">Create Task</Button>
              <Button onClick={() => setShowNewTaskForm(false)} variant="ghost">Cancel</Button>
            </div>
          </div>
        </Card>
      )}

      {tasks.length === 0 ? (
        <Card depth={1} className="text-center py-12">
          <svg className="w-16 h-16 text-text-muted mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="text-text-primary font-medium">No tasks found</p>
          <p className="text-small text-text-secondary mt-1">
            {filter === 'all' ? 'Create your first task to get started' : `No ${filter.replace('_', ' ')} tasks`}
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <Card key={task.id} depth={1} hover className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="text-h3 font-semibold text-text-primary">{task.title}</h3>
                    <StatusBadge status={statusForBadge(task.status)} showIcon />
                    <PriorityBadge priority={priorityForBadge(task.priority)} />
                  </div>

                  {task.description && (
                    <p className="text-text-secondary text-small mb-3">{task.description}</p>
                  )}

                  {task.blocked_reason && (
                    <div className="bg-semantic-danger/10 border border-semantic-danger/20 rounded-xl p-3 mb-3">
                      <p className="text-small text-semantic-danger">
                        🚫 <strong>Blocked:</strong> {task.blocked_reason}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-small text-text-muted">
                    {task.due_date && (
                      <span>Due: {new Date(task.due_date).toLocaleDateString()}</span>
                    )}
                    <span>Created: {new Date(task.created_at).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <select
                    value={task.status}
                    onChange={(e) => updateTaskStatus(task.id, e.target.value as Task['status'])}
                    className="input-base w-auto min-w-[140px] py-2"
                  >
                    <option value="todo">To Do</option>
                    <option value="in_progress">In Progress</option>
                    <option value="blocked">Blocked</option>
                    <option value="done">Done</option>
                  </select>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
