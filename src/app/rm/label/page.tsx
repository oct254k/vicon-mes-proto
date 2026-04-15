"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const MOCK_LABEL = {
  lot: "RM-260415-001",
  supplier: "POSCO Steel",
  type: "원형",
  spec: "5.5mm",
  weight: "3,240.5 kg",
  qty: "120 EA",
  date: "2026-04-15",
  inspector: "KIM-J",
  status: "INSPECTED",
};

export default function RMLabelPage() {
  const [searchValue, setSearchValue] = useState("");
  const [labelLoaded, setLabelLoaded] = useState(true);
  const [reprintReason, setReprintReason] = useState("");
  const [printCount, setPrintCount] = useState(1);

  return (
    <div>
      <PageHeader
        title="원자재"
        accent="라벨 발행"
        nodeRef="SCR-RM-002"
        status="CALIBRATED"
        description="원자재 LOT 바코드 라벨을 검색하고 인쇄합니다. 라벨 훼손 시 사유를 입력하여 재발행할 수 있습니다."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Search & Actions */}
        <div className="space-y-6">
          {/* LOT Search */}
          <div className="bg-surface-container-lowest p-6">
            <FieldHeader title="LOT 검색 / 스캔" moduleRef="MOD-RM-LBL-SCN" />
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
                  qr_code_scanner
                </span>
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="바코드 스캔 또는 LOT 번호 입력"
                  className="w-full bg-surface-container pl-10 pr-4 py-3 text-on-surface font-headline text-sm border border-outline-variant/20 focus:border-primary-accent focus:outline-none tabular-nums"
                />
              </div>
              <button
                onClick={() => setLabelLoaded(true)}
                className="bg-primary-accent text-on-primary px-6 py-3 font-label text-xs uppercase tracking-widest font-bold hover:bg-primary-container transition-colors"
              >
                검색
              </button>
            </div>
            <p className="font-label text-[11px] uppercase tracking-widest text-on-surface-variant opacity-60 mt-2">
              입력 필드를 선택하면 바코드 스캐너가 활성화됩니다
            </p>
          </div>

          {/* Re-print Section */}
          <div className="bg-surface-container-lowest p-6">
            <FieldHeader title="재발행 설정" moduleRef="MOD-RM-LBL-RPT" />
            <div className="space-y-4">
              <div>
                <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
                  재발행 사유
                </label>
                <select
                  value={reprintReason}
                  onChange={(e) => setReprintReason(e.target.value)}
                  className="w-full bg-surface-container p-3 text-on-surface font-headline text-sm border border-outline-variant/20 focus:border-primary-accent focus:outline-none"
                >
                  <option value="">-- 사유 선택 --</option>
                  <option value="damaged">라벨 손상</option>
                  <option value="illegible">라벨 판독 불가</option>
                  <option value="data_correction">데이터 수정</option>
                  <option value="additional">추가 라벨 필요</option>
                </select>
              </div>
              <div>
                <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
                  인쇄 수량
                </label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={printCount}
                  onChange={(e) => setPrintCount(Number(e.target.value))}
                  className="w-24 bg-surface-container p-3 text-on-surface font-headline text-sm border border-outline-variant/20 focus:border-primary-accent focus:outline-none tabular-nums"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-surface-container-lowest p-6">
            <FieldHeader title="작업" moduleRef="MOD-RM-LBL-ACT" />
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-primary-accent text-on-primary px-6 py-4 font-label text-xs uppercase tracking-widest font-bold hover:bg-primary-container transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-base">print</span>
                라벨 인쇄
              </button>
              <button className="bg-surface-container text-on-surface-variant px-6 py-4 font-label text-xs uppercase tracking-widest font-bold border border-outline-variant/20 hover:border-primary-accent transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-base">refresh</span>
                재발행
              </button>
              <button className="bg-surface-container text-on-surface-variant px-6 py-4 font-label text-xs uppercase tracking-widest font-bold border border-outline-variant/20 hover:border-outline-variant/40 transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-base">preview</span>
                미리보기
              </button>
              <button className="bg-surface-container text-on-surface-variant px-6 py-4 font-label text-xs uppercase tracking-widest font-bold border border-outline-variant/20 hover:border-outline-variant/40 transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-base">history</span>
                인쇄 이력
              </button>
            </div>
          </div>
        </div>

        {/* Right: Label Preview */}
        <div className="bg-surface-container-lowest p-6">
          <FieldHeader title="라벨 미리보기" moduleRef="MOD-RM-LBL-PRV" />
          {labelLoaded ? (
            <div className="border-2 border-outline-variant/20 bg-white p-6 text-surface">
              {/* Barcode Label */}
              <div className="border-2 border-surface p-4">
                {/* Header */}
                <div className="flex justify-between items-center border-b-2 border-surface pb-3 mb-3">
                  <span className="text-lg font-black font-headline tracking-tight">VICON MES</span>
                  <span className="text-xs font-label uppercase tracking-widest bg-surface text-on-surface px-2 py-1">
                    원자재
                  </span>
                </div>

                {/* LOT Barcode Area */}
                <div className="text-center py-4 border-b border-surface/20 mb-3">
                  <div className="flex justify-center gap-[2px] mb-2">
                    {Array.from({ length: 40 }, (_, i) => (
                      <div
                        key={i}
                        className="bg-surface"
                        style={{
                          width: Math.random() > 0.5 ? "2px" : "1px",
                          height: "48px",
                        }}
                      />
                    ))}
                  </div>
                  <span className="font-headline text-sm font-bold tabular-nums tracking-wider">
                    {MOCK_LABEL.lot}
                  </span>
                </div>

                {/* Data Grid */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                  {[
                    { label: "공급업체", value: MOCK_LABEL.supplier },
                    { label: "종류", value: MOCK_LABEL.type },
                    { label: "규격", value: MOCK_LABEL.spec },
                    { label: "중량", value: MOCK_LABEL.weight },
                    { label: "수량", value: MOCK_LABEL.qty },
                    { label: "입고일", value: MOCK_LABEL.date },
                    { label: "검사자", value: MOCK_LABEL.inspector },
                    { label: "상태", value: MOCK_LABEL.status },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between py-1 border-b border-surface/10">
                      <span className="font-label text-[11px] uppercase tracking-widest text-surface/60">
                        {item.label}
                      </span>
                      <span className="font-headline font-bold tabular-nums">{item.value}</span>
                    </div>
                  ))}
                </div>

                {/* QR placeholder */}
                <div className="flex justify-between items-end mt-4 pt-3 border-t border-surface/20">
                  <div className="w-16 h-16 border-2 border-surface grid grid-cols-4 grid-rows-4 gap-[1px] p-1">
                    {Array.from({ length: 16 }, (_, i) => (
                      <div
                        key={i}
                        className={Math.random() > 0.4 ? "bg-surface" : "bg-transparent"}
                      />
                    ))}
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] font-label uppercase tracking-widest text-surface/40">
                      인쇄일시: 2026-04-15 10:32
                    </p>
                    <p className="text-[8px] font-label uppercase tracking-widest text-surface/40">
                      단말기: PRT-RM-01
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-96 flex items-center justify-center border border-outline-variant/10">
              <div className="text-center">
                <span className="material-symbols-outlined text-4xl text-on-surface-variant opacity-20 block mb-2">
                  label
                </span>
                <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">
                  LOT를 검색하여 라벨을 미리보기하세요
                </p>
              </div>
            </div>
          )}

          {/* Label Info */}
          <div className="mt-4 flex items-center gap-4">
            <StatusBadge type="running" label="인쇄 준비 완료" />
            <span className="font-label text-[11px] uppercase tracking-widest text-on-surface-variant opacity-60">
              프린터: PRT-RM-01 | 용지: A6 감열지
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
