import type { Metadata } from "next";
import { Crumb } from "@/components/ArticleBits";
import { JsonLd } from "@/components/JsonLd";
import { articleLd, pageMeta } from "@/lib/seo";

const description =
  "헤로도토스, 왕실 비문, 아리아노스, 플루타르코스와 현대 개설. 페르시아이야기가 문장을 지어내지 않는 기준입니다.";

export const metadata: Metadata = pageMeta({
  title: "출처",
  description,
  path: "/sources",
});

const ancient = [
  {
    title: "헤로도토스 『역사』",
    note: "그리스-페르시아 전쟁의 가장 긴 이야기. 기원전 5세기의 관찰이자, 그리스 청중을 위한 서술입니다. 일화와 병력 수는 그대로 사실로 받지 않습니다.",
  },
  {
    title: "아케메네스 왕실 비문",
    note: "베히스툰, 페르세폴리스와 수사의 창건문, 나크시 루스탐의 무덤 비문. 왕의 자기 설명입니다. 반란과 신전을 왕의 편에서 적습니다.",
  },
  {
    title: "키루스 원통과 바빌론 연대기",
    note: "기원전 539년 바빌론 입성의 메소포타미아 쪽 기록. 원통은 인권 선언이 아니라 신전 회복의 왕실 문서입니다.",
  },
  {
    title: "페르세폴리스 행정 점토판",
    note: "엘람어 배급 기록. 궁전의 곡식과 일꾼, 왕실 여성의 살림을 보여 줍니다. 전기는 아닙니다.",
  },
  {
    title: "크세노폰 『키루스의 교육』",
    note: "이상적인 통치자를 가르치는 글입니다. 키루스의 연대기로 쓰지 않습니다.",
  },
  {
    title: "아이스킬로스 『페르시아인』",
    note: "살라미스 직후의 아테네 비극입니다. 역사서와 다른 칸에 둡니다.",
  },
  {
    title: "아리아노스 『알렉산드로스 원정기』",
    note: "원정의 골격. 이수스, 가우가멜라, 다레이오스의 죽음.",
  },
  {
    title: "플루타르코스와 디오도로스",
    note: "알렉산드로스의 성격, 페르세폴리스 화재, 카르헤의 크라수스. 일화가 많고, 화재의 원인은 아리아노스와 갈립니다.",
  },
  {
    title: "샤푸르 1세 비문",
    note: "나크시 루스탐의 카바예 조로아스터. 로마 원정과 발레리아누스 포로를 왕의 목소리로 적습니다.",
  },
  {
    title: "프로코피오스, 타바리",
    note: "6세기 로마-사산 전쟁, 그리고 이슬람 정복기의 후대 아랍어 연대기. 야즈데게르드의 최후는 이 후대 서술 쪽입니다.",
  },
];

const modern = [
  {
    title: "피에르 브리앙, 키루스에서 알렉산드로스까지",
    note: "아케메네스 제국 통사로 자주 권해지는 현대 개설입니다. 프랑스어 원저와 영어판이 있습니다. 문장을 옮기지 않았습니다.",
  },
  {
    title: "요제프 비제회퍼, 고대 페르시아",
    note: "아케메네스에서 사산까지를 한 권으로 잡는 입문입니다. 시대를 나누는 뼈대로 참고했습니다.",
  },
  {
    title: "마리아 브로시우스, 페르시아 여성과 제국",
    note: "왕실 여성과 페르세폴리스 문서를 읽는 연구입니다. 이 사이트의 일상 글은 그 결론의 범위만 짧게 적습니다.",
  },
  {
    title: "아멜리 쿠르트, 페르시아 제국 사료집",
    note: "비문과 그리스 기록을 모아 둔 영어 사료집입니다. 번역문을 그대로 싣지 않고, 어떤 기록이 있는지만 확인하는 데 썼습니다.",
  },
];

export default function SourcesPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd data={articleLd({ title: "출처", description, path: "/sources" })} />
      <Crumb items={[{ label: "출처" }]} />
      <p className="mt-6 text-xs tracking-[0.2em] text-terra">SOURCES</p>
      <h1 className="mt-2 font-serif text-4xl text-ink">출처</h1>
      <div className="mt-4 space-y-3 text-sm leading-7 text-muted">
        <p>
          페르시아이야기의 글은 아래 고대 기록과 공개된 연구 정리를 참고해 우리말로 다시 쓴 것입니다.
          고대 문장이나 현대 책의 문장을 그대로 옮기지 않았습니다. 인용문을 만들지 않았고, 기록이 없는
          숫자와 대사를 채워 넣지 않았습니다.
        </p>
        <p>
          왕실 비문은 왕의 편입니다. 헤로도토스와 플루타르코스는 그리스·로마의 편인 경우가 많습니다.
          양쪽이 다르면 다르다고 적었습니다. 전설은 전설이라고 적습니다.
        </p>
      </div>
      <section className="mt-10">
        <h2 className="font-serif text-2xl text-ink">고대 기록</h2>
        <ul className="mt-4 space-y-4">
          {ancient.map((item) => (
            <li key={item.title}>
              <p className="font-medium text-ink">{item.title}</p>
              <p className="mt-1 text-sm leading-7 text-muted">{item.note}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-10">
        <h2 className="font-serif text-2xl text-ink">현대 개설</h2>
        <p className="mt-2 text-sm leading-7 text-muted">
          한국어 번역의 서지 사항이 불확실한 책은 번역서 정보를 지어 적지 않았습니다. 저자와 다루는
          범위만 적습니다.
        </p>
        <ul className="mt-4 space-y-4">
          {modern.map((item) => (
            <li key={item.title}>
              <p className="font-medium text-ink">{item.title}</p>
              <p className="mt-1 text-sm leading-7 text-muted">{item.note}</p>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
