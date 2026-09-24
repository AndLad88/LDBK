"use client";

import { useTransition } from "react";
import { setLocale } from "@/app/actions";
import { localeNames, locales, type Locale } from "@/lib/i18n-config";

/** Språkväljare uppe till höger. Sparar valet i en cookie via en serverfunktion. */
export function LanguageSwitcher({ current, label }: { current: Locale; label: string }) {
  const [pending, startTransition] = useTransition();

  function choose(locale: Locale) {
    if (locale === current) return;
    startTransition(() => setLocale(locale));
  }

  return (
    <nav
      aria-label={label}
      className={`absolute right-4 top-4 z-50 sm:right-6 sm:top-5 print:hidden ${pending ? "opacity-60" : ""}`}
    >
      <ul className="flex gap-2.5 text-[11px] uppercase tracking-[0.1em] sm:gap-3 sm:text-xs">
        {locales.map((locale) => (
          <li key={locale}>
            <button
              type="button"
              lang={locale}
              title={localeNames[locale]}
              aria-label={localeNames[locale]}
              aria-current={locale === current ? "true" : undefined}
              onClick={() => choose(locale)}
              className="uppercase text-neutral-400 transition-colors duration-200 hover:text-black aria-[current=true]:text-black aria-[current=true]:underline aria-[current=true]:underline-offset-4"
            >
              {locale}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
