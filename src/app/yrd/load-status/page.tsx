"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DataTable } from "@/components/ui/DataTable";

const DAILY_SUMMARY = {
  totalLoaded: 48,
  totalShipped: 36,
  pending: 12,
  totalWeight: "62,400",
  vehicles: 4,
};

const HOURLY_MOVEMENTS = [
  { hour: "06", loaded: 8, shipped: 0 },
  { hour: "07", loaded: 12, shipped: 8 },
  { hour: "08", loaded: 10, shipped: 12 },
  { hour: "09", loaded: 8, shipped: 8 },
  { hour: "10", loaded: 6, shipped: 4 },
  { hour: "11", loaded: 4, shipped: 4 },
  { hour: "12", loaded: 0, shipped: 0 },
  { hour: "13", loaded: 0, shipped: 0 },
  { hour: "14", loaded: 0, shipped: 0 },
  { hour: "15", loaded: 0, shipped: 0 },
  { hour: "16", loaded: 0, shipped: 0 },
  { hour: "17", loaded: 0, shipped: 0 },
];

interface ZoneLoadStatus {
  zone: string;
  product: string;
  totalQty: number;
  loadedToday: number;
  shippedToday: number;
  remaining: number;
  status: "active" | "idle" | "complete";
}

const ZONE_STATUS: ZoneLoadStatus[] = [
  { zone: "A1", product: "PC침목 8T", totalQty: 87, loadedToday: 8, shippedToday: 8, remaining: 79, status: "active" },
  { zone: "A2", product: "PC침목 8T", totalQty: 120, loadedToday: 20, shippedToday: 16, remaining: 100, status: "active" },
  { zone: "A4", product: "PC침목 11T", totalQty: 45, loadedToday: 0, shippedToday: 0, remaining: 45, status: "idle" },
  { zone: "B1", product: "PC침목 8T", totalQty: 132, loadedToday: 12, shippedToday: 8, remaining: 120, status: "active" },
  { zone: "B3", product: "PC침목 11T", totalQty: 98, loadedToday: 0, shippedToday: 0, remaining: 98, status: "idle" },
  { zone: "B4", product: "PC침목 8T", totalQty: 120, loadedToday: 8, shippedToday: 4, remaining: 112, status: "active" },
  { zone: "B5", product: "PC침목 14T", totalQty: 67, loadedToday: 0, shippedToday: 0, remaining: 67, status: "idle" },
  { zone: "C2", product: "PC침목 11T", totalQty: 23, loadedToday: 0, shippedToday: 0, remaining: 23, status: "idle" },
  { zone: "C3", product: "PC침목 8T", totalQty: 80, loadedToday: 0, shippedToday: 0, remaining: 80, status: "idle" },
  { zone: "C5", product: "PC침목 14T", totalQty: 55, loadedToday: 0, shippedToday: 0, remaining: 55, status: "idle" },
];

const TIMELINE_EVENTS = [
  { time: "10:22", event: "Vehicle VH-004 loaded", detail: "6 EA PC침목 8T from B4", type: "load" as const },
  { time: "10:05", event: "Shipment SHP-0415-004 departed", detail: "VH-003 | 8 EA to 서울지사", type: "ship" as const },
  { time: "09:48", event: "Vehicle VH-003 loaded", detail: "8 EA PC침목 8T from A2", type: "load" as const },
  { time: "09:30", event: "Shipment SHP-0415-003 departed", detail: "VH-002 | 12 EA to 부산현장", type: "ship" as const },
  { time: "09:12", event: "Vehicle VH-002 loaded", detail: "12 EA PC침목 8T from B1", type: "load" as const },
  { time: "08:45", event: "Shipment SHP-0415-002 departed", detail: "VH-001 | 8 EA to 대전현장", type: "ship" as const },
  { time: "08:20", event: "Vehicle VH-002 loaded", detail: "4 EA PC침목 8T from A1", type: "load" as const },
  { time: "07:55", event: "Vehicle VH-001 loaded", detail: "8 EA PC침목 8T from A2", type: "load" as const },
  { time: "07:30", event: "Shipment SHP-0415-001 departed", detail: "VH-001 | 8 EA to 광주현장", type: "ship" as const },
  { time: "07:10", event: "Vehicle VH-001 loaded", detail: "8 EA PC침목 8T from A1", type: "load" as const },
  { time: "06:45", event: "Vehicle VH-001 arrived", detail: "트럭 25t | 기사: 정대호", type: "load" as const },
];

export default function LoadStatusPage() {
  const [selectedDate] = useState("2026-04-15");
  const maxMovement = Math.max(...HOURLY_MOVEMENTS.map((h) => Math.max(h.loaded, h.shipped, 1)));

  return (
    <div>
      <PageHeader
        title="적재/출하"
        accent="현황"
        description="야적장의 일별 적재/출하 현황을 조회합니다. 시간대별 물동량과 구역별 상태를 확인합니다."
        nodeRef="SCR-YRD-006"
        status="LIVE"
      />

      {/* Daily Summary */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-0 mb-8">
        <div className="bg-surface-container-lowest p-6 border-l-4 border-primary-accent">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">적재</span>
          <span className="text-4xl font-black font-headline tabular-nums">{DAILY_SUMMARY.totalLoaded}</span>
          <span className="text-sm font-label text-on-surface-variant ml-1">EA</span>
        </div>
        <div className="bg-surface-container-lowest p-6 border-l-4 border-tertiary">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">출하</span>
          <span className="text-4xl font-black font-headline tabular-nums text-tertiary">{DAILY_SUMMARY.totalShipped}</span>
          <span className="text-sm font-label text-on-surface-variant ml-1">EA</span>
        </div>
        <div className="bg-surface-container-lowest p-6 border-l-4 border-[#f59e0b]">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">대기중</span>
          <span className="text-4xl font-black font-headline tabular-nums text-[#f59e0b]">{DAILY_SUMMARY.pending}</span>
          <span className="text-sm font-label text-on-surface-variant ml-1">EA</span>
        </div>
        <div className="bg-surface-container-lowest p-6 border-l-4 border-primary">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">총 중량</span>
          <span className="text-3xl font-black font-headline tabular-nums">{DAILY_SUMMARY.totalWeight}</span>
          <span className="text-sm font-label text-on-surface-variant ml-1">kg</span>
        </div>
        <div className="bg-surface-container-lowest p-6 border-l-4 border-secondary">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">차량</span>
          <span className="text-4xl font-black font-headline tabular-nums">{DAILY_SUMMARY.vehicles}</span>
        </div>
      </div>

      {/* Hourly Movement Chart */}
      <section className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
            시간별 적재/출하 (EA)
          </span>
          <div className="flex-1 h-px bg-outline-variant/10" />
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary-accent" />
              <span className="font-label text-[11px] uppercase tracking-widest text-on-surface-variant opacity-60">적재</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-tertiary" />
              <span className="font-label text-[11px] uppercase tracking-widest text-on-surface-variant opacity-60">출하</span>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6">
          <div className="flex items-end gap-1 h-40">
            {HOURLY_MOVEMENTS.map((h) => (
              <div key={h.hour} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex items-end gap-0.5" style={{ height: "120px" }}>
                  <div
                    className="flex-1 bg-primary-accent transition-all"
                    style={{ height: h.loaded > 0 ? `${(h.loaded / maxMovement) * 100}%` : "2px" }}
                  />
                  <div
                    className="flex-1 bg-tertiary transition-all"
                    style={{ height: h.shipped > 0 ? `${(h.shipped / maxMovement) * 100}%` : "2px" }}
                  />
                </div>
                <span className="font-label text-[11px] tabular-nums text-on-surface-variant opacity-60">{h.hour}:00</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Timeline */}
        <div className="lg:col-span-1 bg-surface-container-lowest">
          <div className="p-4 bg-surface-container-highest/30 border-l-4 border-primary-accent">
            <h3 className="font-headline font-black text-xs uppercase tracking-widest">활동 타임라인</h3>
          </div>
          <div className="p-4 max-h-[500px] overflow-y-auto">
            {TIMELINE_EVENTS.map((evt, i) => (
              <div key={i} className="flex gap-3 py-3 border-b border-outline-variant/5 last:border-0">
                <div className="flex flex-col items-center">
                  <div className={`w-2 h-2 mt-1 ${evt.type === "ship" ? "bg-tertiary" : "bg-primary-accent"}`} />
                  {i < TIMELINE_EVENTS.length - 1 && <div className="w-px flex-1 bg-outline-variant/10 mt-1" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-label text-xs tabular-nums text-on-surface-variant opacity-60">{evt.time}</span>
                    <StatusBadge type={evt.type === "ship" ? "running" : "warning"} label={evt.type === "ship" ? "출하" : "적재"} />
                  </div>
                  <div className="font-headline text-xs font-bold">{evt.event}</div>
                  <div className="font-label text-[11px] text-on-surface-variant opacity-60 truncate">{evt.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Zone Status Table */}
        <div className="lg:col-span-2">
          <DataTable
            title="구역별 현황"
            columns={[
              { key: "zone", label: "구역" },
              { key: "product", label: "제품" },
              { key: "totalQty", label: "합계" },
              { key: "loadedToday", label: "적재" },
              { key: "shippedToday", label: "출하" },
              { key: "remaining", label: "잔여" },
              { key: "status", label: "상태" },
            ]}
            data={ZONE_STATUS.map((z) => ({
              ...z,
              totalQty: String(z.totalQty),
              loadedToday: String(z.loadedToday),
              shippedToday: String(z.shippedToday),
              remaining: String(z.remaining),
              status: z.status === "active" ? "ACTIVE" : z.status === "complete" ? "DONE" : "IDLE",
            }))}
            bufferCount={ZONE_STATUS.length}
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-6 bg-surface-container p-4 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-tertiary animate-pulse inline-block" />
            <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">실시간 추적</span>
          </div>
          <StatusBadge type="running" label="ACTIVE" />
        </div>
        <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">
          {selectedDate} | Shift B
        </span>
      </footer>
    </div>
  );
}
