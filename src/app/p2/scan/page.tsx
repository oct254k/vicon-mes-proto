"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DataTable } from "@/components/ui/DataTable";

const EQUIPMENT_IDS = ["TG-01", "TG-02", "TG-03", "TG-04", "TG-05", "TG-06", "TG-07"];

interface ScanResult {
  lot: string;
  wireType: string;
  material: string;
  weight: number;
  diameter: number;
  processOrder: string;
  orderValid: boolean;
  scannedAt: string;
  equipment: string;
}

const MOCK_SCAN_HISTORY: ScanResult[] = [
  { lot: "WL-2026-0415-001", wireType: "STS304-2.0", material: "STS304", weight: 245.8, diameter: 2.0, processOrder: "PO-TG-0415-A01", orderValid: true, scannedAt: "14:32:18", equipment: "TG-01" },
  { lot: "WL-2026-0415-002", wireType: "STS316-1.5", material: "STS316", weight: 198.3, diameter: 1.5, processOrder: "PO-TG-0415-A02", orderValid: true, scannedAt: "14:18:45", equipment: "TG-02" },
  { lot: "WL-2026-0415-003", wireType: "STS201-1.0", material: "STS201", weight: 312.1, diameter: 1.0, processOrder: "PO-TG-0415-A04", orderValid: true, scannedAt: "13:55:02", equipment: "TG-04" },
  { lot: "WL-2026-0414-018", wireType: "STS304-2.5", material: "STS304", weight: 178.6, diameter: 2.5, processOrder: "PO-TG-0414-B03", orderValid: false, scannedAt: "13:42:31", equipment: "TG-03" },
];

const SCAN_HISTORY_COLUMNS = [
  { key: "scannedAt", label: "시간" },
  { key: "lot", label: "LOT 번호" },
  { key: "wireType", label: "와이어 종류" },
  { key: "weight", label: "중량 (kg)" },
  { key: "equipment", label: "설비" },
  { key: "orderStatus", label: "오더 상태" },
];

export default function P2ScanPage() {
  const [selectedEquip, setSelectedEquip] = useState("TG-01");
  const [barcodeInput, setBarcodeInput] = useState("");
  const [currentScan, setCurrentScan] = useState<ScanResult | null>(null);
  const [scanHistory, setScanHistory] = useState(MOCK_SCAN_HISTORY);

  const handleScan = () => {
    if (!barcodeInput.trim()) return;

    const newScan: ScanResult = {
      lot: barcodeInput || `WL-2026-0415-${String(scanHistory.length + 1).padStart(3, "0")}`,
      wireType: "STS304-2.0",
      material: "STS304",
      weight: 220 + Math.random() * 100,
      diameter: 2.0,
      processOrder: `PO-TG-0415-A${String(scanHistory.length + 1).padStart(2, "0")}`,
      orderValid: Math.random() > 0.2,
      scannedAt: new Date().toLocaleTimeString("ko-KR", { hour12: false }),
      equipment: selectedEquip,
    };

    setCurrentScan(newScan);
    setScanHistory([newScan, ...scanHistory]);
    setBarcodeInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleScan();
  };

  return (
    <div>
      <PageHeader
        title="2공정 TG"
        accent="투입 스캔"
        nodeRef="SCR-P2-003"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Scan Input */}
        <div className="lg:col-span-1">
          <FieldHeader title="바코드 스캔" moduleRef="SCAN.INPUT" />

          {/* Equipment Selector */}
          <div className="mb-6">
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
              설비
            </label>
            <select
              value={selectedEquip}
              onChange={(e) => setSelectedEquip(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant/20 px-3 py-2 text-sm font-headline text-on-surface focus:border-primary-accent focus:outline-none"
            >
              {EQUIPMENT_IDS.map((eq) => (
                <option key={eq} value={eq}>{eq}</option>
              ))}
            </select>
          </div>

          {/* Barcode Input */}
          <div className="mb-6">
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
              와이어 LOT 바코드
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={barcodeInput}
                onChange={(e) => setBarcodeInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="바코드 스캔 또는 LOT 입력..."
                autoFocus
                className="flex-1 bg-surface-container-lowest border-2 border-primary-accent px-4 py-3 text-lg font-headline text-on-surface focus:outline-none focus:border-tertiary placeholder:text-on-surface-variant/30"
              />
              <button
                onClick={handleScan}
                className="bg-primary-accent text-on-primary px-6 py-3 font-label text-xs uppercase tracking-widest font-bold hover:bg-primary transition-colors"
              >
                <span className="material-symbols-outlined text-lg">qr_code_scanner</span>
              </button>
            </div>
          </div>

          {/* Scan Result */}
          {currentScan && (
            <div className={`border-l-4 p-5 ${currentScan.orderValid ? "border-tertiary bg-tertiary/5" : "border-error bg-error/5"}`}>
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-headline font-black text-sm">스캔 결과</h4>
                <StatusBadge
                  type={currentScan.orderValid ? "running" : "stopped"}
                  label={currentScan.orderValid ? "유효" : "오더 무효"}
                />
              </div>
              <div className="space-y-3">
                {[
                  { label: "LOT 번호", value: currentScan.lot },
                  { label: "와이어 종류", value: currentScan.wireType },
                  { label: "재질", value: currentScan.material },
                  { label: "중량", value: `${currentScan.weight.toFixed(1)} kg` },
                  { label: "직경", value: `${currentScan.diameter} mm` },
                  { label: "공정 오더", value: currentScan.processOrder },
                  { label: "설비", value: currentScan.equipment },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-center">
                    <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
                      {item.label}
                    </span>
                    <span className="font-headline text-sm tabular-nums font-bold">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
              {!currentScan.orderValid && (
                <div className="mt-4 p-3 bg-error/10 border border-error/20">
                  <p className="font-label text-xs uppercase tracking-widest text-error">
                    경고: 공정 오더가 만료되었거나 찾을 수 없습니다. 관리자에게 문의하세요.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Scan History */}
        <div className="lg:col-span-2">
          <DataTable
            title="스캔 이력"
            columns={SCAN_HISTORY_COLUMNS}
            data={scanHistory.map((s) => ({
              scannedAt: s.scannedAt,
              lot: s.lot,
              wireType: s.wireType,
              weight: s.weight.toFixed(1),
              equipment: s.equipment,
              orderStatus: s.orderValid ? "유효" : "무효",
            }))}
            bufferCount={scanHistory.length}
          />
        </div>
      </div>
    </div>
  );
}
