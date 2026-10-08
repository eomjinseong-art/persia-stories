import type { Metadata } from "next";
import { Crumb, Elsewhere, Sources } from "@/components/ArticleBits";
import { JsonLd } from "@/components/JsonLd";
import { articleLd, pageMeta } from "@/lib/seo";
import { outboundProps, type LinkRef } from "@/lib/site";

const description =
  "아케메네스 비문의 아후라 마즈다와 사산 시대의 조로아스터교를 짧게, 깎지 않고 구분합니다. 예배 안내가 아닙니다.";

export const metadata: Metadata = pageMeta({
  title: "신앙",
  description,
  path: "/faith",
});

const sections: { title: string; body: string[]; elsewhere?: LinkRef[] }[] = [
  {
    title: "이 글은 예배 안내가 아닙니다",
    body: [
      "조로아스터교는 오늘날에도 이어지는 종교입니다. 여기서는 고대 왕이 남긴 문장과, 시대마다 제도가 어떻게 달랐는지만 적습니다. 의례의 순서를 가르치거나, 믿음을 평가하지 않습니다.",
      "그리스·로마 신의 이야기는 나두신화에 있습니다. 페르시아 왕실의 신 이름을 제우스와 같은 칸에 넣지 않습니다. 닿는 지점이 있어도, 같은 신화가 아닙니다.",
    ],
  },
  {
    title: "비문이 말하는 신",
    body: [
      "다레이오스와 크세르크세스의 고대 페르시아어 비문은 아후라 마즈다가 왕을 세웠다고 반복합니다. 왕은 그 신의 뜻을 따라 거짓을 벌한다고 말합니다. 이것은 신앙 고백인 동시에 왕권의 문장입니다.",
      "키루스 원통의 신은 바빌론의 마르두크입니다. 왕이 정복한 도시의 언어로 신전을 회복하는 글과, 파르스에서 아후라 마즈다를 말하는 글이 한 왕조 안에 같이 있습니다. 하나를 지우고 다른 하나만 남기지 않습니다.",
    ],
  },
  {
    title: "‘처음부터 조로아스터교 국가’는 너무 빠른 말",
    body: [
      "조로아스터(자라투스트라)가 언제 살았는지는 학자마다 크게 다릅니다. 기원전 1000년보다 앞선다는 설부터, 기원전 6세기 무렵이라는 설까지 있습니다. 여기서 한 연대를 확정하지 않습니다.",
      "아케메네스 왕실이 아후라 마즈다를 높인 것은 분명합니다. 그 신앙이 사산 시대의 제도화된 조로아스터교와 같은 조직이었는지는 논쟁입니다. 불의 신전, 사제의 위계, 경전의 편집이 분명해지는 것은 대체로 더 늦은 시대입니다. 앞 시대에 소급해 ‘국교’라고 부르면 증거가 앞섭니다.",
    ],
  },
  {
    title: "불은 숭배의 대상이라기보다 깨끗한 자리로 이해됩니다",
    body: [
      "후대의 조로아스터교에서 불은 신 그 자체가 아니라, 깨끗함과 의식이 머무는 요소로 설명됩니다. ‘불을 섬기는 민족’이라는 옛 별명은 바깥에서 붙인 짧은 말이고, 당사자의 신학을 대신하지 못합니다.",
      "헤로도토스가 말하는 마고스(마기)는 제사와 점을 맡은 무리입니다. 베히스툰 비문의 가우마타도 마고스로 적힙니다. 같은 단어가 사제 집단과, 왕의 정적 이야기에 같이 쓰입니다. 하나를 다른 하나의 증거로 바로 넘기기는 어렵습니다.",
    ],
    elsewhere: [{ href: "https://the-chosen-korean.vercel.app/bible-books/matthew", label: "더 초즌의 마태복음" }],
  },
  {
    title: "사산 시대에는 제도가 더 분명해집니다",
    body: [
      "사산 왕실과 조로아스터교 사제단의 연결은 아케메네스 비문보다 뚜렷합니다. 샤푸르 1세의 재위에는 마니라는 다른 종교의 창시자도 활동합니다. 궁정이 한동안 그를 받아들였다는 전승이 있습니다. 한 종교만 있던 나라는 아니었습니다.",
      "제국 안에는 유대교, 그리스도교, 후기에는 불교가 닿은 동쪽 지역도 있었습니다. 박해와 공존이 시대마다 번갈아 기록됩니다. 어느 한 해를 전체의 정책으로 적지 않습니다.",
      "651년 무렵 사산 왕조가 끝난 뒤에도 조로아스터교 공동체는 남습니다. 일부는 인도로 건너가 오늘의 파르시 공동체로 이어진다는 역사가 있습니다. 그 이후의 삶은 이 글의 범위 밖입니다. 왕조가 끝났다고 신앙이 그 해에 삭제된 것은 아닙니다.",
    ],
  },
];

export default function FaithPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd data={articleLd({ title: "신앙", description, path: "/faith" })} />
      <Crumb items={[{ label: "신앙" }]} />
      <p className="mt-6 text-xs tracking-[0.2em] text-terra">BELIEF</p>
      <h1 className="mt-2 font-serif text-4xl text-ink">신앙</h1>
      <p className="mt-4 text-sm leading-7 text-muted">
        어려운 신학 용어는 줄였습니다. 없는 교리를 지어 넣지 않았고, 연대가 갈리는 곳은 갈린다고
        적었습니다.
      </p>
      <div className="mt-8 space-y-8">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="font-serif text-2xl text-ink">{section.title}</h2>
            <div className="mt-3 space-y-3 text-sm leading-7">
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            {section.elsewhere ? <Elsewhere links={section.elsewhere} /> : null}
          </section>
        ))}
      </div>
      <p className="mt-8 text-sm">
        <a
          href="https://nadoo-myth.vercel.app"
          className="text-laurel underline decoration-line underline-offset-4 hover:text-terra"
          {...outboundProps("https://nadoo-myth.vercel.app")}
        >
          나두신화에서 그리스 신 이야기 읽기 →
        </a>
      </p>
      <Sources
        items={[
          { title: "베히스툰과 다레이오스·크세르크세스 비문", note: "아후라 마즈다와 왕권" },
          { title: "키루스 원통", note: "바빌론의 마르두크로 적은 신전 회복" },
          { title: "헤로도토스 『역사』 1권", note: "페르시아 제사와 마고스에 대한 그리스 관찰" },
        ]}
      />
    </article>
  );
}
