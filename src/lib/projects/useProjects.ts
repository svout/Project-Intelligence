'use client';

import { useCallback, useEffect, useState } from 'react';

export interface Project {
  id: string;
  name: string;
  description?: string | null;
  status?: string | null;
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | undefined>(undefined);

  const loadProjects = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(undefined);
      const res = await fetch('/api/projects');
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Failed to load projects');
      }
      setProjects((json.data as Project[]) || []);
    } catch (e) {
      setError(e as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadProjects();
  }, [loadProjects]);

  async function createProject(input: { name: string; description?: string }) {
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.error || 'Failed to create project');
    }
    await loadProjects();
    return json.data as Project;
  }

  return {
    projects,
    isLoading,
    error,
    reload: loadProjects,
    createProject,
  };
}

