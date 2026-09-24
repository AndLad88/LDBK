import QRCode from "qrcode";
import { contactCard, site } from "@/data/content";

export type QrType = "hemsida" | "kontakt" | "linkedin" | "instagram";

/** Escapar tecken som har särskild betydelse i vCard-format. */
const vcardEscape = (value: string) => value.replace(/([\;,])/g, "\\$1");

/** Bygger ett vCard (3.0) som telefonen kan spara direkt som kontakt. */
export function buildVCard() {
  const c = contactCard;
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${vcardEscape(c.lastName)};${vcardEscape(c.firstName)};;;`,
    `FN:${vcardEscape(`${c.firstName} ${c.lastName}`)}`,
    `ORG:${vcardEscape(c.organization)}`,
    `TITLE:${vcardEscape(c.title)}`,
    `TEL;TYPE=CELL:${c.phone}`,
    `EMAIL;TYPE=INTERNET:${c.email}`,
    `URL:${c.website}`,
    "END:VCARD",
  ].join("\r\n");
}

type QrCode = {
  label: string;
  description: string;
  /** Vart etiketten under QR-koden länkar på webbsidan. */
  href: string;
  data: () => string;
};

/** Vad varje QR-kod innehåller och hur den beskrivs. Ordningen styr visningen. */
export const qrCodes: Record<QrType, QrCode> = {
  hemsida: {
    label: "Hemsida",
    description: "QR-kod som öppnar ldbk.se",
    href: "/",
    data: () => site.url,
  },
  kontakt: {
    label: "Kontakt",
    description: "QR-kod som sparar kontaktuppgifterna i telefonen",
    href: "/kontakt.vcf",
    data: buildVCard,
  },
  linkedin: {
    label: "LinkedIn",
    description: "QR-kod som öppnar LinkedIn",
    href: "/linkedin",
    // Pekar på egen domän som vidarebefordrar (se next.config.ts)
    data: () => `${site.url}/linkedin`,
  },
  instagram: {
    label: "Instagram",
    description: "QR-kod som öppnar LDBK på Instagram",
    href: "/instagram",
    // Pekar på egen domän som vidarebefordrar (se next.config.ts)
    data: () => `${site.url}/instagram`,
  },
};

export const qrTypes = Object.keys(qrCodes) as QrType[];

/** Skapar QR-koden som SVG – svart på transparent, utan marginal. */
export function qrSvg(type: QrType) {
  return QRCode.toString(qrCodes[type].data(), {
    type: "svg",
    margin: 0,
    errorCorrectionLevel: "M",
    color: { dark: "#000000", light: "#ffffff00" },
  });
}
