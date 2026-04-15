"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DataTable } from "@/components/ui/DataTable";

const ZONE_LIST = ["A1", "A2", "A3", "A4", "A5", "B1", "B2", "B3", "B4", "B5", "C1", "C2", "C3", "C4", "C5"];

const ZONE_AVAILABILITY: Record<string, { load: number; capacity: number }> = {
  A1: { load: 87, capacity: 120 }, A2: { load: 120, capacity: 120 }, A3: { load: 0, capacity: 100 },
  A4: { load: 45, capacity: 100 }, A5: { load: 0, capacity: 80 }, B1: { load: 132, capacity: 150 },
  B2: { load: 0, capacity: 150 }, B3: { load: 98, capacity: 150 }, B4: { load: 120, capacity: 120 },
  B5: { load: 67, capacity: 120 }, C1: { load: 0, capacity: 100 }, C2: { load: 23, capacity: 100 },
  C3: { load: 80, capacity: 80 }, C4: { load: 0, capacity: 80 }, C5: { load: 55, capacity: 100 },
};

const MOCK_LOT = {
  lotNo: "SLP-2026-0415-0018",
  productType: "PC침목 8T",
  qty: 8,
  weight: "6,400",
  currentZone: "A1",
  placedDate: "2026-04-14 14:20",
  cureAge: "1d",
};

const MOVE_HISTORY = [
  { time: "09:15", lot: "SLP-2026-0415-0010", from: "B3", to: "A3", qty: "4", operator: "김철수", reason: "재배치" },
  { time: "08:50", lot: "SLP-2026-0414-0055", from: "C3", to: "B2", qty: "6", operator: "박영희", reason: "출하준비" },
  { time: "08:20", lot: "SLP-2026-0414-0040", from: "A2", to: "C1", qty: "8", operator: "이준호", reason: "재배치" },
  { time: "07:45", lot: "SLP-2026-0413-0078", from: "B4", to: "A5", qty: "4", operator: "김철수", reason: "양생완료" },
  { time: "07:10", lot: "SLP-2026-0413-0065", from: "C5", to: "B1", qty: "6", operator: "박영희", reason: "출하준비" },
];

export default function SleeperMovePage() {
  const [barcode, setBarcode] = useState("");
  const [scanned, setScanned] = useState(false);
  const [toZone, setToZone] = useState("");
  const [reason, setReason] = useState("재배치");
  const [confirmed, setConfirmed] = useState(false);

  const handleScan = () => {
    if (barcode.trim()) setScanned(true);
  };

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(() => {
      setConfirmed(false);
      setScanned(false);
      setToZone("");
      setBarcode("");
    }, 2000);
  };

  const toZoneInfo = toZone ? ZONE_AVAILABILITY[toZone] : null;
  const toZoneFull = toZoneInfo ? toZoneInfo.load >= toZoneInfo.capacity : false;

  return (
    <div className="max-w-5xl">
      <PageHeader
        title="침목"
        accent="이동"
        description="야적장 내 슬리퍼의 위치를 이동합니다. 출발/도착 구역을 선택하고 이동 사유를 기록합니다."
        nodeRef="SCR-YRD-004"
        status="FIELD"
      />

      {/* Step 1: Scan */}
      <section className="bg-surface-container-lowest p-6 mb-6">
        <FieldHeader title="1단계 - 침목 LOT 스캔" moduleRef="MV-SCAN" />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8">
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">
              LOT 바코드
            </label>
            <div className="flex gap-0">
              <input
                type="text"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleScan()}
                placeholder="이동할 침목 LOT 스캔..."
                className="flex-1 bg-surface-container border border-outline-variant/20 px-4 py-3 text-sm font-headline text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-primary-accent"
              />
              <button
                onClick={handleScan}
                className="bg-primary-accent px-6 py-3 font-label text-xs uppercase tracking-widest font-bold text-on-primary-container hover:bg-primary-accent/80 transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">qr_code_scanner</span>
                스캔
              </button>
            </div>
          </div>
          <div className="md:col-span-4 flex items-end">
            <StatusBadge type={scanned ? "running" : "idle"} label={scanned ? "LOT 확인" : "스캔 대기중"} />
          </div>
        </div>
      </section>

      {/* LOT Info + Current Location */}
      {scanned && (
        <section className="bg-surface-container-lowest p-6 mb-6 border-l-4 border-tertiary">
          <FieldHeader title="LOT 정보" moduleRef="MV-LOT" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">LOT 번호</span>
              <span className="font-headline text-sm font-bold tabular-nums">{MOCK_LOT.lotNo}</span>
            </div>
            <div>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">제품</span>
              <span className="font-headline text-sm font-bold">{MOCK_LOT.productType}</span>
            </div>
            <div>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">수량</span>
              <span className="font-headline text-sm font-bold tabular-nums">{MOCK_LOT.qty} EA</span>
            </div>
            <div>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">중량</span>
              <span className="font-headline text-sm font-bold tabular-nums">{MOCK_LOT.weight} kg</span>
            </div>
            <div>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">현재 구역</span>
              <span className="font-headline text-lg font-black text-primary-accent">{MOCK_LOT.currentZone}</span>
            </div>
            <div>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">배치일시</span>
              <span className="font-headline text-sm tabular-nums">{MOCK_LOT.placedDate}</span>
            </div>
            <div>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">양생일수</span>
              <span className="font-headline text-sm tabular-nums">{MOCK_LOT.cureAge}</span>
            </div>
          </div>
        </section>
      )}

      {/* Step 2: From/To Zone Selection */}
      {scanned && (
        <section className="bg-surface-container-lowest p-6 mb-6">
          <FieldHeader title="2단계 - 목적지 선택" moduleRef="MV-DEST" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* From */}
            <div className="bg-surface-container p-5 border-l-4 border-primary-accent">
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">출발 구역</span>
              <span className="font-headline text-3xl font-black text-primary-accent">{MOCK_LOT.currentZone}</span>
              <div className="mt-2 font-label text-[11px] uppercase tracking-widest text-on-surface-variant opacity-60">
                {ZONE_AVAILABILITY[MOCK_LOT.currentZone].load}/{ZONE_AVAILABILITY[MOCK_LOT.currentZone].capacity} EA
              </div>
            </div>

            {/* To */}
            <div className="bg-surface-container p-5 border-l-4 border-tertiary">
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">도착 구역</span>
              {toZone ? (
                <>
                  <span className="font-headline text-3xl font-black text-tertiary">{toZone}</span>
                  <div className="mt-2 font-label text-[11px] uppercase tracking-widest text-on-surface-variant opacity-60">
                    {toZoneInfo && `${toZoneInfo.load}/${toZoneInfo.capacity} EA`}
                  </div>
                </>
              ) : (
                <span className="font-headline text-lg text-on-surface-variant opacity-30">아래에서 선택</span>
              )}
            </div>
          </div>

          {/* Zone Grid Selector */}
          <div className="grid grid-cols-5 gap-2 mb-4">
            {ZONE_LIST.map((zid) => {
              const info = ZONE_AVAILABILITY[zid];
              const isFull = info.load >= info.capacity;
              const isCurrent = zid === MOCK_LOT.currentZone;
              return (
                <button
                  key={zid}
                  onClick={() => !isFull && !isCurrent && setToZone(zid)}
                  disabled={isFull || isCurrent}
                  className={`p-3 text-center transition-all ${
                    isCurrent
                      ? "bg-primary-accent/20 border-l-2 border-primary-accent cursor-not-allowed"
                      : isFull
                      ? "bg-error/10 border-l-2 border-error/30 cursor-not-allowed opacity-60"
                      : toZone === zid
                      ? "bg-tertiary/20 border-l-2 border-tertiary ring-2 ring-tertiary"
                      : "bg-surface-container border-l-2 border-outline-variant/20 hover:bg-surface-container-high"
                  }`}
                >
                  <div className="font-headline text-sm font-black">{zid}</div>
                  <div className="font-label text-[8px] tabular-nums text-on-surface-variant opacity-60">
                    {info.load}/{info.capacity}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Reason */}
          <div className="mt-4">
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">이동 사유</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full md:w-1/3 bg-surface-container border border-outline-variant/20 px-4 py-3 text-sm font-headline text-on-surface focus:outline-none focus:border-primary-accent appearance-none"
            >
              <option>재배치</option>
              <option>출하준비</option>
              <option>양생완료</option>
              <option>품질이슈</option>
              <option>기타</option>
            </select>
          </div>
        </section>
      )}

      {/* Step 3: Confirm */}
      {scanned && toZone && !toZoneFull && (
        <section className="bg-surface-container-lowest p-6 mb-6 border-l-4 border-primary-accent">
          <FieldHeader title="3단계 - 이동 확정" moduleRef="MV-CONFIRM" />
          <div className="flex items-center gap-8 mb-6">
            <div className="text-center">
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">출발</span>
              <span className="font-headline text-2xl font-black text-primary-accent">{MOCK_LOT.currentZone}</span>
            </div>
            <span className="material-symbols-outlined text-2xl text-on-surface-variant opacity-60">arrow_forward</span>
            <div className="text-center">
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">도착</span>
              <span className="font-headline text-2xl font-black text-tertiary">{toZone}</span>
            </div>
            <div className="ml-auto text-right">
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">LOT</span>
              <span className="font-headline text-sm font-bold tabular-nums">{MOCK_LOT.lotNo}</span>
            </div>
          </div>

          {confirmed ? (
            <div className="bg-tertiary/20 p-4 flex items-center gap-3">
              <span className="material-symbols-outlined text-tertiary">check_circle</span>
              <span className="font-label text-xs uppercase tracking-widest text-tertiary font-bold">
                이동이 성공적으로 완료되었습니다
              </span>
            </div>
          ) : (
            <button
              onClick={handleConfirm}
              className="bg-primary-accent px-8 py-4 font-label text-xs uppercase tracking-widest font-bold text-on-primary-container hover:bg-primary-accent/80 transition-colors w-full md:w-auto"
            >
              이동 확정
            </button>
          )}
        </section>
      )}

      {/* Move History */}
      <DataTable
        title="이동 이력 (금일)"
        columns={[
          { key: "time", label: "시간" },
          { key: "lot", label: "LOT 번호" },
          { key: "from", label: "출발" },
          { key: "to", label: "도착" },
          { key: "qty", label: "수량" },
          { key: "reason", label: "사유" },
          { key: "operator", label: "작업자" },
        ]}
        data={MOVE_HISTORY}
        bufferCount={MOVE_HISTORY.length}
      />

      {/* Footer */}
      <footer className="mt-6 bg-surface-container p-4 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-tertiary inline-block" />
            <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">스캐너 온라인</span>
          </div>
          <StatusBadge type="running" label="FIELD MODE" />
        </div>
        <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">
          금일 이동: <span className="text-on-surface tabular-nums font-bold">{String(MOVE_HISTORY.length).padStart(2, "0")}</span>
        </span>
      </footer>
    </div>
  );
}
