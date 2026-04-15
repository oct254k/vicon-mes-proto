"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DataTable } from "@/components/ui/DataTable";

type DieStatus = "사용중" | "대기" | "정비중" | "폐기";

interface Die {
  dieId: string;
  type: string;
  spec: string;
  material: string;
  usageCount: number;
  maxUsage: number;
  status: DieStatus;
  lastChanged: string;
  equipment: string;
}

const DIE_MASTER: Die[] = [
  { dieId: "D-001", type: "원형", spec: "4.0mm", material: "초경합금", usageCount: 12450, maxUsage: 20000, status: "사용중", lastChanged: "2026-04-10", equipment: "신선#1" },
  { dieId: "D-002", type: "원형", spec: "3.2mm", material: "초경합금", usageCount: 18200, maxUsage: 20000, status: "사용중", lastChanged: "2026-04-08", equipment: "신선#1" },
  { dieId: "D-003", type: "이형", spec: "D13", material: "다이아몬드", usageCount: 8900, maxUsage: 15000, status: "사용중", lastChanged: "2026-04-12", equipment: "신선#2" },
  { dieId: "D-004", type: "원형", spec: "5.0mm", material: "초경합금", usageCount: 5600, maxUsage: 20000, status: "대기", lastChanged: "2026-04-05", equipment: "-" },
  { dieId: "D-005", type: "이형", spec: "D16", material: "초경합금", usageCount: 14800, maxUsage: 15000, status: "정비중", lastChanged: "2026-04-13", equipment: "-" },
  { dieId: "D-006", type: "이형", spec: "D10", material: "다이아몬드", usageCount: 15000, maxUsage: 15000, status: "폐기", lastChanged: "2026-04-01", equipment: "-" },
  { dieId: "D-007", type: "원형", spec: "4.0mm", material: "초경합금", usageCount: 320, maxUsage: 20000, status: "대기", lastChanged: "2026-04-14", equipment: "-" },
  { dieId: "D-008", type: "이형", spec: "D19", material: "초경합금", usageCount: 7200, maxUsage: 15000, status: "사용중", lastChanged: "2026-04-11", equipment: "신선#3" },
];

const CHANGE_HISTORY = [
  { date: "2026-04-14", time: "14:30", dieId: "D-007", action: "입고", equipment: "-", operator: "정대한", note: "신규 입고" },
  { date: "2026-04-13", time: "09:15", dieId: "D-005", action: "정비요청", equipment: "신선#2", operator: "이영희", note: "마모 한계 근접" },
  { date: "2026-04-12", time: "07:00", dieId: "D-003", action: "교체", equipment: "신선#2", operator: "김철수", note: "정기 교체" },
  { date: "2026-04-10", time: "06:45", dieId: "D-001", action: "교체", equipment: "신선#1", operator: "박민수", note: "정기 교체" },
  { date: "2026-04-08", time: "08:20", dieId: "D-002", action: "교체", equipment: "신선#1", operator: "김철수", note: "마모 교체" },
  { date: "2026-04-01", time: "16:00", dieId: "D-006", action: "폐기", equipment: "-", operator: "정대한", note: "수명 만료" },
];

const STATUS_MAP: Record<DieStatus, { type: "running" | "idle" | "warning" | "error"; label: string }> = {
  "사용중": { type: "running", label: "사용중" },
  "대기": { type: "idle", label: "대기" },
  "정비중": { type: "warning", label: "정비중" },
  "폐기": { type: "error", label: "폐기" },
};

export default function P1DiePage() {
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [searchId, setSearchId] = useState("");

  const filteredDies = DIE_MASTER.filter((die) => {
    if (filterType && die.type !== filterType) return false;
    if (filterStatus && die.status !== filterStatus) return false;
    if (searchId && !die.dieId.toLowerCase().includes(searchId.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-7xl">
      <PageHeader
        title="다이"
        accent="관리"
        nodeRef="SCR-P1-006"
        status="ONLINE"
      />

      {/* Filters */}
      <section className="bg-surface-container-lowest p-6 mb-6">
        <FieldHeader title="필터" moduleRef="MOD-DIE-01" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">
              다이 ID 검색
            </label>
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="D-XXX"
              className="w-full bg-surface-container border border-outline-variant/20 px-4 py-3 text-sm font-headline text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-primary-accent"
            />
          </div>
          <div>
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">
              유형
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full bg-surface-container border border-outline-variant/20 px-4 py-3 text-sm font-headline text-on-surface focus:outline-none focus:border-primary-accent appearance-none cursor-pointer"
            >
              <option value="">전체</option>
              <option value="원형">원형</option>
              <option value="이형">이형</option>
            </select>
          </div>
          <div>
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">
              상태
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full bg-surface-container border border-outline-variant/20 px-4 py-3 text-sm font-headline text-on-surface focus:outline-none focus:border-primary-accent appearance-none cursor-pointer"
            >
              <option value="">전체</option>
              <option value="사용중">사용중</option>
              <option value="대기">대기</option>
              <option value="정비중">정비중</option>
              <option value="폐기">폐기</option>
            </select>
          </div>
          <div className="flex items-end gap-2">
            <button className="bg-primary-accent px-6 py-3 font-label text-xs uppercase tracking-widest font-bold text-on-primary-container hover:bg-primary-accent/80 transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-base">add</span>
              다이 추가
            </button>
          </div>
        </div>
      </section>

      {/* Die Master Table */}
      <section className="bg-surface-container-lowest mb-6">
        <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-xs uppercase tracking-widest">
            다이 마스터 데이터
            <span className="opacity-30 font-light ml-2">| {filteredDies.length} 건</span>
          </h3>
          <span className="material-symbols-outlined text-sm cursor-pointer hover:text-primary-accent">refresh</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container border-b border-outline-variant/10">
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-60">다이 ID</th>
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-60">유형</th>
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-60">규격</th>
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-60">자재</th>
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-60">사용횟수</th>
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-60">수명</th>
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-60">상태</th>
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-60">설비</th>
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-60">최종 교체일</th>
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-60">작업</th>
              </tr>
            </thead>
            <tbody className="font-headline text-sm">
              {filteredDies.map((die) => {
                const lifePercent = Math.round((die.usageCount / die.maxUsage) * 100);
                const isWarning = lifePercent >= 90;
                return (
                  <tr key={die.dieId} className="border-b border-outline-variant/5 hover:bg-surface-container-highest/20 transition-colors">
                    <td className="px-4 py-2 tabular-nums font-bold">{die.dieId}</td>
                    <td className="px-4 py-2">{die.type}</td>
                    <td className="px-4 py-2 tabular-nums">{die.spec}</td>
                    <td className="px-4 py-2">{die.material}</td>
                    <td className="px-4 py-2 tabular-nums">{die.usageCount.toLocaleString()} / {die.maxUsage.toLocaleString()}</td>
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-surface-container-high overflow-hidden">
                          <div
                            className={`h-full ${isWarning ? "bg-error" : lifePercent >= 70 ? "bg-[#f59e0b]" : "bg-tertiary"}`}
                            style={{ width: `${lifePercent}%` }}
                          />
                        </div>
                        <span className={`tabular-nums text-xs font-bold ${isWarning ? "text-error" : ""}`}>{lifePercent}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <StatusBadge type={STATUS_MAP[die.status].type} label={STATUS_MAP[die.status].label} />
                    </td>
                    <td className="px-4 py-2">{die.equipment}</td>
                    <td className="px-4 py-2 tabular-nums">{die.lastChanged}</td>
                    <td className="px-4 py-2">
                      <div className="flex gap-1">
                        <button className="p-1 hover:text-primary-accent transition-colors" title="수정">
                          <span className="material-symbols-outlined text-sm">edit</span>
                        </button>
                        <button className="p-1 hover:text-tertiary transition-colors" title="변경">
                          <span className="material-symbols-outlined text-sm">swap_horiz</span>
                        </button>
                        <button className="p-1 hover:text-error transition-colors" title="삭제">
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Die Change History */}
      <DataTable
        title="다이 변경 이력"
        columns={[
          { key: "date", label: "일자" },
          { key: "time", label: "시간" },
          { key: "dieId", label: "다이 ID" },
          { key: "action", label: "작업" },
          { key: "equipment", label: "설비" },
          { key: "operator", label: "작업자" },
          { key: "note", label: "비고" },
        ]}
        data={CHANGE_HISTORY}
        bufferCount={CHANGE_HISTORY.length}
      />

      {/* Footer */}
      <footer className="mt-6 bg-surface-container p-4 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-6">
          <StatusBadge type="running" label="다이 관리" />
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">
            사용중: <span className="text-tertiary tabular-nums font-bold">04</span>
          </span>
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">
            대기: <span className="text-on-surface tabular-nums font-bold">02</span>
          </span>
        </div>
        <div className="flex items-center gap-6">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">
            정비중: <span className="text-[#f59e0b] tabular-nums font-bold">01</span>
          </span>
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">
            알람: <span className="text-error tabular-nums font-bold">01</span> (수명 &gt;90%)
          </span>
        </div>
      </footer>
    </div>
  );
}
