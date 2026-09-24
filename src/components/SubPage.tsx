import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/data/content";

/** Gemensam layout för undersidorna: LDBK, rubrik, innehåll och tillbakalänk. */
export function SubPage({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-5 py-16 text-center">
      <Link
        href="/"
        className="text-xs uppercase tracking-[0.2em] text-neutral-400 transition-opacity duration-200 hover:opacity-60"
      >
        {site.name}
      </Link>
      <h1 className="mt-5 text-4xl sm:text-5xl">{title}</h1>
      {children}
      <Link href="/" className="mt-12 text-sm transition-opacity duration-200 hover:opacity-50">
        ← Back
      </Link>
    </main>
  );
}
