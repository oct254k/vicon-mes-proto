"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

type Priority = "urgent" | "high" | "normal";

interface AssemblyOrder {
  id: string;
  priority: Priority;
  product: string;
  productCode: string;
  quantity: number;
  unit: string;
  deadline: string;
  customer: string;
  assemblyLine: string;
  materials: string[];
  status: "pending" | "accepted" | "rejected";
}

const PRIORITY_STYLES: Record<Priority, { border: string; bg: string; text: string }> = {
  urgent: { border: "border-error", bg: "bg-error/10", text: "text-error" },
  high: { border: "border-[#f59e0b]", bg: "bg-[#f59e0b]/10", text: "text-[#f59e0b]" },
  normal: { border: "border-tertiary", bg: "bg-tertiary/10", text: "text-tertiary" },
};

const INITIAL_ORDERS: AssemblyOrder[] = [
  {
    id: "WO-260415-012",
    priority: "urgent",
    product: "Reinforced Steel Mesh A-Type",
    productCode: "RSM-A-5540",
    quantity: 2400,
    unit: "EA",
    deadline: "2026-04-15 14:00",
    customer: "Hyundai E&C",
    assemblyLine: "Assembly Line A",
    materials: ["5.5mm Wire Rod x120", "Cross Bar 10mm x80", "Welding Wire 1.2mm"],
    status: "pending",
  },
  {
    id: "WO-260415-013",
    priority: "high",
    product: "Standard Mesh Panel B-Type",
    productCode: "SMP-B-8020",
    quantity: 1800,
    unit: "EA",
    deadline: "2026-04-15 17:00",
    customer: "Samsung C&T",
    assemblyLine: "Assembly Line B",
    materials: ["8.0mm Deformed Bar x200", "Tie Wire 0.8mm x500"],
    status: "pending",
  },
  {
    id: "WO-260415-014",
    priority: "normal",
    product: "Custom Rebar Bundle C-Type",
    productCode: "CRB-C-1000",
    quantity: 500,
    unit: "Bundle",
    deadline: "2026-04-16 09:00",
    customer: "GS E&C",
    assemblyLine: "Assembly Line A",
    materials: ["10.0mm Deformed Bar x60", "Bundle Tag x500"],
    status: "pending",
  },
  {
    id: "WO-260415-011",
    priority: "high",
    product: "Reinforced Steel Mesh A-Type",
    productCode: "RSM-A-5540",
    quantity: 1200,
    unit: "EA",
    deadline: "2026-04-15 12:00",
    customer: "Daewoo E&C",
    assemblyLine: "Assembly Line A",
    materials: ["5.5mm Wire Rod x60", "Cross Bar 10mm x40", "Welding Wire 1.2mm"],
    status: "accepted",
  },
];

export default function AssemblyAlarmPage() {
  const [orders, setOrders] = useState<AssemblyOrder[]>(INITIAL_ORDERS);

  const handleAction = (id: string, action: "accepted" | "rejected") => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: action } : o))
    );
  };

  const pendingCount = orders.filter((o) => o.status === "pending").length;

  return (
    <div>
      <PageHeader
        title="조립 지시"
        accent="알림"
        nodeRef="SCR-ALM-003"
        status="MONITORING"
      />

      {/* Status */}
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 ${pendingCount > 0 ? "bg-[#f59e0b] animate-pulse" : "bg-tertiary"}`} />
          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
            대기 지시: <span className="tabular-nums text-[#f59e0b] font-bold">{String(pendingCount).padStart(2, "0")}</span>
          </span>
        </div>
        <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 ml-auto tabular-nums">
          2026-04-15 | Shift B
        </span>
      </div>

      {/* Mobile-style Card Container */}
      <div className="max-w-lg mx-auto space-y-4">
        {orders.map((order) => {
          const style = PRIORITY_STYLES[order.priority];
          return (
            <div
              key={order.id}
              className={`bg-surface-container-lowest border-l-4 ${style.border} ${
                order.status !== "pending" ? "opacity-50" : ""
              }`}
            >
              {/* Header */}
              <div className={`px-4 py-3 ${style.bg} flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <span className={`material-symbols-outlined text-lg ${style.text}`}>
                    assignment
                  </span>
                  <span className={`font-label text-xs uppercase tracking-widest font-bold ${style.text}`}>
                    {order.priority === "urgent" ? "긴급" : order.priority === "high" ? "높음" : "보통"} 우선순위
                  </span>
                </div>
                <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant tabular-nums">
                  {order.id}
                </span>
              </div>

              {/* Body */}
              <div className="px-4 py-4 space-y-3">
                <div>
                  <span className="font-headline text-sm font-bold block">{order.product}</span>
                  <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
                    {order.productCode} | {order.customer}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 bg-surface-container p-3">
                  <div className="text-center">
                    <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-1">
                      수량
                    </span>
                    <span className="font-headline text-lg font-black tabular-nums">{order.quantity.toLocaleString()}</span>
                    <span className="font-label text-xs text-on-surface-variant ml-1">{order.unit}</span>
                  </div>
                  <div className="text-center border-x border-outline-variant/10">
                    <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-1">
                      납기
                    </span>
                    <span className="font-headline text-xs tabular-nums font-bold">{order.deadline.split(" ")[1]}</span>
                    <span className="font-label text-xs text-on-surface-variant block">{order.deadline.split(" ")[0]}</span>
                  </div>
                  <div className="text-center">
                    <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-1">
                      라인
                    </span>
                    <span className="font-headline text-xs font-bold">{order.assemblyLine.replace("Assembly ", "")}</span>
                  </div>
                </div>

                {/* Materials */}
                <div className="border-t border-outline-variant/10 pt-3">
                  <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
                    소요 자재
                  </span>
                  <div className="space-y-1">
                    {order.materials.map((m, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-on-surface-variant opacity-60" />
                        <span className="text-xs text-on-surface-variant">{m}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {order.status !== "pending" && (
                  <div className="pt-2">
                    <StatusBadge
                      type={order.status === "accepted" ? "running" : "error"}
                      label={order.status.toUpperCase()}
                    />
                  </div>
                )}
              </div>

              {/* Actions */}
              {order.status === "pending" && (
                <div className="flex border-t border-outline-variant/10">
                  <button
                    onClick={() => handleAction(order.id, "accepted")}
                    className="flex-1 py-3 font-label text-xs uppercase tracking-widest font-bold text-tertiary hover:bg-tertiary/10 transition-colors text-center flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">check</span>
                    수락
                  </button>
                  <div className="w-px bg-outline-variant/10" />
                  <button
                    onClick={() => handleAction(order.id, "rejected")}
                    className="flex-1 py-3 font-label text-xs uppercase tracking-widest font-bold text-error hover:bg-error/10 transition-colors text-center flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">close</span>
                    거절
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
