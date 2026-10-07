"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, sisters, site } from "@/lib/site";

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
      </div>
      <nav aria-label="주요 메뉴" className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-3 pb-2">
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
        className="mx-auto flex max-w-6xl items-center gap-x-3 overflow-x-auto px-4 pb-2.5 text-xs"
      >
        <span
          aria-hidden="true"
          className="sticky left-0 z-10 flex shrink-0 items-center self-stretch bg-bg pr-2 text-[10px] tracking-[0.16em] text-terra"
        >
          나두 역사·신화
        </span>
        <ul className="flex shrink-0 items-center gap-x-3">
          {sisters.map((sister) => (
            <li key={sister.href} className="shrink-0">
              <a
                href={sister.href}
                className="text-muted underline decoration-line underline-offset-4 hover:text-terra"
                rel="noopener noreferrer"
              >
                {sister.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="dentil opacity-70" aria-hidden="true" />
    </header>
  );
}
