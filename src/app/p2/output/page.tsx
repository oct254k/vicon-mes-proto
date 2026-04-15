"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

const EQUIPMENT_IDS = ["TG-01", "TG-02", "TG-03", "TG-04", "TG-05", "TG-06", "TG-07"];

type AggPeriod = "hourly" | "daily" | "weekly" | "monthly";

interface OutputRow {
  period: string;
  "TG-01": number;
  "TG-02": number;
  "TG-03": number;
  "TG-04": number;
  "TG-05": number;
  "TG-06": number;
  "TG-07": number;
}

const MOCK_HOURLY: OutputRow[] = [
  { period: "06:00", "TG-01": 84.2, "TG-02": 78.1, "TG-03": 0, "TG-04": 82.5, "TG-05": 71.3, "TG-06": 91.0, "TG-07": 0 },
  { period: "07:00", "TG-01": 112.5, "TG-02": 98.4, "TG-03": 45.2, "TG-04": 105.8, "TG-05": 88.6, "TG-06": 118.2, "TG-07": 0 },
  { period: "08:00", "TG-01": 128.3, "TG-02": 115.7, "TG-03": 62.1, "TG-04": 121.4, "TG-05": 102.3, "TG-06": 132.8, "TG-07": 0 },
  { period: "09:00", "TG-01": 135.1, "TG-02": 122.0, "TG-03": 68.4, "TG-04": 128.7, "TG-05": 0, "TG-06": 140.5, "TG-07": 0 },
  { period: "10:00", "TG-01": 131.8, "TG-02": 118.9, "TG-03": 55.3, "TG-04": 125.1, "TG-05": 0, "TG-06": 138.2, "TG-07": 0 },
  { period: "11:00", "TG-01": 119.4, "TG-02": 108.2, "TG-03": 41.0, "TG-04": 112.6, "TG-05": 0, "TG-06": 125.7, "TG-07": 0 },
  { period: "12:00", "TG-01": 52.1, "TG-02": 48.3, "TG-03": 0, "TG-04": 50.8, "TG-05": 0, "TG-06": 55.4, "TG-07": 0 },
  { period: "13:00", "TG-01": 124.6, "TG-02": 112.8, "TG-03": 58.9, "TG-04": 118.3, "TG-05": 95.2, "TG-06": 131.4, "TG-07": 0 },
  { period: "14:00", "TG-01": 132.4, "TG-02": 119.6, "TG-03": 64.7, "TG-04": 126.0, "TG-05": 101.8, "TG-06": 139.1, "TG-07": 0 },
  { period: "15:00", "TG-01": 127.1, "TG-02": 110.3, "TG-03": 46.5, "TG-04": 119.5, "TG-05": 96.7, "TG-06": 134.8, "TG-07": 0 },
];

const MOCK_DAILY: OutputRow[] = [
  { period: "04-08", "TG-01": 1285.3, "TG-02": 1124.7, "TG-03": 642.8, "TG-04": 1198.5, "TG-05": 1056.2, "TG-06": 1342.1, "TG-07": 987.4 },
  { period: "04-09", "TG-01": 1312.6, "TG-02": 1098.2, "TG-03": 0, "TG-04": 1234.1, "TG-05": 1078.9, "TG-06": 1298.7, "TG-07": 1012.3 },
  { period: "04-10", "TG-01": 1298.4, "TG-02": 1145.8, "TG-03": 721.3, "TG-04": 1187.6, "TG-05": 1042.5, "TG-06": 1356.2, "TG-07": 0 },
  { period: "04-11", "TG-01": 1342.1, "TG-02": 1167.3, "TG-03": 689.5, "TG-04": 1256.8, "TG-05": 0, "TG-06": 1378.4, "TG-07": 0 },
  { period: "04-12", "TG-01": 0, "TG-02": 0, "TG-03": 0, "TG-04": 0, "TG-05": 0, "TG-06": 0, "TG-07": 0 },
  { period: "04-13", "TG-01": 0, "TG-02": 0, "TG-03": 0, "TG-04": 0, "TG-05": 0, "TG-06": 0, "TG-07": 0 },
  { period: "04-14", "TG-01": 1278.9, "TG-02": 1132.4, "TG-03": 587.6, "TG-04": 1201.3, "TG-05": 1034.8, "TG-06": 1312.5, "TG-07": 0 },
  { period: "04-15", "TG-01": 1147.5, "TG-02": 1032.3, "TG-03": 342.1, "TG-04": 1089.7, "TG-05": 876.4, "TG-06": 1221.8, "TG-07": 0 },
];

export default function P2OutputPage() {
  const [dateFrom, setDateFrom] = useState("2026-04-08");
  const [dateTo, setDateTo] = useState("2026-04-15");
  const [aggPeriod, setAggPeriod] = useState<AggPeriod>("daily");
  const [selectedEquip, setSelectedEquip] = useState<string>("ALL");

  const data = aggPeriod === "hourly" ? MOCK_HOURLY : MOCK_DAILY;
  const visibleEquip = selectedEquip === "ALL" ? EQUIPMENT_IDS : [selectedEquip];

  const getRowTotal = (row: OutputRow) =>
    visibleEquip.reduce((sum, eq) => sum + (row[eq as keyof OutputRow] as number), 0);

  const getColTotal = (eq: string) =>
    data.reduce((sum, row) => sum + (row[eq as keyof OutputRow] as number), 0);

  const grandTotal = data.reduce((sum, row) => sum + getRowTotal(row), 0);

  const handleExport = () => {
    const headers = ["기간", ...visibleEquip, "합계"];
    const rows = data.map((row) => [
      row.period,
      ...visibleEquip.map((eq) => (row[eq as keyof OutputRow] as number).toFixed(1)),
      getRowTotal(row).toFixed(1),
    ]);
    const totalsRow = ["합계", ...visibleEquip.map((eq) => getColTotal(eq).toFixed(1)), grandTotal.toFixed(1)];
    const csv = [headers.join(","), ...rows.map((r) => r.join(",")), totalsRow.join(",")].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `P2_TG_Output_${dateFrom}_${dateTo}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <PageHeader
        title="2공정 TG"
        accent="생산량 집계"
        nodeRef="SCR-P2-002"
        description="TG 공정의 설비별·시간대별 생산량을 집계합니다. 기간별 조회와 엑셀 내보내기가 가능합니다."
      />

      {/* Filters */}
      <section className="mb-8">
        <FieldHeader title="조회 조건" moduleRef="OUTPUT.FILTER" />
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
              조회일 (시작)
            </label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant/20 px-3 py-2 text-sm font-headline text-on-surface focus:border-primary-accent focus:outline-none"
            />
          </div>
          <div>
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
              조회일 (종료)
            </label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant/20 px-3 py-2 text-sm font-headline text-on-surface focus:border-primary-accent focus:outline-none"
            />
          </div>
          <div>
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
              집계단위
            </label>
            <select
              value={aggPeriod}
              onChange={(e) => setAggPeriod(e.target.value as AggPeriod)}
              className="w-full bg-surface-container-lowest border border-outline-variant/20 px-3 py-2 text-sm font-headline text-on-surface focus:border-primary-accent focus:outline-none"
            >
              <option value="hourly">시간별</option>
              <option value="daily">일별</option>
              <option value="weekly">주별</option>
              <option value="monthly">월별</option>
            </select>
          </div>
          <div>
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
              설비
            </label>
            <select
              value={selectedEquip}
              onChange={(e) => setSelectedEquip(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant/20 px-3 py-2 text-sm font-headline text-on-surface focus:border-primary-accent focus:outline-none"
            >
              <option value="ALL">전체 설비</option>
              {EQUIPMENT_IDS.map((eq) => (
                <option key={eq} value={eq}>{eq}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={handleExport}
              className="w-full bg-primary-accent text-on-primary px-4 py-2 font-label text-xs uppercase tracking-widest font-bold hover:bg-primary transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">download</span>
              엑셀 내보내기
            </button>
          </div>
        </div>
      </section>

      {/* Pivot Table */}
      <section className="bg-surface-container-lowest">
        <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-xs uppercase tracking-widest">
            생산량 집계 (m&sup2;)
            <span className="opacity-30 font-light ml-2">
              | {dateFrom} ~ {dateTo}
            </span>
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container border-b border-outline-variant/10">
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-60 sticky left-0 bg-surface-container z-10">
                  기간
                </th>
                {visibleEquip.map((eq) => (
                  <th key={eq} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-60 text-right">
                    {eq}
                  </th>
                ))}
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs text-primary-accent text-right">
                  합계
                </th>
              </tr>
            </thead>
            <tbody className="font-headline text-sm">
              {data.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-outline-variant/5 hover:bg-surface-container-highest/20 transition-colors"
                >
                  <td className="px-4 py-2 font-bold tabular-nums sticky left-0 bg-surface-container-lowest z-10">
                    {row.period}
                  </td>
                  {visibleEquip.map((eq) => {
                    const val = row[eq as keyof OutputRow] as number;
                    return (
                      <td key={eq} className={`px-4 py-2 tabular-nums text-right ${val === 0 ? "text-on-surface-variant opacity-30" : ""}`}>
                        {val.toFixed(1)}
                      </td>
                    );
                  })}
                  <td className="px-4 py-2 tabular-nums text-right font-bold text-primary-accent">
                    {getRowTotal(row).toFixed(1)}
                  </td>
                </tr>
              ))}
              {/* Totals Row */}
              <tr className="bg-surface-container border-t-2 border-primary-accent">
                <td className="px-4 py-2 font-bold font-label uppercase tracking-widest text-sm sticky left-0 bg-surface-container z-10">
                  합계
                </td>
                {visibleEquip.map((eq) => (
                  <td key={eq} className="px-4 py-2 tabular-nums text-right font-bold">
                    {getColTotal(eq).toFixed(1)}
                  </td>
                ))}
                <td className="px-4 py-2 tabular-nums text-right font-black text-primary-accent text-base">
                  {grandTotal.toFixed(1)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
