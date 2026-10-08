import type { Metadata } from "next";
import Link from "next/link";
import { Crumb, Sources } from "@/components/ArticleBits";
import { FamilyTreeView } from "@/components/FamilyTreeView";
import { JsonLd } from "@/components/JsonLd";
import { getRuler } from "@/content/rulers";
import {
  DISPUTES,
  FAMILY_SOURCES,
  NAME_NOTES,
  TREE_LIST,
  TREE_TABS,
  relationsOf,
  type TreeId,
} from "@/data/family-tree";
import { articleLd, pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

const description =
  "아케메네스 왕조의 가계도. 키루스 가문과 다레이오스의 다른 갈래, 바르디야와 가우마타의 논쟁, 파르티아와 사산의 짧은 왕위. 재위 해를 적고, 불확실한 관계는 점선으로 구분합니다.";

export const metadata: Metadata = {
  ...pageMeta({
    title: "가족관계도",
    description,
    path: "/family-tree",
  }),
  keywords: [
    "가족관계도",
    "아케메네스 가계",
    "키루스",
    "고레스",
    "다레이오스",
    "바르디야",
    "가우마타",
    "파르티아",
    "사산 왕조",
    "페르시아 왕",
  ],
};

for (const node of TREE_LIST.flatMap((tree) => tree.nodes)) {
  if (node.slug && !getRuler(node.slug)) {
    throw new Error(`가족관계도 slug에 해당하는 왕 페이지가 없습니다: ${node.slug}`);
  }
}

const listed = TREE_LIST.flatMap((tree) => tree.nodes.filter((node) => node.href));

function focusHref(treeId: TreeId, id: string) {
  const treeQuery = treeId === "achaemenid" ? "" : `tree=${treeId}&`;
  return `/family-tree?${treeQuery}focus=${id}`;
}

export default function FamilyTreePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <JsonLd data={articleLd({ title: "가족관계도", description, path: "/family-tree" })} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "페르시아 왕 가족관계도",
          itemListElement: listed.map((node, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: `${node.ko} (${node.roman})`,
            url: `${site.url}${node.href}`,
          })),
        }}
      />
      <Crumb items={[{ label: "가족관계도" }]} />
      <p className="mt-6 text-xs tracking-[0.2em] text-terra">FAMILY TREE</p>
      <h1 className="mt-2 font-serif text-4xl text-ink">가족관계도</h1>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-muted">
        아케메네스 왕조를 중심으로, 누가 누구의 자녀인지 세대별로 그린 가계도입니다. 키루스 2세는 캄비세스
        1세의 아들이고, 다레이오스 1세는 그 아들이 아니라 히스타스페스의 아들입니다. 금색 선은 부모와
        자녀, 붉은 선은 배우자, 보라 점선은 불확실하거나 논쟁인 관계입니다. 「…」는 그 사이 왕위를 접어 둔
        표시이고, 부자 관계가 아닙니다. 칸을 누르면 부모·배우자·자녀·형제가 밝아집니다.
      </p>
      <FamilyTreeView />

      <section className="mt-12">
        <h2 className="font-serif text-2xl text-ink">글로 읽는 가족관계</h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-muted">
          그림과 같은 관계입니다. 이름을 누르면 가계도에서 그 칸으로 이동합니다. 이 사이트에 글이 있는 왕은
          따로 링크했습니다. 안샨은 오늘의 이란 남서쪽에 있던 옛 나라이고, 방계는 직계 아들이 아닌 가문의
          다른 가지입니다.
        </p>
        {TREE_TABS.map((tab) => {
          const tree = TREE_LIST.find((item) => item.id === tab.id)!;
          return (
            <section key={tab.id} className="mt-8" aria-labelledby={`prose-${tab.id}`}>
              <h3 id={`prose-${tab.id}`} className="font-serif text-xl text-ink">
                {tab.ko} <span className="text-sm font-sans tracking-wide text-terra">{tab.en}</span>
              </h3>
              {tree.bands.map((band) => (
                <div key={band.id} className="mt-6">
                  <h4 className="font-serif text-lg" style={{ color: band.color }}>
                    {band.ko}
                  </h4>
                  <p className="mt-1 text-sm leading-6 text-muted">{band.hint}</p>
                  <ul className="mt-3 space-y-4">
                    {band.nodeIds.map((id) => {
                      const node = tree.byId.get(id)!;
                      const rel = relationsOf(tree, id);
                      return (
                        <li key={id} className="border-b border-line/80 pb-3 text-sm leading-7">
                          <a href={focusHref(tree.id, node.id)} className="font-serif text-base text-ink hover:text-terra">
                            {node.gap ? "사이 왕위" : node.ko}
                          </a>
                          <span className="text-muted"> / {node.gap ? node.caption : node.roman}</span>
                          {node.native ? <span className="ml-2 text-terra">{node.native}</span> : null}
                          {node.href ? (
                            <Link href={node.href} className="ml-2 text-laurel underline decoration-line underline-offset-4 hover:text-terra">
                              이 사이트의 글
                            </Link>
                          ) : null}
                          {node.also?.map((link) => (
                            <a
                              key={link.href}
                              href={link.href}
                              className="ml-2 text-laurel underline decoration-line underline-offset-4 hover:text-terra"
                              rel="noopener noreferrer"
                            >
                              {link.label}
                            </a>
                          ))}
                          <span className="mt-0.5 block text-ink">{node.summary}</span>
                          {node.note ? <span className="mt-0.5 block text-xs leading-5 text-[#6d4c8a]">{node.note}</span> : null}
                          <span className="mt-1 block text-xs leading-5 text-muted">
                            <Kin treeId={tree.id} label="부모" people={rel.parents} />
                            <Kin treeId={tree.id} label="불확실한 부모" people={rel.variantParents} />
                            <Kin treeId={tree.id} label="배우자" people={rel.spouses} />
                            <Kin treeId={tree.id} label="불확실한 배우자" people={rel.variantSpouses} />
                            <Kin treeId={tree.id} label="자녀" people={rel.children} />
                            <Kin treeId={tree.id} label="불확실한 자녀" people={rel.variantChildren} />
                            <Kin treeId={tree.id} label="논쟁으로 겹침" people={rel.disputes} />
                            <Kin treeId={tree.id} label="사이 왕위" people={rel.succession} />
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </section>
          );
        })}
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-2xl text-ink">점선으로 둔 것</h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-muted">
          금색 실선은 비문과 원통, 또는 이 사이트의 왕 글이 부자로 보는 관계입니다. 보라 점선은 한 기록만
          말하거나, 이긴 왕의 주장인 자리입니다.
        </p>
        <ul className="mt-4 space-y-4">
          {DISPUTES.map((item) => (
            <li key={item.id} className="rounded-md border border-line bg-card p-4 text-sm leading-7">
              <h3 className="font-serif text-lg text-ink">{item.title}</h3>
              <p className="mt-1">
                <span className="text-terra">기준. </span>
                {item.main}
              </p>
              <p className="mt-1 text-muted">{item.other}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-xl text-ink">이름을 읽을 때</h2>
        <ul className="mt-3 space-y-2 text-sm leading-7 text-muted">
          {NAME_NOTES.map((note) => (
            <li key={note.title}>
              <span className="text-ink">{note.title}. </span>
              {note.body}
            </li>
          ))}
        </ul>
      </section>

      <Sources items={[...FAMILY_SOURCES]} />
    </div>
  );
}

function Kin({
  treeId,
  label,
  people,
}: {
  treeId: TreeId;
  label: string;
  people: { id: string; ko: string }[];
}) {
  if (!people.length) return null;
  return (
    <span className="mr-3 inline">
      {label}{" "}
      {people.map((person, index) => (
        <span key={person.id}>
          {index > 0 ? ", " : null}
          <a href={focusHref(treeId, person.id)} className="text-laurel underline decoration-line underline-offset-2 hover:text-terra">
            {person.ko === "…" ? "사이 왕위" : person.ko}
          </a>
        </span>
      ))}
    </span>
  );
}
