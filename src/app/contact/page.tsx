import type { Metadata } from "next";
import { SubPage } from "@/components/SubPage";
import { contactCard, site } from "@/data/content";
import { getDictionary } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getDictionary();
  return {
    title: `${t.qr.contact} | ${site.name}`,
    description: t.contact.description,
    alternates: { canonical: "/contact" },
  };
}

const button =
  "flex w-full items-center justify-between border border-black px-5 py-4 text-left text-sm uppercase tracking-[0.15em] transition-colors duration-200 hover:bg-black hover:text-white";

/** Kontaktsidan: ring, mejla, sms och spara kontakt (vCard). Contact-QR-koden leder hit. */
export default async function ContactPage() {
  const { t } = await getDictionary();
  const actions = [
    { label: t.contact.call, detail: contactCard.phoneDisplay, href: `tel:${contactCard.phone}` },
    { label: t.contact.email, detail: contactCard.email, href: `mailto:${contactCard.email}` },
    { label: t.contact.sms, detail: contactCard.phoneDisplay, href: `sms:${contactCard.phone}` },
  ];

  return (
    <SubPage title={t.qr.contact}>
      <ul className="mt-10 w-full max-w-sm space-y-3">
        {actions.map((action) => (
          <li key={action.href}>
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
            {t.contact.saveContact}
          </a>
        </li>
      </ul>
    </SubPage>
  );
}
