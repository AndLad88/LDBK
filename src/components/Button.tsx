import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "outline" | "inverted";

const base =
  "inline-flex shrink-0 items-center whitespace-nowrap justify-center gap-3 border px-7 py-4 text-sm font-bold uppercase tracking-[0.15em] transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50";

/** Hover inverterar färgerna – diskret men tydligt. */
const variants: Record<Variant, string> = {
  // Svart knapp för ljusa sektioner
  primary: "border-black bg-black text-white hover:bg-white hover:text-black",
  // Ramknapp för ljusa sektioner
  outline: "border-black bg-transparent text-black hover:bg-black hover:text-white",
  // Vit knapp för mörka sektioner
  inverted: "border-white bg-white text-black hover:bg-black hover:text-white",
};

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = CommonProps & { href: string } & Omit<
    ComponentPropsWithoutRef<typeof Link>,
    "href" | "className" | "children"
  >;

type ButtonAsButton = CommonProps & { href?: undefined } & Omit<
    ComponentPropsWithoutRef<"button">,
    "className" | "children"
  >;

export type ButtonProps = ButtonAsLink | ButtonAsButton;

/** Knapp som renderas som länk när `href` anges, annars som <button>. */
export function Button(props: ButtonProps) {
  const { variant = "primary", className = "", children } = props;
  const classes = `${base} ${variants[variant]} ${className}`;

  if (props.href !== undefined) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { variant: _v, className: _c, children: _ch, ...linkProps } = props;
    return (
      <Link className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { variant: _v, className: _c, children: _ch, ...buttonProps } = props;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
