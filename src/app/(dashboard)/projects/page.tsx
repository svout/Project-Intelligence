'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useProjects } from '@/lib/projects/useProjects';
import { Card } from '@/components/elements/Card';
import Button from '@/components/elements/Button';
import { Input, Textarea } from '@/components/elements/Input';

export default function ProjectsPage() {
  const router = useRouter();
  const { projects, isLoading, error, createProject } = useProjects();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setCreating(true);
    setCreateError(null);
    try {
      const project = await createProject({
        name: name.trim(),
        description: description.trim() || undefined,
      });
      setName('');
      setDescription('');
      router.push('/dashboard'); // dashboard will pick the active project
    } catch (err) {
      setCreateError(err instanceof Error ? err.message : 'Failed to create project');
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-h1 font-semibold text-text-primary">Projects</h1>
          <p className="text-body text-text-secondary mt-2">
            Organize meetings, tasks and insights by project.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-4">
          {isLoading ? (
            <Card className="h-[160px] flex items-center justify-center text-text-secondary">
              Loading projects...
            </Card>
          ) : projects.length === 0 ? (
            <Card className="flex flex-col items-start gap-3">
              <h2 className="text-h2 text-text-primary">No projects yet</h2>
              <p className="text-body text-text-secondary max-w-md">
                Create your first project to start managing meetings, tasks and AI insights.
              </p>
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  const el = document.getElementById('create-project-form');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                Create project
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((project) => (
                <Card
                  key={project.id}
                  interactive
                  className="cursor-pointer"
                  onClick={() => router.push('/dashboard')}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-md bg-bg-primary border border-border-subtle flex items-center justify-center text-[11px] text-text-secondary">
                        {project.name?.[0]?.toUpperCase() ?? 'P'}
                      </div>
                      <h3 className="text-h2 text-text-primary truncate">{project.name}</h3>
                    </div>
                  </div>
                  {project.description && (
                    <p className="text-small text-text-secondary line-clamp-3">
                      {project.description}
                    </p>
                  )}
                </Card>
              ))}
            </div>
          )}

          {error && (
            <p className="text-small text-semantic-danger mt-2">
              {error.message}
            </p>
          )}
        </div>

        <div className="lg:col-span-5">
          <Card id="create-project-form">
            <h2 className="text-h2 text-text-primary mb-3">Create a new project</h2>
            <p className="text-small text-text-secondary mb-4">
              Projects keep meetings, tasks, insights and integrations scoped to a single initiative.
            </p>
            <form onSubmit={handleCreate} className="space-y-4">
              <Input
                label="Project name"
                placeholder="AI Rollout – Q2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Textarea
                label="Description"
                placeholder="Short description of what this project is about."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[120px]"
              />
              {createError && (
                <p className="text-tiny text-semantic-danger">
                  {createError}
                </p>
              )}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  loading={creating}
                >
                  Create project
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}

