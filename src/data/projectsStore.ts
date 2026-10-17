import { useState, useEffect, useCallback } from 'react';
import { projects as defaultProjects, type Project } from './projects';

const STORAGE_KEY = 'devx_projects_v2';
const UPDATE_EVENT = 'devx_projects_changed';

/**
 * Retrieves the current projects from localStorage, falling back to default projects.
 */
export function getStoredProjects(): Project[] {
  if (typeof window === 'undefined') return defaultProjects;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProjects;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (err) {
    console.error('Failed to load projects from localStorage:', err);
  }
  return defaultProjects;
}

/**
 * Saves or updates a project in localStorage.
 */
export function saveProject(project: Project): void {
  const current = getStoredProjects();
  const index = current.findIndex((p) => p.id === project.id);
  let updated: Project[];

  if (index >= 0) {
    updated = [...current];
    updated[index] = project;
  } else {
    // Add new project to the front
    updated = [project, ...current];
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent(UPDATE_EVENT));
}

/**
 * Deletes a project by ID.
 */
export function deleteProject(id: string): void {
  const current = getStoredProjects();
  const updated = current.filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent(UPDATE_EVENT));
}

/**
 * Resets projects back to default seeded data.
 */
export function resetProjectsToDefault(): void {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent(UPDATE_EVENT));
}

/**
 * Generates formatted TypeScript code ready to be pasted into src/data/projects.ts
 */
export function exportProjectsToTypeScript(): string {
  const current = getStoredProjects();
  return `export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  type?: string;
  badge?: string;
  status?: string;
  github?: string;
  live?: string;
  color: string;
  image: string;
  featured?: boolean;
  layoutSize: 'hero' | 'wide' | 'standard';

  caseStudy: {
    challenge: string;
    solution: string;
    technicalBreakdown: {
      feature: string;
      insight: string;
      codeSnippet?: string;
    }[];
    outcomes: string[];
    gallery: string[];
  };
}

export const projects: Project[] = ${JSON.stringify(current, null, 2)};
`;
}

/**
 * React hook to listen to real-time project updates across all components.
 */
export function useProjects(): {
  projects: Project[];
  saveProject: (p: Project) => void;
  deleteProject: (id: string) => void;
  resetProjects: () => void;
} {
  const [projectList, setProjectList] = useState<Project[]>(() => getStoredProjects());

  const refresh = useCallback(() => {
    setProjectList(getStoredProjects());
  }, []);

  useEffect(() => {
    window.addEventListener(UPDATE_EVENT, refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener(UPDATE_EVENT, refresh);
      window.removeEventListener('storage', refresh);
    };
  }, [refresh]);

  return {
    projects: projectList,
    saveProject,
    deleteProject,
    resetProjects: resetProjectsToDefault,
  };
}
