"use client";

import { useState, useEffect } from "react";
import { StatusBadge } from "@/components/ui/StatusBadge";

interface MaterialChange {
  id: string;
  line: string;
  position: string;
  currentMaterial: string;
  currentSpec: string;
  newMaterial: string;
  newSpec: string;
  reason: string;
  requestedAt: string;
}

const ACTIVE_CHANGE: MaterialChange = {
  id: "ANDON-260415-003",
  line: "P3-FORMING LINE A",
  position: "STATION 04 - FEED INLET",
  currentMaterial: "5.5mm Wire Rod (Lot: RM-260415-001)",
  currentSpec: "POSCO / Round / 5.5mm / Grade SD400",
  newMaterial: "6.0mm Wire Rod (Lot: RM-260415-009)",
  newSpec: "SeAH Besteel / Round / 6.0mm / Grade SD500",
  reason: "Work order WO-260415-012 requires 6.0mm specification for Reinforced Steel Mesh A-Type",
  requestedAt: "2026-04-15 09:48:32",
};

export default function AndonPage() {
  const [acknowledged, setAcknowledged] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [flash, setFlash] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (acknowledged) return;
    const flashTimer = setInterval(() => {
      setFlash((prev) => !prev);
    }, 800);
    return () => clearInterval(flashTimer);
  }, [acknowledged]);

  const formatElapsed = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  return (
    <div className="fixed inset-0 bg-surface-container-lowest flex items-center justify-center p-4 z-50">
      <div
        className={`w-full max-w-4xl border-4 transition-colors duration-300 ${
          acknowledged
            ? "border-tertiary"
            : flash
            ? "border-primary-accent"
            : "border-error"
        }`}
      >
        {/* Top Bar */}
        <div
          className={`px-8 py-4 flex items-center justify-between transition-colors duration-300 ${
            acknowledged ? "bg-tertiary/20" : flash ? "bg-primary-accent/20" : "bg-error/20"
          }`}
        >
          <div className="flex items-center gap-4">
            <span
              className={`material-symbols-outlined text-5xl transition-colors duration-300 ${
                acknowledged ? "text-tertiary" : "text-error"
              }`}
            >
              {acknowledged ? "check_circle" : "swap_horiz"}
            </span>
            <div>
              <h1 className="text-3xl md:text-4xl font-black font-headline uppercase tracking-tight">
                {acknowledged ? "교체 확인완료" : "자재 교체 필요"}
              </h1>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
                {ACTIVE_CHANGE.id}
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-1">
              알림 경과시간
            </span>
            <span
              className={`text-4xl md:text-5xl font-black font-headline tabular-nums ${
                acknowledged ? "text-tertiary" : "text-error"
              }`}
            >
              {formatElapsed(elapsed)}
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8 space-y-8">
          {/* Location */}
          <div className="bg-surface-container p-6">
            <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
              위치
            </span>
            <div className="text-3xl md:text-4xl font-black font-headline text-primary-accent">
              {ACTIVE_CHANGE.line}
            </div>
            <div className="text-xl md:text-2xl font-bold font-headline text-on-surface-variant mt-1">
              {ACTIVE_CHANGE.position}
            </div>
          </div>

          {/* Material Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Current */}
            <div className="bg-surface-container p-6 border-l-4 border-error">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-2xl text-error">remove_circle</span>
                <span className="font-label text-sm uppercase tracking-widest font-bold text-error">
                  현재 자재 제거
                </span>
              </div>
              <div className="text-xl md:text-2xl font-black font-headline mb-2">
                {ACTIVE_CHANGE.currentMaterial}
              </div>
              <span className="text-sm text-on-surface-variant">{ACTIVE_CHANGE.currentSpec}</span>
            </div>

            {/* New */}
            <div className="bg-surface-container p-6 border-l-4 border-tertiary">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-2xl text-tertiary">add_circle</span>
                <span className="font-label text-sm uppercase tracking-widest font-bold text-tertiary">
                  신규 자재 적재
                </span>
              </div>
              <div className="text-xl md:text-2xl font-black font-headline mb-2">
                {ACTIVE_CHANGE.newMaterial}
              </div>
              <span className="text-sm text-on-surface-variant">{ACTIVE_CHANGE.newSpec}</span>
            </div>
          </div>

          {/* Reason */}
          <div className="bg-surface-container p-6">
            <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
              사유
            </span>
            <p className="text-lg text-on-surface leading-relaxed">{ACTIVE_CHANGE.reason}</p>
          </div>

          {/* Action Button */}
          <div className="flex justify-center">
            {acknowledged ? (
              <div className="flex items-center gap-4 py-6">
                <StatusBadge type="running" label="확인완료" />
                <span className="font-label text-sm uppercase tracking-widest text-tertiary">
                  자재 교체 진행 중
                </span>
              </div>
            ) : (
              <button
                onClick={() => setAcknowledged(true)}
                className="w-full max-w-md py-6 bg-primary-accent hover:bg-primary-container text-on-primary text-2xl md:text-3xl font-black font-headline uppercase tracking-wider transition-colors border-2 border-primary-accent"
              >
                확인완료
              </button>
            )}
          </div>

          {/* Footer Info */}
          <div className="flex items-center justify-between pt-4 border-t border-outline-variant/10">
            <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 tabular-nums">
              요청시간: {ACTIVE_CHANGE.requestedAt}
            </span>
            <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">
              SCR-ALM-004 | 안돈 디스플레이
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
