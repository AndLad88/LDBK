import type { Metadata } from "next";
import { site } from "@/data/content";

/** Gemensamma Open Graph-värden. Next.js slår inte ihop openGraph på djupet, så varje sida utgår från dessa. */
export const baseOpenGraph = {
  type: "website",
  locale: "sv_SE",
  siteName: site.name,
  images: [{ url: "/images/hero.png", width: 1920, height: 1080, alt: site.name }],
} satisfies Metadata["openGraph"];

/** Skapar metadata (title, description, Open Graph, canonical) för en undersida. */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { ...baseOpenGraph, title: `${title} | ${site.name}`, description, url: path },
  };
}
