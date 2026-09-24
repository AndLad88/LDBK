import type { CSSProperties } from "react";
import { site } from "@/data/content";
import { qrCodes, qrSvg, qrTypes } from "@/lib/qr";

/**
 * Tryckbart visitkort: liggande 85 × 55 mm. Visas bara vid utskrift, där
 * varje kort blir en egen sida i exakt visitkortsstorlek (se @page i globals.css).
 */
const printCard =
  "@container hidden h-[55mm] w-[85mm] items-center justify-center bg-white break-after-page print:flex";

/**
 * QR-kod som inline-SVG. SVG:n genereras av oss själva i lib/qr.ts.
 * Utan label döljs den för skärmläsare (t.ex. när länktexten redan beskriver den).
 */
function QrImage({ svg, label }: { svg: string; label?: string }) {
  return (
    <div
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className="w-full [&>svg]:block [&>svg]:h-auto [&>svg]:w-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

export default async function HomePage() {
  const codes = await Promise.all(
    qrTypes.map(async (type) => ({
      type,
      svg: await qrSvg(type),
      // Svart variant till det tryckta visitkortet
      monoSvg: await qrSvg(type, { mono: true }),
      ...qrCodes[type],
    })),
  );
  const cardCodes = codes.filter((code) => code.onCard);

  return (
    <>
      {/* Helsida: logotyp, tagline och QR-koder samlade mitt på sidan */}
      <main className="flex min-h-svh flex-col items-center justify-center bg-white px-5 py-10 print:hidden">
        <header className="text-center">
          {/* TODO: Ersätt textloggan med en riktig logotyp (t.ex. next/image med SVG) */}
          <h1 className="text-[clamp(4.5rem,20vw,9rem)] leading-none tracking-tighter wide:text-[min(22svh,16vw)]">
            {site.name}
          </h1>
          <p className="mt-[0.9em] text-[clamp(10px,2.2vw,13px)] uppercase tracking-[0.04em] sm:tracking-[0.2em] wide:mt-[2.2svh] wide:text-[max(12px,1.6svh)]">
            {site.tagline}
          </p>
        </header>

        <div className="-mx-4 mt-6 self-stretch sm:mx-0 sm:mt-8 sm:self-auto sm:w-full wide:mt-[4.5svh]">
          {/* QR-koder på en rad: en kolumn per kod (antalet styrs av lib/qr.ts) */}
          <h2 className="sr-only">QR codes</h2>
          <ul
            style={{ "--cols": codes.length } as CSSProperties}
            className="mx-auto grid w-full max-w-md grid-cols-[repeat(var(--cols),minmax(0,1fr))] gap-x-1.5 sm:w-fit sm:max-w-none sm:grid-cols-[repeat(var(--cols),auto)] sm:gap-x-5 wide:gap-x-[2.6svh]"
          >
            {codes.map((code) => (
              <li key={code.type}>
                {/* Hela koden + texten är en länk. Vid hover växer koden och
                    texten får kodens färg (--qr). */}
                <a
                  href={code.href}
                  title={code.description}
                  style={{ "--qr": code.color } as CSSProperties}
                  className="group flex flex-col items-center outline-offset-4"
                >
                  <div className="w-full max-w-9 transition-transform duration-300 ease-out group-hover:scale-110 group-focus-visible:scale-110 sm:w-12 sm:max-w-none wide:w-[7svh]">
                    <QrImage svg={code.svg} />
                  </div>
                  <span className="mt-2 whitespace-nowrap text-[7px] uppercase tracking-[-0.03em] transition-colors duration-300 group-hover:text-(--qr) group-focus-visible:text-(--qr) sm:text-[9px] sm:tracking-[0.2em] wide:mt-[1.2svh] wide:text-[max(9px,1.05svh)]">
                    {code.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </main>

      {/* Utskrift: framsida */}
      <section aria-hidden="true" className={printCard}>
        <div className="text-center">
          <p className="text-[22cqw] font-bold leading-none tracking-tighter">{site.name}</p>
          <p className="mt-[2.5cqw] whitespace-nowrap text-[2.1cqw] uppercase tracking-[0.12em]">{site.tagline}</p>
        </div>
      </section>

      {/* Utskrift: baksida med QR-koder */}
      <section aria-hidden="true" className={printCard}>
        <ul className="grid grid-cols-4 gap-[4cqw]">
          {cardCodes.map((code) => (
            <li key={code.type}>
              <figure className="flex w-[17cqw] flex-col items-center">
                <QrImage svg={code.monoSvg} label={code.description} />
                <figcaption className="mt-[2.5cqw] text-[2.2cqw] uppercase tracking-[0.15em]">
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
