import { qrSvg, qrTypes, type QrType } from "@/lib/qr";

/**
 * Nedladdningsbara QR-koder som SVG (vektor – bäst för tryck):
 * /qr/website, /qr/about, /qr/contact, /qr/projects, /qr/content and /qr/billing
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
