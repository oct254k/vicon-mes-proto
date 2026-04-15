"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const MOCK_KS_LOT = {
  lotNo: "P1-OUT-0415-001",
  material: "SWRH 62B",
  wireType: "원형 4.0mm",
  weight: "1,820",
  quantity: 12,
  productionDate: "2026-04-15",
  equipment: "신선#1",
  operator: "김철수",
  ksStandard: "KS D 3510",
  ksGrade: "SWRH 62B",
  certNo: "KS-2026-VIC-00412",
  certExpiry: "2027-03-31",
  tensileStrength: "620~720 MPa",
  diameter: "4.00 ± 0.04 mm",
  inspectionResult: "적합",
};

export default function P1KsLabelPage() {
  const [searchLot, setSearchLot] = useState("");
  const [found, setFound] = useState(false);

  const handleSearch = () => {
    if (searchLot.trim()) {
      setFound(true);
    }
  };

  return (
    <div className="max-w-5xl">
      <PageHeader
        title="KS 라벨"
        accent="인쇄"
        nodeRef="SCR-P1-004"
        status="ONLINE"
        description="KS 인증 대상 철선의 KS 규격 라벨을 발행합니다. 인증 정보와 시험 결과가 포함됩니다."
      />

      {/* LOT Search */}
      <section className="bg-surface-container-lowest p-6 mb-6">
        <FieldHeader title="LOT 검색" moduleRef="MOD-KS-01" />
        <div className="flex gap-0 max-w-xl">
          <input
            type="text"
            value={searchLot}
            onChange={(e) => setSearchLot(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="LOT 번호 입력 또는 스캔..."
            className="flex-1 bg-surface-container border border-outline-variant/20 px-4 py-3 text-sm font-headline text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-primary-accent"
          />
          <button
            onClick={handleSearch}
            className="bg-primary-accent px-6 py-3 font-label text-xs uppercase tracking-widest font-bold text-on-primary-container hover:bg-primary-accent/80 transition-colors"
          >
            검색
          </button>
        </div>
      </section>

      {found && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* KS Label Preview */}
          <section className="bg-surface-container-lowest p-6">
            <FieldHeader title="KS 라벨 미리보기" moduleRef="KS-PREVIEW" />

            <div className="bg-white text-[#111] p-6 border-2 border-[#333] relative">
              {/* KS Mark Banner */}
              <div className="bg-[#003478] text-white p-3 mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 border-2 border-white flex items-center justify-center">
                    <span className="text-xl font-black tracking-tighter">KS</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold tracking-widest uppercase opacity-80">한국산업표준</div>
                    <div className="text-sm font-black">{MOCK_KS_LOT.ksStandard}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] tracking-widest uppercase opacity-70">인증 No.</div>
                  <div className="text-xs font-bold tabular-nums">{MOCK_KS_LOT.certNo}</div>
                </div>
              </div>

              {/* Product Info */}
              <div className="border-b-2 border-[#111] pb-3 mb-4 flex justify-between items-start">
                <div>
                  <div className="text-xs font-bold tracking-widest uppercase text-[#666]">VICON WIRE CO., LTD.</div>
                  <div className="text-lg font-black tracking-tight font-headline mt-1">{MOCK_KS_LOT.wireType}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold tracking-widest uppercase text-[#666]">생산일자</div>
                  <div className="text-sm font-bold tabular-nums">{MOCK_KS_LOT.productionDate}</div>
                </div>
              </div>

              {/* Barcode */}
              <div className="bg-[#f5f5f5] p-4 mb-4 text-center border border-[#ddd]">
                <div className="flex justify-center gap-[2px] mb-2">
                  {Array.from({ length: 40 }, (_, i) => (
                    <div
                      key={i}
                      className="bg-[#111]"
                      style={{
                        width: i % 3 === 0 ? "3px" : i % 2 === 0 ? "2px" : "1px",
                        height: "48px",
                      }}
                    />
                  ))}
                </div>
                <div className="text-xs font-mono font-bold tabular-nums tracking-widest">{MOCK_KS_LOT.lotNo}</div>
              </div>

              {/* Specification Grid */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs mb-4">
                <div className="flex justify-between border-b border-[#eee] pb-1">
                  <span className="text-[#888] uppercase text-[11px] font-bold tracking-wider">KS 등급</span>
                  <span className="font-bold">{MOCK_KS_LOT.ksGrade}</span>
                </div>
                <div className="flex justify-between border-b border-[#eee] pb-1">
                  <span className="text-[#888] uppercase text-[11px] font-bold tracking-wider">직경</span>
                  <span className="font-bold tabular-nums">{MOCK_KS_LOT.diameter}</span>
                </div>
                <div className="flex justify-between border-b border-[#eee] pb-1">
                  <span className="text-[#888] uppercase text-[11px] font-bold tracking-wider">인장강도</span>
                  <span className="font-bold tabular-nums">{MOCK_KS_LOT.tensileStrength}</span>
                </div>
                <div className="flex justify-between border-b border-[#eee] pb-1">
                  <span className="text-[#888] uppercase text-[11px] font-bold tracking-wider">중량</span>
                  <span className="font-bold tabular-nums">{MOCK_KS_LOT.weight} kg</span>
                </div>
                <div className="flex justify-between border-b border-[#eee] pb-1">
                  <span className="text-[#888] uppercase text-[11px] font-bold tracking-wider">자재</span>
                  <span className="font-bold">{MOCK_KS_LOT.material}</span>
                </div>
                <div className="flex justify-between border-b border-[#eee] pb-1">
                  <span className="text-[#888] uppercase text-[11px] font-bold tracking-wider">수량</span>
                  <span className="font-bold tabular-nums">{MOCK_KS_LOT.quantity} coils</span>
                </div>
              </div>

              {/* Certification footer */}
              <div className="mt-4 pt-3 border-t-2 border-[#111] flex justify-between items-center">
                <div>
                  <span className="text-[11px] font-bold tracking-widest uppercase text-[#888]">검사</span>
                  <span className="ml-2 bg-[#003478] text-white px-3 py-1 text-xs font-bold tracking-widest uppercase">
                    {MOCK_KS_LOT.inspectionResult}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-bold tracking-widest uppercase text-[#888]">인증 만료: </span>
                  <span className="text-xs font-bold tabular-nums">{MOCK_KS_LOT.certExpiry}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Certification Info & Actions */}
          <section className="bg-surface-container-lowest p-6">
            <FieldHeader title="KS 인증 정보" moduleRef="KS-CERT" />

            {/* KS Mark Indicator */}
            <div className="bg-surface-container p-4 mb-6 flex items-center gap-4 border-l-4 border-tertiary">
              <div className="w-14 h-14 bg-tertiary/20 flex items-center justify-center">
                <span className="text-tertiary font-black text-xl">KS</span>
              </div>
              <div>
                <div className="font-headline text-sm font-bold">KS 인증 제품</div>
                <div className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">
                  {MOCK_KS_LOT.ksStandard} 인증
                </div>
              </div>
              <div className="ml-auto">
                <StatusBadge type="running" label="유효" />
              </div>
            </div>

            {/* Cert Details */}
            <div className="space-y-3 mb-8">
              {Object.entries({
                "LOT No.": MOCK_KS_LOT.lotNo,
                "KS 규격": MOCK_KS_LOT.ksStandard,
                "KS 등급": MOCK_KS_LOT.ksGrade,
                "인증 번호": MOCK_KS_LOT.certNo,
                "인증 만료일": MOCK_KS_LOT.certExpiry,
                "인장강도": MOCK_KS_LOT.tensileStrength,
                "직경 공차": MOCK_KS_LOT.diameter,
                "검사 결과": MOCK_KS_LOT.inspectionResult,
              }).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center border-b border-outline-variant/10 pb-2">
                  <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">{key}</span>
                  <span className="font-headline text-sm font-bold tabular-nums">{value}</span>
                </div>
              ))}
            </div>

            {/* Print Actions */}
            <button className="w-full bg-primary-accent px-8 py-4 font-label text-xs uppercase tracking-widest font-bold text-on-primary-container hover:bg-primary-accent/80 transition-colors flex items-center justify-center gap-2 mb-3">
              <span className="material-symbols-outlined text-base">print</span>
              KS 라벨 인쇄
            </button>
            <button className="w-full bg-surface-container-high border border-outline-variant/20 px-8 py-3 font-label text-xs uppercase tracking-widest font-bold text-on-surface-variant hover:bg-surface-container-highest transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-base">download</span>
              PDF 내보내기
            </button>
          </section>
        </div>
      )}
    </div>
  );
}
