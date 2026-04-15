"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DataTable } from "@/components/ui/DataTable";

interface ZoneData {
  id: string;
  row: string;
  col: number;
  capacity: number;
  currentLoad: number;
  pct: number;
  productType: string;
  lots: LotEntry[];
}

interface LotEntry {
  lotNo: string;
  productType: string;
  qty: number;
  placedDate: string;
  cureAge: number;
  weight: string;
}

const ZONES: ZoneData[] = [
  {
    id: "A1", row: "A", col: 1, capacity: 120, currentLoad: 87, pct: 72.5, productType: "PC침목 8T",
    lots: [
      { lotNo: "SLP-2026-0414-0018", productType: "PC침목 8T", qty: 8, placedDate: "2026-04-14 14:20", cureAge: 1, weight: "6,400" },
      { lotNo: "SLP-2026-0414-0022", productType: "PC침목 8T", qty: 6, placedDate: "2026-04-14 15:45", cureAge: 1, weight: "4,800" },
      { lotNo: "SLP-2026-0415-0001", productType: "PC침목 8T", qty: 4, placedDate: "2026-04-15 06:10", cureAge: 0, weight: "3,200" },
    ],
  },
  {
    id: "A2", row: "A", col: 2, capacity: 120, currentLoad: 120, pct: 100, productType: "PC침목 8T",
    lots: [
      { lotNo: "SLP-2026-0413-0045", productType: "PC침목 8T", qty: 10, placedDate: "2026-04-13 08:30", cureAge: 2, weight: "8,000" },
      { lotNo: "SLP-2026-0413-0048", productType: "PC침목 8T", qty: 10, placedDate: "2026-04-13 10:15", cureAge: 2, weight: "8,000" },
    ],
  },
  { id: "A3", row: "A", col: 3, capacity: 100, currentLoad: 0, pct: 0, productType: "-", lots: [] },
  {
    id: "A4", row: "A", col: 4, capacity: 100, currentLoad: 45, pct: 45, productType: "PC침목 11T",
    lots: [
      { lotNo: "SLP-2026-0415-0012", productType: "PC침목 11T", qty: 4, placedDate: "2026-04-15 07:40", cureAge: 0, weight: "5,280" },
    ],
  },
  { id: "A5", row: "A", col: 5, capacity: 80, currentLoad: 0, pct: 0, productType: "-", lots: [] },
  {
    id: "B1", row: "B", col: 1, capacity: 150, currentLoad: 132, pct: 88, productType: "PC침목 8T",
    lots: [
      { lotNo: "SLP-2026-0414-0035", productType: "PC침목 8T", qty: 8, placedDate: "2026-04-14 11:00", cureAge: 1, weight: "6,400" },
      { lotNo: "SLP-2026-0414-0041", productType: "PC침목 8T", qty: 6, placedDate: "2026-04-14 13:30", cureAge: 1, weight: "4,800" },
      { lotNo: "SLP-2026-0415-0031", productType: "PC침목 8T", qty: 4, placedDate: "2026-04-15 09:18", cureAge: 0, weight: "3,200" },
    ],
  },
  { id: "B2", row: "B", col: 2, capacity: 150, currentLoad: 0, pct: 0, productType: "-", lots: [] },
  {
    id: "B3", row: "B", col: 3, capacity: 150, currentLoad: 98, pct: 65.3, productType: "PC침목 11T",
    lots: [
      { lotNo: "SLP-2026-0414-0050", productType: "PC침목 11T", qty: 6, placedDate: "2026-04-14 16:00", cureAge: 1, weight: "7,920" },
    ],
  },
  {
    id: "B4", row: "B", col: 4, capacity: 120, currentLoad: 120, pct: 100, productType: "PC침목 8T",
    lots: [
      { lotNo: "SLP-2026-0412-0078", productType: "PC침목 8T", qty: 12, placedDate: "2026-04-12 09:00", cureAge: 3, weight: "9,600" },
    ],
  },
  {
    id: "B5", row: "B", col: 5, capacity: 120, currentLoad: 67, pct: 55.8, productType: "PC침목 14T",
    lots: [
      { lotNo: "SLP-2026-0415-0029", productType: "PC침목 14T", qty: 4, placedDate: "2026-04-15 08:47", cureAge: 0, weight: "7,280" },
    ],
  },
  { id: "C1", row: "C", col: 1, capacity: 100, currentLoad: 0, pct: 0, productType: "-", lots: [] },
  {
    id: "C2", row: "C", col: 2, capacity: 100, currentLoad: 23, pct: 23, productType: "PC침목 11T",
    lots: [
      { lotNo: "SLP-2026-0415-0028", productType: "PC침목 11T", qty: 8, placedDate: "2026-04-15 08:32", cureAge: 0, weight: "10,560" },
    ],
  },
  {
    id: "C3", row: "C", col: 3, capacity: 80, currentLoad: 80, pct: 100, productType: "PC침목 8T",
    lots: [
      { lotNo: "SLP-2026-0413-0060", productType: "PC침목 8T", qty: 10, placedDate: "2026-04-13 14:20", cureAge: 2, weight: "8,000" },
    ],
  },
  { id: "C4", row: "C", col: 4, capacity: 80, currentLoad: 0, pct: 0, productType: "-", lots: [] },
  {
    id: "C5", row: "C", col: 5, capacity: 100, currentLoad: 55, pct: 55, productType: "PC침목 14T",
    lots: [
      { lotNo: "SLP-2026-0415-0005", productType: "PC침목 14T", qty: 4, placedDate: "2026-04-15 06:30", cureAge: 0, weight: "7,280" },
    ],
  },
];

export default function LocationViewPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedZone, setSelectedZone] = useState<ZoneData | null>(null);
  const [searchType, setSearchType] = useState<"lot" | "zone">("zone");

  const filteredZones = searchQuery.trim()
    ? ZONES.filter((z) => {
        const q = searchQuery.toUpperCase();
        if (searchType === "zone") return z.id.includes(q);
        return z.lots.some((l) => l.lotNo.toUpperCase().includes(q));
      })
    : ZONES;

  const highlightedIds = new Set(filteredZones.map((z) => z.id));

  const rows = ["A", "B", "C"];

  return (
    <div>
      <PageHeader
        title="위치"
        accent="조회"
        nodeRef="SCR-YRD-003"
        status="ONLINE"
      />

      {/* Search Bar */}
      <section className="bg-surface-container-lowest p-6 mb-6">
        <FieldHeader title="검색" moduleRef="LOC-SEARCH" />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-3">
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">
              검색 기준
            </label>
            <div className="flex gap-0">
              <button
                onClick={() => setSearchType("zone")}
                className={`flex-1 py-3 font-label text-xs uppercase tracking-widest font-bold transition-colors ${
                  searchType === "zone" ? "bg-primary-accent text-on-primary-container" : "bg-surface-container text-on-surface-variant border border-outline-variant/20"
                }`}
              >
                구역
              </button>
              <button
                onClick={() => setSearchType("lot")}
                className={`flex-1 py-3 font-label text-xs uppercase tracking-widest font-bold transition-colors ${
                  searchType === "lot" ? "bg-primary-accent text-on-primary-container" : "bg-surface-container text-on-surface-variant border border-outline-variant/20"
                }`}
              >
                LOT
              </button>
            </div>
          </div>
          <div className="md:col-span-7">
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">
              {searchType === "zone" ? "구역 ID" : "LOT 번호"}
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchType === "zone" ? "e.g. A1, B3..." : "e.g. SLP-2026-0415-0032"}
              className="w-full bg-surface-container border border-outline-variant/20 px-4 py-3 text-sm font-headline text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-primary-accent"
            />
          </div>
          <div className="md:col-span-2 flex items-end">
            <button
              onClick={() => setSearchQuery("")}
              className="w-full bg-surface-container border border-outline-variant/20 px-4 py-3 font-label text-xs uppercase tracking-widest font-bold text-on-surface-variant hover:bg-surface-container-high transition-colors"
            >
              초기화
            </button>
          </div>
        </div>
      </section>

      {/* Visual Yard Map */}
      <section className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
            야적장 배치도
          </span>
          <div className="flex-1 h-px bg-outline-variant/10" />
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">
            {filteredZones.filter((z) => z.currentLoad > 0).length} 점유 / {ZONES.length} 전체
          </span>
        </div>

        <div className="bg-surface-container-lowest p-6">
          {rows.map((row) => (
            <div key={row} className="grid grid-cols-6 gap-3 mb-3">
              <div className="flex items-center justify-center font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">
                {row}
              </div>
              {ZONES.filter((z) => z.row === row).map((zone) => {
                const isHighlighted = highlightedIds.has(zone.id);
                const hasLoad = zone.currentLoad > 0;
                return (
                  <button
                    key={zone.id}
                    onClick={() => setSelectedZone(zone)}
                    className={`p-3 border-l-2 transition-all text-left ${
                      !isHighlighted && searchQuery
                        ? "opacity-20 bg-surface-container border-outline-variant/10"
                        : hasLoad
                        ? zone.pct >= 100
                          ? "bg-error/15 border-error"
                          : zone.pct >= 70
                          ? "bg-primary-accent/15 border-primary-accent"
                          : "bg-tertiary/10 border-tertiary/50"
                        : "bg-surface-container border-outline-variant/10"
                    } ${selectedZone?.id === zone.id ? "ring-2 ring-tertiary" : ""}`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-headline text-sm font-black">{zone.id}</span>
                      {hasLoad && (
                        <span className="font-label text-[11px] tabular-nums text-on-surface-variant opacity-60">
                          {zone.pct.toFixed(0)}%
                        </span>
                      )}
                    </div>
                    <div className="w-full h-1.5 bg-surface-container mb-1">
                      <div
                        className={`h-full ${zone.pct >= 100 ? "bg-error" : zone.pct >= 70 ? "bg-primary-accent" : "bg-tertiary"}`}
                        style={{ width: `${Math.min(zone.pct, 100)}%` }}
                      />
                    </div>
                    <div className="font-label text-[8px] text-on-surface-variant opacity-60 tabular-nums">
                      {zone.currentLoad}/{zone.capacity}
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </section>

      {/* Detail Panel */}
      {selectedZone && (
        <section className="bg-surface-container-lowest p-6 mb-8 border-l-4 border-tertiary">
          <FieldHeader title={`구역 ${selectedZone.id} -- ${selectedZone.lots.length} LOT`} moduleRef="ZN-DETAIL" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            <div>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">구역</span>
              <span className="font-headline text-lg font-black">{selectedZone.id}</span>
            </div>
            <div>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">제품종류</span>
              <span className="font-headline text-sm font-bold">{selectedZone.productType}</span>
            </div>
            <div>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">적재량</span>
              <span className="font-headline text-sm font-bold tabular-nums">{selectedZone.currentLoad} / {selectedZone.capacity} EA</span>
            </div>
            <div>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">가동률</span>
              <span className={`font-headline text-sm font-bold tabular-nums ${selectedZone.pct >= 100 ? "text-error" : selectedZone.pct >= 70 ? "text-primary-accent" : "text-tertiary"}`}>
                {selectedZone.pct.toFixed(1)}%
              </span>
            </div>
          </div>

          {selectedZone.lots.length > 0 ? (
            <DataTable
              title={`구역 ${selectedZone.id}의 LOT`}
              columns={[
                { key: "lotNo", label: "LOT 번호" },
                { key: "productType", label: "제품" },
                { key: "qty", label: "수량 (EA)" },
                { key: "weight", label: "중량 (kg)" },
                { key: "placedDate", label: "배치일시" },
                { key: "cureAge", label: "양생일수" },
              ]}
              data={selectedZone.lots.map((l) => ({
                ...l,
                qty: String(l.qty),
                cureAge: `${l.cureAge}d`,
              }))}
            />
          ) : (
            <div className="bg-surface-container p-6 text-center">
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">
                구역이 비어있습니다
              </span>
            </div>
          )}
        </section>
      )}

      {/* Footer */}
      <footer className="mt-6 bg-surface-container p-4 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-tertiary inline-block" />
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">야적장 추적 활성</span>
        </div>
        <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">
          야적장 총 침목수: <span className="text-on-surface tabular-nums font-bold">{ZONES.reduce((s, z) => s + z.currentLoad, 0).toLocaleString()}</span>
        </span>
      </footer>
    </div>
  );
}
