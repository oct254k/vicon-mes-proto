"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { DataTable } from "@/components/ui/DataTable";

const PROCESS_OPTIONS = ["전체", "P1 Drawing", "P2 TG", "P3 Forming", "P4 Assembly"];

const SUMMARY_COLUMNS = [
  { key: "date", label: "일자" },
  { key: "process", label: "공정" },
  { key: "target", label: "목표 (kg)" },
  { key: "actual", label: "실적 (kg)" },
  { key: "achievement", label: "달성률 %" },
  { key: "defectRate", label: "불량률 %" },
  { key: "lots", label: "LOT 건수" },
];

const SUMMARY_DATA = [
  { date: "2026-04-15", process: "P1 Drawing", target: "12,500", actual: "10,250", achievement: "82.0%", defectRate: "0.12%", lots: 14 },
  { date: "2026-04-15", process: "P2 TG", target: "12,500", actual: "11,375", achievement: "91.0%", defectRate: "0.08%", lots: 16 },
  { date: "2026-04-15", process: "P3 Forming", target: "12,500", actual: "9,125", achievement: "73.0%", defectRate: "0.21%", lots: 11 },
  { date: "2026-04-15", process: "P4 Assembly", target: "12,500", actual: "11,875", achievement: "95.0%", defectRate: "0.05%", lots: 18 },
  { date: "2026-04-14", process: "P1 Drawing", target: "12,500", actual: "11,000", achievement: "88.0%", defectRate: "0.10%", lots: 15 },
  { date: "2026-04-14", process: "P2 TG", target: "12,500", actual: "12,125", achievement: "97.0%", defectRate: "0.06%", lots: 17 },
  { date: "2026-04-14", process: "P3 Forming", target: "12,500", actual: "10,500", achievement: "84.0%", defectRate: "0.18%", lots: 13 },
  { date: "2026-04-14", process: "P4 Assembly", target: "12,500", actual: "12,250", achievement: "98.0%", defectRate: "0.04%", lots: 19 },
];

const DAILY_CHART_DATA = [
  { day: "04-09", value: 42500 },
  { day: "04-10", value: 45200 },
  { day: "04-11", value: 43800 },
  { day: "04-12", value: 46100 },
  { day: "04-13", value: 44700 },
  { day: "04-14", value: 45875 },
  { day: "04-15", value: 38750 },
];

export default function DashboardReportPage() {
  const [dateFrom, setDateFrom] = useState("2026-04-09");
  const [dateTo, setDateTo] = useState("2026-04-15");
  const [selectedProcess, setSelectedProcess] = useState("전체");

  const maxChart = Math.max(...DAILY_CHART_DATA.map((d) => d.value));

  const filteredData =
    selectedProcess === "전체"
      ? SUMMARY_DATA
      : SUMMARY_DATA.filter((d) => d.process === selectedProcess);

  return (
    <div>
      <PageHeader
        title="대시보드"
        accent="리포트"
        nodeRef="SCR-DSH-002"
        status="CALIBRATED"
      />

      {/* Filters */}
      <section className="bg-surface-container-lowest p-6 mb-8">
        <FieldHeader title="리포트 조건" moduleRef="MOD-RPT-FILTER" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
              시작일
            </label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full bg-surface-container p-3 text-on-surface font-headline text-sm border border-outline-variant/20 focus:border-primary-accent focus:outline-none"
            />
          </div>
          <div>
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
              종료일
            </label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full bg-surface-container p-3 text-on-surface font-headline text-sm border border-outline-variant/20 focus:border-primary-accent focus:outline-none"
            />
          </div>
          <div>
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
              공정
            </label>
            <select
              value={selectedProcess}
              onChange={(e) => setSelectedProcess(e.target.value)}
              className="w-full bg-surface-container p-3 text-on-surface font-headline text-sm border border-outline-variant/20 focus:border-primary-accent focus:outline-none"
            >
              {PROCESS_OPTIONS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full bg-primary-accent text-on-primary px-6 py-3 font-label text-xs uppercase tracking-widest font-bold hover:bg-primary-container transition-colors">
              리포트 생성
            </button>
          </div>
        </div>
      </section>

      {/* Daily Production Chart */}
      <section className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
            일별 생산 추이 (kg)
          </span>
          <div className="flex-1 h-px bg-outline-variant/10" />
        </div>
        <div className="bg-surface-container-lowest p-6">
          <div className="flex items-end gap-3 h-48">
            {DAILY_CHART_DATA.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                <span className="font-label text-[11px] tabular-nums text-on-surface-variant">
                  {(d.value / 1000).toFixed(1)}k
                </span>
                <div className="w-full flex items-end" style={{ height: "140px" }}>
                  <div
                    className="w-full bg-primary-accent hover:bg-primary transition-colors"
                    style={{ height: `${(d.value / maxChart) * 100}%` }}
                  />
                </div>
                <span className="font-label text-[11px] tabular-nums text-on-surface-variant opacity-60">
                  {d.day}
                </span>
              </div>
            ))}
          </div>
          {/* Target line label */}
          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-outline-variant/10">
            <div className="w-8 h-px bg-[#f59e0b]" />
            <span className="font-label text-[11px] text-[#f59e0b] uppercase tracking-widest">
              금일 목표: 50,000 kg
            </span>
          </div>
        </div>
      </section>

      {/* Achievement by Process Chart */}
      <section className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
            공정별 달성률 (금일)
          </span>
          <div className="flex-1 h-px bg-outline-variant/10" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { name: "P1 Drawing", value: 82 },
            { name: "P2 TG", value: 91 },
            { name: "P3 Forming", value: 73 },
            { name: "P4 Assembly", value: 95 },
          ].map((p) => (
            <div key={p.name} className="bg-surface-container-lowest p-5">
              <div className="flex justify-between items-center mb-3">
                <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
                  {p.name}
                </span>
                <span className="text-xl font-black font-headline tabular-nums">
                  {p.value}%
                </span>
              </div>
              <div className="w-full h-6 bg-surface-container relative">
                <div
                  className={`h-full ${
                    p.value >= 90 ? "bg-tertiary" : p.value >= 80 ? "bg-primary-accent" : "bg-[#f59e0b]"
                  }`}
                  style={{ width: `${p.value}%` }}
                />
                {/* Target marker at 100% */}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Production Summary Table */}
      <DataTable
        title="생산 요약"
        columns={SUMMARY_COLUMNS}
        data={filteredData}
        bufferCount={filteredData.length}
      />
    </div>
  );
}
