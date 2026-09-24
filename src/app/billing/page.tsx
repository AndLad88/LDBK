import type { Metadata } from "next";
import { CopyButton } from "@/components/CopyButton";
import { SubPage } from "@/components/SubPage";
import { billing, site } from "@/data/content";

export const metadata: Metadata = {
  title: `Billing | ${site.name}`,
  description: `Billing and payment details for ${site.name}.`,
  alternates: { canonical: "/billing" },
};

/** Faktureringsuppgifter: engelsk etikett, svensk term i liten text under. */
const rows = [
  { label: "Company", sv: "Företag", value: billing.companyName },
  { label: "Billing address", sv: "Faktureringsadress", value: billing.address.join("\n") },
  { label: "Company reg. no.", sv: "Organisationsnummer", value: billing.orgNumber },
  { label: "VAT no.", sv: "Momsregistreringsnummer", value: billing.vatNumber },
  { label: "Bankgiro", sv: "Bankgiro", value: billing.bankgiro },
  { label: "Plusgiro", sv: "Plusgiro", value: billing.plusgiro },
  { label: "IBAN", sv: "IBAN", value: billing.iban },
  { label: "BIC", sv: "BIC/SWIFT", value: billing.bic },
].filter((row) => row.value);

export default function BillingPage() {
  return (
    <SubPage title="Billing">
      <dl className="mt-10 w-full max-w-md divide-y divide-neutral-800 border-y border-neutral-800 text-left">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex flex-col gap-2 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4"
          >
            <dt className="shrink-0">
              <span className="block text-xs uppercase tracking-[0.15em]">{row.label}</span>
              <span className="block text-[10px] text-neutral-500">{row.sv}</span>
            </dt>
            <dd className="flex min-w-0 items-start justify-between gap-3 sm:justify-end sm:text-right">
              <span className="min-w-0 whitespace-pre-line text-sm [overflow-wrap:anywhere]">
                {row.value}
              </span>
              <CopyButton value={row.value} label={row.label} />
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-6 max-w-md text-xs text-neutral-400">
        Payment details are always stated on our invoices. Contact us if anything differs.
      </p>
    </SubPage>
  );
}
