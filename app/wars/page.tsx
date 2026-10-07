import type { Metadata } from "next";
import Link from "next/link";
import { Crumb } from "@/components/ArticleBits";
import { JsonLd } from "@/components/JsonLd";
import { wars } from "@/content/wars";
import { articleLd, pageMeta } from "@/lib/seo";

const description =
  "바빌론 입성, 마라톤, 크세르크세스의 원정, 알렉산드로스, 카르헤, 에데사, 사산의 끝. 왜 싸웠는지와 끝나서 바뀐 것만 적습니다.";

export const metadata: Metadata = pageMeta({
  title: "전쟁",
  description,
  path: "/wars",
});

export default function WarsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd data={articleLd({ title: "전쟁", description, path: "/wars" })} />
      <Crumb items={[{ label: "전쟁" }]} />
      <p className="mt-6 text-xs tracking-[0.2em] text-terra">WARS</p>
      <h1 className="mt-2 font-serif text-4xl text-ink">전쟁</h1>
      <p className="mt-4 text-sm leading-7 text-muted">
        페르시아의 영토는 연설보다 전쟁에서 늘고 줄었습니다. 각 카드는 왜 싸웠는지, 누구와 싸웠는지, 끝나서
        무엇이 바뀌었는지만 먼저 보여 줍니다. 그리스·로마·이집트가 본 같은 전쟁은 자매 사이트로 이어 둡니다.
      </p>
      <div className="mt-8 space-y-4">
        {wars.map((war) => (
          <article key={war.slug} className="rounded-lg border border-line bg-card p-5">
            <p className="text-[11px] tracking-[0.14em] text-terra">{war.nameEn.toUpperCase()}</p>
            <h2 className="mt-1 font-serif text-2xl text-ink">
              <Link href={`/wars/${war.slug}`} className="hover:text-terra">
                {war.nameKo}
              </Link>
            </h2>
            <p className="mt-1 text-xs text-muted">{war.years}</p>
            <p className="mt-3 text-sm leading-7 text-muted">{war.summary}</p>
            <dl className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                ["왜", war.why],
                ["누구", war.who],
                ["결과", war.result],
              ].map(([label, text]) => (
                <div key={label}>
                  <dt className="text-xs text-terra">{label}</dt>
                  <dd className="mt-1 text-sm leading-6 text-ink">{text}</dd>
                </div>
              ))}
            </dl>
            <Link href={`/wars/${war.slug}`} className="mt-4 inline-block text-sm text-terra">
              세 가지 포인트와 조금만 더 →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
