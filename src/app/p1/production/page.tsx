"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DataTable } from "@/components/ui/DataTable";

const WIRE_TYPES = [
  { group: "원형", items: ["원형 3.2mm", "원형 4.0mm", "원형 5.0mm"] },
  { group: "이형", items: ["이형 D10", "이형 D13", "이형 D16", "이형 D19", "이형 D22", "이형 D25"] },
];

const CANCEL_REASONS = [
  "재질 불량",
  "치수 불량",
  "설비 고장",
  "작업자 실수",
  "기타",
];

const INPUT_LOT = {
  lotNo: "P1-2026-0415-001",
  material: "SWRH 62B",
  equipment: "신선#1",
  inputWeight: "2,150",
  inputTime: "06:12",
};

const DAILY_PRODUCTION = [
  { time: "07:45", lot: "P1-OUT-0415-001", wireType: "원형 4.0mm", qty: "12", weight: "1,820", operator: "김철수", status: "완료" },
  { time: "09:12", lot: "P1-OUT-0415-002", wireType: "이형 D13", qty: "8", weight: "1,650", operator: "이영희", status: "완료" },
  { time: "10:30", lot: "P1-OUT-0415-003", wireType: "원형 3.2mm", qty: "15", weight: "2,100", operator: "박민수", status: "완료" },
  { time: "11:55", lot: "P1-OUT-0415-004", wireType: "이형 D16", qty: "6", weight: "1,480", operator: "김철수", status: "검사중" },
];

export default function P1ProductionPage() {
  const [wireType, setWireType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [weight, setWeight] = useState("");
  const [notes, setNotes] = useState("");
  const [cancelChecked, setCancelChecked] = useState<string[]>([]);
  const [cancelReason, setCancelReason] = useState("");

  const toggleCancel = (lot: string) => {
    setCancelChecked((prev) =>
      prev.includes(lot) ? prev.filter((l) => l !== lot) : [...prev, lot]
    );
  };

  return (
    <div className="max-w-5xl">
      <PageHeader
        title="생산"
        accent="실적"
        nodeRef="SCR-P1-002"
        status="ONLINE"
      />

      {/* Input LOT Info */}
      <section className="bg-surface-container-lowest p-6 mb-6 border-l-4 border-primary-accent">
        <FieldHeader title="투입 LOT 정보" moduleRef="MOD-INPUT-REF" />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <div>
            <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">LOT No.</span>
            <span className="font-headline text-sm font-bold tabular-nums">{INPUT_LOT.lotNo}</span>
          </div>
          <div>
            <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">자재</span>
            <span className="font-headline text-sm font-bold">{INPUT_LOT.material}</span>
          </div>
          <div>
            <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">설비</span>
            <span className="font-headline text-sm">{INPUT_LOT.equipment}</span>
          </div>
          <div>
            <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">투입 중량</span>
            <span className="font-headline text-sm tabular-nums">{INPUT_LOT.inputWeight} kg</span>
          </div>
          <div>
            <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">투입 시간</span>
            <span className="font-headline text-sm tabular-nums">{INPUT_LOT.inputTime}</span>
          </div>
        </div>
      </section>

      {/* Production Form */}
      <section className="bg-surface-container-lowest p-6 mb-6">
        <FieldHeader title="생산 실적 입력" moduleRef="MOD-PROD-01" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Wire Type */}
          <div>
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">
              철선종류
            </label>
            <select
              value={wireType}
              onChange={(e) => setWireType(e.target.value)}
              className="w-full bg-surface-container border border-outline-variant/20 px-4 py-3 text-sm font-headline text-on-surface focus:outline-none focus:border-primary-accent appearance-none cursor-pointer"
            >
              <option value="">-- 선종 선택 --</option>
              {WIRE_TYPES.map((group) => (
                <optgroup key={group.group} label={group.group}>
                  {group.items.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          {/* Quantity */}
          <div>
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">
              수량 (코일)
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="0"
              className="w-full bg-surface-container border border-outline-variant/20 px-4 py-3 text-sm font-headline text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-primary-accent tabular-nums"
            />
          </div>

          {/* Weight */}
          <div>
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">
              총 중량 (kg)
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="0.00"
              className="w-full bg-surface-container border border-outline-variant/20 px-4 py-3 text-sm font-headline text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-primary-accent tabular-nums"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">
              비고
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="비고 입력..."
              className="w-full bg-surface-container border border-outline-variant/20 px-4 py-3 text-sm font-headline text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-primary-accent"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button className="bg-primary-accent px-8 py-3 font-label text-xs uppercase tracking-widest font-bold text-on-primary-container hover:bg-primary-accent/80 transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-base">add_circle</span>
            생산 실적 등록
          </button>
          <button className="bg-surface-container-high border border-outline-variant/20 px-8 py-3 font-label text-xs uppercase tracking-widest font-bold text-on-surface-variant hover:bg-surface-container-highest transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-base">print</span>
            라벨 발행
          </button>
        </div>
      </section>

      {/* Cancel / Correction Section [v2.1] */}
      <section className="bg-surface-container-lowest p-6 mb-6 border-l-4 border-error/40">
        <FieldHeader title="생산 취소 / 정정" moduleRef="v2.1" />

        <div className="overflow-x-auto mb-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container border-b border-outline-variant/10">
                <th className="p-3 w-10">
                  <span className="font-label text-xs uppercase tracking-widest opacity-60">선택</span>
                </th>
                <th className="p-3 font-label text-xs uppercase tracking-widest opacity-60">LOT No.</th>
                <th className="p-3 font-label text-xs uppercase tracking-widest opacity-60">철선종류</th>
                <th className="p-3 font-label text-xs uppercase tracking-widest opacity-60">중량</th>
                <th className="p-3 font-label text-xs uppercase tracking-widest opacity-60">상태</th>
              </tr>
            </thead>
            <tbody className="font-headline text-sm">
              {DAILY_PRODUCTION.map((row) => (
                <tr key={row.lot} className="border-b border-outline-variant/5 hover:bg-surface-container-highest/20 transition-colors">
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={cancelChecked.includes(row.lot)}
                      onChange={() => toggleCancel(row.lot)}
                      className="accent-primary-accent w-4 h-4"
                    />
                  </td>
                  <td className="p-3 tabular-nums">{row.lot}</td>
                  <td className="p-3">{row.wireType}</td>
                  <td className="p-3 tabular-nums">{row.weight} kg</td>
                  <td className="p-3">
                    <StatusBadge
                      type={row.status === "완료" ? "running" : "warning"}
                      label={row.status}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-end gap-4">
          <div className="flex-1 max-w-xs">
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">
              취소 사유
            </label>
            <select
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="w-full bg-surface-container border border-outline-variant/20 px-4 py-3 text-sm font-headline text-on-surface focus:outline-none focus:border-error appearance-none cursor-pointer"
            >
              <option value="">-- 사유 선택 --</option>
              {CANCEL_REASONS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          <button
            disabled={cancelChecked.length === 0}
            className="bg-error/20 border border-error/30 px-6 py-3 font-label text-xs uppercase tracking-widest font-bold text-error hover:bg-error/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            선택 취소 요청
          </button>
        </div>
      </section>

      {/* Daily Production Table */}
      <DataTable
        title="금일 생산 실적"
        columns={[
          { key: "time", label: "시간" },
          { key: "lot", label: "출력 LOT" },
          { key: "wireType", label: "철선종류" },
          { key: "qty", label: "수량" },
          { key: "weight", label: "중량 (kg)" },
          { key: "operator", label: "작업자" },
          { key: "status", label: "상태" },
        ]}
        data={DAILY_PRODUCTION}
        bufferCount={DAILY_PRODUCTION.length}
      />

      {/* Footer */}
      <footer className="mt-6 bg-surface-container p-4 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-6">
          <StatusBadge type="running" label="생산중" />
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">
            설비: <span className="text-on-surface font-bold">{INPUT_LOT.equipment}</span>
          </span>
        </div>
        <div className="flex items-center gap-6">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">
            금일 실적: <span className="text-on-surface tabular-nums font-bold">04</span>
          </span>
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">
            총 중량: <span className="text-tertiary tabular-nums font-bold">7,050 kg</span>
          </span>
        </div>
      </footer>
    </div>
  );
}
