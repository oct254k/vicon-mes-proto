"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DataTable } from "@/components/ui/DataTable";

const DEFECT_TYPES = [
  "표면 흠집",
  "치수 불량",
  "인장강도 미달",
  "직진성 불량",
  "코일 풀림",
  "표면 산화",
  "용접부 불량",
  "기타",
];

const RECENT_DEFECTS = [
  {
    date: "2026-04-15",
    time: "08:32",
    lot: "P1-OUT-0415-001",
    wireType: "원형 4.0mm",
    defectType: "표면 흠집",
    qty: "3",
    weight: "45.2",
    operator: "김철수",
    status: "등록",
  },
  {
    date: "2026-04-15",
    time: "09:15",
    lot: "P1-OUT-0415-002",
    wireType: "이형 D13",
    defectType: "치수 불량",
    qty: "1",
    weight: "18.7",
    operator: "이영희",
    status: "확인중",
  },
  {
    date: "2026-04-14",
    time: "14:45",
    lot: "P1-OUT-0414-008",
    wireType: "원형 3.2mm",
    defectType: "인장강도 미달",
    qty: "2",
    weight: "31.0",
    operator: "박민수",
    status: "처리완료",
  },
  {
    date: "2026-04-14",
    time: "11:20",
    lot: "P1-OUT-0414-005",
    wireType: "이형 D16",
    defectType: "직진성 불량",
    qty: "1",
    weight: "22.5",
    operator: "김철수",
    status: "처리완료",
  },
  {
    date: "2026-04-13",
    time: "16:08",
    lot: "P1-OUT-0413-012",
    wireType: "원형 5.0mm",
    defectType: "코일 풀림",
    qty: "1",
    weight: "15.3",
    operator: "이영희",
    status: "처리완료",
  },
];

export default function P1DefectPage() {
  const [lotNo, setLotNo] = useState("");
  const [defectType, setDefectType] = useState("");
  const [defectQty, setDefectQty] = useState("");
  const [defectWeight, setDefectWeight] = useState("");
  const [defectNote, setDefectNote] = useState("");

  return (
    <div className="max-w-5xl">
      <PageHeader
        title="부적합"
        accent="등록"
        nodeRef="SCR-P1-005"
        status="ONLINE"
      />

      {/* Defect Registration Form */}
      <section className="bg-surface-container-lowest p-6 mb-6">
        <FieldHeader title="부적합 입력" moduleRef="MOD-DEF-01" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* LOT Scan/Select */}
          <div className="md:col-span-2">
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">
              LOT No. (스캔 또는 입력)
            </label>
            <div className="flex gap-0 max-w-xl">
              <input
                type="text"
                value={lotNo}
                onChange={(e) => setLotNo(e.target.value)}
                placeholder="LOT 번호 스캔 또는 입력..."
                className="flex-1 bg-surface-container border border-outline-variant/20 px-4 py-3 text-sm font-headline text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-primary-accent"
              />
              <button className="bg-surface-container-high border border-outline-variant/20 px-4 py-3 font-label text-xs uppercase tracking-widest text-on-surface-variant hover:bg-surface-container-highest transition-colors">
                <span className="material-symbols-outlined text-base">qr_code_scanner</span>
              </button>
            </div>
          </div>

          {/* Defect Type */}
          <div>
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">
              불량유형
            </label>
            <select
              value={defectType}
              onChange={(e) => setDefectType(e.target.value)}
              className="w-full bg-surface-container border border-outline-variant/20 px-4 py-3 text-sm font-headline text-on-surface focus:outline-none focus:border-error appearance-none cursor-pointer"
            >
              <option value="">-- 불량유형 선택 --</option>
              {DEFECT_TYPES.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Defect Quantity */}
          <div>
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">
              부적합 수량 (코일)
            </label>
            <input
              type="number"
              value={defectQty}
              onChange={(e) => setDefectQty(e.target.value)}
              placeholder="0"
              className="w-full bg-surface-container border border-outline-variant/20 px-4 py-3 text-sm font-headline text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-error tabular-nums"
            />
          </div>

          {/* Defect Weight */}
          <div>
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">
              부적합 중량 (kg)
            </label>
            <input
              type="number"
              value={defectWeight}
              onChange={(e) => setDefectWeight(e.target.value)}
              placeholder="0.0"
              className="w-full bg-surface-container border border-outline-variant/20 px-4 py-3 text-sm font-headline text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-error tabular-nums"
            />
          </div>

          {/* Note */}
          <div>
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">
              비고
            </label>
            <input
              type="text"
              value={defectNote}
              onChange={(e) => setDefectNote(e.target.value)}
              placeholder="비고..."
              className="w-full bg-surface-container border border-outline-variant/20 px-4 py-3 text-sm font-headline text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-primary-accent"
            />
          </div>

          {/* Photo Attach */}
          <div className="md:col-span-2">
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">
              사진 첨부
            </label>
            <div className="border-2 border-dashed border-outline-variant/20 bg-surface-container p-8 flex flex-col items-center justify-center cursor-pointer hover:border-primary-accent/40 transition-colors">
              <span className="material-symbols-outlined text-3xl text-on-surface-variant opacity-30 mb-2">add_a_photo</span>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">
                클릭 또는 탭하여 사진 첨부
              </span>
              <span className="font-label text-[11px] uppercase tracking-widest text-on-surface-variant opacity-20 mt-1">
                JPG, PNG (Max 5MB)
              </span>
            </div>
          </div>
        </div>

        <button className="bg-error/80 px-8 py-3 font-label text-xs uppercase tracking-widest font-bold text-white hover:bg-error transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined text-base">report</span>
          부적합 등록
        </button>
      </section>

      {/* Recent Defects Table */}
      <DataTable
        title="최근 부적합 내역"
        columns={[
          { key: "date", label: "일자" },
          { key: "time", label: "시간" },
          { key: "lot", label: "LOT No." },
          { key: "wireType", label: "철선종류" },
          { key: "defectType", label: "불량유형" },
          { key: "qty", label: "수량" },
          { key: "weight", label: "중량 (kg)" },
          { key: "status", label: "상태" },
        ]}
        data={RECENT_DEFECTS}
        bufferCount={RECENT_DEFECTS.length}
      />

      {/* Footer */}
      <footer className="mt-6 bg-surface-container p-4 flex items-center justify-between flex-wrap gap-4">
        <StatusBadge type="warning" label="부적합 모니터" />
        <div className="flex items-center gap-6">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">
            금일: <span className="text-error tabular-nums font-bold">02</span> 건
          </span>
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">
            주간 비율: <span className="text-on-surface tabular-nums font-bold">0.8%</span>
          </span>
        </div>
      </footer>
    </div>
  );
}
