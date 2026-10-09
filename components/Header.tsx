"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { VisitorCounter } from "@/components/VisitorCounter";
import { linkCheckAllow404, nav, sisters, site } from "@/lib/site";

const allowMissing = new Set<string>(linkCheckAllow404);

export function Header() {
  const path = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <Link href="/" className="flex min-w-0 shrink-0 items-center gap-2" aria-label="페르시아이야기 홈">
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-terra bg-stone font-serif text-sm text-terra"
          >
            P
          </span>
          <span className="min-w-0">
            <span className="block font-serif text-lg leading-tight tracking-wide text-ink">
              {site.name}
            </span>
            <span className="mt-0.5 block text-[10px] leading-none tracking-[0.18em] text-terra">
              {site.nameEn}
            </span>
          </span>
        </Link>
        <div className="ml-auto flex items-center gap-3">
          <VisitorCounter />
        </div>
      </div>
      <nav aria-label="주요 메뉴" className="mx-auto flex w-full min-w-0 max-w-6xl gap-1 overflow-x-auto px-3 pb-2">
        {nav.map((item) => {
          const active = path === item.href || path.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`shrink-0 rounded-full px-3 py-2 text-sm ${
                active ? "bg-stone text-ink" : "text-muted hover:bg-stone hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <nav
        aria-label="나두 역사·신화"
        className="mx-auto flex w-full min-w-0 max-w-6xl items-center gap-x-3 overflow-x-auto overscroll-x-contain px-4 pb-2.5 text-xs lg:items-start lg:overflow-visible"
      >
        <span
          aria-hidden="true"
          className="sticky left-0 z-10 flex shrink-0 items-center self-stretch bg-bg pr-2 text-[10px] tracking-[0.16em] text-terra lg:static"
        >
          나두 역사·신화
        </span>
        <ul className="flex w-max shrink-0 items-center gap-x-3 lg:w-auto lg:min-w-0 lg:flex-1 lg:flex-wrap lg:gap-y-1.5">
          {sisters.map((sister) => (
            <li key={sister.href} className="shrink-0">
              <a
                href={sister.href}
                target="_blank"
                rel="noopener noreferrer"
                data-link-check={allowMissing.has(sister.href) ? "allow-404" : undefined}
                className="inline-flex items-baseline gap-1 whitespace-nowrap text-muted hover:text-terra"
              >
                <span className="underline decoration-line underline-offset-4">{sister.label}</span>
                <span className="text-[10px] tracking-[0.08em] text-terra">{sister.en}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="dentil opacity-70" aria-hidden="true" />
    </header>
  );
}
