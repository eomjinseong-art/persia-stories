import type { LinkRef } from "@/lib/site";

export type Movie = {
  slug: string;
  titleKo: string;
  titleEn: string;
  year: string;
  kind: "영화";
  blurb: string;
  caveat: string;
  related: LinkRef[];
};

export const movies: Movie[] = [
  {
    slug: "300",
    titleKo: "300",
    titleEn: "300",
    year: "2006",
    kind: "영화",
    blurb:
      "테르모필레에서 레오니다스와 스파르타 병사가 페르시아 대군을 막는 이야기입니다. 프랭크 밀러의 만화를 잭 스나이더가 영화로 만들었습니다. 전투의 이름과 해는 역사와 겹칩니다.",
    caveat:
      "페르시아 군이 괴물이나 코뿔소처럼 나오는 장면은 기록에 없습니다. 에피알테스라는 인물의 모습과 배신 줄거리도 만화의 창작입니다. 크세르크세스의 외모와 궁정도 초상화가 아닙니다. 이 전투 뒤에도 아케메네스 제국은 무너지지 않았습니다. 살라미스와 플라타이아는 이 영화 밖에 있습니다.",
    related: [
      { href: "/wars/xerxes-invasion", label: "크세르크세스의 원정" },
      { href: "/rulers/xerxes-i", label: "크세르크세스 1세" },
      {
        href: "https://greece-stories.vercel.app/people/leonidas",
        label: "그리스이야기의 레오니다스",
      },
    ],
  },
  {
    slug: "300-rise",
    titleKo: "300: 제국의 부활",
    titleEn: "300: Rise of an Empire",
    year: "2014",
    kind: "영화",
    blurb:
      "같은 세계관의 후속입니다. 테미스토클레스와 아르테미시아, 아르테미시온과 살라미스 해전 쪽으로 장면을 옮깁니다. 바다 전투가 그리스-페르시아 전쟁의 절반이라는 점은 기억할 만합니다.",
    caveat:
      "아르테미시아는 헤로도토스가 전하는 카리아의 여왕으로, 크세르크세스 쪽에 배를 낸 실존 인물입니다. 영화의 복수와 연애, 전투 안무는 극본입니다. 살라미스에서 페르시아 함선의 상당수는 페니키아·이집트·이오니아 등 여러 지역의 배였습니다. 한 여왕의 사선으로 줄이면 그 구조가 사라집니다.",
    related: [
      { href: "/wars/xerxes-invasion", label: "크세르크세스의 원정" },
      { href: "/army", label: "군대" },
      {
        href: "https://greece-stories.vercel.app/people/themistocles",
        label: "그리스이야기의 테미스토클레스",
      },
    ],
  },
  {
    slug: "alexander-2004",
    titleKo: "알렉산더",
    titleEn: "Alexander",
    year: "2004",
    kind: "영화",
    blurb:
      "올리버 스톤의 영화입니다. 가우가멜라에서 인도, 바빌론에서의 죽음까지 원정의 큰 지도를 한 편으로 보여 줍니다. 아케메네스 제국이 어떻게 무너지는지 감을 잡을 때 자주 거론됩니다.",
    caveat:
      "알렉산드로스는 페르시아 왕이 아니라 마케도니아의 왕입니다. 개인적 관계와 대사의 상당수는 창작이거나, 후대 그리스 전기가 전하는 소문을 사실처럼 이어 붙인 것입니다. 페르세폴리스의 화재가 계획이었는지 연회의 사고였는지는 고대 기록도 하나로 모이지 않습니다. 페르시아 궁정의 의상과 의식은 고증 교과서가 아닙니다.",
    related: [
      { href: "/wars/alexander", label: "알렉산드로스의 원정" },
      { href: "/rulers/darius-iii", label: "다레이오스 3세" },
      { href: "/places/persepolis", label: "페르세폴리스" },
      {
        href: "https://greece-stories.vercel.app/people/alexander",
        label: "그리스이야기의 알렉산드로스",
      },
    ],
  },
  {
    slug: "alexander-1956",
    titleKo: "알렉산더 대왕",
    titleEn: "Alexander the Great",
    year: "1956",
    kind: "영화",
    blurb:
      "로버트 로슨이 만들고 리처드 버턴이 알렉산드로스로 나온 스튜디오 시대의 영화입니다. 2004년 작품보다 앞서, 원정을 ‘위대한 정복’의 이야기로 압축해 보여 줍니다.",
    caveat:
      "대사는 고대 기록을 그대로 읽은 것이 아닙니다. 부왕 필리포스 2세, 동방 원정, 바빌론의 죽음을 한 줄로 이으면서 해와 전투를 건너뜁니다. 다레이오스 3세와 페르시아 궁정은 배경에 가깝습니다. 역사 쪽 순서는 이 사이트의 전쟁 글을 보세요.",
    related: [
      { href: "/wars/alexander", label: "알렉산드로스의 원정" },
      { href: "/eras", label: "시대" },
      {
        href: "https://greece-stories.vercel.app/wars/alexander-campaigns",
        label: "그리스이야기의 알렉산드로스 원정",
      },
    ],
  },
];

export function moviesBySlug(slugs: string[]): Movie[] {
  return slugs
    .map((slug) => movies.find((movie) => movie.slug === slug))
    .filter((movie): movie is Movie => Boolean(movie));
}
