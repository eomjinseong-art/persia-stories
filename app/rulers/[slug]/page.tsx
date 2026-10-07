import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Crumb, More, MovieList, Neighbors, RelatedLinks, Sources } from "@/components/ArticleBits";
import { JsonLd } from "@/components/JsonLd";
import { getRuler, rulerNeighbors, rulers } from "@/content/rulers";
import { articleLd, pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return rulers.map((ruler) => ({ slug: ruler.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const ruler = getRuler(slug);
    if (!ruler) return {};
    return pageMeta({
      title: `${ruler.nameKo} (${ruler.nameEn})`,
      description: ruler.summary,
      path: `/rulers/${ruler.slug}`,
    });
  });
}

export default async function RulerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ruler = getRuler(slug);
  if (!ruler) notFound();
  const neighbors = rulerNeighbors(slug);

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd
        data={articleLd({
          title: ruler.nameKo,
          description: ruler.summary,
          path: `/rulers/${ruler.slug}`,
        })}
      />
      <Crumb items={[{ href: "/rulers", label: "왕" }, { label: ruler.nameKo }]} />
      <p className="mt-6 text-xs tracking-[0.2em] text-terra">{ruler.nameEn.toUpperCase()}</p>
      <p className="mt-2 text-xs text-muted">{ruler.status}</p>
      <h1 className="mt-1 font-serif text-4xl text-ink">{ruler.nameKo}</h1>
      <p className="mt-2 text-sm text-muted">
        {ruler.formal} · {ruler.role} · {ruler.years}
      </p>
      <p className="mt-4 text-sm leading-7 text-ink">{ruler.summary}</p>
      <ol className="mt-6 space-y-3 text-sm leading-7">
        {ruler.points.map((point, index) => (
          <li key={point} className="flex gap-3">
            <span className="font-serif text-terra">{index + 1}</span>
            <span>{point}</span>
          </li>
        ))}
      </ol>
      <More paragraphs={ruler.more} />
      <RelatedLinks links={ruler.related} />
      <MovieList slugs={ruler.movies} />
      <Sources items={ruler.sources} />
      <Neighbors
        prev={neighbors.prev ? { href: `/rulers/${neighbors.prev.slug}`, label: neighbors.prev.nameKo } : undefined}
        next={neighbors.next ? { href: `/rulers/${neighbors.next.slug}`, label: neighbors.next.nameKo } : undefined}
      />
    </article>
  );
}
