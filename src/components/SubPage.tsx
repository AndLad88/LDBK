import Link from "next/link";
import type { ReactNode } from "react";

/** Gemensam layout för undersidorna: rubrik, innehåll och tillbakalänk. */
export function SubPage({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-5 py-16 text-center">
      <h1 className="text-4xl sm:text-5xl">{title}</h1>
      {children}
      <Link href="/" className="mt-12 text-sm transition-opacity duration-200 hover:opacity-50">
        ← Back
      </Link>
    </main>
  );
}
