"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";

const COMPONENTS = [
  { id: "CMP-001", lot: "LOT-F-2026-0415-001", type: "Top Plate \u03C67.0mm", qty: 120, weight: "1,250 kg", status: "Verified" },
  { id: "CMP-002", lot: "LOT-F-2026-0415-002", type: "Bottom Plate \u03C69.0mm", qty: 80, weight: "1,380 kg", status: "Verified" },
  { id: "CMP-003", lot: "LOT-TG-2026-0415-008", type: "Cross Wire 4.0mm", qty: 200, weight: "420 kg", status: "Verified" },
  { id: "CMP-004", lot: "LOT-F-2026-0415-005", type: "Side Rail 5.0mm", qty: 60, weight: "680 kg", status: "Pending" },
];

const PRODUCTION_LOG = [
  { id: "ASM-0415-001", lot: "LOT-A-2026-0415-001", product: "Deck Sleeper Type-A", components: "5", result: "PASS", time: "14:45", operator: "Kim J." },
  { id: "ASM-0415-002", lot: "LOT-A-2026-0415-002", product: "Deck Sleeper Type-A", components: "5", result: "PASS", time: "13:20", operator: "Park S." },
  { id: "ASM-0415-003", lot: "LOT-A-2026-0415-003", product: "Rail Sleeper RS-200", components: "4", result: "FAIL", time: "11:55", operator: "Lee H." },
  { id: "ASM-0414-012", lot: "LOT-A-2026-0414-012", product: "Deck Sleeper Type-B", components: "5", result: "CANCELLED", time: "16:30", operator: "Kim J." },
];

const LOG_COLUMNS = [
  { key: "id", label: "기록 ID" },
  { key: "lot", label: "조립 LOT" },
  { key: "product", label: "제품" },
  { key: "components", label: "부품" },
  { key: "result", label: "결과" },
  { key: "time", label: "시간" },
  { key: "operator", label: "작업자" },
];

export default function P4ProductionPage() {
  const [assemblyLot] = useState("LOT-A-2026-0415-004");
  const [product, setProduct] = useState("Deck Sleeper Type-A");
  const [assemblyResult, setAssemblyResult] = useState<"PASS" | "FAIL" | "">("");

  return (
    <div>
      <PageHeader
        title="조립"
        accent="생산 실적"
        nodeRef="P4-PRD-001"
        status="RECORDING"
        description="조립 공정의 생산 실적을 등록합니다. 부품 조합 결과(합격/불합격)를 기록하고 실적을 관리합니다."
      />

      {/* Assembly Info */}
      <section className="mb-6">
        <div className="bg-surface-container-lowest p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-3">
                조립 LOT
              </label>
              <div className="px-4 py-5 text-2xl font-black font-headline tabular-nums text-on-surface border-b-2 border-outline-variant">
                {assemblyLot}
              </div>
            </div>
            <div>
              <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-3">
                제품 종류
              </label>
              <select
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                className="w-full bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-4 py-5 text-lg font-headline text-on-surface appearance-none cursor-pointer transition-colors"
              >
                <option value="Deck Sleeper Type-A" className="bg-surface-container">Deck Sleeper Type-A</option>
                <option value="Deck Sleeper Type-B" className="bg-surface-container">Deck Sleeper Type-B</option>
                <option value="Rail Sleeper RS-200" className="bg-surface-container">Rail Sleeper RS-200</option>
                <option value="Bridge Deck BD-150" className="bg-surface-container">Bridge Deck BD-150</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Components List */}
      <section className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
            부품 ({COMPONENTS.length})
          </span>
          <div className="flex-1 h-px bg-outline-variant/10" />
        </div>
        <div className="space-y-2">
          {COMPONENTS.map((comp) => (
            <div
              key={comp.id}
              className="bg-surface-container-lowest p-5 flex flex-col md:flex-row md:items-center justify-between gap-3"
            >
              <div className="flex items-center gap-4">
                <div className={`w-2 h-10 ${comp.status === "Verified" ? "bg-tertiary" : "bg-[#f59e0b]"}`} />
                <div>
                  <div className="font-headline text-sm font-bold">{comp.type}</div>
                  <div className="font-label text-xs uppercase tracking-widest text-on-surface-variant mt-1 tabular-nums">
                    {comp.lot}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6 ml-6 md:ml-0">
                <div className="text-right">
                  <div className="font-headline text-sm tabular-nums">{comp.qty} pcs</div>
                  <div className="font-label text-xs text-on-surface-variant tabular-nums">{comp.weight}</div>
                </div>
                <StatusBadge
                  type={comp.status === "Verified" ? "running" : "warning"}
                  label={comp.status.toUpperCase()}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Assembly Result */}
      <section className="mb-8">
        <div className="bg-surface-container-lowest p-6 md:p-8">
          <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-4">
            조립 결과
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setAssemblyResult("PASS")}
              className={`py-6 font-label text-sm uppercase tracking-widest font-bold transition-colors border-2 ${
                assemblyResult === "PASS"
                  ? "bg-tertiary/20 border-tertiary text-tertiary"
                  : "bg-surface-container border-outline-variant/20 text-on-surface-variant hover:border-tertiary"
              }`}
            >
              합격
            </button>
            <button
              onClick={() => setAssemblyResult("FAIL")}
              className={`py-6 font-label text-sm uppercase tracking-widest font-bold transition-colors border-2 ${
                assemblyResult === "FAIL"
                  ? "bg-error/20 border-error text-error"
                  : "bg-surface-container border-outline-variant/20 text-on-surface-variant hover:border-error"
              }`}
            >
              불합격
            </button>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="mb-8 flex flex-col md:flex-row gap-3">
        <button className="flex-1 bg-primary-accent text-white px-8 py-5 font-label text-xs uppercase tracking-widest font-bold hover:bg-primary-accent/80 transition-colors active:scale-95">
          실적 확정
        </button>
        <button className="flex-1 bg-surface-container text-on-surface-variant px-8 py-5 font-label text-xs uppercase tracking-widest font-bold hover:bg-surface-container-high transition-colors border border-outline-variant/20">
          실적 취소
        </button>
        <button className="flex-1 bg-surface-container text-[#f59e0b] px-8 py-5 font-label text-xs uppercase tracking-widest font-bold hover:bg-surface-container-high transition-colors border border-[#f59e0b]/20">
          정정
        </button>
      </section>

      {/* Production Log */}
      <DataTable
        title="조립 생산 실적"
        columns={LOG_COLUMNS}
        data={PRODUCTION_LOG}
        bufferCount={PRODUCTION_LOG.length}
      />
    </div>
  );
}
