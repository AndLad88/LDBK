"use client";

import { useState, type FormEvent } from "react";
import {
  contactLimits,
  normalizeContactData,
  validateContact,
  type ContactFormData,
  type ContactFormErrors,
} from "@/lib/contact";
import { Button } from "./Button";

type Status = "idle" | "submitting" | "success" | "error";

const fields: {
  name: keyof ContactFormData;
  label: string;
  type: string;
  autoComplete: string;
  required: boolean;
}[] = [
  { name: "name", label: "Namn", type: "text", autoComplete: "name", required: true },
  { name: "email", label: "E-post", type: "email", autoComplete: "email", required: true },
  { name: "phone", label: "Telefon", type: "tel", autoComplete: "tel", required: false },
];

/** Kontaktformulär med validering på klientsidan. Skickar till /api/contact. */
export function ContactForm() {
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = normalizeContactData(Object.fromEntries(formData));
    const validationErrors = validateContact(data);
    setErrors(validationErrors);

    // Flytta fokus till första felaktiga fält
    const firstInvalid = Object.keys(validationErrors)[0];
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    setServerMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, company: formData.get("company") }),
      });
      const json = (await res.json()) as { ok: boolean; message?: string; errors?: ContactFormErrors };
      if (!res.ok || !json.ok) {
        setErrors(json.errors ?? {});
        setServerMessage(json.message ?? "Något gick fel. Försök igen.");
        setStatus("error");
        return;
      }
      form.reset();
      setStatus("success");
    } catch {
      setServerMessage("Kunde inte skicka meddelandet. Kontrollera din anslutning och försök igen.");
      setStatus("error");
    }
  }

  const inputClass = (hasError: boolean) =>
    `mt-2 block w-full border bg-white px-4 py-3 text-black placeholder:text-neutral-400 focus:outline-2 focus:outline-offset-2 focus:outline-black ${
      hasError ? "border-black border-2" : "border-neutral-400 focus:border-black"
    }`;

  if (status === "success") {
    return (
      <div role="status" className="border border-black p-8 sm:p-10">
        <h2 className="text-2xl">Tack för ditt meddelande!</h2>
        <p className="mt-4 text-neutral-700">Vi återkommer så snart vi kan, normalt inom en arbetsdag.</p>
        <Button variant="outline" className="mt-8" onClick={() => setStatus("idle")}>
          Skicka ett nytt meddelande
        </Button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-6" aria-describedby="obligatoriska">
      <p id="obligatoriska" className="text-sm text-neutral-600">
        Fält markerade med * är obligatoriska.
      </p>

      {fields.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name} className="text-sm font-bold">
            {field.label}
            {field.required && <span aria-hidden="true"> *</span>}
          </label>
          <input
            id={field.name}
            name={field.name}
            type={field.type}
            autoComplete={field.autoComplete}
            required={field.required}
            maxLength={contactLimits[field.name]}
            aria-invalid={errors[field.name] ? true : undefined}
            aria-describedby={errors[field.name] ? `${field.name}-fel` : undefined}
            className={inputClass(Boolean(errors[field.name]))}
          />
          {errors[field.name] && (
            <p id={`${field.name}-fel`} className="mt-2 text-sm font-bold">
              {errors[field.name]}
            </p>
          )}
        </div>
      ))}

      <div>
        <label htmlFor="message" className="text-sm font-bold">
          Meddelande<span aria-hidden="true"> *</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          maxLength={contactLimits.message}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-fel" : undefined}
          className={`${inputClass(Boolean(errors.message))} resize-y`}
        />
        {errors.message && (
          <p id="message-fel" className="mt-2 text-sm font-bold">
            {errors.message}
          </p>
        )}
      </div>

      {/* Honungsfälla – dold för besökare, fångar spambotar */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Företag</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div aria-live="polite">
        {status === "error" && serverMessage && (
          <p role="alert" className="border-l-4 border-black py-2 pl-4 font-bold">
            {serverMessage}
          </p>
        )}
      </div>

      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Skickar…" : "Skicka meddelande"}
      </Button>
    </form>
  );
}
