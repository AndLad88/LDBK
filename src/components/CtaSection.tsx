import { home } from "@/data/content";
import { Button } from "./Button";
import { Container } from "./Container";

/** Avslutande uppmaning att ta kontakt – återanvänds på flera sidor. */
export function CtaSection() {
  const { title, text, button } = home.cta;
  return (
    <section aria-labelledby="cta-rubrik" className="bg-black py-24 text-white lg:py-32">
      <Container className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
        <div className="max-w-2xl">
          <h2 id="cta-rubrik" className="text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            {title}
          </h2>
          <p className="mt-6 text-lg text-neutral-400">{text}</p>
        </div>
        <Button href="/kontakt" variant="inverted">
          {button} <span aria-hidden="true">→</span>
        </Button>
      </Container>
    </section>
  );
}
