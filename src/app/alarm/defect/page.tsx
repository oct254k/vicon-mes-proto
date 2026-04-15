"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

type Severity = "critical" | "warning" | "info";

interface DefectAlarm {
  id: string;
  severity: Severity;
  process: string;
  equipment: string;
  lot: string;
  defectType: string;
  time: string;
  description: string;
  acknowledged: boolean;
}

const SEVERITY_STYLES: Record<Severity, { border: string; bg: string; text: string; label: string }> = {
  critical: { border: "border-error", bg: "bg-error/10", text: "text-error", label: "중대" },
  warning: { border: "border-[#f59e0b]", bg: "bg-[#f59e0b]/10", text: "text-[#f59e0b]", label: "경고" },
  info: { border: "border-tertiary", bg: "bg-tertiary/10", text: "text-tertiary", label: "정보" },
};

const INITIAL_ALARMS: DefectAlarm[] = [
  {
    id: "DEF-260415-001",
    severity: "critical",
    process: "P3 Forming",
    equipment: "EQ-FRM-002",
    lot: "LOT-260415-034",
    defectType: "Crack Detection",
    time: "2026-04-15 09:42:18",
    description: "Surface crack detected on formed product. Dimensional deviation exceeds 0.3mm tolerance.",
    acknowledged: false,
  },
  {
    id: "DEF-260415-002",
    severity: "warning",
    process: "P1 Drawing",
    equipment: "EQ-DRW-001",
    lot: "LOT-260415-028",
    defectType: "Diameter Variance",
    time: "2026-04-15 09:38:05",
    description: "Wire diameter variance detected at 0.15mm. Approaching upper control limit.",
    acknowledged: false,
  },
  {
    id: "DEF-260415-003",
    severity: "critical",
    process: "P4 Assembly",
    equipment: "EQ-ASM-001",
    lot: "LOT-260415-041",
    defectType: "Weld Failure",
    time: "2026-04-15 09:35:52",
    description: "Weld joint integrity test failed. Tensile strength below 85% threshold.",
    acknowledged: false,
  },
  {
    id: "DEF-260415-004",
    severity: "info",
    process: "P2 TG",
    equipment: "EQ-TG-001",
    lot: "LOT-260415-019",
    defectType: "Surface Finish",
    time: "2026-04-15 09:22:11",
    description: "Minor surface roughness deviation. Within acceptable range but trending upward.",
    acknowledged: true,
  },
  {
    id: "DEF-260415-005",
    severity: "warning",
    process: "P3 Forming",
    equipment: "EQ-FRM-001",
    lot: "LOT-260415-037",
    defectType: "Bend Angle",
    time: "2026-04-15 09:15:33",
    description: "Bend angle deviation of 1.2 degrees detected on forming press output.",
    acknowledged: true,
  },
];

export default function DefectAlarmPage() {
  const [alarms, setAlarms] = useState<DefectAlarm[]>(INITIAL_ALARMS);
  const [filter, setFilter] = useState<Severity | "all">("all");

  const handleAcknowledge = (id: string) => {
    setAlarms((prev) =>
      prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a))
    );
  };

  const activeCount = alarms.filter((a) => !a.acknowledged).length;
  const filtered = filter === "all" ? alarms : alarms.filter((a) => a.severity === filter);

  return (
    <div>
      <PageHeader
        title="부적합"
        accent="알람"
        nodeRef="SCR-ALM-001"
        status="MONITORING"
      />

      {/* Summary Strip */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 ${activeCount > 0 ? "bg-error animate-pulse" : "bg-tertiary"}`} />
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
            활성 알람: <span className="tabular-nums text-error font-bold">{String(activeCount).padStart(2, "0")}</span>
          </span>
        </div>
        <div className="flex-1" />
        <div className="flex gap-2">
          {(["all", "critical", "warning", "info"] as const).map((s) => {
            const filterLabel: Record<string, string> = { all: "전체", critical: "중대", warning: "경고", info: "정보" };
            return (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1 font-label text-xs uppercase tracking-widest border transition-colors ${
                filter === s
                  ? "border-primary-accent bg-primary-accent/10 text-primary-accent"
                  : "border-outline-variant/20 text-on-surface-variant hover:border-outline-variant/40"
              }`}
            >
              {filterLabel[s]}
            </button>
            );
          })}
        </div>
      </div>

      {/* Mobile-style Card Container */}
      <div className="max-w-lg mx-auto space-y-4">
        {filtered.map((alarm) => {
          const style = SEVERITY_STYLES[alarm.severity];
          return (
            <div
              key={alarm.id}
              className={`bg-surface-container-lowest border-l-4 ${style.border} ${
                alarm.acknowledged ? "opacity-50" : ""
              }`}
            >
              {/* Card Header */}
              <div className={`px-4 py-3 ${style.bg} flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <span className={`material-symbols-outlined text-lg ${style.text}`}>
                    {alarm.severity === "critical" ? "error" : alarm.severity === "warning" ? "warning" : "info"}
                  </span>
                  <span className={`font-label text-xs uppercase tracking-widest font-bold ${style.text}`}>
                    {style.label}
                  </span>
                </div>
                <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant tabular-nums">
                  {alarm.id}
                </span>
              </div>

              {/* Card Body */}
              <div className="px-4 py-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-1">
                      공정
                    </span>
                    <span className="font-headline text-sm font-bold">{alarm.process}</span>
                  </div>
                  <div>
                    <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-1">
                      설비
                    </span>
                    <span className="font-headline text-sm font-bold">{alarm.equipment}</span>
                  </div>
                  <div>
                    <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-1">
                      LOT
                    </span>
                    <span className="font-headline text-sm tabular-nums">{alarm.lot}</span>
                  </div>
                  <div>
                    <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-1">
                      부적합 유형
                    </span>
                    <span className={`font-headline text-sm font-bold ${style.text}`}>{alarm.defectType}</span>
                  </div>
                </div>

                <p className="text-xs text-on-surface-variant leading-relaxed border-t border-outline-variant/10 pt-3">
                  {alarm.description}
                </p>

                <div className="flex items-center justify-between pt-1">
                  <span className="font-label text-xs tabular-nums text-on-surface-variant opacity-60">
                    {alarm.time}
                  </span>
                  {alarm.acknowledged ? (
                    <StatusBadge type="idle" label="확인완료" />
                  ) : null}
                </div>
              </div>

              {/* Card Actions */}
              {!alarm.acknowledged && (
                <div className="flex border-t border-outline-variant/10">
                  <button
                    onClick={() => handleAcknowledge(alarm.id)}
                    className="flex-1 py-3 font-label text-xs uppercase tracking-widest font-bold text-tertiary hover:bg-tertiary/10 transition-colors text-center"
                  >
                    확인
                  </button>
                  <div className="w-px bg-outline-variant/10" />
                  <button className="flex-1 py-3 font-label text-xs uppercase tracking-widest font-bold text-error hover:bg-error/10 transition-colors text-center">
                    상위보고
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant opacity-20 mb-4 block">
              check_circle
            </span>
            <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">
              선택한 필터에 해당하는 알람이 없습니다
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
