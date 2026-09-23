/**
 * Delad validering för kontaktformuläret.
 * Används både i formuläret (klientsidan) och i API-routen (serversidan),
 * så att reglerna alltid är desamma.
 */

export type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

export const contactLimits = {
  name: 100,
  email: 200,
  phone: 30,
  message: 5000,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Tillåter siffror, mellanslag, bindestreck, parenteser och inledande +
const PHONE_PATTERN = /^\+?[\d\s\-()]{6,}$/;

/** Trimmar och normaliserar inkommande (okänd) data till formulärfält. */
export function normalizeContactData(input: unknown): ContactFormData {
  const data = (typeof input === "object" && input !== null ? input : {}) as Record<string, unknown>;
  const str = (value: unknown) => (typeof value === "string" ? value.trim() : "");
  return {
    name: str(data.name),
    email: str(data.email),
    phone: str(data.phone),
    message: str(data.message),
  };
}

/** Returnerar ett objekt med felmeddelanden – tomt om allt är giltigt. */
export function validateContact(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (data.name.length < 2) errors.name = "Ange ditt namn.";
  else if (data.name.length > contactLimits.name) errors.name = "Namnet är för långt.";

  if (!data.email) errors.email = "Ange din e-postadress.";
  else if (!EMAIL_PATTERN.test(data.email) || data.email.length > contactLimits.email)
    errors.email = "Ange en giltig e-postadress, t.ex. namn@exempel.se.";

  // Telefon är valfritt men måste vara giltigt om det fylls i
  if (data.phone && (!PHONE_PATTERN.test(data.phone) || data.phone.length > contactLimits.phone))
    errors.phone = "Ange ett giltigt telefonnummer.";

  if (data.message.length < 10) errors.message = "Skriv ett meddelande på minst 10 tecken.";
  else if (data.message.length > contactLimits.message) errors.message = "Meddelandet är för långt.";

  return errors;
}
