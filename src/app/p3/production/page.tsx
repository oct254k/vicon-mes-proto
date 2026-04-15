"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";

const STEEL_PLATE_TYPES = [
  "PC Steel Wire \u03C67.0mm",
  "PC Steel Wire \u03C69.0mm",
  "PC Steel Wire \u03C611.0mm",
  "PC Steel Strand 12.7mm",
  "PC Steel Strand 15.2mm",
];

const PRODUCTION_LOG = [
  { id: "PRD-0415-001", lot: "LOT-F-2026-0415-001", type: "PC Steel Wire \u03C67.0mm", qty: "120", weight: "2,450", status: "확정", time: "14:30" },
  { id: "PRD-0415-002", lot: "LOT-F-2026-0415-002", type: "PC Steel Strand 12.7mm", qty: "80", weight: "3,120", status: "확정", time: "13:15" },
  { id: "PRD-0415-003", lot: "LOT-F-2026-0415-003", type: "PC Steel Wire \u03C69.0mm", qty: "95", weight: "2,810", status: "취소", time: "11:40" },
  { id: "PRD-0415-004", lot: "LOT-F-2026-0415-004", type: "PC Steel Strand 15.2mm", qty: "60", weight: "4,200", status: "정정", time: "10:05" },
];

const TABLE_COLUMNS = [
  { key: "id", label: "기록 ID" },
  { key: "lot", label: "LOT" },
  { key: "type", label: "강종" },
  { key: "qty", label: "수량 (개)" },
  { key: "weight", label: "중량 (kg)" },
  { key: "status", label: "상태" },
  { key: "time", label: "시간" },
];

export default function P3ProductionPage() {
  const [plateType, setPlateType] = useState(STEEL_PLATE_TYPES[0]);
  const [quantity, setQuantity] = useState("");
  const [weight, setWeight] = useState("");
  const [lotNumber, setLotNumber] = useState("LOT-F-2026-0415-005");

  return (
    <div>
      <PageHeader
        title="성형"
        accent="생산 실적"
        nodeRef="P3-PRD-001"
        status="RECORDING"
      />

      {/* Input Form */}
      <section className="mb-8">
        <div className="bg-surface-container-lowest p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* LOT Number */}
            <div>
              <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-3">
                LOT 번호
              </label>
              <input
                type="text"
                value={lotNumber}
                onChange={(e) => setLotNumber(e.target.value)}
                className="w-full bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-4 py-5 text-lg font-headline tabular-nums text-on-surface transition-colors"
              />
            </div>

            {/* Steel Plate Type */}
            <div>
              <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-3">
                강판 종류
              </label>
              <select
                value={plateType}
                onChange={(e) => setPlateType(e.target.value)}
                className="w-full bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-4 py-5 text-lg font-headline text-on-surface appearance-none cursor-pointer transition-colors"
              >
                {STEEL_PLATE_TYPES.map((t) => (
                  <option key={t} value={t} className="bg-surface-container">{t}</option>
                ))}
              </select>
            </div>

            {/* Quantity */}
            <div>
              <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-3">
                수량 (개)
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="0"
                className="w-full bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-4 py-5 text-3xl font-black font-headline tabular-nums text-on-surface placeholder:text-on-surface-variant/20 transition-colors"
              />
            </div>

            {/* Weight */}
            <div>
              <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-3">
                중량 (kg)
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="0.00"
                step="0.01"
                className="w-full bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-4 py-5 text-3xl font-black font-headline tabular-nums text-on-surface placeholder:text-on-surface-variant/20 transition-colors"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-3 mt-8">
            <button className="flex-1 bg-primary-accent text-white px-8 py-5 font-label text-xs uppercase tracking-widest font-bold hover:bg-primary-accent/80 transition-colors active:scale-95">
              실적 확정
            </button>
            <button className="flex-1 bg-surface-container text-on-surface-variant px-8 py-5 font-label text-xs uppercase tracking-widest font-bold hover:bg-surface-container-high transition-colors border border-outline-variant/20">
              실적 취소
            </button>
            <button className="flex-1 bg-surface-container text-[#f59e0b] px-8 py-5 font-label text-xs uppercase tracking-widest font-bold hover:bg-surface-container-high transition-colors border border-[#f59e0b]/20">
              정정
            </button>
          </div>
        </div>
      </section>

      {/* Production Log */}
      <DataTable
        title="금일 생산 실적"
        columns={TABLE_COLUMNS}
        data={PRODUCTION_LOG}
        bufferCount={PRODUCTION_LOG.length}
      />

      {/* Summary */}
      <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-0">
        <div className="bg-surface-container-lowest p-6 border-l-4 border-primary-accent">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
            합계 건수
          </span>
          <span className="text-4xl font-black font-headline tabular-nums">
            {PRODUCTION_LOG.length}
          </span>
        </div>
        <div className="bg-surface-container-lowest p-6 border-l-4 border-tertiary">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
            합계 중량
          </span>
          <span className="text-4xl font-black font-headline tabular-nums text-tertiary">
            12,580
          </span>
          <span className="text-sm font-label text-on-surface-variant ml-1">kg</span>
        </div>
        <div className="bg-surface-container-lowest p-6 border-l-4 border-[#f59e0b]">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
            취소 / 정정
          </span>
          <span className="text-4xl font-black font-headline tabular-nums text-[#f59e0b]">2</span>
        </div>
      </section>
    </div>
  );
}
