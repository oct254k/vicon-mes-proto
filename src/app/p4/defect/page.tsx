"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";

const DEFECT_TYPES = [
  "용접 이음부 균열",
  "부품 정렬 불량",
  "부품 누락",
  "치수 규격 초과",
  "표면 손상",
  "조립 순서 오류",
  "체결부 불량",
  "기타",
];

const DEFECT_HISTORY = [
  { id: "ADEF-0415-001", lot: "LOT-A-2026-0415-001", type: "용접 이음부 균열", qty: "2", photo: "유", time: "14:50", severity: "중대" },
  { id: "ADEF-0415-002", lot: "LOT-A-2026-0415-003", type: "부품 정렬 불량", qty: "1", photo: "유", time: "12:15", severity: "경미" },
  { id: "ADEF-0414-005", lot: "LOT-A-2026-0414-008", type: "부품 누락", qty: "1", photo: "무", time: "15:30", severity: "치명적" },
];

const TABLE_COLUMNS = [
  { key: "id", label: "부적합 ID" },
  { key: "lot", label: "조립 LOT" },
  { key: "type", label: "부적합 종류" },
  { key: "qty", label: "수량" },
  { key: "photo", label: "사진" },
  { key: "severity", label: "심각도" },
  { key: "time", label: "시간" },
];

export default function P4DefectPage() {
  const [lotNumber, setLotNumber] = useState("");
  const [defectType, setDefectType] = useState(DEFECT_TYPES[0]);
  const [quantity, setQuantity] = useState("");
  const [notes, setNotes] = useState("");
  const [photoAttached, setPhotoAttached] = useState(false);
  const [severity, setSeverity] = useState<"MINOR" | "MAJOR" | "CRITICAL">("MAJOR");

  return (
    <div>
      <PageHeader
        title="조립"
        accent="부적합 등록"
        nodeRef="P4-DEF-001"
        status="ACTIVE"
        description="조립 공정에서 발생한 부적합 사항을 등록합니다. 용접 이음부 균열, 부품 정렬 불량 등을 기록합니다."
      />

      {/* Defect Input Form */}
      <section className="mb-8">
        <div className="bg-surface-container-lowest p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LOT Number */}
            <div>
              <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-3">
                조립 LOT 번호
              </label>
              <input
                type="text"
                value={lotNumber}
                onChange={(e) => setLotNumber(e.target.value)}
                placeholder="조립 LOT 바코드를 스캔하세요..."
                className="w-full bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-4 py-5 text-lg font-headline tabular-nums text-on-surface placeholder:text-on-surface-variant/30 transition-colors"
              />
            </div>

            {/* Defect Type */}
            <div>
              <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-3">
                부적합 종류
              </label>
              <select
                value={defectType}
                onChange={(e) => setDefectType(e.target.value)}
                className="w-full bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-4 py-5 text-lg font-headline text-on-surface appearance-none cursor-pointer transition-colors"
              >
                {DEFECT_TYPES.map((t) => (
                  <option key={t} value={t} className="bg-surface-container">{t}</option>
                ))}
              </select>
            </div>

            {/* Quantity */}
            <div>
              <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-3">
                부적합 수량
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="0"
                className="w-full bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-4 py-5 text-3xl font-black font-headline tabular-nums text-on-surface placeholder:text-on-surface-variant/20 transition-colors"
              />
            </div>

            {/* Severity */}
            <div>
              <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-3">
                심각도
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["MINOR", "MAJOR", "CRITICAL"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSeverity(s)}
                    className={`py-5 font-label text-xs uppercase tracking-widest font-bold transition-colors border-2 ${
                      severity === s
                        ? s === "CRITICAL"
                          ? "bg-error/20 border-error text-error"
                          : s === "MAJOR"
                          ? "bg-[#f59e0b]/20 border-[#f59e0b] text-[#f59e0b]"
                          : "bg-on-surface-variant/10 border-on-surface-variant text-on-surface-variant"
                        : "bg-surface-container border-outline-variant/20 text-on-surface-variant/50 hover:border-outline-variant"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Photo Upload */}
            <div>
              <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-3">
                사진 증거
              </label>
              <button
                onClick={() => setPhotoAttached(!photoAttached)}
                className={`w-full py-5 px-4 text-lg font-headline transition-colors border-2 border-dashed ${
                  photoAttached
                    ? "border-tertiary bg-tertiary/10 text-tertiary"
                    : "border-outline-variant text-on-surface-variant hover:border-primary-accent"
                }`}
              >
                {photoAttached ? (
                  <span className="flex items-center justify-center gap-3">
                    <span className="material-symbols-outlined text-2xl">check_circle</span>
                    사진 첨부완료
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-3">
                    <span className="material-symbols-outlined text-2xl">add_a_photo</span>
                    탭하여 사진 촬영
                  </span>
                )}
              </button>
            </div>

            {/* Notes */}
            <div>
              <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-3">
                비고
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="조립 부적합에 대한 상세 내용..."
                rows={3}
                className="w-full bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-4 py-4 text-sm font-headline text-on-surface placeholder:text-on-surface-variant/30 transition-colors resize-none"
              />
            </div>
          </div>

          {/* Submit */}
          <button className="w-full bg-primary-accent text-white px-8 py-5 font-label text-xs uppercase tracking-widest font-bold hover:bg-primary-accent/80 transition-colors active:scale-95 mt-6">
            부적합 등록
          </button>
        </div>
      </section>

      {/* Severity Summary */}
      <section className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-0">
        <div className="bg-surface-container-lowest p-6 border-l-4 border-error">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">치명적</span>
          <span className="text-4xl font-black font-headline tabular-nums text-error">1</span>
        </div>
        <div className="bg-surface-container-lowest p-6 border-l-4 border-[#f59e0b]">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">중대</span>
          <span className="text-4xl font-black font-headline tabular-nums text-[#f59e0b]">1</span>
        </div>
        <div className="bg-surface-container-lowest p-6 border-l-4 border-on-surface-variant">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">경미</span>
          <span className="text-4xl font-black font-headline tabular-nums">1</span>
        </div>
      </section>

      {/* Defect History */}
      <DataTable
        title="조립 부적합 이력"
        columns={TABLE_COLUMNS}
        data={DEFECT_HISTORY}
        bufferCount={DEFECT_HISTORY.length}
      />
    </div>
  );
}
