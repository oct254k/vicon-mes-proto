"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DataTable } from "@/components/ui/DataTable";

const PRODUCT_TYPES = ["전체", "PC침목 8T", "PC침목 11T", "PC침목 14T"];
const ZONE_OPTIONS = ["전체", "A1", "A2", "A3", "A4", "A5", "B1", "B2", "B3", "B4", "B5", "C1", "C2", "C3", "C4", "C5"];

interface SummaryCard {
  label: string;
  value: number;
  unit: string;
  accent: string;
}

const SUMMARY: SummaryCard[] = [
  { label: "총 침목수", value: 827, unit: "EA", accent: "border-primary-accent" },
  { label: "총 중량", value: 745800, unit: "kg", accent: "border-tertiary" },
  { label: "점유 구역", value: 10, unit: "/ 15", accent: "border-[#f59e0b]" },
  { label: "평균 양생일", value: 1.4, unit: "일", accent: "border-primary" },
];

const BY_PRODUCT = [
  { type: "PC침목 8T", qty: 497, weight: "397,600", zones: 6, pctOfTotal: "60.1" },
  { type: "PC침목 11T", qty: 176, weight: "232,320", zones: 3, pctOfTotal: "21.3" },
  { type: "PC침목 14T", qty: 154, weight: "280,280", zones: 3, pctOfTotal: "18.6" },
];

const BY_ZONE = [
  { zone: "A1", product: "PC침목 8T", qty: 87, weight: "69,600", avgCure: "0.8d", occupancy: "72.5%" },
  { zone: "A2", product: "PC침목 8T", qty: 120, weight: "96,000", avgCure: "2.0d", occupancy: "100%" },
  { zone: "A4", product: "PC침목 11T", qty: 45, weight: "59,400", avgCure: "0.3d", occupancy: "45.0%" },
  { zone: "B1", product: "PC침목 8T", qty: 132, weight: "105,600", avgCure: "0.8d", occupancy: "88.0%" },
  { zone: "B3", product: "PC침목 11T", qty: 98, weight: "129,360", avgCure: "1.0d", occupancy: "65.3%" },
  { zone: "B4", product: "PC침목 8T", qty: 120, weight: "96,000", avgCure: "3.0d", occupancy: "100%" },
  { zone: "B5", product: "PC침목 14T", qty: 67, weight: "121,940", avgCure: "0.3d", occupancy: "55.8%" },
  { zone: "C2", product: "PC침목 11T", qty: 23, weight: "30,360", avgCure: "0.3d", occupancy: "23.0%" },
  { zone: "C3", product: "PC침목 8T", qty: 80, weight: "64,000", avgCure: "2.0d", occupancy: "100%" },
  { zone: "C5", product: "PC침목 14T", qty: 55, weight: "100,100", avgCure: "0.3d", occupancy: "55.0%" },
];

const LOT_DATA = [
  { lotNo: "SLP-2026-0415-0032", zone: "B1", product: "PC침목 8T", qty: "4", weight: "3,200", placed: "2026-04-15 09:18", cure: "0d", status: "양생중" },
  { lotNo: "SLP-2026-0415-0031", zone: "B1", product: "PC침목 8T", qty: "4", weight: "3,200", placed: "2026-04-15 09:18", cure: "0d", status: "양생중" },
  { lotNo: "SLP-2026-0415-0029", zone: "B5", product: "PC침목 14T", qty: "4", weight: "7,280", placed: "2026-04-15 08:47", cure: "0d", status: "양생중" },
  { lotNo: "SLP-2026-0415-0028", zone: "C2", product: "PC침목 11T", qty: "8", weight: "10,560", placed: "2026-04-15 08:32", cure: "0d", status: "양생중" },
  { lotNo: "SLP-2026-0415-0012", zone: "A4", product: "PC침목 11T", qty: "4", weight: "5,280", placed: "2026-04-15 07:40", cure: "0d", status: "양생중" },
  { lotNo: "SLP-2026-0415-0005", zone: "C5", product: "PC침목 14T", qty: "4", weight: "7,280", placed: "2026-04-15 06:30", cure: "0d", status: "양생중" },
  { lotNo: "SLP-2026-0415-0001", zone: "A1", product: "PC침목 8T", qty: "4", weight: "3,200", placed: "2026-04-15 06:10", cure: "0d", status: "양생중" },
  { lotNo: "SLP-2026-0414-0050", zone: "B3", product: "PC침목 11T", qty: "6", weight: "7,920", placed: "2026-04-14 16:00", cure: "1d", status: "양생중" },
  { lotNo: "SLP-2026-0414-0045", zone: "A2", product: "PC침목 8T", qty: "10", weight: "8,000", placed: "2026-04-13 08:30", cure: "2d", status: "양생완료" },
  { lotNo: "SLP-2026-0414-0041", zone: "B1", product: "PC침목 8T", qty: "6", weight: "4,800", placed: "2026-04-14 13:30", cure: "1d", status: "양생중" },
  { lotNo: "SLP-2026-0413-0060", zone: "C3", product: "PC침목 8T", qty: "10", weight: "8,000", placed: "2026-04-13 14:20", cure: "2d", status: "양생완료" },
  { lotNo: "SLP-2026-0412-0078", zone: "B4", product: "PC침목 8T", qty: "12", weight: "9,600", placed: "2026-04-12 09:00", cure: "3d", status: "출하가능" },
];

export default function YardInventoryPage() {
  const [filterZone, setFilterZone] = useState("전체");
  const [filterProduct, setFilterProduct] = useState("전체");
  const [filterDate, setFilterDate] = useState("2026-04-15");

  const filteredLots = LOT_DATA.filter((lot) => {
    if (filterZone !== "전체" && lot.zone !== filterZone) return false;
    if (filterProduct !== "전체" && lot.product !== filterProduct) return false;
    return true;
  });

  return (
    <div>
      <PageHeader
        title="야적장"
        accent="재고 현황"
        nodeRef="SCR-YRD-005"
        status="ONLINE"
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-0 mb-8">
        {SUMMARY.map((s) => (
          <div key={s.label} className={`bg-surface-container-lowest p-6 border-l-4 ${s.accent}`}>
            <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
              {s.label}
            </span>
            <span className="text-4xl font-black font-headline tabular-nums">
              {typeof s.value === "number" ? s.value.toLocaleString() : s.value}
            </span>
            <span className="text-sm font-label text-on-surface-variant ml-2">{s.unit}</span>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <section className="bg-surface-container-lowest p-6 mb-6">
        <FieldHeader title="필터" moduleRef="INV-FILTER" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">구역</label>
            <select
              value={filterZone}
              onChange={(e) => setFilterZone(e.target.value)}
              className="w-full bg-surface-container border border-outline-variant/20 px-4 py-3 text-sm font-headline text-on-surface focus:outline-none focus:border-primary-accent appearance-none"
            >
              {ZONE_OPTIONS.map((z) => <option key={z}>{z}</option>)}
            </select>
          </div>
          <div>
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">제품종류</label>
            <select
              value={filterProduct}
              onChange={(e) => setFilterProduct(e.target.value)}
              className="w-full bg-surface-container border border-outline-variant/20 px-4 py-3 text-sm font-headline text-on-surface focus:outline-none focus:border-primary-accent appearance-none"
            >
              {PRODUCT_TYPES.map((p) => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">날짜</label>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="w-full bg-surface-container border border-outline-variant/20 px-4 py-3 text-sm font-headline text-on-surface focus:outline-none focus:border-primary-accent"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={() => { setFilterZone("전체"); setFilterProduct("전체"); }}
              className="w-full bg-surface-container border border-outline-variant/20 px-4 py-3 font-label text-xs uppercase tracking-widest font-bold text-on-surface-variant hover:bg-surface-container-high transition-colors"
            >
              필터 초기화
            </button>
          </div>
        </div>
      </section>

      {/* Inventory by Product */}
      <section className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
            제품별 재고
          </span>
          <div className="flex-1 h-px bg-outline-variant/10" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {BY_PRODUCT.map((p) => (
            <div key={p.type} className="bg-surface-container-lowest p-5 border-l-4 border-primary-accent/50">
              <div className="flex justify-between items-start mb-3">
                <span className="font-headline text-sm font-bold">{p.type}</span>
                <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">
                  {p.pctOfTotal}%
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <span className="font-label text-[11px] uppercase tracking-widest text-on-surface-variant opacity-60 block">수량</span>
                  <span className="font-headline text-lg font-black tabular-nums">{p.qty}</span>
                </div>
                <div>
                  <span className="font-label text-[11px] uppercase tracking-widest text-on-surface-variant opacity-60 block">중량</span>
                  <span className="font-headline text-xs tabular-nums">{p.weight} kg</span>
                </div>
                <div>
                  <span className="font-label text-[11px] uppercase tracking-widest text-on-surface-variant opacity-60 block">구역수</span>
                  <span className="font-headline text-lg font-black tabular-nums">{p.zones}</span>
                </div>
              </div>
              <div className="w-full h-2 bg-surface-container mt-3">
                <div className="h-full bg-primary-accent" style={{ width: `${parseFloat(p.pctOfTotal)}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Inventory by Zone */}
      <DataTable
        title="구역별 재고"
        columns={[
          { key: "zone", label: "구역" },
          { key: "product", label: "제품" },
          { key: "qty", label: "수량 (EA)" },
          { key: "weight", label: "중량 (kg)" },
          { key: "avgCure", label: "평균 양생" },
          { key: "occupancy", label: "점유율" },
        ]}
        data={BY_ZONE.filter((z) => {
          if (filterZone !== "전체" && z.zone !== filterZone) return false;
          if (filterProduct !== "전체" && z.product !== filterProduct) return false;
          return true;
        })}
        bufferCount={BY_ZONE.length}
      />

      {/* Detailed LOT Table */}
      <div className="mt-6">
        <DataTable
          title="LOT 상세"
          columns={[
            { key: "lotNo", label: "LOT 번호" },
            { key: "zone", label: "구역" },
            { key: "product", label: "제품" },
            { key: "qty", label: "수량" },
            { key: "weight", label: "중량 (kg)" },
            { key: "placed", label: "배치일시" },
            { key: "cure", label: "양생" },
            { key: "status", label: "상태" },
          ]}
          data={filteredLots}
          bufferCount={filteredLots.length}
        />
      </div>

      {/* Footer */}
      <footer className="mt-6 bg-surface-container p-4 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-tertiary inline-block" />
            <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">재고 동기화됨</span>
          </div>
          <StatusBadge type="running" label="LIVE" />
        </div>
        <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">
          표시: <span className="text-on-surface tabular-nums font-bold">{filteredLots.length}</span> / {LOT_DATA.length} LOT
        </span>
      </footer>
    </div>
  );
}
