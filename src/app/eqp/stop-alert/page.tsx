"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

interface StopAlert {
  id: string;
  equipment: string;
  equipmentId: string;
  stopTime: string;
  duration: string;
  stopType: "mechanical" | "electrical" | "sensor" | "material" | "quality";
  description: string;
  assignedTeam: string;
  acknowledged: boolean;
  severity: "critical" | "major" | "minor";
}

const STOP_TYPE_STYLES: Record<string, { color: string; icon: string }> = {
  mechanical: { color: "bg-error", icon: "build" },
  electrical: { color: "bg-[#f59e0b]", icon: "bolt" },
  sensor: { color: "bg-primary-accent", icon: "sensors" },
  material: { color: "bg-tertiary", icon: "inventory_2" },
  quality: { color: "bg-primary", icon: "verified" },
};

const SEVERITY_STYLES: Record<string, { type: "error" | "warning" | "idle" }> = {
  critical: { type: "error" },
  major: { type: "warning" },
  minor: { type: "idle" },
};

const MOCK_ALERTS: StopAlert[] = [
  {
    id: "ALR-001",
    equipment: "Wire Draw #3",
    equipmentId: "EQP-WD-03",
    stopTime: "2026-04-15 13:42:18",
    duration: "00:48:22",
    stopType: "mechanical",
    description: "다이스 파손 감지. 자동 정지 발동. 다이스 교체 필요.",
    assignedTeam: "정비팀 A",
    acknowledged: false,
    severity: "critical",
  },
  {
    id: "ALR-002",
    equipment: "Furnace HT-02",
    equipmentId: "EQP-HT-02",
    stopTime: "2026-04-15 12:15:44",
    duration: "02:14:56",
    stopType: "sensor",
    description: "온도 센서 TC-04 판독 이상. 설정값 대비 >5C 편차.",
    assignedTeam: "계측팀",
    acknowledged: false,
    severity: "major",
  },
  {
    id: "ALR-003",
    equipment: "Press FRM-02",
    equipmentId: "EQP-FM-02",
    stopTime: "2026-04-15 10:05:11",
    duration: "04:25:29",
    stopType: "electrical",
    description: "서보 드라이브 고장 E-4502. 모터 과부하 보호 작동.",
    assignedTeam: "전기팀",
    acknowledged: true,
    severity: "critical",
  },
  {
    id: "ALR-004",
    equipment: "Packing #2",
    equipmentId: "EQP-PKG-02",
    stopTime: "2026-04-15 09:30:00",
    duration: "05:00:40",
    stopType: "material",
    description: "포장 자재 부족. 창고에서 보충 대기중.",
    assignedTeam: "물류팀",
    acknowledged: true,
    severity: "minor",
  },
  {
    id: "ALR-005",
    equipment: "Furnace HT-03",
    equipmentId: "EQP-HT-03",
    stopTime: "2026-04-15 06:00:00",
    duration: "08:30:40",
    stopType: "mechanical",
    description: "정기 예방 정비. 내화물 점검 진행중.",
    assignedTeam: "정비팀 B",
    acknowledged: true,
    severity: "minor",
  },
];

export default function StopAlertPage() {
  const [alerts, setAlerts] = useState(MOCK_ALERTS);

  const handleAcknowledge = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a))
    );
  };

  const unackCount = alerts.filter((a) => !a.acknowledged).length;

  return (
    <div className="max-w-lg mx-auto">
      <PageHeader
        title="정지"
        accent="알림"
        description="설비 정지 알림을 확인합니다. 정지 유형, 경과시간, 담당팀 정보를 확인하고 조치를 취합니다."
        nodeRef="SCR-EQP-002"
        status="ALERT"
      />

      {/* Alert Summary */}
      <div className="bg-surface-container-lowest p-4 mb-6 flex items-center justify-between border-l-4 border-error">
        <div>
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block">미확인</span>
          <span className="font-headline text-2xl font-black tabular-nums text-error">{String(unackCount).padStart(2, "0")}</span>
        </div>
        <div className="text-right">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block">전체 알림</span>
          <span className="font-headline text-2xl font-black tabular-nums">{String(alerts.length).padStart(2, "0")}</span>
        </div>
      </div>

      {/* Alert Cards - Mobile notification style */}
      <section className="space-y-3 mb-6">
        <FieldHeader title="활성 알림" moduleRef="NOTIF-FEED" />

        {alerts.map((alert) => {
          const typeStyle = STOP_TYPE_STYLES[alert.stopType];
          const sevStyle = SEVERITY_STYLES[alert.severity];

          return (
            <div
              key={alert.id}
              className={`bg-surface-container-lowest border-l-4 ${!alert.acknowledged ? "border-error" : "border-outline-variant/30"} p-4 ${!alert.acknowledged ? "bg-error/5" : ""}`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${typeStyle.color} flex items-center justify-center shrink-0`}>
                    <span className="material-symbols-outlined text-lg text-surface">{typeStyle.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-headline text-sm font-bold">{alert.equipment}</h4>
                    <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">{alert.equipmentId}</span>
                  </div>
                </div>
                <StatusBadge type={sevStyle.type} label={alert.severity.toUpperCase()} />
              </div>

              {/* Description */}
              <p className="font-headline text-xs text-on-surface-variant opacity-80 mb-3 leading-relaxed">{alert.description}</p>

              {/* Metadata */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block">정지 시각</span>
                  <span className="font-headline text-xs tabular-nums">{alert.stopTime}</span>
                </div>
                <div>
                  <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block">경과시간</span>
                  <span className="font-headline text-xs tabular-nums font-bold text-error">{alert.duration}</span>
                </div>
                <div>
                  <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block">정지 유형</span>
                  <span className="font-headline text-xs uppercase">{alert.stopType}</span>
                </div>
                <div>
                  <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block">배정</span>
                  <span className="font-headline text-xs">{alert.assignedTeam}</span>
                </div>
              </div>

              {/* Acknowledge Button */}
              {!alert.acknowledged ? (
                <button
                  onClick={() => handleAcknowledge(alert.id)}
                  className="w-full bg-primary-accent py-3 font-label text-xs uppercase tracking-widest font-bold text-on-primary-container hover:bg-primary-accent/80 transition-colors flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-base">check_circle</span>
                  확인
                </button>
              ) : (
                <div className="w-full bg-surface-container py-3 flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-base text-tertiary">check</span>
                  <span className="font-label text-xs uppercase tracking-widest text-tertiary">확인완료</span>
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* Footer */}
      <footer className="bg-surface-container p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 ${unackCount > 0 ? "bg-error animate-pulse" : "bg-tertiary"} inline-block`} />
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
            {unackCount > 0 ? "알림 대기중" : "이상 없음"}
          </span>
        </div>
        <StatusBadge type={unackCount > 0 ? "error" : "running"} label={unackCount > 0 ? "활성" : "정상"} />
      </footer>
    </div>
  );
}
