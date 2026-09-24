import { cookies, headers } from "next/headers";
import { defaultLocale, LOCALE_COOKIE, locales, type Locale } from "@/lib/i18n-config";
import type { QrType } from "@/lib/qr";

export type { Locale };

/**
 * Översättningar för webbplatsen. Språket väljs med språkväljaren uppe till
 * höger och sparas i cookien "lang". Vid första besöket används webbläsarens
 * språk (Accept-Language), annars engelska.
 *
 * Lägg till eller ändra texter här – komponenterna hämtar dem via getDictionary().
 */


type Dictionary = {
  tagline: string;
  language: string;
  qrCodes: string;
  /** Prefix för QR-kodernas beskrivning för skärmläsare, t.ex. "QR code: Contact". */
  qrCode: string;
  qr: Record<QrType, string>;
  comingSoon: string;
  back: string;
  contact: { call: string; email: string; sms: string; saveContact: string; description: string };
  billing: {
    title: string;
    description: string;
    company: string;
    address: string;
    regNo: string;
    vat: string;
    bankgiro: string;
    plusgiro: string;
    iban: string;
    bic: string;
    notice: string;
    copy: string;
    copied: string;
  };
  notFound: { title: string; home: string };
};

const dictionaries: Record<Locale, Dictionary> = {
  en: {
    tagline: "Construction and building design solutions",
    language: "Language",
    qrCodes: "QR codes",
    qrCode: "QR code",
    qr: {
      website: "Website",
      about: "About",
      contact: "Contact",
      projects: "Projects",
      content: "Content",
      billing: "Billing",
    },
    comingSoon: "Coming soon",
    back: "Back",
    contact: {
      call: "Call",
      email: "Email",
      sms: "SMS",
      saveContact: "Save contact",
      description: "Call, email or text LDBK, or save the contact to your phone.",
    },
    billing: {
      title: "Billing",
      description: "Billing and payment details for LDBK.",
      company: "Company",
      address: "Billing address",
      regNo: "Company reg. no.",
      vat: "VAT no.",
      bankgiro: "Bankgiro",
      plusgiro: "Plusgiro",
      iban: "IBAN",
      bic: "BIC",
      notice: "Payment details are always stated on our invoices. Contact us if anything differs.",
      copy: "Copy",
      copied: "Copied",
    },
    notFound: { title: "Page not found.", home: "Back to home" },
  },
  sv: {
    tagline: "Lösningar inom bygg och byggnadsdesign",
    language: "Språk",
    qrCodes: "QR-koder",
    qrCode: "QR-kod",
    qr: {
      website: "Webbplats",
      about: "Om oss",
      contact: "Kontakt",
      projects: "Projekt",
      content: "Innehåll",
      billing: "Fakturering",
    },
    comingSoon: "Kommer snart",
    back: "Tillbaka",
    contact: {
      call: "Ring",
      email: "E-post",
      sms: "SMS",
      saveContact: "Spara kontakt",
      description: "Ring, mejla eller sms:a LDBK, eller spara kontakten i telefonen.",
    },
    billing: {
      title: "Fakturering",
      description: "Fakturerings- och betalningsuppgifter för LDBK.",
      company: "Företag",
      address: "Fakturaadress",
      regNo: "Organisationsnummer",
      vat: "Momsreg.nr",
      bankgiro: "Bankgiro",
      plusgiro: "Plusgiro",
      iban: "IBAN",
      bic: "BIC",
      notice: "Betalningsuppgifter anges alltid på våra fakturor. Kontakta oss om något skiljer sig.",
      copy: "Kopiera",
      copied: "Kopierat",
    },
    notFound: { title: "Sidan kunde inte hittas.", home: "Till startsidan" },
  },
  de: {
    tagline: "Lösungen für Bau und Gebäudeplanung",
    language: "Sprache",
    qrCodes: "QR-Codes",
    qrCode: "QR-Code",
    qr: {
      website: "Website",
      about: "Über uns",
      contact: "Kontakt",
      projects: "Projekte",
      content: "Inhalte",
      billing: "Rechnung",
    },
    comingSoon: "Demnächst",
    back: "Zurück",
    contact: {
      call: "Anrufen",
      email: "E-Mail",
      sms: "SMS",
      saveContact: "Kontakt speichern",
      description: "LDBK anrufen, per E-Mail oder SMS kontaktieren oder den Kontakt speichern.",
    },
    billing: {
      title: "Rechnung",
      description: "Rechnungs- und Zahlungsdaten von LDBK.",
      company: "Firma",
      address: "Rechnungsadresse",
      regNo: "Registernummer",
      vat: "USt-IdNr.",
      bankgiro: "Bankgiro",
      plusgiro: "Plusgiro",
      iban: "IBAN",
      bic: "BIC",
      notice: "Zahlungsdaten stehen immer auf unseren Rechnungen. Kontaktieren Sie uns bei Abweichungen.",
      copy: "Kopieren",
      copied: "Kopiert",
    },
    notFound: { title: "Seite nicht gefunden.", home: "Zur Startseite" },
  },
  fr: {
    tagline: "Solutions en construction et conception de bâtiments",
    language: "Langue",
    qrCodes: "Codes QR",
    qrCode: "Code QR",
    qr: {
      website: "Site web",
      about: "À propos",
      contact: "Contact",
      projects: "Projets",
      content: "Contenu",
      billing: "Facturation",
    },
    comingSoon: "Bientôt disponible",
    back: "Retour",
    contact: {
      call: "Appeler",
      email: "E-mail",
      sms: "SMS",
      saveContact: "Enregistrer le contact",
      description: "Appelez LDBK, écrivez-nous par e-mail ou SMS, ou enregistrez le contact.",
    },
    billing: {
      title: "Facturation",
      description: "Coordonnées de facturation et de paiement de LDBK.",
      company: "Société",
      address: "Adresse de facturation",
      regNo: "N° d'immatriculation",
      vat: "N° de TVA",
      bankgiro: "Bankgiro",
      plusgiro: "Plusgiro",
      iban: "IBAN",
      bic: "BIC",
      notice:
        "Les coordonnées de paiement figurent toujours sur nos factures. Contactez-nous en cas de différence.",
      copy: "Copier",
      copied: "Copié",
    },
    notFound: { title: "Page introuvable.", home: "Retour à l'accueil" },
  },
  es: {
    tagline: "Soluciones de construcción y diseño de edificios",
    language: "Idioma",
    qrCodes: "Códigos QR",
    qrCode: "Código QR",
    qr: {
      website: "Sitio web",
      about: "Nosotros",
      contact: "Contacto",
      projects: "Proyectos",
      content: "Contenido",
      billing: "Facturación",
    },
    comingSoon: "Próximamente",
    back: "Volver",
    contact: {
      call: "Llamar",
      email: "Correo",
      sms: "SMS",
      saveContact: "Guardar contacto",
      description: "Llame, escriba o envíe un SMS a LDBK, o guarde el contacto en su teléfono.",
    },
    billing: {
      title: "Facturación",
      description: "Datos de facturación y pago de LDBK.",
      company: "Empresa",
      address: "Dirección de facturación",
      regNo: "N.º de registro",
      vat: "N.º de IVA",
      bankgiro: "Bankgiro",
      plusgiro: "Plusgiro",
      iban: "IBAN",
      bic: "BIC",
      notice: "Los datos de pago siempre figuran en nuestras facturas. Contáctenos si algo no coincide.",
      copy: "Copiar",
      copied: "Copiado",
    },
    notFound: { title: "Página no encontrada.", home: "Volver al inicio" },
  },
  it: {
    tagline: "Soluzioni per costruzione e progettazione edilizia",
    language: "Lingua",
    qrCodes: "Codici QR",
    qrCode: "Codice QR",
    qr: {
      website: "Sito web",
      about: "Chi siamo",
      contact: "Contatti",
      projects: "Progetti",
      content: "Contenuti",
      billing: "Fatturazione",
    },
    comingSoon: "Prossimamente",
    back: "Indietro",
    contact: {
      call: "Chiama",
      email: "E-mail",
      sms: "SMS",
      saveContact: "Salva contatto",
      description: "Chiama, scrivi o invia un SMS a LDBK, oppure salva il contatto.",
    },
    billing: {
      title: "Fatturazione",
      description: "Dati di fatturazione e pagamento di LDBK.",
      company: "Azienda",
      address: "Indirizzo di fatturazione",
      regNo: "Numero di registrazione",
      vat: "Partita IVA",
      bankgiro: "Bankgiro",
      plusgiro: "Plusgiro",
      iban: "IBAN",
      bic: "BIC",
      notice: "I dati di pagamento sono sempre indicati sulle nostre fatture. Contattateci in caso di differenze.",
      copy: "Copia",
      copied: "Copiato",
    },
    notFound: { title: "Pagina non trovata.", home: "Torna alla home" },
  },
};

const isLocale = (value: string | undefined): value is Locale =>
  !!value && (locales as readonly string[]).includes(value);

/** Aktuellt språk: cookie först, sedan webbläsarens språk, annars engelska. */
export async function getLocale(): Promise<Locale> {
  const fromCookie = (await cookies()).get(LOCALE_COOKIE)?.value;
  if (isLocale(fromCookie)) return fromCookie;

  const accept = (await headers()).get("accept-language") ?? "";
  for (const part of accept.split(",")) {
    const code = part.trim().slice(0, 2).toLowerCase();
    if (isLocale(code)) return code;
  }
  return defaultLocale;
}

/** Aktuellt språk och dess texter. */
export async function getDictionary() {
  const locale = await getLocale();
  return { locale, t: dictionaries[locale] };
}
