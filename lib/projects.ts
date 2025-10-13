import { readJson, writeJson } from "@/lib/storage";
import type { Project } from "@/types";

const FILE_NAME = "projects.json";

export async function getProjects(): Promise<Project[]> {
  return readJson<Project[]>(FILE_NAME);
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((project) => project.id === id);
}

export async function createProject(project: Project): Promise<Project> {
  const projects = await getProjects();
  projects.unshift(project);
  await writeJson(FILE_NAME, projects);
  return project;
}

export async function updateProject(id: string, payload: Partial<Project>): Promise<Project | undefined> {
  const projects = await getProjects();
  const index = projects.findIndex((project) => project.id === id);
  if (index === -1) return undefined;
  const updated = { ...projects[index], ...payload };
  projects[index] = updated;
  await writeJson(FILE_NAME, projects);
  return updated;
}

export async function deleteProject(id: string): Promise<boolean> {
  const projects = await getProjects();
  const filtered = projects.filter((project) => project.id !== id);
  if (filtered.length === projects.length) return false;
  await writeJson(FILE_NAME, filtered);
  return true;
}
