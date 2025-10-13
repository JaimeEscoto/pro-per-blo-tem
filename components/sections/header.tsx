"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ui/theme-toggle";
import { Menu, X } from "lucide-react";
import clsx from "classnames";

const navItems = [
  { href: "/#inicio", label: "Inicio" },
  { href: "/#sobre-mi", label: "Sobre mí" },
  { href: "/#portafolio", label: "Líneas de trabajo" },
  { href: "/blog", label: "Blog" },
  { href: "/#contacto", label: "Contacto" }
];

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 16);
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-slate-950/70",
        { "shadow-md shadow-slate-900/5": isScrolled }
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/#inicio" className="text-lg font-semibold">
          Paola Madrid · Psicología Clínica
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-primary-500">
              {item.label}
            </Link>
          ))}
          <Link href="/admin/login" className="rounded-full border border-slate-200 px-4 py-1 text-xs dark:border-slate-700">
            Administrar
          </Link>
          <ThemeToggle />
        </nav>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-primary-500 hover:text-primary-500 dark:border-slate-700 dark:text-slate-200 md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Abrir menú"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        {isOpen && (
          <div className="absolute left-0 right-0 top-16 border-b border-slate-200 bg-white px-6 py-4 shadow-lg dark:border-slate-800 dark:bg-slate-950 md:hidden">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="text-sm font-medium">
                  {item.label}
                </Link>
              ))}
              <Link href="/admin/login" className="text-sm font-semibold">
                Administrar
              </Link>
              <ThemeToggle />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
