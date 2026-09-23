import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-5 text-center">
      <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">404</p>
      <h1 className="mt-5 text-4xl sm:text-5xl">Sidan kunde inte hittas.</h1>
      <Link href="/" className="mt-8 underline underline-offset-4">
        Till startsidan
      </Link>
    </main>
  );
}
