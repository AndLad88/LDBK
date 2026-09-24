import type { Metadata } from "next";
import { SubPage } from "@/components/SubPage";
import { site } from "@/data/content";

// [PLATSHÅLLARE] Ersätt med riktiga projekt när de finns.
export const metadata: Metadata = {
  title: `Projects | ${site.name}`,
  description: `Projects by ${site.name} – coming soon.`,
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <SubPage title="Projects">
      <p className="mt-4 text-sm uppercase tracking-[0.2em]">Coming soon</p>
    </SubPage>
  );
}
