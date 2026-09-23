import { Button } from "@/components/Button";
import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <Container className="py-32">
      <p className="text-xs uppercase tracking-[0.25em] text-neutral-600">404</p>
      <h1 className="mt-5 text-5xl sm:text-6xl">Sidan kunde inte hittas.</h1>
      <p className="mt-6 max-w-xl text-lg text-neutral-600">
        Sidan du söker finns inte eller har flyttats.
      </p>
      <Button href="/" className="mt-10">
        Till startsidan
      </Button>
    </Container>
  );
}
