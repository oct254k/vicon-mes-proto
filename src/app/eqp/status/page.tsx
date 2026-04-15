"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

type EqpStatus = "running" | "stopped" | "warning";

interface Equipment {
  id: string;
  name: string;
  process: string;
  status: EqpStatus;
  uptime: string;
  todayRunning: string;
  currentProduct: string;
  speed: string;
  operator: string;
}

const MOCK_EQUIPMENT: Equipment[] = [
  { id: "EQP-WD-01", name: "Wire Draw #1", process: "Wire Drawing", status: "running", uptime: "127:42:15", todayRunning: "14:22:08", currentProduct: "SWRH 62B", speed: "450 m/min", operator: "OP-KIM-J" },
  { id: "EQP-WD-02", name: "Wire Draw #2", process: "Wire Drawing", status: "running", uptime: "89:15:33", todayRunning: "12:45:22", currentProduct: "SWRH 72A", speed: "420 m/min", operator: "OP-PARK-S" },
  { id: "EQP-WD-03", name: "Wire Draw #3", process: "Wire Drawing", status: "stopped", uptime: "0:00:00", todayRunning: "06:12:44", currentProduct: "-", speed: "-", operator: "-" },
  { id: "EQP-HT-01", name: "Furnace HT-01", process: "Heat Treatment", status: "running", uptime: "48:30:12", todayRunning: "16:30:12", currentProduct: "P1-LOT-007", speed: "720C", operator: "OP-CHOI-H" },
  { id: "EQP-HT-02", name: "Furnace HT-02", process: "Heat Treatment", status: "warning", uptime: "12:05:44", todayRunning: "12:05:44", currentProduct: "P1-LOT-009", speed: "718C", operator: "OP-CHOI-H" },
  { id: "EQP-HT-03", name: "Furnace HT-03", process: "Heat Treatment", status: "stopped", uptime: "0:00:00", todayRunning: "0:00:00", currentProduct: "-", speed: "-", operator: "-" },
  { id: "EQP-PL-01", name: "Plating Line #1", process: "Plating", status: "running", uptime: "72:18:55", todayRunning: "15:18:55", currentProduct: "P2-LOT-003", speed: "12 m/min", operator: "OP-LEE-W" },
  { id: "EQP-PL-02", name: "Plating Line #2", process: "Plating", status: "running", uptime: "66:42:10", todayRunning: "14:42:10", currentProduct: "P2-LOT-005", speed: "11 m/min", operator: "OP-SEO-Y" },
  { id: "EQP-FM-01", name: "Press FRM-01", process: "Forming", status: "running", uptime: "156:08:22", todayRunning: "16:08:22", currentProduct: "P3-LOT-001", speed: "2.1s/cycle", operator: "OP-JUNG-W" },
  { id: "EQP-FM-02", name: "Press FRM-02", process: "Forming", status: "warning", uptime: "8:22:11", todayRunning: "8:22:11", currentProduct: "P3-LOT-002", speed: "2.4s/cycle", operator: "OP-JUNG-W" },
  { id: "EQP-PKG-01", name: "Packing #1", process: "Packing", status: "running", uptime: "42:11:05", todayRunning: "10:11:05", currentProduct: "FIN-LOT-001", speed: "8 pcs/min", operator: "OP-HAN-B" },
  { id: "EQP-PKG-02", name: "Packing #2", process: "Packing", status: "stopped", uptime: "0:00:00", todayRunning: "4:30:00", currentProduct: "-", speed: "-", operator: "-" },
];

const STATUS_MAP: Record<EqpStatus, { type: "running" | "stopped" | "warning"; label: string; dot: string }> = {
  running: { type: "running", label: "가동중", dot: "bg-tertiary" },
  stopped: { type: "stopped", label: "정지", dot: "bg-error" },
  warning: { type: "warning", label: "정비중", dot: "bg-[#f59e0b]" },
};

const PROCESSES = ["전체", "Wire Drawing", "Heat Treatment", "Plating", "Forming", "Packing"];
const STATUS_FILTERS = ["전체", "running", "stopped", "warning"];

export default function EquipmentStatusPage() {
  const [processFilter, setProcessFilter] = useState("전체");
  const [statusFilter, setStatusFilter] = useState("전체");

  const filtered = MOCK_EQUIPMENT.filter((eq) => {
    if (processFilter !== "전체" && eq.process !== processFilter) return false;
    if (statusFilter !== "전체" && eq.status !== statusFilter) return false;
    return true;
  });

  const counts = {
    running: MOCK_EQUIPMENT.filter((e) => e.status === "running").length,
    stopped: MOCK_EQUIPMENT.filter((e) => e.status === "stopped").length,
    warning: MOCK_EQUIPMENT.filter((e) => e.status === "warning").length,
  };

  return (
    <div className="max-w-6xl">
      <PageHeader
        title="설비"
        accent="현황"
        description="전체 설비의 가동 현황을 조회합니다. 설비별 상태, 가동시간, 현재 생산 제품을 확인할 수 있습니다."
        nodeRef="SCR-EQP-001"
        status="ONLINE"
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-surface-container-lowest p-4 border-l-4 border-tertiary">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">가동중</span>
          <span className="font-headline text-3xl font-black tabular-nums text-tertiary">{String(counts.running).padStart(2, "0")}</span>
        </div>
        <div className="bg-surface-container-lowest p-4 border-l-4 border-error">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">정지</span>
          <span className="font-headline text-3xl font-black tabular-nums text-error">{String(counts.stopped).padStart(2, "0")}</span>
        </div>
        <div className="bg-surface-container-lowest p-4 border-l-4 border-[#f59e0b]">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">정비중</span>
          <span className="font-headline text-3xl font-black tabular-nums text-[#f59e0b]">{String(counts.warning).padStart(2, "0")}</span>
        </div>
      </div>

      {/* Filters */}
      <section className="bg-surface-container-lowest p-6 mb-6">
        <FieldHeader title="필터" moduleRef="MOD-FILTER" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">공정</label>
            <select
              value={processFilter}
              onChange={(e) => setProcessFilter(e.target.value)}
              className="w-full bg-surface-container border border-outline-variant/20 px-4 py-3 text-sm font-headline text-on-surface focus:outline-none focus:border-primary-accent appearance-none cursor-pointer"
            >
              {PROCESSES.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">상태</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-surface-container border border-outline-variant/20 px-4 py-3 text-sm font-headline text-on-surface focus:outline-none focus:border-primary-accent appearance-none cursor-pointer"
            >
              {STATUS_FILTERS.map((s) => (
                <option key={s} value={s}>{s === "전체" ? "전체" : STATUS_MAP[s as EqpStatus].label}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Equipment Cards */}
      <section className="mb-6">
        <FieldHeader title="설비 목록" moduleRef="EQP-CARDS" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((eq) => {
            const st = STATUS_MAP[eq.status];
            return (
              <div key={eq.id} className={`bg-surface-container-lowest border-l-4 ${eq.status === "running" ? "border-tertiary" : eq.status === "stopped" ? "border-error" : "border-[#f59e0b]"} p-4`}>
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-headline text-sm font-bold">{eq.name}</h4>
                    <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">{eq.id}</span>
                  </div>
                  <StatusBadge type={st.type} label={st.label} />
                </div>

                {/* Status dot + process */}
                <div className="flex items-center gap-2 mb-4">
                  <span className={`w-2 h-2 ${st.dot} inline-block ${eq.status === "running" ? "animate-pulse" : ""}`} />
                  <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">{eq.process}</span>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block">가동시간</span>
                    <span className="font-headline text-xs font-bold tabular-nums">{eq.uptime}</span>
                  </div>
                  <div>
                    <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block">금일</span>
                    <span className="font-headline text-xs tabular-nums">{eq.todayRunning}</span>
                  </div>
                  <div>
                    <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block">제품</span>
                    <span className="font-headline text-xs tabular-nums">{eq.currentProduct}</span>
                  </div>
                  <div>
                    <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block">속도</span>
                    <span className="font-headline text-xs tabular-nums">{eq.speed}</span>
                  </div>
                </div>

                {/* Operator */}
                <div className="mt-3 pt-3 border-t border-outline-variant/10 flex items-center gap-2">
                  <span className="material-symbols-outlined text-xs opacity-60">person</span>
                  <span className="font-headline text-xs opacity-60">{eq.operator}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-6 bg-surface-container p-4 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-tertiary inline-block" />
            <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">모니터링 온라인</span>
          </div>
          <StatusBadge type="running" label="LIVE" />
        </div>
        <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">
          전체 설비: <span className="text-on-surface tabular-nums font-bold">{String(MOCK_EQUIPMENT.length).padStart(2, "0")}</span>
        </span>
      </footer>
    </div>
  );
}
