"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  TREE_LIST,
  TREE_TABS,
  TREES,
  findExact,
  findFocus,
  relationsOf,
  searchInTree,
  type LayoutEdge,
  type LayoutNode,
  type TreeId,
} from "@/data/family-tree";

const GUEST = "#6f665b";

function edgePaint(edge: LayoutEdge, active: boolean, dimming: boolean) {
  const disputed = edge.kind === "variant-parent" || edge.kind === "variant-spouse" || edge.kind === "dispute";
  const spouse = edge.kind === "spouse";
  const ellipsis = edge.kind === "ellipsis";
  const color = disputed ? "#6d4c8a" : ellipsis ? "#8a8178" : spouse ? "#8c2f2b" : "#a6843d";
  let opacity = disputed ? 0.8 : ellipsis ? 0.85 : spouse ? 0.92 : edge.local ? 0.88 : 0.62;
  if (dimming) opacity = active ? 1 : 0.06;
  return {
    color,
    opacity,
    width: active ? 2.6 : edge.local ? 1.8 : 1.35,
    dash: disputed || ellipsis ? "5 4" : undefined,
  };
}

function relatedSet(treeId: TreeId, id: string) {
  const rel = relationsOf(TREES[treeId], id);
  const ids = new Set<string>([id]);
  for (const group of [
    rel.parents,
    rel.variantParents,
    rel.spouses,
    rel.variantSpouses,
    rel.children,
    rel.variantChildren,
    rel.siblings,
    rel.disputes,
    rel.succession,
  ]) {
    for (const person of group) ids.add(person.id);
  }
  return ids;
}

export function FamilyTreeView() {
  const [treeId, setTreeId] = useState<TreeId>("achaemenid");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [openSuggest, setOpenSuggest] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number } | null>(null);
  const listId = useId();
  const tree = TREES[treeId];
  const exactHere = findExact(query)?.treeId === treeId ? findExact(query) : null;
  const suggestions = useMemo(() => {
    const q = query.trim();
    if (!q || (exactHere && exactHere.treeId === treeId)) return [];
    const local = searchInTree(tree, q).slice(0, 6).map((node) => ({ node, treeId }));
    const rest = TREE_LIST.filter((item) => item.id !== treeId)
      .flatMap((item) => searchInTree(item, q).slice(0, 3).map((node) => ({ node, treeId: item.id })))
      .slice(0, 4);
    return [...local, ...rest].slice(0, 8);
  }, [exactHere, query, tree, treeId]);
  const selectedNode = selected ? tree.byId.get(selected) : undefined;
  const related = useMemo(() => (selected ? relatedSet(treeId, selected) : null), [selected, treeId]);
  const relations = selected ? relationsOf(tree, selected) : null;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const focus = params.get("focus");
    const requested = params.get("tree");
    if (focus) {
      const found = findFocus(focus);
      if (found) {
        setTreeId(found.treeId);
        setSelected(found.id);
        return;
      }
    }
    if (requested === "parthian" || requested === "sasanian" || requested === "achaemenid") {
      setTreeId(requested);
    }
  }, []);

  useEffect(() => {
    if (!selected) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(`ft-${selected}`)?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "center",
      inline: "center",
    });
  }, [selected, treeId]);

  function writeUrl(nextTree: TreeId, focus: string | null) {
    const url = new URL(window.location.href);
    if (nextTree === "achaemenid") url.searchParams.delete("tree");
    else url.searchParams.set("tree", nextTree);
    if (focus) url.searchParams.set("focus", focus);
    else url.searchParams.delete("focus");
    const next = `${url.pathname}${url.search}`;
    window.history.replaceState(null, "", next);
  }

  function choose(id: string, nextTree: TreeId = treeId, label?: string) {
    setTreeId(nextTree);
    setSelected(id);
    setOpenSuggest(false);
    if (label) setQuery(label);
    writeUrl(nextTree, id);
  }

  function showTree(next: TreeId) {
    setTreeId(next);
    setSelected(null);
    setQuery("");
    setOpenSuggest(false);
    writeUrl(next, null);
  }

  function closeCard() {
    setSelected(null);
    writeUrl(treeId, null);
  }

  function onQuery(value: string) {
    setQuery(value);
    setOpenSuggest(true);
    const found = findExact(value);
    if (found) choose(found.id, found.treeId);
  }

  return (
    <div>
      <div role="group" aria-label="왕조" className="mt-6 flex flex-wrap gap-2">
        {TREE_TABS.map((tab) => {
          const pressed = tab.id === treeId;
          return (
            <button
              key={tab.id}
              type="button"
              aria-pressed={pressed}
              className={`rounded-full px-3 py-2 text-sm ${pressed ? "bg-stone text-ink" : "border border-line bg-card text-muted hover:text-ink"}`}
              onClick={() => showTree(tab.id)}
            >
              {tab.ko}
              <span className="ml-2 text-[10px] tracking-[0.14em] text-terra">{tab.en}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <form
          className="relative w-full max-w-md"
          role="search"
          onSubmit={(event) => {
            event.preventDefault();
            const found = findExact(query);
            if (found) {
              choose(found.id, found.treeId, TREES[found.treeId].byId.get(found.id)?.ko);
              return;
            }
            const first = suggestions[0];
            if (first) choose(first.node.id, first.treeId, first.node.ko);
          }}
        >
          <label htmlFor="tree-find" className="text-xs text-muted">
            이름 찾기 · Find
          </label>
          <input
            id="tree-find"
            type="search"
            value={query}
            onChange={(event) => onQuery(event.target.value)}
            onFocus={() => setOpenSuggest(true)}
            placeholder="키루스, Cyrus, 다레이오스"
            aria-label="가족관계도에서 이름 찾기"
            aria-autocomplete="list"
            aria-controls={suggestions.length > 0 ? listId : undefined}
            className="mt-1 w-full rounded-full border border-line bg-card px-4 py-2 text-sm outline-none focus:border-terra"
          />
          {openSuggest && suggestions.length > 0 ? (
            <ul id={listId} role="listbox" className="absolute z-30 mt-1 max-h-64 w-full overflow-auto rounded-md border border-line bg-card py-1 shadow-lg">
              {suggestions.map((item) => (
                <li key={`${item.treeId}-${item.node.id}`} role="option" aria-selected={selected === item.node.id && treeId === item.treeId}>
                  <button
                    type="button"
                    className="flex w-full items-baseline justify-between gap-3 px-3 py-2 text-left text-sm hover:bg-stone"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => choose(item.node.id, item.treeId, item.node.ko)}
                  >
                    <span className="font-serif text-ink">{item.node.gap ? "사이 왕위" : item.node.ko}</span>
                    <span className="text-xs text-muted">
                      {item.treeId !== treeId ? `${TREE_TABS.find((tab) => tab.id === item.treeId)?.ko} · ` : null}
                      {item.node.sub}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </form>
        <div role="group" aria-label="세대로 이동" className="flex flex-wrap gap-2">
          {tree.bands.map((band) => (
            <button
              key={band.id}
              type="button"
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-2.5 py-1 text-xs text-ink hover:border-terra"
              onClick={() => {
                const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                document.getElementById(`band-${band.id}`)?.scrollIntoView({
                  behavior: reduce ? "auto" : "smooth",
                  block: "nearest",
                  inline: "start",
                });
              }}
            >
              <span className="h-2 w-2 rounded-full" style={{ background: band.color }} aria-hidden />
              {band.ko}
              <span className="text-[10px] tracking-wide text-terra">{band.en}</span>
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted">
        {tree.bands.map((band) => (
          <li key={band.id} className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm" style={{ background: band.color }} aria-hidden />
            {band.ko}
            <span className="text-terra">{band.en}</span>
          </li>
        ))}
        <li className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm border border-dashed" style={{ borderColor: GUEST }} aria-hidden />
          전승·논쟁·생략
        </li>
        <li className="inline-flex items-center gap-1.5">
          <svg width="28" height="8" aria-hidden>
            <line x1="0" y1="4" x2="28" y2="4" stroke="#a6843d" strokeWidth="2" />
          </svg>
          부모 → 자녀
        </li>
        <li className="inline-flex items-center gap-1.5">
          <svg width="28" height="8" aria-hidden>
            <line x1="0" y1="2" x2="28" y2="2" stroke="#8c2f2b" strokeWidth="1.4" />
            <line x1="0" y1="6" x2="28" y2="6" stroke="#8c2f2b" strokeWidth="1.4" />
          </svg>
          배우자
        </li>
        <li className="inline-flex items-center gap-1.5">
          <svg width="28" height="8" aria-hidden>
            <line x1="0" y1="4" x2="28" y2="4" stroke="#6d4c8a" strokeWidth="1.6" strokeDasharray="4 3" />
          </svg>
          불확실·논쟁
        </li>
        <li className="inline-flex items-center gap-1.5">
          <svg width="28" height="8" aria-hidden>
            <line x1="0" y1="4" x2="28" y2="4" stroke="#8a8178" strokeWidth="1.6" strokeDasharray="4 3" />
          </svg>
          생략 (…)
        </li>
      </ul>

      <div
        ref={scroller}
        className="mt-3 cursor-grab overflow-x-auto overflow-y-hidden rounded-lg border border-line active:cursor-grabbing"
        onPointerDown={(event) => {
          if (event.pointerType !== "mouse" || event.button !== 0) return;
          const target = event.target as HTMLElement;
          if (target.closest("button, a, input")) return;
          const el = scroller.current;
          if (!el) return;
          drag.current = { x: event.clientX, left: el.scrollLeft };
          el.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (!drag.current || !scroller.current) return;
          scroller.current.scrollLeft = drag.current.left - (event.clientX - drag.current.x);
        }}
        onPointerUp={() => {
          drag.current = null;
        }}
        onPointerCancel={() => {
          drag.current = null;
        }}
      >
        <div id="family-tree" className="relative" style={{ width: tree.width, height: tree.height }}>
          {tree.bands.map((band) => (
            <div
              key={band.id}
              id={`band-${band.id}`}
              className="absolute left-0"
              style={{ top: band.top, height: band.height, width: tree.width, background: band.soft }}
            >
              <div className="sticky left-2 top-2 z-20 w-max rounded-full border border-white/80 bg-white/90 px-3 py-1 shadow-sm">
                <span className="font-serif text-sm" style={{ color: band.color }}>
                  {band.ko}
                </span>
                <span className="ml-2 text-[10px] tracking-[0.14em] text-terra">{band.en}</span>
              </div>
            </div>
          ))}
          <svg className="absolute inset-0 z-[1]" width={tree.width} height={tree.height} aria-hidden>
            {tree.edges.map((edge) => {
              const active = related ? related.has(edge.from) && related.has(edge.to) : false;
              const paint = edgePaint(edge, active, Boolean(related));
              const halo = related && !active ? 0 : 0.95;
              return (
                <g key={edge.id} fill="none" strokeLinecap="round">
                  <path d={edge.d} stroke="#fffaf3" strokeWidth={paint.width + 2.4} strokeOpacity={halo} />
                  {edge.d2 ? <path d={edge.d2} stroke="#fffaf3" strokeWidth={paint.width + 2.4} strokeOpacity={halo} /> : null}
                  <path d={edge.d} stroke={paint.color} strokeWidth={paint.width} strokeOpacity={paint.opacity} strokeDasharray={paint.dash} />
                  {edge.d2 ? (
                    <path d={edge.d2} stroke={paint.color} strokeWidth={paint.width} strokeOpacity={paint.opacity} strokeDasharray={paint.dash} />
                  ) : null}
                </g>
              );
            })}
          </svg>
          {tree.nodes.map((node) => {
            const band = tree.bands.find((item) => item.id === node.band);
            return (
              <TreeCard
                key={node.id}
                node={node}
                bandColor={node.guest ? GUEST : band?.color ?? "#9c4033"}
                pressed={selected === node.id}
                dimmed={Boolean(related && !related.has(node.id))}
                linked={Boolean(related && related.has(node.id) && selected !== node.id)}
                onSelect={() => choose(node.id)}
              />
            );
          })}
        </div>
      </div>
      <p className="mt-2 text-xs text-muted">옆으로 밀거나 드래그하면 가계도 전체가 보입니다. 칸을 누르면 부모, 배우자, 자녀, 형제가 밝아집니다.</p>

      {selectedNode && relations ? (
        <section
          aria-live="polite"
          className="fixed inset-x-3 bottom-3 z-40 max-h-[46vh] overflow-auto rounded-lg border border-line bg-card p-4 shadow-lg sm:inset-x-auto sm:right-4 sm:w-[24rem]"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] tracking-[0.16em] text-terra">
                {tree.bands.find((band) => band.id === selectedNode.band)?.ko} · {tree.bands.find((band) => band.id === selectedNode.band)?.en}
              </p>
              <h2 className="font-serif text-2xl text-ink">{selectedNode.ko}</h2>
              <p className="text-sm text-muted">
                {selectedNode.native ? <span>{selectedNode.native} · </span> : null}
                {selectedNode.sub}
                {selectedNode.caption ? ` · ${selectedNode.caption}` : null}
              </p>
            </div>
            <button type="button" className="rounded border border-line px-2 py-1 text-xs text-muted hover:text-ink" onClick={closeCard}>
              닫기
            </button>
          </div>
          <p className="mt-2 text-sm leading-6 text-ink">{selectedNode.summary}</p>
          {selectedNode.note ? <p className="mt-2 text-xs leading-5 text-[#6d4c8a]">{selectedNode.note}</p> : null}
          <div className="mt-3 space-y-2 text-sm">
            <PeopleRow
              label="부모"
              people={relations.parents}
              empty={
                relations.parents.length || relations.variantParents.length
                  ? undefined
                  : selectedNode.parentHint ?? "이 그림에는 없음"
              }
              onPick={(id) => choose(id)}
            />
            <PeopleRow label="불확실한 부모" people={relations.variantParents} onPick={(id) => choose(id)} />
            <PeopleRow label="배우자" people={relations.spouses} onPick={(id) => choose(id)} />
            <PeopleRow label="불확실한 배우자" people={relations.variantSpouses} onPick={(id) => choose(id)} />
            <PeopleRow label="자녀" people={relations.children} onPick={(id) => choose(id)} />
            <PeopleRow label="불확실한 자녀" people={relations.variantChildren} onPick={(id) => choose(id)} />
            <PeopleRow label="형제·자매" people={relations.siblings} onPick={(id) => choose(id)} />
            <PeopleRow label="논쟁으로 겹침" people={relations.disputes} onPick={(id) => choose(id)} />
            <PeopleRow label="사이 왕위" people={relations.succession} onPick={(id) => choose(id)} />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {selectedNode.href ? (
              <Link href={selectedNode.href} className="rounded-full bg-terra px-3 py-1.5 text-sm text-white hover:bg-terra-deep">
                이 사이트의 글
              </Link>
            ) : null}
            {selectedNode.also?.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full border border-line px-3 py-1.5 text-sm hover:border-terra"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ))}
            <button type="button" className="rounded-full border border-line px-3 py-1.5 text-sm hover:border-terra" onClick={closeCard}>
              전체 가계도
            </button>
          </div>
        </section>
      ) : null}
    </div>
  );
}

function PeopleRow({
  label,
  people,
  empty,
  onPick,
}: {
  label: string;
  people: { id: string; ko: string; roman: string }[];
  empty?: string;
  onPick: (id: string) => void;
}) {
  if (!people.length && !empty) return null;
  return (
    <div className="flex flex-wrap items-baseline gap-1.5">
      <span className="text-xs text-muted">{label}</span>
      {people.length ? (
        people.map((person) => (
          <button
            key={person.id}
            type="button"
            className="rounded-full border border-line bg-bg px-2 py-0.5 text-xs hover:border-terra"
            onClick={() => onPick(person.id)}
          >
            {person.ko}
            <span className="text-muted"> {person.roman}</span>
          </button>
        ))
      ) : (
        <span className="text-xs text-muted">{empty}</span>
      )}
    </div>
  );
}

function TreeCard({
  node,
  bandColor,
  pressed,
  dimmed,
  linked,
  onSelect,
}: {
  node: LayoutNode;
  bandColor: string;
  pressed: boolean;
  dimmed: boolean;
  linked: boolean;
  onSelect: () => void;
}) {
  const border = bandColor;
  return (
    <div
      id={`ft-${node.id}`}
      className="absolute z-10"
      style={{ left: node.x, top: node.y, width: node.w, height: node.h, opacity: dimmed ? 0.28 : 1, scrollMargin: "160px" }}
    >
      {node.badge ? (
        <span className="absolute -top-2 left-1 z-10 rounded-full bg-[#6d4c8a] px-1.5 py-0.5 text-[9px] leading-none text-white">{node.badge}</span>
      ) : null}
      <button
        type="button"
        aria-pressed={pressed}
        onClick={onSelect}
        title={`${node.ko} / ${node.sub}. ${node.caption}`}
        className={`flex h-full w-full flex-col items-center justify-center rounded-md border bg-white px-1 text-center ${node.href ? "pr-5" : ""}`}
        style={{
          borderColor: border,
          borderStyle: node.guest ? "dashed" : "solid",
          boxShadow: pressed ? "0 0 0 3px #9c4033" : linked ? `0 0 0 2px ${border}` : undefined,
        }}
      >
        <span
          aria-hidden
          className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] text-white"
          style={{ background: border }}
        >
          {node.gap ? "…" : node.ko.slice(0, 1)}
        </span>
        <span className="mt-0.5 max-w-full truncate font-serif text-[12px] leading-4 text-ink">{node.ko}</span>
        <span className="max-w-full truncate text-[10px] leading-3 text-muted">{node.sub}</span>
        <span className="max-w-full truncate text-[10px] leading-3 text-terra">{node.caption || " "}</span>
      </button>
      {node.href ? (
        <Link
          href={node.href}
          className="absolute bottom-1 right-1 z-10 rounded bg-white/90 px-1 text-[10px] leading-4 text-laurel underline"
          aria-label={`${node.ko} 글`}
        >
          글
        </Link>
      ) : null}
    </div>
  );
}
