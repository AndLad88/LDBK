import { normalizeContactData, validateContact } from "@/lib/contact";

/**
 * Tar emot kontaktformuläret, validerar och loggar innehållet.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, message: "Ogiltig förfrågan." }, { status: 400 });
  }

  // Enkel honungsfälla mot spambotar: fältet är dolt för människor
  if (typeof body === "object" && body !== null && (body as Record<string, unknown>).company) {
    return Response.json({ ok: true });
  }

  const data = normalizeContactData(body);
  const errors = validateContact(data);

  if (Object.keys(errors).length > 0) {
    return Response.json(
      { ok: false, message: "Kontrollera de markerade fälten.", errors },
      { status: 422 },
    );
  }

  console.info("[kontakt] Nytt meddelande", {
    name: data.name,
    email: data.email,
    phone: data.phone || "–",
    message: data.message,
    receivedAt: new Date().toISOString(),
  });

  // TODO: Koppla in en e-posttjänst, t.ex. Resend (https://resend.com):
  //   1. npm install resend
  //   2. Lägg till RESEND_API_KEY som miljövariabel (lokalt i .env.local och i Vercel)
  //   3. Skicka mejlet här:
  //      const resend = new Resend(process.env.RESEND_API_KEY);
  //      await resend.emails.send({
  //        from: "LDBK <noreply@ldbk.se>",
  //        to: contact.email,
  //        replyTo: data.email,
  //        subject: `Ny förfrågan från ${data.name}`,
  //        text: `${data.message}\n\nTelefon: ${data.phone || "–"}`,
  //      });

  return Response.json({ ok: true });
}
