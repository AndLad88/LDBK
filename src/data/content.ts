/**
 * Redigerbart innehåll för landningssidan/visitkortet.
 * Ändra uppgifterna här – komponenterna behöver inte röras.
 * Översatta texter (tagline, etiketter m.m.) finns i src/lib/i18n.ts.
 *
 * Text markerad med [PLATSHÅLLARE] ska bytas ut mot riktigt innehåll.
 */

export const site = {
  name: "LDBK",
  url: "https://ldbk.se",
  // Tagline och övriga texter på alla språk finns i src/lib/i18n.ts
};

/** Kontaktuppgifter som sparas i telefonen när kontakt-QR-koden skannas. */
export const contactCard = {
  firstName: "Andreas",
  lastName: "Ladeborn",
  title: "CEO",
  organization: "LDBK",
  // Internationellt format fungerar även för utländska telefoner.
  phone: "+46704827517",
  // Så som numret visas på kontaktsidan
  phoneDisplay: "070 482 75 17",
  email: "al@ldbk.se",
  website: "https://ldbk.se",
};

/**
 * Content-QR-koden pekar på ldbk.se/content, som vidarebefordras hit
 * (se next.config.ts). Därför kan länken ändras utan att visitkorten
 * behöver tryckas om.
 */
export const social = {
  // Vart "Content" leder, t.ex. Instagram.
  // TODO: [PLATSHÅLLARE] Byt till er riktiga Instagram-adress.
  content: "https://www.instagram.com/ldbk/",
};

/**
 * Faktureringsuppgifter som visas på ldbk.se/billing.
 * Lämna ett fält tomt ("") för att dölja det på sidan (t.ex. plusgiro).
 */
export const billing = {
  // TODO: [PLATSHÅLLARE] Byt ut alla uppgifter nedan mot de riktiga.
  companyName: "LDBK AB",
  address: ["Street 1", "000 00 City", "Sweden"],
  orgNumber: "556000-0000",
  // I Sverige är momsregistreringsnummer och VAT-nr samma sak: SE + org.nr + 01
  vatNumber: "SE556000000001",
  bankgiro: "000-0000",
  plusgiro: "00 00 00-0",
  iban: "SE00 0000 0000 0000 0000 0000",
  bic: "XXXXSESS",
};
