import { qrSvg, qrTypes, type QrType } from "@/lib/qr";

/**
 * Nedladdningsbara QR-koder som SVG (vektor – bäst för tryck):
 * /qr/webb, /qr/kontakt och /qr/instagram
 */
export function generateStaticParams() {
  return qrTypes.map((type) => ({ type }));
}

export const dynamicParams = false;

export async function GET(_request: Request, { params }: RouteContext<"/qr/[type]">) {
  const { type } = await params;
  const svg = await qrSvg(type as QrType);
  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Content-Disposition": `inline; filename="ldbk-qr-${type}.svg"`,
    },
  });
}
