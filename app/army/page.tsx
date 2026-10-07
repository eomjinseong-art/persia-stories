import type { Metadata } from "next";
import Link from "next/link";
import { Crumb, MovieList, Sources } from "@/components/ArticleBits";
import { JsonLd } from "@/components/JsonLd";
import { articleLd, pageMeta } from "@/lib/seo";

const description =
  "아케메네스의 궁수와 기병, 헤로도토스가 전한 불멸 부대, 동맹 함대, 파르티아 기마 궁수와 사산 중장기병. 영화의 괴물 군단과 기록을 나눕니다.";

export const metadata: Metadata = pageMeta({
  title: "군대",
  description,
  path: "/army",
});

const sections = [
  {
    title: "영화의 군대부터 빼세요",
    body: [
      "『300』의 코뿔소, 괴물, 폭발하는 기름은 만화의 소품입니다. 헤로도토스도 과장하지만, 그가 적는 것은 사람이 끄는 궁수와 기병, 배와 창입니다. 괴물은 어느 쪽 기록에도 없습니다.",
      "그리스 작가가 적은 페르시아 병력 수는 현대 연구가 병참으로 받아들이기 어렵습니다. ‘큰 군대’와 ‘그 숫자 그대로’를 구분합니다. 여기서 병력 수를 새로 만들지 않습니다.",
    ],
  },
  {
    title: "불멸 부대는 그리스어 별명입니다",
    body: [
      "헤로도토스는 만 명을 유지하는 친위대를 불멸자(아타나토이)라고 부릅니다. 한 사람이 죽으면 숫자를 채워 불멸처럼 보였다는 설명입니다. 페르시아어 이름은 알려져 있지 않습니다.",
      "페르세폴리스와 수사의 궁수 부조가 이 부대의 초상이라고 단정하기도 어렵습니다. 창과 활, 화려한 예복을 입은 호위라는 그림은 궁정 미술과 헤로도토스가 같이 가리키는 범위까지만 말할 수 있습니다.",
    ],
  },
  {
    title: "활과 말, 그리고 남의 배",
    body: [
      "그리스 중장보병이 큰 방패와 창의 밀집이라면, 페르시아 보병의 강점으로 자주 적히는 것은 활입니다. 큰 방패 뒤에 궁수를 두는 대형도 그리스 기록이 전합니다. 기병은 이란 고원의 전통이고, 그리스 도시국가가 약한 쪽이었습니다. 마라톤과 플라타이아는 그 차이가 항상 페르시아의 승리로 끝나지 않았다는 뜻이기도 합니다.",
      "살라미스의 함대는 페르시아 본토의 노 젓는 시민이 아니었습니다. 페니키아, 이집트, 키프로스, 이오니아 등 제국 안의 바다 민족이 배를 냈습니다. 아르테미시아는 카리아의 여왕으로 그 함대에 있었습니다. 영화가 그녀에게 붙인 복수극은 극본입니다.",
    ],
  },
  {
    title: "파르티아와 사산은 말이 더 무거워집니다",
    body: [
      "카르헤에서 로마 군단을 무너뜨린 조합은 기마 궁수와 중장기병입니다. 평원에서 활로 대열을 흔들고, 갑옷 입은 말이 틈을 칩니다. 파르티아 귀족이 이 기병을 대는 구조라, 왕의 상비군만으로 설명하면 부족합니다.",
      "사산 시대의 기병은 더 두꺼운 갑주로 기억됩니다. 아스와란이라고 부르는 중장기병입니다. 로마가 동부 국경에서 기병을 키운 이유 중 하나가 이 상대였습니다. 보병과 공성, 코끼리 기록도 있지만, 길을 잡는 이미지는 말입니다.",
    ],
  },
];

export default function ArmyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd data={articleLd({ title: "군대", description, path: "/army" })} />
      <Crumb items={[{ label: "군대" }]} />
      <p className="mt-6 text-xs tracking-[0.2em] text-terra">ARMY</p>
      <h1 className="mt-2 font-serif text-4xl text-ink">군대</h1>
      <p className="mt-4 text-sm leading-7 text-muted">
        훈련 교범은 남아 있지 않습니다. 왕실 부조, 헤로도토스, 로마 쪽 패전 기록이 서로 다른 세기를 말해
        줍니다. 아케메네스와 사산을 한 군대처럼 적지 않습니다.
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
      <p className="mt-8 text-sm leading-7 text-muted">
        보급은{" "}
        <Link href="/places/royal-road" className="text-laurel underline decoration-line underline-offset-4 hover:text-terra">
          왕의 길
        </Link>
        과 닿아 있습니다. 전투의 결과는{" "}
        <Link href="/wars/xerxes-invasion" className="text-laurel underline decoration-line underline-offset-4 hover:text-terra">
          그리스 원정
        </Link>
        ,{" "}
        <Link href="/wars/carrhae" className="text-laurel underline decoration-line underline-offset-4 hover:text-terra">
          카르헤
        </Link>
        ,{" "}
        <Link href="/wars/edessa" className="text-laurel underline decoration-line underline-offset-4 hover:text-terra">
          에데사
        </Link>
        에 나누어 두었습니다.
      </p>
      <MovieList slugs={["300", "300-rise"]} />
      <Sources
        items={[
          { title: "헤로도토스 『역사』 7권", note: "불멸 부대와 원정군의 구성. 숫자는 그대로 믿지 않음" },
          { title: "플루타르코스 『영웅전』 크라수스", note: "카르헤의 기마 궁수와 중장기병" },
          { title: "수사·페르세폴리스 부조", note: "창과 활을 든 호위의 궁정 미술" },
        ]}
      />
    </article>
  );
}
