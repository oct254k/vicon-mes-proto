"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DataTable } from "@/components/ui/DataTable";

interface ShipItem {
  lotNo: string;
  product: string;
  qty: number;
  weight: string;
  zone: string;
  cureAge: string;
  qualityStatus: string;
}

const SCANNED_ITEMS: ShipItem[] = [
  { lotNo: "SLP-2026-0412-0078", product: "PC침목 8T", qty: 12, weight: "9,600", zone: "B4", cureAge: "3d", qualityStatus: "PASS" },
  { lotNo: "SLP-2026-0413-0045", product: "PC침목 8T", qty: 10, weight: "8,000", zone: "A2", cureAge: "2d", qualityStatus: "PASS" },
  { lotNo: "SLP-2026-0413-0060", product: "PC침목 8T", qty: 10, weight: "8,000", zone: "C3", cureAge: "2d", qualityStatus: "PASS" },
];

export default function ShipProcessPage() {
  const [barcode, setBarcode] = useState("");
  const [items, setItems] = useState<ShipItem[]>([]);
  const [vehicleNo, setVehicleNo] = useState("");
  const [driverName, setDriverName] = useState("");
  const [destination, setDestination] = useState("");
  const [vehicleType, setVehicleType] = useState("25t 트럭");
  const [shipConfirmed, setShipConfirmed] = useState(false);
  const [scanIndex, setScanIndex] = useState(0);

  const handleScan = () => {
    if (!barcode.trim()) return;
    if (scanIndex < SCANNED_ITEMS.length) {
      setItems((prev) => [...prev, SCANNED_ITEMS[scanIndex]]);
      setScanIndex((prev) => prev + 1);
    }
    setBarcode("");
  };

  const handleRemoveItem = (lotNo: string) => {
    setItems((prev) => prev.filter((i) => i.lotNo !== lotNo));
  };

  const totalQty = items.reduce((s, i) => s + i.qty, 0);
  const totalWeight = items.reduce((s, i) => s + parseInt(i.weight.replace(/,/g, ""), 10), 0);

  const handleConfirmShipment = () => {
    setShipConfirmed(true);
  };

  return (
    <div className="max-w-5xl">
      <PageHeader
        title="출하"
        accent="처리"
        description="출하 처리를 수행합니다. 차량 정보를 입력하고 출하할 슬리퍼 LOT를 스캔하여 출하를 확정합니다."
        nodeRef="SCR-SHP-001"
        status="FIELD"
      />

      {/* Vehicle Info */}
      <section className="bg-surface-container-lowest p-6 mb-6">
        <FieldHeader title="차량 / 트럭 정보" moduleRef="SHP-VEH" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">차량번호</label>
            <input
              type="text"
              value={vehicleNo}
              onChange={(e) => setVehicleNo(e.target.value)}
              placeholder="e.g. 12가 3456"
              className="w-full bg-surface-container border border-outline-variant/20 px-4 py-3 text-sm font-headline text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-primary-accent"
            />
          </div>
          <div>
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">운전자명</label>
            <input
              type="text"
              value={driverName}
              onChange={(e) => setDriverName(e.target.value)}
              placeholder="기사명"
              className="w-full bg-surface-container border border-outline-variant/20 px-4 py-3 text-sm font-headline text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-primary-accent"
            />
          </div>
          <div>
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">차량 종류</label>
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="w-full bg-surface-container border border-outline-variant/20 px-4 py-3 text-sm font-headline text-on-surface focus:outline-none focus:border-primary-accent appearance-none"
            >
              <option>25t 트럭</option>
              <option>15t 트럭</option>
              <option>11t 트럭</option>
              <option>5t 트럭</option>
            </select>
          </div>
          <div>
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">목적지</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="배송지"
              className="w-full bg-surface-container border border-outline-variant/20 px-4 py-3 text-sm font-headline text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-primary-accent"
            />
          </div>
        </div>
      </section>

      {/* Scan LOTs for Shipping */}
      <section className="bg-surface-container-lowest p-6 mb-6">
        <FieldHeader title="출하 LOT 스캔" moduleRef="SHP-SCAN" />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
          <div className="md:col-span-9">
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">
              LOT 바코드
            </label>
            <div className="flex gap-0">
              <input
                type="text"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleScan()}
                placeholder="출하 침목 LOT 스캔..."
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
          <div className="md:col-span-3 flex items-end">
            <StatusBadge type={items.length > 0 ? "running" : "idle"} label={`${items.length}건 스캔`} />
          </div>
        </div>
      </section>

      {/* Shipping List */}
      {items.length > 0 && (
        <section className="bg-surface-container-lowest mb-6">
          <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-primary-accent">
            <h3 className="font-headline font-black text-xs uppercase tracking-widest">
              출하 목록
              <span className="opacity-30 font-light ml-2">| {items.length} LOTs</span>
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container border-b border-outline-variant/10">
                  <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-60">LOT 번호</th>
                  <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-60">제품</th>
                  <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-60">수량</th>
                  <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-60">중량 (kg)</th>
                  <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-60">구역</th>
                  <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-60">양생</th>
                  <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-60">품질</th>
                  <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-60">작업</th>
                </tr>
              </thead>
              <tbody className="font-headline text-sm">
                {items.map((item) => (
                  <tr key={item.lotNo} className="border-b border-outline-variant/5 hover:bg-surface-container-highest/20 transition-colors">
                    <td className="px-4 py-2 tabular-nums font-bold">{item.lotNo}</td>
                    <td className="px-4 py-2">{item.product}</td>
                    <td className="px-4 py-2 tabular-nums">{item.qty}</td>
                    <td className="px-4 py-2 tabular-nums">{item.weight}</td>
                    <td className="px-4 py-2">{item.zone}</td>
                    <td className="px-4 py-2 tabular-nums">{item.cureAge}</td>
                    <td className="px-4 py-2">
                      <StatusBadge type="running" label={item.qualityStatus} />
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleRemoveItem(item.lotNo)}
                        className="text-error font-label text-xs uppercase tracking-widest hover:text-error/70 transition-colors"
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="p-4 bg-surface-container flex items-center justify-between flex-wrap gap-4 border-t border-outline-variant/10">
            <div className="flex items-center gap-8">
              <div>
                <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block">총 수량</span>
                <span className="font-headline text-xl font-black tabular-nums">{totalQty} EA</span>
              </div>
              <div>
                <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block">총 중량</span>
                <span className="font-headline text-xl font-black tabular-nums">{totalWeight.toLocaleString()} kg</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Confirm Shipment */}
      {items.length > 0 && !shipConfirmed && (
        <section className="bg-surface-container-lowest p-6 mb-6 border-l-4 border-primary-accent">
          <FieldHeader title="출하 확정" moduleRef="SHP-CONFIRM" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            <div>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">차량</span>
              <span className="font-headline text-sm font-bold">{vehicleNo || "-"}</span>
            </div>
            <div>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">운전자</span>
              <span className="font-headline text-sm">{driverName || "-"}</span>
            </div>
            <div>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">목적지</span>
              <span className="font-headline text-sm">{destination || "-"}</span>
            </div>
            <div>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">LOT / 수량</span>
              <span className="font-headline text-sm font-bold tabular-nums">{items.length} LOT / {totalQty} EA</span>
            </div>
          </div>
          <button
            onClick={handleConfirmShipment}
            className="bg-primary-accent px-10 py-4 font-label text-xs uppercase tracking-widest font-bold text-on-primary-container hover:bg-primary-accent/80 transition-colors w-full md:w-auto"
          >
            출하 확정
          </button>
        </section>
      )}

      {/* Success */}
      {shipConfirmed && (
        <section className="bg-tertiary/10 p-6 mb-6 border-l-4 border-tertiary">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-tertiary text-2xl">check_circle</span>
            <span className="font-headline text-lg font-black text-tertiary">출하 확정 완료</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">출하 ID</span>
              <span className="font-headline text-sm font-bold tabular-nums">SHP-2026-0415-005</span>
            </div>
            <div>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">총 수량</span>
              <span className="font-headline text-sm font-bold tabular-nums">{totalQty} EA</span>
            </div>
            <div>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">총 중량</span>
              <span className="font-headline text-sm font-bold tabular-nums">{totalWeight.toLocaleString()} kg</span>
            </div>
            <div>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-1">처리시각</span>
              <span className="font-headline text-sm tabular-nums">2026-04-15 10:35</span>
            </div>
          </div>
        </section>
      )}

      {/* Today's Shipments */}
      <DataTable
        title="금일 출하 현황"
        columns={[
          { key: "id", label: "출하 ID" },
          { key: "time", label: "시간" },
          { key: "vehicle", label: "차량" },
          { key: "destination", label: "목적지" },
          { key: "lots", label: "LOT" },
          { key: "qty", label: "수량" },
          { key: "weight", label: "중량 (kg)" },
          { key: "status", label: "상태" },
        ]}
        data={[
          { id: "SHP-0415-004", time: "10:05", vehicle: "54나 7890", destination: "서울지사", lots: "2", qty: "20", weight: "16,000", status: "DEPARTED" },
          { id: "SHP-0415-003", time: "09:30", vehicle: "32가 1234", destination: "부산현장", lots: "3", qty: "18", weight: "14,400", status: "DEPARTED" },
          { id: "SHP-0415-002", time: "08:45", vehicle: "78다 5678", destination: "대전현장", lots: "1", qty: "8", weight: "6,400", status: "DEPARTED" },
          { id: "SHP-0415-001", time: "07:30", vehicle: "21라 9012", destination: "광주현장", lots: "2", qty: "10", weight: "8,000", status: "DEPARTED" },
        ]}
        bufferCount={4}
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
          금일 출하: <span className="text-on-surface tabular-nums font-bold">04</span>
        </span>
      </footer>
    </div>
  );
}
