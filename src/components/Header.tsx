import Link from "next/link";
import { site } from "@/data/content";
import { Container } from "./Container";
import { SiteNav } from "./SiteNav";

/** Sidhuvud med textlogotyp och navigation. */
export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-black bg-white">
      <Container className="flex h-18 items-center justify-between">
        {/* TODO: Ersätt textloggan med en riktig logotyp (t.ex. next/image med SVG) */}
        <Link href="/" className="text-2xl font-bold tracking-tight" aria-label={`${site.name} – till startsidan`}>
          {site.name}
        </Link>
        <SiteNav />
      </Container>
    </header>
  );
}
