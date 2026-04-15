"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { DataTable } from "@/components/ui/DataTable";

type AuditEntry = Record<string, string | number>;

const ACTION_TYPES = [
  "전체 액션",
  "로그인",
  "생산 취소",
  "생산 정정",
  "데이터 수정",
  "사용자 관리",
  "시스템 설정",
  "내보내기",
  "승인",
];

const AUDIT_COLUMNS = [
  { key: "timestamp", label: "시간" },
  { key: "user", label: "사용자" },
  { key: "action", label: "액션" },
  { key: "target", label: "대상" },
  { key: "before", label: "변경전" },
  { key: "after", label: "변경후" },
  { key: "ip", label: "IP 주소" },
];

const AUDIT_DATA: AuditEntry[] = [
  { timestamp: "2026-04-15 10:02:11", user: "Kim.JH", action: "생산 취소", target: "WO-260415-010", before: "Status: ACTIVE", after: "Status: CANCELLED", ip: "192.168.1.45" },
  { timestamp: "2026-04-15 09:58:33", user: "Park.SY", action: "생산 정정", target: "WO-260415-008", before: "Qty: 2,500", after: "Qty: 2,200", ip: "192.168.1.32" },
  { timestamp: "2026-04-15 09:45:22", user: "Lee.MJ", action: "데이터 수정", target: "EQ-FRM-002", before: "Status: RUNNING", after: "Status: STOPPED", ip: "192.168.1.28" },
  { timestamp: "2026-04-15 09:30:15", user: "Choi.WS", action: "승인", target: "WO-260415-012", before: "Status: PENDING", after: "Status: APPROVED", ip: "192.168.1.10" },
  { timestamp: "2026-04-15 09:22:08", user: "Kim.JH", action: "생산 정정", target: "WO-260415-007", before: "Deadline: 2026-04-15", after: "Deadline: 2026-04-16", ip: "192.168.1.45" },
  { timestamp: "2026-04-15 09:15:44", user: "System", action: "시스템 설정", target: "SHIFT-SCHEDULE", before: "Shift A: 06:00-14:00", after: "Shift A: 06:00-14:30", ip: "127.0.0.1" },
  { timestamp: "2026-04-15 09:10:02", user: "Park.SY", action: "내보내기", target: "RPT-DAILY-0415", before: "-", after: "Exported PDF", ip: "192.168.1.32" },
  { timestamp: "2026-04-15 08:55:18", user: "Han.YR", action: "로그인", target: "SESSION-4821", before: "-", after: "Authenticated", ip: "192.168.1.55" },
  { timestamp: "2026-04-15 08:42:30", user: "Kim.JH", action: "데이터 수정", target: "RM-260415-002", before: "QC: PENDING", after: "QC: INSPECTED", ip: "192.168.1.45" },
  { timestamp: "2026-04-15 08:30:05", user: "Lee.MJ", action: "생산 취소", target: "WO-260414-022", before: "Status: ACTIVE", after: "Status: CANCELLED (Material shortage)", ip: "192.168.1.28" },
  { timestamp: "2026-04-15 08:15:42", user: "Choi.WS", action: "사용자 관리", target: "USR-TEMP-003", before: "Role: Operator", after: "Role: Supervisor", ip: "192.168.1.10" },
  { timestamp: "2026-04-15 08:00:00", user: "System", action: "시스템 설정", target: "SHIFT-CHANGE", before: "Shift A", after: "Shift B", ip: "127.0.0.1" },
];

export default function AuditLogPage() {
  const [dateFrom, setDateFrom] = useState("2026-04-15");
  const [dateTo, setDateTo] = useState("2026-04-15");
  const [userFilter, setUserFilter] = useState("");
  const [actionFilter, setActionFilter] = useState("전체 액션");

  const filtered = AUDIT_DATA.filter((entry) => {
    if (userFilter && !String(entry.user).toLowerCase().includes(userFilter.toLowerCase())) return false;
    if (actionFilter !== "전체 액션" && entry.action !== actionFilter) return false;
    return true;
  });

  return (
    <div>
      <PageHeader
        title="감사"
        accent="로그"
        description="시스템 감사 로그를 조회합니다. 사용자별 액션, 변경 전후 값, 실적 취소/정정 이력을 추적합니다."
        nodeRef="SCR-COM-004"
        status="RECORDING"
      />

      {/* Filters */}
      <div className="bg-surface-container-lowest p-6 mb-8">
        <FieldHeader title="검색 필터" moduleRef="MOD-COM-AUD" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
              시작일
            </label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full bg-surface-container p-3 text-on-surface font-headline text-sm border border-outline-variant/20 focus:border-primary-accent focus:outline-none"
            />
          </div>
          <div>
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
              종료일
            </label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full bg-surface-container p-3 text-on-surface font-headline text-sm border border-outline-variant/20 focus:border-primary-accent focus:outline-none"
            />
          </div>
          <div>
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
              사용자
            </label>
            <input
              type="text"
              value={userFilter}
              onChange={(e) => setUserFilter(e.target.value)}
              placeholder="사용자 검색..."
              className="w-full bg-surface-container p-3 text-on-surface font-headline text-sm border border-outline-variant/20 focus:border-primary-accent focus:outline-none"
            />
          </div>
          <div>
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
              액션 유형
            </label>
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="w-full bg-surface-container p-3 text-on-surface font-headline text-sm border border-outline-variant/20 focus:border-primary-accent focus:outline-none"
            >
              {ACTION_TYPES.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full bg-primary-accent text-on-primary p-3 font-label text-xs uppercase tracking-widest font-bold hover:bg-primary-container transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-sm">download</span>
              내보내기
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0 mb-8">
        {[
          { label: "전체 항목", value: filtered.length, color: "text-on-surface" },
          { label: "생산 취소", value: filtered.filter((e) => e.action === "생산 취소").length, color: "text-error" },
          { label: "정정", value: filtered.filter((e) => e.action === "생산 정정").length, color: "text-[#f59e0b]" },
          { label: "사용자 수", value: new Set(filtered.map((e) => e.user)).size, color: "text-tertiary" },
        ].map((card) => (
          <div key={card.label} className="bg-surface-container-lowest p-6 border-l border-outline-variant/10 first:border-l-0">
            <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
              {card.label}
            </span>
            <span className={`text-3xl font-black font-headline tabular-nums ${card.color}`}>
              {card.value}
            </span>
          </div>
        ))}
      </div>

      {/* Audit Table */}
      <DataTable
        title="감사 추적"
        columns={AUDIT_COLUMNS}
        data={filtered}
        bufferCount={filtered.length}
      />

      {/* Version Note */}
      <div className="mt-4 flex items-center gap-2">
        <div className="w-1 h-4 bg-primary-accent" />
        <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">
          v2.1 - 생산 취소/정정 감사 항목 포함
        </span>
      </div>
    </div>
  );
}
