"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";

const HOURLY_DATA = [
  { hour: "06", value: 2100 },
  { hour: "07", value: 3400 },
  { hour: "08", value: 4200 },
  { hour: "09", value: 4800 },
  { hour: "10", value: 4600 },
  { hour: "11", value: 3900 },
  { hour: "12", value: 2200 },
  { hour: "13", value: 4100 },
  { hour: "14", value: 4500 },
  { hour: "15", value: 3800 },
  { hour: "16", value: 1150 },
  { hour: "17", value: 0 },
];

const PROCESS_UTIL = [
  { id: "P1", name: "Drawing", value: 82 },
  { id: "P2", name: "TG", value: 91 },
  { id: "P3", name: "Forming", value: 73 },
  { id: "P4", name: "Assembly", value: 95 },
];

const EQUIPMENT_COLUMNS = [
  { key: "id", label: "설비 ID" },
  { key: "name", label: "설비명" },
  { key: "process", label: "공정" },
  { key: "status", label: "상태" },
  { key: "uptime", label: "가동시간 %" },
  { key: "mtbf", label: "MTBF (hrs)" },
];

const EQUIPMENT_DATA = [
  { id: "EQ-DRW-001", name: "Wire Drawing M1", process: "P1 Drawing", status: "RUNNING", uptime: "98.2%", mtbf: "1,420" },
  { id: "EQ-TG-001", name: "TG Unit A", process: "P2 TG", status: "RUNNING", uptime: "96.7%", mtbf: "890" },
  { id: "EQ-FRM-001", name: "Forming Press #1", process: "P3 Forming", status: "WARNING", uptime: "87.1%", mtbf: "620" },
  { id: "EQ-FRM-002", name: "Forming Press #2", process: "P3 Forming", status: "STOPPED", uptime: "0.0%", mtbf: "340" },
  { id: "EQ-ASM-001", name: "Assembly Line A", process: "P4 Assembly", status: "RUNNING", uptime: "99.1%", mtbf: "2,100" },
];

const ALARM_SUMMARY = [
  { type: "부적합", count: 1, severity: "warning" as const },
  { type: "설비", count: 0, severity: "idle" as const },
  { type: "자재", count: 0, severity: "idle" as const },
];

export default function DashboardPage() {
  const [refreshCountdown, setRefreshCountdown] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setRefreshCountdown((prev) => (prev <= 1 ? 30 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const maxHourly = Math.max(...HOURLY_DATA.map((d) => d.value));
  const dailyTarget = 50000;
  const dailyActual = 38750;
  const achievement = ((dailyActual / dailyTarget) * 100).toFixed(1);

  return (
    <div>
      <PageHeader
        title="생산"
        accent="대시보드"
        nodeRef="SCR-DSH-001"
        status="LIVE"
        description="공장 전체의 실시간 생산 현황을 한눈에 확인할 수 있습니다. 금일 목표 대비 실적, 공정별 가동률, 설비 상태 및 알람을 모니터링합니다."
      />

      {/* Auto-refresh indicator */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-2 h-2 bg-tertiary animate-pulse" />
        <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
          자동갱신 <span className="tabular-nums text-tertiary">{String(refreshCountdown).padStart(2, "0")}s</span>
        </span>
        <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 ml-auto">
          2026-04-15 | 교대 B
        </span>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mb-8">
        <div className="bg-surface-container-lowest p-8 border-l-4 border-primary-accent">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
            금일 목표
          </span>
          <span className="text-5xl lg:text-6xl font-black font-headline tabular-nums text-on-surface">
            50,000
          </span>
          <span className="text-lg font-label text-on-surface-variant ml-2">kg</span>
        </div>
        <div className="bg-surface-container-lowest p-8 border-l-4 border-tertiary">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
            실적
          </span>
          <span className="text-5xl lg:text-6xl font-black font-headline tabular-nums text-tertiary">
            38,750
          </span>
          <span className="text-lg font-label text-on-surface-variant ml-2">kg</span>
        </div>
        <div className="bg-surface-container-lowest p-8 border-l-4 border-[#f59e0b]">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
            달성률
          </span>
          <span className="text-5xl lg:text-6xl font-black font-headline tabular-nums text-[#f59e0b]">
            {achievement}
          </span>
          <span className="text-lg font-label text-on-surface-variant ml-2">%</span>
        </div>
      </div>

      {/* Process Utilization */}
      <section className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
            공정 가동률
          </span>
          <div className="flex-1 h-px bg-outline-variant/10" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {PROCESS_UTIL.map((p) => (
            <div key={p.id} className="bg-surface-container-lowest p-5">
              <div className="flex justify-between items-center mb-3">
                <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
                  {p.id} {p.name}
                </span>
                <span className="text-2xl font-black font-headline tabular-nums">
                  {p.value}<span className="text-sm text-on-surface-variant">%</span>
                </span>
              </div>
              <div className="w-full h-3 bg-surface-container">
                <div
                  className={`h-full transition-all ${
                    p.value >= 90
                      ? "bg-tertiary"
                      : p.value >= 80
                      ? "bg-primary-accent"
                      : "bg-[#f59e0b]"
                  }`}
                  style={{ width: `${p.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hourly Production Chart */}
      <section className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
            시간대별 생산량 (kg)
          </span>
          <div className="flex-1 h-px bg-outline-variant/10" />
        </div>
        <div className="bg-surface-container-lowest p-6">
          <div className="flex items-end gap-2 h-48">
            {HOURLY_DATA.map((d) => (
              <div key={d.hour} className="flex-1 flex flex-col items-center gap-1">
                <span className="font-label text-[11px] tabular-nums text-on-surface-variant">
                  {d.value > 0 ? (d.value / 1000).toFixed(1) + "k" : ""}
                </span>
                <div className="w-full flex items-end" style={{ height: "140px" }}>
                  <div
                    className={`w-full transition-all ${
                      d.value === 0
                        ? "bg-surface-container"
                        : "bg-primary-accent hover:bg-primary"
                    }`}
                    style={{
                      height: d.value > 0 ? `${(d.value / maxHourly) * 100}%` : "4px",
                    }}
                  />
                </div>
                <span className="font-label text-[11px] tabular-nums text-on-surface-variant opacity-60">
                  {d.hour}:00
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Equipment Status Table */}
        <div className="lg:col-span-2">
          <DataTable
            title="설비 현황"
            columns={EQUIPMENT_COLUMNS}
            data={EQUIPMENT_DATA}
            bufferCount={5}
          />
        </div>

        {/* Alarm Summary */}
        <div className="bg-surface-container-lowest">
          <div className="p-4 bg-surface-container-highest/30 border-l-4 border-error">
            <h3 className="font-headline font-black text-xs uppercase tracking-widest">
              알람 요약
            </h3>
          </div>
          <div className="p-6 space-y-4">
            {ALARM_SUMMARY.map((a) => (
              <div
                key={a.type}
                className="flex items-center justify-between py-3 border-b border-outline-variant/5 last:border-0"
              >
                <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
                  {a.type}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-black font-headline tabular-nums">
                    {a.count}
                  </span>
                  <StatusBadge
                    type={a.count > 0 ? "warning" : "idle"}
                    label={a.count > 0 ? "활성" : "정상"}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
