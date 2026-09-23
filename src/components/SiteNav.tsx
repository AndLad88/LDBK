"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation, site } from "@/data/content";

/**
 * Navigation med mobilmeny. Client Component eftersom den behöver
 * state (öppen/stängd meny) och aktuell sökväg för aktiv länk.
 */
export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  // Stäng menyn vid sidbyte (justera state under render i stället för i effekt)
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Lås scroll och stäng med Escape när mobilmenyn är öppen
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      {/* Desktop */}
      <nav aria-label="Huvudmeny" className="hidden md:block">
        <ul className="flex items-center gap-10">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="text-sm uppercase tracking-[0.15em] underline-offset-8 decoration-1 hover:underline aria-[current=page]:underline"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Hamburgerknapp */}
      <button
        type="button"
        className={`relative z-50 -mr-2 flex h-11 w-11 items-center justify-center md:hidden ${open ? "text-white" : ""}`}
        aria-expanded={open}
        aria-controls="mobilmeny"
        aria-label={open ? "Stäng meny" : "Öppna meny"}
        onClick={() => setOpen((v) => !v)}
      >
        <span aria-hidden="true" className="relative block h-3.5 w-6">
          <span className={`absolute left-0 block h-0.5 w-6 bg-current transition-transform duration-200 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
          <span className={`absolute left-0 top-1.5 block h-0.5 w-6 bg-current transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
          <span className={`absolute left-0 block h-0.5 w-6 bg-current transition-transform duration-200 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
        </span>
      </button>

      {/* Mobilmeny */}
      <nav
        id="mobilmeny"
        aria-label="Mobilmeny"
        className={`fixed inset-0 z-40 bg-black text-white md:hidden ${open ? "block" : "hidden"}`}
      >
        <div className="flex h-18 items-center px-5 sm:px-8">
          <Link href="/" className="text-2xl font-bold tracking-tight" onClick={() => setOpen(false)}>
            {site.name}
          </Link>
        </div>
        <ul className="flex flex-col gap-2 px-5 pt-12 sm:px-8">
          {[{ label: "Start", href: "/" }, ...navigation].map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className="block py-2 text-4xl font-bold underline-offset-8 decoration-2 hover:underline aria-[current=page]:underline"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
