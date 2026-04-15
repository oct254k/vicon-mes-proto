"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

interface WeldPoint {
  id: string;
  location: string;
  spec: string;
  checked: boolean;
  result: "PASS" | "FAIL" | null;
}

const INITIAL_WELD_POINTS: WeldPoint[] = [
  { id: "WP-01", location: "Top Plate - Left Joint", spec: "Full penetration, min 6mm", checked: false, result: null },
  { id: "WP-02", location: "Top Plate - Right Joint", spec: "Full penetration, min 6mm", checked: false, result: null },
  { id: "WP-03", location: "Bottom Plate - Left Joint", spec: "Fillet weld, min 8mm", checked: false, result: null },
  { id: "WP-04", location: "Bottom Plate - Right Joint", spec: "Fillet weld, min 8mm", checked: false, result: null },
  { id: "WP-05", location: "Cross Wire Connection A", spec: "Spot weld, min 4 points", checked: false, result: null },
  { id: "WP-06", location: "Cross Wire Connection B", spec: "Spot weld, min 4 points", checked: false, result: null },
  { id: "WP-07", location: "Side Rail - Left Weld", spec: "Continuous weld, min 5mm", checked: false, result: null },
  { id: "WP-08", location: "Side Rail - Right Weld", spec: "Continuous weld, min 5mm", checked: false, result: null },
  { id: "WP-09", location: "End Plate Weld", spec: "Full penetration, min 6mm", checked: false, result: null },
  { id: "WP-10", location: "Reinforcement Bracket", spec: "Fillet weld, min 4mm", checked: false, result: null },
];

const RECENT_CONFIRMATIONS = [
  { lot: "LOT-A-2026-0415-001", points: "10/10", result: "PASS", time: "14:20", operator: "Kim J." },
  { lot: "LOT-A-2026-0415-002", points: "10/10", result: "PASS", time: "13:05", operator: "Park S." },
  { lot: "LOT-A-2026-0414-015", points: "8/10", result: "FAIL", time: "16:40", operator: "Lee H." },
];

export default function FinWeldPage() {
  const [lotNumber, setLotNumber] = useState("");
  const [weldPoints, setWeldPoints] = useState<WeldPoint[]>(INITIAL_WELD_POINTS);
  const [lotScanned, setLotScanned] = useState(false);

  const handleScanLot = () => {
    if (!lotNumber.trim()) return;
    setLotScanned(true);
  };

  const toggleWeldPoint = (id: string, result: "PASS" | "FAIL") => {
    setWeldPoints((prev) =>
      prev.map((wp) =>
        wp.id === id ? { ...wp, checked: true, result } : wp
      )
    );
  };

  const checkedCount = weldPoints.filter((wp) => wp.checked).length;
  const passCount = weldPoints.filter((wp) => wp.result === "PASS").length;
  const failCount = weldPoints.filter((wp) => wp.result === "FAIL").length;
  const allChecked = checkedCount === weldPoints.length;
  const allPass = allChecked && failCount === 0;

  return (
    <div>
      <PageHeader
        title="마무리"
        accent="용접 완료 확인"
        nodeRef="FIN-WLD-001"
        status="INSPECTION"
        description="마무리 공정에서 용접 포인트별 합격/불합격을 점검합니다. 전체 점검 완료 후 용접 완료를 확인합니다."
      />

      {/* LOT Scan */}
      <section className="mb-8">
        <div className="bg-surface-container-lowest p-6">
          <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-3">
            조립 LOT 스캔
          </label>
          <div className="flex gap-0">
            <input
              type="text"
              value={lotNumber}
              onChange={(e) => setLotNumber(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleScanLot()}
              placeholder="용접 검사를 위해 LOT 바코드를 스캔하세요..."
              autoFocus
              className="flex-1 bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-4 py-5 text-xl font-headline tabular-nums text-on-surface placeholder:text-on-surface-variant/30 transition-colors"
            />
            <button
              onClick={handleScanLot}
              className="bg-primary-accent text-white px-8 py-5 font-label text-xs uppercase tracking-widest font-bold hover:bg-primary-accent/80 transition-colors active:scale-95 min-w-[120px]"
            >
              스캔
            </button>
          </div>
        </div>
      </section>

      {lotScanned && (
        <>
          {/* Progress Summary */}
          <section className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-0">
            <div className="bg-surface-container-lowest p-5 border-l-4 border-primary-accent">
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-1">전체 포인트</span>
              <span className="text-3xl font-black font-headline tabular-nums">{weldPoints.length}</span>
            </div>
            <div className="bg-surface-container-lowest p-5 border-l-4 border-tertiary">
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-1">점검완료</span>
              <span className="text-3xl font-black font-headline tabular-nums text-tertiary">{checkedCount}</span>
            </div>
            <div className="bg-surface-container-lowest p-5 border-l-4 border-[#22c55e]">
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-1">합격</span>
              <span className="text-3xl font-black font-headline tabular-nums text-[#22c55e]">{passCount}</span>
            </div>
            <div className="bg-surface-container-lowest p-5 border-l-4 border-error">
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-1">불합격</span>
              <span className="text-3xl font-black font-headline tabular-nums text-error">{failCount}</span>
            </div>
          </section>

          {/* Progress Bar */}
          <section className="mb-8">
            <div className="w-full h-3 bg-surface-container">
              <div
                className={`h-full transition-all ${allPass ? "bg-tertiary" : failCount > 0 ? "bg-error" : "bg-primary-accent"}`}
                style={{ width: `${(checkedCount / weldPoints.length) * 100}%` }}
              />
            </div>
          </section>

          {/* Weld Point Checklist */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
                용접 포인트 점검항목
              </span>
              <div className="flex-1 h-px bg-outline-variant/10" />
            </div>
            <div className="space-y-2">
              {weldPoints.map((wp) => (
                <div
                  key={wp.id}
                  className={`bg-surface-container-lowest p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
                    wp.result === "PASS" ? "border-l-4 border-tertiary" :
                    wp.result === "FAIL" ? "border-l-4 border-error" :
                    "border-l-4 border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="w-12 h-12 bg-surface-container flex items-center justify-center font-headline font-black text-xs tabular-nums text-on-surface-variant shrink-0">
                      {wp.id.split("-")[1]}
                    </span>
                    <div>
                      <div className="font-headline text-sm font-bold">{wp.location}</div>
                      <div className="font-label text-xs uppercase tracking-widest text-on-surface-variant mt-1">
                        {wp.spec}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 ml-16 md:ml-0">
                    {wp.checked && wp.result ? (
                      <StatusBadge
                        type={wp.result === "PASS" ? "running" : "error"}
                        label={wp.result}
                      />
                    ) : (
                      <>
                        <button
                          onClick={() => toggleWeldPoint(wp.id, "PASS")}
                          className="px-6 py-3 bg-surface-container text-tertiary font-label text-xs uppercase tracking-widest font-bold hover:bg-tertiary/20 transition-colors border border-tertiary/30 active:scale-95"
                        >
                          합격
                        </button>
                        <button
                          onClick={() => toggleWeldPoint(wp.id, "FAIL")}
                          className="px-6 py-3 bg-surface-container text-error font-label text-xs uppercase tracking-widest font-bold hover:bg-error/20 transition-colors border border-error/30 active:scale-95"
                        >
                          불합격
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Confirm Button */}
          <section className="mb-8">
            <button
              className={`w-full px-8 py-6 font-label text-sm uppercase tracking-widest font-bold transition-colors active:scale-95 ${
                allChecked
                  ? allPass
                    ? "bg-tertiary text-on-tertiary hover:bg-tertiary/80"
                    : "bg-error text-white hover:bg-error/80"
                  : "bg-surface-container text-on-surface-variant/40 cursor-not-allowed"
              }`}
              disabled={!allChecked}
            >
              {allChecked
                ? allPass
                  ? "용접 완료 확인 - 전체 합격"
                  : `${failCount}건 불합격으로 확인 - 검토 필요`
                : `전체 점검항목 완료 (${checkedCount}/${weldPoints.length})`}
            </button>
          </section>
        </>
      )}

      {/* Recent Confirmations */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
            최근 용접 확인 이력
          </span>
          <div className="flex-1 h-px bg-outline-variant/10" />
        </div>
        <div className="space-y-2">
          {RECENT_CONFIRMATIONS.map((c, i) => (
            <div
              key={i}
              className="bg-surface-container-lowest p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-surface-container-highest/20 transition-colors"
            >
              <div className="flex items-center gap-6">
                <span className="font-headline text-sm font-bold tabular-nums">{c.lot}</span>
                <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
                  {c.points} 포인트
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-label text-xs text-on-surface-variant">{c.operator}</span>
                <span className="font-label text-xs tabular-nums text-on-surface-variant">{c.time}</span>
                <StatusBadge
                  type={c.result === "PASS" ? "running" : "error"}
                  label={c.result}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
