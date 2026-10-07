import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Crumb, More, MovieList, Neighbors, RelatedLinks, Sources } from "@/components/ArticleBits";
import { JsonLd } from "@/components/JsonLd";
import { getPlace, placeNeighbors, places } from "@/content/places";
import { articleLd, pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return places.map((place) => ({ slug: place.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const place = getPlace(slug);
    if (!place) return {};
    return pageMeta({
      title: `${place.nameKo} (${place.nameEn})`,
      description: place.summary,
      path: `/places/${place.slug}`,
    });
  });
}

export default async function PlacePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const place = getPlace(slug);
  if (!place) notFound();
  const neighbors = placeNeighbors(slug);

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd
        data={articleLd({
          title: place.nameKo,
          description: place.summary,
          path: `/places/${place.slug}`,
        })}
      />
      <Crumb items={[{ href: "/places", label: "장소" }, { label: place.nameKo }]} />
      <p className="mt-6 text-xs tracking-[0.2em] text-terra">{place.nameEn.toUpperCase()}</p>
      <h1 className="mt-2 font-serif text-4xl text-ink">{place.nameKo}</h1>
      <p className="mt-2 text-sm text-muted">{place.era}</p>
      <p className="mt-4 text-sm leading-7 text-ink">{place.summary}</p>
      <ol className="mt-6 space-y-3 text-sm leading-7">
        {place.points.map((point, index) => (
          <li key={point} className="flex gap-3">
            <span className="font-serif text-terra">{index + 1}</span>
            <span>{point}</span>
          </li>
        ))}
      </ol>
      <More paragraphs={place.more} />
      <RelatedLinks links={place.related} />
      <MovieList slugs={place.movies} />
      <Sources items={place.sources} />
      <Neighbors
        prev={neighbors.prev ? { href: `/places/${neighbors.prev.slug}`, label: neighbors.prev.nameKo } : undefined}
        next={neighbors.next ? { href: `/places/${neighbors.next.slug}`, label: neighbors.next.nameKo } : undefined}
      />
    </article>
  );
}
