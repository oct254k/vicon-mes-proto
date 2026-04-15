"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const DECK_LOTS = [
  { lot: "LOT-A-2026-0415-001", product: "Deck Sleeper Type-A", components: 5, weight: "3,730 kg", date: "2026-04-15", printed: true },
  { lot: "LOT-A-2026-0415-002", product: "Deck Sleeper Type-A", components: 5, weight: "3,850 kg", date: "2026-04-15", printed: false },
  { lot: "LOT-A-2026-0415-003", product: "Rail Sleeper RS-200", components: 4, weight: "2,980 kg", date: "2026-04-15", printed: false },
  { lot: "LOT-A-2026-0414-012", product: "Deck Sleeper Type-B", components: 5, weight: "4,120 kg", date: "2026-04-14", printed: true },
];

export default function P4LabelPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLot, setSelectedLot] = useState<string | null>(null);

  const filtered = DECK_LOTS.filter(
    (d) =>
      d.lot.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.product.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selected = DECK_LOTS.find((d) => d.lot === selectedLot);

  return (
    <div>
      <PageHeader
        title="조립"
        accent="데크 LOT 라벨"
        nodeRef="P4-LBL-001"
        status="PRINTER READY"
        description="조립 완료된 데크 제품의 LOT 바코드 라벨을 검색하고 인쇄합니다."
      />

      {/* Search */}
      <section className="mb-8">
        <div className="bg-surface-container-lowest p-6">
          <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-3">
            데크 LOT 검색
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="LOT 번호 또는 제품명으로 검색..."
            className="w-full bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-4 py-5 text-lg font-headline text-on-surface placeholder:text-on-surface-variant/30 transition-colors"
          />
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LOT List */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
              데크 LOT 목록
            </span>
            <div className="flex-1 h-px bg-outline-variant/10" />
            <span className="font-label text-xs tabular-nums text-on-surface-variant opacity-60">
              {filtered.length} 건
            </span>
          </div>
          <div className="space-y-2">
            {filtered.map((d) => (
              <button
                key={d.lot}
                onClick={() => setSelectedLot(d.lot)}
                className={`w-full text-left p-5 transition-colors ${
                  selectedLot === d.lot
                    ? "bg-primary-accent/10 border-l-4 border-primary-accent"
                    : "bg-surface-container-lowest hover:bg-surface-container-highest/20 border-l-4 border-transparent"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-headline text-sm font-bold tabular-nums">{d.lot}</span>
                  <StatusBadge
                    type={d.printed ? "running" : "idle"}
                    label={d.printed ? "인쇄완료" : "대기"}
                  />
                </div>
                <div className="flex flex-wrap gap-4">
                  <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
                    {d.product}
                  </span>
                  <span className="font-label text-xs tabular-nums text-on-surface-variant">
                    {d.components} 부품 | {d.weight}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Label Preview */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
              데크 라벨 미리보기
            </span>
            <div className="flex-1 h-px bg-outline-variant/10" />
          </div>

          {selected ? (
            <div className="bg-surface-container-lowest">
              <div className="bg-white text-black p-8 mx-6 mt-6">
                <div className="border-2 border-black p-6">
                  <div className="text-center mb-4 border-b-2 border-black pb-4">
                    <div className="text-2xl font-black font-headline tracking-tight">VICON MES</div>
                    <div className="text-xs font-label uppercase tracking-widest mt-1">
                      조립 공정 - 데크 LOT 라벨
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <div className="text-[11px] font-label uppercase tracking-widest text-gray-500">데크 LOT 번호</div>
                      <div className="font-black font-headline tabular-nums text-lg">{selected.lot}</div>
                    </div>
                    <div>
                      <div className="text-[11px] font-label uppercase tracking-widest text-gray-500">날짜</div>
                      <div className="font-bold font-headline tabular-nums">{selected.date}</div>
                    </div>
                    <div>
                      <div className="text-[11px] font-label uppercase tracking-widest text-gray-500">제품</div>
                      <div className="font-bold font-headline">{selected.product}</div>
                    </div>
                    <div>
                      <div className="text-[11px] font-label uppercase tracking-widest text-gray-500">부품</div>
                      <div className="font-bold font-headline tabular-nums">{selected.components} 개</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-[11px] font-label uppercase tracking-widest text-gray-500">합계 중량</div>
                      <div className="font-black font-headline tabular-nums text-xl">{selected.weight}</div>
                    </div>
                  </div>
                  {/* QR placeholder */}
                  <div className="flex justify-between items-end mt-4">
                    <div className="w-20 h-20 border-2 border-black grid grid-cols-5 grid-rows-5 gap-[1px] p-1">
                      {Array.from({ length: 25 }).map((_, i) => (
                        <div key={i} className={Math.random() > 0.4 ? "bg-black" : "bg-white"} />
                      ))}
                    </div>
                    <div className="flex gap-[2px]">
                      {Array.from({ length: 30 }).map((_, i) => (
                        <div
                          key={i}
                          className="bg-black"
                          style={{ width: Math.random() > 0.5 ? "2px" : "1px", height: "40px" }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-right text-[11px] font-label tabular-nums mt-1">
                    {selected.lot}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <button className="w-full bg-primary-accent text-white px-8 py-5 font-label text-xs uppercase tracking-widest font-bold hover:bg-primary-accent/80 transition-colors active:scale-95">
                  데크 라벨 인쇄
                </button>
                <button className="w-full bg-surface-container text-on-surface-variant px-8 py-4 font-label text-xs uppercase tracking-widest font-bold hover:bg-surface-container-high transition-colors mt-2 border border-outline-variant/20">
                  재인쇄
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-surface-container-lowest p-12 flex items-center justify-center min-h-[400px]">
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">
                데크 LOT를 선택하여 라벨을 미리보기
              </span>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
