import Link from "next/link";
import { nav, sisters, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-stone/80">
      <aside aria-label="광고" className="mx-auto max-w-6xl px-4 pt-8">
        <a
          href={site.coupangHref}
          target="_blank"
          rel="sponsored noopener noreferrer nofollow"
          className="flex items-center gap-3 rounded-md border border-line bg-card px-4 py-3 text-sm text-ink transition-colors hover:border-terra hover:text-terra"
        >
          <span className="shrink-0 rounded-sm border border-line px-1.5 py-0.5 text-[10px] tracking-wider text-muted">
            광고
          </span>
          <span className="min-w-0 flex-1">{site.coupangLine}</span>
          <span aria-hidden="true" className="shrink-0 text-terra">
            →
          </span>
        </a>
        <p className="mt-2 text-[11px] leading-5 text-muted">
          이 게시물은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
        </p>
      </aside>
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm leading-6 text-muted">
        <p className="font-serif text-base text-ink">{site.name}</p>
        <p className="mt-1 text-xs tracking-wide text-terra">{site.brand}</p>
        <div className="mt-4 max-w-3xl space-y-2">
          <p>
            페르시아이야기의 글은 헤로도토스, 아케메네스 왕실 비문, 아리아노스, 플루타르코스 같은 고대
            기록과 공개된 연구 정리를 참고해 우리말로 다시 쓴 것입니다. 고대 문장이나 현대 책의 문장을
            그대로 옮기지 않았고, 없는 말을 만들어 넣지 않았습니다.
          </p>
          <p>
            전설은 전설이라고 적습니다. 영화 제목과 상표는 각 권리자의 것입니다. 영화를 볼 수 있는 불법
            사이트는 안내하지 않습니다.
          </p>
        </div>
        <nav className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs">
          <Link href="/" className="underline decoration-line underline-offset-4 hover:text-terra">
            홈
          </Link>
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="underline decoration-line underline-offset-4 hover:text-terra"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <nav aria-label="나두 역사·신화" className="mt-6 border-t border-line pt-4">
          <p aria-hidden="true" className="text-[10px] tracking-[0.16em] text-terra">
            나두 역사·신화
          </p>
          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs">
            {sisters.map((sister) => (
              <li key={sister.href} className="max-w-full">
                <a
                  href={sister.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex max-w-full flex-wrap items-baseline gap-x-1 hover:text-terra"
                >
                  <span className="underline decoration-line underline-offset-4">{sister.label}</span>
                  <span className="text-[10px] tracking-[0.12em] text-terra">{sister.en}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
