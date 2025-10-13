"use client";

import { useEffect, useMemo, useState } from "react";
import type { Project } from "@/types";
import { slugify } from "@/lib/utils";

const defaultProject = (): Project => ({
  id: "",
  name: "",
  description: "",
  excerpt: "",
  technologies: [],
  role: "",
  year: new Date().getFullYear(),
  image: "",
  links: {}
});

export default function ProjectsManager({ token }: { token: string }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState<Project>(defaultProject());
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const headers = useMemo(() => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  }), [token]);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data: Project[]) => setProjects(data))
      .catch(() => setError("No se pudieron cargar los proyectos"));
  }, []);

  const handleChange = <K extends keyof Project>(key: K, value: Project[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSaving(true);
    setError(null);

    const payload: Project = {
      ...form,
      id: form.id || slugify(form.name),
      technologies: form.technologies.filter(Boolean),
      links: {
        demo: form.links.demo?.trim() || undefined,
        github: form.links.github?.trim() || undefined
      }
    };

    const endpoint = activeId ? `/api/projects/${activeId}` : "/api/projects";
    const method = activeId ? "PUT" : "POST";

    const response = await fetch(endpoint, {
      method,
      headers,
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      setError("No se pudo guardar el proyecto");
      setIsSaving(false);
      return;
    }

    const data = (await response.json()) as Project;
    setProjects((prev) => {
      if (activeId) {
        return prev.map((project) => (project.id === activeId ? data : project));
      }
      return [data, ...prev];
    });

    setActiveId(data.id);
    setForm({ ...data, technologies: [...data.technologies], links: { ...data.links } });
    setIsSaving(false);
  };

  const handleEdit = (project: Project) => {
    setActiveId(project.id);
    setForm({ ...project, technologies: [...project.technologies], links: { ...project.links } });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar proyecto?")) return;
    const response = await fetch(`/api/projects/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!response.ok) {
      setError("No se pudo eliminar el proyecto");
      return;
    }
    setProjects((prev) => prev.filter((project) => project.id !== id));
    if (activeId === id) {
      setActiveId(null);
      setForm(defaultProject());
    }
  };

  const handleReset = () => {
    setActiveId(null);
    setForm(defaultProject());
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Portafolio</h2>
        <button type="button" onClick={handleReset} className="btn-secondary">
          Nuevo proyecto
        </button>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="name">Nombre</label>
              <input id="name" value={form.name} onChange={(e) => handleChange("name", e.target.value)} required />
            </div>
            <div>
              <label htmlFor="role">Rol</label>
              <input id="role" value={form.role} onChange={(e) => handleChange("role", e.target.value)} required />
            </div>
            <div>
              <label htmlFor="year">Año</label>
              <input
                id="year"
                type="number"
                value={form.year}
                onChange={(e) => handleChange("year", Number(e.target.value))}
                required
              />
            </div>
            <div>
              <label htmlFor="image">Imagen (URL)</label>
              <input id="image" value={form.image} onChange={(e) => handleChange("image", e.target.value)} required />
            </div>
          </div>
          <div>
            <label htmlFor="excerpt">Resumen corto</label>
            <textarea id="excerpt" rows={2} value={form.excerpt} onChange={(e) => handleChange("excerpt", e.target.value)} required />
          </div>
          <div>
            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
              rows={4}
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="technologies">Tecnologías (separadas por comas)</label>
            <input
              id="technologies"
              value={form.technologies.join(", ")}
              onChange={(e) => handleChange("technologies", e.target.value.split(",").map((item) => item.trim()))}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="demo">Enlace a demo</label>
              <input
                id="demo"
                value={form.links.demo ?? ""}
                onChange={(e) => handleChange("links", { ...form.links, demo: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="github">Repositorio</label>
              <input
                id="github"
                value={form.links.github ?? ""}
                onChange={(e) => handleChange("links", { ...form.links, github: e.target.value })}
              />
            </div>
          </div>
          <button type="submit" className="btn-primary" disabled={isSaving}>
            {isSaving ? "Guardando..." : activeId ? "Actualizar" : "Guardar"}
          </button>
        </form>
        <aside className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Proyectos existentes</h3>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            {projects.map((project) => (
              <li key={project.id} className="flex items-start justify-between gap-2 rounded-xl border border-slate-200 p-3 dark:border-slate-800">
                <div>
                  <button type="button" className="font-semibold" onClick={() => handleEdit(project)}>
                    {project.name}
                  </button>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{project.role}</p>
                </div>
                <button type="button" onClick={() => handleDelete(project.id)} className="text-xs text-red-500">
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
