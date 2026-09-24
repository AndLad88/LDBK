import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/content";

// [PLATSHÅLLARE] Ersätt med text om företaget när den finns.
export const metadata: Metadata = {
  title: `About | ${site.name}`,
  description: `About ${site.name} – coming soon.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-5 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">{site.name}</p>
      <h1 className="mt-5 text-4xl sm:text-5xl">About</h1>
      <p className="mt-4 text-sm uppercase tracking-[0.2em]">Coming soon</p>
      <Link href="/" className="mt-10 text-sm transition-opacity duration-200 hover:opacity-50">
        ← Back
      </Link>
    </main>
  );
}
