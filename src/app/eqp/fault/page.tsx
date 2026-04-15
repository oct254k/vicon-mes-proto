"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const EQUIPMENT_LIST = [
  { id: "EQP-WD-01", name: "Wire Draw #1" },
  { id: "EQP-WD-02", name: "Wire Draw #2" },
  { id: "EQP-WD-03", name: "Wire Draw #3" },
  { id: "EQP-HT-01", name: "Furnace HT-01" },
  { id: "EQP-HT-02", name: "Furnace HT-02" },
  { id: "EQP-HT-03", name: "Furnace HT-03" },
  { id: "EQP-PL-01", name: "Plating Line #1" },
  { id: "EQP-PL-02", name: "Plating Line #2" },
  { id: "EQP-FM-01", name: "Press FRM-01" },
  { id: "EQP-FM-02", name: "Press FRM-02" },
  { id: "EQP-PKG-01", name: "Packing #1" },
  { id: "EQP-PKG-02", name: "Packing #2" },
];

const FAULT_TYPES = [
  { value: "mechanical", label: "기계" },
  { value: "electrical", label: "전기" },
  { value: "sensor", label: "센서 / 계측" },
  { value: "hydraulic", label: "유압 / 공압" },
  { value: "software", label: "소프트웨어 / PLC" },
  { value: "tooling", label: "금형 / 다이스" },
  { value: "other", label: "기타" },
];

const RESTART_CHECKLIST = [
  "안전 가드 정위치 확인",
  "위험 구역 내 인원 없음 확인",
  "금형 / 다이스 정상 장착 확인",
  "윤활 시스템 점검 완료",
  "파라미터 표준값 복원 완료",
  "시운전 완료 (공운전)",
];

export default function FaultEntryPage() {
  const [equipment, setEquipment] = useState(EQUIPMENT_LIST[2].id);
  const [faultType, setFaultType] = useState("mechanical");
  const [description, setDescription] = useState("3번 위치 다이스 파손. 신규 다이스 D-0.82-NEW로 교체.");
  const [startTime, setStartTime] = useState("2026-04-15T13:42");
  const [endTime, setEndTime] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [restartMode, setRestartMode] = useState(false);
  const [checklist, setChecklist] = useState<boolean[]>(new Array(RESTART_CHECKLIST.length).fill(false));

  const allChecked = checklist.every(Boolean);

  const handleCheckItem = (index: number) => {
    setChecklist((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const handleSubmitFault = () => {
    setSubmitted(true);
  };

  const handleRestart = () => {
    if (allChecked) {
      setRestartMode(false);
      setSubmitted(false);
      setDescription("");
      setEndTime("");
      setChecklist(new Array(RESTART_CHECKLIST.length).fill(false));
    }
  };

  const selectedEquipment = EQUIPMENT_LIST.find((e) => e.id === equipment);

  return (
    <div className="max-w-3xl">
      <PageHeader
        title="고장"
        accent="입력"
        nodeRef="SCR-EQP-003"
        status={submitted ? "고장 기록됨" : "준비"}
      />

      {/* Equipment Selector */}
      <section className="bg-surface-container-lowest p-6 mb-6">
        <FieldHeader title="설비 선택" moduleRef="MOD-EQP-SEL" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">
              설비
            </label>
            <select
              value={equipment}
              onChange={(e) => setEquipment(e.target.value)}
              className="w-full bg-surface-container border border-outline-variant/20 px-4 py-3 text-sm font-headline text-on-surface focus:outline-none focus:border-primary-accent appearance-none cursor-pointer"
            >
              {EQUIPMENT_LIST.map((eq) => (
                <option key={eq.id} value={eq.id}>{eq.name} ({eq.id})</option>
              ))}
            </select>
          </div>
          <div className="flex items-end gap-4">
            <div>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">선택됨</span>
              <span className="font-headline text-sm font-bold">{selectedEquipment?.name}</span>
            </div>
            <StatusBadge type="stopped" label="정지" />
          </div>
        </div>
      </section>

      {/* Fault Entry Form */}
      {!restartMode && (
        <section className="bg-surface-container-lowest p-6 mb-6 border-l-4 border-error">
          <FieldHeader title="고장 상세" moduleRef="MOD-FAULT-ENTRY" />

          <div className="space-y-4">
            {/* Fault Type */}
            <div>
              <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">
                고장유형
              </label>
              <select
                value={faultType}
                onChange={(e) => setFaultType(e.target.value)}
                className="w-full bg-surface-container border border-outline-variant/20 px-4 py-3 text-sm font-headline text-on-surface focus:outline-none focus:border-primary-accent appearance-none cursor-pointer"
              >
                {FAULT_TYPES.map((ft) => (
                  <option key={ft.value} value={ft.value}>{ft.label}</option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">
                설명
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="고장 내용을 입력하세요..."
                className="w-full bg-surface-container border border-outline-variant/20 px-4 py-3 text-sm font-headline text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-primary-accent resize-none"
              />
            </div>

            {/* Times */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">
                  고장 시작 시각
                </label>
                <input
                  type="datetime-local"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full bg-surface-container border border-outline-variant/20 px-4 py-3 text-sm font-headline text-on-surface focus:outline-none focus:border-primary-accent"
                />
              </div>
              <div>
                <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">
                  고장 종료 시각
                </label>
                <input
                  type="datetime-local"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full bg-surface-container border border-outline-variant/20 px-4 py-3 text-sm font-headline text-on-surface focus:outline-none focus:border-primary-accent"
                />
              </div>
            </div>

            {/* Submit */}
            {!submitted ? (
              <button
                onClick={handleSubmitFault}
                className="w-full bg-primary-accent py-3 font-label text-xs uppercase tracking-widest font-bold text-on-primary-container hover:bg-primary-accent/80 transition-colors flex items-center justify-center gap-2 mt-4"
              >
                <span className="material-symbols-outlined text-base">save</span>
                고장 보고서 제출
              </button>
            ) : (
              <div className="space-y-3 mt-4">
                <div className="bg-tertiary/10 p-4 flex items-center gap-3">
                  <span className="material-symbols-outlined text-tertiary">check_circle</span>
                  <span className="font-headline text-sm text-tertiary font-bold">고장 보고서가 성공적으로 제출되었습니다</span>
                </div>
                <button
                  onClick={() => setRestartMode(true)}
                  className="w-full bg-tertiary py-3 font-label text-xs uppercase tracking-widest font-bold text-on-tertiary hover:bg-tertiary/80 transition-colors flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-base">restart_alt</span>
                  재가동 진행
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Restart Confirmation */}
      {restartMode && (
        <section className="bg-surface-container-lowest p-6 mb-6 border-l-4 border-tertiary">
          <FieldHeader title="재가동 확인" moduleRef="MOD-RESTART" />

          <div className="mb-4">
            <span className="font-headline text-sm text-on-surface-variant opacity-80">
              {selectedEquipment?.name} 재가동 전 모든 점검항목을 완료하세요.
            </span>
          </div>

          {/* Checklist */}
          <div className="space-y-2 mb-6">
            {RESTART_CHECKLIST.map((item, i) => (
              <button
                key={i}
                onClick={() => handleCheckItem(i)}
                className={`w-full flex items-center gap-3 p-3 text-left transition-colors ${checklist[i] ? "bg-tertiary/10" : "bg-surface-container hover:bg-surface-container-high"}`}
              >
                <div className={`w-6 h-6 border-2 flex items-center justify-center shrink-0 ${checklist[i] ? "border-tertiary bg-tertiary" : "border-outline-variant/30"}`}>
                  {checklist[i] && (
                    <span className="material-symbols-outlined text-sm text-surface">check</span>
                  )}
                </div>
                <span className={`font-headline text-xs ${checklist[i] ? "text-tertiary" : "text-on-surface-variant"}`}>{item}</span>
              </button>
            ))}
          </div>

          {/* Progress */}
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">진행률</span>
              <span className="font-headline text-xs tabular-nums font-bold">
                {checklist.filter(Boolean).length}/{RESTART_CHECKLIST.length}
              </span>
            </div>
            <div className="w-full h-2 bg-surface-container">
              <div
                className="h-full bg-tertiary transition-all"
                style={{ width: `${(checklist.filter(Boolean).length / RESTART_CHECKLIST.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Restart Button */}
          <button
            onClick={handleRestart}
            disabled={!allChecked}
            className={`w-full py-3 font-label text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-colors ${allChecked ? "bg-tertiary text-on-tertiary hover:bg-tertiary/80" : "bg-surface-container text-on-surface-variant/30 cursor-not-allowed"}`}
          >
            <span className="material-symbols-outlined text-base">power_settings_new</span>
            재가동 확인
          </button>
        </section>
      )}

      {/* Footer */}
      <footer className="mt-6 bg-surface-container p-4 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 ${restartMode ? "bg-tertiary animate-pulse" : submitted ? "bg-[#f59e0b]" : "bg-error"} inline-block`} />
            <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
              {restartMode ? "재가동 대기" : submitted ? "고장 기록됨" : "고장 입력"}
            </span>
          </div>
        </div>
        <StatusBadge type={restartMode ? "running" : "stopped"} label={restartMode ? "재가동" : "고장"} />
      </footer>
    </div>
  );
}
