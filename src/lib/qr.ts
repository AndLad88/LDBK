import QRCode from "qrcode";
import { contactCard, site } from "@/data/content";

export type QrType =
  | "website"
  | "projects"
  | "contact"
  | "linkedin"
  | "instagram"
  | "call"
  | "email"
  | "sms";

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
  /** Om koden ska tryckas på visitkortets baksida (annars bara på webbsidan). */
  onCard: boolean;
};

/** Vad varje QR-kod innehåller och hur den beskrivs. Ordningen styr visningen. */
export const qrCodes: Record<QrType, QrCode> = {
  website: {
    label: "Website",
    description: "QR code that opens ldbk.se",
    href: "/",
    data: () => site.url,
    onCard: true,
  },
  projects: {
    label: "Projects",
    description: "QR code that opens LDBK projects",
    // [PLATSHÅLLARE] Sidan /projects är en platshållare tills projekten finns
    href: "/projects",
    data: () => `${site.url}/projects`,
    onCard: false,
  },
  contact: {
    label: "Contact",
    description: "QR code that saves the contact details to your phone",
    href: "/contact.vcf",
    data: buildVCard,
    onCard: true,
  },
  linkedin: {
    label: "LinkedIn",
    description: "QR code that opens LinkedIn",
    href: "/linkedin",
    // Pekar på egen domän som vidarebefordrar (se next.config.ts)
    data: () => `${site.url}/linkedin`,
    onCard: true,
  },
  instagram: {
    label: "Instagram",
    description: "QR code that opens LDBK on Instagram",
    href: "/instagram",
    // Pekar på egen domän som vidarebefordrar (se next.config.ts)
    data: () => `${site.url}/instagram`,
    onCard: true,
  },
  call: {
    label: "Call",
    description: "QR code that calls LDBK",
    href: `tel:${contactCard.phone}`,
    data: () => `tel:${contactCard.phone}`,
    onCard: false,
  },
  email: {
    label: "Email",
    description: "QR code that starts an email to LDBK",
    href: `mailto:${contactCard.email}`,
    data: () => `mailto:${contactCard.email}`,
    onCard: false,
  },
  sms: {
    label: "SMS",
    description: "QR code that starts a text message to LDBK",
    href: `sms:${contactCard.phone}`,
    // SMSTO-formatet förstås av både iPhone och Android
    data: () => `SMSTO:${contactCard.phone}:`,
    onCard: false,
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
