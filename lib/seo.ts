import type { Metadata } from "next";
import { site } from "@/lib/site";

export function pageMeta({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${site.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} · ${site.name}`,
      description,
      url,
      type: "article",
    },
  };
}

export function articleLd({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    inLanguage: "ko",
    mainEntityOfPage: `${site.url}${path}`,
    author: { "@type": "Organization", name: "나두" },
    publisher: {
      "@type": "Organization",
      name: site.name,
      identifier: site.namespace,
    },
  };
}
