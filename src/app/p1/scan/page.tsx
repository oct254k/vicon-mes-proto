"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DataTable } from "@/components/ui/DataTable";

const EQUIPMENT_OPTIONS = ["신선#1", "신선#2", "신선#3", "신선#4"];

const MOCK_SCAN_RESULT = {
  lotNo: "P1-2026-0415-001",
  material: "SWRH 62B",
  supplier: "포항제철소",
  weight: "2,150",
  coilNo: "C-20260412-0087",
  receivedDate: "2026-04-14",
  fifoStatus: "PASS" as const,
  fifoOrder: 3,
};

const DAILY_INPUTS = [
  { time: "06:12", lot: "P1-2026-0415-001", equip: "신선#1", material: "SWRH 62B", weight: "2,150", status: "완료" },
  { time: "06:45", lot: "P1-2026-0415-002", equip: "신선#2", material: "SWRH 72A", weight: "1,980", status: "완료" },
  { time: "07:23", lot: "P1-2026-0415-003", equip: "신선#1", material: "SWRH 82B", weight: "2,300", status: "완료" },
  { time: "08:01", lot: "P1-2026-0415-004", equip: "신선#3", material: "SWRH 62B", weight: "2,050", status: "대기" },
];

export default function P1ScanPage() {
  const [barcode, setBarcode] = useState("");
  const [equipment, setEquipment] = useState(EQUIPMENT_OPTIONS[0]);
  const [scanned, setScanned] = useState(false);

  const handleScan = () => {
    if (barcode.trim()) {
      setScanned(true);
    }
  };

  return (
    <div className="max-w-5xl">
      <PageHeader
        title="투입"
        accent="스캔"
        nodeRef="SCR-P1-001"
        status="ONLINE"
      />

      {/* Scan Input Section */}
      <section className="bg-surface-container-lowest p-6 mb-6">
        <FieldHeader title="바코드 스캔" moduleRef="MOD-SCAN-01" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Barcode Input */}
          <div className="md:col-span-6">
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">
              바코드 / QR
            </label>
            <div className="flex gap-0">
              <input
                type="text"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleScan()}
                placeholder="스캔 대기중..."
                className="flex-1 bg-surface-container border border-outline-variant/20 px-4 py-3 text-sm font-headline text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-primary-accent"
              />
              <button
                onClick={handleScan}
                className="bg-primary-accent px-6 py-3 font-label text-xs uppercase tracking-widest font-bold text-on-primary-container hover:bg-primary-accent/80 transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">qr_code_scanner</span>
                스캔
              </button>
            </div>
          </div>

          {/* Equipment Selector */}
          <div className="md:col-span-4">
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">
              설비
            </label>
            <select
              value={equipment}
              onChange={(e) => setEquipment(e.target.value)}
              className="w-full bg-surface-container border border-outline-variant/20 px-4 py-3 text-sm font-headline text-on-surface focus:outline-none focus:border-primary-accent appearance-none cursor-pointer"
            >
              {EQUIPMENT_OPTIONS.map((eq) => (
                <option key={eq} value={eq}>{eq}</option>
              ))}
            </select>
          </div>

          {/* Status Indicator */}
          <div className="md:col-span-2 flex items-end">
            <StatusBadge type={scanned ? "running" : "idle"} label={scanned ? "스캔완료" : "대기"} />
          </div>
        </div>
      </section>

      {/* Scan Result */}
      {scanned && (
        <section className="bg-surface-container-lowest p-6 mb-6 border-l-4 border-tertiary">
          <FieldHeader title="스캔 결과" moduleRef="LOT-VERIFY" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            <div>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">LOT No.</span>
              <span className="font-headline text-sm font-bold tabular-nums">{MOCK_SCAN_RESULT.lotNo}</span>
            </div>
            <div>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">자재</span>
              <span className="font-headline text-sm font-bold">{MOCK_SCAN_RESULT.material}</span>
            </div>
            <div>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">공급사</span>
              <span className="font-headline text-sm">{MOCK_SCAN_RESULT.supplier}</span>
            </div>
            <div>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">중량 (kg)</span>
              <span className="font-headline text-sm font-bold tabular-nums">{MOCK_SCAN_RESULT.weight}</span>
            </div>
            <div>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">코일 No.</span>
              <span className="font-headline text-sm tabular-nums">{MOCK_SCAN_RESULT.coilNo}</span>
            </div>
            <div>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">입고일</span>
              <span className="font-headline text-sm tabular-nums">{MOCK_SCAN_RESULT.receivedDate}</span>
            </div>
            <div>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">FIFO 순서</span>
              <span className="font-headline text-sm tabular-nums">#{MOCK_SCAN_RESULT.fifoOrder}</span>
            </div>
            <div>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">FIFO 검증</span>
              <StatusBadge type="running" label="PASS" />
            </div>
          </div>

          <button className="bg-primary-accent px-8 py-3 font-label text-xs uppercase tracking-widest font-bold text-on-primary-container hover:bg-primary-accent/80 transition-colors">
            투입 확정
          </button>
        </section>
      )}

      {/* Daily Input Log */}
      <DataTable
        title="금일 투입 내역"
        columns={[
          { key: "time", label: "시간" },
          { key: "lot", label: "LOT No." },
          { key: "equip", label: "설비" },
          { key: "material", label: "자재" },
          { key: "weight", label: "중량 (kg)" },
          { key: "status", label: "상태" },
        ]}
        data={DAILY_INPUTS}
        bufferCount={DAILY_INPUTS.length}
      />

      {/* Footer Status Bar */}
      <footer className="mt-6 bg-surface-container p-4 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-tertiary inline-block" />
            <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">스캐너 온라인</span>
          </div>
          <StatusBadge type="running" label="사용중" />
        </div>
        <div className="flex items-center gap-6">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">
            금일 투입: <span className="text-on-surface tabular-nums font-bold">04</span>
          </span>
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">
            알람: <span className="text-error tabular-nums font-bold">00</span>
          </span>
        </div>
      </footer>
    </div>
  );
}
