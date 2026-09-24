import { contactCard, site, socialLinks } from "@/data/content";
import { qrCodes, qrSvg, qrTypes } from "@/lib/qr";

const buttonBase =
  "flex w-full items-center justify-center border border-black px-3 py-3 text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-200";
const outline = "bg-white text-black hover:bg-black hover:text-white";
const solid = "bg-black text-white hover:bg-white hover:text-black";
const small = "text-[10px] uppercase tracking-[0.2em]";

const contactButtons = [
  { label: "Ring", href: `tel:${contactCard.phone}` },
  { label: "Mejla", href: `mailto:${contactCard.email}` },
  { label: "SMS", href: `sms:${contactCard.phone}` },
];

/**
 * Tryckbart visitkort: liggande 85 × 55 mm. Visas bara vid utskrift, där
 * varje kort blir en egen sida i exakt visitkortsstorlek (se @page i globals.css).
 */
const printCard =
  "@container hidden h-[55mm] w-[85mm] items-center justify-center bg-white break-after-page print:flex";

/** QR-kod som inline-SVG. SVG:n genereras av oss själva i lib/qr.ts. */
function QrImage({ svg, label }: { svg: string; label: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className="w-full [&>svg]:block [&>svg]:h-auto [&>svg]:w-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

export default async function HomePage() {
  const codes = await Promise.all(
    qrTypes.map(async (type) => ({ type, svg: await qrSvg(type), ...qrCodes[type] })),
  );

  return (
    <>
      {/* Helsida: logotyp överst, all övrig information samlad under */}
      <main className="grid min-h-svh grid-rows-[1fr_auto] bg-white px-5 print:hidden">
        <header className="flex flex-col items-center justify-center py-10 text-center">
          {/* TODO: Ersätt textloggan med en riktig logotyp (t.ex. next/image med SVG) */}
          <h1 className="text-[clamp(4.5rem,20vw,9rem)] leading-none tracking-tighter">
            {site.name}
          </h1>
          <p className="mt-[0.9em] text-[clamp(10px,2.2vw,13px)] uppercase tracking-[0.2em]">
            {site.tagline}
          </p>
        </header>

        <div className="mx-auto w-full max-w-sm pb-10 text-center">
          {/* Namn och titel */}
          <h2 className="text-2xl tracking-tight">
            {contactCard.firstName} {contactCard.lastName}
          </h2>
          <p className={`mt-1 text-neutral-600 ${small}`}>
            {contactCard.title}, {contactCard.organization}
          </p>

          {/* Kontaktknappar och Spara kontakt (vCard) */}
          <ul className="mt-6 grid grid-cols-3 gap-2">
            {contactButtons.map((button) => (
              <li key={button.label}>
                <a href={button.href} className={`${buttonBase} ${outline}`}>
                  {button.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="/kontakt.vcf" className={`${buttonBase} ${solid} mt-2`}>
            Spara kontakt
          </a>

          {/* Sociala länkar */}
          <nav aria-label="Länkar" className="mt-6">
            <ul className={`flex justify-center gap-6 ${small}`}>
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="underline-offset-4 hover:underline">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* QR-koder */}
          <h2 className="sr-only">QR-koder</h2>
          <ul className="mt-6 flex justify-center gap-6">
            {codes.map((code) => (
              <li key={code.type}>
                <figure className="flex w-14 flex-col items-center">
                  <QrImage svg={code.svg} label={code.description} />
                  <figcaption className="mt-2 text-[9px] uppercase tracking-[0.2em] text-neutral-600">
                    {code.label}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </main>

      {/* Utskrift: framsida */}
      <section aria-hidden="true" className={printCard}>
        <div className="text-center">
          <p className="text-[22cqw] font-bold leading-none tracking-tighter">{site.name}</p>
          <p className="mt-[2.5cqw] text-[2.6cqw] uppercase tracking-[0.2em]">{site.tagline}</p>
        </div>
      </section>

      {/* Utskrift: baksida med QR-koder */}
      <section aria-hidden="true" className={printCard}>
        <ul className="grid grid-cols-3 gap-[7cqw]">
          {codes.map((code) => (
            <li key={code.type}>
              <figure className="flex w-[21cqw] flex-col items-center">
                <QrImage svg={code.svg} label={code.description} />
                <figcaption className="mt-[2.5cqw] text-[2.6cqw] uppercase tracking-[0.2em]">
                  {code.label}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
