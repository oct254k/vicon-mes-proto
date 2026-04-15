"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

interface TimelineEvent {
  id: string;
  type: "created" | "input" | "production" | "label" | "inspection" | "shipment";
  timestamp: string;
  operator: string;
  title: string;
  details: string;
  lotId: string;
}

const EVENT_STYLES: Record<string, { color: string; icon: string }> = {
  created: { color: "bg-on-surface-variant", icon: "add_circle" },
  input: { color: "bg-primary-accent", icon: "login" },
  production: { color: "bg-tertiary", icon: "precision_manufacturing" },
  label: { color: "bg-[#f59e0b]", icon: "label" },
  inspection: { color: "bg-primary", icon: "verified" },
  shipment: { color: "bg-tertiary-container", icon: "local_shipping" },
};

const MOCK_EVENTS: TimelineEvent[] = [
  {
    id: "EVT-001",
    type: "created",
    timestamp: "2026-04-01 06:00:12",
    operator: "SYS-AUTO",
    title: "LOT 생성",
    details: "원자재 LOT RM-2026-0401-012 생성. 자재: SWRH 62B, 공급사: POSCO, 중량: 5,000 kg",
    lotId: "RM-2026-0401-012",
  },
  {
    id: "EVT-002",
    type: "input",
    timestamp: "2026-04-03 07:15:33",
    operator: "OP-KIM-J",
    title: "신선 공정 투입",
    details: "스캔 후 신선기 #1에 적재. FIFO 검증: 합격. 대기 순번: #3",
    lotId: "P1-2026-0403-007",
  },
  {
    id: "EVT-003",
    type: "production",
    timestamp: "2026-04-03 08:42:18",
    operator: "OP-KIM-J",
    title: "신선 완료",
    details: "생산량: 4,850 kg. 다이스: D-0.82mm. 속도: 450 m/min. 수율: 97.0%. 설비: Wire Draw #1",
    lotId: "P1-2026-0403-007",
  },
  {
    id: "EVT-004",
    type: "label",
    timestamp: "2026-04-03 09:01:45",
    operator: "OP-PARK-S",
    title: "라벨 출력",
    details: "공정 라벨 부착. 바코드: BC-P1-2026-0403-007. 라벨 유형: 생산. 매수: 2",
    lotId: "P1-2026-0403-007",
  },
  {
    id: "EVT-005",
    type: "inspection",
    timestamp: "2026-04-04 10:30:22",
    operator: "QC-LEE-M",
    title: "품질 검사",
    details: "직경: 0.82mm (+0.02mm 편차). 인장강도: 1,850 MPa. 처리: 특채. 검사자 참고: 공차 이내",
    lotId: "P1-2026-0403-007",
  },
  {
    id: "EVT-006",
    type: "input",
    timestamp: "2026-04-05 06:22:11",
    operator: "OP-CHOI-H",
    title: "열처리 공정 투입",
    details: "가열로 HT-03에 장입. 프로그램: STD-ANNEAL-720. 목표 온도: 720C, 소요시간: 4h",
    lotId: "P2-2026-0405-003",
  },
  {
    id: "EVT-007",
    type: "production",
    timestamp: "2026-04-05 14:18:07",
    operator: "OP-CHOI-H",
    title: "열처리 완료",
    details: "생산량: 4,800 kg. 최고 온도: 722C. 유지시간: 4h 02min. 냉각: 공랭. 수율: 98.9%",
    lotId: "P2-2026-0405-003",
  },
  {
    id: "EVT-008",
    type: "production",
    timestamp: "2026-04-09 11:05:44",
    operator: "OP-JUNG-W",
    title: "성형 완료",
    details: "생산량: 4,700 kg. 프레스: FRM-02. 사이클 타임: 2.1s. 불량률: 0.3%. 수율: 98.9%",
    lotId: "P4-2026-0409-002",
  },
  {
    id: "EVT-009",
    type: "inspection",
    timestamp: "2026-04-10 09:12:55",
    operator: "QC-SHIN-K",
    title: "최종 검사",
    details: "외관: 합격. 치수: 합격. 경도: HRC 42 (규격: 40-45). 염수분무: 120h 합격",
    lotId: "FIN-2026-0411-001",
  },
  {
    id: "EVT-010",
    type: "shipment",
    timestamp: "2026-04-12 15:30:00",
    operator: "LOG-HAN-B",
    title: "출하 완료",
    details: "고객: 현대모비스. PO: HM-2026-0388. 팔레트: PLT-0412-001. 운송사: CJ 대한통운",
    lotId: "FIN-2026-0411-001",
  },
];

export default function TimelinePage() {
  const [searchLot, setSearchLot] = useState("");
  const [searched, setSearched] = useState(false);
  const [filterType, setFilterType] = useState<string>("all");

  const handleSearch = () => {
    if (searchLot.trim()) {
      setSearched(true);
    }
  };

  const filteredEvents = filterType === "all"
    ? MOCK_EVENTS
    : MOCK_EVENTS.filter((e) => e.type === filterType);

  return (
    <div className="max-w-5xl">
      <PageHeader
        title="이력"
        accent="타임라인"
        description="특정 LOT의 전체 이력을 시간순으로 조회합니다. 생성, 투입, 생산, 검사, 출하 등 모든 이벤트를 확인합니다."
        nodeRef="SCR-TRC-004"
        status="ONLINE"
      />

      {/* Search Section */}
      <section className="bg-surface-container-lowest p-6 mb-6">
        <FieldHeader title="LOT 검색" moduleRef="MOD-TIMELINE-01" />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-6">
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">
              LOT 번호
            </label>
            <div className="flex gap-0">
              <input
                type="text"
                value={searchLot}
                onChange={(e) => setSearchLot(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="LOT ID를 입력하세요"
                className="flex-1 bg-surface-container border border-outline-variant/20 px-4 py-3 text-sm font-headline text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-primary-accent"
              />
              <button
                onClick={handleSearch}
                className="bg-primary-accent px-6 py-3 font-label text-xs uppercase tracking-widest font-bold text-on-primary-container hover:bg-primary-accent/80 transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">timeline</span>
                검색
              </button>
            </div>
          </div>

          {/* Event Type Filter */}
          <div className="md:col-span-4">
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">
              이벤트 유형 필터
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full bg-surface-container border border-outline-variant/20 px-4 py-3 text-sm font-headline text-on-surface focus:outline-none focus:border-primary-accent appearance-none cursor-pointer"
            >
              <option value="all">전체 이벤트</option>
              <option value="created">생성</option>
              <option value="input">투입</option>
              <option value="production">생산</option>
              <option value="label">라벨</option>
              <option value="inspection">검사</option>
              <option value="shipment">출하</option>
            </select>
          </div>

          <div className="md:col-span-2 flex items-end">
            <StatusBadge type={searched ? "running" : "idle"} label={searched ? "로드완료" : "대기"} />
          </div>
        </div>
      </section>

      {/* Timeline */}
      {searched && (
        <section className="mb-6">
          <FieldHeader title="이벤트 타임라인" moduleRef="EVT-LOG" />

          {/* Summary Bar */}
          <div className="bg-surface-container p-4 mb-6 grid grid-cols-3 md:grid-cols-6 gap-4">
            {Object.entries(EVENT_STYLES).map(([type, style]) => {
              const count = MOCK_EVENTS.filter((e) => e.type === type).length;
              return (
                <button
                  key={type}
                  onClick={() => setFilterType(filterType === type ? "all" : type)}
                  className={`flex items-center gap-2 p-2 transition-colors ${filterType === type ? "bg-surface-container-highest" : "hover:bg-surface-container-high"}`}
                >
                  <div className={`w-2 h-2 ${style.color}`} />
                  <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">{type}</span>
                  <span className="font-headline text-xs font-bold tabular-nums ml-auto">{count}</span>
                </button>
              );
            })}
          </div>

          {/* Vertical Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[19px] md:left-[23px] top-0 bottom-0 w-[2px] bg-outline-variant/20" />

            <div className="space-y-0">
              {filteredEvents.map((event) => {
                const style = EVENT_STYLES[event.type];
                return (
                  <div key={event.id} className="relative flex gap-4 md:gap-6 pb-6">
                    {/* Timeline dot */}
                    <div className="relative z-10 shrink-0">
                      <div className={`w-10 h-10 md:w-12 md:h-12 ${style.color} flex items-center justify-center`}>
                        <span className="material-symbols-outlined text-base md:text-lg text-surface">{style.icon}</span>
                      </div>
                    </div>

                    {/* Event content */}
                    <div className="flex-1 bg-surface-container-lowest border border-outline-variant/10 p-4">
                      <div className="flex items-start justify-between gap-2 flex-wrap mb-2">
                        <div>
                          <h4 className="font-headline text-sm font-bold">{event.title}</h4>
                          <span className="font-label text-xs uppercase tracking-widest text-primary-accent">{event.lotId}</span>
                        </div>
                        <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">{event.id}</span>
                      </div>

                      <p className="font-headline text-xs text-on-surface-variant opacity-80 mb-3 leading-relaxed">{event.details}</p>

                      <div className="flex items-center gap-6 flex-wrap">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-xs opacity-60">schedule</span>
                          <span className="font-headline text-xs tabular-nums opacity-60">{event.timestamp}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-xs opacity-60">person</span>
                          <span className="font-headline text-xs opacity-60">{event.operator}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="mt-6 bg-surface-container p-4 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-tertiary inline-block" />
            <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">이벤트 로거 온라인</span>
          </div>
          <StatusBadge type="running" label="활성" />
        </div>
        <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">
          전체 이벤트: <span className="text-on-surface tabular-nums font-bold">{String(MOCK_EVENTS.length).padStart(2, "0")}</span>
        </span>
      </footer>
    </div>
  );
}
