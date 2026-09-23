import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { ContactForm } from "@/components/ContactForm";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { contact } from "@/data/content";

export const metadata: Metadata = pageMetadata({
  title: "Kontakt",
  description:
    "Kontakta LDBK för en förfrågan om projektledning, byggledning, konstruktion eller renovering.",
  path: "/kontakt",
});

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-black py-20 lg:py-32">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Kontakt"
            title="Låt oss prata om ditt projekt."
            lead="[PLATSHÅLLARE] Fyll i formuläret eller hör av dig direkt. Vi svarar normalt inom en arbetsdag."
          />
        </Container>
      </section>

      <section aria-label="Kontaktformulär och kontaktuppgifter" className="py-20 lg:py-28">
        <Container className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          <aside className="bg-black p-8 text-white sm:p-10 lg:col-span-5 lg:self-start" aria-labelledby="uppgifter-rubrik">
            <h2 id="uppgifter-rubrik" className="text-2xl">
              Kontaktuppgifter
            </h2>
            <dl className="mt-8 space-y-6">
              <div>
                <dt className="text-xs uppercase tracking-[0.25em] text-neutral-400">Adress</dt>
                <dd className="mt-2">
                  <address className="not-italic">
                    {contact.address.street}
                    <br />
                    {contact.address.postalCode} {contact.address.city}
                  </address>
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.25em] text-neutral-400">Telefon</dt>
                <dd className="mt-2">
                  <a href={`tel:${contact.phoneHref}`} className="underline-offset-4 hover:underline">
                    {contact.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.25em] text-neutral-400">E-post</dt>
                <dd className="mt-2">
                  <a href={`mailto:${contact.email}`} className="underline-offset-4 hover:underline">
                    {contact.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.25em] text-neutral-400">Öppettider</dt>
                <dd className="mt-2">{contact.openingHours}</dd>
              </div>
            </dl>
          </aside>
        </Container>
      </section>
    </>
  );
}
