"use server";

import { cookies } from "next/headers";
import { LOCALE_COOKIE, locales, type Locale } from "@/lib/i18n-config";

/** Sparar valt språk i en cookie (ett år). Sidan renderas om automatiskt. */
export async function setLocale(locale: Locale) {
  if (!(locales as readonly string[]).includes(locale)) return;
  (await cookies()).set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
}
