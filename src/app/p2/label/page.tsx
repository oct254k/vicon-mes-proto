"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

interface LotInfo {
  lot: string;
  productType: string;
  material: string;
  width: number;
  thickness: number;
  meshSize: string;
  quantity: number;
  equipment: string;
  productionDate: string;
  operator: string;
  processOrder: string;
  qcStatus: string;
}

const MOCK_LOTS: Record<string, LotInfo> = {
  "TG-2026-0415-001": {
    lot: "TG-2026-0415-001",
    productType: "WM-304-2.0",
    material: "STS304",
    width: 1000,
    thickness: 2.0,
    meshSize: "50x50",
    quantity: 142.5,
    equipment: "TG-01",
    productionDate: "2026-04-15",
    operator: "Kim JH",
    processOrder: "PO-TG-0415-A01",
    qcStatus: "PASS",
  },
  "TG-2026-0415-002": {
    lot: "TG-2026-0415-002",
    productType: "WM-316-1.5",
    material: "STS316",
    width: 1200,
    thickness: 1.5,
    meshSize: "25x25",
    quantity: 118.3,
    equipment: "TG-02",
    productionDate: "2026-04-15",
    operator: "Park SY",
    processOrder: "PO-TG-0415-A02",
    qcStatus: "PASS",
  },
  "TG-2026-0415-003": {
    lot: "TG-2026-0415-003",
    productType: "WM-201-1.0",
    material: "STS201",
    width: 1000,
    thickness: 1.0,
    meshSize: "30x30",
    quantity: 95.7,
    equipment: "TG-04",
    productionDate: "2026-04-15",
    operator: "Lee MJ",
    processOrder: "PO-TG-0415-A04",
    qcStatus: "PENDING",
  },
};

export default function P2LabelPage() {
  const [searchInput, setSearchInput] = useState("");
  const [selectedLot, setSelectedLot] = useState<LotInfo | null>(null);
  const [searchError, setSearchError] = useState("");

  const handleSearch = () => {
    const lot = MOCK_LOTS[searchInput.trim()];
    if (lot) {
      setSelectedLot(lot);
      setSearchError("");
    } else {
      setSelectedLot(null);
      setSearchError("LOT을 찾을 수 없습니다. 사용 가능: TG-2026-0415-001, -002, -003");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <PageHeader
        title="2공정 TG"
        accent="LOT 라벨"
        nodeRef="SCR-P2-005"
      />

      {/* Search */}
      <section className="mb-8">
        <FieldHeader title="LOT 검색" moduleRef="LABEL.SEARCH" />
        <div className="flex gap-2 max-w-xl">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="TG-2026-0415-001"
            className="flex-1 bg-surface-container-lowest border border-outline-variant/20 px-4 py-3 text-sm font-headline text-on-surface focus:border-primary-accent focus:outline-none placeholder:text-on-surface-variant/30"
          />
          <button
            onClick={handleSearch}
            className="bg-primary-accent text-on-primary px-6 py-3 font-label text-xs uppercase tracking-widest font-bold hover:bg-primary transition-colors"
          >
            검색
          </button>
        </div>
        {searchError && (
          <p className="mt-2 font-label text-xs uppercase tracking-widest text-error">
            {searchError}
          </p>
        )}
      </section>

      {/* Label Preview + Print */}
      {selectedLot && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Label Preview */}
          <section>
            <FieldHeader title="라벨 미리보기" moduleRef="LABEL.PREVIEW" />
            <div className="bg-white text-black p-8 border-4 border-black print:border-2">
              {/* Label Header */}
              <div className="border-b-2 border-black pb-3 mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="font-headline font-black text-2xl tracking-tight">VICON</h2>
                    <p className="font-label text-[11px] uppercase tracking-widest text-gray-600">
                      Touch Ground Wire Mesh
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-headline font-black text-lg">{selectedLot.lot}</p>
                    <p className="font-label text-[11px] uppercase tracking-widest text-gray-600">
                      QC: {selectedLot.qcStatus}
                    </p>
                  </div>
                </div>
              </div>

              {/* Label Body */}
              <div className="grid grid-cols-2 gap-3 mb-4 text-sm font-headline">
                {[
                  { label: "제품", value: selectedLot.productType },
                  { label: "재질", value: selectedLot.material },
                  { label: "폭", value: `${selectedLot.width} mm` },
                  { label: "두께", value: `${selectedLot.thickness} mm` },
                  { label: "메쉬 규격", value: selectedLot.meshSize },
                  { label: "수량", value: `${selectedLot.quantity} m\u00B2` },
                  { label: "설비", value: selectedLot.equipment },
                  { label: "일자", value: selectedLot.productionDate },
                  { label: "작업자", value: selectedLot.operator },
                  { label: "오더", value: selectedLot.processOrder },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between border-b border-gray-200 pb-1">
                    <span className="font-label text-[11px] uppercase tracking-widest text-gray-500">
                      {item.label}
                    </span>
                    <span className="font-bold tabular-nums">{item.value}</span>
                  </div>
                ))}
              </div>

              {/* Barcode Placeholder */}
              <div className="border-t-2 border-black pt-3 flex justify-center">
                <div className="text-center">
                  <div className="flex gap-px justify-center mb-1">
                    {Array.from({ length: 40 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-black"
                        style={{
                          width: Math.random() > 0.5 ? "2px" : "1px",
                          height: "36px",
                        }}
                      />
                    ))}
                  </div>
                  <span className="font-mono text-xs tracking-wider">{selectedLot.lot}</span>
                </div>
              </div>
            </div>
          </section>

          {/* LOT Details + Print */}
          <section>
            <FieldHeader title="LOT 상세" moduleRef="LABEL.DETAIL" />
            <div className="bg-surface-container-lowest p-6 space-y-4 mb-6">
              {[
                { label: "LOT 번호", value: selectedLot.lot },
                { label: "제품종류", value: selectedLot.productType },
                { label: "재질", value: selectedLot.material },
                { label: "폭", value: `${selectedLot.width} mm` },
                { label: "와이어 직경", value: `${selectedLot.thickness} mm` },
                { label: "메쉬 규격", value: selectedLot.meshSize },
                { label: "수량", value: `${selectedLot.quantity} m\u00B2` },
                { label: "설비", value: selectedLot.equipment },
                { label: "생산일자", value: selectedLot.productionDate },
                { label: "작업자", value: selectedLot.operator },
                { label: "공정 오더", value: selectedLot.processOrder },
                { label: "품질 상태", value: selectedLot.qcStatus },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center border-b border-outline-variant/5 pb-2">
                  <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
                    {item.label}
                  </span>
                  <span className="font-headline text-sm font-bold tabular-nums">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handlePrint}
                className="flex-1 bg-primary-accent text-on-primary px-4 py-3 font-label text-xs uppercase tracking-widest font-bold hover:bg-primary transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">print</span>
                라벨 인쇄
              </button>
              <button
                onClick={handlePrint}
                className="bg-surface-container-high text-on-surface px-4 py-3 font-label text-xs uppercase tracking-widest font-bold hover:bg-surface-container-highest transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">content_copy</span>
                재인쇄
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
