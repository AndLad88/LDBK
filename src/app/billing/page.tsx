import type { Metadata } from "next";
import { CopyButton } from "@/components/CopyButton";
import { SubPage } from "@/components/SubPage";
import { billing, site } from "@/data/content";
import { getDictionary } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getDictionary();
  return {
    title: `${t.billing.title} | ${site.name}`,
    description: t.billing.description,
    alternates: { canonical: "/billing" },
  };
}

export default async function BillingPage() {
  const { t } = await getDictionary();
  const b = t.billing;
  // Tomma fält i content.ts döljs
  const rows = [
    { label: b.company, value: billing.companyName },
    { label: b.address, value: billing.address.join("\n") },
    { label: b.regNo, value: billing.orgNumber },
    { label: b.vat, value: billing.vatNumber },
    { label: b.bankgiro, value: billing.bankgiro },
    { label: b.plusgiro, value: billing.plusgiro },
    { label: b.iban, value: billing.iban },
    { label: b.bic, value: billing.bic },
  ].filter((row) => row.value);

  return (
    <SubPage title={b.title}>
      <dl className="mt-10 w-full max-w-md divide-y divide-neutral-200 border-y border-neutral-200 text-left">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex flex-col gap-2 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4"
          >
            <dt className="shrink-0">
              <span className="block text-xs uppercase tracking-[0.15em]">{row.label}</span>
            </dt>
            <dd className="flex min-w-0 items-start justify-between gap-3 sm:justify-end sm:text-right">
              <span className="min-w-0 whitespace-pre-line text-sm [overflow-wrap:anywhere]">
                {row.value}
              </span>
              <CopyButton value={row.value} label={row.label} copyText={b.copy} copiedText={b.copied} />
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-6 max-w-md text-xs text-neutral-500">{b.notice}</p>
    </SubPage>
  );
}
