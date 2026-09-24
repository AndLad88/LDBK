import type { Metadata } from "next";
import { SubPage } from "@/components/SubPage";
import { site } from "@/data/content";
import { getDictionary } from "@/lib/i18n";

// [PLATSHÅLLARE] Ersätt med riktiga projekt när de finns.
export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getDictionary();
  return {
    title: `${t.qr.projects} | ${site.name}`,
    description: `${t.qr.projects} – ${t.comingSoon}.`,
    alternates: { canonical: "/projects" },
  };
}

export default async function ProjectsPage() {
  const { t } = await getDictionary();
  return (
    <SubPage title={t.qr.projects}>
      <p className="mt-4 text-sm uppercase tracking-[0.2em]">{t.comingSoon}</p>
    </SubPage>
  );
}
