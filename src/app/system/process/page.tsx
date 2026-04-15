"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";

interface ProcessStep {
  id: string;
  name: string;
  count: number;
  total: number;
  status: "completed" | "running" | "pending" | "idle";
}

type WorkOrder = Record<string, string | number>;

const PROCESS_STEPS: ProcessStep[] = [
  { id: "RM", name: "Raw Material", count: 342, total: 350, status: "completed" },
  { id: "P1", name: "Drawing", count: 318, total: 350, status: "running" },
  { id: "P2", name: "TG", count: 280, total: 350, status: "running" },
  { id: "P3", name: "Forming", count: 245, total: 350, status: "running" },
  { id: "P4", name: "Assembly", count: 198, total: 350, status: "running" },
  { id: "FIN", name: "Finishing", count: 165, total: 350, status: "running" },
  { id: "YRD", name: "Yard", count: 120, total: 350, status: "pending" },
  { id: "SHP", name: "Shipping", count: 85, total: 350, status: "pending" },
];

const STATUS_COLORS: Record<string, string> = {
  completed: "bg-tertiary",
  running: "bg-primary-accent",
  pending: "bg-surface-container-highest",
  idle: "bg-surface-container",
};

const ORDER_COLUMNS = [
  { key: "order", label: "작업지시" },
  { key: "product", label: "제품" },
  { key: "customer", label: "고객사" },
  { key: "qty", label: "수량" },
  { key: "rm", label: "RM" },
  { key: "p1", label: "P1" },
  { key: "p2", label: "P2" },
  { key: "p3", label: "P3" },
  { key: "p4", label: "P4" },
  { key: "fin", label: "FIN" },
  { key: "yrd", label: "YRD" },
  { key: "shp", label: "SHP" },
  { key: "overall", label: "전체" },
];

const ORDER_DATA: WorkOrder[] = [
  { order: "WO-260415-012", product: "RSM-A-5540", customer: "Hyundai E&C", qty: "2,400", rm: "100%", p1: "100%", p2: "92%", p3: "78%", p4: "56%", fin: "42%", yrd: "30%", shp: "18%", overall: "64.5%" },
  { order: "WO-260415-013", product: "SMP-B-8020", customer: "Samsung C&T", qty: "1,800", rm: "100%", p1: "95%", p2: "88%", p3: "65%", p4: "40%", fin: "25%", yrd: "10%", shp: "0%", overall: "52.9%" },
  { order: "WO-260415-014", product: "CRB-C-1000", customer: "GS E&C", qty: "500", rm: "100%", p1: "100%", p2: "100%", p3: "100%", p4: "90%", fin: "85%", yrd: "70%", shp: "50%", overall: "86.9%" },
  { order: "WO-260415-015", product: "RSM-A-5540", customer: "Daewoo E&C", qty: "3,000", rm: "80%", p1: "60%", p2: "45%", p3: "20%", p4: "0%", fin: "0%", yrd: "0%", shp: "0%", overall: "25.6%" },
  { order: "WO-260415-016", product: "SMP-B-8020", customer: "Lotte E&C", qty: "900", rm: "100%", p1: "100%", p2: "100%", p3: "100%", p4: "100%", fin: "100%", yrd: "100%", shp: "100%", overall: "100.0%" },
];

export default function ProcessProgressPage() {
  const [dateFilter, setDateFilter] = useState("2026-04-15");
  const [orderFilter, setOrderFilter] = useState("");

  return (
    <div>
      <PageHeader
        title="공정"
        accent="진행현황"
        description="전체 공정의 진행 현황을 조회합니다. 원자재부터 출하까지 각 단계별 완료율과 작업지시 진행률을 확인합니다."
        nodeRef="SCR-COM-003"
        status="LIVE"
      />

      {/* Filters */}
      <div className="flex items-center gap-4 mb-8 flex-wrap">
        <div>
          <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
            날짜
          </label>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="bg-surface-container p-3 text-on-surface font-headline text-sm border border-outline-variant/20 focus:border-primary-accent focus:outline-none"
          />
        </div>
        <div>
          <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
            작업지시
          </label>
          <input
            type="text"
            value={orderFilter}
            onChange={(e) => setOrderFilter(e.target.value)}
            placeholder="WO-XXXXXX-XXX"
            className="bg-surface-container p-3 text-on-surface font-headline text-sm border border-outline-variant/20 focus:border-primary-accent focus:outline-none tabular-nums"
          />
        </div>
        <div className="ml-auto self-end">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 tabular-nums">
            최종 업데이트: 2026-04-15 10:02:44
          </span>
        </div>
      </div>

      {/* Process Flow Visualization */}
      <section className="mb-8">
        <FieldHeader title="공정 흐름" moduleRef="MOD-COM-FLOW" />
        <div className="bg-surface-container-lowest p-6">
          <div className="flex items-stretch gap-0 overflow-x-auto">
            {PROCESS_STEPS.map((step, idx) => {
              const pct = Math.round((step.count / step.total) * 100);
              return (
                <div key={step.id} className="flex items-center">
                  {/* Step Card */}
                  <div className="min-w-[120px] flex flex-col items-center">
                    {/* Completion Ring Visual */}
                    <div className="relative w-16 h-16 mb-3">
                      <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                        <circle
                          cx="32" cy="32" r="28"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          className="text-surface-container"
                        />
                        <circle
                          cx="32" cy="32" r="28"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeDasharray={`${pct * 1.76} 176`}
                          className={
                            step.status === "completed"
                              ? "text-tertiary"
                              : step.status === "running"
                              ? "text-primary-accent"
                              : "text-surface-container-highest"
                          }
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-headline text-sm font-black tabular-nums">{pct}%</span>
                      </div>
                    </div>

                    {/* Step Label */}
                    <span className="font-headline text-sm font-black mb-1">{step.id}</span>
                    <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2">
                      {step.name}
                    </span>

                    {/* Count */}
                    <div className="bg-surface-container px-3 py-1">
                      <span className="font-headline text-xs tabular-nums font-bold">
                        {step.count}
                      </span>
                      <span className="font-label text-xs text-on-surface-variant">
                        /{step.total}
                      </span>
                    </div>

                    {/* Status */}
                    <div className="mt-2">
                      <StatusBadge
                        type={
                          step.status === "completed"
                            ? "running"
                            : step.status === "running"
                            ? "warning"
                            : "idle"
                        }
                        label={step.status.toUpperCase()}
                      />
                    </div>
                  </div>

                  {/* Connector Arrow */}
                  {idx < PROCESS_STEPS.length - 1 && (
                    <div className="flex items-center px-2">
                      <div className={`w-8 h-0.5 ${STATUS_COLORS[step.status]}`} />
                      <div
                        className={`w-0 h-0 border-y-4 border-y-transparent border-l-4 ${
                          step.status === "completed"
                            ? "border-l-tertiary"
                            : step.status === "running"
                            ? "border-l-primary-accent"
                            : "border-l-surface-container-highest"
                        }`}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Work Order Progress Table */}
      <DataTable
        title="작업지시 진행률"
        columns={ORDER_COLUMNS}
        data={ORDER_DATA}
        bufferCount={ORDER_DATA.length}
      />
    </div>
  );
}
