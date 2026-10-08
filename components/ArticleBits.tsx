import Link from "next/link";
import { moviesBySlug } from "@/content/movies";
import { outboundProps, type LinkRef, type SourceRef } from "@/lib/site";

export function Crumb({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav aria-label="현재 위치" className="text-xs text-muted">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <li>
          <Link href="/" className="hover:text-terra">
            홈
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-2">
            <span aria-hidden="true">/</span>
            {item.href ? (
              <Link href={item.href} className="hover:text-terra">
                {item.label}
              </Link>
            ) : (
              <span className="text-ink">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function More({ paragraphs }: { paragraphs: string[] }) {
  return (
    <details className="group mt-6 rounded-lg border border-line bg-card p-4">
      <summary className="cursor-pointer text-sm font-medium text-ink">
        조금만 더
        <span className="ml-2 text-xs font-normal text-terra group-open:hidden">펼치기</span>
        <span className="ml-2 hidden text-xs font-normal text-terra group-open:inline">접기</span>
      </summary>
      <div className="mt-3 space-y-3 text-sm leading-7 text-muted">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </details>
  );
}

export function Elsewhere({ links }: { links: readonly LinkRef[] }) {
  if (links.length === 0) return null;
  return (
    <aside aria-label="다른 사이트에서 더 보기" className="mt-4 rounded-md border border-line bg-card px-3 py-2.5">
      <p className="text-[11px] tracking-[0.14em] text-terra">다른 사이트에서 더 보기</p>
      <ul className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-sm">
        {links.map((link) => (
          <li key={link.href} className="max-w-full">
            <a
              href={link.href}
              {...outboundProps(link.href)}
              className="text-laurel underline decoration-line underline-offset-4 hover:text-terra"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function SisterRow({
  title,
  titleEn,
  links,
}: {
  title: string;
  titleEn: string;
  links: readonly { href: string; label: string; en: string }[];
}) {
  return (
    <section aria-label={title} className="mt-10 rounded-lg border border-line bg-card p-5">
      <h2 className="font-serif text-xl text-ink">
        {title}
        <span className="ml-2 align-middle font-sans text-[11px] tracking-[0.12em] text-terra">{titleEn}</span>
      </h2>
      <ul className="mt-3 flex flex-wrap gap-2 text-sm">
        {links.map((link) => (
          <li key={link.href} className="max-w-full">
            <a
              href={link.href}
              {...outboundProps(link.href)}
              className="inline-flex max-w-full flex-wrap items-baseline gap-x-1.5 rounded-full border border-line bg-bg px-3 py-1.5 text-laurel hover:border-terra hover:text-terra"
            >
              <span>{link.label}</span>
              <span className="text-[10px] tracking-[0.12em] text-terra">{link.en}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

function RelatedSplit({ links, pills = false }: { links: readonly LinkRef[]; pills?: boolean }) {
  const internal = links.filter((link) => !link.href.startsWith("http"));
  const external = links.filter((link) => link.href.startsWith("http"));
  if (internal.length === 0 && external.length === 0) return null;
  return (
    <>
      {internal.length > 0 ? (
        <ul className={pills ? "mt-3 flex flex-wrap gap-2" : "mt-3 flex flex-wrap gap-x-3 gap-y-1 text-sm"}>
          {internal.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={
                  pills
                    ? "rounded-full border border-line bg-card px-3 py-1.5 text-sm text-laurel hover:border-terra hover:text-terra"
                    : "text-laurel underline decoration-line underline-offset-4 hover:text-terra"
                }
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
      <Elsewhere links={external} />
    </>
  );
}

export function RelatedLinks({ links }: { links: LinkRef[] }) {
  if (links.length === 0) return null;
  const internal = links.some((link) => !link.href.startsWith("http"));
  return (
    <nav aria-label={internal ? "이어서 보기" : "다른 사이트에서 더 보기"} className="mt-8">
      {internal ? <h2 className="font-serif text-xl text-ink">이어서 보기</h2> : null}
      <RelatedSplit links={links} pills />
    </nav>
  );
}

export function Sources({ items }: { items: SourceRef[] }) {
  return (
    <section className="mt-8" aria-labelledby="sources-heading">
      <h2 id="sources-heading" className="font-serif text-xl text-ink">
        근거로 삼은 기록
      </h2>
      <ul className="mt-3 space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.title} className="leading-6">
            <span className="text-ink">{item.title}</span>
            <span className="mx-2 text-terra">·</span>
            <span className="text-muted">{item.note}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs leading-5 text-muted">인용문은 만들지 않았습니다. 책 이름과 위치만 적습니다.</p>
    </section>
  );
}

export function MovieList({ slugs, heading = "관련 영화" }: { slugs: string[]; heading?: string }) {
  const items = moviesBySlug(slugs);
  if (items.length === 0) return null;
  return (
    <section className="mt-10" aria-labelledby="movies-heading">
      <h2 id="movies-heading" className="font-serif text-xl text-ink">
        {heading}
      </h2>
      <p className="mt-2 text-sm leading-7 text-muted">
        아래 작품은 페르시아를 무대로 한 극입니다. 분위기를 잡는 데는 도움이 되고, 사실 관계의 교과서는
        아닙니다. 불법 영상 링크는 없습니다.
      </p>
      <div className="mt-4 space-y-4">
        {items.map((movie) => (
          <article key={movie.slug} id={movie.slug} className="rounded-lg border border-line bg-card p-5">
            <h3 className="font-serif text-lg text-ink">
              「{movie.titleKo}」
              <span className="ml-2 text-sm font-sans text-muted">{movie.titleEn}</span>
            </h3>
            <p className="mt-1 text-xs tracking-wide text-terra">
              {movie.year} · {movie.kind}
            </p>
            <p className="mt-3 text-sm leading-7 text-ink">{movie.blurb}</p>
            <p className="mt-2 text-sm leading-7 text-muted">{movie.caveat}</p>
            <RelatedSplit links={movie.related} />
          </article>
        ))}
      </div>
      <Link href="/movies" className="mt-4 inline-block text-sm text-terra">
        추천 영화 전체 보기 →
      </Link>
    </section>
  );
}

export function Neighbors({
  prev,
  next,
}: {
  prev?: { href: string; label: string };
  next?: { href: string; label: string };
}) {
  if (!prev && !next) return null;
  return (
    <nav aria-label="앞뒤 글" className="mt-10 flex items-center justify-between gap-4 border-t border-line pt-4 text-sm">
      {prev ? (
        <Link href={prev.href} className="text-laurel underline decoration-line underline-offset-4 hover:text-terra">
          ← {prev.label}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={next.href} className="text-laurel underline decoration-line underline-offset-4 hover:text-terra">
          {next.label} →
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
