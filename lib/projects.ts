import { supabaseRequest } from "@/lib/supabase";
import type { Project } from "@/types";

const TABLE = "projects";

interface ProjectRow {
  id: string;
  name: string;
  description: string;
  excerpt: string;
  technologies: string[] | null;
  role: string;
  year: number;
  image: string;
  links: Record<string, string> | null;
}

function mapProject(row: ProjectRow): Project {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    excerpt: row.excerpt,
    technologies: row.technologies ?? [],
    role: row.role,
    year: row.year,
    image: row.image,
    links: (row.links ?? {}) as Project["links"],
  };
}

function serializeProject(project: Project): ProjectRow {
  return {
    id: project.id,
    name: project.name,
    description: project.description,
    excerpt: project.excerpt,
    technologies: project.technologies ?? [],
    role: project.role,
    year: project.year,
    image: project.image,
    links: project.links ?? {},
  };
}

function serializePartialProject(project: Partial<Project>): Partial<ProjectRow> {
  const payload: Partial<ProjectRow> = {};
  if (project.id !== undefined) payload.id = project.id;
  if (project.name !== undefined) payload.name = project.name;
  if (project.description !== undefined) payload.description = project.description;
  if (project.excerpt !== undefined) payload.excerpt = project.excerpt;
  if (project.technologies !== undefined)
    payload.technologies = project.technologies ?? [];
  if (project.role !== undefined) payload.role = project.role;
  if (project.year !== undefined) payload.year = project.year;
  if (project.image !== undefined) payload.image = project.image;
  if (project.links !== undefined) payload.links = project.links ?? {};
  return payload;
}

export async function getProjects(): Promise<Project[]> {
  const data = await supabaseRequest<ProjectRow[]>(TABLE, {
    query: {
      select: "*",
      order: "year.desc",
    },
  });
  return (data ?? []).map(mapProject);
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  const data = await supabaseRequest<ProjectRow[]>(TABLE, {
    query: {
      select: "*",
      id: `eq.${id}`,
      limit: "1",
    },
  });
  const row = data?.[0];
  return row ? mapProject(row) : undefined;
}

export async function createProject(project: Project): Promise<Project> {
  const row = serializeProject(project);
  const [created] = await supabaseRequest<ProjectRow[]>(TABLE, {
    method: "POST",
    body: row,
    prefer: "return=representation",
  });
  return mapProject(created);
}

export async function updateProject(
  id: string,
  payload: Partial<Project>
): Promise<Project | undefined> {
  const update = serializePartialProject(payload);
  if (Object.keys(update).length === 0) {
    return getProjectById(id);
  }

  const data = await supabaseRequest<ProjectRow[]>(TABLE, {
    method: "PATCH",
    query: {
      id: `eq.${id}`,
    },
    body: update,
    prefer: "return=representation",
  });
  const row = data?.[0];
  return row ? mapProject(row) : undefined;
}

export async function deleteProject(id: string): Promise<boolean> {
  const data = await supabaseRequest<ProjectRow[]>(TABLE, {
    method: "DELETE",
    query: {
      id: `eq.${id}`,
    },
    prefer: "return=representation",
  });
  return Boolean(data && data.length > 0);
}
