import { site } from "@/data/content";
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

export default async function HomePage() {
  const codes = await Promise.all(
    qrTypes.map(async (type) => ({ type, svg: await qrSvg(type), ...qrCodes[type] })),
  );

  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-8 bg-neutral-100 p-5 sm:gap-12 sm:p-8 lg:flex-row print:block print:bg-white print:p-0">
      {/* Framsida */}
      <section aria-label="Visitkort, framsida" className={card}>
        {/* TODO: Ersätt textloggan med en riktig logotyp (t.ex. next/image med SVG) */}
        <div className="text-center">
          <h1 className="text-[22cqw] leading-none tracking-tighter">{site.name}</h1>
          <p className="mt-[2cqw] text-[3.4cqw] tracking-wide">{site.tagline}</p>
        </div>
      </section>

      {/* Baksida med QR-koder */}
      <section aria-labelledby="qr-rubrik" className={card}>
        <h2 id="qr-rubrik" className="sr-only">
          QR-koder
        </h2>
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
    </main>
  );
}
