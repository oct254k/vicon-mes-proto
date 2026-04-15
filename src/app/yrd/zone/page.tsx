"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

type ZoneStatus = "available" | "occupied" | "full" | "reserved" | "maintenance";

interface Zone {
  id: string;
  row: string;
  col: number;
  capacity: number;
  currentLoad: number;
  status: ZoneStatus;
  productType: string;
  lastUpdated: string;
}

const ZONES: Zone[] = [
  { id: "A1", row: "A", col: 1, capacity: 120, currentLoad: 87, status: "occupied", productType: "PC침목 8T", lastUpdated: "2026-04-15 08:32" },
  { id: "A2", row: "A", col: 2, capacity: 120, currentLoad: 120, status: "full", productType: "PC침목 8T", lastUpdated: "2026-04-15 07:15" },
  { id: "A3", row: "A", col: 3, capacity: 100, currentLoad: 0, status: "available", productType: "-", lastUpdated: "2026-04-14 16:40" },
  { id: "A4", row: "A", col: 4, capacity: 100, currentLoad: 45, status: "occupied", productType: "PC침목 11T", lastUpdated: "2026-04-15 09:10" },
  { id: "A5", row: "A", col: 5, capacity: 80, currentLoad: 0, status: "maintenance", productType: "-", lastUpdated: "2026-04-13 14:00" },
  { id: "B1", row: "B", col: 1, capacity: 150, currentLoad: 132, status: "occupied", productType: "PC침목 8T", lastUpdated: "2026-04-15 06:58" },
  { id: "B2", row: "B", col: 2, capacity: 150, currentLoad: 0, status: "reserved", productType: "PC침목 14T", lastUpdated: "2026-04-15 05:00" },
  { id: "B3", row: "B", col: 3, capacity: 150, currentLoad: 98, status: "occupied", productType: "PC침목 11T", lastUpdated: "2026-04-15 08:45" },
  { id: "B4", row: "B", col: 4, capacity: 120, currentLoad: 120, status: "full", productType: "PC침목 8T", lastUpdated: "2026-04-15 07:30" },
  { id: "B5", row: "B", col: 5, capacity: 120, currentLoad: 67, status: "occupied", productType: "PC침목 14T", lastUpdated: "2026-04-15 09:22" },
  { id: "C1", row: "C", col: 1, capacity: 100, currentLoad: 0, status: "available", productType: "-", lastUpdated: "2026-04-14 17:00" },
  { id: "C2", row: "C", col: 2, capacity: 100, currentLoad: 23, status: "occupied", productType: "PC침목 11T", lastUpdated: "2026-04-15 08:10" },
  { id: "C3", row: "C", col: 3, capacity: 80, currentLoad: 80, status: "full", productType: "PC침목 8T", lastUpdated: "2026-04-15 06:20" },
  { id: "C4", row: "C", col: 4, capacity: 80, currentLoad: 0, status: "available", productType: "-", lastUpdated: "2026-04-14 15:30" },
  { id: "C5", row: "C", col: 5, capacity: 100, currentLoad: 55, status: "occupied", productType: "PC침목 14T", lastUpdated: "2026-04-15 09:05" },
];

const STATUS_COLORS: Record<ZoneStatus, string> = {
  available: "bg-tertiary/20 border-tertiary",
  occupied: "bg-primary-accent/20 border-primary-accent",
  full: "bg-error/20 border-error",
  reserved: "bg-[#f59e0b]/20 border-[#f59e0b]",
  maintenance: "bg-surface-container-highest border-outline-variant/30",
};

const STATUS_BADGE: Record<ZoneStatus, { type: "running" | "stopped" | "warning" | "idle" | "error"; label: string }> = {
  available: { type: "running", label: "가용" },
  occupied: { type: "warning", label: "점유" },
  full: { type: "stopped", label: "만재" },
  reserved: { type: "idle", label: "예약" },
  maintenance: { type: "error", label: "정비" },
};

export default function YardZonePage() {
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [showModal, setShowModal] = useState(false);

  const totalCapacity = ZONES.reduce((s, z) => s + z.capacity, 0);
  const totalLoad = ZONES.reduce((s, z) => s + z.currentLoad, 0);
  const utilization = ((totalLoad / totalCapacity) * 100).toFixed(1);

  const rows = ["A", "B", "C"];

  return (
    <div>
      <PageHeader
        title="야적장"
        accent="구역 마스터"
        nodeRef="SCR-YRD-001"
        status="ONLINE"
      />

      {/* KPI Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-0 mb-8">
        <div className="bg-surface-container-lowest p-6 border-l-4 border-primary-accent">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
            총 구역
          </span>
          <span className="text-4xl font-black font-headline tabular-nums">{ZONES.length}</span>
        </div>
        <div className="bg-surface-container-lowest p-6 border-l-4 border-tertiary">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
            총 용량
          </span>
          <span className="text-4xl font-black font-headline tabular-nums">{totalCapacity.toLocaleString()}</span>
          <span className="text-sm font-label text-on-surface-variant ml-2">EA</span>
        </div>
        <div className="bg-surface-container-lowest p-6 border-l-4 border-[#f59e0b]">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
            현재 적재
          </span>
          <span className="text-4xl font-black font-headline tabular-nums">{totalLoad.toLocaleString()}</span>
          <span className="text-sm font-label text-on-surface-variant ml-2">EA</span>
        </div>
        <div className="bg-surface-container-lowest p-6 border-l-4 border-error">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
            가동률
          </span>
          <span className="text-4xl font-black font-headline tabular-nums">{utilization}</span>
          <span className="text-sm font-label text-on-surface-variant ml-2">%</span>
        </div>
      </div>

      {/* Yard Grid Map */}
      <section className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
            야적장 구역 배치도
          </span>
          <div className="flex-1 h-px bg-outline-variant/10" />
          <button
            onClick={() => setShowModal(true)}
            className="bg-primary-accent px-4 py-2 font-label text-xs uppercase tracking-widest font-bold text-on-primary-container hover:bg-primary-accent/80 transition-colors"
          >
            + 구역 추가
          </button>
        </div>

        <div className="bg-surface-container-lowest p-6">
          {/* Column headers */}
          <div className="grid grid-cols-6 gap-3 mb-2">
            <div />
            {[1, 2, 3, 4, 5].map((col) => (
              <div key={col} className="text-center font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">
                열 {col}
              </div>
            ))}
          </div>

          {/* Zone grid */}
          {rows.map((row) => (
            <div key={row} className="grid grid-cols-6 gap-3 mb-3">
              <div className="flex items-center justify-center font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">
                행 {row}
              </div>
              {ZONES.filter((z) => z.row === row).map((zone) => {
                const pct = zone.capacity > 0 ? (zone.currentLoad / zone.capacity) * 100 : 0;
                return (
                  <button
                    key={zone.id}
                    onClick={() => setSelectedZone(zone)}
                    className={`relative p-4 border-l-4 ${STATUS_COLORS[zone.status]} hover:opacity-80 transition-opacity text-left`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-headline text-lg font-black">{zone.id}</span>
                      <StatusBadge {...STATUS_BADGE[zone.status]} />
                    </div>
                    <div className="font-label text-[11px] uppercase tracking-widest text-on-surface-variant opacity-60 mb-1">
                      {zone.currentLoad}/{zone.capacity} EA
                    </div>
                    <div className="w-full h-2 bg-surface-container">
                      <div
                        className={`h-full ${pct >= 100 ? "bg-error" : pct >= 70 ? "bg-primary-accent" : "bg-tertiary"}`}
                        style={{ width: `${Math.min(pct, 100)}%` }}
                      />
                    </div>
                    <div className="mt-1 font-label text-[8px] text-on-surface-variant opacity-60 truncate">
                      {zone.productType}
                    </div>
                  </button>
                );
              })}
            </div>
          ))}

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-outline-variant/10">
            {(Object.entries(STATUS_BADGE) as [ZoneStatus, { type: "running" | "stopped" | "warning" | "idle" | "error"; label: string }][]).map(([key, val]) => (
              <div key={key} className="flex items-center gap-2">
                <div className={`w-3 h-3 border-l-2 ${STATUS_COLORS[key]}`} />
                <span className="font-label text-[11px] uppercase tracking-widest text-on-surface-variant opacity-60">{val.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Zone Detail */}
      {selectedZone && (
        <section className="bg-surface-container-lowest p-6 mb-8 border-l-4 border-tertiary">
          <FieldHeader title={`구역 ${selectedZone.id} 상세`} moduleRef="ZN-DETAIL" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            <div>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">구역 ID</span>
              <span className="font-headline text-sm font-bold">{selectedZone.id}</span>
            </div>
            <div>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">용량</span>
              <span className="font-headline text-sm font-bold tabular-nums">{selectedZone.capacity} EA</span>
            </div>
            <div>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">현재 적재</span>
              <span className="font-headline text-sm font-bold tabular-nums">{selectedZone.currentLoad} EA</span>
            </div>
            <div>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">상태</span>
              <StatusBadge {...STATUS_BADGE[selectedZone.status]} />
            </div>
            <div>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">제품종류</span>
              <span className="font-headline text-sm">{selectedZone.productType}</span>
            </div>
            <div>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">최종 수정</span>
              <span className="font-headline text-sm tabular-nums">{selectedZone.lastUpdated}</span>
            </div>
            <div>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">가동률</span>
              <span className="font-headline text-sm tabular-nums font-bold">
                {selectedZone.capacity > 0 ? ((selectedZone.currentLoad / selectedZone.capacity) * 100).toFixed(1) : "0.0"}%
              </span>
            </div>
            <div>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">행 / 열</span>
              <span className="font-headline text-sm tabular-nums">{selectedZone.row}-{selectedZone.col}</span>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="bg-primary-accent px-6 py-3 font-label text-xs uppercase tracking-widest font-bold text-on-primary-container hover:bg-primary-accent/80 transition-colors">
              구역 수정
            </button>
            <button className="bg-surface-container border border-outline-variant/20 px-6 py-3 font-label text-xs uppercase tracking-widest font-bold text-on-surface-variant hover:bg-surface-container-high transition-colors">
              구역 삭제
            </button>
          </div>
        </section>
      )}

      {/* Add Zone Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-surface-container-lowest w-full max-w-lg p-8 border-l-4 border-primary-accent">
            <FieldHeader title="새 구역 추가" moduleRef="ZN-CREATE" />
            <div className="space-y-4 mb-6">
              <div>
                <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">구역 ID</label>
                <input type="text" placeholder="e.g. D1" className="w-full bg-surface-container border border-outline-variant/20 px-4 py-3 text-sm font-headline text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-primary-accent" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">행</label>
                  <select className="w-full bg-surface-container border border-outline-variant/20 px-4 py-3 text-sm font-headline text-on-surface focus:outline-none focus:border-primary-accent appearance-none">
                    <option>A</option><option>B</option><option>C</option><option>D</option>
                  </select>
                </div>
                <div>
                  <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">열</label>
                  <input type="number" placeholder="1-10" className="w-full bg-surface-container border border-outline-variant/20 px-4 py-3 text-sm font-headline text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-primary-accent" />
                </div>
              </div>
              <div>
                <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">용량 (EA)</label>
                <input type="number" placeholder="100" className="w-full bg-surface-container border border-outline-variant/20 px-4 py-3 text-sm font-headline text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-primary-accent" />
              </div>
              <div>
                <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">제품종류</label>
                <select className="w-full bg-surface-container border border-outline-variant/20 px-4 py-3 text-sm font-headline text-on-surface focus:outline-none focus:border-primary-accent appearance-none">
                  <option>PC침목 8T</option><option>PC침목 11T</option><option>PC침목 14T</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="bg-primary-accent px-6 py-3 font-label text-xs uppercase tracking-widest font-bold text-on-primary-container hover:bg-primary-accent/80 transition-colors">
                구역 생성
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-surface-container border border-outline-variant/20 px-6 py-3 font-label text-xs uppercase tracking-widest font-bold text-on-surface-variant hover:bg-surface-container-high transition-colors"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-6 bg-surface-container p-4 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-tertiary inline-block" />
            <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">야적장 시스템 온라인</span>
          </div>
        </div>
        <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">
          최종 동기화: 2026-04-15 09:30 | 구역: {ZONES.length}
        </span>
      </footer>
    </div>
  );
}
