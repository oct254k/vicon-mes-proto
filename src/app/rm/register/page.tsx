"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";

const SUPPLIERS = ["POSCO Steel", "Hyundai Steel", "Dongkuk Steel", "SeAH Besteel", "Kiswire"];

const RECENT_COLUMNS = [
  { key: "lot", label: "LOT 번호" },
  { key: "supplier", label: "공급업체" },
  { key: "type", label: "종류" },
  { key: "spec", label: "규격 (mm)" },
  { key: "qty", label: "수량 (EA)" },
  { key: "weight", label: "중량 (kg)" },
  { key: "date", label: "입고일" },
  { key: "status", label: "상태" },
];

const RECENT_DATA = [
  { lot: "RM-260415-001", supplier: "POSCO Steel", type: "원형", spec: "5.5", qty: 120, weight: "3,240.5", date: "2026-04-15 08:12", status: "INSPECTED" },
  { lot: "RM-260415-002", supplier: "Hyundai Steel", type: "이형", spec: "8.0", qty: 80, weight: "4,120.0", date: "2026-04-15 09:34", status: "PENDING" },
  { lot: "RM-260414-008", supplier: "SeAH Besteel", type: "원형", spec: "6.0", qty: 150, weight: "5,100.0", date: "2026-04-14 16:22", status: "INSPECTED" },
  { lot: "RM-260414-007", supplier: "Dongkuk Steel", type: "이형", spec: "10.0", qty: 60, weight: "3,780.0", date: "2026-04-14 14:05", status: "INSPECTED" },
  { lot: "RM-260414-006", supplier: "POSCO Steel", type: "원형", spec: "5.5", qty: 200, weight: "5,400.0", date: "2026-04-14 11:48", status: "RELEASED" },
];

const BATCH_PREVIEW = [
  { spec: "5.5mm 원형", current: 8420, capacity: 12000 },
  { spec: "6.0mm 원형", current: 5100, capacity: 10000 },
  { spec: "8.0mm 이형", current: 7230, capacity: 8000 },
  { spec: "10.0mm 이형", current: 3780, capacity: 6000 },
];

export default function RMRegisterPage() {
  const [supplier, setSupplier] = useState("");
  const [materialType, setMaterialType] = useState("원형");
  const [spec, setSpec] = useState("");
  const [qty, setQty] = useState("");
  const [weight, setWeight] = useState("");
  const [date, setDate] = useState("2026-04-15");

  return (
    <div>
      <PageHeader
        title="원자재"
        accent="입고 등록"
        nodeRef="SCR-RM-001"
        status="CALIBRATED"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Registration Form */}
        <div className="lg:col-span-2 bg-surface-container-lowest p-6">
          <FieldHeader title="원자재 입고 등록" moduleRef="MOD-RM-REG" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
                공급업체
              </label>
              <select
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
                className="w-full bg-surface-container p-3 text-on-surface font-headline text-sm border border-outline-variant/20 focus:border-primary-accent focus:outline-none"
              >
                <option value="">-- 공급업체 선택 --</option>
                {SUPPLIERS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
                입고일
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-surface-container p-3 text-on-surface font-headline text-sm border border-outline-variant/20 focus:border-primary-accent focus:outline-none"
              />
            </div>

            <div>
              <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-3">
                종류
              </label>
              <div className="flex gap-4">
                {["원형", "이형"].map((t) => (
                  <label
                    key={t}
                    className={`flex items-center gap-2 px-4 py-3 border cursor-pointer transition-colors ${
                      materialType === t
                        ? "border-primary-accent bg-primary-accent/10 text-primary-accent"
                        : "border-outline-variant/20 bg-surface-container text-on-surface-variant"
                    }`}
                  >
                    <div
                      className={`w-3 h-3 border-2 ${
                        materialType === t
                          ? "border-primary-accent bg-primary-accent"
                          : "border-outline-variant"
                      }`}
                    />
                    <input
                      type="radio"
                      name="materialType"
                      value={t}
                      checked={materialType === t}
                      onChange={(e) => setMaterialType(e.target.value)}
                      className="sr-only"
                    />
                    <span className="font-label text-xs uppercase tracking-widest font-bold">
                      {t}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
                규격 (mm)
              </label>
              <input
                type="number"
                step="0.1"
                value={spec}
                onChange={(e) => setSpec(e.target.value)}
                placeholder="예: 5.5"
                className="w-full bg-surface-container p-3 text-on-surface font-headline text-sm border border-outline-variant/20 focus:border-primary-accent focus:outline-none tabular-nums"
              />
            </div>

            <div>
              <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
                수량 (EA)
              </label>
              <input
                type="number"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                placeholder="0"
                className="w-full bg-surface-container p-3 text-on-surface font-headline text-sm border border-outline-variant/20 focus:border-primary-accent focus:outline-none tabular-nums"
              />
            </div>

            {/* Weight - Prominent */}
            <div>
              <label className="font-label text-xs uppercase tracking-widest text-primary-accent block mb-2">
                중량 (kg)
              </label>
              <div className="border-l-4 border-primary-accent">
                <input
                  type="number"
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="0.0"
                  className="w-full bg-surface-container-high p-4 text-on-surface font-headline text-2xl font-black border border-outline-variant/20 border-l-0 focus:border-primary-accent focus:outline-none tabular-nums"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-outline-variant/10">
            <button className="bg-primary-accent text-on-primary px-8 py-3 font-label text-xs uppercase tracking-widest font-bold hover:bg-primary-container transition-colors">
              입고 등록
            </button>
            <button className="bg-surface-container text-on-surface-variant px-8 py-3 font-label text-xs uppercase tracking-widest font-bold border border-outline-variant/20 hover:border-outline-variant/40 transition-colors">
              초기화
            </button>
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Material Batch Preview */}
          <div className="bg-surface-container-lowest p-6">
            <FieldHeader title="배치 재고" moduleRef="MOD-RM-BAT" />
            <div className="space-y-4">
              {BATCH_PREVIEW.map((b) => (
                <div key={b.spec}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
                      {b.spec}
                    </span>
                    <span className="font-headline text-xs tabular-nums">
                      {b.current.toLocaleString()} / {b.capacity.toLocaleString()} kg
                    </span>
                  </div>
                  <div className="w-full h-2 bg-surface-container">
                    <div
                      className={`h-full ${
                        b.current / b.capacity > 0.9
                          ? "bg-error"
                          : b.current / b.capacity > 0.7
                          ? "bg-[#f59e0b]"
                          : "bg-tertiary"
                      }`}
                      style={{ width: `${(b.current / b.capacity) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Telemetry */}
          <div className="bg-surface-container-lowest p-6">
            <FieldHeader title="시스템 상태" moduleRef="MOD-SYS-TEL" />
            <div className="space-y-3">
              {[
                { label: "저울", value: "온라인", type: "running" as const },
                { label: "바코드 프린터", value: "준비", type: "running" as const },
                { label: "ERP 동기화", value: "동기화", type: "running" as const },
                { label: "품질모듈", value: "대기", type: "idle" as const },
              ].map((t) => (
                <div key={t.label} className="flex justify-between items-center py-2 border-b border-outline-variant/5 last:border-0">
                  <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
                    {t.label}
                  </span>
                  <StatusBadge type={t.type} label={t.value} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Registrations Table */}
      <DataTable
        title="최근 등록 내역"
        columns={RECENT_COLUMNS}
        data={RECENT_DATA}
        bufferCount={RECENT_DATA.length}
      />
    </div>
  );
}
