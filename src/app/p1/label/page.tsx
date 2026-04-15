"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const REPRINT_REASONS = [
  "라벨 훼손",
  "인쇄 불량",
  "정보 변경",
  "추가 발행",
  "기타",
];

const MOCK_LOT = {
  lotNo: "P1-OUT-0415-001",
  material: "SWRH 62B",
  wireType: "원형 4.0mm",
  weight: "1,820",
  quantity: 12,
  productionDate: "2026-04-15",
  equipment: "신선#1",
  operator: "김철수",
  shift: "주간 A",
  inspectionStatus: "합격",
};

export default function P1LabelPage() {
  const [searchLot, setSearchLot] = useState("");
  const [found, setFound] = useState(false);
  const [reprintReason, setReprintReason] = useState("");
  const [printCount, setPrintCount] = useState(1);

  const handleSearch = () => {
    if (searchLot.trim()) {
      setFound(true);
    }
  };

  return (
    <div className="max-w-5xl">
      <PageHeader
        title="LOT 라벨"
        accent="인쇄"
        nodeRef="SCR-P1-003"
        status="ONLINE"
        description="신선 공정에서 생산된 철선 LOT의 바코드 라벨을 검색하고 인쇄합니다."
      />

      {/* LOT Search */}
      <section className="bg-surface-container-lowest p-6 mb-6">
        <FieldHeader title="LOT 검색" moduleRef="MOD-LABEL-01" />
        <div className="flex gap-0 max-w-xl">
          <input
            type="text"
            value={searchLot}
            onChange={(e) => setSearchLot(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="LOT 번호 입력 또는 스캔..."
            className="flex-1 bg-surface-container border border-outline-variant/20 px-4 py-3 text-sm font-headline text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-primary-accent"
          />
          <button
            onClick={handleSearch}
            className="bg-primary-accent px-6 py-3 font-label text-xs uppercase tracking-widest font-bold text-on-primary-container hover:bg-primary-accent/80 transition-colors"
          >
            검색
          </button>
        </div>
      </section>

      {found && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Label Preview */}
          <section className="bg-surface-container-lowest p-6">
            <FieldHeader title="라벨 미리보기" moduleRef="PREVIEW" />

            {/* Physical label card */}
            <div className="bg-white text-[#111] p-6 border-2 border-[#333] relative">
              {/* Top bar */}
              <div className="border-b-2 border-[#111] pb-3 mb-4 flex justify-between items-start">
                <div>
                  <div className="text-xs font-bold tracking-widest uppercase text-[#666]">VICON WIRE CO., LTD.</div>
                  <div className="text-lg font-black tracking-tight font-headline mt-1">{MOCK_LOT.wireType}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold tracking-widest uppercase text-[#666]">생산일자</div>
                  <div className="text-sm font-bold tabular-nums">{MOCK_LOT.productionDate}</div>
                </div>
              </div>

              {/* Barcode area */}
              <div className="bg-[#f5f5f5] p-4 mb-4 text-center border border-[#ddd]">
                <div className="flex justify-center gap-[2px] mb-2">
                  {Array.from({ length: 40 }, (_, i) => (
                    <div
                      key={i}
                      className="bg-[#111]"
                      style={{
                        width: i % 3 === 0 ? "3px" : i % 2 === 0 ? "2px" : "1px",
                        height: "48px",
                      }}
                    />
                  ))}
                </div>
                <div className="text-xs font-mono font-bold tabular-nums tracking-widest">{MOCK_LOT.lotNo}</div>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
                <div className="flex justify-between border-b border-[#eee] pb-1">
                  <span className="text-[#888] uppercase text-[11px] font-bold tracking-wider">자재</span>
                  <span className="font-bold">{MOCK_LOT.material}</span>
                </div>
                <div className="flex justify-between border-b border-[#eee] pb-1">
                  <span className="text-[#888] uppercase text-[11px] font-bold tracking-wider">중량</span>
                  <span className="font-bold tabular-nums">{MOCK_LOT.weight} kg</span>
                </div>
                <div className="flex justify-between border-b border-[#eee] pb-1">
                  <span className="text-[#888] uppercase text-[11px] font-bold tracking-wider">수량</span>
                  <span className="font-bold tabular-nums">{MOCK_LOT.quantity} coils</span>
                </div>
                <div className="flex justify-between border-b border-[#eee] pb-1">
                  <span className="text-[#888] uppercase text-[11px] font-bold tracking-wider">설비</span>
                  <span className="font-bold">{MOCK_LOT.equipment}</span>
                </div>
                <div className="flex justify-between border-b border-[#eee] pb-1">
                  <span className="text-[#888] uppercase text-[11px] font-bold tracking-wider">작업자</span>
                  <span className="font-bold">{MOCK_LOT.operator}</span>
                </div>
                <div className="flex justify-between border-b border-[#eee] pb-1">
                  <span className="text-[#888] uppercase text-[11px] font-bold tracking-wider">근무조</span>
                  <span className="font-bold">{MOCK_LOT.shift}</span>
                </div>
              </div>

              {/* Inspection stamp */}
              <div className="mt-4 pt-3 border-t-2 border-[#111] flex justify-between items-center">
                <span className="text-[11px] font-bold tracking-widest uppercase text-[#888]">검사</span>
                <span className="bg-[#111] text-white px-3 py-1 text-xs font-bold tracking-widest uppercase">
                  {MOCK_LOT.inspectionStatus}
                </span>
              </div>
            </div>
          </section>

          {/* Print Actions */}
          <section className="bg-surface-container-lowest p-6">
            <FieldHeader title="인쇄 기능" moduleRef="PRINT-CTL" />

            {/* LOT Details Summary */}
            <div className="space-y-3 mb-8">
              {Object.entries({
                "LOT No.": MOCK_LOT.lotNo,
                "철선종류": MOCK_LOT.wireType,
                "자재": MOCK_LOT.material,
                "중량": `${MOCK_LOT.weight} kg`,
                "검사": MOCK_LOT.inspectionStatus,
              }).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center border-b border-outline-variant/10 pb-2">
                  <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">{key}</span>
                  <span className="font-headline text-sm font-bold tabular-nums">{value}</span>
                </div>
              ))}
            </div>

            {/* Print Count */}
            <div className="mb-6">
              <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">
                인쇄 매수
              </label>
              <input
                type="number"
                value={printCount}
                onChange={(e) => setPrintCount(Number(e.target.value))}
                min={1}
                max={10}
                className="w-24 bg-surface-container border border-outline-variant/20 px-4 py-3 text-sm font-headline text-on-surface focus:outline-none focus:border-primary-accent tabular-nums text-center"
              />
            </div>

            {/* Print Button */}
            <button className="w-full bg-primary-accent px-8 py-4 font-label text-xs uppercase tracking-widest font-bold text-on-primary-container hover:bg-primary-accent/80 transition-colors flex items-center justify-center gap-2 mb-4">
              <span className="material-symbols-outlined text-base">print</span>
              라벨 인쇄 ({printCount})
            </button>

            {/* Re-print with Reason */}
            <div className="border-t border-outline-variant/10 pt-6 mt-6">
              <FieldHeader title="재발행" moduleRef="REPRINT" />
              <div className="mb-4">
                <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">
                  재발행 사유
                </label>
                <select
                  value={reprintReason}
                  onChange={(e) => setReprintReason(e.target.value)}
                  className="w-full bg-surface-container border border-outline-variant/20 px-4 py-3 text-sm font-headline text-on-surface focus:outline-none focus:border-primary-accent appearance-none cursor-pointer"
                >
                  <option value="">-- 사유 선택 --</option>
                  {REPRINT_REASONS.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
              <button
                disabled={!reprintReason}
                className="w-full bg-surface-container-high border border-outline-variant/20 px-8 py-3 font-label text-xs uppercase tracking-widest font-bold text-on-surface-variant hover:bg-surface-container-highest transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-base">replay</span>
                사유 포함 재발행
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
