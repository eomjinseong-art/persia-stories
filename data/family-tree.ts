/**
 * 가족관계도 (Family Tree).
 *
 * 그림은 이 파일 하나로 만듭니다. 좌표를 적으면 칸과 선은 빌드 때 계산됩니다.
 * 금색 실선은 부모→자녀, 붉은 선은 배우자, 보라 점선은 불확실·논쟁,
 * 회색 점선과 「…」는 생략한 왕위입니다. 「…」는 부자 관계가 아닙니다.
 *
 * 인물을 더할 때
 * 1. 해당 왕조의 seeds에 id, 한국어 이름, 영어 이름, band, col, y를 넣습니다.
 * 2. 같은 가로줄에서는 col 차이를 1.3 이상으로 둡니다.
 * 3. `parent()` `spouse()` `variantParent()` `variantSpouse()` `dispute()` `ellipsis()`로 잇습니다.
 * 4. `/rulers/[slug]` 글이 있으면 slug를 넣습니다. 없는 글을 가리키면 빌드가 멈춥니다.
 */

export type TreeId = "achaemenid" | "parthian" | "sasanian";
export type LinkKind = "parent" | "spouse" | "variant-parent" | "variant-spouse" | "dispute" | "ellipsis";

export type TreeSeed = {
  id: string;
  ko: string;
  roman: string;
  native?: string;
  band: string;
  /** Horizontal slot. Same-row gap should stay ≥ 1.3. */
  col: number;
  /** Absolute top of the card, in pixels. */
  y: number;
  slug?: string;
  /** Dashed card: spouse, claimant, or ellipsis — not a reigning person in the solid line. */
  guest?: boolean;
  /** Ellipsis marker. Not a person. */
  gap?: boolean;
  badge?: string;
  summary: string;
  note?: string;
  caption: string;
  /** Shown when this card has no parent line. */
  parentHint?: string;
  aliases?: string[];
  also?: { href: string; label: string }[];
};

export type TreeLink = { from: string; to: string; kind: LinkKind };

export type BandMeta = {
  id: string;
  ko: string;
  en: string;
  hint: string;
  color: string;
  soft: string;
};

export type LayoutNode = TreeSeed & {
  x: number;
  y: number;
  w: number;
  h: number;
  sub: string;
  href?: string;
  keys: string[];
};

export type LayoutEdge = {
  id: string;
  d: string;
  d2?: string;
  kind: LinkKind;
  from: string;
  to: string;
  local: boolean;
  quiet: boolean;
};

export type LayoutBand = BandMeta & {
  top: number;
  height: number;
  nodeIds: string[];
};

export type FamilyTreeLayout = {
  id: TreeId;
  width: number;
  height: number;
  nodes: LayoutNode[];
  edges: LayoutEdge[];
  bands: LayoutBand[];
  links: TreeLink[];
  byId: Map<string, LayoutNode>;
};

export const TREE_TABS: { id: TreeId; ko: string; en: string }[] = [
  { id: "achaemenid", ko: "아케메네스 왕조", en: "Achaemenid" },
  { id: "parthian", ko: "파르티아", en: "Arsacid" },
  { id: "sasanian", ko: "사산 왕조", en: "Sasanian" },
];

const COL = 162;
const NODE_W = 148;
const NODE_H = 94;
const PAD = 32;

export const DISPUTES = [
  {
    id: "bardiya",
    title: "바르디야와 가우마타",
    main: "베히스툰 비문은 캄비세스 2세가 동생 바르디야를 숨겨 죽였고, 마고스 가우마타가 바르디야인 척했으며, 다레이오스 1세가 기원전 522년에 그 사람을 죽였다고 적습니다. 헤로도토스의 스메르디스는 같은 자리를 가리키지만, 마고스의 이름과 장면은 비문과 같지 않습니다.",
    other: "죽은 사람이 진짜 바르디야였고, 가우마타는 왕위를 정당화하려는 다레이오스의 이야기라는 견해가 있습니다. 비문은 이긴 왕의 목소리입니다. 이 그림은 바르디야를 키루스의 아들로 두고, 가우마타와는 보라 점선으로만 겹칩니다.",
  },
  {
    id: "branches",
    title: "아케메네스와 두 갈래",
    main: "키루스 원통은 테이스페스, 키루스 1세, 캄비세스 1세, 키루스 2세로 이어집니다. 아케메네스라는 이름은 없습니다. 베히스툰은 다레이오스, 히스타스페스, 아르사메스, 아리아람네스, 테이스페스, 아케메네스로 이어집니다.",
    other: "한 사람의 테이스페스에서 두 갈래가 갈라진다는 그림은 이 두 기록을 잇는 통상적인 재구성입니다. 키루스 원통이 아리아람네스를 키루스 1세의 형제로 적지는 않습니다. 헤로도토스 7권 11절은 두 갈래를 한 줄로 섞으므로 이 그림의 기준으로 쓰지 않았습니다. 파사르가다에의 ‘아케메네스 가문’ 명문은 다레이오스 때 새긴 것으로 보는 견해가 있습니다.",
  },
  {
    id: "mandane",
    title: "만다네",
    main: "키루스의 아버지 캄비세스 1세는 키루스 원통과 베히스툰이 같이 가리킵니다.",
    other: "어머니 만다네, 메디아 왕 아스티아게스의 딸이라는 이야기는 헤로도토스에 있습니다. 페르시아 왕실 비문에는 이 이름이 없습니다. 출생 설화로 두고 점선으로만 잇습니다.",
  },
  {
    id: "esther",
    title: "아하수에로와 에스더",
    main: "크세르크세스 1세의 비문은 아버지를 다레이오스라고 적습니다. 배우자 칸은 그리지 않았습니다.",
    other: "히브리 성서의 아하수에로를 이 왕과 같게 보는 전통이 있습니다. 에스더는 그 궁정 이야기의 인물입니다. 페르세폴리스 행정 문서가 확인한 왕비가 아니므로 배우자로 잇지 않습니다.",
  },
  {
    id: "darius-iii",
    title: "다레이오스 3세로 가는 점",
    main: "아르타크세르크세스 1세의 다음은 한 명의 아들이 아닙니다. 사이에 크세르크세스 2세, 소그디아누스, 다레이오스 2세, 아르타크세르크세스 2세, 아르타크세르크세스 3세, 아르세스가 있습니다.",
    other: "다레이오스 3세는 아르세스의 아들이 아닙니다. 아버지 아르사메스는 다레이오스 2세의 후손으로 전합니다. 그림의 아르사메스, 곧 다레이오스 1세의 할아버지와는 동명이인입니다.",
  },
] as const;

export const NAME_NOTES = [
  {
    title: "키루스와 고레스",
    body: "키루스 2세와 성서의 고레스는 같은 왕입니다. 키루스 1세는 그 할아버지 세대의 안샨 왕으로, 다른 사람입니다.",
  },
  {
    title: "바르디야와 스메르디스",
    body: "페르시아 쪽 이름은 바르디야, 헤로도토스가 적은 그리스 이름은 스메르디스입니다. 한 사람을 가리키는 두 이름입니다.",
  },
  {
    title: "다리우스와 다레이오스",
    body: "한국어에서 다리우스로 더 익숙한 이름이 있습니다. 이 사이트의 글과 같이 다레이오스로 적습니다.",
  },
  {
    title: "같은 이름, 다른 사람",
    body: "그림의 아르사메스는 다레이오스 1세의 할아버지입니다. 다레이오스 3세의 아버지도 아르사메스라고 불리지만 그 칸을 따로 두지 않았습니다. 미트라다테스 1세는 폰토스의 미트라다테스 6세가 아닙니다.",
  },
  {
    title: "점 세 개",
    body: "「…」는 그 사이 왕위를 접어 둔 표시입니다. 금색 부자 선이 아닙니다. 파르티아와 사산은 사이트에 있는 왕과, 그 왕을 이해하는 데 필요한 이웃만 남겼습니다.",
  },
] as const;

export const FAMILY_SOURCES: { title: string; note: string }[] = [
  {
    title: "키루스 원통",
    note: "테이스페스, 키루스 1세, 캄비세스 1세, 키루스 2세. 안샨 왕. 아케메네스라는 이름은 없습니다.",
  },
  {
    title: "베히스툰 비문",
    note: "다레이오스 1세의 계보와, 바르디야·가우마타에 대한 왕의 이야기. 아버지 히스타스페스는 왕으로 불리지 않습니다.",
  },
  {
    title: "헤로도토스 『역사』",
    note: "1권의 만다네, 2–3권의 카산다네·바르디야·아토사, 7권의 크세르크세스. 7권 11절의 한 줄 계보는 그림의 기준으로 쓰지 않았습니다.",
  },
  {
    title: "크세르크세스의 비문",
    note: "아버지를 다레이오스라고 적습니다. 어머니의 이름은 없습니다.",
  },
  {
    title: "이 사이트의 왕 글",
    note: "재위 해는 왕 글에 적힌 대략의 해와 맞췄습니다. 글이 없는 미트라다테스 2세와 호스로 2세만 별도로 대략의 해를 적었습니다.",
  },
];

const achaemenidBands: BandMeta[] = [
  {
    id: "origin",
    ko: "시조",
    en: "Ancestors",
    hint: "아케메네스는 전통상의 이름입니다. 키루스 원통의 계보는 테이스페스에서 시작합니다.",
    color: "#3e4d7a",
    soft: "#e7edf7",
  },
  {
    id: "split",
    ko: "두 갈래",
    en: "Two lines",
    hint: "왼쪽은 안샨의 키루스 가문입니다. 오른쪽이 테이스페스와 만나는 보라 점선은 두 기록을 한 가문으로 잇는 재구성입니다. 히스타스페스는 왕이 아닙니다.",
    color: "#8a5a24",
    soft: "#fbf3e6",
  },
  {
    id: "core",
    ko: "키루스와 자녀",
    en: "Cyrus and his children",
    hint: "다레이오스 1세는 키루스의 아들이 아닙니다. 아토사와 결혼해 가문을 잇습니다.",
    color: "#9c4033",
    soft: "#f8ece8",
  },
  {
    id: "later",
    ko: "그 뒤의 왕",
    en: "Later kings",
    hint: "크세르크세스와 아르타크세르크세스 1세까지는 부자입니다. 그 다음 「…」는 생략이고, 다레이오스 3세는 그 점의 아들이 아닙니다.",
    color: "#1e5c45",
    soft: "#e7f3ee",
  },
];

const achaemenidSeeds: TreeSeed[] = [
  {
    id: "achaemenes",
    ko: "아케메네스",
    roman: "Achaemenes",
    native: "Haxāmaniš",
    band: "origin",
    col: 4,
    y: 64,
    guest: true,
    badge: "전통",
    caption: "전통상의 시조",
    parentHint: "시조로만 전합니다. 행적은 알려져 있지 않습니다.",
    summary:
      "다레이오스 1세의 베히스툰 비문과 헤로도토스가 가문의 시조로 적는 이름입니다. 그 사람의 재위나 업적은 남아 있지 않습니다.",
    note: "키루스 원통은 이 이름에서 시작하지 않고 테이스페스에서 시작합니다.",
    aliases: ["achaemenes", "아케메네스", "haxamanish", "hakhamanish"],
  },
  {
    id: "teispes",
    ko: "테이스페스",
    roman: "Teispes",
    native: "Čišpiš",
    band: "origin",
    col: 4,
    y: 210,
    caption: "안샨 왕",
    summary:
      "키루스 원통이 키루스 2세의 선조, 안샨의 왕으로 적는 이름입니다. 안샨은 오늘의 이란 남서쪽에 있던 옛 나라입니다. 다레이오스 쪽 계보도 이 이름에서 만납니다.",
    note: "두 갈래의 테이스페스를 한 사람으로 보는 것은 키루스 원통과 베히스툰을 잇는 재구성입니다. 재위 해는 못 박지 않습니다.",
    aliases: ["teispes", "테이스페스", "chishpish", "cispis"],
  },
  {
    id: "cyrus-i",
    ko: "키루스 1세",
    roman: "Cyrus I",
    native: "Kūruš",
    band: "split",
    col: 0,
    y: 400,
    caption: "안샨 왕",
    summary:
      "키루스 원통이 캄비세스 1세의 아버지, 안샨의 왕으로 적습니다. 기원전 639년 아시리아 왕이 파르수마쉬의 쿠라쉬에게서 공납을 받았다는 기록의 그 사람으로 보통 봅니다.",
    note: "키루스 2세, 곧 고레스와는 다른 사람입니다. 재위의 시작과 끝은 적지 않습니다.",
    aliases: ["cyrus i", "키루스 1세", "kurash"],
  },
  {
    id: "ariaramnes",
    ko: "아리아람네스",
    roman: "Ariaramnes",
    native: "Ariyāramna",
    band: "split",
    col: 8,
    y: 400,
    caption: "전통 계보",
    summary:
      "베히스툰 계보에서 테이스페스의 아들이자 아르사메스의 아버지로 이어지는 이름입니다. 키루스 원통은 이 사람을 키루스 1세의 형제로 적지 않습니다.",
    note: "그 이름으로 전하는 금판은 당대의 비문으로 보지 않는 견해가 있습니다. 오른쪽 갈래의 첫 칸입니다.",
    aliases: ["ariaramnes", "ariyaramna", "아리아람네스"],
  },
  {
    id: "cambyses-i",
    ko: "캄비세스 1세",
    roman: "Cambyses I",
    native: "Kambūjiya",
    band: "split",
    col: 0,
    y: 560,
    caption: "안샨 왕",
    summary:
      "키루스 2세의 아버지이고 안샨의 왕입니다. 키루스가 기원전 559년 무렵 왕위를 이었으므로, 그 무렵까지 왕이었다고 봅니다. 시작 해는 모릅니다.",
    aliases: ["cambyses i", "캄비세스 1세"],
  },
  {
    id: "mandane",
    ko: "만다네",
    roman: "Mandane",
    band: "split",
    col: 1.35,
    y: 560,
    guest: true,
    badge: "전승",
    caption: "헤로도토스의 이야기",
    parentHint: "메디아 왕 아스티아게스의 딸로 전합니다. 부모 칸은 두지 않았습니다.",
    summary:
      "헤로도토스가 적은 메디아 왕의 딸입니다. 캄비세스 1세에게 시집가 키루스를 낳았다는 출생 이야기입니다. 페르시아 왕실 비문에는 이 이름이 없습니다.",
    note: "실선으로 잇지 않습니다. 키루스의 아버지 캄비세스 1세만 비문과 원통이 같이 가리킵니다.",
    aliases: ["mandane", "만다네"],
  },
  {
    id: "arsames",
    ko: "아르사메스",
    roman: "Arsames",
    native: "Aršāma",
    band: "split",
    col: 8,
    y: 560,
    caption: "전통 계보",
    summary:
      "베히스툰이 다레이오스 1세의 할아버지로 적는 이름입니다. 히스타스페스의 아버지입니다.",
    note: "다레이오스 3세의 아버지도 아르사메스라고 불리지만 다른 사람입니다. 그 이름으로 전하는 금판은 당대 비문으로 보지 않는 견해가 있습니다.",
    aliases: ["arsames", "아르사메스", "arshama"],
  },
  {
    id: "hystaspes",
    ko: "히스타스페스",
    roman: "Hystaspes",
    native: "Vištāspa",
    band: "split",
    col: 8,
    y: 720,
    caption: "속주 총독",
    summary:
      "다레이오스 1세의 아버지입니다. 베히스툰은 그를 왕이라고 부르지 않습니다. 아들이 왕이 된 뒤 파르티아에 있던 아버지로 나옵니다. 파르티아와 히르카니아가 반란을 일으켰다고 적습니다.",
    aliases: ["hystaspes", "히스타스페스", "vishtaspa", "vistashpa"],
  },
  {
    id: "cyrus",
    ko: "키루스 2세",
    roman: "Cyrus the Great",
    native: "Kūruš",
    band: "core",
    col: 0,
    y: 960,
    slug: "cyrus",
    caption: "기원전 559–530",
    summary:
      "안샨의 왕에서 제국의 왕이 된 사람입니다. 한국어 성서의 고레스와 같은 왕입니다. 기원전 539년 바빌론에 들어갔고, 유다 사람들의 귀환은 에즈라가 따로 전합니다. 키루스 원통은 신전 회복을 적은 글이지 인권 선언이 아닙니다.",
    also: [{ href: "https://nadoo-timeline.vercel.app/events/cyrus-takes-babylon", label: "나두연표의 바빌론 입성" }],
    aliases: ["cyrus", "cyrus ii", "cyrus the great", "키루스", "키루스 2세", "고레스", "kourosh", "kurush"],
  },
  {
    id: "cassandane",
    ko: "카산다네",
    roman: "Cassandane",
    band: "core",
    col: 1.35,
    y: 960,
    caption: "키루스의 아내",
    parentHint: "헤로도토스는 파르나스페스의 딸이라고 적습니다. 부모 칸은 두지 않았습니다.",
    summary:
      "헤로도토스가 적은 키루스의 아내입니다. 캄비세스 2세와 바르디야의 어머니로 전합니다. 바빌론 연대기에 왕비의 죽음이 있으나, 그 문장이 이 이름인지는 적혀 있지 않습니다.",
    aliases: ["cassandane", "카산다네"],
  },
  {
    id: "cambyses-ii",
    ko: "캄비세스 2세",
    roman: "Cambyses II",
    native: "Kambūjiya",
    band: "core",
    col: 0,
    y: 1140,
    slug: "cambyses-ii",
    caption: "기원전 530–522",
    summary:
      "키루스 2세의 아들로 이집트를 차지한 왕입니다. 기원전 522년 죽었습니다. 베히스툰은 스스로 목숨을 끊었다고 하고, 헤로도토스는 사고라고 합니다.",
    aliases: ["cambyses", "cambyses ii", "캄비세스", "캄비세스 2세"],
  },
  {
    id: "bardiya",
    ko: "바르디야",
    roman: "Bardiya",
    native: "Bardiya",
    band: "core",
    col: 1.35,
    y: 1140,
    badge: "논쟁",
    caption: "기원전 522년",
    summary:
      "키루스의 아들입니다. 베히스툰은 캄비세스와 같은 부모라고 합니다. 헤로도토스는 스메르디스라고 부릅니다. 기원전 522년의 왕이 이 사람인지 가우마타인지는 논쟁입니다.",
    note: "베히스툰은 캄비세스가 바르디야를 죽인 뒤 가우마타가 그 이름을 빌렸다고 합니다. 죽은 이가 진짜 바르디야였다는 견해도 있습니다.",
    aliases: ["bardiya", "바르디야", "smerdis", "스메르디스"],
  },
  {
    id: "gaumata",
    ko: "가우마타",
    roman: "Gaumata",
    native: "Gaumāta",
    band: "core",
    col: 2.7,
    y: 1140,
    guest: true,
    badge: "논쟁",
    caption: "베히스툰의 주장",
    parentHint: "가문의 아들이 아닙니다. 부모 선이 없는 것이 맞습니다.",
    summary:
      "베히스툰 비문이 바르디야인 척했다고 부르는 사람입니다. 마고스는 그 비문이 쓰는 말입니다. 다레이오스는 기원전 522년에 그를 죽였다고 적습니다.",
    note: "이 칸은 자녀가 아닙니다. 왕위가 겹친다는 논쟁을 보이기 위한 점선입니다.",
    aliases: ["gaumata", "가우마타", "gaumāta"],
  },
  {
    id: "atossa",
    ko: "아토사",
    roman: "Atossa",
    band: "core",
    col: 4.15,
    y: 1140,
    caption: "키루스의 딸",
    summary:
      "키루스의 딸이고 다레이오스 1세의 아내입니다. 헤로도토스는 크세르크세스의 어머니로 적습니다. 크세르크세스 자신의 비문은 아버지 이름만 적습니다.",
    note: "어머니 이름은 비문에 없습니다. 카산다네의 딸로 단정하지 않았습니다. 헤로도토스는 캄비세스와, 그 뒤 왕위에 있던 사람에게도 시집갔다고 전합니다. 그 결혼은 선으로 긋지 않았습니다.",
    aliases: ["atossa", "아토사"],
  },
  {
    id: "darius-i",
    ko: "다레이오스 1세",
    roman: "Darius I",
    native: "Dārayavauš",
    band: "core",
    col: 5.5,
    y: 1140,
    slug: "darius-i",
    caption: "기원전 522–486",
    summary:
      "히스타스페스의 아들입니다. 키루스의 아들이 아닙니다. 기원전 522년 왕위에 올라 총독, 공납, 왕의 길, 페르세폴리스의 뼈대를 만들었습니다.",
    note: "가우마타를 죽이고 반란을 진압했다는 이야기와, 아케메네스의 후손이라는 계보는 이긴 왕이 새긴 주장입니다. 히스타스페스가 아버지라는 점까지 그 주장과 같이 흔들지는 않습니다.",
    aliases: ["darius", "darius i", "darius the great", "다레이오스", "다레이오스 1세", "다리우스", "다리우스 1세"],
  },
  {
    id: "xerxes-i",
    ko: "크세르크세스 1세",
    roman: "Xerxes I",
    native: "Xšayaršā",
    band: "later",
    col: 4.8,
    y: 1360,
    slug: "xerxes-i",
    caption: "기원전 486–465",
    summary:
      "다레이오스 1세의 아들입니다. 자신의 비문은 아버지를 다레이오스라고 적습니다. 어머니를 아토사로 적는 것은 헤로도토스입니다. 기원전 480년 그리스로 갔다가 살라미스에서 졌고, 제국은 그때 끝나지 않았습니다.",
    note: "히브리 성서의 아하수에로를 이 왕과 같게 보는 전통이 있습니다. 에스더는 그 궁정 이야기의 인물입니다. 페르세폴리스 문서가 확인한 왕비가 아니므로 배우자로 잇지 않았습니다.",
    also: [
      { href: "https://greece-stories.vercel.app/wars/persian-wars", label: "그리스이야기의 페르시아 전쟁" },
      { href: "https://the-chosen-korean.vercel.app/bible-books/esther", label: "더 초즌의 에스더" },
    ],
    aliases: ["xerxes", "xerxes i", "크세르크세스", "크세르크세스 1세", "ahasuerus", "아하수에로", "esther", "에스더"],
  },
  {
    id: "artaxerxes-i",
    ko: "아르타크세르크세스 1세",
    roman: "Artaxerxes I",
    native: "Artaxšaçā",
    band: "later",
    col: 4.8,
    y: 1520,
    slug: "artaxerxes-i",
    caption: "기원전 465–424",
    summary:
      "크세르크세스 1세의 아들입니다. 그리스 기록은 어머니를 아메스트리스, 크세르크세스의 아내로 전합니다. 그 칸은 두지 않았습니다. 살라미스 이후에도 왕조가 이어진다는 것을 보여 주는 왕입니다.",
    aliases: ["artaxerxes", "artaxerxes i", "아르타크세르크세스", "아르타크세르크세스 1세"],
  },
  {
    id: "ach-gap",
    ko: "…",
    roman: "omitted Achaemenid reigns",
    band: "later",
    col: 4.8,
    y: 1680,
    gap: true,
    guest: true,
    caption: "사이 왕위",
    parentHint: "왕이 아니라 생략 표시입니다.",
    summary:
      "아르타크세르크세스 1세와 다레이오스 3세 사이의 왕위입니다. 크세르크세스 2세, 소그디아누스, 다레이오스 2세, 아르타크세르크세스 2세, 아르타크세르크세스 3세, 아르세스가 있습니다. 부자를 한 줄로 이은 것이 아닙니다.",
    aliases: [
      "xerxes ii",
      "크세르크세스 2세",
      "sogdianus",
      "소그디아누스",
      "darius ii",
      "다레이오스 2세",
      "다리우스 2세",
      "artaxerxes ii",
      "아르타크세르크세스 2세",
      "artaxerxes iii",
      "아르타크세르크세스 3세",
      "arses",
      "아르세스",
      "artaxerxes iv",
    ],
  },
  {
    id: "darius-iii",
    ko: "다레이오스 3세",
    roman: "Darius III",
    native: "Dārayavauš",
    band: "later",
    col: 4.8,
    y: 1840,
    slug: "darius-iii",
    caption: "기원전 336–330",
    parentHint: "아버지 아르사메스는 이 그림에 없습니다. 다레이오스 2세의 방계로 전합니다.",
    summary:
      "아케메네스 왕조의 마지막 왕입니다. 아르세스의 아들이 아닙니다. 알렉산드로스에게 이수스와 가우가멜라에서 졌고, 기원전 330년 자기 편에게 죽습니다.",
    note: "위의 「…」에서 내려오는 선은 왕위의 생략이지 부자 관계가 아닙니다.",
    also: [{ href: "https://greece-stories.vercel.app/wars/alexander-campaigns", label: "그리스이야기의 원정" }],
    aliases: ["darius iii", "다레이오스 3세", "다리우스 3세", "codomannus"],
  },
];

function achaemenidLinks(): TreeLink[] {
  const links: TreeLink[] = [];
  const parent = (from: string, to: string) => links.push({ from, to, kind: "parent" });
  const spouse = (a: string, b: string) => links.push({ from: a, to: b, kind: "spouse" });
  const variantParent = (from: string, to: string) => links.push({ from, to, kind: "variant-parent" });
  const variantSpouse = (a: string, b: string) => links.push({ from: a, to: b, kind: "variant-spouse" });
  const dispute = (a: string, b: string) => links.push({ from: a, to: b, kind: "dispute" });
  const ellipsis = (from: string, to: string) => links.push({ from, to, kind: "ellipsis" });

  variantParent("achaemenes", "teispes");
  parent("teispes", "cyrus-i");
  variantParent("teispes", "ariaramnes");
  parent("cyrus-i", "cambyses-i");
  parent("ariaramnes", "arsames");
  parent("arsames", "hystaspes");
  parent("hystaspes", "darius-i");
  variantSpouse("cambyses-i", "mandane");
  variantParent("mandane", "cyrus");
  parent("cambyses-i", "cyrus");
  spouse("cyrus", "cassandane");
  parent("cyrus", "cambyses-ii");
  parent("cassandane", "cambyses-ii");
  parent("cyrus", "bardiya");
  parent("cassandane", "bardiya");
  parent("cyrus", "atossa");
  dispute("bardiya", "gaumata");
  spouse("darius-i", "atossa");
  parent("darius-i", "xerxes-i");
  parent("atossa", "xerxes-i");
  parent("xerxes-i", "artaxerxes-i");
  ellipsis("artaxerxes-i", "ach-gap");
  ellipsis("ach-gap", "darius-iii");
  return links;
}

const parthianBands: BandMeta[] = [
  {
    id: "rise",
    ko: "시작",
    en: "Founder",
    hint: "아르사케스 1세의 즉위는 기원전 247년 무렵으로 잡는 전통입니다.",
    color: "#3e4d7a",
    soft: "#e7edf7",
  },
  {
    id: "growth",
    ko: "메소포타미아",
    en: "Mesopotamia",
    hint: "미트라다테스 1세는 시조의 아들이 아닙니다. 점은 그 사이 왕위입니다.",
    color: "#8a5a24",
    soft: "#fbf3e6",
  },
  {
    id: "great",
    ko: "왕중왕",
    en: "King of kings",
    hint: "미트라다테스 2세는 1세의 아들이 아닙니다. 이 사이트에는 단독 글이 없습니다.",
    color: "#1e5c45",
    soft: "#e7f3ee",
  },
];

const parthianSeeds: TreeSeed[] = [
  {
    id: "arsaces",
    ko: "아르사케스 1세",
    roman: "Arsaces I",
    band: "rise",
    col: 0,
    y: 64,
    caption: "기원전 247년 무렵",
    parentHint: "시조로 기억됩니다. 부모 칸은 두지 않았습니다.",
    summary:
      "파르티아의 시조로 기억하는 이름입니다. 즉위를 기원전 247년 무렵으로 잡는 전통이 있습니다. 미트라다테스 1세의 아버지가 아닙니다. 재위의 끝은 기록이 갈립니다.",
    aliases: ["arsaces", "arsaces i", "아르사케스", "아르사케스 1세", "arsak"],
  },
  {
    id: "par-gap-1",
    ko: "…",
    roman: "omitted early Arsacid reigns",
    band: "growth",
    col: 0,
    y: 260,
    gap: true,
    guest: true,
    caption: "사이 왕위",
    parentHint: "왕이 아니라 생략 표시입니다.",
    summary: "아르사케스 1세와 미트라다테스 1세 사이의 여러 왕입니다. 미트라다테스 1세는 시조의 아들이 아닙니다.",
    aliases: ["phriapatius", "프리아파티오스", "phraates i", "프라아테스 1세"],
  },
  {
    id: "mithridates-i",
    ko: "미트라다테스 1세",
    roman: "Mithridates I",
    band: "growth",
    col: 0,
    y: 420,
    slug: "mithridates-i",
    caption: "기원전 171–132",
    parentHint: "아르사케스의 아들이 아닙니다. 아버지 칸은 생략했습니다.",
    summary:
      "파르티아를 메디아와 메소포타미아까지 넓힌 왕입니다. 셀레우코스 왕 데메트리오스 2세를 사로잡습니다. 폰토스의 미트라다테스 6세와는 다른 사람입니다.",
    aliases: ["mithridates", "mithridates i", "mithradates", "미트라다테스", "미트라다테스 1세"],
  },
  {
    id: "par-gap-2",
    ko: "…",
    roman: "omitted Arsacid reigns",
    band: "great",
    col: 0,
    y: 640,
    gap: true,
    guest: true,
    caption: "사이 왕위",
    parentHint: "왕이 아니라 생략 표시입니다.",
    summary: "미트라다테스 1세와 2세 사이입니다. 2세는 1세의 아들이 아닙니다.",
    aliases: ["phraates ii", "프라아테스 2세", "artabanus i", "아르타바누스 1세"],
  },
  {
    id: "mithridates-ii",
    ko: "미트라다테스 2세",
    roman: "Mithridates II",
    band: "great",
    col: 0,
    y: 800,
    caption: "대략 기원전 124–91",
    parentHint: "미트라다테스 1세의 아들이 아닙니다.",
    summary:
      "파르티아를 다시 크게 만든 왕으로 자주 꼽힙니다. 왕중왕 칭호와 로마와의 접촉이 이 재위와 연결됩니다. 이 사이트에는 단독 글이 없습니다. 끝 해는 자료마다 조금 다릅니다.",
    aliases: ["mithridates ii", "mithradates ii", "미트라다테스 2세"],
  },
];

function parthianLinks(): TreeLink[] {
  const links: TreeLink[] = [];
  const ellipsis = (from: string, to: string) => links.push({ from, to, kind: "ellipsis" });
  ellipsis("arsaces", "par-gap-1");
  ellipsis("par-gap-1", "mithridates-i");
  ellipsis("mithridates-i", "par-gap-2");
  ellipsis("par-gap-2", "mithridates-ii");
  return links;
}

const sasanianBands: BandMeta[] = [
  {
    id: "founding",
    ko: "건국",
    en: "Foundation",
    hint: "아르다시르 1세와 아들 샤푸르 1세입니다. 조상 사산의 이야기는 칸으로 두지 않았습니다.",
    color: "#9c4033",
    soft: "#f8ece8",
  },
  {
    id: "reform",
    ko: "개혁",
    en: "Khosrow I",
    hint: "샤푸르와 호스로 1세 사이는 삼백 년 가까이입니다. 점은 부자가 아닙니다.",
    color: "#8a5a24",
    soft: "#fbf3e6",
  },
  {
    id: "end",
    ko: "마지막",
    en: "Last kings",
    hint: "호스로 2세는 1세의 손자이고, 야즈데게르드 3세는 2세의 아들이 아닙니다.",
    color: "#1e5c45",
    soft: "#e7f3ee",
  },
];

const sasanianSeeds: TreeSeed[] = [
  {
    id: "ardashir",
    ko: "아르다시르 1세",
    roman: "Ardashir I",
    band: "founding",
    col: 0,
    y: 64,
    slug: "ardashir-i",
    caption: "서기 224–242",
    parentHint: "아버지로 파파크를 드는 기록이 있습니다. 그 칸은 두지 않았습니다.",
    summary:
      "파르티아의 아르타바누스 4세를 이기고 사산 왕조를 연 왕입니다. 조상 사산의 이야기는 후대 문헌이 더 화려하므로 칸으로 두지 않았습니다.",
    aliases: ["ardashir", "ardashir i", "아르다시르", "아르다시르 1세"],
  },
  {
    id: "shapur",
    ko: "샤푸르 1세",
    roman: "Shapur I",
    band: "founding",
    col: 0,
    y: 224,
    slug: "shapur-i",
    caption: "서기 240–270",
    summary:
      "아르다시르 1세의 아들입니다. 240년 무렵부터 아버지와 함께 왕으로 있다가 뒤를 이었고, 260년 로마 황제 발레리아누스를 사로잡습니다.",
    aliases: ["shapur", "shapur i", "샤푸르", "샤푸르 1세"],
  },
  {
    id: "sas-gap-1",
    ko: "…",
    roman: "omitted early Sasanian reigns",
    band: "reform",
    col: 0,
    y: 450,
    gap: true,
    guest: true,
    caption: "사이 왕위",
    parentHint: "왕이 아니라 생략 표시입니다.",
    summary: "샤푸르 1세와 호스로 1세 사이의 많은 왕입니다. 삼백 년 가까이 떨어져 있고, 부자 관계가 아닙니다.",
    aliases: ["kavad i", "카바드 1세", "shapur ii", "샤푸르 2세"],
  },
  {
    id: "khosrow-i",
    ko: "호스로 1세",
    roman: "Khosrow I",
    band: "reform",
    col: 0,
    y: 610,
    slug: "khosrow-i",
    caption: "서기 531–579",
    parentHint: "아버지는 카바드 1세입니다. 샤푸르 1세의 아들이 아닙니다.",
    summary:
      "아누시르반, 곧 불멸하는 영혼이라는 별칭으로도 불립니다. 세금과 군사를 고친 왕이고, 비잔티움의 유스티니아누스와 오래 싸웠습니다.",
    aliases: ["khosrow", "khosrow i", "khosrau", "chosroes", "호스로", "호스로 1세", "anushirvan", "아누시르반"],
  },
  {
    id: "sas-gap-2",
    ko: "…",
    roman: "Hormizd IV",
    band: "end",
    col: 0,
    y: 840,
    gap: true,
    guest: true,
    caption: "사이 왕위",
    parentHint: "왕이 아니라 생략 표시입니다.",
    summary: "호스로 1세와 호스로 2세 사이입니다. 호스로 2세의 아버지는 호르미즈드 4세이고, 호스로 1세의 손자입니다.",
    aliases: ["hormizd iv", "hormozd iv", "호르미즈드 4세"],
  },
  {
    id: "khosrow-ii",
    ko: "호스로 2세",
    roman: "Khosrow II",
    band: "end",
    col: 0,
    y: 1000,
    caption: "서기 590–628",
    parentHint: "호스로 1세의 아들이 아닙니다. 아버지는 호르미즈드 4세로 전합니다.",
    summary:
      "호스로 1세의 손자입니다. 비잔티움의 동쪽을 깊이 쳤다가 헤라클리우스와의 전쟁에서 밀려났고, 628년 죽었습니다. 이 사이트에는 단독 글이 없고, 야즈데게르드의 글이 이 전쟁을 짧게 적습니다.",
    aliases: ["khosrow ii", "khosrau ii", "chosroes ii", "호스로 2세"],
  },
  {
    id: "sas-gap-3",
    ko: "…",
    roman: "omitted last Sasanian reigns",
    band: "end",
    col: 0,
    y: 1160,
    gap: true,
    guest: true,
    caption: "사이 왕위",
    parentHint: "왕이 아니라 생략 표시입니다.",
    summary:
      "호스로 2세와 야즈데게르드 3세 사이의 짧은 왕위입니다. 카바드 2세와 아르다시르 3세, 그리고 짧은 여왕의 재위가 있습니다. 야즈데게르드는 호스로 2세의 아들이 아닙니다.",
    aliases: ["kavad ii", "카바드 2세", "ardashir iii", "아르다시르 3세", "boran", "보란"],
  },
  {
    id: "yazdegerd",
    ko: "야즈데게르드 3세",
    roman: "Yazdegerd III",
    band: "end",
    col: 0,
    y: 1320,
    slug: "yazdegerd-iii",
    caption: "서기 632–651",
    parentHint: "호스로 2세의 아들이 아닙니다. 손자 세대로 전합니다.",
    summary:
      "사산 왕조의 마지막 왕입니다. 아버지는 샤흐리야르로 후대 연대기가 전합니다. 651년 무렵 메르브에서 죽고 왕조가 끝납니다. 페르시아어는 그 해에 사라지지 않습니다.",
    aliases: ["yazdegerd", "yazdegerd iii", "yazdgird", "야즈데게르드", "야즈데게르드 3세"],
  },
];

function sasanianLinks(): TreeLink[] {
  const links: TreeLink[] = [];
  const parent = (from: string, to: string) => links.push({ from, to, kind: "parent" });
  const ellipsis = (from: string, to: string) => links.push({ from, to, kind: "ellipsis" });
  parent("ardashir", "shapur");
  ellipsis("shapur", "sas-gap-1");
  ellipsis("sas-gap-1", "khosrow-i");
  ellipsis("khosrow-i", "sas-gap-2");
  ellipsis("sas-gap-2", "khosrow-ii");
  ellipsis("khosrow-ii", "sas-gap-3");
  ellipsis("sas-gap-3", "yazdegerd");
  return links;
}

function norm(value: string) {
  return value.toLowerCase().replace(/[\s·.'’\-()/_]/g, "");
}

type Box = { id: string; x: number; y: number; w: number; h: number; cx: number; cy: number };

function placeNodes(seeds: TreeSeed[]): { nodes: LayoutNode[]; width: number; height: number } {
  const cols = seeds.map((seed) => seed.col);
  const globalMin = Math.min(...cols);
  const globalMax = Math.max(...cols);
  const natural = (globalMax - globalMin) * COL + NODE_W;
  const contentWidth = Math.max(natural, 440);
  const width = contentWidth + PAD * 2;
  const center = (contentWidth - natural) / 2;
  const nodes: LayoutNode[] = seeds.map((seed) => {
    const keys = [
      seed.gap ? undefined : seed.ko,
      seed.gap ? undefined : seed.roman,
      seed.id,
      seed.slug,
      ...(seed.aliases ?? []),
    ].filter((key): key is string => Boolean(key));
    return {
      ...seed,
      x: PAD + center + (seed.col - globalMin) * COL,
      w: NODE_W,
      h: NODE_H,
      sub: seed.gap ? "사이 왕위" : seed.roman,
      href: seed.slug ? `/rulers/${seed.slug}` : undefined,
      keys,
    };
  });
  const height = Math.max(...nodes.map((node) => node.y + node.h)) + 36;
  return { nodes, width, height };
}

function boxes(nodes: LayoutNode[]): Box[] {
  return nodes.map((node) => ({
    id: node.id,
    x: node.x,
    y: node.y,
    w: node.w,
    h: node.h,
    cx: node.x + node.w / 2,
    cy: node.y + node.h / 2,
  }));
}

function directedPath(from: Box, to: Box, kind: LinkKind): { d: string; d2?: string } {
  const downward = from.cy <= to.cy;
  const x1 = from.cx;
  const y1 = downward ? from.y + from.h : from.y;
  const x2 = to.cx;
  const y2 = downward ? to.y : to.y + to.h;
  const sameRow = Math.abs(from.cy - to.cy) < 24;
  if (sameRow && (kind === "variant-parent" || kind === "dispute" || kind === "ellipsis")) {
    const left = Math.min(x1, x2);
    const right = Math.max(x1, x2);
    const y = Math.min(from.y, to.y);
    return { d: `M ${left} ${y} Q ${(left + right) / 2} ${y - 26}, ${right} ${y}` };
  }
  if (Math.abs(x1 - x2) < 6) return { d: `M ${x1} ${y1} V ${y2}` };
  const mid = (y1 + y2) / 2;
  return { d: `M ${x1} ${y1} C ${x1} ${mid}, ${x2} ${mid}, ${x2} ${y2}` };
}

function spousePath(a: Box, b: Box, dashed: boolean): { d: string; d2?: string } {
  const left = a.cx <= b.cx ? a : b;
  const right = a.cx <= b.cx ? b : a;
  const x1 = left.x + left.w;
  const x2 = right.x;
  const gap = x2 - x1;
  if (Math.abs(a.cy - b.cy) < 24 && gap < COL * 0.75) {
    const y = (left.cy + right.cy) / 2;
    if (dashed) return { d: `M ${x1} ${y} H ${x2}` };
    return { d: `M ${x1} ${y - 2.5} H ${x2}`, d2: `M ${x1} ${y + 2.5} H ${x2}` };
  }
  if (Math.abs(a.cy - b.cy) < 24) {
    const y = left.y;
    const mid = (left.cx + right.cx) / 2;
    const lift = Math.min(34, 16 + Math.abs(right.cx - left.cx) * 0.05);
    return { d: `M ${left.cx} ${y} Q ${mid} ${y - lift}, ${right.cx} ${y}` };
  }
  const upper = a.cy <= b.cy ? a : b;
  const lower = a.cy <= b.cy ? b : a;
  const mid = (upper.y + upper.h + lower.y) / 2;
  const bow = upper.cx <= lower.cx ? 36 : -36;
  return { d: `M ${upper.cx} ${upper.y + upper.h} C ${upper.cx + bow} ${mid}, ${lower.cx + bow} ${mid}, ${lower.cx} ${lower.y}` };
}

function edgePaths(nodes: LayoutNode[], links: TreeLink[]): LayoutEdge[] {
  const box = new Map(boxes(nodes).map((item) => [item.id, item]));
  return links.map((link) => {
    const from = box.get(link.from);
    const to = box.get(link.to);
    if (!from || !to) throw new Error(`가족관계도 선 오류: ${link.kind} ${link.from} → ${link.to}`);
    const spouse = link.kind === "spouse" || link.kind === "variant-spouse";
    const path = spouse ? spousePath(from, to, link.kind === "variant-spouse") : directedPath(from, to, link.kind);
    const dx = Math.abs(from.cx - to.cx);
    const dy = Math.abs(from.cy - to.cy);
    const local = spouse ? dx < COL * 1.6 && dy < NODE_H * 1.4 : dx < COL * 1.8 && dy < 240;
    return {
      id: `${link.kind}-${link.from}-${link.to}`,
      d: path.d,
      d2: path.d2,
      kind: link.kind,
      from: link.from,
      to: link.to,
      local,
      quiet: Math.hypot(dx, dy) > 980,
    };
  });
}

function buildBands(nodes: LayoutNode[], meta: BandMeta[]): LayoutBand[] {
  return meta.map((band) => {
    const group = nodes.filter((node) => node.band === band.id).sort((a, b) => a.y - b.y || a.x - b.x);
    if (group.length === 0) throw new Error(`가족관계도 세대가 비었습니다: ${band.id}`);
    const top = Math.min(...group.map((node) => node.y)) - 52;
    const bottom = Math.max(...group.map((node) => node.y + node.h)) + 18;
    return { ...band, top, height: bottom - top, nodeIds: group.map((node) => node.id) };
  });
}

function validate(nodes: LayoutNode[], links: TreeLink[], bands: LayoutBand[]) {
  const ids = new Set<string>();
  for (const node of nodes) {
    if (ids.has(node.id)) throw new Error(`가족관계도 id 중복: ${node.id}`);
    ids.add(node.id);
    if (!bands.some((band) => band.id === node.band)) throw new Error(`가족관계도 세대 없음: ${node.id}`);
  }
  for (const link of links) {
    if (!ids.has(link.from) || !ids.has(link.to)) {
      throw new Error(`가족관계도 선 오류: ${link.kind} ${link.from} → ${link.to}`);
    }
  }
  for (let i = 0; i < nodes.length; i += 1) {
    for (let j = i + 1; j < nodes.length; j += 1) {
      const a = nodes[i];
      const b = nodes[j];
      const overlapX = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
      const overlapY = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
      if (overlapX > 4 && overlapY > 4) throw new Error(`가족관계도 칸이 겹칩니다: ${a.id} · ${b.id}`);
      if (overlapX < 18) continue;
      const upper = a.y <= b.y ? a : b;
      const lower = a.y <= b.y ? b : a;
      const gap = lower.y - (upper.y + upper.h);
      if (gap < 0 || gap > 72) continue;
      const related = links.some(
        (link) => (link.from === a.id && link.to === b.id) || (link.from === b.id && link.to === a.id),
      );
      if (!related) throw new Error(`위아래가 어긋납니다: ${upper.id} 아래 ${lower.id}`);
    }
  }
  for (let i = 1; i < bands.length; i += 1) {
    const gap = bands[i].top - (bands[i - 1].top + bands[i - 1].height);
    if (gap < 12) throw new Error(`세대 간격이 좁습니다: ${bands[i - 1].id} → ${bands[i].id}`);
  }
}

function layoutTree(id: TreeId, bands: BandMeta[], seeds: TreeSeed[], links: TreeLink[]): FamilyTreeLayout {
  const placed = placeNodes(seeds);
  const layoutBands = buildBands(placed.nodes, bands);
  validate(placed.nodes, links, layoutBands);
  return {
    id,
    width: placed.width,
    height: placed.height,
    nodes: placed.nodes,
    edges: edgePaths(placed.nodes, links),
    bands: layoutBands,
    links,
    byId: new Map(placed.nodes.map((node) => [node.id, node])),
  };
}

export const TREES: Record<TreeId, FamilyTreeLayout> = {
  achaemenid: layoutTree("achaemenid", achaemenidBands, achaemenidSeeds, achaemenidLinks()),
  parthian: layoutTree("parthian", parthianBands, parthianSeeds, parthianLinks()),
  sasanian: layoutTree("sasanian", sasanianBands, sasanianSeeds, sasanianLinks()),
};

export const TREE_LIST = TREE_TABS.map((tab) => TREES[tab.id]);

function idsOf(tree: FamilyTreeLayout, id: string, kind: LinkKind, direction: "from" | "to") {
  return tree.links
    .filter((link) => link.kind === kind && (direction === "to" ? link.to === id : link.from === id))
    .map((link) => (direction === "to" ? link.from : link.to))
    .sort();
}

function expectIds(tree: FamilyTreeLayout, id: string, kind: LinkKind, direction: "from" | "to", expected: string[]) {
  const got = idsOf(tree, id, kind, direction);
  const want = [...expected].sort();
  if (got.join("|") !== want.join("|")) {
    throw new Error(`가족관계도 관계 오류: ${tree.id} ${id} ${kind} ${direction} [${got.join(", ")}] ≠ [${want.join(", ")}]`);
  }
}

function assertStory() {
  const ach = TREES.achaemenid;
  const par = TREES.parthian;
  const sas = TREES.sasanian;
  expectIds(ach, "cyrus-i", "parent", "to", ["teispes"]);
  expectIds(ach, "ariaramnes", "parent", "to", []);
  expectIds(ach, "ariaramnes", "variant-parent", "to", ["teispes"]);
  expectIds(ach, "cyrus", "parent", "to", ["cambyses-i"]);
  expectIds(ach, "cyrus", "variant-parent", "to", ["mandane"]);
  expectIds(ach, "cambyses-ii", "parent", "to", ["cassandane", "cyrus"]);
  expectIds(ach, "bardiya", "parent", "to", ["cassandane", "cyrus"]);
  expectIds(ach, "atossa", "parent", "to", ["cyrus"]);
  expectIds(ach, "darius-i", "parent", "to", ["hystaspes"]);
  expectIds(ach, "xerxes-i", "parent", "to", ["atossa", "darius-i"]);
  expectIds(ach, "artaxerxes-i", "parent", "to", ["xerxes-i"]);
  expectIds(ach, "darius-iii", "parent", "to", []);
  expectIds(ach, "gaumata", "parent", "to", []);
  expectIds(ach, "ach-gap", "parent", "to", []);
  expectIds(ach, "ach-gap", "ellipsis", "to", ["artaxerxes-i"]);
  expectIds(ach, "darius-iii", "ellipsis", "to", ["ach-gap"]);
  if (ach.links.some((link) => link.kind === "parent" && (link.from === "ach-gap" || link.to === "ach-gap"))) {
    throw new Error("생략 표시를 부자로 이었습니다.");
  }
  if (ach.links.some((link) => link.kind === "parent" && (link.from === "darius-i" && link.to === "cyrus"))) {
    throw new Error("다레이오스를 키루스의 아들로 이었습니다.");
  }
  expectIds(par, "mithridates-i", "parent", "to", []);
  expectIds(par, "mithridates-ii", "parent", "to", []);
  if (par.links.some((link) => link.kind === "parent")) throw new Error("파르티아 탭에 부자 선이 있습니다.");
  expectIds(sas, "shapur", "parent", "to", ["ardashir"]);
  expectIds(sas, "khosrow-i", "parent", "to", []);
  expectIds(sas, "khosrow-ii", "parent", "to", []);
  expectIds(sas, "yazdegerd", "parent", "to", []);

  const seen = new Map<string, string>();
  for (const tree of TREE_LIST) {
    for (const node of tree.nodes) {
      for (const key of node.keys) {
        const value = norm(key);
        if (!value) continue;
        const prev = seen.get(value);
        if (prev && prev !== node.id) throw new Error(`검색 키가 겹칩니다: ${value} (${prev}, ${node.id})`);
        seen.set(value, node.id);
      }
    }
  }
}

assertStory();

export type RelationPerson = { id: string; ko: string; roman: string; href?: string };

function personRef(tree: FamilyTreeLayout, id: string): RelationPerson {
  const node = tree.byId.get(id);
  if (!node) throw new Error(id);
  return { id: node.id, ko: node.ko, roman: node.sub, href: node.href };
}

function byX(tree: FamilyTreeLayout) {
  return (a: RelationPerson, b: RelationPerson) => (tree.byId.get(a.id)?.x ?? 0) - (tree.byId.get(b.id)?.x ?? 0);
}

export function relationsOf(tree: FamilyTreeLayout, id: string) {
  const order = byX(tree);
  const pick = (kind: LinkKind, toward: "parents" | "children") =>
    tree.links
      .filter((link) => link.kind === kind && (toward === "parents" ? link.to === id : link.from === id))
      .map((link) => personRef(tree, toward === "parents" ? link.from : link.to))
      .sort(order);
  const parents = pick("parent", "parents");
  const variantParents = pick("variant-parent", "parents");
  const children = pick("parent", "children");
  const variantChildren = pick("variant-parent", "children");
  const spouses = tree.links
    .filter((link) => link.kind === "spouse" && (link.from === id || link.to === id))
    .map((link) => personRef(tree, link.from === id ? link.to : link.from))
    .sort(order);
  const variantSpouses = tree.links
    .filter((link) => link.kind === "variant-spouse" && (link.from === id || link.to === id))
    .map((link) => personRef(tree, link.from === id ? link.to : link.from))
    .sort(order);
  const disputes = tree.links
    .filter((link) => link.kind === "dispute" && (link.from === id || link.to === id))
    .map((link) => personRef(tree, link.from === id ? link.to : link.from))
    .sort(order);
  const succession = tree.links
    .filter((link) => link.kind === "ellipsis" && (link.from === id || link.to === id))
    .map((link) => personRef(tree, link.from === id ? link.to : link.from))
    .sort(order);
  const parentIds = new Set(parents.map((person) => person.id));
  const siblingIds = new Set<string>();
  for (const link of tree.links) {
    if (link.kind !== "parent" || !parentIds.has(link.from) || link.to === id) continue;
    siblingIds.add(link.to);
  }
  const siblings = [...siblingIds].map((siblingId) => personRef(tree, siblingId)).sort(order);
  return { parents, variantParents, children, variantChildren, spouses, variantSpouses, disputes, succession, siblings };
}

export function searchInTree(tree: FamilyTreeLayout, query: string) {
  const q = norm(query);
  if (!q) return [];
  return tree.nodes
    .map((node) => {
      const keys = node.keys.map(norm);
      const exact = keys.some((key) => key === q);
      const prefix = keys.some((key) => key.startsWith(q));
      const hit = exact || prefix || keys.some((key) => key.includes(q));
      return { node, exact, prefix, hit };
    })
    .filter((item) => item.hit)
    .sort((a, b) => Number(b.exact) - Number(a.exact) || Number(b.prefix) - Number(a.prefix) || a.node.ko.localeCompare(b.node.ko, "ko"))
    .map((item) => item.node);
}

export function findExact(query: string): { treeId: TreeId; id: string } | null {
  const q = norm(query);
  if (!q) return null;
  for (const tree of TREE_LIST) {
    const node = tree.nodes.find((item) => item.keys.some((key) => norm(key) === q));
    if (node) return { treeId: tree.id, id: node.id };
  }
  return null;
}

export function findFocus(value: string): { treeId: TreeId; id: string } | null {
  const exact = findExact(value);
  if (exact) return exact;
  const hits = TREE_LIST.flatMap((tree) => searchInTree(tree, value).map((node) => ({ treeId: tree.id, id: node.id })));
  return hits.length === 1 ? hits[0] : null;
}

export function familyTreeHref(slug: string): string | null {
  for (const tree of TREE_LIST) {
    const node = tree.nodes.find((item) => item.slug === slug);
    if (!node) continue;
    const treeQuery = tree.id === "achaemenid" ? "" : `tree=${tree.id}&`;
    return `/family-tree?${treeQuery}focus=${node.id}`;
  }
  return null;
}
