"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DataTable } from "@/components/ui/DataTable";

interface MtbfRecord {
  equipment: string;
  equipmentId: string;
  mtbf: number;
  mttr: number;
  availability: number;
  failures: number;
  totalDowntime: number;
  trend: "up" | "down" | "flat";
}

const MOCK_MTBF: MtbfRecord[] = [
  { equipment: "Wire Draw #1", equipmentId: "EQP-WD-01", mtbf: 312.5, mttr: 1.8, availability: 99.4, failures: 2, totalDowntime: 3.6, trend: "up" },
  { equipment: "Wire Draw #2", equipmentId: "EQP-WD-02", mtbf: 287.3, mttr: 2.1, availability: 99.3, failures: 3, totalDowntime: 6.3, trend: "flat" },
  { equipment: "Wire Draw #3", equipmentId: "EQP-WD-03", mtbf: 156.8, mttr: 4.2, availability: 97.4, failures: 5, totalDowntime: 21.0, trend: "down" },
  { equipment: "Furnace HT-01", equipmentId: "EQP-HT-01", mtbf: 480.2, mttr: 3.5, availability: 99.3, failures: 1, totalDowntime: 3.5, trend: "up" },
  { equipment: "Furnace HT-02", equipmentId: "EQP-HT-02", mtbf: 220.1, mttr: 5.8, availability: 97.4, failures: 4, totalDowntime: 23.2, trend: "down" },
  { equipment: "Furnace HT-03", equipmentId: "EQP-HT-03", mtbf: 360.0, mttr: 2.4, availability: 99.3, failures: 2, totalDowntime: 4.8, trend: "flat" },
  { equipment: "Plating Line #1", equipmentId: "EQP-PL-01", mtbf: 420.6, mttr: 1.5, availability: 99.6, failures: 2, totalDowntime: 3.0, trend: "up" },
  { equipment: "Plating Line #2", equipmentId: "EQP-PL-02", mtbf: 390.4, mttr: 2.0, availability: 99.5, failures: 2, totalDowntime: 4.0, trend: "up" },
  { equipment: "Press FRM-01", equipmentId: "EQP-FM-01", mtbf: 510.8, mttr: 1.2, availability: 99.8, failures: 1, totalDowntime: 1.2, trend: "up" },
  { equipment: "Press FRM-02", equipmentId: "EQP-FM-02", mtbf: 178.5, mttr: 3.8, availability: 97.9, failures: 4, totalDowntime: 15.2, trend: "down" },
  { equipment: "Packing #1", equipmentId: "EQP-PKG-01", mtbf: 620.3, mttr: 0.8, availability: 99.9, failures: 1, totalDowntime: 0.8, trend: "up" },
  { equipment: "Packing #2", equipmentId: "EQP-PKG-02", mtbf: 340.2, mttr: 2.5, availability: 99.3, failures: 2, totalDowntime: 5.0, trend: "flat" },
];

const TREND_ICONS: Record<string, { icon: string; color: string }> = {
  up: { icon: "trending_up", color: "text-tertiary" },
  down: { icon: "trending_down", color: "text-error" },
  flat: { icon: "trending_flat", color: "text-[#f59e0b]" },
};

const maxMtbf = Math.max(...MOCK_MTBF.map((r) => r.mtbf));

export default function MtbfReportPage() {
  const [dateFrom, setDateFrom] = useState("2026-03-15");
  const [dateTo, setDateTo] = useState("2026-04-15");
  const [sortBy, setSortBy] = useState<"mtbf" | "availability" | "failures">("mtbf");

  const sorted = [...MOCK_MTBF].sort((a, b) => {
    if (sortBy === "mtbf") return b.mtbf - a.mtbf;
    if (sortBy === "availability") return b.availability - a.availability;
    return b.failures - a.failures;
  });

  const avgMtbf = (MOCK_MTBF.reduce((s, r) => s + r.mtbf, 0) / MOCK_MTBF.length).toFixed(1);
  const avgAvailability = (MOCK_MTBF.reduce((s, r) => s + r.availability, 0) / MOCK_MTBF.length).toFixed(1);
  const totalFailures = MOCK_MTBF.reduce((s, r) => s + r.failures, 0);

  const tableData = sorted.map((r) => ({
    equipment: r.equipment,
    equipmentId: r.equipmentId,
    mtbf: r.mtbf.toFixed(1) + "h",
    mttr: r.mttr.toFixed(1) + "h",
    availability: r.availability.toFixed(1) + "%",
    failures: r.failures,
    downtime: r.totalDowntime.toFixed(1) + "h",
  }));

  return (
    <div className="max-w-6xl">
      <PageHeader
        title="MTBF"
        accent="리포트"
        description="설비별 MTBF(평균고장간격), MTTR(평균수리시간), 가용률을 분석합니다. 기간별 추세를 확인할 수 있습니다."
        nodeRef="SCR-EQP-004"
        status="ONLINE"
      />

      {/* Summary KPIs */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-surface-container-lowest p-4 border-l-4 border-tertiary">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">평균 MTBF</span>
          <span className="font-headline text-2xl font-black tabular-nums text-tertiary">{avgMtbf}<span className="text-sm opacity-60 ml-1">h</span></span>
        </div>
        <div className="bg-surface-container-lowest p-4 border-l-4 border-primary-accent">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">평균 가용률</span>
          <span className="font-headline text-2xl font-black tabular-nums text-primary-accent">{avgAvailability}<span className="text-sm opacity-60 ml-1">%</span></span>
        </div>
        <div className="bg-surface-container-lowest p-4 border-l-4 border-error">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">전체 고장횟수</span>
          <span className="font-headline text-2xl font-black tabular-nums text-error">{String(totalFailures).padStart(2, "0")}</span>
        </div>
      </div>

      {/* Date Range Filter */}
      <section className="bg-surface-container-lowest p-6 mb-6">
        <FieldHeader title="리포트 파라미터" moduleRef="MOD-RPT-PARAM" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">시작일</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full bg-surface-container border border-outline-variant/20 px-4 py-3 text-sm font-headline text-on-surface focus:outline-none focus:border-primary-accent"
            />
          </div>
          <div>
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">종료일</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full bg-surface-container border border-outline-variant/20 px-4 py-3 text-sm font-headline text-on-surface focus:outline-none focus:border-primary-accent"
            />
          </div>
          <div>
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">정렬 기준</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "mtbf" | "availability" | "failures")}
              className="w-full bg-surface-container border border-outline-variant/20 px-4 py-3 text-sm font-headline text-on-surface focus:outline-none focus:border-primary-accent appearance-none cursor-pointer"
            >
              <option value="mtbf">MTBF (시간)</option>
              <option value="availability">가용률 (%)</option>
              <option value="failures">고장횟수</option>
            </select>
          </div>
        </div>
      </section>

      {/* MTBF Bar Chart (div-based) */}
      <section className="bg-surface-container-lowest p-6 mb-6">
        <FieldHeader title="설비별 MTBF" moduleRef="CHART-MTBF" />
        <div className="space-y-3">
          {sorted.map((record) => {
            const barWidth = (record.mtbf / maxMtbf) * 100;
            const trend = TREND_ICONS[record.trend];
            const isLow = record.mtbf < 200;
            return (
              <div key={record.equipmentId} className="flex items-center gap-3">
                {/* Equipment name */}
                <div className="w-32 md:w-40 shrink-0 text-right pr-3">
                  <span className="font-headline text-xs truncate block">{record.equipment}</span>
                </div>

                {/* Bar */}
                <div className="flex-1 h-7 bg-surface-container relative">
                  <div
                    className={`h-full transition-all ${isLow ? "bg-error/60" : "bg-tertiary/60"}`}
                    style={{ width: `${barWidth}%` }}
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 font-headline text-xs font-bold tabular-nums">
                    {record.mtbf.toFixed(1)}h
                  </span>
                </div>

                {/* Trend */}
                <div className="w-8 shrink-0 flex justify-center">
                  <span className={`material-symbols-outlined text-base ${trend.color}`}>{trend.icon}</span>
                </div>

                {/* Availability */}
                <div className="w-16 shrink-0 text-right">
                  <span className={`font-headline text-xs tabular-nums font-bold ${record.availability < 98 ? "text-error" : "text-tertiary"}`}>
                    {record.availability.toFixed(1)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Chart Legend */}
        <div className="mt-4 pt-4 border-t border-outline-variant/10 flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-3 bg-tertiary/60" />
            <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">보통 MTBF</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-3 bg-error/60" />
            <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">낮은 MTBF (&lt;200h)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm text-tertiary">trending_up</span>
            <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">개선</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm text-error">trending_down</span>
            <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">악화</span>
          </div>
        </div>
      </section>

      {/* MTBF Data Table */}
      <DataTable
        title="MTBF 상세 테이블"
        columns={[
          { key: "equipment", label: "설비" },
          { key: "equipmentId", label: "ID" },
          { key: "mtbf", label: "MTBF" },
          { key: "mttr", label: "MTTR" },
          { key: "availability", label: "가용률 %" },
          { key: "failures", label: "고장횟수" },
          { key: "downtime", label: "정지시간" },
        ]}
        data={tableData}
        bufferCount={tableData.length}
      />

      {/* Footer */}
      <footer className="mt-6 bg-surface-container p-4 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-tertiary inline-block" />
            <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">리포트 엔진 온라인</span>
          </div>
          <StatusBadge type="running" label="활성" />
        </div>
        <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">
          기간: {dateFrom} ~ {dateTo}
        </span>
      </footer>
    </div>
  );
}
