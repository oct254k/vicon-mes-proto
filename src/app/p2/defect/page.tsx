"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DataTable } from "@/components/ui/DataTable";

const DEFECT_TYPES = [
  "Weld Miss (용접 미스)",
  "Wire Break (단선)",
  "Mesh Deformation (변형)",
  "Surface Scratch (스크래치)",
  "Dimensional Error (치수 불량)",
  "Rust/Contamination (녹/오염)",
  "Other (기타)",
];

interface DefectRecord {
  id: string;
  lot: string;
  equipment: string;
  defectType: string;
  quantity: number;
  severity: "critical" | "major" | "minor";
  registeredAt: string;
  operator: string;
  notes: string;
}

const MOCK_DEFECTS: DefectRecord[] = [
  { id: "DF-0415-001", lot: "TG-2026-0415-003", equipment: "TG-04", defectType: "Weld Miss (용접 미스)", quantity: 2.3, severity: "major", registeredAt: "14:12:00", operator: "Lee MJ", notes: "Electrode wear detected" },
  { id: "DF-0415-002", lot: "TG-2026-0415-001", equipment: "TG-01", defectType: "Surface Scratch (스크래치)", quantity: 0.8, severity: "minor", registeredAt: "12:45:00", operator: "Kim JH", notes: "Feed roller mark" },
  { id: "DF-0415-003", lot: "TG-2026-0414-012", equipment: "TG-03", defectType: "Wire Break (단선)", quantity: 5.1, severity: "critical", registeredAt: "11:20:00", operator: "Kim JH", notes: "Input wire quality issue" },
  { id: "DF-0414-015", lot: "TG-2026-0414-008", equipment: "TG-06", defectType: "Dimensional Error (치수 불량)", quantity: 1.5, severity: "major", registeredAt: "22:15:00", operator: "Choi DH", notes: "Pitch deviation > 2mm" },
  { id: "DF-0414-014", lot: "TG-2026-0414-006", equipment: "TG-02", defectType: "Mesh Deformation (변형)", quantity: 3.2, severity: "major", registeredAt: "20:30:00", operator: "Park SY", notes: "" },
];

const DEFECT_COLUMNS = [
  { key: "registeredAt", label: "시간" },
  { key: "id", label: "부적합 ID" },
  { key: "lot", label: "LOT 번호" },
  { key: "equipment", label: "설비" },
  { key: "defectType", label: "불량유형" },
  { key: "quantity", label: "수량 (m\u00B2)" },
  { key: "severity", label: "심각도" },
  { key: "operator", label: "작업자" },
];

const severityBadge: Record<string, { type: "stopped" | "warning" | "idle"; label: string }> = {
  critical: { type: "stopped", label: "중대" },
  major: { type: "warning", label: "주요" },
  minor: { type: "idle", label: "경미" },
};

export default function P2DefectPage() {
  const [lotInput, setLotInput] = useState("");
  const [selectedEquip, setSelectedEquip] = useState("TG-01");
  const [defectType, setDefectType] = useState(DEFECT_TYPES[0]);
  const [quantity, setQuantity] = useState("");
  const [severity, setSeverity] = useState<"critical" | "major" | "minor">("major");
  const [notes, setNotes] = useState("");
  const [defects] = useState(MOCK_DEFECTS);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Defect registered:\nLOT: ${lotInput}\nEquipment: ${selectedEquip}\nType: ${defectType}\nQuantity: ${quantity} m\u00B2\nSeverity: ${severity}`);
  };

  const todayCritical = defects.filter((d) => d.severity === "critical").length;
  const todayMajor = defects.filter((d) => d.severity === "major").length;
  const todayTotal = defects.reduce((sum, d) => sum + d.quantity, 0);

  return (
    <div>
      <PageHeader
        title="2공정 TG"
        accent="부적합 등록"
        nodeRef="SCR-P2-007"
        description="TG 공정에서 발생한 부적합 사항을 등록합니다. 심각도별 분류와 사진 첨부가 가능합니다."
      />

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mb-8">
        <div className="bg-surface-container-lowest p-6 border-l-4 border-error">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
            중대 부적합
          </span>
          <span className="text-4xl font-black font-headline tabular-nums text-error">
            {todayCritical}
          </span>
        </div>
        <div className="bg-surface-container-lowest p-6 border-l-4 border-[#f59e0b]">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
            주요 부적합
          </span>
          <span className="text-4xl font-black font-headline tabular-nums text-[#f59e0b]">
            {todayMajor}
          </span>
        </div>
        <div className="bg-surface-container-lowest p-6 border-l-4 border-primary-accent">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
            부적합 면적 합계
          </span>
          <span className="text-4xl font-black font-headline tabular-nums text-on-surface">
            {todayTotal.toFixed(1)}
          </span>
          <span className="text-sm font-label text-on-surface-variant ml-1">m&sup2;</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Registration Form */}
        <div className="lg:col-span-1">
          <FieldHeader title="부적합 등록" moduleRef="DEFECT.REG" />

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
                LOT 번호 (스캔)
              </label>
              <input
                type="text"
                value={lotInput}
                onChange={(e) => setLotInput(e.target.value)}
                placeholder="TG-2026-0415-..."
                autoFocus
                className="w-full bg-surface-container-lowest border-2 border-primary-accent px-4 py-3 text-sm font-headline text-on-surface focus:outline-none focus:border-tertiary placeholder:text-on-surface-variant/30"
              />
            </div>

            <div>
              <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
                설비
              </label>
              <select
                value={selectedEquip}
                onChange={(e) => setSelectedEquip(e.target.value)}
                className="w-full bg-surface-container-lowest border border-outline-variant/20 px-3 py-2 text-sm font-headline text-on-surface focus:border-primary-accent focus:outline-none"
              >
                {["TG-01", "TG-02", "TG-03", "TG-04", "TG-05", "TG-06", "TG-07"].map((eq) => (
                  <option key={eq} value={eq}>{eq}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
                불량유형
              </label>
              <select
                value={defectType}
                onChange={(e) => setDefectType(e.target.value)}
                className="w-full bg-surface-container-lowest border border-outline-variant/20 px-3 py-2 text-sm font-headline text-on-surface focus:border-primary-accent focus:outline-none"
              >
                {DEFECT_TYPES.map((dt) => (
                  <option key={dt} value={dt}>{dt}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
                부적합 수량 (m&sup2;)
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                step="0.1"
                min="0"
                placeholder="0.0"
                className="w-full bg-surface-container-lowest border border-outline-variant/20 px-3 py-2 text-sm font-headline text-on-surface focus:border-primary-accent focus:outline-none tabular-nums placeholder:text-on-surface-variant/30"
              />
            </div>

            <div>
              <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
                심각도
              </label>
              <div className="flex gap-2">
                {(["critical", "major", "minor"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSeverity(s)}
                    className={`flex-1 py-2 font-label text-xs uppercase tracking-widest font-bold transition-colors ${
                      severity === s
                        ? s === "critical"
                          ? "bg-error/20 text-error border-2 border-error"
                          : s === "major"
                          ? "bg-[#f59e0b]/20 text-[#f59e0b] border-2 border-[#f59e0b]"
                          : "bg-surface-container-highest text-on-surface-variant border-2 border-surface-container-highest"
                        : "bg-surface-container border border-outline-variant/20 text-on-surface-variant opacity-60"
                    }`}
                  >
                    {s === "critical" ? "중대" : s === "major" ? "주요" : "경미"}
                  </button>
                ))}
              </div>
            </div>

            {/* Photo placeholder */}
            <div>
              <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
                사진
              </label>
              <div className="bg-surface-container-lowest border-2 border-dashed border-outline-variant/20 p-8 text-center">
                <span className="material-symbols-outlined text-3xl text-on-surface-variant opacity-30 block mb-2">
                  photo_camera
                </span>
                <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">
                  사진 촬영 또는 업로드
                </span>
              </div>
            </div>

            <div>
              <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
                비고
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                className="w-full bg-surface-container-lowest border border-outline-variant/20 px-3 py-2 text-sm font-headline text-on-surface focus:border-primary-accent focus:outline-none resize-none placeholder:text-on-surface-variant/30"
                placeholder="추가 비고 입력..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-error/20 text-error border border-error/30 px-4 py-3 font-label text-xs uppercase tracking-widest font-bold hover:bg-error/30 transition-colors"
            >
              부적합 등록
            </button>
          </form>
        </div>

        {/* Recent Defects Table */}
        <div className="lg:col-span-2">
          <DataTable
            title="최근 부적합 이력"
            columns={DEFECT_COLUMNS}
            data={defects.map((d) => ({
              registeredAt: d.registeredAt,
              id: d.id,
              lot: d.lot,
              equipment: d.equipment,
              defectType: d.defectType,
              quantity: d.quantity.toFixed(1),
              severity: d.severity.toUpperCase(),
              operator: d.operator,
            }))}
            bufferCount={defects.length}
          />
        </div>
      </div>
    </div>
  );
}
