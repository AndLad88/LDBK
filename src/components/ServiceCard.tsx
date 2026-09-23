import Link from "next/link";
import type { Service } from "@/data/content";

type ServiceCardProps = {
  service: Service;
  index: number;
};

/** Kort för en tjänst – hela kortet är klickbart och inverteras vid hover. */
export function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <Link
      href={`/tjanster#${service.slug}`}
      className="group flex h-full flex-col border border-black bg-white p-8 text-black transition-colors duration-200 hover:border-white hover:bg-black hover:text-white focus-visible:border-white focus-visible:bg-black focus-visible:text-white"
    >
      <span className="text-sm tabular-nums text-neutral-500 group-hover:text-neutral-400">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="mt-12 text-2xl">{service.title}</h3>
      <p className="mt-3 flex-1 leading-relaxed text-neutral-600 group-hover:text-neutral-300">
        {service.summary}
      </p>
      <span aria-hidden="true" className="mt-8 self-start text-xl transition-transform duration-200 group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}
