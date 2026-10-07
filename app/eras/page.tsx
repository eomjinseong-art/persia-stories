import type { Metadata } from "next";
import Link from "next/link";
import { Crumb } from "@/components/ArticleBits";
import { JsonLd } from "@/components/JsonLd";
import { articleLd, pageMeta } from "@/lib/seo";

const description =
  "아케메네스, 알렉산드로스의 짧은 다리, 파르티아, 사산. 페르시아 역사를 네 칸으로 나누는 시간표입니다.";

export const metadata: Metadata = pageMeta({
  title: "시대",
  description,
  path: "/eras",
});

const sections = [
  {
    id: "achaemenid",
    en: "ACHAEMENID",
    title: "아케메네스 제국",
    years: "대략 기원전 550–330년",
    paragraphs: [
      "키루스 2세가 기원전 550년 무렵 메디아를 이기고, 리디아와 바빌론을 품으면서 페르시아는 여러 왕국 위의 나라가 됩니다. 그 이전의 엘람과 아시리아는 이 땅의 더 오래된 역사이지만, 이 사이트의 1부는 키루스에서 시작합니다.",
      "수도가 하나가 아닙니다. 수사는 행정의 궁정, 바빌론과 엑바타나는 왕이 머무는 다른 계절의 도시, 페르세폴리스는 파르스 지방의 의례와 보물의 단입니다. 사트라프(총독)가 먼 지역을 다스리고, 공납과 왕의 길이 그들을 왕과 연결합니다.",
      "다레이오스 1세가 이 뼈대를 글로 남깁니다. 베히스툰 비문은 그의 왕위 이야기이고, 동시에 쐐기문자를 현대에 읽는 열쇠가 됩니다. 그리스와의 전쟁은 이 제국의 서쪽 가장자리에서 벌어진 큰 사건이지, 제국 전체의 결말은 아닙니다.",
      "크세르크세스의 원정이 실패한 뒤에도 왕은 150년 가까이 더 이어집니다. 아르타크세르크세스 1세 때 이집트의 반란을 되돌린 일이 그 증거입니다. 왕조의 끝은 살라미스가 아니라 알렉산드로스입니다.",
    ],
    links: [
      { href: "/rulers/cyrus", label: "키루스 2세" },
      { href: "/rulers/darius-i", label: "다레이오스 1세" },
      { href: "/rulers/xerxes-i", label: "크세르크세스 1세" },
      { href: "/places/persepolis", label: "페르세폴리스" },
    ],
  },
  {
    id: "alexander",
    en: "BRIDGE",
    title: "알렉산드로스와 셀레우코스의 다리",
    years: "기원전 330년 이후, 파르티아 직전까지",
    paragraphs: [
      "기원전 330년 다레이오스 3세가 자기 편에게 죽으며 아케메네스 왕위가 끊깁니다. 알렉산드로스는 마케도니아 왕으로 그 땅을 차지합니다. 페르시아 왕 목록에 그를 넣지 않습니다. 넣으면 왕조의 성격이 흐려집니다.",
      "그는 323년 바빌론에서 죽습니다. 부하는 제국을 나눕니다. 이란과 메소포타미아의 대부분은 셀레우코스에게 가고, 티그리스강에 셀레우키아가 생깁니다. 그리스어와 그리스 도시 제도가 이란 왕실의 옛 땅 위에 한동안 얹힙니다.",
      "이 시기를 여기서 길게 쓰지 않는 이유는 따로 있습니다. 마케도니아와 그리스 도시 쪽은 그리스이야기가, 이집트 입성은 이집트이야기가 이미 적고 있습니다. 페르시아이야기의 다음 칸은, 그 질서가 북동쪽에서 풀리며 나타나는 파르티아입니다.",
    ],
    links: [
      { href: "/wars/alexander", label: "알렉산드로스의 원정" },
      { href: "/rulers/darius-iii", label: "다레이오스 3세" },
      { href: "https://greece-stories.vercel.app/wars/alexander-campaigns", label: "그리스이야기의 원정" },
    ],
  },
  {
    id: "parthian",
    en: "PARTHIA",
    title: "파르티아",
    years: "대략 기원전 247–서기 224년",
    paragraphs: [
      "아르사케스가 셀레우코스 세력의 가장자리에서 나라를 세운 해를 기원전 247년 무렵으로 잡는 전통이 있습니다. 초기의 중심은 투르크메니스탄·이란 북동쪽에 가깝고, 미트라다테스 1세 때 메디아와 메소포타미아로 넓어집니다.",
      "왕은 왕중왕을 칭하지만, 큰 가문이 군사와 땅을 나누어 가집니다. 아케메네스의 총독 장부와 같은 중앙 집권으로 보면 어긋납니다. 주화의 글자는 오랫동안 그리스어입니다.",
      "로마가 이 나라를 얕보고 들어온 전투가 기원전 53년 카르헤입니다. 크라수스가 지고, 군단기를 잃습니다. 파르티아는 그 뒤로도 내부의 왕위 다툼이 잦다가, 224년 무렵 파르스 출신의 아르다시르에게 왕위를 내줍니다.",
    ],
    links: [
      { href: "/rulers/mithridates-i", label: "미트라다테스 1세" },
      { href: "/wars/carrhae", label: "카르헤" },
      { href: "/places/ctesiphon", label: "크테시폰" },
    ],
  },
  {
    id: "sasanian",
    en: "SASANIAN",
    title: "사산",
    years: "서기 224–651년",
    paragraphs: [
      "아르다시르 1세가 파르티아의 아르타바누스 4세를 이기고 사산 왕조를 엽니다. 왕실이 귀족 위의 왕중왕임을 다시 선언하고, 조로아스터교의 제도도 이 시대에 더 분명해집니다. 아케메네스와 같은 종교 국가였다고 소급하면 안 됩니다. 그 차이는 신앙 글에 있습니다.",
      "샤푸르 1세는 260년 로마 황제 발레리아누스를 사로잡습니다. 호스로 1세는 6세기에 세금과 군사를 고치고 비잔티움과 오래 싸웁니다. 크테시폰의 벽돌 아치는 이 왕조의 수도가 어떤 규모였는지를 아직 보여 줍니다.",
      "7세기 초의 대전쟁으로 사산과 비잔티움이 함께 지칩니다. 카디시야와 니하반드 이후 야즈데게르드 3세의 왕조가 651년 무렵 끝납니다. 페르시아어와 사람들의 삶은 그 해에 멈추지 않습니다. 이 사이트의 범위는 왕조가 끝나는 자리까지입니다.",
    ],
    links: [
      { href: "/rulers/ardashir-i", label: "아르다시르 1세" },
      { href: "/rulers/shapur-i", label: "샤푸르 1세" },
      { href: "/rulers/khosrow-i", label: "호스로 1세" },
      { href: "/wars/fall-of-sasanians", label: "사산의 끝" },
    ],
  },
];

export default function ErasPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd data={articleLd({ title: "시대", description, path: "/eras" })} />
      <Crumb items={[{ label: "시대" }]} />
      <p className="mt-6 text-xs tracking-[0.2em] text-terra">ERAS</p>
      <h1 className="mt-2 font-serif text-4xl text-ink">시대</h1>
      <p className="mt-4 text-sm leading-7 text-muted">
        연대는 교과서와 개설서에서 널리 쓰는 눈금입니다. 왕 한 사람의 즉위 해가 기록마다 한두 해 다를 때는
        ‘대략’을 붙였습니다. 없는 연도를 메우지 않았습니다.
      </p>
      <div className="mt-8 space-y-10">
        {sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-28">
            <p className="text-[11px] tracking-[0.16em] text-terra">{section.en}</p>
            <h2 className="mt-1 font-serif text-2xl text-ink">{section.title}</h2>
            <p className="mt-1 text-xs text-muted">{section.years}</p>
            <div className="mt-3 space-y-3 text-sm leading-7 text-ink">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {section.links.map((link) => (
                <li key={link.href}>
                  {link.href.startsWith("http") ? (
                    <a
                      href={link.href}
                      className="rounded-full border border-line bg-card px-3 py-1.5 text-sm text-laurel hover:border-terra"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="rounded-full border border-line bg-card px-3 py-1.5 text-sm text-laurel hover:border-terra"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
