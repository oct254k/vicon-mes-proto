"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const EQUIPMENT_OPTIONS = [
  { id: "EQ-FRM-001", name: "성형 프레스 #1" },
  { id: "EQ-FRM-002", name: "성형 프레스 #2" },
  { id: "EQ-FRM-003", name: "성형 프레스 #3" },
];

const SCAN_HISTORY = [
  { lot: "LOT-F-2026-0412-001", equipment: "EQ-FRM-001", time: "14:32:10", status: "OK" },
  { lot: "LOT-F-2026-0412-002", equipment: "EQ-FRM-001", time: "14:28:45", status: "OK" },
  { lot: "LOT-F-2026-0411-018", equipment: "EQ-FRM-002", time: "14:25:03", status: "NG" },
];

export default function P3ScanPage() {
  const [barcode, setBarcode] = useState("");
  const [equipment, setEquipment] = useState(EQUIPMENT_OPTIONS[0].id);
  const [scanResult, setScanResult] = useState<{
    lot: string;
    material: string;
    weight: string;
    status: string;
  } | null>(null);

  const handleScan = () => {
    if (!barcode.trim()) return;
    setScanResult({
      lot: `LOT-F-2026-0415-${String(Math.floor(Math.random() * 100)).padStart(3, "0")}`,
      material: "PC Steel Wire \u03C67.0mm",
      weight: "2,450 kg",
      status: "OK",
    });
  };

  return (
    <div>
      <PageHeader
        title="성형"
        accent="투입 스캔"
        nodeRef="P3-SCN-001"
        status="ONLINE"
        description="성형 공정에 투입할 자재 LOT를 바코드 스캔하여 등록합니다."
      />

      {/* Scan Input Section */}
      <section className="mb-8">
        <div className="bg-surface-container-lowest p-6 md:p-8">
          <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-3">
            바코드 스캔
          </label>
          <div className="flex gap-0">
            <input
              type="text"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleScan()}
              placeholder="바코드를 스캔하거나 입력하세요..."
              autoFocus
              className="flex-1 bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-4 py-5 text-xl font-headline tabular-nums text-on-surface placeholder:text-on-surface-variant/30 transition-colors"
            />
            <button
              onClick={handleScan}
              className="bg-primary-accent text-white px-8 py-5 font-label text-xs uppercase tracking-widest font-bold hover:bg-primary-accent/80 transition-colors active:scale-95 min-w-[120px]"
            >
              스캔
            </button>
          </div>
        </div>
      </section>

      {/* Equipment Selection */}
      <section className="mb-8">
        <div className="bg-surface-container-lowest p-6 md:p-8">
          <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-3">
            설비 선택
          </label>
          <select
            value={equipment}
            onChange={(e) => setEquipment(e.target.value)}
            className="w-full bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-4 py-5 text-lg font-headline text-on-surface appearance-none cursor-pointer transition-colors"
          >
            {EQUIPMENT_OPTIONS.map((eq) => (
              <option key={eq.id} value={eq.id} className="bg-surface-container">
                {eq.id} - {eq.name}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Scan Result */}
      {scanResult && (
        <section className="mb-8">
          <div className="bg-surface-container-lowest border-l-4 border-tertiary">
            <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center">
              <h3 className="font-headline font-black text-xs uppercase tracking-widest">
                LOT 결과
              </h3>
              <StatusBadge type={scanResult.status === "OK" ? "running" : "error"} label={scanResult.status} />
            </div>
            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-1">
                  LOT 번호
                </span>
                <span className="text-2xl font-black font-headline tabular-nums">{scanResult.lot}</span>
              </div>
              <div>
                <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-1">
                  자재
                </span>
                <span className="text-2xl font-black font-headline">{scanResult.material}</span>
              </div>
              <div>
                <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-1">
                  중량
                </span>
                <span className="text-2xl font-black font-headline tabular-nums">{scanResult.weight}</span>
              </div>
              <div>
                <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-1">
                  설비
                </span>
                <span className="text-2xl font-black font-headline tabular-nums">{equipment}</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Scan History */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
            최근 스캔 이력
          </span>
          <div className="flex-1 h-px bg-outline-variant/10" />
        </div>
        <div className="space-y-2">
          {SCAN_HISTORY.map((s, i) => (
            <div
              key={i}
              className="bg-surface-container-lowest p-4 flex items-center justify-between hover:bg-surface-container-highest/20 transition-colors"
            >
              <div className="flex items-center gap-6">
                <span className="font-headline text-sm font-bold tabular-nums">{s.lot}</span>
                <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
                  {s.equipment}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-label text-xs tabular-nums text-on-surface-variant">{s.time}</span>
                <StatusBadge type={s.status === "OK" ? "running" : "error"} label={s.status} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
