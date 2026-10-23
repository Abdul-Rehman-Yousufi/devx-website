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
  category?: string;
  video?: string;

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

export const DEFAULT_CATEGORIES = [
  "All",
  "Web Development",
  "SaaS Platform",
  "AI & Automation",
  "Mobile App",
  "E-Commerce",
  "Custom Software",
  "UI/UX Design"
];

/**
 * Standardizes project category, inferring from existing project types if not explicitly set.
 */
export function getProjectCategory(project: Project): string {
  if (project.category && project.category.trim()) {
    return project.category.trim();
  }
  const type = (project.type || '').toLowerCase();
  if (
    type.includes('ai') ||
    type.includes('machine learning') ||
    type.includes('data science') ||
    type.includes('automation') ||
    type.includes('crm')
  ) {
    return 'AI & Automation';
  }
  if (
    type.includes('saas') ||
    type.includes('productivity') ||
    type.includes('task management') ||
    type.includes('networking')
  ) {
    return 'SaaS Platform';
  }
  if (type.includes('e-commerce') || type.includes('commerce') || type.includes('store')) {
    return 'E-Commerce';
  }
  if (type.includes('mobile') || type.includes('cross-platform') || type.includes('desktop')) {
    return 'Mobile App';
  }
  return 'Web Development';
}

/**
 * Dynamically extracts all distinct categories from projects and saved custom categories.
 */
const CUSTOM_CATS_KEY = 'devx_custom_categories';

export function getCustomCategories(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CUSTOM_CATS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCustomCategory(category: string): void {
  const trimmed = category.trim();
  if (!trimmed) return;
  const existing = getCustomCategories();
  if (!existing.includes(trimmed)) {
    const updated = [...existing, trimmed];
    localStorage.setItem(CUSTOM_CATS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(UPDATE_EVENT));
  }
}

export function getAllCategories(projects: Project[]): string[] {
  const set = new Set<string>(DEFAULT_CATEGORIES);
  getCustomCategories().forEach((c) => set.add(c));
  projects.forEach((p) => {
    const cat = getProjectCategory(p);
    if (cat) set.add(cat);
  });
  return Array.from(set);
}

/**
 * React hook to listen to real-time project updates across all components.
 */
export function useProjects(): {
  projects: Project[];
  categories: string[];
  saveProject: (p: Project) => void;
  deleteProject: (id: string) => void;
  resetProjects: () => void;
  addCategory: (cat: string) => void;
} {
  const [projectList, setProjectList] = useState<Project[]>(() => getStoredProjects());
  const [categoryList, setCategoryList] = useState<string[]>(() => getAllCategories(getStoredProjects()));

  const refresh = useCallback(() => {
    const updatedProjects = getStoredProjects();
    setProjectList(updatedProjects);
    setCategoryList(getAllCategories(updatedProjects));
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
    categories: categoryList,
    saveProject,
    deleteProject,
    resetProjects: resetProjectsToDefault,
    addCategory: saveCustomCategory,
  };
}
