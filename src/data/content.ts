/**
 * Redigerbart innehåll för landningssidan/visitkortet.
 * Ändra uppgifterna här – komponenterna behöver inte röras.
 *
 * Text markerad med [PLATSHÅLLARE] ska bytas ut mot riktigt innehåll.
 */

export const site = {
  name: "LDBK",
  // Visas under logotypen på visitkortets framsida
  tagline: "Construction and design solutions",
  url: "https://ldbk.se",
  description:
    "[PLATSHÅLLARE] LDBK – projektledning, byggledning, konstruktion och renovering.",
};

/** Kontaktuppgifter som sparas i telefonen när kontakt-QR-koden skannas. */
export const contactCard = {
  firstName: "Andreas",
  lastName: "Ladeborn",
  title: "VD",
  organization: "LDBK",
  // Internationellt format fungerar även för utländska telefoner.
  phone: "+46704827517",
  email: "al@ldbk.se",
  website: "https://ldbk.se",
};

/**
 * QR-koderna pekar på ldbk.se/instagram och ldbk.se/linkedin, som
 * vidarebefordras hit (se next.config.ts). Därför kan länkarna ändras
 * utan att visitkorten behöver tryckas om.
 */
export const social = {
  // TODO: [PLATSHÅLLARE] Byt till er riktiga Instagram-adress.
  instagram: "https://www.instagram.com/ldbk/",
  // TODO: [PLATSHÅLLARE] Byt till din riktiga LinkedIn-profil.
  linkedin: "https://www.linkedin.com/in/andreas-ladeborn",
};
