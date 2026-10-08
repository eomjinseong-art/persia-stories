import type { MetadataRoute } from "next";
import { places } from "@/content/places";
import { rulers } from "@/content/rulers";
import { wars } from "@/content/wars";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/eras", "/places", "/rulers", "/family-tree", "/wars", "/daily", "/army", "/faith", "/movies", "/sources"];
  const dynamicPaths = [
    ...rulers.map((item) => `/rulers/${item.slug}`),
    ...wars.map((item) => `/wars/${item.slug}`),
    ...places.map((item) => `/places/${item.slug}`),
  ];

  return [...staticPaths, ...dynamicPaths].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(path === "/family-tree" ? "2026-10-08" : "2026-10-07"),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : path.split("/").length > 2 ? 0.6 : 0.8,
  }));
}
