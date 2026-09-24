import type { Metadata, Viewport } from "next";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { site } from "@/data/content";
import { getDictionary } from "@/lib/i18n";
import "./globals.css";

/** Open Graph-språkkod per språk. */
const ogLocale = { sv: "sv_SE", en: "en_US", de: "de_DE", fr: "fr_FR", es: "es_ES", it: "it_IT" };

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getDictionary();
  const description = `${site.name} – ${t.tagline}.`;
  return {
    metadataBase: new URL(site.url),
    title: site.name,
    description,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: ogLocale[locale],
      siteName: site.name,
      title: site.name,
      description,
      url: "/",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const { locale, t } = await getDictionary();
  return (
    <html lang={locale}>
      <body>
        <LanguageSwitcher current={locale} label={t.language} />
        {children}
      </body>
    </html>
  );
}
