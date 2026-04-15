"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const LABEL_DATA = [
  { lot: "LOT-F-2026-0415-001", type: "PC Steel Wire \u03C67.0mm", qty: 120, weight: "2,450 kg", date: "2026-04-15", printed: true },
  { lot: "LOT-F-2026-0415-002", type: "PC Steel Strand 12.7mm", qty: 80, weight: "3,120 kg", date: "2026-04-15", printed: true },
  { lot: "LOT-F-2026-0415-003", type: "PC Steel Wire \u03C69.0mm", qty: 95, weight: "2,810 kg", date: "2026-04-15", printed: false },
  { lot: "LOT-F-2026-0415-004", type: "PC Steel Strand 15.2mm", qty: 60, weight: "4,200 kg", date: "2026-04-15", printed: false },
];

export default function P3LabelPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLot, setSelectedLot] = useState<string | null>(null);

  const filtered = LABEL_DATA.filter(
    (d) =>
      d.lot.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selected = LABEL_DATA.find((d) => d.lot === selectedLot);

  return (
    <div>
      <PageHeader
        title="성형"
        accent="LOT 라벨 인쇄"
        nodeRef="P3-LBL-001"
        status="PRINTER READY"
      />

      {/* Search */}
      <section className="mb-8">
        <div className="bg-surface-container-lowest p-6">
          <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-3">
            LOT 검색
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="LOT 번호 또는 자재 종류로 검색..."
            className="w-full bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-4 py-5 text-lg font-headline text-on-surface placeholder:text-on-surface-variant/30 transition-colors"
          />
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LOT List */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
              LOT 목록
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
                <div className="flex gap-6">
                  <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
                    {d.type}
                  </span>
                  <span className="font-label text-xs tabular-nums text-on-surface-variant">
                    {d.qty} pcs | {d.weight}
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
              라벨 미리보기
            </span>
            <div className="flex-1 h-px bg-outline-variant/10" />
          </div>

          {selected ? (
            <div className="bg-surface-container-lowest">
              {/* Label Preview Card */}
              <div className="bg-white text-black p-8 mx-6 mt-6">
                <div className="border-2 border-black p-6">
                  <div className="text-center mb-4 border-b-2 border-black pb-4">
                    <div className="text-2xl font-black font-headline tracking-tight">VICON MES</div>
                    <div className="text-xs font-label uppercase tracking-widest mt-1">
                      성형 공정 - LOT 라벨
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <div className="text-[11px] font-label uppercase tracking-widest text-gray-500">LOT No.</div>
                      <div className="font-black font-headline tabular-nums text-lg">{selected.lot}</div>
                    </div>
                    <div>
                      <div className="text-[11px] font-label uppercase tracking-widest text-gray-500">날짜</div>
                      <div className="font-bold font-headline tabular-nums">{selected.date}</div>
                    </div>
                    <div>
                      <div className="text-[11px] font-label uppercase tracking-widest text-gray-500">자재</div>
                      <div className="font-bold font-headline">{selected.type}</div>
                    </div>
                    <div>
                      <div className="text-[11px] font-label uppercase tracking-widest text-gray-500">수량</div>
                      <div className="font-bold font-headline tabular-nums">{selected.qty} pcs</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-[11px] font-label uppercase tracking-widest text-gray-500">중량</div>
                      <div className="font-black font-headline tabular-nums text-xl">{selected.weight}</div>
                    </div>
                  </div>
                  {/* Barcode placeholder */}
                  <div className="flex justify-center mt-4">
                    <div className="flex gap-[2px]">
                      {Array.from({ length: 40 }).map((_, i) => (
                        <div
                          key={i}
                          className="bg-black"
                          style={{
                            width: Math.random() > 0.5 ? "2px" : "1px",
                            height: "40px",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-center text-[11px] font-label tabular-nums mt-1">
                    {selected.lot}
                  </div>
                </div>
              </div>

              {/* Print Button */}
              <div className="p-6">
                <button className="w-full bg-primary-accent text-white px-8 py-5 font-label text-xs uppercase tracking-widest font-bold hover:bg-primary-accent/80 transition-colors active:scale-95">
                  라벨 인쇄
                </button>
                <button className="w-full bg-surface-container text-on-surface-variant px-8 py-4 font-label text-xs uppercase tracking-widest font-bold hover:bg-surface-container-high transition-colors mt-2 border border-outline-variant/20">
                  재인쇄
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-surface-container-lowest p-12 flex items-center justify-center min-h-[400px]">
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">
                LOT를 선택하여 라벨을 미리보기
              </span>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
