"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

interface ScannedComponent {
  id: string;
  lot: string;
  type: string;
  weight: string;
  time: string;
  status: "OK" | "NG";
}

const MOCK_COMPONENTS: ScannedComponent[] = [
  { id: "CMP-001", lot: "LOT-F-2026-0415-001", type: "Top Plate \u03C67.0mm", weight: "1,250 kg", time: "14:32:10", status: "OK" },
  { id: "CMP-002", lot: "LOT-F-2026-0415-002", type: "Bottom Plate \u03C69.0mm", weight: "1,380 kg", time: "14:33:45", status: "OK" },
  { id: "CMP-003", lot: "LOT-TG-2026-0415-008", type: "Cross Wire 4.0mm", weight: "420 kg", time: "14:35:12", status: "OK" },
];

export default function P4ScanPage() {
  const [barcode, setBarcode] = useState("");
  const [scannedComponents, setScannedComponents] = useState<ScannedComponent[]>(MOCK_COMPONENTS);
  const [assemblyLot, setAssemblyLot] = useState("LOT-A-2026-0415-001");

  const handleScan = () => {
    if (!barcode.trim()) return;
    const newComp: ScannedComponent = {
      id: `CMP-${String(scannedComponents.length + 1).padStart(3, "0")}`,
      lot: barcode,
      type: "Side Rail 5.0mm",
      weight: "680 kg",
      time: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      status: "OK",
    };
    setScannedComponents([...scannedComponents, newComp]);
    setBarcode("");
  };

  const totalWeight = "3,730";
  const requiredComponents = 5;

  return (
    <div>
      <PageHeader
        title="조립"
        accent="투입 스캔"
        nodeRef="P4-SCN-001"
        status="SCANNING"
        description="조립 공정에 투입할 부품들을 바코드 스캔하여 등록합니다. 필요한 부품이 모두 스캔되었는지 확인합니다."
      />

      {/* Assembly LOT Info */}
      <section className="mb-6">
        <div className="bg-surface-container-lowest p-6 border-l-4 border-primary-accent">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-1">
                조립 LOT
              </span>
              <span className="text-2xl font-black font-headline tabular-nums">{assemblyLot}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-1">
                  스캔된 부품
                </span>
                <span className="text-2xl font-black font-headline tabular-nums">
                  <span className="text-tertiary">{scannedComponents.length}</span>
                  <span className="text-on-surface-variant text-lg"> / {requiredComponents}</span>
                </span>
              </div>
              <StatusBadge
                type={scannedComponents.length >= requiredComponents ? "running" : "warning"}
                label={scannedComponents.length >= requiredComponents ? "완료" : "미완료"}
              />
            </div>
          </div>
          {/* Progress bar */}
          <div className="w-full h-3 bg-surface-container mt-4">
            <div
              className="h-full bg-tertiary transition-all"
              style={{ width: `${Math.min((scannedComponents.length / requiredComponents) * 100, 100)}%` }}
            />
          </div>
        </div>
      </section>

      {/* Scan Input */}
      <section className="mb-8">
        <div className="bg-surface-container-lowest p-6">
          <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-3">
            부품 바코드 스캔
          </label>
          <div className="flex gap-0">
            <input
              type="text"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleScan()}
              placeholder="부품 바코드를 스캔하세요..."
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

      {/* Scanned Components List */}
      <section className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
            스캔된 부품 목록
          </span>
          <div className="flex-1 h-px bg-outline-variant/10" />
          <span className="font-label text-xs tabular-nums text-on-surface-variant opacity-60">
            합계: {totalWeight} kg
          </span>
        </div>
        <div className="space-y-2">
          {scannedComponents.map((comp, i) => (
            <div
              key={comp.id}
              className="bg-surface-container-lowest p-5 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-surface-container-highest/20 transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="w-10 h-10 bg-surface-container flex items-center justify-center font-headline font-black text-sm tabular-nums text-on-surface-variant">
                  {i + 1}
                </span>
                <div>
                  <div className="font-headline text-sm font-bold tabular-nums">{comp.lot}</div>
                  <div className="font-label text-xs uppercase tracking-widest text-on-surface-variant mt-1">
                    {comp.type}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 ml-14 md:ml-0">
                <span className="font-headline text-sm tabular-nums text-on-surface-variant">{comp.weight}</span>
                <span className="font-label text-xs tabular-nums text-on-surface-variant">{comp.time}</span>
                <StatusBadge type={comp.status === "OK" ? "running" : "error"} label={comp.status} />
                <button className="text-on-surface-variant hover:text-error transition-colors">
                  <span className="material-symbols-outlined text-sm">delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Action Buttons */}
      <section className="flex flex-col md:flex-row gap-3">
        <button
          className={`flex-1 px-8 py-5 font-label text-xs uppercase tracking-widest font-bold transition-colors active:scale-95 ${
            scannedComponents.length >= requiredComponents
              ? "bg-primary-accent text-white hover:bg-primary-accent/80"
              : "bg-surface-container text-on-surface-variant/40 cursor-not-allowed"
          }`}
          disabled={scannedComponents.length < requiredComponents}
        >
          조립 투입 확정
        </button>
        <button className="flex-1 bg-surface-container text-on-surface-variant px-8 py-5 font-label text-xs uppercase tracking-widest font-bold hover:bg-surface-container-high transition-colors border border-outline-variant/20">
          전체 삭제
        </button>
      </section>
    </div>
  );
}
