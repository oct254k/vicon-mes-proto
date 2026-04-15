"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";

const ORDER_DATA = [
  { id: "WO-2026-0415-001", vendor: "Samsung Heavy Ind.", product: "Deck Sleeper Type-A", qty: "500", dueDate: "2026-04-22", status: "In Progress", progress: "62%" },
  { id: "WO-2026-0415-002", vendor: "Hyundai E&C", product: "Deck Sleeper Type-B", qty: "300", dueDate: "2026-04-25", status: "Pending", progress: "0%" },
  { id: "WO-2026-0413-004", vendor: "Daewoo E&C", product: "Rail Sleeper RS-200", qty: "1,200", dueDate: "2026-04-20", status: "In Progress", progress: "85%" },
  { id: "WO-2026-0410-002", vendor: "Samsung Heavy Ind.", product: "Deck Sleeper Type-A", qty: "800", dueDate: "2026-04-18", status: "Completed", progress: "100%" },
  { id: "WO-2026-0408-001", vendor: "POSCO E&C", product: "Bridge Deck BD-150", qty: "200", dueDate: "2026-04-16", status: "Delayed", progress: "45%" },
  { id: "WO-2026-0405-003", vendor: "Hyundai E&C", product: "Rail Sleeper RS-200", qty: "600", dueDate: "2026-04-15", status: "Completed", progress: "100%" },
];

const TABLE_COLUMNS = [
  { key: "id", label: "지시 ID" },
  { key: "vendor", label: "외주업체" },
  { key: "product", label: "제품" },
  { key: "qty", label: "수량" },
  { key: "dueDate", label: "납기일" },
  { key: "status", label: "상태" },
  { key: "progress", label: "진행률" },
];

const VENDORS = ["전체", "Samsung Heavy Ind.", "Hyundai E&C", "Daewoo E&C", "POSCO E&C"];
const STATUSES = ["전체", "Pending", "In Progress", "Completed", "Delayed"];

export default function P4WorkOrderPage() {
  const [vendorFilter, setVendorFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = ORDER_DATA.filter((o) => {
    if (vendorFilter !== "전체" && o.vendor !== vendorFilter) return false;
    if (statusFilter !== "전체" && o.status !== statusFilter) return false;
    if (searchQuery && !o.id.toLowerCase().includes(searchQuery.toLowerCase()) && !o.product.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const getStatusType = (status: string) => {
    switch (status) {
      case "Completed": return "running" as const;
      case "In Progress": return "idle" as const;
      case "Delayed": return "error" as const;
      case "Pending": return "warning" as const;
      default: return "idle" as const;
    }
  };

  return (
    <div>
      <PageHeader
        title="조립"
        accent="외주 작업지시"
        nodeRef="P4-WOD-001"
        status="OFFICE"
      />

      {/* Filter Bar */}
      <section className="mb-6">
        <div className="bg-surface-container-lowest p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
                검색
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="지시 ID 또는 제품명..."
                className="w-full bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-3 py-3 text-sm font-headline text-on-surface placeholder:text-on-surface-variant/30 transition-colors"
              />
            </div>

            {/* Vendor Filter */}
            <div>
              <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
                외주업체
              </label>
              <select
                value={vendorFilter}
                onChange={(e) => setVendorFilter(e.target.value)}
                className="w-full bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-3 py-3 text-sm font-headline text-on-surface appearance-none cursor-pointer transition-colors"
              >
                {VENDORS.map((v) => (
                  <option key={v} value={v} className="bg-surface-container">{v}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
                상태
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-3 py-3 text-sm font-headline text-on-surface appearance-none cursor-pointer transition-colors"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s} className="bg-surface-container">{s}</option>
                ))}
              </select>
            </div>

            {/* Create Button */}
            <div className="flex items-end">
              <button
                onClick={() => setShowCreateModal(true)}
                className="w-full bg-primary-accent text-white px-6 py-3 font-label text-xs uppercase tracking-widest font-bold hover:bg-primary-accent/80 transition-colors"
              >
                + 작업지시 생성
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Summary KPIs */}
      <section className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-0">
        <div className="bg-surface-container-lowest p-5 border-l-4 border-primary-accent">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-1">전체 지시</span>
          <span className="text-3xl font-black font-headline tabular-nums">{ORDER_DATA.length}</span>
        </div>
        <div className="bg-surface-container-lowest p-5 border-l-4 border-tertiary">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-1">진행중</span>
          <span className="text-3xl font-black font-headline tabular-nums text-tertiary">{ORDER_DATA.filter(o => o.status === "In Progress").length}</span>
        </div>
        <div className="bg-surface-container-lowest p-5 border-l-4 border-error">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-1">지연</span>
          <span className="text-3xl font-black font-headline tabular-nums text-error">{ORDER_DATA.filter(o => o.status === "Delayed").length}</span>
        </div>
        <div className="bg-surface-container-lowest p-5 border-l-4 border-[#f59e0b]">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-1">대기</span>
          <span className="text-3xl font-black font-headline tabular-nums text-[#f59e0b]">{ORDER_DATA.filter(o => o.status === "Pending").length}</span>
        </div>
      </section>

      {/* Order Table */}
      <section className="bg-surface-container-lowest">
        <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-xs uppercase tracking-widest">
            작업지시
            <span className="opacity-30 font-light ml-2">| {filtered.length} 건</span>
          </h3>
          <span className="material-symbols-outlined text-sm cursor-pointer hover:text-primary-accent">refresh</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container border-b border-outline-variant/10">
                {TABLE_COLUMNS.map((col) => (
                  <th key={col.key} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-60">
                    {col.label}
                  </th>
                ))}
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-60">작업</th>
              </tr>
            </thead>
            <tbody className="font-headline text-sm">
              {filtered.map((row) => (
                <tr key={row.id} className="border-b border-outline-variant/5 hover:bg-surface-container-highest/20 transition-colors">
                  <td className="px-4 py-2 tabular-nums font-bold">{row.id}</td>
                  <td className="px-4 py-2">{row.vendor}</td>
                  <td className="px-4 py-2">{row.product}</td>
                  <td className="px-4 py-2 tabular-nums">{row.qty}</td>
                  <td className="px-4 py-2 tabular-nums">{row.dueDate}</td>
                  <td className="px-4 py-2">
                    <StatusBadge type={getStatusType(row.status)} label={row.status.toUpperCase()} />
                  </td>
                  <td className="px-4 py-2 tabular-nums">{row.progress}</td>
                  <td className="px-4 py-2">
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-surface-container text-on-surface-variant font-label text-[11px] uppercase tracking-widest hover:bg-surface-container-high transition-colors border border-outline-variant/20">
                        수정
                      </button>
                      <button className="px-3 py-1 bg-surface-container text-on-surface-variant font-label text-[11px] uppercase tracking-widest hover:bg-surface-container-high transition-colors border border-outline-variant/20">
                        보기
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 flex justify-between items-center border-t border-outline-variant/10">
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">
            {ORDER_DATA.length}건 중 {filtered.length}건 표시
          </span>
          <div className="flex gap-1">
            <button className="px-3 py-2 bg-surface-container text-on-surface-variant font-label text-xs hover:bg-surface-container-high transition-colors border border-outline-variant/20">
              이전
            </button>
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`px-3 py-2 font-label text-xs tabular-nums transition-colors border ${
                  currentPage === p
                    ? "bg-primary-accent text-white border-primary-accent"
                    : "bg-surface-container text-on-surface-variant border-outline-variant/20 hover:bg-surface-container-high"
                }`}
              >
                {p}
              </button>
            ))}
            <button className="px-3 py-2 bg-surface-container text-on-surface-variant font-label text-xs hover:bg-surface-container-high transition-colors border border-outline-variant/20">
              다음
            </button>
          </div>
        </div>
      </section>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-surface w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-primary-accent">
              <h3 className="font-headline font-black text-sm uppercase tracking-widest">작업지시 생성</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-on-surface-variant hover:text-primary-accent transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">외주업체</label>
                <select className="w-full bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-3 py-4 text-sm font-headline text-on-surface appearance-none transition-colors">
                  {VENDORS.filter(v => v !== "전체").map(v => (
                    <option key={v} value={v} className="bg-surface-container">{v}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">제품</label>
                <input type="text" placeholder="예: 데크 슬리퍼 Type-A" className="w-full bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-3 py-4 text-sm font-headline text-on-surface placeholder:text-on-surface-variant/30 transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">수량</label>
                  <input type="number" placeholder="0" className="w-full bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-3 py-4 text-sm font-headline tabular-nums text-on-surface placeholder:text-on-surface-variant/30 transition-colors" />
                </div>
                <div>
                  <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">납기일</label>
                  <input type="date" className="w-full bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-3 py-4 text-sm font-headline tabular-nums text-on-surface transition-colors" />
                </div>
              </div>
              <div>
                <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">비고</label>
                <textarea rows={3} placeholder="특이사항..." className="w-full bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-3 py-4 text-sm font-headline text-on-surface placeholder:text-on-surface-variant/30 transition-colors resize-none" />
              </div>
              <div className="flex gap-3">
                <button className="flex-1 bg-primary-accent text-white px-6 py-4 font-label text-xs uppercase tracking-widest font-bold hover:bg-primary-accent/80 transition-colors">
                  작업지시 생성
                </button>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 bg-surface-container text-on-surface-variant px-6 py-4 font-label text-xs uppercase tracking-widest font-bold hover:bg-surface-container-high transition-colors border border-outline-variant/20"
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
