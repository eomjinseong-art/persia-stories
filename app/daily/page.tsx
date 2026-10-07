import type { Metadata } from "next";
import Link from "next/link";
import { Crumb, MovieList, Sources } from "@/components/ArticleBits";
import { JsonLd } from "@/components/JsonLd";
import { articleLd, pageMeta } from "@/lib/seo";

const description =
  "총독과 공납, 페르세폴리스의 배급 점토판, 왕의 길의 전령, 밥과 카나트. 궁정 연회가 아닌 아케메네스 시대의 하루에 가깝게 적습니다.";

export const metadata: Metadata = pageMeta({
  title: "일상",
  description,
  path: "/daily",
});

const sections = [
  {
    title: "수도가 하나가 아니었습니다",
    body: [
      "왕은 한 궁전에만 있지 않았습니다. 수사는 문서와 궁정이 일하는 도시, 페르세폴리스는 파르스의 의례와 창고, 엑바타나는 고원의 여름, 바빌론은 메소포타미아의 옛 수도였습니다. ‘페르세폴리스가 수도’라고만 외우면 나머지 세 자리가 사라집니다.",
      "먼 지역은 사트라프, 곧 총독이 다스렸습니다. 총독은 작은 왕이 되기 쉬웠고, 왕은 왕의 길과 감찰로 그들을 붙들었습니다. 헤로도토스의 세금 구역 스무 개와 왕실 비문의 속주 목록은 숫자가 같지 않습니다. 하나만 외우지 않는 편이 정확합니다.",
    ],
  },
  {
    title: "돈과 곡식은 같이 움직였습니다",
    body: [
      "금화 다리크와 은화 시글로스는 다레이오스 시대와 묶여 기억됩니다. 그래도 공납의 상당수는 곡식, 가축, 말, 특산물이었습니다. 동전만 오가는 현대의 세금과 같다고 말하면 틀립니다.",
      "페르세폴리스에서 나온 엘람어 점토판은 하루치 배급을 적습니다. 포도주, 곡식, 양을 누가 받았는지가 짧게 남아 있습니다. 궁전 부조의 예복과 창고의 계량이 같은 나라의 두 기록입니다.",
    ],
  },
  {
    title: "말은 왕명을, 사람은 밭을 맡았습니다",
    body: [
      "헤로도토스는 사르디스에서 수사까지 도보로 90일, 역참 111곳이라고 적습니다. 왕실 전령은 말을 갈아타며 그보다 빨리 갔습니다. 대부분의 사람은 그 길을 여행하지 않았습니다. 보리와 밀, 대추, 포도주, 계절의 고기가 마을의 밥이었습니다.",
      "건조한 이란에서는 카나트, 곧 지하 물길이 밭을 살렸습니다. 아케메네스 왕이 발명한 기술은 아닙니다. 더 이른 시기부터 쓰이던 물길을 제국이 이어 받은 쪽에 가깝습니다. 담장을 친 정원, 파라데이소스는 왕과 귀족의 사냥과 그늘이었습니다. 영어 paradise의 먼 친척이라는 말은 어원 이야기고, 당시 사람들의 종교 용어는 아닙니다.",
    ],
  },
  {
    title: "글은 여러 언어였습니다",
    body: [
      "왕이 과시하는 비문은 고대 페르시아어로 쐐기문자에 새긴 경우가 많습니다. 창고와 일터의 점토판은 엘람어가 많고, 제국 서쪽의 행정 서신에는 아람어가 널리 쓰였습니다. 한 나라의 공용어가 하나였다고 보면 문서가 설명되지 않습니다.",
      "페르세폴리스 배급 문서에는 왕실 여성의 이름과 그들의 일꾼 무리가 나옵니다. 이르타슈두나(그리스 기록의 아르티스토네)와 이르다바마가 그런 이름입니다. 궁정의 여자가 모두 연회의 배경은 아니었습니다. 다만 그 판은 전기가 아니라 식량 장부입니다. 성격을 소설로 늘리지 않습니다.",
    ],
  },
  {
    title: "일꾼과 노예의 자리는 나중에 붙인 말과 다릅니다",
    body: [
      "점토판의 쿠르타시는 왕실 경제에 묶인 일꾼입니다. 곡식을 받고 일을 했습니다. 로마 시대의 매매되는 노예와 똑같은 제도라고 번역하면 어긋납니다. 의존 노동자, 또는 부역에 묶인 사람에 가깝게 읽는 연구가 많습니다.",
      "전쟁 포로와 이주 집단도 있었습니다. 키루스가 바빌론의 신상을 되돌렸다는 문서와, 페르세폴리스가 일꾼을 부렸다는 장부는 모순이 아니라 다른 층의 기록입니다. 관용만 남기거나 착취만 남기면 둘 중 하나의 문서가 사라집니다.",
    ],
  },
];

export default function DailyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd data={articleLd({ title: "일상", description, path: "/daily" })} />
      <Crumb items={[{ label: "일상" }]} />
      <p className="mt-6 text-xs tracking-[0.2em] text-terra">DAILY LIFE</p>
      <h1 className="mt-2 font-serif text-4xl text-ink">일상</h1>
      <p className="mt-4 text-sm leading-7 text-muted">
        영화의 연회는 왕과 측근의 며칠입니다. 아래는 아케메네스 시대를 중심으로, 기록에 남는 살림만
        골랐습니다. 파르티아와 사산의 마을까지 같은 하루였다고 쓰지 않습니다. 시대가 다르면 밥상도 다릅니다.
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
          </section>
        ))}
      </div>
      <p className="mt-8 text-sm leading-7">
        <Link href="/places/royal-road" className="text-laurel underline decoration-line underline-offset-4 hover:text-terra">
          왕의 길
        </Link>
        과{" "}
        <Link href="/places/persepolis" className="text-laurel underline decoration-line underline-offset-4 hover:text-terra">
          페르세폴리스
        </Link>
        ,{" "}
        <Link href="/faith" className="text-laurel underline decoration-line underline-offset-4 hover:text-terra">
          신앙
        </Link>
        으로 이어집니다.
      </p>
      <MovieList slugs={["300", "alexander-2004"]} />
      <Sources
        items={[
          { title: "헤로도토스 『역사』 3권과 5권", note: "공납 목록과 왕의 길. 그리스 관찰자의 정리" },
          { title: "페르세폴리스 요새 문서", note: "엘람어 배급 점토판. 일꾼과 왕실 살림" },
          { title: "수사 궁전 창건 비문", note: "궁전에 모인 자재와 장인" },
        ]}
      />
    </article>
  );
}
