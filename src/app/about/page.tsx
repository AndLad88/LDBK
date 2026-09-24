import type { Metadata } from "next";
import { SubPage } from "@/components/SubPage";
import { site } from "@/data/content";
import { getDictionary } from "@/lib/i18n";

// [PLATSHÅLLARE] Ersätt med text om företaget när den finns.
export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getDictionary();
  return {
    title: `${t.qr.about} | ${site.name}`,
    description: `${t.qr.about} – ${t.comingSoon}.`,
    alternates: { canonical: "/about" },
  };
}

export default async function AboutPage() {
  const { t } = await getDictionary();
  return (
    <SubPage title={t.qr.about}>
      <p className="mt-4 text-sm uppercase tracking-[0.2em]">{t.comingSoon}</p>
    </SubPage>
  );
}
