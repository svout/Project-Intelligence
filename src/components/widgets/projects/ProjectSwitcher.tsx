'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useProjects } from '@/lib/projects/useProjects';
import { AppSkeleton } from '@/components/elements/AppSkeleton';

export function ProjectSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const { projects, isLoading } = useProjects();
  const [open, setOpen] = useState(false);

  const activeProject =
    projects.find((p) => pathname?.includes(p.id)) || projects[0];

  function goToProject(projectId: string) {
    if (!pathname) return;
    // For now, replace plain /dashboard and /meetings with project-scoped route
    if (pathname.startsWith('/dashboard')) {
      router.push(`/dashboard/${projectId}`);
    } else if (pathname.startsWith('/meetings')) {
      router.push(`/meetings/${projectId}`);
    } else if (pathname.startsWith('/insights')) {
      router.push(`/insights/${projectId}`);
    } else {
      router.push(`/dashboard/${projectId}`);
    }
    setOpen(false);
  }

  function handleCreateProject() {
    setOpen(false);
    router.push('/projects'); // placeholder: dedicated projects page or modal
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 text-[13px] text-text-secondary hover:text-text-primary disabled:opacity-60"
        disabled={isLoading && projects.length === 0}
      >
        {isLoading && projects.length === 0 ? (
          <>
            <div className="w-7 h-7 rounded-md bg-bg-secondary border border-border-subtle flex items-center justify-center">
              <AppSkeleton variant="circular" width={18} height={18} />
            </div>
            <div className="flex flex-col items-start">
              <AppSkeleton variant="text" height={14} width={110} />
            </div>
          </>
        ) : (
          <>
            <div className="w-7 h-7 rounded-md bg-bg-secondary border border-border-subtle flex items-center justify-center text-[11px] text-text-secondary">
              {activeProject?.name?.[0]?.toUpperCase() ?? 'P'}
            </div>
            <div className="flex flex-col items-start">
              <span className="truncate max-w-[160px] text-text-primary">
                {activeProject ? activeProject.name : 'Select project'}
              </span>
            </div>
          </>
        )}
        <span className="text-xs text-text-muted">▾</span>
      </button>
      {open && (
        <div className="absolute mt-2 w-64 bg-bg-secondary border border-border-subtle rounded-xl py-1 shadow-subtle z-30">
          <div className="max-h-64 overflow-y-auto">
            {projects.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => goToProject(p.id)}
                className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-text-secondary hover:bg-white/5 hover:text-text-primary"
              >
                <div className="w-6 h-6 rounded-md bg-bg-primary border border-border-subtle flex items-center justify-center text-[11px]">
                  {p.name[0]?.toUpperCase()}
                </div>
                <span className="truncate">{p.name}</span>
              </button>
            ))}
          </div>
          <div className="border-t border-border-subtle mt-1 pt-1">
            <button
              type="button"
              onClick={handleCreateProject}
              className="w-full text-left px-3 py-2 text-[13px] text-text-secondary hover:bg-white/5"
            >
              + Create project
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

