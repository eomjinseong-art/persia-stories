import type { Metadata } from "next";
import Link from "next/link";
import { Crumb } from "@/components/ArticleBits";
import { JsonLd } from "@/components/JsonLd";
import { places } from "@/content/places";
import { articleLd, pageMeta } from "@/lib/seo";

const description =
  "페르세폴리스, 파사르가다에, 수사, 왕의 길, 베히스툰, 나크시 루스탐, 크테시폰. 궁전과 비문, 수도가 바뀌는 자리를 짧게 적습니다.";

export const metadata: Metadata = pageMeta({
  title: "장소",
  description,
  path: "/places",
});

export default function PlacesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd data={articleLd({ title: "장소", description, path: "/places" })} />
      <Crumb items={[{ label: "장소" }]} />
      <p className="mt-6 text-xs tracking-[0.2em] text-terra">PLACES</p>
      <h1 className="mt-2 font-serif text-4xl text-ink">장소</h1>
      <p className="mt-4 text-sm leading-7 text-muted">
        페르세폴리스만 보면 제국이 궁전 하나로 줄어듭니다. 행정은 수사, 첫 왕은 파사르가다에, 왕의 목소리는
        베히스툰 절벽, 파르티아와 사산의 수도는 크테시폰입니다. 지도 앱의 정확한 핀 대신, 각 장소가 무엇을
        맡았는지만 적습니다.
      </p>
      <div className="mt-8 space-y-4">
        {places.map((place) => (
          <Link
            key={place.slug}
            href={`/places/${place.slug}`}
            className="block rounded-lg border border-line bg-card p-5 hover:border-terra"
          >
            <p className="text-[11px] tracking-[0.14em] text-terra">{place.nameEn.toUpperCase()}</p>
            <h2 className="mt-1 font-serif text-2xl text-ink">{place.nameKo}</h2>
            <p className="mt-1 text-xs text-muted">{place.era}</p>
            <p className="mt-3 text-sm leading-6 text-muted">{place.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
