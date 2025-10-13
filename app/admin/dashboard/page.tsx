"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PostsManager from "@/components/admin/posts-manager";
import ProjectsManager from "@/components/admin/projects-manager";
import StatsOverview from "@/components/admin/stats-overview";

export default function DashboardPage() {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("portfolio-admin-token");
    if (!storedToken) {
      router.replace("/admin/login");
    } else {
      setToken(storedToken);
    }
  }, [router]);

  if (!token) {
    return (
      <section className="section-container min-h-[50vh]">
        <p className="text-center text-sm text-slate-500 dark:text-slate-400">Validando sesión...</p>
      </section>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("portfolio-admin-token");
    router.replace("/admin/login");
  };

  return (
    <section className="section-container space-y-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">Dashboard</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Gestiona publicaciones, proyectos y revisa métricas clave del sitio.
          </p>
        </div>
        <button type="button" onClick={handleLogout} className="btn-secondary self-start md:self-auto">
          Cerrar sesión
        </button>
      </div>
      <StatsOverview />
      <PostsManager token={token} />
      <ProjectsManager token={token} />
    </section>
  );
}
