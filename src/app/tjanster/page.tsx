import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/Container";
import { CtaSection } from "@/components/CtaSection";
import { SectionHeading } from "@/components/SectionHeading";
import { services } from "@/data/content";

export const metadata: Metadata = pageMetadata({
  title: "Tjänster",
  description:
    "Projektledning, byggledning, konstruktion och renovering – se hur LDBK kan hjälpa ditt byggprojekt.",
  path: "/tjanster",
});

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-black py-20 lg:py-32">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Tjänster"
            title="Från idé till färdig byggnad."
            lead="[PLATSHÅLLARE] Vi erbjuder ett komplett stöd genom byggprocessens alla skeden – separat eller som en helhet."
          />
        </Container>
      </section>

      <Container as="ol" className="divide-y divide-black">
        {services.map((service, i) => (
          <li
            key={service.slug}
            id={service.slug}
            className="grid scroll-mt-24 gap-8 py-16 lg:grid-cols-12 lg:gap-16 lg:py-24"
          >
            <span className="text-sm tabular-nums text-neutral-500 lg:col-span-1" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:col-span-4">{service.title}</h2>
            <div className="lg:col-span-7">
              <p className="text-lg leading-relaxed text-neutral-700">{service.description}</p>
              <ul className="mt-8 grid gap-px border border-black bg-black sm:grid-cols-2">
                {service.points.map((point) => (
                  <li key={point} className="bg-white px-5 py-4">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </Container>

      <CtaSection />
    </>
  );
}
