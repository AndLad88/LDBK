import type { MetadataRoute } from "next";
import { navigation, site } from "@/data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", ...navigation.map((item) => item.href)];
  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
