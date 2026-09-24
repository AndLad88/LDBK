import type { CSSProperties } from "react";
import { site } from "@/data/content";
import { qrCodes, qrSvg, qrTypes } from "@/lib/qr";

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

        <div className="-mx-4 mt-8 self-stretch sm:mx-0 sm:mt-10 sm:self-auto sm:w-full wide:mt-[6svh]">
          {/* QR-koder på en rad: en kolumn per kod (antalet styrs av lib/qr.ts) */}
          <h2 className="sr-only">QR codes</h2>
          <ul
            style={{ "--cols": codes.length } as CSSProperties}
            className="mx-auto grid w-full max-w-md grid-cols-[repeat(var(--cols),minmax(0,1fr))] gap-x-1.5 sm:w-fit sm:max-w-none sm:grid-cols-[repeat(var(--cols),auto)] sm:gap-x-5 wide:gap-x-[2.6svh]"
          >
            {codes.map((code) => (
              <li key={code.type}>
                <figure className="flex flex-col items-center">
                  <div className="w-full max-w-9 sm:w-12 sm:max-w-none wide:w-[7svh]">
                    <QrImage svg={code.svg} label={code.description} />
                  </div>
                  <figcaption className="mt-2 whitespace-nowrap text-[7px] uppercase tracking-[-0.03em] sm:text-[9px] sm:tracking-[0.2em] wide:mt-[1.2svh] wide:text-[max(9px,1.05svh)]">
                    <a
                      href={code.href}
                      className="transition-opacity duration-200 hover:opacity-50"
                    >
                      {code.label}
                    </a>
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
          <p className="mt-[2.5cqw] whitespace-nowrap text-[2.1cqw] uppercase tracking-[0.12em]">{site.tagline}</p>
        </div>
      </section>

      {/* Utskrift: baksida med QR-koder */}
      <section aria-hidden="true" className={printCard}>
        <ul className="grid grid-cols-4 gap-[4cqw]">
          {cardCodes.map((code) => (
            <li key={code.type}>
              <figure className="flex w-[17cqw] flex-col items-center">
                <QrImage svg={code.svg} label={code.description} />
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
