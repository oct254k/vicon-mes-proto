"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    id: "rm",
    label: "원자재 관리",
    icon: "inventory_2",
    href: "/rm",
    sub: [
      { label: "입고 등록", href: "/rm/register" },
      { label: "라벨 발행", href: "/rm/label" },
      { label: "재고 현황", href: "/rm/inventory" },
    ],
  },
  {
    id: "p1",
    label: "1공정 신선",
    icon: "manufacturing",
    href: "/p1",
    sub: [
      { label: "투입 스캔", href: "/p1/scan" },
      { label: "생산 실적", href: "/p1/production" },
      { label: "LOT 라벨", href: "/p1/label" },
      { label: "KS 라벨", href: "/p1/ks-label" },
      { label: "부적합 등록", href: "/p1/defect" },
      { label: "다이 관리", href: "/p1/die" },
    ],
  },
  {
    id: "p2",
    label: "2공정 TG",
    icon: "precision_manufacturing",
    href: "/p2",
    sub: [
      { label: "가동 모니터링", href: "/p2/monitor" },
      { label: "생산량 집계", href: "/p2/output" },
      { label: "투입 스캔", href: "/p2/scan" },
      { label: "생산 실적", href: "/p2/production" },
      { label: "LOT 라벨", href: "/p2/label" },
      { label: "타입 세팅", href: "/p2/type-setting" },
      { label: "부적합 등록", href: "/p2/defect" },
      { label: "파라미터 기록", href: "/p2/params" },
    ],
  },
  {
    id: "p3",
    label: "3공정 성형",
    icon: "view_in_ar",
    href: "/p3",
    sub: [
      { label: "투입 스캔", href: "/p3/scan" },
      { label: "생산 실적", href: "/p3/production" },
      { label: "LOT 라벨", href: "/p3/label" },
      { label: "부적합 등록", href: "/p3/defect" },
      { label: "파라미터 기록", href: "/p3/params" },
    ],
  },
  {
    id: "p4",
    label: "4공정 조립",
    icon: "construction",
    href: "/p4",
    sub: [
      { label: "외주 작업지시", href: "/p4/work-order" },
      { label: "투입 스캔", href: "/p4/scan" },
      { label: "생산 실적", href: "/p4/production" },
      { label: "LOT 라벨", href: "/p4/label" },
      { label: "부적합 등록", href: "/p4/defect" },
    ],
  },
  {
    id: "fin",
    label: "마무리",
    icon: "check_circle",
    href: "/fin",
    sub: [
      { label: "용접 확인", href: "/fin/weld" },
      { label: "슬리퍼 라벨", href: "/fin/sleeper-label" },
    ],
  },
  {
    id: "yrd",
    label: "야적장",
    icon: "warehouse",
    href: "/yrd",
    sub: [
      { label: "구역 마스터", href: "/yrd/zone" },
      { label: "위치 등록", href: "/yrd/location-reg" },
      { label: "위치 조회", href: "/yrd/location-view" },
      { label: "위치 이동", href: "/yrd/move" },
      { label: "재고 현황", href: "/yrd/inventory" },
      { label: "적재/출하 현황", href: "/yrd/load-status" },
    ],
  },
  {
    id: "shp",
    label: "출하",
    icon: "local_shipping",
    href: "/shp",
    sub: [
      { label: "출하 처리", href: "/shp/process" },
      { label: "품질 성적서", href: "/shp/quality-cert" },
    ],
  },
  {
    id: "trc",
    label: "이력추적",
    icon: "timeline",
    href: "/trace",
    sub: [
      { label: "LOT 계보", href: "/trace/genealogy" },
      { label: "순방향 추적", href: "/trace/forward" },
      { label: "역방향 추적", href: "/trace/backward" },
      { label: "이력 타임라인", href: "/trace/timeline" },
    ],
  },
  {
    id: "eqp",
    label: "설비관리",
    icon: "engineering",
    href: "/eqp",
    sub: [
      { label: "가동 현황", href: "/eqp/status" },
      { label: "정지 알림", href: "/eqp/stop-alert" },
      { label: "고장 입력", href: "/eqp/fault" },
      { label: "MTBF 리포트", href: "/eqp/mtbf" },
    ],
  },
  {
    id: "alm",
    label: "알람",
    icon: "warning",
    href: "/alarm",
    sub: [
      { label: "부적합 알람", href: "/alarm/defect" },
      { label: "설비 알람", href: "/alarm/equipment" },
      { label: "조립 지시", href: "/alarm/assembly" },
      { label: "자재교체 안돈", href: "/alarm/andon" },
    ],
  },
  {
    id: "dsh",
    label: "대시보드",
    icon: "dashboard",
    href: "/dashboard",
    sub: [
      { label: "실시간 현황판", href: "/dashboard" },
      { label: "생산 리포트", href: "/dashboard/report" },
    ],
  },
  {
    id: "com",
    label: "시스템 관리",
    icon: "settings",
    href: "/system",
    sub: [
      { label: "공정 진행현황", href: "/system/process" },
      { label: "감사 로그", href: "/system/audit" },
      { label: "사용자/권한", href: "/system/users" },
    ],
  },
];

export function SideNav() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-64px)] flex flex-col z-40 bg-surface-container-lowest border-r border-surface-container-highest/10 w-72 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-outline-variant/15">
        <div className="flex items-center gap-3">
          <Image
            src="/vicon_logo.png"
            alt="VICON Logo"
            width={140}
            height={40}
            className="h-5 w-auto"
            priority
          />
          <div className="w-px h-5 bg-outline-variant/30" />
          <span className="font-headline font-black text-sm tracking-tight text-white">
            데크 3공장
          </span>
        </div>
      </div>

      {/* Scrollable Nav */}
      <nav className="flex-1 overflow-y-auto py-3 sidebar-scroll">
        {menuItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <div key={item.id} className="mb-1">
              {/* 1depth - 그룹 헤더 */}
              <div
                className={`flex items-center gap-3 px-5 py-2 ${
                  isActive ? "text-primary-accent" : "text-white/90"
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {item.icon}
                </span>
                <span className="font-label text-sm uppercase tracking-[0.1em] font-bold">
                  {item.label}
                </span>
              </div>

              {/* 2depth - 서브메뉴 항상 펼침 */}
              <div className="flex flex-col gap-px ml-5 mr-3 mb-2">
                {item.sub.map((sub) => {
                  const isSubActive = pathname === sub.href;
                  return (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className={`relative flex items-center gap-2.5 pl-7 pr-3 py-1.5 text-sm font-body transition-all duration-150 ${
                        isSubActive
                          ? "text-primary-accent font-semibold bg-primary-accent/10 border-l-2 border-primary-accent"
                          : "text-white/70 hover:text-white hover:bg-white/5 border-l-2 border-transparent"
                      }`}
                    >
                      {isSubActive && (
                        <span className="absolute left-3 w-1.5 h-1.5 bg-primary-accent" />
                      )}
                      {sub.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 bg-surface/50 border-t border-outline-variant/15">
        <button className="w-full py-2.5 bg-error-container text-error font-headline font-black text-sm tracking-tight uppercase border border-error/20 hover:bg-error hover:text-on-error transition-colors">
          긴급 정지
        </button>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .sidebar-scroll::-webkit-scrollbar {
          width: 3px;
        }
        .sidebar-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .sidebar-scroll::-webkit-scrollbar-thumb {
          background: rgba(200, 90, 60, 0.3);
          border-radius: 0;
        }
        .sidebar-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(200, 90, 60, 0.6);
        }
        .sidebar-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(200, 90, 60, 0.3) transparent;
        }
      `}</style>
    </aside>
  );
}
