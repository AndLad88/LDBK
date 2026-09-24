/**
 * Redigerbart innehåll för landningssidan/visitkortet.
 * Ändra uppgifterna här – komponenterna behöver inte röras.
 *
 * Text markerad med [PLATSHÅLLARE] ska bytas ut mot riktigt innehåll.
 */

export const site = {
  name: "LDBK",
  // Visas under logotypen på visitkortets framsida
  tagline: "Construction and building design solutions",
  url: "https://ldbk.se",
  description:
    "[PLATSHÅLLARE] LDBK – construction and building design solutions.",
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
 * Instagram-QR-koden pekar på ldbk.se/instagram, som vidarebefordras hit
 * (se next.config.ts). Därför kan länken ändras utan att visitkorten
 * behöver tryckas om.
 */
export const social = {
  // TODO: [PLATSHÅLLARE] Byt till er riktiga Instagram-adress.
  instagram: "https://www.instagram.com/ldbk/",
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
