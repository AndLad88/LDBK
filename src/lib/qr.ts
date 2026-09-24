import QRCode from "qrcode";
import { contactCard, site } from "@/data/content";

export type QrType =
  | "website"
  | "projects"
  | "contact"
  | "about"
  | "content"
  | "billing";

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
  /**
   * QR-kodens färg på webbsidan. Välj mörka, mättade färger – QR-koder
   * behöver hög kontrast mot vitt för att kunna skannas.
   */
  color: string;
};

/** Vad varje QR-kod innehåller och hur den beskrivs. Ordningen styr visningen. */
export const qrCodes: Record<QrType, QrCode> = {
  website: {
    label: "Website",
    description: "QR code that opens ldbk.se",
    href: "/",
    data: () => site.url,
    onCard: true,
    color: "#0e7490", // petrol
  },
  about: {
    label: "About",
    description: "QR code that opens About LDBK",
    // [PLATSHÅLLARE] Sidan /about är en platshållare tills texten finns
    href: "/about",
    data: () => `${site.url}/about`,
    onCard: true,
    color: "#0a66c2", // blå
  },
  contact: {
    label: "Contact",
    description: "QR code that opens contact options: call, email, SMS and save contact",
    // Kontaktsidan samlar ring, mejla, sms och spara kontakt (vCard)
    href: "/contact",
    data: () => `${site.url}/contact`,
    onCard: true,
    color: "#334155", // skiffergrå
  },
  projects: {
    label: "Projects",
    description: "QR code that opens LDBK projects",
    // [PLATSHÅLLARE] Sidan /projects är en platshållare tills projekten finns
    href: "/projects",
    data: () => `${site.url}/projects`,
    onCard: false,
    color: "#b45309", // bärnsten
  },
  content: {
    label: "Content",
    description: "QR code that opens LDBK content",
    href: "/content",
    // Pekar på egen domän som vidarebefordrar (se next.config.ts)
    data: () => `${site.url}/content`,
    onCard: true,
    color: "#c13584", // magenta
  },
  billing: {
    label: "Billing",
    description: "QR code that opens LDBK billing details",
    href: "/billing",
    data: () => `${site.url}/billing`,
    onCard: false,
    color: "#15803d", // grön
  },
};

export const qrTypes = Object.keys(qrCodes) as QrType[];

/** Gemensam QR-version för alla koder. */
const QR_VERSION = 3;

/** Skapar QR-koden som SVG – i kodens färg på transparent, utan marginal. */
export function qrSvg(type: QrType, { mono = false }: { mono?: boolean } = {}) {
  return QRCode.toString(qrCodes[type].data(), {
    type: "svg",
    margin: 0,
    errorCorrectionLevel: "M",
    // Samma version (29 × 29 rutor) för alla koder så att de ser likadana ut.
    // Version 3 rymmer upp till 42 tecken – räcker för alla adresser ovan.
    version: QR_VERSION,
    // mono: svart kod, t.ex. för det tryckta visitkortet
    color: { dark: mono ? "#000000" : qrCodes[type].color, light: "#ffffff00" },
  });
}
