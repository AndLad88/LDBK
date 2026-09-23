import { contact, site } from "@/data/content";

export default function HomePage() {
  return (
    <div className="relative min-h-svh">
      {/* Logotyp centrerad på skärmen */}
      <main className="flex min-h-svh items-center justify-center px-5 py-24">
        {/* TODO: Ersätt textloggan med en riktig logotyp (t.ex. next/image med SVG) */}
        <h1 className="text-[clamp(4.5rem,22vw,16rem)] leading-none tracking-tighter">
          {site.name}
        </h1>
      </main>

      {/* Adress och telefonnummer i nedre vänstra hörnet */}
      <footer className="absolute bottom-0 left-0 px-5 py-6 sm:px-8 sm:py-8 lg:px-12">
        <address className="text-[9px] leading-relaxed not-italic">
          <p>{contact.address}</p>
          <p>
            <a href={`tel:${contact.phoneHref}`} className="underline-offset-4 hover:underline">
              {contact.phone}
            </a>
          </p>
        </address>
      </footer>
    </div>
  );
}
