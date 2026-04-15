"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const SLEEPER_DATA = [
  {
    lot: "LOT-SLP-2026-0415-001",
    type: "Deck Sleeper Type-A",
    dimensions: "2,400 x 250 x 200 mm",
    weight: "125 kg",
    tensionForce: "1,200 kN",
    concreteGrade: "C50/60",
    castDate: "2026-04-14",
    cureAge: "1일",
    weldStatus: "PASS",
    printed: false,
  },
  {
    lot: "LOT-SLP-2026-0415-002",
    type: "Deck Sleeper Type-A",
    dimensions: "2,400 x 250 x 200 mm",
    weight: "126 kg",
    tensionForce: "1,200 kN",
    concreteGrade: "C50/60",
    castDate: "2026-04-14",
    cureAge: "1일",
    weldStatus: "PASS",
    printed: true,
  },
  {
    lot: "LOT-SLP-2026-0415-003",
    type: "Rail Sleeper RS-200",
    dimensions: "2,600 x 300 x 230 mm",
    weight: "185 kg",
    tensionForce: "1,500 kN",
    concreteGrade: "C60/75",
    castDate: "2026-04-13",
    cureAge: "2일",
    weldStatus: "PASS",
    printed: false,
  },
  {
    lot: "LOT-SLP-2026-0414-010",
    type: "Bridge Deck BD-150",
    dimensions: "3,000 x 400 x 280 mm",
    weight: "310 kg",
    tensionForce: "2,000 kN",
    concreteGrade: "C60/75",
    castDate: "2026-04-12",
    cureAge: "3일",
    weldStatus: "FAIL",
    printed: false,
  },
];

export default function FinSleeperLabelPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLot, setSelectedLot] = useState<string | null>(null);

  const filtered = SLEEPER_DATA.filter(
    (d) =>
      d.lot.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selected = SLEEPER_DATA.find((d) => d.lot === selectedLot);

  return (
    <div>
      <PageHeader
        title="마무리"
        accent="슬리퍼 라벨"
        nodeRef="FIN-SLB-001"
        status="PRINTER READY"
      />

      {/* Search */}
      <section className="mb-8">
        <div className="bg-surface-container-lowest p-6">
          <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-3">
            슬리퍼 LOT 검색
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="LOT 번호 또는 슬리퍼 종류로 검색..."
            className="w-full bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-4 py-5 text-lg font-headline text-on-surface placeholder:text-on-surface-variant/30 transition-colors"
          />
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sleeper LOT List */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
              슬리퍼 LOT 목록
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
                  <div className="flex items-center gap-2">
                    <StatusBadge
                      type={d.weldStatus === "PASS" ? "running" : "error"}
                      label={`용접: ${d.weldStatus}`}
                    />
                    <StatusBadge
                      type={d.printed ? "running" : "idle"}
                      label={d.printed ? "인쇄완료" : "대기"}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 mt-2">
                  <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
                    {d.type}
                  </span>
                  <span className="font-label text-xs tabular-nums text-on-surface-variant">
                    {d.weight} | {d.dimensions}
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
              슬리퍼 라벨 미리보기
            </span>
            <div className="flex-1 h-px bg-outline-variant/10" />
          </div>

          {selected ? (
            <div className="bg-surface-container-lowest">
              {/* Label Preview */}
              <div className="bg-white text-black p-6 mx-6 mt-6">
                <div className="border-2 border-black p-5">
                  {/* Header */}
                  <div className="text-center mb-4 border-b-2 border-black pb-3">
                    <div className="text-xl font-black font-headline tracking-tight">VICON SLEEPER</div>
                    <div className="text-[11px] font-label uppercase tracking-widest mt-1">
                      프리스트레스트 콘크리트 슬리퍼 - 제품 라벨
                    </div>
                  </div>

                  {/* Sleeper Info Grid */}
                  <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                    <div>
                      <div className="text-[8px] font-label uppercase tracking-widest text-gray-500">LOT No.</div>
                      <div className="font-black font-headline tabular-nums text-base">{selected.lot}</div>
                    </div>
                    <div>
                      <div className="text-[8px] font-label uppercase tracking-widest text-gray-500">종류</div>
                      <div className="font-bold font-headline text-sm">{selected.type}</div>
                    </div>
                    <div>
                      <div className="text-[8px] font-label uppercase tracking-widest text-gray-500">치수</div>
                      <div className="font-bold font-headline tabular-nums text-sm">{selected.dimensions}</div>
                    </div>
                    <div>
                      <div className="text-[8px] font-label uppercase tracking-widest text-gray-500">중량</div>
                      <div className="font-bold font-headline tabular-nums text-sm">{selected.weight}</div>
                    </div>
                  </div>

                  {/* Technical Specs */}
                  <div className="border-t border-gray-300 pt-3 mb-3">
                    <div className="grid grid-cols-3 gap-3 text-sm">
                      <div>
                        <div className="text-[8px] font-label uppercase tracking-widest text-gray-500">긴장력</div>
                        <div className="font-bold font-headline tabular-nums">{selected.tensionForce}</div>
                      </div>
                      <div>
                        <div className="text-[8px] font-label uppercase tracking-widest text-gray-500">콘크리트</div>
                        <div className="font-bold font-headline">{selected.concreteGrade}</div>
                      </div>
                      <div>
                        <div className="text-[8px] font-label uppercase tracking-widest text-gray-500">타설일</div>
                        <div className="font-bold font-headline tabular-nums">{selected.castDate}</div>
                      </div>
                    </div>
                  </div>

                  {/* Weld Status */}
                  <div className="border-t border-gray-300 pt-3 mb-3 flex justify-between items-center">
                    <div>
                      <div className="text-[8px] font-label uppercase tracking-widest text-gray-500">용접 검사</div>
                      <div className={`font-black font-headline text-sm ${selected.weldStatus === "PASS" ? "text-green-700" : "text-red-700"}`}>
                        {selected.weldStatus}
                      </div>
                    </div>
                    <div>
                      <div className="text-[8px] font-label uppercase tracking-widest text-gray-500">양생 기간</div>
                      <div className="font-bold font-headline">{selected.cureAge}</div>
                    </div>
                  </div>

                  {/* QR + Barcode */}
                  <div className="flex justify-between items-end mt-3 border-t border-gray-300 pt-3">
                    <div className="w-16 h-16 border-2 border-black grid grid-cols-4 grid-rows-4 gap-[1px] p-1">
                      {Array.from({ length: 16 }).map((_, i) => (
                        <div key={i} className={Math.random() > 0.4 ? "bg-black" : "bg-white"} />
                      ))}
                    </div>
                    <div className="text-right">
                      <div className="flex gap-[1px] justify-end">
                        {Array.from({ length: 35 }).map((_, i) => (
                          <div
                            key={i}
                            className="bg-black"
                            style={{ width: Math.random() > 0.5 ? "2px" : "1px", height: "32px" }}
                          />
                        ))}
                      </div>
                      <div className="text-[8px] font-label tabular-nums mt-1">{selected.lot}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Weld Status Warning */}
              {selected.weldStatus === "FAIL" && (
                <div className="mx-6 mt-3 p-4 bg-error/10 border-l-4 border-error">
                  <span className="font-label text-xs uppercase tracking-widest text-error font-bold">
                    경고: 용접 검사 불합격 - 라벨에 해당 내용이 표시됩니다
                  </span>
                </div>
              )}

              {/* Print Actions */}
              <div className="p-6">
                <button
                  className={`w-full px-8 py-5 font-label text-xs uppercase tracking-widest font-bold transition-colors active:scale-95 ${
                    selected.weldStatus === "PASS"
                      ? "bg-primary-accent text-white hover:bg-primary-accent/80"
                      : "bg-surface-container text-on-surface-variant/40 cursor-not-allowed"
                  }`}
                  disabled={selected.weldStatus !== "PASS"}
                >
                  {selected.weldStatus === "PASS" ? "슬리퍼 라벨 인쇄" : "인쇄 불가 - 용접 불합격"}
                </button>
                {selected.printed && (
                  <button className="w-full bg-surface-container text-on-surface-variant px-8 py-4 font-label text-xs uppercase tracking-widest font-bold hover:bg-surface-container-high transition-colors mt-2 border border-outline-variant/20">
                    재인쇄
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-surface-container-lowest p-12 flex items-center justify-center min-h-[400px]">
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">
                슬리퍼 LOT를 선택하여 라벨을 미리보기
              </span>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
