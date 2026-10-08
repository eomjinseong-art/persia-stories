import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { places } from "@/content/places";
import { rulers } from "@/content/rulers";
import { wars } from "@/content/wars";
import { sisters, site } from "@/lib/site";

const eras = [
  {
    href: "/eras#achaemenid",
    en: "ACHAEMENID",
    title: "아케메네스",
    years: "대략 기원전 550–330년",
    text: "키루스가 메디아와 바빌론을 품고, 다레이오스가 총독과 길을 만들고, 크세르크세스가 그리스까지 갔다가 돌아온 제국입니다. 살라미스의 패배가 이 왕조의 끝은 아닙니다.",
  },
  {
    href: "/eras#alexander",
    en: "BRIDGE",
    title: "알렉산드로스의 다리",
    years: "기원전 330–247년 무렵",
    text: "다레이오스 3세가 죽고 아케메네스 왕위가 끊깁니다. 알렉산드로스는 페르시아 왕이 아닙니다. 그의 부하 셀레우코스가 이란과 메소포타미아를 잠시 잇습니다.",
  },
  {
    href: "/eras#parthian",
    en: "PARTHIA",
    title: "파르티아",
    years: "대략 기원전 247–서기 224년",
    text: "북동쪽 이란에서 일어나 메소포타미아를 낀 왕국이 됩니다. 카르헤에서 로마 군단을 막습니다. 귀족이 세고, 주화에는 그리스어가 오래 남습니다.",
  },
  {
    href: "/eras#sasanian",
    en: "SASANIAN",
    title: "사산",
    years: "서기 224–651년",
    text: "아르다시르가 파르티아를 끝내고 왕중왕을 다시 세웁니다. 샤푸르는 로마 황제를 사로잡고, 호스로 1세는 세금과 군사를 고칩니다. 651년 무렵 왕조가 끝납니다.",
  },
];

const paths = [
  {
    href: "/eras",
    index: "01",
    en: "Eras",
    title: "시대",
    text: "아케메네스, 알렉산드로스의 짧은 다리, 파르티아, 사산. 천 년을 한 단어로 외우지 않도록 네 칸만 먼저 나눕니다.",
  },
  {
    href: "/places",
    index: "02",
    en: "Places",
    title: "장소",
    text: "페르세폴리스, 파사르가다에, 수사, 왕의 길, 베히스툰, 나크시 루스탐, 크테시폰. 궁전 하나가 제국 전부는 아닙니다.",
  },
  {
    href: "/rulers",
    index: "03",
    en: "Rulers",
    title: "왕",
    text: "키루스, 다레이오스 1세, 크세르크세스, 그리고 파르티아·사산에서 길을 잡는 왕. 전체 명단은 아닙니다.",
  },
  {
    href: "/family-tree",
    index: "04",
    en: "Family Tree",
    title: "가족관계도",
    text: "키루스 가문과 다레이오스의 다른 갈래, 바르디야와 가우마타의 논쟁, 파르티아·사산의 짧은 왕위. 점선은 불확실한 관계입니다.",
  },
  {
    href: "/wars",
    index: "05",
    en: "Wars",
    title: "전쟁",
    text: "바빌론, 마라톤, 살라미스, 알렉산드로스, 카르헤, 에데사, 사산의 끝. 왜 싸웠는지와 끝나서 바뀐 것만.",
  },
  {
    href: "/daily",
    index: "06",
    en: "Daily Life",
    title: "일상",
    text: "총독, 공납, 배급 점토판, 왕의 길의 전령, 카나트. 영화의 연회가 아니라 대부분 사람의 하루에 가깝게.",
  },
  {
    href: "/army",
    index: "07",
    en: "Army",
    title: "군대",
    text: "궁수와 기병, 헤로도토스가 전한 불멸 부대, 동맹의 함대, 파르티아 기마 궁수와 사산 중장기병.",
  },
  {
    href: "/faith",
    index: "08",
    en: "Belief",
    title: "신앙",
    text: "왕실 비문의 아후라 마즈다와, 후대에 제도가 분명해지는 조로아스터교. 가볍게, 그리고 깎지 않고.",
  },
  {
    href: "/movies",
    index: "09",
    en: "Films",
    title: "관련 영화",
    text: "300, 300: 제국의 부활, 알렉산더, 알렉산더 대왕. 어디가 창작인지도 함께. 보는 링크는 없습니다.",
  },
  {
    href: "/sources",
    index: "10",
    en: "Sources",
    title: "출처",
    text: "헤로도토스, 베히스툰, 아리아노스와 현대 개설. 이 사이트가 문장을 지어내지 않는 기준.",
  },
];

const reading = [
  { href: "/eras", label: "네 시대가 어떻게 다른지" },
  { href: "/places/persepolis", label: "페르세폴리스는 유일한 수도가 아니다" },
  { href: "/rulers/cyrus", label: "키루스 원통은 인권 선언이 아니다" },
  { href: "/family-tree?focus=cyrus", label: "키루스와 다레이오스는 다른 갈래다" },
  { href: "/places/royal-road", label: "왕의 길이 실제로 무엇을 나르는지" },
  { href: "/wars/marathon", label: "마라톤 경기 전에 있던 전투" },
  { href: "/wars/xerxes-invasion", label: "살라미스 뒤에도 제국은 남는다" },
  { href: "/wars/alexander", label: "알렉산드로스는 페르시아 왕이 아니다" },
  { href: "/daily", label: "궁정 연회가 아닌 평범한 하루" },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              name: site.name,
              alternateName: [site.nameEn, "페르시아 이야기", site.namespace],
              identifier: site.namespace,
              url: site.url,
              inLanguage: "ko",
              description: site.description,
            },
          ],
        }}
      />
      <section className="py-12 text-center sm:py-16">
        <p className="text-xs tracking-[0.3em] text-terra">PERSIA STORIES</p>
        <h1 className="mt-3 font-serif text-4xl text-ink sm:text-5xl">{site.name}</h1>
        <p className="mt-4 text-lg text-muted">{site.tagline}</p>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-muted">
          아케메네스에서 파르티아·사산까지, 왕과 전쟁, 페르세폴리스와 평범한 하루를 전설과 역사를 구분해
          적습니다. 어려운 말에는 쉬운 풀이를 붙입니다.
        </p>
        <p className="mt-3 text-xs text-terra">{site.brand}</p>
        <p className="mx-auto mt-4 max-w-xl text-xs leading-6 text-muted">
          전설은 전설이라고 적습니다. 길을 잡는 왕 {rulers.length}명, 큰 전쟁 {wars.length}개, 장소{" "}
          {places.length}곳을 짧은 글로 정리했습니다.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm">
          <Link href="/eras" className="rounded-full bg-terra px-4 py-2 text-white hover:bg-terra-deep">
            시대부터 보기
          </Link>
          <a
            href="https://greece-stories.vercel.app/wars/persian-wars"
            className="rounded-full border border-line bg-card px-4 py-2 hover:border-terra"
            rel="noopener noreferrer"
          >
            그리스 쪽에서 같은 전쟁 읽기
          </a>
        </div>
      </section>
      <div className="dentil opacity-50" aria-hidden="true" />
      <section className="mt-10" aria-labelledby="era-heading">
        <h2 id="era-heading" className="font-serif text-2xl text-ink">
          네 칸
        </h2>
        <p className="mt-1 text-sm text-muted">
          페르시아를 궁전 하나, 또는 영화 한 편으로 외우면 어렵습니다. 먼저 이 칸만 나누세요.
        </p>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {eras.map((era) => (
            <Link key={era.href} href={era.href} className="rounded-lg border border-line bg-card p-5 hover:border-terra">
              <p className="text-[11px] tracking-[0.16em] text-terra">{era.en}</p>
              <h3 className="mt-1 font-serif text-2xl text-ink">{era.title}</h3>
              <p className="mt-1 text-xs text-muted">{era.years}</p>
              <p className="mt-3 text-sm leading-6 text-muted">{era.text}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="mt-12" aria-labelledby="menu-heading">
        <h2 id="menu-heading" className="font-serif text-2xl text-ink">
          모든 길
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {paths.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-lg border border-line bg-card p-5 transition hover:border-terra hover:shadow-sm"
            >
              <p className="font-serif text-xs text-terra">
                {item.index} · {item.en}
              </p>
              <h3 className="mt-1 font-serif text-xl text-ink group-hover:text-terra">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{item.text}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="mt-12 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-2xl text-ink">처음 읽는 순서</h2>
          <ol className="mt-4 space-y-2 text-sm">
            {reading.map((item, index) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-laurel underline decoration-line underline-offset-4 hover:text-terra"
                >
                  {index + 1}. {item.label}
                </Link>
              </li>
            ))}
          </ol>
        </div>
        <section aria-labelledby="sister-sites-heading" className="rounded-lg border border-line bg-card p-5">
          <h2 id="sister-sites-heading" className="font-serif text-2xl text-ink">
            나두 역사·신화
          </h2>
          <p className="mt-2 text-sm leading-7 text-muted">
            그리스 신화, 그리스의 폴리스, 로마의 군단, 이집트의 파라오는 나두의 다른 사이트에 있습니다.
            페르시아이야기는 그 세계와 맞닿은 왕, 전쟁, 하루를 적습니다.
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {sisters.map((sister) => (
              <li key={sister.href}>
                <a
                  href={sister.href}
                  className="text-laurel underline decoration-line underline-offset-4 hover:text-terra"
                  rel="noopener noreferrer"
                >
                  {sister.label}
                </a>
                <span className="ml-2 text-[11px] tracking-[0.12em] text-terra">{sister.en}</span>
              </li>
            ))}
          </ul>
          <a
            href="https://greece-stories.vercel.app/wars/persian-wars"
            className="mt-4 inline-block text-sm text-terra"
            rel="noopener noreferrer"
          >
            그리스가 본 페르시아 전쟁 →
          </a>
        </section>
      </section>
    </div>
  );
}
