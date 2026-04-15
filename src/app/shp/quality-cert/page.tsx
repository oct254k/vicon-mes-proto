"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DataTable } from "@/components/ui/DataTable";

interface CertData {
  shipmentId: string;
  lotNo: string;
  product: string;
  qty: number;
  shipDate: string;
  destination: string;
  certStatus: "issued" | "pending" | "expired";
}

const SHIPPED_LOTS: CertData[] = [
  { shipmentId: "SHP-0415-004", lotNo: "SLP-2026-0412-0078", product: "PC침목 8T", qty: 12, shipDate: "2026-04-15", destination: "서울지사", certStatus: "issued" },
  { shipmentId: "SHP-0415-004", lotNo: "SLP-2026-0413-0045", product: "PC침목 8T", qty: 10, shipDate: "2026-04-15", destination: "서울지사", certStatus: "issued" },
  { shipmentId: "SHP-0415-003", lotNo: "SLP-2026-0413-0060", product: "PC침목 8T", qty: 10, shipDate: "2026-04-15", destination: "부산현장", certStatus: "issued" },
  { shipmentId: "SHP-0415-003", lotNo: "SLP-2026-0413-0048", product: "PC침목 8T", qty: 10, shipDate: "2026-04-15", destination: "부산현장", certStatus: "pending" },
  { shipmentId: "SHP-0415-002", lotNo: "SLP-2026-0412-0065", product: "PC침목 11T", qty: 8, shipDate: "2026-04-15", destination: "대전현장", certStatus: "issued" },
  { shipmentId: "SHP-0415-001", lotNo: "SLP-2026-0411-0092", product: "PC침목 14T", qty: 6, shipDate: "2026-04-15", destination: "광주현장", certStatus: "issued" },
  { shipmentId: "SHP-0415-001", lotNo: "SLP-2026-0411-0095", product: "PC침목 14T", qty: 4, shipDate: "2026-04-15", destination: "광주현장", certStatus: "issued" },
  { shipmentId: "SHP-0414-008", lotNo: "SLP-2026-0411-0080", product: "PC침목 8T", qty: 8, shipDate: "2026-04-14", destination: "인천현장", certStatus: "issued" },
];

interface TestResult {
  test: string;
  spec: string;
  result: string;
  unit: string;
  verdict: "PASS" | "FAIL";
}

const MOCK_TEST_RESULTS: TestResult[] = [
  { test: "압축강도", spec: ">= 50", result: "58.3", unit: "MPa", verdict: "PASS" },
  { test: "휨강도", spec: ">= 4.5", result: "5.2", unit: "MPa", verdict: "PASS" },
  { test: "균열하중", spec: ">= 180", result: "195", unit: "kN", verdict: "PASS" },
  { test: "파괴하중", spec: ">= 270", result: "298", unit: "kN", verdict: "PASS" },
  { test: "치수 (L)", spec: "2400 +/- 5", result: "2401", unit: "mm", verdict: "PASS" },
  { test: "치수 (W)", spec: "300 +/- 3", result: "299", unit: "mm", verdict: "PASS" },
  { test: "치수 (H)", spec: "220 +/- 3", result: "221", unit: "mm", verdict: "PASS" },
  { test: "중량", spec: "800 +/- 20", result: "805", unit: "kg", verdict: "PASS" },
  { test: "표면결함", spec: "None", result: "None", unit: "-", verdict: "PASS" },
  { test: "철근 피복두께", spec: ">= 25", result: "28", unit: "mm", verdict: "PASS" },
];

const CERT_BADGE: Record<string, { type: "running" | "warning" | "error"; label: string }> = {
  issued: { type: "running", label: "발행완료" },
  pending: { type: "warning", label: "대기중" },
  expired: { type: "error", label: "만료" },
};

export default function QualityCertPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLot, setSelectedLot] = useState<CertData | null>(null);
  const [filterStatus, setFilterStatus] = useState("전체");

  const filteredLots = SHIPPED_LOTS.filter((lot) => {
    const q = searchQuery.toUpperCase();
    const matchSearch = !q || lot.lotNo.toUpperCase().includes(q) || lot.shipmentId.toUpperCase().includes(q);
    const matchStatus = filterStatus === "전체" || lot.certStatus === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div>
      <PageHeader
        title="품질"
        accent="성적서"
        description="출하된 제품의 품질 성적서를 조회하고 발행합니다. 시험 결과와 KS/KORAIL 적합 여부를 확인할 수 있습니다."
        nodeRef="SCR-SHP-002"
        status="ONLINE"
      />

      {/* Search */}
      <section className="bg-surface-container-lowest p-6 mb-6">
        <FieldHeader title="출하 LOT 검색" moduleRef="QC-SEARCH" />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-6">
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">
              LOT / 출하 ID
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g. SLP-2026-0412-0078 or SHP-0415-004"
              className="w-full bg-surface-container border border-outline-variant/20 px-4 py-3 text-sm font-headline text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-primary-accent"
            />
          </div>
          <div className="md:col-span-3">
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">
              성적서 상태
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full bg-surface-container border border-outline-variant/20 px-4 py-3 text-sm font-headline text-on-surface focus:outline-none focus:border-primary-accent appearance-none"
            >
              <option>전체</option>
              <option value="issued">발행완료</option>
              <option value="pending">대기중</option>
              <option value="expired">만료</option>
            </select>
          </div>
          <div className="md:col-span-3 flex items-end">
            <button
              onClick={() => { setSearchQuery(""); setFilterStatus("전체"); }}
              className="w-full bg-surface-container border border-outline-variant/20 px-4 py-3 font-label text-xs uppercase tracking-widest font-bold text-on-surface-variant hover:bg-surface-container-high transition-colors"
            >
              초기화
            </button>
          </div>
        </div>
      </section>

      {/* LOTs Table */}
      <section className="bg-surface-container-lowest mb-6">
        <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-xs uppercase tracking-widest">
            출하 LOT
            <span className="opacity-30 font-light ml-2">| {filteredLots.length}건</span>
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container border-b border-outline-variant/10">
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-60">출하</th>
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-60">LOT 번호</th>
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-60">제품</th>
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-60">수량</th>
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-60">출하일</th>
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-60">목적지</th>
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-60">성적서</th>
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-60">작업</th>
              </tr>
            </thead>
            <tbody className="font-headline text-sm">
              {filteredLots.map((lot, i) => (
                <tr
                  key={`${lot.lotNo}-${i}`}
                  className={`border-b border-outline-variant/5 hover:bg-surface-container-highest/20 transition-colors cursor-pointer ${
                    selectedLot?.lotNo === lot.lotNo ? "bg-surface-container-highest/30" : ""
                  }`}
                  onClick={() => setSelectedLot(lot)}
                >
                  <td className="px-4 py-2 tabular-nums">{lot.shipmentId}</td>
                  <td className="px-4 py-2 tabular-nums font-bold">{lot.lotNo}</td>
                  <td className="px-4 py-2">{lot.product}</td>
                  <td className="px-4 py-2 tabular-nums">{lot.qty}</td>
                  <td className="px-4 py-2 tabular-nums">{lot.shipDate}</td>
                  <td className="px-4 py-2">{lot.destination}</td>
                  <td className="px-4 py-2">
                    <StatusBadge {...CERT_BADGE[lot.certStatus]} />
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedLot(lot); }}
                      className="text-primary-accent font-label text-xs uppercase tracking-widest hover:text-primary-accent/70 transition-colors"
                    >
                      조회
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Certificate Preview */}
      {selectedLot && (
        <section className="bg-surface-container-lowest p-6 mb-6 border-l-4 border-tertiary">
          <div className="flex items-center justify-between mb-6">
            <FieldHeader title="품질 성적서 미리보기" moduleRef="QC-CERT" />
          </div>

          {/* Certificate Header */}
          <div className="bg-surface-container p-6 mb-6">
            <div className="text-center mb-6">
              <h2 className="font-headline text-xl font-black uppercase tracking-widest mb-1">품질 성적서</h2>
              <h3 className="font-headline text-sm text-on-surface-variant">품질시험성적서</h3>
              <div className="w-16 h-0.5 bg-primary-accent mx-auto mt-3" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">성적서 번호</span>
                <span className="font-headline text-sm font-bold tabular-nums">QC-{selectedLot.lotNo.slice(-12)}</span>
              </div>
              <div>
                <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">LOT 번호</span>
                <span className="font-headline text-sm font-bold tabular-nums">{selectedLot.lotNo}</span>
              </div>
              <div>
                <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">제품</span>
                <span className="font-headline text-sm font-bold">{selectedLot.product}</span>
              </div>
              <div>
                <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">수량</span>
                <span className="font-headline text-sm font-bold tabular-nums">{selectedLot.qty} EA</span>
              </div>
              <div>
                <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">출하일</span>
                <span className="font-headline text-sm tabular-nums">{selectedLot.shipDate}</span>
              </div>
              <div>
                <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">목적지</span>
                <span className="font-headline text-sm">{selectedLot.destination}</span>
              </div>
              <div>
                <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">기준 규격</span>
                <span className="font-headline text-sm">KS F 4062</span>
              </div>
              <div>
                <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">발행일</span>
                <span className="font-headline text-sm tabular-nums">2026-04-15</span>
              </div>
            </div>
          </div>

          {/* Test Results */}
          <div className="mb-6">
            <DataTable
              title="시험 결과"
              columns={[
                { key: "test", label: "시험 항목" },
                { key: "spec", label: "규격" },
                { key: "result", label: "결과" },
                { key: "unit", label: "단위" },
                { key: "verdict", label: "판정" },
              ]}
              data={MOCK_TEST_RESULTS.map((t) => ({ test: t.test, spec: t.spec, result: t.result, unit: t.unit, verdict: t.verdict }))}
            />
          </div>

          {/* Compliance */}
          <div className="bg-surface-container p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
                적합성 요약
              </span>
              <div className="flex-1 h-px bg-outline-variant/10" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-tertiary">verified</span>
                <div>
                  <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block">KS F 4062</span>
                  <StatusBadge type="running" label="적합" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-tertiary">verified</span>
                <div>
                  <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block">KS F 4024</span>
                  <StatusBadge type="running" label="적합" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-tertiary">verified</span>
                <div>
                  <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block">KORAIL Spec</span>
                  <StatusBadge type="running" label="승인" />
                </div>
              </div>
            </div>
          </div>

          {/* Overall Verdict */}
          <div className="bg-tertiary/10 p-4 mb-6 flex items-center gap-3">
            <span className="material-symbols-outlined text-tertiary text-2xl">check_circle</span>
            <div>
              <span className="font-headline text-sm font-black text-tertiary">전체 시험 합격</span>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block">
                10/10 시험 항목 규격 충족
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 flex-wrap">
            <button className="bg-primary-accent px-8 py-3 font-label text-xs uppercase tracking-widest font-bold text-on-primary-container hover:bg-primary-accent/80 transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-base">print</span>
              성적서 인쇄
            </button>
            <button className="bg-surface-container border border-outline-variant/20 px-8 py-3 font-label text-xs uppercase tracking-widest font-bold text-on-surface-variant hover:bg-surface-container-high transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-base">picture_as_pdf</span>
              PDF 내보내기
            </button>
            <button className="bg-surface-container border border-outline-variant/20 px-8 py-3 font-label text-xs uppercase tracking-widest font-bold text-on-surface-variant hover:bg-surface-container-high transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-base">mail</span>
              이메일 발송
            </button>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="mt-6 bg-surface-container p-4 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-tertiary inline-block" />
            <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">성적서 시스템</span>
          </div>
          <StatusBadge type="running" label="ONLINE" />
        </div>
        <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">
          금일 발행 성적서: <span className="text-on-surface tabular-nums font-bold">{SHIPPED_LOTS.filter((l) => l.certStatus === "issued").length}</span>
        </span>
      </footer>
    </div>
  );
}
