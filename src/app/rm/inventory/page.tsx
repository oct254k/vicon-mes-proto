"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";

const TYPE_OPTIONS = ["전체", "원형", "이형"];
const SPEC_OPTIONS = ["전체", "5.5mm", "6.0mm", "8.0mm", "10.0mm", "12.0mm"];
const STATUS_OPTIONS = ["전체", "INSPECTED", "PENDING", "RELEASED", "REJECTED", "IN-USE"];

const INVENTORY_COLUMNS = [
  { key: "lot", label: "LOT 번호" },
  { key: "supplier", label: "공급업체" },
  { key: "type", label: "종류" },
  { key: "spec", label: "규격" },
  { key: "qty", label: "수량 (EA)" },
  { key: "weight", label: "중량 (kg)" },
  { key: "regDate", label: "입고일" },
  { key: "status", label: "상태" },
  { key: "location", label: "위치" },
];

const INVENTORY_DATA = [
  { lot: "RM-260415-001", supplier: "POSCO Steel", type: "원형", spec: "5.5mm", qty: 120, weight: "3,240.5", regDate: "2026-04-15", status: "INSPECTED", location: "WH-A-01-03" },
  { lot: "RM-260415-002", supplier: "Hyundai Steel", type: "이형", spec: "8.0mm", qty: 80, weight: "4,120.0", regDate: "2026-04-15", status: "PENDING", location: "WH-A-02-01" },
  { lot: "RM-260414-008", supplier: "SeAH Besteel", type: "원형", spec: "6.0mm", qty: 150, weight: "5,100.0", regDate: "2026-04-14", status: "RELEASED", location: "WH-B-01-02" },
  { lot: "RM-260414-007", supplier: "Dongkuk Steel", type: "이형", spec: "10.0mm", qty: 60, weight: "3,780.0", regDate: "2026-04-14", status: "INSPECTED", location: "WH-A-03-01" },
  { lot: "RM-260414-006", supplier: "POSCO Steel", type: "원형", spec: "5.5mm", qty: 200, weight: "5,400.0", regDate: "2026-04-14", status: "IN-USE", location: "WH-B-02-04" },
  { lot: "RM-260413-012", supplier: "Kiswire", type: "원형", spec: "12.0mm", qty: 90, weight: "6,210.0", regDate: "2026-04-13", status: "RELEASED", location: "WH-A-01-05" },
  { lot: "RM-260413-011", supplier: "Hyundai Steel", type: "이형", spec: "8.0mm", qty: 110, weight: "5,610.0", regDate: "2026-04-13", status: "REJECTED", location: "WH-C-01-01" },
  { lot: "RM-260412-009", supplier: "Dongkuk Steel", type: "원형", spec: "6.0mm", qty: 180, weight: "6,120.0", regDate: "2026-04-12", status: "IN-USE", location: "WH-B-03-02" },
];

export default function RMInventoryPage() {
  const [typeFilter, setTypeFilter] = useState("전체");
  const [specFilter, setSpecFilter] = useState("전체");
  const [statusFilter, setStatusFilter] = useState("전체");
  const [lotSearch, setLotSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("2026-04-01");
  const [dateTo, setDateTo] = useState("2026-04-15");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const filtered = INVENTORY_DATA.filter((row) => {
    if (typeFilter !== "전체" && row.type !== typeFilter) return false;
    if (specFilter !== "전체" && row.spec !== specFilter) return false;
    if (statusFilter !== "전체" && row.status !== statusFilter) return false;
    if (lotSearch && !row.lot.toLowerCase().includes(lotSearch.toLowerCase())) return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const statusColor = (s: string) => {
    switch (s) {
      case "INSPECTED": return "running" as const;
      case "RELEASED": return "running" as const;
      case "PENDING": return "warning" as const;
      case "REJECTED": return "error" as const;
      case "IN-USE": return "idle" as const;
      default: return "idle" as const;
    }
  };

  return (
    <div>
      <PageHeader
        title="원자재"
        accent="재고 현황"
        nodeRef="SCR-RM-003"
        status="CALIBRATED"
      />

      {/* Filter Bar */}
      <section className="bg-surface-container-lowest p-6 mb-6">
        <FieldHeader title="필터 조건" moduleRef="MOD-RM-INV-FLT" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div>
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
              종류
            </label>
            <select
              value={typeFilter}
              onChange={(e) => { setTypeFilter(e.target.value); setCurrentPage(1); }}
              className="w-full bg-surface-container p-2.5 text-on-surface font-headline text-xs border border-outline-variant/20 focus:border-primary-accent focus:outline-none"
            >
              {TYPE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
              규격
            </label>
            <select
              value={specFilter}
              onChange={(e) => { setSpecFilter(e.target.value); setCurrentPage(1); }}
              className="w-full bg-surface-container p-2.5 text-on-surface font-headline text-xs border border-outline-variant/20 focus:border-primary-accent focus:outline-none"
            >
              {SPEC_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
              시작일
            </label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full bg-surface-container p-2.5 text-on-surface font-headline text-xs border border-outline-variant/20 focus:border-primary-accent focus:outline-none"
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
              className="w-full bg-surface-container p-2.5 text-on-surface font-headline text-xs border border-outline-variant/20 focus:border-primary-accent focus:outline-none"
            />
          </div>
          <div>
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
              LOT 검색
            </label>
            <input
              type="text"
              value={lotSearch}
              onChange={(e) => { setLotSearch(e.target.value); setCurrentPage(1); }}
              placeholder="RM-260415-..."
              className="w-full bg-surface-container p-2.5 text-on-surface font-headline text-xs border border-outline-variant/20 focus:border-primary-accent focus:outline-none tabular-nums"
            />
          </div>
          <div>
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
              상태
            </label>
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              className="w-full bg-surface-container p-2.5 text-on-surface font-headline text-xs border border-outline-variant/20 focus:border-primary-accent focus:outline-none"
            >
              {STATUS_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        </div>
      </section>

      {/* Action Bar */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
          총 <span className="tabular-nums text-on-surface">{filtered.length}</span> 건
        </span>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-surface-container text-on-surface-variant px-4 py-2 font-label text-xs uppercase tracking-widest font-bold border border-outline-variant/20 hover:border-primary-accent transition-colors">
            <span className="material-symbols-outlined text-sm">download</span>
            엑셀 다운로드
          </button>
          <button className="flex items-center gap-2 bg-surface-container text-on-surface-variant px-4 py-2 font-label text-xs uppercase tracking-widest font-bold border border-outline-variant/20 hover:border-primary-accent transition-colors">
            <span className="material-symbols-outlined text-sm">print</span>
            인쇄
          </button>
        </div>
      </div>

      {/* Data Table - Custom rendered for status badges */}
      <section className="bg-surface-container-lowest">
        <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-xs uppercase tracking-widest">
            재고 현황{" "}
            <span className="opacity-30 font-light ml-2">
              | 버퍼: {String(filtered.length).padStart(3, "0")} 건
            </span>
          </h3>
          <span className="material-symbols-outlined text-sm cursor-pointer hover:text-primary-accent">
            refresh
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container border-b border-outline-variant/10">
                {INVENTORY_COLUMNS.map((col) => (
                  <th
                    key={col.key}
                    className="p-4 font-label uppercase tracking-widest text-xs opacity-60"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="font-headline text-sm">
              {paginated.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-outline-variant/5 hover:bg-surface-container-highest/20 transition-colors"
                >
                  <td className="px-4 py-2 tabular-nums text-primary">{row.lot}</td>
                  <td className="px-4 py-2">{row.supplier}</td>
                  <td className="px-4 py-2">{row.type}</td>
                  <td className="px-4 py-2 tabular-nums">{row.spec}</td>
                  <td className="px-4 py-2 tabular-nums">{row.qty}</td>
                  <td className="px-4 py-2 tabular-nums">{row.weight}</td>
                  <td className="px-4 py-2 tabular-nums">{row.regDate}</td>
                  <td className="px-4 py-2">
                    <StatusBadge type={statusColor(row.status)} label={row.status} />
                  </td>
                  <td className="px-4 py-2 tabular-nums text-on-surface-variant">{row.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">
          Page <span className="tabular-nums">{currentPage}</span> of <span className="tabular-nums">{totalPages}</span>
        </span>
        <div className="flex gap-1">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 bg-surface-container text-on-surface-variant font-label text-xs uppercase tracking-widest border border-outline-variant/20 hover:border-primary-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            이전
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-2 font-label text-xs uppercase tracking-widest tabular-nums border transition-colors ${
                page === currentPage
                  ? "bg-primary-accent text-on-primary border-primary-accent"
                  : "bg-surface-container text-on-surface-variant border-outline-variant/20 hover:border-primary-accent"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 bg-surface-container text-on-surface-variant font-label text-xs uppercase tracking-widest border border-outline-variant/20 hover:border-primary-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
