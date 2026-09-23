import { contact, site } from "@/data/content";

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

      {/* Adress och telefonnummer */}
      <footer className="border-t border-black">
        <address className="mx-auto w-full max-w-7xl space-y-1 px-5 py-12 text-center not-italic sm:px-8 lg:px-12">
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
