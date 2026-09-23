import Link from "next/link";
import { contact, navigation, site } from "@/data/content";
import { Container } from "./Container";

/** Sidfot med kontaktuppgifter, navigation och copyright. */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:py-20">
        <div>
          <p className="text-3xl font-bold tracking-tight">{site.name}</p>
          <p className="mt-4 max-w-xs text-neutral-400">{site.slogan}</p>
        </div>

        <div>
          <h2 className="text-xs uppercase tracking-[0.25em] text-neutral-400">Kontakt</h2>
          <address className="mt-4 space-y-1 not-italic">
            <p>{contact.address.street}</p>
            <p>
              {contact.address.postalCode} {contact.address.city}
            </p>
            <p className="pt-3">
              <a href={`tel:${contact.phoneHref}`} className="underline-offset-4 hover:underline">
                {contact.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${contact.email}`} className="underline-offset-4 hover:underline">
                {contact.email}
              </a>
            </p>
          </address>
        </div>

        <nav aria-label="Sidfotsmeny">
          <h2 className="text-xs uppercase tracking-[0.25em] text-neutral-400">Meny</h2>
          <ul className="mt-4 space-y-1">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="underline-offset-4 hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs uppercase tracking-[0.25em] text-neutral-400">Öppettider</h2>
          <p className="mt-4">{contact.openingHours}</p>
          <p className="mt-4 text-neutral-400">Org.nr {contact.orgNumber}</p>
        </div>
      </Container>

      <div className="border-t border-neutral-800">
        <Container className="py-6 text-sm text-neutral-400">
          © {year} {site.name}. Alla rättigheter förbehållna.
        </Container>
      </div>
    </footer>
  );
}
