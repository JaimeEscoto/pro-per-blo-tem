"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface LoginForm {
  email: string;
  password: string;
}

export default function AdminLoginPage() {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<LoginForm>();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: LoginForm) => {
    setError(null);
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      setError("Credenciales inválidas. Intenta nuevamente.");
      return;
    }

    const payload = (await response.json()) as { token: string };
    localStorage.setItem("portfolio-admin-token", payload.token);
    router.push("/admin/dashboard");
  };

  return (
    <section className="section-container flex min-h-[60vh] flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-3xl border border-slate-200 bg-white p-10 shadow-xl dark:border-slate-800 dark:bg-slate-950">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Panel de administración</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Inicia sesión con tus credenciales para gestionar proyectos y publicaciones.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email">Correo electrónico</label>
            <input id="email" type="email" required {...register("email", { required: true })} />
          </div>
          <div className="space-y-2">
            <label htmlFor="password">Contraseña</label>
            <input id="password" type="password" required {...register("password", { required: true })} />
          </div>
          <button type="submit" className="btn-primary w-full" disabled={formState.isSubmitting}>
            {formState.isSubmitting ? "Verificando..." : "Iniciar sesión"}
          </button>
          {error && <p className="text-center text-sm text-red-500">{error}</p>}
          <p className="text-center text-xs text-slate-500 dark:text-slate-400">
            Tip: Usa <code>admin@anarodriguez.dev</code> y <code>SuperSegura!2024</code> en entornos locales.
          </p>
        </form>
      </div>
    </section>
  );
}
