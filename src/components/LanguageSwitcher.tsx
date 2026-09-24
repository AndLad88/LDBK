"use client";

import { useEffect, useId, useRef, useState, useTransition } from "react";
import { setLocale } from "@/app/actions";
import { localeNames, locales, type Locale } from "@/lib/i18n-config";

/**
 * Språkväljare uppe till höger som rullgardinsmeny. Knappen visar aktuellt
 * språk; listan visar språknamnen på respektive språk. Valet sparas i en
 * cookie via en serverfunktion. Stängs med Esc eller klick utanför.
 */
export function LanguageSwitcher({ current, label }: { current: Locale; label: string }) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listId = useId();

  // Stäng vid klick utanför eller Esc
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function choose(locale: Locale) {
    setOpen(false);
    if (locale !== current) startTransition(() => setLocale(locale));
  }

  return (
    <div
      ref={rootRef}
      className={`absolute right-4 top-4 z-50 text-xs sm:right-6 sm:top-5 print:hidden ${pending ? "opacity-60" : ""}`}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-label={`${label}: ${localeNames[current]}`}
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 uppercase tracking-[0.1em] transition-opacity duration-200 hover:opacity-60"
      >
        {current}
        <svg
          aria-hidden="true"
          viewBox="0 0 10 6"
          className={`h-1.5 w-2.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>

      <ul
        id={listId}
        hidden={!open}
        className="absolute right-0 mt-2 min-w-36 border border-black bg-white py-1 text-left"
      >
        {locales.map((locale) => (
          <li key={locale}>
            <button
              type="button"
              lang={locale}
              aria-current={locale === current ? "true" : undefined}
              onClick={() => choose(locale)}
              className="flex w-full items-center justify-between gap-4 px-3 py-2 text-left transition-colors duration-150 hover:bg-black hover:text-white aria-[current=true]:underline aria-[current=true]:underline-offset-4"
            >
              <span>{localeNames[locale]}</span>
              <span className="uppercase text-neutral-400">{locale}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
