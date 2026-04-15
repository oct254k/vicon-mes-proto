"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

type MachineStatus = "running" | "stopped" | "planned_stop" | "comm_error";

interface Machine {
  id: string;
  name: string;
  status: MachineStatus;
  productionM2: number;
  utilization: number;
  currentProduct: string;
  speed: number;
}

const MACHINES: Machine[] = [
  { id: "TG-01", name: "TG Unit 01", status: "running", productionM2: 1247.5, utilization: 94.2, currentProduct: "WM-304-2.0", speed: 12.4 },
  { id: "TG-02", name: "TG Unit 02", status: "running", productionM2: 1102.3, utilization: 88.6, currentProduct: "WM-316-1.5", speed: 11.8 },
  { id: "TG-03", name: "TG Unit 03", status: "stopped", productionM2: 342.1, utilization: 27.4, currentProduct: "WM-304-2.5", speed: 0 },
  { id: "TG-04", name: "TG Unit 04", status: "running", productionM2: 1089.7, utilization: 91.3, currentProduct: "WM-201-1.0", speed: 13.1 },
  { id: "TG-05", name: "TG Unit 05", status: "planned_stop", productionM2: 876.4, utilization: 70.1, currentProduct: "WM-316-2.0", speed: 0 },
  { id: "TG-06", name: "TG Unit 06", status: "running", productionM2: 1321.8, utilization: 96.8, currentProduct: "WM-304-1.5", speed: 14.2 },
  { id: "TG-07", name: "TG Unit 07", status: "comm_error", productionM2: 0, utilization: 0, currentProduct: "---", speed: 0 },
];

const HOURLY_DATA = [
  { hour: "06", value: 320 },
  { hour: "07", value: 580 },
  { hour: "08", value: 740 },
  { hour: "09", value: 810 },
  { hour: "10", value: 790 },
  { hour: "11", value: 660 },
  { hour: "12", value: 310 },
  { hour: "13", value: 720 },
  { hour: "14", value: 780 },
  { hour: "15", value: 710 },
  { hour: "16", value: 490 },
  { hour: "17", value: 0 },
];

const statusConfig: Record<MachineStatus, { color: string; borderColor: string; badgeType: "running" | "stopped" | "warning" | "idle"; label: string }> = {
  running: { color: "bg-tertiary/10", borderColor: "border-tertiary", badgeType: "running", label: "가동중" },
  stopped: { color: "bg-error/10", borderColor: "border-error", badgeType: "stopped", label: "비계획정지" },
  planned_stop: { color: "bg-[#f59e0b]/10", borderColor: "border-[#f59e0b]", badgeType: "warning", label: "계획정지" },
  comm_error: { color: "bg-surface-container-highest/30", borderColor: "border-surface-container-highest", badgeType: "idle", label: "통신이상" },
};

export default function P2MonitorPage() {
  const [refreshCountdown, setRefreshCountdown] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setRefreshCountdown((prev) => (prev <= 1 ? 30 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const runningCount = MACHINES.filter((m) => m.status === "running").length;
  const stoppedCount = MACHINES.filter((m) => m.status !== "running").length;
  const dailyTotal = MACHINES.reduce((sum, m) => sum + m.productionM2, 0);
  const avgUtilization = MACHINES.filter((m) => m.status === "running").reduce((sum, m) => sum + m.utilization, 0) / (runningCount || 1);
  const maxHourly = Math.max(...HOURLY_DATA.map((d) => d.value));

  return (
    <div>
      <PageHeader
        title="2공정 TG"
        accent="가동 모니터링"
        nodeRef="SCR-P2-001"
        status="LIVE"
        description="TG기 7대의 실시간 가동 상태를 모니터링합니다. 설비별 생산량, 가동률, 정지 상태를 확인할 수 있습니다."
      />

      {/* Auto-refresh indicator */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-2 h-2 bg-tertiary animate-pulse" />
        <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
          자동갱신{" "}
          <span className="tabular-nums text-tertiary">
            {String(refreshCountdown).padStart(2, "0")}s
          </span>
        </span>
        <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 ml-auto">
          2026-04-15 | Shift B
        </span>
      </div>

      {/* Summary Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0 mb-8">
        <div className="bg-surface-container-lowest p-6 border-l-4 border-tertiary">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
            가동중
          </span>
          <span className="text-4xl font-black font-headline tabular-nums text-tertiary">
            {runningCount}
          </span>
          <span className="text-sm font-label text-on-surface-variant ml-1">/ 7</span>
        </div>
        <div className="bg-surface-container-lowest p-6 border-l-4 border-error">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
            정지
          </span>
          <span className="text-4xl font-black font-headline tabular-nums text-error">
            {stoppedCount}
          </span>
        </div>
        <div className="bg-surface-container-lowest p-6 border-l-4 border-primary-accent">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
            금일 합계
          </span>
          <span className="text-4xl font-black font-headline tabular-nums text-on-surface">
            {dailyTotal.toLocaleString("ko-KR", { maximumFractionDigits: 1 })}
          </span>
          <span className="text-sm font-label text-on-surface-variant ml-1">m&sup2;</span>
        </div>
        <div className="bg-surface-container-lowest p-6 border-l-4 border-[#f59e0b]">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
            평균 가동률
          </span>
          <span className="text-4xl font-black font-headline tabular-nums text-[#f59e0b]">
            {avgUtilization.toFixed(1)}
          </span>
          <span className="text-sm font-label text-on-surface-variant ml-1">%</span>
        </div>
      </div>

      {/* Machine Status Cards */}
      <section className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
            설비 상태
          </span>
          <div className="flex-1 h-px bg-outline-variant/10" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {MACHINES.map((m) => {
            const cfg = statusConfig[m.status];
            return (
              <div
                key={m.id}
                className={`${cfg.color} border-l-4 ${cfg.borderColor} p-5`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-headline font-black text-lg">{m.id}</h3>
                    <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">
                      {m.name}
                    </p>
                  </div>
                  <StatusBadge type={cfg.badgeType} label={cfg.label} />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
                      생산량
                    </span>
                    <span className="font-headline font-bold text-lg tabular-nums">
                      {m.productionM2.toLocaleString("ko-KR", { maximumFractionDigits: 1 })}
                      <span className="text-xs text-on-surface-variant ml-1">m&sup2;</span>
                    </span>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
                        가동률
                      </span>
                      <span className="font-headline font-bold tabular-nums text-sm">
                        {m.utilization}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-surface-container">
                      <div
                        className={`h-full transition-all ${
                          m.utilization >= 90
                            ? "bg-tertiary"
                            : m.utilization >= 70
                            ? "bg-primary-accent"
                            : m.utilization > 0
                            ? "bg-[#f59e0b]"
                            : "bg-surface-container-highest"
                        }`}
                        style={{ width: `${m.utilization}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-outline-variant/10">
                    <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">
                      제품
                    </span>
                    <span className="font-headline text-xs tabular-nums">{m.currentProduct}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">
                      속도
                    </span>
                    <span className="font-headline text-xs tabular-nums">
                      {m.speed > 0 ? `${m.speed} m/min` : "---"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Hourly Production Bar Chart */}
      <section className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
            시간대별 생산량 (m&sup2;)
          </span>
          <div className="flex-1 h-px bg-outline-variant/10" />
        </div>
        <div className="bg-surface-container-lowest p-6">
          <div className="flex items-end gap-2 h-48">
            {HOURLY_DATA.map((d) => (
              <div key={d.hour} className="flex-1 flex flex-col items-center gap-1">
                <span className="font-label text-[11px] tabular-nums text-on-surface-variant">
                  {d.value > 0 ? d.value : ""}
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
    </div>
  );
}
