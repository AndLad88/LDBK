import { site } from "@/data/content";

export default function HomePage() {
  return (
    // Logotyp centrerad på skärmen
    <main className="flex min-h-svh items-center justify-center px-5 py-24">
      {/* TODO: Ersätt textloggan med en riktig logotyp (t.ex. next/image med SVG) */}
      <h1 className="text-[clamp(4.5rem,22vw,16rem)] leading-none tracking-tighter">
        {site.name}
      </h1>
    </main>
  );
}
