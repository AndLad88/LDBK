import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/Container";
import { CtaSection } from "@/components/CtaSection";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/SectionHeading";
import { projects } from "@/data/content";

export const metadata: Metadata = pageMetadata({
  title: "Projekt",
  description:
    "Ett urval av referensprojekt som LDBK har lett, konstruerat och genomfört.",
  path: "/projekt",
});

export default function ProjectsPage() {
  return (
    <>
      <section className="border-b border-black py-20 lg:py-32">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Referenser"
            title="Projekt"
            lead="[PLATSHÅLLARE] Ett urval av uppdrag vi är stolta över – från bostäder och kontor till skolor och renoveringar."
          />
        </Container>
      </section>

      <section aria-label="Projektlista" className="py-20 lg:py-28">
        <Container>
          <ul className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <li key={project.slug}>
                <ProjectCard project={project} headingLevel="h2" priority={i < 3} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
