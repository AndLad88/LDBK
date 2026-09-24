import { buildVCard } from "@/lib/qr";

export const dynamic = "force-static";

/** Kontaktfil för knappen "Spara kontakt" – öppnas direkt i telefonens kontakter. */
export function GET() {
  return new Response(buildVCard(), {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="andreas-ladeborn.vcf"',
    },
  });
}
