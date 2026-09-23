import Image from "next/image";
import type { Project } from "@/data/content";

type ProjectCardProps = {
  project: Project;
  /** Sätt true för bilder ovanför vecket så de laddas direkt. */
  priority?: boolean;
  headingLevel?: "h2" | "h3";
};

/** Referensprojekt med bild, namn och kort beskrivning. */
export function ProjectCard({ project, priority = false, headingLevel: Heading = "h3" }: ProjectCardProps) {
  return (
    <article className="group">
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover grayscale transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4 border-b border-current pb-3">
        <Heading className="text-xl">{project.title}</Heading>
        <span className="shrink-0 text-sm tabular-nums opacity-60">{project.year}</span>
      </div>
      <p className="mt-3 text-xs uppercase tracking-[0.2em] opacity-60">
        {project.category} · {project.location}
      </p>
      <p className="mt-3 leading-relaxed opacity-80">{project.description}</p>
    </article>
  );
}
