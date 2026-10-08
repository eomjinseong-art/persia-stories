import type { Metadata } from "next";
import Link from "next/link";
import { Crumb } from "@/components/ArticleBits";
import { JsonLd } from "@/components/JsonLd";
import { rulerGroups, rulers } from "@/content/rulers";
import { articleLd, pageMeta } from "@/lib/seo";

const description =
  "아케메네스의 키루스, 다레이오스 1세, 크세르크세스와 파르티아·사산에서 길을 잡는 왕. 전체 명단이 아닌 짧은 전기입니다.";

export const metadata: Metadata = pageMeta({
  title: "왕",
  description,
  path: "/rulers",
});

export default function RulersPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd data={articleLd({ title: "왕", description, path: "/rulers" })} />
      <Crumb items={[{ label: "왕" }]} />
      <p className="mt-6 text-xs tracking-[0.2em] text-terra">RULERS</p>
      <h1 className="mt-2 font-serif text-4xl text-ink">왕</h1>
      <p className="mt-4 text-sm leading-7 text-muted">
        아케메네스 왕만 세도 이백 년이 넘습니다. 파르티아와 사산까지 더하면 명단은 교과서가 됩니다. 여기서는
        제국이 생기고, 그리스와 부딪히고, 왕조가 바뀌는 자리에 서 있던 {rulers.length}명만 골랐습니다.
        알렉산드로스는 페르시아 왕이 아니라서 전쟁 글에 있습니다. 누가 누구의 자녀인지는{" "}
        <Link href="/family-tree" className="text-laurel underline decoration-line underline-offset-4 hover:text-terra">
          가족관계도
        </Link>에 그렸습니다.
      </p>
      <div className="mt-10 space-y-12">
        {rulerGroups.map((group) => (
          <section key={group.id} aria-labelledby={group.id}>
            <h2 id={group.id} className="font-serif text-2xl text-ink">
              {group.title}
            </h2>
            <p className="mt-2 text-sm leading-7 text-muted">{group.note}</p>
            <div className="mt-4 space-y-4">
              {rulers
                .filter((ruler) => ruler.group === group.id)
                .map((ruler) => (
                  <Link
                    key={ruler.slug}
                    href={`/rulers/${ruler.slug}`}
                    className="block rounded-lg border border-line bg-card p-5 hover:border-terra"
                  >
                    <p className="text-[11px] tracking-[0.14em] text-terra">{ruler.nameEn}</p>
                    <p className="mt-1 text-xs text-muted">{ruler.status}</p>
                    <h3 className="mt-1 font-serif text-2xl text-ink">{ruler.nameKo}</h3>
                    <p className="mt-1 text-xs text-muted">
                      {ruler.formal} · {ruler.years}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-muted">{ruler.summary}</p>
                  </Link>
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
