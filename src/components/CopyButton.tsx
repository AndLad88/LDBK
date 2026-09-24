"use client";

import { useState } from "react";

/** Kopierar ett värde till urklipp och visar en kort bekräftelse. */
export function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    let ok = false;
    try {
      await navigator.clipboard.writeText(value);
      ok = true;
    } catch {
      // Reserv för webbläsare där Clipboard API är blockerat
      const field = document.createElement("textarea");
      field.value = value;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      ok = document.execCommand("copy");
      field.remove();
    }
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy ${label}`}
      className="shrink-0 border border-neutral-300 px-2 py-1 text-[10px] uppercase tracking-[0.15em] text-neutral-600 transition-colors duration-200 hover:border-black hover:text-black"
    >
      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}
