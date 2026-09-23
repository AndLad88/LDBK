import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { CtaSection } from "@/components/CtaSection";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { home, projects, services } from "@/data/content";

// Titel och Open Graph ärvs från layout.tsx
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section aria-labelledby="hero-rubrik" className="border-b border-black">
        <Container className="grid gap-12 py-20 lg:grid-cols-12 lg:items-end lg:gap-16 lg:py-32">
          <div className="lg:col-span-7">
            <h1 id="hero-rubrik" className="text-5xl leading-[0.95] sm:text-7xl lg:text-8xl">
              {home.hero.title}
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-neutral-600 sm:text-xl">
              {home.hero.lead}
            </p>
            <Button href="/kontakt" className="mt-10">
              {home.hero.cta} <span aria-hidden="true">→</span>
            </Button>
          </div>
          <div className="relative aspect-[4/5] bg-neutral-200 lg:col-span-5">
            <Image
              src={home.hero.image}
              alt={home.hero.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover grayscale"
            />
          </div>
        </Container>
      </section>

      {/* Introduktion */}
      <section aria-labelledby="intro-rubrik" className="py-24 lg:py-32">
        <Container className="grid gap-10 lg:grid-cols-12">
          <p className="text-xs uppercase tracking-[0.25em] text-neutral-600 lg:col-span-3">
            {home.intro.eyebrow}
          </p>
          <div className="lg:col-span-9">
            <h2 id="intro-rubrik" className="text-3xl leading-tight sm:text-4xl lg:text-5xl">
              {home.intro.title}
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-600">
              {home.intro.text}
            </p>
            <Button href="/om-oss" variant="outline" className="mt-10">
              Mer om oss
            </Button>
          </div>
        </Container>
      </section>

      {/* Tjänster */}
      <section aria-labelledby="tjanster-rubrik" className="bg-black py-24 text-white lg:py-32">
        <Container>
          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
            <SectionHeading eyebrow="Tjänster" id="tjanster-rubrik" title="Det vi gör" tone="dark" />
            <Button href="/tjanster" variant="inverted">
              Alla tjänster
            </Button>
          </div>
          <ul className="mt-16 grid gap-px sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => (
              <li key={service.slug}>
                <ServiceCard service={service} index={i} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Utvalda projekt */}
      <section aria-labelledby="projekt-rubrik" className="py-24 lg:py-32">
        <Container>
          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
            <SectionHeading eyebrow="Referenser" id="projekt-rubrik" title="Utvalda projekt" />
            <Button href="/projekt" variant="outline">
              Alla projekt
            </Button>
          </div>
          <ul className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((project) => (
              <li key={project.slug}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
