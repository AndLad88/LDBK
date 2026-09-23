type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  lead?: string;
  /** Rubriknivå – välj utifrån sidans hierarki. */
  as?: "h1" | "h2" | "h3";
  /** Anpassa gråton för mörk bakgrund. */
  tone?: "light" | "dark";
  className?: string;
  /** id på rubriken, t.ex. för aria-labelledby. */
  id?: string;
};

/** Rubrik med valfri överrubrik och ingress. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  as: Heading = "h2",
  tone = "light",
  className = "",
  id,
}: SectionHeadingProps) {
  const muted = tone === "dark" ? "text-neutral-400" : "text-neutral-600";
  const size =
    Heading === "h1"
      ? "text-5xl sm:text-6xl lg:text-7xl"
      : "text-3xl sm:text-4xl lg:text-5xl";

  return (
    <div className={`max-w-3xl ${className}`}>
      {eyebrow && (
        <p className={`mb-5 text-xs uppercase tracking-[0.25em] ${muted}`}>
          {eyebrow}
        </p>
      )}
      <Heading id={id} className={`${size} leading-[1.05]`}>{title}</Heading>
      {lead && <p className={`mt-6 text-lg leading-relaxed sm:text-xl ${muted}`}>{lead}</p>}
    </div>
  );
}
