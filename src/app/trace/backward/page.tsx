"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DataTable } from "@/components/ui/DataTable";

const MOCK_BACKWARD_TABLE = [
  { step: 1, target: "FIN-2026-0411-001", source: "P4-2026-0409-002", process: "성형", date: "2026-04-09", qty: "4,700", quality: "PASS" },
  { step: 2, target: "P4-2026-0409-002", source: "P3-2026-0407-001", process: "도금", date: "2026-04-07", qty: "4,750", quality: "PASS" },
  { step: 3, target: "P3-2026-0407-001", source: "P2-2026-0405-003", process: "열처리", date: "2026-04-05", qty: "4,800", quality: "PASS" },
  { step: 4, target: "P2-2026-0405-003", source: "P1-2026-0403-007", process: "신선", date: "2026-04-03", qty: "4,850", quality: "WARN" },
  { step: 5, target: "P1-2026-0403-007", source: "RM-2026-0401-012", process: "원자재", date: "2026-04-01", qty: "5,000", quality: "PASS" },
];

interface BacktrackNode {
  lotId: string;
  process: string;
  date: string;
  qty: number;
  quality: "PASS" | "WARN" | "FAIL";
}

const MOCK_BACKTRACK_FLOW: BacktrackNode[] = [
  { lotId: "FIN-2026-0411-001", process: "최종 제품", date: "2026-04-11", qty: 4680, quality: "PASS" },
  { lotId: "P4-2026-0409-002", process: "성형", date: "2026-04-09", qty: 4700, quality: "PASS" },
  { lotId: "P3-2026-0407-001", process: "도금", date: "2026-04-07", qty: 4750, quality: "PASS" },
  { lotId: "P2-2026-0405-003", process: "열처리", date: "2026-04-05", qty: 4800, quality: "PASS" },
  { lotId: "P1-2026-0403-007", process: "신선", date: "2026-04-03", qty: 4850, quality: "WARN" },
  { lotId: "RM-2026-0401-012", process: "원자재", date: "2026-04-01", qty: 5000, quality: "PASS" },
];

const QUALITY_BADGE: Record<string, { type: "running" | "warning" | "error"; label: string }> = {
  PASS: { type: "running", label: "합격" },
  WARN: { type: "warning", label: "경고" },
  FAIL: { type: "error", label: "불합격" },
};

export default function BackwardTracePage() {
  const [searchLot, setSearchLot] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    if (searchLot.trim()) {
      setSearched(true);
    }
  };

  return (
    <div className="max-w-5xl">
      <PageHeader
        title="역방향"
        accent="추적"
        description="최종 제품 LOT가 어떤 원자재로부터 만들어졌는지 역방향으로 추적합니다. 품질 이슈 추적에 활용됩니다."
        nodeRef="SCR-TRC-003"
        status="ONLINE"
      />

      {/* Search Section */}
      <section className="bg-surface-container-lowest p-6 mb-6">
        <FieldHeader title="최종 제품 LOT 입력" moduleRef="MOD-BWD-01" />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8">
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">
              최종 제품 LOT
            </label>
            <div className="flex gap-0">
              <input
                type="text"
                value={searchLot}
                onChange={(e) => setSearchLot(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="최종 제품 LOT를 입력하세요 (예: FIN-2026-0411-001)"
                className="flex-1 bg-surface-container border border-outline-variant/20 px-4 py-3 text-sm font-headline text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-primary-accent"
              />
              <button
                onClick={handleSearch}
                className="bg-primary-accent px-6 py-3 font-label text-xs uppercase tracking-widest font-bold text-on-primary-container hover:bg-primary-accent/80 transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">arrow_back</span>
                추적
              </button>
            </div>
          </div>
          <div className="md:col-span-4 flex items-end">
            <StatusBadge type={searched ? "running" : "idle"} label={searched ? "추적완료" : "대기"} />
          </div>
        </div>
      </section>

      {searched && (
        <>
          {/* Reverse Flow Visualization */}
          <section className="bg-surface-container-lowest p-6 mb-6">
            <FieldHeader title="역방향 추적 경로" moduleRef="BACKTRACK-VIZ" />
            <div className="space-y-0">
              {MOCK_BACKTRACK_FLOW.map((node, i) => {
                const qBadge = QUALITY_BADGE[node.quality];
                const hasDefect = node.quality !== "PASS";
                return (
                  <div key={node.lotId}>
                    <div className={`flex items-center gap-4 p-4 border-l-4 ${hasDefect ? "border-[#f59e0b] bg-[#f59e0b]/5" : "border-outline-variant/30 bg-surface-container"}`}>
                      {/* Step indicator */}
                      <div className="w-8 h-8 flex items-center justify-center bg-surface-container-lowest font-label text-xs font-bold tabular-nums shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </div>

                      {/* Node info */}
                      <div className="flex-1 grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4">
                        <div>
                          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block">LOT 번호</span>
                          <span className="font-headline text-xs font-bold tabular-nums">{node.lotId}</span>
                        </div>
                        <div>
                          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block">공정</span>
                          <span className="font-headline text-xs">{node.process}</span>
                        </div>
                        <div>
                          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block">일자</span>
                          <span className="font-headline text-xs tabular-nums">{node.date}</span>
                        </div>
                        <div>
                          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block">수량</span>
                          <span className="font-headline text-xs tabular-nums font-bold">{node.qty.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block">품질</span>
                          <StatusBadge type={qBadge.type} label={qBadge.label} />
                        </div>
                      </div>

                      {/* Defect flag */}
                      {hasDefect && (
                        <div className="shrink-0">
                          <span className="material-symbols-outlined text-[#f59e0b] text-lg">warning</span>
                        </div>
                      )}
                    </div>
                    {i < MOCK_BACKTRACK_FLOW.length - 1 && (
                      <div className="ml-[22px] h-4 border-l-2 border-outline-variant/20" />
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Defect Summary */}
          <section className="bg-surface-container-lowest p-6 mb-6 border-l-4 border-[#f59e0b]">
            <FieldHeader title="품질 플래그" moduleRef="QC-FLAG" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">플래그 LOT</span>
                <span className="font-headline text-sm font-bold tabular-nums">P1-2026-0403-007</span>
              </div>
              <div>
                <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">이슈</span>
                <span className="font-headline text-sm">와이어 직경 편차 +0.02mm</span>
              </div>
              <div>
                <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">처리결과</span>
                <StatusBadge type="warning" label="특채" />
              </div>
            </div>
          </section>

          {/* Trace Table */}
          <DataTable
            title="상위 추적 상세"
            columns={[
              { key: "step", label: "단계" },
              { key: "target", label: "현재 LOT" },
              { key: "source", label: "원자재 LOT" },
              { key: "process", label: "공정" },
              { key: "date", label: "일자" },
              { key: "qty", label: "수량" },
              { key: "quality", label: "품질" },
            ]}
            data={MOCK_BACKWARD_TABLE}
            bufferCount={MOCK_BACKWARD_TABLE.length}
          />
        </>
      )}

      {/* Footer */}
      <footer className="mt-6 bg-surface-container p-4 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-tertiary inline-block" />
            <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">추적 엔진 온라인</span>
          </div>
          <StatusBadge type="running" label="활성" />
        </div>
        <div className="flex items-center gap-6">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">
            상위 LOT: <span className="text-on-surface tabular-nums font-bold">05</span>
          </span>
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">
            플래그: <span className="text-[#f59e0b] tabular-nums font-bold">01</span>
          </span>
        </div>
      </footer>
    </div>
  );
}
