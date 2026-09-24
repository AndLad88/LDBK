/**
 * Språkinställningar som delas mellan server och klient (språkväljaren).
 * Själva översättningarna finns i i18n.ts.
 */

export const locales = ["en", "de", "fr", "es", "it", "sv"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const LOCALE_COOKIE = "lang";

/** Språkens namn på respektive språk (visas för skärmläsare och som tooltip). */
export const localeNames: Record<Locale, string> = {
  sv: "Svenska",
  en: "English",
  de: "Deutsch",
  fr: "Français",
  es: "Español",
  it: "Italiano",
};
