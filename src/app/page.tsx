import { contact, site } from "@/data/content";

const label = "text-xs uppercase tracking-[0.25em] text-neutral-500";
const link = "underline-offset-4 hover:underline";

export default function HomePage() {
  return (
    <div className="flex min-h-svh flex-col">
      {/* Logotyp centrerad på skärmen */}
      <main className="flex flex-1 items-center justify-center px-5 py-24">
        {/* TODO: Ersätt textloggan med en riktig logotyp (t.ex. next/image med SVG) */}
        <h1 className="text-[clamp(4.5rem,22vw,16rem)] leading-none tracking-tighter">
          {site.name}
        </h1>
      </main>

      {/* Kontaktuppgifter och öppettider */}
      <footer className="border-t border-black">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-12 sm:grid-cols-2 sm:px-8 lg:px-12">
          <section aria-labelledby="kontakt-rubrik">
            <h2 id="kontakt-rubrik" className={label}>
              Kontakt
            </h2>
            <address className="mt-4 space-y-1 not-italic">
              <p>{contact.address.street}</p>
              <p>
                {contact.address.postalCode} {contact.address.city}
              </p>
              <p className="pt-3">
                <a href={`tel:${contact.phoneHref}`} className={link}>
                  {contact.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${contact.email}`} className={link}>
                  {contact.email}
                </a>
              </p>
            </address>
          </section>

          <section aria-labelledby="oppettider-rubrik">
            <h2 id="oppettider-rubrik" className={label}>
              Öppettider
            </h2>
            <p className="mt-4">{contact.openingHours}</p>
            <p className="mt-4 text-neutral-600">Org.nr {contact.orgNumber}</p>
          </section>
        </div>
      </footer>
    </div>
  );
}
