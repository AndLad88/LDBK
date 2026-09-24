import type { Metadata } from "next";
import { SubPage } from "@/components/SubPage";
import { site } from "@/data/content";

// [PLATSHÅLLARE] Ersätt med text om företaget när den finns.
export const metadata: Metadata = {
  title: `About | ${site.name}`,
  description: `About ${site.name} – coming soon.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <SubPage title="About">
      <p className="mt-4 text-sm uppercase tracking-[0.2em]">Coming soon</p>
    </SubPage>
  );
}
