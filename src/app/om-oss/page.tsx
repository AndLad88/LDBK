import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Image from "next/image";
import { Container } from "@/components/Container";
import { CtaSection } from "@/components/CtaSection";
import { SectionHeading } from "@/components/SectionHeading";
import { about } from "@/data/content";

export const metadata: Metadata = pageMetadata({
  title: "Om oss",
  description:
    "Lär känna LDBK – vår historia, våra värderingar och människorna bakom företaget.",
  path: "/om-oss",
});

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-black py-20 lg:py-32">
        <Container>
          <SectionHeading as="h1" eyebrow="LDBK" title={about.title} lead={about.lead} />
        </Container>
      </section>

      {/* Historia */}
      <section aria-labelledby="historia-rubrik" className="py-24 lg:py-32">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative aspect-[4/3] bg-neutral-200">
            <Image
              src={about.image}
              alt={about.imageAlt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover grayscale"
            />
          </div>
          <div>
            <h2 id="historia-rubrik" className="text-3xl sm:text-4xl">
              Vår historia
            </h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-neutral-700">
              {about.history.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-black pt-8">
              {about.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <dt className="text-sm text-neutral-600">{stat.label}</dt>
                  <dd className="order-first text-3xl font-bold sm:text-4xl">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {/* Värderingar */}
      <section aria-labelledby="varderingar-rubrik" className="bg-black py-24 text-white lg:py-32">
        <Container>
          <SectionHeading id="varderingar-rubrik" eyebrow="Värderingar" title="Det vi står för" tone="dark" />
          <ul className="mt-16 grid gap-12 md:grid-cols-3">
            {about.values.map((value, i) => (
              <li key={value.title} className="border-t border-white pt-6">
                <span className="text-sm tabular-nums text-neutral-400" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-2xl">{value.title}</h3>
                <p className="mt-3 leading-relaxed text-neutral-400">{value.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Team */}
      <section aria-labelledby="team-rubrik" className="py-24 lg:py-32">
        <Container>
          <SectionHeading
            id="team-rubrik"
            eyebrow="Team"
            title="Människorna bakom LDBK"
            lead="[PLATSHÅLLARE] Byt ut namn och roller nedan i content.ts."
          />
          <ul className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {about.team.map((member, i) => (
              <li key={`${member.name}-${i}`}>
                {/* TODO: Ersätt med porträttbild via next/image */}
                <div className="flex aspect-[3/4] items-center justify-center bg-neutral-200 text-neutral-500" aria-hidden="true">
                  <span className="text-5xl font-bold">{member.name.charAt(0)}</span>
                </div>
                <h3 className="mt-5 text-lg">{member.name}</h3>
                <p className="text-neutral-600">{member.role}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
