import type { Metadata } from "next";
import { SubPage } from "@/components/SubPage";
import { contactCard, site } from "@/data/content";

export const metadata: Metadata = {
  title: `Contact | ${site.name}`,
  description: `Call, email or text ${site.name}, or save the contact to your phone.`,
  alternates: { canonical: "/contact" },
};

const button =
  "flex w-full items-center justify-between border border-black px-5 py-4 text-left text-sm uppercase tracking-[0.15em] transition-colors duration-200 hover:bg-black hover:text-white";

const actions = [
  { label: "Call", detail: contactCard.phoneDisplay, href: `tel:${contactCard.phone}` },
  { label: "Email", detail: contactCard.email, href: `mailto:${contactCard.email}` },
  { label: "SMS", detail: contactCard.phoneDisplay, href: `sms:${contactCard.phone}` },
];

/** Kontaktsidan: ring, mejla, sms och spara kontakt (vCard). Contact-QR-koden leder hit. */
export default function ContactPage() {
  return (
    <SubPage title="Contact">
      <ul className="mt-10 w-full max-w-sm space-y-3">
        {actions.map((action) => (
          <li key={action.label}>
            <a href={action.href} className={button}>
              <span>{action.label}</span>
              <span className="text-xs normal-case tracking-normal opacity-70">{action.detail}</span>
            </a>
          </li>
        ))}
        <li>
          <a
            href="/contact.vcf"
            className={`${button} justify-center bg-black text-white hover:bg-white hover:text-black`}
          >
            Save contact
          </a>
        </li>
      </ul>
    </SubPage>
  );
}
