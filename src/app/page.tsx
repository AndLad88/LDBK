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
  const actionCodes = codes.filter((code) => !code.onCard);

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
          {/* QR-koder: länkar överst, ring/mejla/sms under */}
          <h2 className="sr-only">QR-koder</h2>
          {[cardCodes, actionCodes].map((row, i) => (
            <ul key={i} className={`flex justify-center gap-5 ${i > 0 ? "mt-4" : ""}`}>
              {row.map((code) => (
                <li key={code.type}>
                  <figure className="flex w-14 flex-col items-center">
                    <QrImage svg={code.svg} label={code.description} />
                    <figcaption className="mt-2 text-[9px] uppercase tracking-[0.2em]">
                      <a
                        href={code.href}
                        className="underline decoration-neutral-400 underline-offset-4 hover:decoration-black"
                      >
                        {code.label}
                      </a>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          ))}
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
