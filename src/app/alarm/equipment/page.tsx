"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

type FaultSeverity = "critical" | "major" | "minor";

interface EquipmentAlarm {
  id: string;
  severity: FaultSeverity;
  equipmentId: string;
  equipmentName: string;
  faultType: string;
  stopTime: string;
  downtime: string;
  impact: string;
  affectedOrders: number;
  acknowledged: boolean;
}

const FAULT_STYLES: Record<FaultSeverity, { border: string; bg: string; text: string; icon: string }> = {
  critical: { border: "border-error", bg: "bg-error/10", text: "text-error", icon: "dangerous" },
  major: { border: "border-[#f59e0b]", bg: "bg-[#f59e0b]/10", text: "text-[#f59e0b]", icon: "report_problem" },
  minor: { border: "border-tertiary", bg: "bg-tertiary/10", text: "text-tertiary", icon: "build" },
};

const INITIAL_ALARMS: EquipmentAlarm[] = [
  {
    id: "EQA-260415-001",
    severity: "critical",
    equipmentId: "EQ-FRM-002",
    equipmentName: "Forming Press #2",
    faultType: "Hydraulic Pressure Failure",
    stopTime: "2026-04-15 09:38:00",
    downtime: "00:24:18",
    impact: "P3 Forming line halted. 3 downstream orders delayed.",
    affectedOrders: 3,
    acknowledged: false,
  },
  {
    id: "EQA-260415-002",
    severity: "major",
    equipmentId: "EQ-DRW-003",
    equipmentName: "Wire Drawing M3",
    faultType: "Die Wear Alert",
    stopTime: "2026-04-15 09:15:00",
    downtime: "00:47:18",
    impact: "Drawing die approaching end-of-life. Replace within 2 hours.",
    affectedOrders: 1,
    acknowledged: false,
  },
  {
    id: "EQA-260415-003",
    severity: "critical",
    equipmentId: "EQ-TG-002",
    equipmentName: "TG Unit B",
    faultType: "Motor Overload",
    stopTime: "2026-04-15 08:52:00",
    downtime: "01:10:18",
    impact: "TG process capacity reduced by 50%. Backup unit required.",
    affectedOrders: 5,
    acknowledged: false,
  },
  {
    id: "EQA-260415-004",
    severity: "minor",
    equipmentId: "EQ-ASM-002",
    equipmentName: "Assembly Line B",
    faultType: "Sensor Calibration",
    stopTime: "2026-04-15 08:30:00",
    downtime: "01:32:18",
    impact: "Torque sensor drift detected. Auto-compensation active.",
    affectedOrders: 0,
    acknowledged: true,
  },
];

export default function EquipmentAlarmPage() {
  const [alarms, setAlarms] = useState<EquipmentAlarm[]>(INITIAL_ALARMS);

  const handleAcknowledge = (id: string) => {
    setAlarms((prev) =>
      prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a))
    );
  };

  const activeCount = alarms.filter((a) => !a.acknowledged).length;

  return (
    <div>
      <PageHeader
        title="설비"
        accent="알람"
        nodeRef="SCR-ALM-002"
        status="MONITORING"
      />

      {/* Status Bar */}
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 ${activeCount > 0 ? "bg-error animate-pulse" : "bg-tertiary"}`} />
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
            설비 고장: <span className="tabular-nums text-error font-bold">{String(activeCount).padStart(2, "0")}</span>
          </span>
        </div>
        <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 ml-auto tabular-nums">
          2026-04-15 | Shift B
        </span>
      </div>

      {/* Mobile-style Card Container */}
      <div className="max-w-lg mx-auto space-y-4">
        {alarms.map((alarm) => {
          const style = FAULT_STYLES[alarm.severity];
          return (
            <div
              key={alarm.id}
              className={`bg-surface-container-lowest border-l-4 ${style.border} ${
                alarm.acknowledged ? "opacity-50" : ""
              }`}
            >
              {/* Header */}
              <div className={`px-4 py-3 ${style.bg} flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <span className={`material-symbols-outlined text-lg ${style.text}`}>
                    {style.icon}
                  </span>
                  <div>
                    <span className="font-headline text-sm font-bold block">{alarm.equipmentName}</span>
                    <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
                      {alarm.equipmentId}
                    </span>
                  </div>
                </div>
                {alarm.acknowledged ? (
                  <StatusBadge type="idle" label="ACK" />
                ) : (
                  <StatusBadge type={alarm.severity === "critical" ? "error" : "warning"} label={alarm.severity.toUpperCase()} />
                )}
              </div>

              {/* Body */}
              <div className="px-4 py-4 space-y-3">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-1">
                      고장 유형
                    </span>
                    <span className={`font-headline text-sm font-bold ${style.text}`}>{alarm.faultType}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 bg-surface-container p-3">
                  <div className="text-center">
                    <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-1">
                      정지 시간
                    </span>
                    <span className="font-headline text-xs tabular-nums">{alarm.stopTime.split(" ")[1]}</span>
                  </div>
                  <div className="text-center border-x border-outline-variant/10">
                    <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-1">
                      가동중단
                    </span>
                    <span className={`font-headline text-xs tabular-nums font-bold ${style.text}`}>{alarm.downtime}</span>
                  </div>
                  <div className="text-center">
                    <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-1">
                      영향 지시
                    </span>
                    <span className="font-headline text-xs tabular-nums font-bold">{alarm.affectedOrders}</span>
                  </div>
                </div>

                <div className="border-t border-outline-variant/10 pt-3">
                  <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-1">
                    영향 평가
                  </span>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{alarm.impact}</p>
                </div>
              </div>

              {/* Actions */}
              {!alarm.acknowledged && (
                <div className="flex border-t border-outline-variant/10">
                  <button
                    onClick={() => handleAcknowledge(alarm.id)}
                    className="flex-1 py-3 font-label text-xs uppercase tracking-widest font-bold text-tertiary hover:bg-tertiary/10 transition-colors text-center flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    확인
                  </button>
                  <div className="w-px bg-outline-variant/10" />
                  <button className="flex-1 py-3 font-label text-xs uppercase tracking-widest font-bold text-[#f59e0b] hover:bg-[#f59e0b]/10 transition-colors text-center flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-sm">engineering</span>
                    정비 배정
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
