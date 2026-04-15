"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DataTable } from "@/components/ui/DataTable";

const EQUIPMENT_IDS = ["TG-01", "TG-02", "TG-03", "TG-04", "TG-05", "TG-06", "TG-07"];

interface CurrentSetting {
  productType: string;
  meshWidth: number;
  meshHeight: number;
  wireThickness: number;
  meshPitch: number;
  weldCurrent: number;
  weldPressure: number;
  setAt: string;
  runningHours: number;
}

const CURRENT_SETTINGS: Record<string, CurrentSetting> = {
  "TG-01": { productType: "WM-304-2.0", meshWidth: 1000, meshHeight: 2000, wireThickness: 2.0, meshPitch: 50, weldCurrent: 420, weldPressure: 3.2, setAt: "2026-04-15 06:15", runningHours: 8.5 },
  "TG-02": { productType: "WM-316-1.5", meshWidth: 1200, meshHeight: 2400, wireThickness: 1.5, meshPitch: 25, weldCurrent: 380, weldPressure: 2.8, setAt: "2026-04-15 06:30", runningHours: 8.3 },
  "TG-03": { productType: "WM-304-2.5", meshWidth: 1000, meshHeight: 2000, wireThickness: 2.5, meshPitch: 50, weldCurrent: 460, weldPressure: 3.5, setAt: "2026-04-14 22:00", runningHours: 0 },
  "TG-04": { productType: "WM-201-1.0", meshWidth: 1000, meshHeight: 2000, wireThickness: 1.0, meshPitch: 30, weldCurrent: 320, weldPressure: 2.4, setAt: "2026-04-15 07:00", runningHours: 7.8 },
  "TG-05": { productType: "WM-316-2.0", meshWidth: 1200, meshHeight: 2400, wireThickness: 2.0, meshPitch: 50, weldCurrent: 440, weldPressure: 3.3, setAt: "2026-04-15 06:00", runningHours: 5.2 },
  "TG-06": { productType: "WM-304-1.5", meshWidth: 1000, meshHeight: 2000, wireThickness: 1.5, meshPitch: 25, weldCurrent: 375, weldPressure: 2.7, setAt: "2026-04-15 06:10", runningHours: 8.6 },
  "TG-07": { productType: "---", meshWidth: 0, meshHeight: 0, wireThickness: 0, meshPitch: 0, weldCurrent: 0, weldPressure: 0, setAt: "---", runningHours: 0 },
};

interface ChangeRecord {
  id: string;
  equipment: string;
  fromType: string;
  toType: string;
  startTime: string;
  endTime: string;
  duration: string;
  operator: string;
}

const MOCK_HISTORY: ChangeRecord[] = [
  { id: "TC-0415-001", equipment: "TG-01", fromType: "WM-304-1.5", toType: "WM-304-2.0", startTime: "05:00", endTime: "06:15", duration: "1h 15m", operator: "Kim JH" },
  { id: "TC-0415-002", equipment: "TG-02", fromType: "WM-201-1.0", toType: "WM-316-1.5", startTime: "05:10", endTime: "06:30", duration: "1h 20m", operator: "Park SY" },
  { id: "TC-0414-008", equipment: "TG-05", fromType: "WM-304-2.5", toType: "WM-316-2.0", startTime: "22:30", endTime: "00:05", duration: "1h 35m", operator: "Lee MJ" },
  { id: "TC-0414-007", equipment: "TG-06", fromType: "WM-316-2.0", toType: "WM-304-1.5", startTime: "21:00", endTime: "22:10", duration: "1h 10m", operator: "Choi DH" },
  { id: "TC-0414-006", equipment: "TG-03", fromType: "WM-201-1.5", toType: "WM-304-2.5", startTime: "20:30", endTime: "22:00", duration: "1h 30m", operator: "Kim JH" },
];

const HISTORY_COLUMNS = [
  { key: "id", label: "교체 ID" },
  { key: "equipment", label: "설비" },
  { key: "fromType", label: "변경 전" },
  { key: "toType", label: "변경 후" },
  { key: "startTime", label: "시작" },
  { key: "endTime", label: "종료" },
  { key: "duration", label: "소요시간" },
  { key: "operator", label: "작업자" },
];

export default function P2TypeSettingPage() {
  const [selectedEquip, setSelectedEquip] = useState("TG-01");
  const [newProductType, setNewProductType] = useState("");
  const [newWidth, setNewWidth] = useState("");
  const [newThickness, setNewThickness] = useState("");
  const [newPitch, setNewPitch] = useState("");
  const [newWeldCurrent, setNewWeldCurrent] = useState("");
  const [newWeldPressure, setNewWeldPressure] = useState("");
  const [changeoverStarted, setChangeoverStarted] = useState(false);
  const [changeoverTime, setChangeoverTime] = useState(0);
  const [intervalRef, setIntervalRef] = useState<ReturnType<typeof setInterval> | null>(null);

  const current = CURRENT_SETTINGS[selectedEquip];

  const handleStartChangeover = () => {
    setChangeoverStarted(true);
    setChangeoverTime(0);
    const id = setInterval(() => {
      setChangeoverTime((prev) => prev + 1);
    }, 1000);
    setIntervalRef(id);
  };

  const handleCompleteChangeover = () => {
    setChangeoverStarted(false);
    if (intervalRef) clearInterval(intervalRef);
    setIntervalRef(null);
    alert(`Type setting change completed for ${selectedEquip}\nNew type: ${newProductType}\nChangeover time: ${Math.floor(changeoverTime / 60)}m ${changeoverTime % 60}s`);
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  return (
    <div>
      <PageHeader
        title="2공정 TG"
        accent="타입 세팅"
        nodeRef="SCR-P2-006"
        description="TG기의 타입 세팅(제품 규격) 변경을 기록합니다. 교체 소요시간을 추적하고 변경 이력을 관리합니다."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Equipment Selector + Current Setting */}
        <section>
          <FieldHeader title="현재 세팅" moduleRef="TYPE.CURRENT" />

          <div className="mb-6">
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
              설비
            </label>
            <select
              value={selectedEquip}
              onChange={(e) => { setSelectedEquip(e.target.value); setChangeoverStarted(false); }}
              className="w-full bg-surface-container-lowest border border-outline-variant/20 px-3 py-2 text-sm font-headline text-on-surface focus:border-primary-accent focus:outline-none"
            >
              {EQUIPMENT_IDS.map((eq) => (
                <option key={eq} value={eq}>{eq}</option>
              ))}
            </select>
          </div>

          <div className="bg-surface-container-lowest border-l-4 border-tertiary p-6 space-y-3">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-headline font-black text-base">{selectedEquip}</h4>
              <StatusBadge
                type={current.runningHours > 0 ? "running" : "idle"}
                label={current.runningHours > 0 ? "가동중" : "비가동"}
              />
            </div>
            {[
              { label: "제품종류", value: current.productType },
              { label: "메쉬 폭", value: `${current.meshWidth} mm` },
              { label: "메쉬 높이", value: `${current.meshHeight} mm` },
              { label: "와이어 두께", value: `${current.wireThickness} mm` },
              { label: "메쉬 피치", value: `${current.meshPitch} mm` },
              { label: "용접 전류", value: `${current.weldCurrent} A` },
              { label: "용접 압력", value: `${current.weldPressure} MPa` },
              { label: "세팅 시각", value: current.setAt },
              { label: "가동 시간", value: `${current.runningHours} hrs` },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center border-b border-outline-variant/5 pb-2">
                <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
                  {item.label}
                </span>
                <span className="font-headline text-sm font-bold tabular-nums">{item.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* New Setting Form */}
        <section>
          <FieldHeader title="신규 세팅" moduleRef="TYPE.CHANGE" />

          {changeoverStarted && (
            <div className="bg-[#f59e0b]/10 border-l-4 border-[#f59e0b] p-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-label text-xs uppercase tracking-widest text-[#f59e0b]">
                  교체 진행중
                </span>
                <span className="font-headline font-black text-2xl tabular-nums text-[#f59e0b]">
                  {formatTime(changeoverTime)}
                </span>
              </div>
              <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant mt-1 opacity-60">
                일반적인 교체 소요시간: 1-2시간
              </p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
                신규 제품종류
              </label>
              <input
                type="text"
                value={newProductType}
                onChange={(e) => setNewProductType(e.target.value)}
                placeholder="WM-304-2.0"
                className="w-full bg-surface-container-lowest border border-outline-variant/20 px-3 py-2 text-sm font-headline text-on-surface focus:border-primary-accent focus:outline-none placeholder:text-on-surface-variant/30"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
                  폭 (mm)
                </label>
                <input
                  type="number"
                  value={newWidth}
                  onChange={(e) => setNewWidth(e.target.value)}
                  placeholder="1000"
                  className="w-full bg-surface-container-lowest border border-outline-variant/20 px-3 py-2 text-sm font-headline text-on-surface focus:border-primary-accent focus:outline-none tabular-nums placeholder:text-on-surface-variant/30"
                />
              </div>
              <div>
                <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
                  두께 (mm)
                </label>
                <input
                  type="number"
                  value={newThickness}
                  onChange={(e) => setNewThickness(e.target.value)}
                  step="0.1"
                  placeholder="2.0"
                  className="w-full bg-surface-container-lowest border border-outline-variant/20 px-3 py-2 text-sm font-headline text-on-surface focus:border-primary-accent focus:outline-none tabular-nums placeholder:text-on-surface-variant/30"
                />
              </div>
            </div>

            <div>
              <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
                메쉬 피치 (mm)
              </label>
              <input
                type="number"
                value={newPitch}
                onChange={(e) => setNewPitch(e.target.value)}
                placeholder="50"
                className="w-full bg-surface-container-lowest border border-outline-variant/20 px-3 py-2 text-sm font-headline text-on-surface focus:border-primary-accent focus:outline-none tabular-nums placeholder:text-on-surface-variant/30"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
                  용접 전류 (A)
                </label>
                <input
                  type="number"
                  value={newWeldCurrent}
                  onChange={(e) => setNewWeldCurrent(e.target.value)}
                  placeholder="420"
                  className="w-full bg-surface-container-lowest border border-outline-variant/20 px-3 py-2 text-sm font-headline text-on-surface focus:border-primary-accent focus:outline-none tabular-nums placeholder:text-on-surface-variant/30"
                />
              </div>
              <div>
                <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
                  용접 압력 (MPa)
                </label>
                <input
                  type="number"
                  value={newWeldPressure}
                  onChange={(e) => setNewWeldPressure(e.target.value)}
                  step="0.1"
                  placeholder="3.2"
                  className="w-full bg-surface-container-lowest border border-outline-variant/20 px-3 py-2 text-sm font-headline text-on-surface focus:border-primary-accent focus:outline-none tabular-nums placeholder:text-on-surface-variant/30"
                />
              </div>
            </div>

            {!changeoverStarted ? (
              <button
                onClick={handleStartChangeover}
                className="w-full bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/30 px-4 py-3 font-label text-xs uppercase tracking-widest font-bold hover:bg-[#f59e0b]/30 transition-colors"
              >
                교체 시작
              </button>
            ) : (
              <button
                onClick={handleCompleteChangeover}
                className="w-full bg-primary-accent text-on-primary px-4 py-3 font-label text-xs uppercase tracking-widest font-bold hover:bg-primary transition-colors"
              >
                교체 완료
              </button>
            )}
          </div>
        </section>
      </div>

      {/* Change History */}
      <DataTable
        title="세팅 변경 이력"
        columns={HISTORY_COLUMNS}
        data={MOCK_HISTORY.map((r) => ({
          id: r.id,
          equipment: r.equipment,
          fromType: r.fromType,
          toType: r.toType,
          startTime: r.startTime,
          endTime: r.endTime,
          duration: r.duration,
          operator: r.operator,
        }))}
        bufferCount={MOCK_HISTORY.length}
      />
    </div>
  );
}
