"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

interface TreeNode {
  lotId: string;
  process: string;
  date: string;
  qty: number;
  children: TreeNode[];
}

const MOCK_TREE: TreeNode = {
  lotId: "RM-2026-0401-012",
  process: "원자재",
  date: "2026-04-01",
  qty: 5000,
  children: [
    {
      lotId: "P1-2026-0403-007",
      process: "신선",
      date: "2026-04-03",
      qty: 4850,
      children: [
        {
          lotId: "P2-2026-0405-003",
          process: "열처리",
          date: "2026-04-05",
          qty: 4800,
          children: [
            {
              lotId: "P3-2026-0407-001",
              process: "도금",
              date: "2026-04-07",
              qty: 4750,
              children: [
                {
                  lotId: "P4-2026-0409-002",
                  process: "성형",
                  date: "2026-04-09",
                  qty: 4700,
                  children: [
                    {
                      lotId: "FIN-2026-0411-001",
                      process: "최종 제품",
                      date: "2026-04-11",
                      qty: 4680,
                      children: [],
                    },
                    {
                      lotId: "FIN-2026-0411-002",
                      process: "최종 제품",
                      date: "2026-04-11",
                      qty: 4520,
                      children: [],
                    },
                  ],
                },
              ],
            },
            {
              lotId: "P3-2026-0407-004",
              process: "도금",
              date: "2026-04-08",
              qty: 2400,
              children: [
                {
                  lotId: "P4-2026-0410-001",
                  process: "성형",
                  date: "2026-04-10",
                  qty: 2380,
                  children: [
                    {
                      lotId: "FIN-2026-0412-003",
                      process: "최종 제품",
                      date: "2026-04-12",
                      qty: 2350,
                      children: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const PROCESS_COLORS: Record<string, string> = {
  "원자재": "border-on-surface-variant",
  "신선": "border-primary-accent",
  "열처리": "border-[#f59e0b]",
  "도금": "border-tertiary",
  "성형": "border-primary",
  "최종 제품": "border-tertiary",
};

function TreeNodeComponent({ node, isLast = false }: { node: TreeNode; isLast?: boolean }) {
  const borderColor = PROCESS_COLORS[node.process] || "border-outline-variant";

  return (
    <div className="relative">
      <div className={`bg-surface-container-lowest border-l-4 ${borderColor} p-4 mb-0`}>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <span className="font-headline text-sm font-bold tabular-nums block">{node.lotId}</span>
            <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">{node.process}</span>
          </div>
          <div className="flex gap-6">
            <div className="text-right">
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block">일자</span>
              <span className="font-headline text-xs tabular-nums">{node.date}</span>
            </div>
            <div className="text-right">
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block">수량</span>
              <span className="font-headline text-xs tabular-nums font-bold">{node.qty.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
      {node.children.length > 0 && (
        <div className="ml-6 md:ml-10 border-l-2 border-outline-variant/20 pl-4 md:pl-6 pt-3 pb-1">
          {node.children.map((child, i) => (
            <div key={child.lotId} className="mb-3">
              {/* Connector line */}
              <div className="relative">
                <div className="absolute -left-[18px] md:-left-[26px] top-4 w-4 md:w-6 border-t-2 border-outline-variant/20" />
              </div>
              <TreeNodeComponent node={child} isLast={i === node.children.length - 1} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function GenealogyPage() {
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
        title="LOT"
        accent="계보 조회"
        description="LOT 번호를 입력하여 원자재부터 최종 제품까지의 계보(족보)를 트리 형태로 조회합니다."
        nodeRef="SCR-TRC-001"
        status="ONLINE"
      />

      {/* Search Section */}
      <section className="bg-surface-container-lowest p-6 mb-6">
        <FieldHeader title="LOT 검색" moduleRef="MOD-TRACE-01" />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8">
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">
              LOT 번호
            </label>
            <div className="flex gap-0">
              <input
                type="text"
                value={searchLot}
                onChange={(e) => setSearchLot(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="LOT ID를 입력하세요 (예: RM-2026-0401-012)"
                className="flex-1 bg-surface-container border border-outline-variant/20 px-4 py-3 text-sm font-headline text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-primary-accent"
              />
              <button
                onClick={handleSearch}
                className="bg-primary-accent px-6 py-3 font-label text-xs uppercase tracking-widest font-bold text-on-primary-container hover:bg-primary-accent/80 transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">search</span>
                추적
              </button>
            </div>
          </div>
          <div className="md:col-span-4 flex items-end">
            <StatusBadge type={searched ? "running" : "idle"} label={searched ? "추적완료" : "대기"} />
          </div>
        </div>
      </section>

      {/* Legend */}
      <section className="bg-surface-container p-4 mb-6 flex flex-wrap gap-6">
        {Object.entries(PROCESS_COLORS).map(([process, cls]) => (
          <div key={process} className="flex items-center gap-2">
            <div className={`w-3 h-3 border-l-4 ${cls}`} />
            <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">{process}</span>
          </div>
        ))}
      </section>

      {/* Tree Visualization */}
      {searched && (
        <section className="mb-6">
          <FieldHeader title="계보 트리" moduleRef="TREE-VIEW" />
          <TreeNodeComponent node={MOCK_TREE} />
        </section>
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
          깊이: <span className="text-on-surface tabular-nums font-bold">6</span> 레벨
        </span>
      </footer>
    </div>
  );
}
