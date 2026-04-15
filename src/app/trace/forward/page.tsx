"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DataTable } from "@/components/ui/DataTable";

interface FlowNode {
  lotId: string;
  process: string;
  date: string;
  qty: number;
}

const MOCK_FORWARD_TRACE: FlowNode[] = [
  { lotId: "RM-2026-0401-012", process: "원자재", date: "2026-04-01", qty: 5000 },
  { lotId: "P1-2026-0403-007", process: "신선", date: "2026-04-03", qty: 4850 },
  { lotId: "P2-2026-0405-003", process: "열처리", date: "2026-04-05", qty: 4800 },
  { lotId: "P3-2026-0407-001", process: "도금", date: "2026-04-07", qty: 4750 },
  { lotId: "P4-2026-0409-002", process: "성형", date: "2026-04-09", qty: 4700 },
  { lotId: "FIN-2026-0411-001", process: "최종 제품", date: "2026-04-11", qty: 4680 },
];

const MOCK_DOWNSTREAM_TABLE = [
  { step: 1, source: "RM-2026-0401-012", target: "P1-2026-0403-007", process: "신선", date: "2026-04-03", qty: "4,850", yield: "97.0%" },
  { step: 2, source: "P1-2026-0403-007", target: "P2-2026-0405-003", process: "열처리", date: "2026-04-05", qty: "4,800", yield: "98.9%" },
  { step: 3, source: "P2-2026-0405-003", target: "P3-2026-0407-001", process: "도금", date: "2026-04-07", qty: "4,750", yield: "98.9%" },
  { step: 4, source: "P3-2026-0407-001", target: "P4-2026-0409-002", process: "성형", date: "2026-04-09", qty: "4,700", yield: "98.9%" },
  { step: 5, source: "P4-2026-0409-002", target: "FIN-2026-0411-001", process: "최종 조립", date: "2026-04-11", qty: "4,680", yield: "99.5%" },
  { step: 6, source: "P2-2026-0405-003", target: "P3-2026-0407-004", process: "도금", date: "2026-04-08", qty: "2,400", yield: "98.4%" },
  { step: 7, source: "P3-2026-0407-004", target: "P4-2026-0410-001", process: "성형", date: "2026-04-10", qty: "2,380", yield: "99.1%" },
  { step: 8, source: "P4-2026-0410-001", target: "FIN-2026-0412-003", process: "최종 조립", date: "2026-04-12", qty: "2,350", yield: "98.7%" },
];

const PROCESS_COLORS: Record<string, string> = {
  "원자재": "bg-on-surface-variant",
  "신선": "bg-primary-accent",
  "열처리": "bg-[#f59e0b]",
  "도금": "bg-tertiary",
  "성형": "bg-primary",
  "최종 제품": "bg-tertiary",
};

export default function ForwardTracePage() {
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
        title="순방향"
        accent="추적"
        description="원자재 LOT로부터 어떤 제품이 생산되었는지 순방향으로 추적합니다."
        nodeRef="SCR-TRC-002"
        status="ONLINE"
      />

      {/* Search Section */}
      <section className="bg-surface-container-lowest p-6 mb-6">
        <FieldHeader title="원자재 LOT 입력" moduleRef="MOD-FWD-01" />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8">
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">
              원자재 LOT
            </label>
            <div className="flex gap-0">
              <input
                type="text"
                value={searchLot}
                onChange={(e) => setSearchLot(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="원자재 LOT ID를 입력하세요 (예: RM-2026-0401-012)"
                className="flex-1 bg-surface-container border border-outline-variant/20 px-4 py-3 text-sm font-headline text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-primary-accent"
              />
              <button
                onClick={handleSearch}
                className="bg-primary-accent px-6 py-3 font-label text-xs uppercase tracking-widest font-bold text-on-primary-container hover:bg-primary-accent/80 transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">arrow_forward</span>
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
          {/* Visual Flow Diagram */}
          <section className="bg-surface-container-lowest p-6 mb-6">
            <FieldHeader title="순방향 흐름" moduleRef="FLOW-VIZ" />
            <div className="flex flex-col md:flex-row items-stretch gap-0 overflow-x-auto pb-2">
              {MOCK_FORWARD_TRACE.map((node, i) => {
                const bgColor = PROCESS_COLORS[node.process] || "bg-outline-variant";
                return (
                  <div key={node.lotId} className="flex items-center">
                    <div className="bg-surface-container p-4 min-w-[160px] border border-outline-variant/10">
                      <div className={`w-full h-1 ${bgColor} mb-3`} />
                      <span className="font-headline text-xs font-bold tabular-nums block">{node.lotId}</span>
                      <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mt-1">{node.process}</span>
                      <div className="flex justify-between mt-2">
                        <span className="font-headline text-xs tabular-nums opacity-50">{node.date}</span>
                        <span className="font-headline text-xs tabular-nums font-bold">{node.qty.toLocaleString()}</span>
                      </div>
                    </div>
                    {i < MOCK_FORWARD_TRACE.length - 1 && (
                      <div className="hidden md:flex items-center px-1">
                        <div className="w-6 border-t-2 border-primary-accent" />
                        <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[6px] border-l-primary-accent" />
                      </div>
                    )}
                    {i < MOCK_FORWARD_TRACE.length - 1 && (
                      <div className="flex md:hidden items-center justify-center py-1">
                        <div className="h-4 border-l-2 border-primary-accent" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Trace Table */}
          <DataTable
            title="하위 추적 경로"
            columns={[
              { key: "step", label: "단계" },
              { key: "source", label: "원자재 LOT" },
              { key: "target", label: "대상 LOT" },
              { key: "process", label: "공정" },
              { key: "date", label: "일자" },
              { key: "qty", label: "수량" },
              { key: "yield", label: "수율" },
            ]}
            data={MOCK_DOWNSTREAM_TABLE}
            bufferCount={MOCK_DOWNSTREAM_TABLE.length}
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
        <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">
          하위 LOT: <span className="text-on-surface tabular-nums font-bold">08</span>
        </span>
      </footer>
    </div>
  );
}
