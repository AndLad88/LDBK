import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { site } from "@/data/content";
import { baseOpenGraph } from "@/lib/metadata";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} – ${site.slogan}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    ...baseOpenGraph,
    title: `${site.name} – ${site.slogan}`,
    description: site.description,
    url: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="sv">
      <body className="flex min-h-screen flex-col">
        {/* Hoppa-till-innehåll-länk för tangentbordsanvändare */}
        <a
          href="#innehall"
          className="sr-only z-50 bg-black px-4 py-3 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Hoppa till innehållet
        </a>
        <Header />
        <main id="innehall" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
