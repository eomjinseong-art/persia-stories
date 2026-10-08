export const site = {
  name: "페르시아이야기",
  nameEn: "Persia Stories",
  tagline: "어려운 페르시아 역사를, 짧은 한국어로",
  description:
    "어려운 페르시아 역사를, 짧은 한국어로. 아케메네스 제국에서 파르티아·사산까지, 왕과 전쟁, 페르세폴리스와 평범한 하루를 전설과 역사를 구분해 적습니다. 어려운 말에는 쉬운 풀이를 붙입니다.",
  url: "https://persia-stories.vercel.app",
  namespace: "persia-stories",
  locale: "ko_KR",
  brand: "나두 — 나의 모든 일상을 AI와 함께",
  coupangHref: "https://link.coupang.com/a/hsdzLh1vB6",
  coupangLine:
    "왕의 길은 수사까지였습니다. 로켓배송은 역참을 거치지 않습니다 · 쿠팡 둘러보기",
} as const;

export const sisters = [
  { href: "https://nadoo-myth.vercel.app", label: "나두신화", en: "Myth" },
  {
    href: "https://greece-stories.vercel.app",
    label: "그리스이야기",
    en: "Greece Stories",
  },
  {
    href: "https://rome-stories.vercel.app",
    label: "로마이야기",
    en: "Rome Stories",
  },
  {
    href: "https://egypt-stories.vercel.app",
    label: "이집트이야기",
    en: "Egypt Stories",
  },
  {
    href: "https://nadoo-timeline.vercel.app",
    label: "나두연표",
    en: "Timeline",
  },
] as const;

export const nav = [
  { href: "/eras", label: "시대" },
  { href: "/places", label: "장소" },
  { href: "/rulers", label: "왕" },
  { href: "/family-tree", label: "가족관계도" },
  { href: "/wars", label: "전쟁" },
  { href: "/daily", label: "일상" },
  { href: "/army", label: "군대" },
  { href: "/faith", label: "신앙" },
  { href: "/movies", label: "영화" },
  { href: "/sources", label: "출처" },
] as const;

export type LinkRef = {
  href: string;
  label: string;
};

export type SourceRef = {
  title: string;
  note: string;
};
