"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DataTable } from "@/components/ui/DataTable";

const EQUIPMENT_IDS = ["TG-01", "TG-02", "TG-03", "TG-04", "TG-05", "TG-06", "TG-07"];

const PRODUCT_TYPES = [
  "WM-304-1.0", "WM-304-1.5", "WM-304-2.0", "WM-304-2.5",
  "WM-316-1.0", "WM-316-1.5", "WM-316-2.0",
  "WM-201-1.0", "WM-201-1.5",
];

interface ProductionRecord {
  id: string;
  lot: string;
  equipment: string;
  productType: string;
  quantity: number;
  inputLot: string;
  operator: string;
  createdAt: string;
  status: "confirmed" | "cancelled" | "pending";
  notes: string;
}

const MOCK_RECORDS: ProductionRecord[] = [
  { id: "PR-0415-001", lot: "TG-2026-0415-001", equipment: "TG-01", productType: "WM-304-2.0", quantity: 142.5, inputLot: "WL-2026-0415-001", operator: "Kim JH", createdAt: "14:45:00", status: "confirmed", notes: "" },
  { id: "PR-0415-002", lot: "TG-2026-0415-002", equipment: "TG-02", productType: "WM-316-1.5", quantity: 118.3, inputLot: "WL-2026-0415-002", operator: "Park SY", createdAt: "14:22:00", status: "confirmed", notes: "" },
  { id: "PR-0415-003", lot: "TG-2026-0415-003", equipment: "TG-04", productType: "WM-201-1.0", quantity: 95.7, inputLot: "WL-2026-0415-003", operator: "Lee MJ", createdAt: "13:58:00", status: "pending", notes: "Pending QC check" },
  { id: "PR-0415-004", lot: "TG-2026-0415-004", equipment: "TG-06", productType: "WM-304-1.5", quantity: 156.2, inputLot: "WL-2026-0415-005", operator: "Choi DH", createdAt: "13:30:00", status: "confirmed", notes: "" },
  { id: "PR-0415-005", lot: "TG-2026-0414-012", equipment: "TG-03", productType: "WM-304-2.5", quantity: 78.4, inputLot: "WL-2026-0414-018", operator: "Kim JH", createdAt: "11:15:00", status: "cancelled", notes: "Wrong input material" },
];

const RECORD_COLUMNS = [
  { key: "createdAt", label: "시간" },
  { key: "id", label: "실적 ID" },
  { key: "lot", label: "산출 LOT" },
  { key: "equipment", label: "설비" },
  { key: "productType", label: "제품종류" },
  { key: "quantity", label: "수량 (m\u00B2)" },
  { key: "operator", label: "작업자" },
  { key: "status", label: "상태" },
];

export default function P2ProductionPage() {
  const [selectedEquip, setSelectedEquip] = useState("TG-01");
  const [inputLot, setInputLot] = useState("");
  const [productType, setProductType] = useState(PRODUCT_TYPES[0]);
  const [quantity, setQuantity] = useState("");
  const [notes, setNotes] = useState("");
  const [records] = useState(MOCK_RECORDS);

  // v2.1 cancel/correction
  const [cancelId, setCancelId] = useState("");
  const [cancelReason, setCancelReason] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Production record submitted:\nEquipment: ${selectedEquip}\nInput LOT: ${inputLot}\nProduct: ${productType}\nQuantity: ${quantity} m\u00B2`);
  };

  const handleCancel = () => {
    if (!cancelId.trim()) return;
    alert(`Cancel request submitted for ${cancelId}\nReason: ${cancelReason}`);
    setCancelId("");
    setCancelReason("");
  };

  return (
    <div>
      <PageHeader
        title="2공정 TG"
        accent="생산 실적"
        nodeRef="SCR-P2-004"
        description="TG 공정의 생산 실적을 등록합니다. 제품종류, 수량(m²)을 입력하고 실적 취소/정정이 가능합니다."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Production Form */}
        <div className="lg:col-span-1">
          <FieldHeader title="생산 실적 입력" moduleRef="PROD.ENTRY" />

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
                설비
              </label>
              <select
                value={selectedEquip}
                onChange={(e) => setSelectedEquip(e.target.value)}
                className="w-full bg-surface-container-lowest border border-outline-variant/20 px-3 py-2 text-sm font-headline text-on-surface focus:border-primary-accent focus:outline-none"
              >
                {EQUIPMENT_IDS.map((eq) => (
                  <option key={eq} value={eq}>{eq}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
                투입 LOT (와이어)
              </label>
              <input
                type="text"
                value={inputLot}
                onChange={(e) => setInputLot(e.target.value)}
                placeholder="WL-2026-0415-..."
                className="w-full bg-surface-container-lowest border border-outline-variant/20 px-3 py-2 text-sm font-headline text-on-surface focus:border-primary-accent focus:outline-none placeholder:text-on-surface-variant/30"
              />
            </div>

            <div>
              <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
                제품종류
              </label>
              <select
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                className="w-full bg-surface-container-lowest border border-outline-variant/20 px-3 py-2 text-sm font-headline text-on-surface focus:border-primary-accent focus:outline-none"
              >
                {PRODUCT_TYPES.map((pt) => (
                  <option key={pt} value={pt}>{pt}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
                수량 (m&sup2;)
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                step="0.1"
                min="0"
                placeholder="0.0"
                className="w-full bg-surface-container-lowest border border-outline-variant/20 px-3 py-2 text-sm font-headline text-on-surface focus:border-primary-accent focus:outline-none tabular-nums placeholder:text-on-surface-variant/30"
              />
            </div>

            <div>
              <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
                비고
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                className="w-full bg-surface-container-lowest border border-outline-variant/20 px-3 py-2 text-sm font-headline text-on-surface focus:border-primary-accent focus:outline-none resize-none placeholder:text-on-surface-variant/30"
                placeholder="비고 입력 (선택)..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary-accent text-on-primary px-4 py-3 font-label text-xs uppercase tracking-widest font-bold hover:bg-primary transition-colors"
            >
              생산 실적 등록
            </button>
          </form>

          {/* Cancel / Correction [v2.1] */}
          <div className="mt-8">
            <FieldHeader title="취소/정정" moduleRef="PROD.CANCEL [v2.1]" />
            <div className="space-y-4">
              <div>
                <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
                  취소할 실적 ID
                </label>
                <input
                  type="text"
                  value={cancelId}
                  onChange={(e) => setCancelId(e.target.value)}
                  placeholder="PR-0415-..."
                  className="w-full bg-surface-container-lowest border border-error/30 px-3 py-2 text-sm font-headline text-on-surface focus:border-error focus:outline-none placeholder:text-on-surface-variant/30"
                />
              </div>
              <div>
                <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
                  사유
                </label>
                <input
                  type="text"
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="취소 사유 입력..."
                  className="w-full bg-surface-container-lowest border border-error/30 px-3 py-2 text-sm font-headline text-on-surface focus:border-error focus:outline-none placeholder:text-on-surface-variant/30"
                />
              </div>
              <button
                onClick={handleCancel}
                className="w-full bg-error/20 text-error border border-error/30 px-4 py-3 font-label text-xs uppercase tracking-widest font-bold hover:bg-error/30 transition-colors"
              >
                취소 요청
              </button>
            </div>
          </div>
        </div>

        {/* Records Table */}
        <div className="lg:col-span-2">
          <DataTable
            title="금일 생산 실적"
            columns={RECORD_COLUMNS}
            data={records.map((r) => ({
              createdAt: r.createdAt,
              id: r.id,
              lot: r.lot,
              equipment: r.equipment,
              productType: r.productType,
              quantity: r.quantity.toFixed(1),
              operator: r.operator,
              status: r.status.toUpperCase(),
            }))}
            bufferCount={records.length}
          />
        </div>
      </div>
    </div>
  );
}
