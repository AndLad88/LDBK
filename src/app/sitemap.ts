import type { MetadataRoute } from "next";
import { site } from "@/data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, lastModified: new Date(), changeFrequency: "yearly", priority: 1 },
    { url: `${site.url}/projects`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/about`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
    { url: `${site.url}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
    { url: `${site.url}/billing`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
  ];
}
