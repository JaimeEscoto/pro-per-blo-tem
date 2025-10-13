"use client";

import { useEffect, useState } from "react";
import type { SiteStats } from "@/types";

export default function StatsOverview() {
  const [stats, setStats] = useState<SiteStats | null>(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data: SiteStats) => setStats(data))
      .catch(() => setStats(null));
  }, []);

  if (!stats) {
    return (
      <section className="card space-y-4 p-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Estadísticas</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">Cargando métricas...</p>
      </section>
    );
  }

  return (
    <section className="card space-y-6 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Estadísticas del sitio</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Resumen de tráfico y comunidad actualizado manualmente.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="rounded-2xl bg-primary-600/10 p-4">
            <p className="text-xs uppercase tracking-widest text-primary-500">Visitas totales</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{stats.totalVisits.toLocaleString()}</p>
          </div>
          <div className="rounded-2xl bg-primary-600/10 p-4">
            <p className="text-xs uppercase tracking-widest text-primary-500">Suscriptores</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
              {stats.newsletterSubscribers.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">Visitas mensuales</h3>
        <ul className="mt-4 grid gap-3 md:grid-cols-3">
          {stats.monthly.map((month) => (
            <li key={month.month} className="rounded-2xl border border-slate-200 p-4 text-sm dark:border-slate-800">
              <p className="text-slate-500 dark:text-slate-400">{month.month}</p>
              <p className="text-lg font-semibold text-slate-900 dark:text-white">{month.visits.toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
