import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Crumb, More, MovieList, Neighbors, RelatedLinks, Sources } from "@/components/ArticleBits";
import { JsonLd } from "@/components/JsonLd";
import { getWar, warNeighbors, wars } from "@/content/wars";
import { articleLd, pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return wars.map((war) => ({ slug: war.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const war = getWar(slug);
    if (!war) return {};
    return pageMeta({
      title: `${war.nameKo} (${war.nameEn})`,
      description: war.summary,
      path: `/wars/${war.slug}`,
    });
  });
}

export default async function WarPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const war = getWar(slug);
  if (!war) notFound();
  const neighbors = warNeighbors(slug);

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd
        data={articleLd({
          title: war.nameKo,
          description: war.summary,
          path: `/wars/${war.slug}`,
        })}
      />
      <Crumb items={[{ href: "/wars", label: "전쟁" }, { label: war.nameKo }]} />
      <p className="mt-6 text-xs tracking-[0.2em] text-terra">{war.nameEn.toUpperCase()}</p>
      <h1 className="mt-2 font-serif text-4xl text-ink">{war.nameKo}</h1>
      <p className="mt-2 text-sm text-muted">{war.years}</p>
      <p className="mt-4 text-sm leading-7 text-ink">{war.summary}</p>
      <dl className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          ["왜", war.why],
          ["누구", war.who],
          ["결과", war.result],
        ].map(([label, text]) => (
          <div key={label} className="rounded-lg border border-line bg-card p-4">
            <dt className="text-xs text-terra">{label}</dt>
            <dd className="mt-1 text-sm leading-6">{text}</dd>
          </div>
        ))}
      </dl>
      <ol className="mt-6 space-y-3 text-sm leading-7">
        {war.points.map((point, index) => (
          <li key={point} className="flex gap-3">
            <span className="font-serif text-terra">{index + 1}</span>
            <span>{point}</span>
          </li>
        ))}
      </ol>
      <More paragraphs={war.more} />
      <RelatedLinks links={war.related} />
      <MovieList slugs={war.movies} />
      {war.movies.length === 0 ? (
        <p className="mt-8 text-sm leading-7 text-muted">
          이 전쟁을 사건 그대로 다룬 유명한 극영화는 드뭅니다. 페르시아를 배경으로 한 작품은{" "}
          <a href="/movies" className="text-terra underline">
            영화 목록
          </a>
          에 모아 두었습니다.
        </p>
      ) : null}
      <Sources items={war.sources} />
      <Neighbors
        prev={neighbors.prev ? { href: `/wars/${neighbors.prev.slug}`, label: neighbors.prev.nameKo } : undefined}
        next={neighbors.next ? { href: `/wars/${neighbors.next.slug}`, label: neighbors.next.nameKo } : undefined}
      />
    </article>
  );
}
