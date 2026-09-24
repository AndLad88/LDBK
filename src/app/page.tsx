import { contactCard, site, socialLinks } from "@/data/content";
import { qrCodes, qrSvg, qrTypes } from "@/lib/qr";

/**
 * Visitkortets mått: liggande 85 × 55 mm.
 * På skärmen skalas korten proportionerligt; vid utskrift blir varje kort
 * en egen sida i exakt visitkortsstorlek (se @page i globals.css).
 * Text och QR-koder använder cqw (procent av kortets bredd) så att allt
 * behåller samma proportioner i alla storlekar.
 */
const card =
  "@container relative flex aspect-[85/55] w-full max-w-[680px] items-center justify-center bg-white lg:max-w-[560px] print:h-[55mm] print:w-[85mm] print:max-w-none print:break-after-page";

const buttonBase =
  "flex w-full items-center justify-center border border-black px-3 py-4 text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-200";
const outline = "bg-white text-black hover:bg-black hover:text-white";
const solid = "bg-black text-white hover:bg-white hover:text-black";

const contactButtons = [
  { label: "Ring", href: `tel:${contactCard.phone}` },
  { label: "Mejla", href: `mailto:${contactCard.email}` },
  { label: "SMS", href: `sms:${contactCard.phone}` },
];

export default async function HomePage() {
  const codes = await Promise.all(
    qrTypes.map(async (type) => ({ type, svg: await qrSvg(type), ...qrCodes[type] })),
  );

  return (
    <main className="flex min-h-svh flex-col items-center gap-12 bg-neutral-100 px-5 py-12 sm:px-8 sm:py-16 print:block print:bg-white print:p-0">
      {/* Digitalt visitkort – visas inte vid utskrift */}
      <section aria-labelledby="namn" className="w-full max-w-md print:hidden">
        <h1 id="namn" className="text-4xl tracking-tight">
          {contactCard.firstName} {contactCard.lastName}
        </h1>
        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-neutral-600">
          {contactCard.title}, {contactCard.organization}
        </p>

        {/* Kontaktknappar */}
        <ul className="mt-8 grid grid-cols-3 gap-2">
          {contactButtons.map((button) => (
            <li key={button.label}>
              <a href={button.href} className={`${buttonBase} ${outline}`}>
                {button.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Spara kontakt (vCard) */}
        <a href="/kontakt.vcf" className={`${buttonBase} ${solid} mt-2`}>
          Spara kontakt
        </a>

        {/* Sociala länkar */}
        <h2 className="mt-10 text-xs uppercase tracking-[0.2em] text-neutral-600">Länkar</h2>
        <ul className="mt-3 divide-y divide-black border-y border-black">
          {socialLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="flex items-center justify-between py-4 underline-offset-4 hover:underline"
              >
                {link.label}
                <span aria-hidden="true">→</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Tryckbart visitkort: fram- och baksida */}
      <section
        aria-labelledby="visitkort-rubrik"
        className="flex w-full flex-col items-center gap-8 sm:gap-12 lg:flex-row lg:justify-center print:block"
      >
        <h2 id="visitkort-rubrik" className="sr-only">
          Visitkort
        </h2>
        {/* Framsida */}
        <section aria-label="Visitkort, framsida" className={card}>
          {/* TODO: Ersätt textloggan med en riktig logotyp (t.ex. next/image med SVG) */}
          <div className="text-center">
            <p className="text-[22cqw] font-bold leading-none tracking-tighter">{site.name}</p>
            <p className="mt-[2.5cqw] text-[max(2.6cqw,10px)] uppercase tracking-[0.2em] print:text-[2.6cqw]">
              {site.tagline}
            </p>
          </div>
        </section>

        {/* Baksida med QR-koder */}
        <section aria-labelledby="qr-rubrik" className={card}>
          <h3 id="qr-rubrik" className="sr-only">
            QR-koder
          </h3>
          <ul className="grid grid-cols-3 gap-[7cqw]">
            {codes.map((code) => (
              <li key={code.type}>
                <figure className="flex w-[21cqw] flex-col items-center">
                  <div
                    role="img"
                    aria-label={code.description}
                    className="w-full [&>svg]:block [&>svg]:h-auto [&>svg]:w-full"
                    // SVG:n genereras av oss själva i lib/qr.ts
                    dangerouslySetInnerHTML={{ __html: code.svg }}
                  />
                  <figcaption className="mt-[2.5cqw] text-[max(2.6cqw,10px)] uppercase tracking-[0.2em] print:text-[2.6cqw]">
                    {code.label}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  );
}
