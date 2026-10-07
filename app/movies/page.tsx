import type { Metadata } from "next";
import Link from "next/link";
import { Crumb } from "@/components/ArticleBits";
import { JsonLd } from "@/components/JsonLd";
import { movies } from "@/content/movies";
import { articleLd, pageMeta } from "@/lib/seo";

const description =
  "300, 300: 제국의 부활, 알렉산더, 알렉산더 대왕. 한국어·영어 제목과 연도, 어디가 창작인지. 시청 링크는 없습니다.";

export const metadata: Metadata = pageMeta({
  title: "관련 영화",
  description,
  path: "/movies",
});

export default function MoviesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd data={articleLd({ title: "관련 영화", description, path: "/movies" })} />
      <Crumb items={[{ label: "관련 영화" }]} />
      <p className="mt-6 text-xs tracking-[0.2em] text-terra">FILMS</p>
      <h1 className="mt-2 font-serif text-4xl text-ink">관련 영화</h1>
      <p className="mt-4 text-sm leading-7 text-muted">
        페르시아를 처음 상상할 때 영화가 먼저인 경우가 많습니다. 제목은 실제로 개봉한 작품만 적었습니다.
        각 카드는 왜 보면 좋은지, 어디가 창작인지 두 단락으로 나눕니다. 스트리밍 링크는 없습니다. 불법
        사이트도 안내하지 않습니다.
      </p>
      <div className="mt-8 space-y-4">
        {movies.map((movie) => (
          <article key={movie.slug} id={movie.slug} className="rounded-lg border border-line bg-card p-5">
            <h2 className="font-serif text-2xl text-ink">
              「{movie.titleKo}」
              <span className="ml-2 font-sans text-base text-muted">{movie.titleEn}</span>
            </h2>
            <p className="mt-1 text-xs tracking-wide text-terra">
              {movie.year} · {movie.kind}
            </p>
            <p className="mt-3 text-sm leading-7">{movie.blurb}</p>
            <p className="mt-2 text-sm leading-7 text-muted">{movie.caveat}</p>
            <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-sm">
              {movie.related.map((link) => (
                <li key={link.href}>
                  {link.href.startsWith("http") ? (
                    <a
                      href={link.href}
                      className="text-laurel underline decoration-line underline-offset-4 hover:text-terra"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-laurel underline decoration-line underline-offset-4 hover:text-terra"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
