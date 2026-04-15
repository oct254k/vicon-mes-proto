"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DataTable } from "@/components/ui/DataTable";

type ZoneStatus = "available" | "occupied" | "full";

interface ZoneCell {
  id: string;
  status: ZoneStatus;
  load: number;
  capacity: number;
}

const ZONE_GRID: ZoneCell[][] = [
  [
    { id: "A1", status: "occupied", load: 87, capacity: 120 },
    { id: "A2", status: "full", load: 120, capacity: 120 },
    { id: "A3", status: "available", load: 0, capacity: 100 },
    { id: "A4", status: "occupied", load: 45, capacity: 100 },
    { id: "A5", status: "occupied", load: 12, capacity: 80 },
  ],
  [
    { id: "B1", status: "occupied", load: 132, capacity: 150 },
    { id: "B2", status: "available", load: 0, capacity: 150 },
    { id: "B3", status: "occupied", load: 98, capacity: 150 },
    { id: "B4", status: "full", load: 120, capacity: 120 },
    { id: "B5", status: "occupied", load: 67, capacity: 120 },
  ],
  [
    { id: "C1", status: "available", load: 0, capacity: 100 },
    { id: "C2", status: "occupied", load: 23, capacity: 100 },
    { id: "C3", status: "full", load: 80, capacity: 80 },
    { id: "C4", status: "available", load: 0, capacity: 80 },
    { id: "C5", status: "occupied", load: 55, capacity: 100 },
  ],
];

const MOCK_LOT = {
  lotNo: "SLP-2026-0415-0032",
  productType: "PC침목 8T",
  qty: 4,
  weight: "3,200",
  productionDate: "2026-04-15",
  cureStatus: "COMPLETE",
  line: "제조 2라인",
};

const RECENT_PLACEMENTS = [
  { time: "09:18", lot: "SLP-2026-0415-0031", zone: "B1", qty: "4", product: "PC침목 8T", operator: "김철수" },
  { time: "09:05", lot: "SLP-2026-0415-0030", zone: "A1", qty: "6", product: "PC침목 11T", operator: "박영희" },
  { time: "08:47", lot: "SLP-2026-0415-0029", zone: "B5", qty: "4", product: "PC침목 14T", operator: "김철수" },
  { time: "08:32", lot: "SLP-2026-0415-0028", zone: "C2", qty: "8", product: "PC침목 8T", operator: "이준호" },
  { time: "08:10", lot: "SLP-2026-0415-0027", zone: "A4", qty: "4", product: "PC침목 11T", operator: "박영희" },
];

const ZONE_BG: Record<ZoneStatus, string> = {
  available: "bg-tertiary/15 border-tertiary hover:bg-tertiary/30",
  occupied: "bg-primary-accent/15 border-primary-accent/50 hover:bg-primary-accent/25",
  full: "bg-error/15 border-error/50 cursor-not-allowed opacity-50",
};

export default function LocationRegPage() {
  const [barcode, setBarcode] = useState("");
  const [scanned, setScanned] = useState(false);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const handleScan = () => {
    if (barcode.trim()) setScanned(true);
  };

  const handleSelectZone = (zone: ZoneCell) => {
    if (zone.status === "full") return;
    setSelectedZone(zone.id);
  };

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(() => {
      setConfirmed(false);
      setScanned(false);
      setSelectedZone(null);
      setBarcode("");
    }, 2000);
  };

  return (
    <div className="max-w-5xl">
      <PageHeader
        title="위치"
        accent="등록"
        nodeRef="SCR-YRD-002"
        status="FIELD"
      />

      {/* Step 1: Scan LOT Barcode */}
      <section className="bg-surface-container-lowest p-6 mb-6">
        <FieldHeader title="1단계 - 침목 LOT 스캔" moduleRef="LOC-SCAN" />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8">
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">
              LOT 바코드
            </label>
            <div className="flex gap-0">
              <input
                type="text"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleScan()}
                placeholder="침목 LOT 바코드 스캔..."
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
          <div className="md:col-span-4 flex items-end">
            <StatusBadge type={scanned ? "running" : "idle"} label={scanned ? "LOT 확인완료" : "스캔 대기중"} />
          </div>
        </div>
      </section>

      {/* Scan Result */}
      {scanned && (
        <section className="bg-surface-container-lowest p-6 mb-6 border-l-4 border-tertiary">
          <FieldHeader title="LOT 정보" moduleRef="LOT-INFO" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">LOT 번호</span>
              <span className="font-headline text-sm font-bold tabular-nums">{MOCK_LOT.lotNo}</span>
            </div>
            <div>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">제품</span>
              <span className="font-headline text-sm font-bold">{MOCK_LOT.productType}</span>
            </div>
            <div>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">수량</span>
              <span className="font-headline text-sm font-bold tabular-nums">{MOCK_LOT.qty} EA</span>
            </div>
            <div>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">중량</span>
              <span className="font-headline text-sm font-bold tabular-nums">{MOCK_LOT.weight} kg</span>
            </div>
            <div>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">생산일</span>
              <span className="font-headline text-sm tabular-nums">{MOCK_LOT.productionDate}</span>
            </div>
            <div>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">생산라인</span>
              <span className="font-headline text-sm">{MOCK_LOT.line}</span>
            </div>
            <div>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">양생 상태</span>
              <StatusBadge type="running" label={MOCK_LOT.cureStatus} />
            </div>
          </div>
        </section>
      )}

      {/* Step 2: Select Zone */}
      {scanned && (
        <section className="bg-surface-container-lowest p-6 mb-6">
          <FieldHeader title="2단계 - 구역 선택" moduleRef="ZN-SELECT" />
          <div className="mb-4">
            {ZONE_GRID.map((row, ri) => (
              <div key={ri} className="grid grid-cols-6 gap-2 mb-2">
                <div className="flex items-center justify-center font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">
                  {["A", "B", "C"][ri]}
                </div>
                {row.map((zone) => (
                  <button
                    key={zone.id}
                    onClick={() => handleSelectZone(zone)}
                    className={`p-3 border-l-2 transition-all ${ZONE_BG[zone.status]} ${selectedZone === zone.id ? "ring-2 ring-tertiary" : ""}`}
                    disabled={zone.status === "full"}
                  >
                    <div className="font-headline text-sm font-black">{zone.id}</div>
                    <div className="font-label text-[11px] tabular-nums text-on-surface-variant opacity-60">
                      {zone.load}/{zone.capacity}
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </div>
          {selectedZone && (
            <div className="bg-surface-container p-4 flex items-center justify-between">
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
                선택됨: <span className="text-tertiary font-bold">{selectedZone}</span>
              </span>
              <span className="font-label text-[11px] uppercase tracking-widest text-on-surface-variant opacity-60">
                다른 구역을 탭하여 변경
              </span>
            </div>
          )}
        </section>
      )}

      {/* Step 3: Confirm */}
      {scanned && selectedZone && (
        <section className="bg-surface-container-lowest p-6 mb-6 border-l-4 border-primary-accent">
          <FieldHeader title="3단계 - 배치 확정" moduleRef="LOC-CONFIRM" />
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">LOT</span>
              <span className="font-headline text-lg font-black tabular-nums">{MOCK_LOT.lotNo}</span>
            </div>
            <div>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">목적지 구역</span>
              <span className="font-headline text-lg font-black text-tertiary">{selectedZone}</span>
            </div>
          </div>
          {confirmed ? (
            <div className="bg-tertiary/20 p-4 flex items-center gap-3">
              <span className="material-symbols-outlined text-tertiary">check_circle</span>
              <span className="font-label text-xs uppercase tracking-widest text-tertiary font-bold">
                배치가 성공적으로 확정되었습니다
              </span>
            </div>
          ) : (
            <button
              onClick={handleConfirm}
              className="bg-primary-accent px-8 py-4 font-label text-xs uppercase tracking-widest font-bold text-on-primary-container hover:bg-primary-accent/80 transition-colors w-full md:w-auto"
            >
              배치 확정
            </button>
          )}
        </section>
      )}

      {/* Recent Placements */}
      <DataTable
        title="최근 배치 이력"
        columns={[
          { key: "time", label: "시간" },
          { key: "lot", label: "LOT 번호" },
          { key: "zone", label: "구역" },
          { key: "qty", label: "수량" },
          { key: "product", label: "제품" },
          { key: "operator", label: "작업자" },
        ]}
        data={RECENT_PLACEMENTS}
        bufferCount={RECENT_PLACEMENTS.length}
      />

      {/* Footer */}
      <footer className="mt-6 bg-surface-container p-4 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-tertiary inline-block" />
            <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">스캐너 온라인</span>
          </div>
          <StatusBadge type="running" label="FIELD MODE" />
        </div>
        <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">
          금일 배치: <span className="text-on-surface tabular-nums font-bold">05</span>
        </span>
      </footer>
    </div>
  );
}
