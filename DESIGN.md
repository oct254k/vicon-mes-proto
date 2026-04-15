# VICON MES 디자인 시스템

## 1. 개요

### Precision Brutalism

VICON MES는 "데크 3공장"을 위한 제조실행시스템(Manufacturing Execution System)이다. 디자인 철학은 **Precision Brutalism** — 산업 현장의 거친 물성을 디지털로 옮긴 다크 테마 인터페이스다.

**핵심 원칙:**
- **border-radius: 0px** — 모든 요소에 `border-radius: 0 !important` 적용. 둥근 모서리 없음
- **다크 서피스** — 배경 `#131313`, 카드/컨테이너는 명도 차이로 구분
- **보더 대신 배경 시프트** — 명시적 테두리 대신 배경색 단계로 영역 구분
- **고스트 보더** — 필요시 `opacity 5~20%` 수준의 반투명 보더만 사용
- **산업용 타이포그래피** — uppercase 라벨, wide tracking, tabular-nums

### 프로젝트 범위

총 **13개 영역**, **54개 화면**으로 구성된다.

| # | 영역 ID | 영역명 | 화면 수 |
|---|---------|--------|---------|
| 1 | `rm` | 원자재 관리 | 3 |
| 2 | `p1` | 1공정 신선 | 6 |
| 3 | `p2` | 2공정 TG | 8 |
| 4 | `p3` | 3공정 성형 | 5 |
| 5 | `p4` | 4공정 조립 | 5 |
| 6 | `fin` | 마무리 | 2 |
| 7 | `yrd` | 야적장 | 6 |
| 8 | `shp` | 출하 | 2 |
| 9 | `trc` | 이력추적 | 4 |
| 10 | `eqp` | 설비관리 | 4 |
| 11 | `alm` | 알람 | 4 |
| 12 | `dsh` | 대시보드 | 2 |
| 13 | `com` | 시스템 관리 | 3 |

---

## 2. 색상 팔레트

`globals.css`의 `@theme inline` 블록에 정의된 전체 디자인 토큰이다.

### Surface 계열 (배경/컨테이너)

| 변수명 | HEX | 용도 |
|--------|-----|------|
| `--color-surface` | `#131313` | 기본 배경, body 배경 |
| `--color-surface-dim` | `#131313` | 어두운 서피스 (surface와 동일) |
| `--color-surface-bright` | `#393939` | 밝은 서피스, 강조 영역 |
| `--color-surface-container` | `#201f1f` | 카드/섹션 배경 |
| `--color-surface-container-low` | `#1c1b1b` | 낮은 단계 컨테이너 |
| `--color-surface-container-high` | `#2a2a2a` | 높은 단계 컨테이너, 태그 배경 |
| `--color-surface-container-highest` | `#353534` | 최상위 컨테이너, 테이블 헤더 |
| `--color-surface-container-lowest` | `#0e0e0e` | 최하위 컨테이너, SideNav 배경, 입력 필드 배경 |
| `--color-surface-variant` | `#353534` | 변형 서피스 |
| `--color-surface-tint` | `#ffb5a1` | 서피스 틴트 (primary와 동일) |
| `--color-background` | `#131313` | 전체 배경 |

### On-Surface 계열 (텍스트/아이콘)

| 변수명 | HEX | 용도 |
|--------|-----|------|
| `--color-on-surface` | `#e5e2e1` | 기본 텍스트 색상 |
| `--color-on-surface-variant` | `#ddc0b9` | 보조 텍스트, 라벨 |
| `--color-on-background` | `#e5e2e1` | 배경 위 텍스트 |

### Primary 계열 (주 강조색 — 벽돌빛 레드/오렌지)

| 변수명 | HEX | 용도 |
|--------|-----|------|
| `--color-primary` | `#ffb5a1` | 기본 프라이머리 (밝은 톤) |
| `--color-primary-accent` | `#C85A3C` | **핵심 액센트** — 활성 메뉴, 버튼, border-l-4, 인디케이터 |
| `--color-primary-container` | `#e36e4f` | 프라이머리 컨테이너, FieldHeader 텍스트 |
| `--color-primary-fixed` | `#ffdbd1` | 고정 프라이머리 (라이트용) |
| `--color-on-primary` | `#601300` | 프라이머리 위 텍스트 |
| `--color-on-primary-container` | `#551000` | 프라이머리 컨테이너 위 텍스트 |

### Secondary 계열

| 변수명 | HEX | 용도 |
|--------|-----|------|
| `--color-secondary` | `#fcb6a3` | 세컨더리 |
| `--color-secondary-container` | `#6a392c` | 세컨더리 컨테이너 |
| `--color-on-secondary` | `#4f2418` | 세컨더리 위 텍스트 |
| `--color-on-secondary-container` | `#e9a593` | 세컨더리 컨테이너 위 텍스트 |

### Tertiary 계열 (시안/민트 — 가동 상태)

| 변수명 | HEX | 용도 |
|--------|-----|------|
| `--color-tertiary` | `#70d6da` | "running" 상태 색상 |
| `--color-tertiary-container` | `#319fa3` | 터셔리 컨테이너 |
| `--color-on-tertiary` | `#003738` | 터셔리 위 텍스트 |
| `--color-on-tertiary-container` | `#002f31` | 터셔리 컨테이너 위 텍스트 |

### Error 계열 (에러/정지)

| 변수명 | HEX | 용도 |
|--------|-----|------|
| `--color-error` | `#ffb4ab` | 에러 텍스트, "stopped" 상태 |
| `--color-error-container` | `#93000a` | 에러 컨테이너, 긴급 정지 버튼 배경 |
| `--color-on-error` | `#690005` | 에러 위 텍스트 |
| `--color-on-error-container` | `#ffdad6` | 에러 컨테이너 위 텍스트 |

### Outline / Inverse 계열

| 변수명 | HEX | 용도 |
|--------|-----|------|
| `--color-outline` | `#a58b84` | 아웃라인 |
| `--color-outline-variant` | `#57423d` | 고스트 보더 (`/5`, `/10`, `/15` opacity로 사용) |
| `--color-inverse-surface` | `#e5e2e1` | 반전 서피스 |
| `--color-inverse-on-surface` | `#313030` | 반전 텍스트 |
| `--color-inverse-primary` | `#a23e23` | 반전 프라이머리 |

---

## 3. 타이포그래피

### 폰트 패밀리

| 역할 | CSS 변수 | 폰트 | Weight | 용도 |
|------|----------|------|--------|------|
| Headline | `--font-headline` | Inter | 400, 700, 800, 900 | 제목, 테이블 바디, KPI 숫자 |
| Body | `--font-body` | Inter | 400, 700, 800, 900 | 본문 텍스트, 기본 UI |
| Label | `--font-label` | Space Grotesk | 300~700 | 라벨, 배지, 메뉴 항목, 메타 정보 |

### 화면 유형별 폰트 크기

| 유형 | 최소 크기 | 기준 | 적용 위치 |
|------|----------|------|----------|
| 현장 화면 (터치/스캔) | 16px+ | `text-base` 이상 | 투입 스캔, 라벨 발행 등 터치 인터페이스 |
| 사무실 화면 (필터+테이블) | 14px+ | `text-sm` | 재고 현황, 생산 실적 등 데스크톱 화면 |
| 대시보드 KPI | 32px+ | `text-4xl` ~ `text-5xl` | KPI 카드, 실시간 현황판 숫자 |
| 라벨/메타 | 12px | `text-xs` | 테이블 헤더, 상태 배지, Node 참조 |

### 타이포그래피 규칙

- **tabular-nums**: 숫자 데이터(수량, 시간, 코드)에 `font-variant-numeric: tabular-nums` 적용. `.tabular-nums` 클래스 사용
- **uppercase**: 모든 라벨(`font-label`)은 `uppercase` + `tracking-widest` 또는 `tracking-[0.1em]`~`tracking-[0.2em]`
- **opacity 규격**:
  - 라벨/보조 텍스트: `opacity-50` ~ `opacity-60`
  - 비활성 메뉴: `opacity-70`
  - 메타 정보 (moduleRef 등): `opacity-30`
  - 버퍼 카운트 등 부가 정보: `opacity-30`
- **font-weight 규격**:
  - 페이지 제목: `font-black` (900)
  - 섹션 제목: `font-black` (900) + `text-sm`
  - 라벨: `font-bold` (700) 또는 `font-semibold` (600)
  - 본문: `font-normal` (400)

---

## 4. 레이아웃 구조

```
+----------------------------------------------------------+
|  TopNav (h-16, fixed top-0, z-50)                        |
+--------+-------------------------------------------------+
|        |                                                 |
| Side   |  Main Content                                   |
| Nav    |  (ml-72, mt-16, p-8)                            |
| (w-72) |  h-[calc(100vh-64px)]                           |
| fixed  |  overflow-y-auto                                |
| left-0 |                                                 |
| top-16 |                                                 |
|        |                                                 |
+--------+-------------------------------------------------+
|        |  TelemetryStrip (fixed bottom-0)                |
+--------+-------------------------------------------------+
```

### TopNav

- **높이**: `h-16` (64px)
- **위치**: `fixed top-0`, `z-50`
- **배경**: `bg-surface` (#131313)
- **하단 보더**: `border-b border-surface-container-highest/20`
- **패딩**: `px-10`
- **좌측**: VICON 로고 + 퀵 링크 (대시보드, 이력추적, 알람)
- **우측**: 알림 아이콘, 설정 아이콘, 사용자 아바타
- **퀵 링크 스타일**: `opacity-70 hover:opacity-100 hover:bg-surface-container-highest`

### SideNav

- **너비**: `w-72` (288px)
- **위치**: `fixed left-0 top-16`, `z-40`
- **높이**: `h-[calc(100vh-64px)]`
- **배경**: `bg-surface-container-lowest` (#0e0e0e)
- **우측 보더**: `border-r border-surface-container-highest/10`
- **구조**:
  - **헤더**: VICON 로고 + 구분선 + "데크 3공장" 텍스트
  - **네비게이션**: 스크롤 가능한 메뉴 영역
  - **푸터**: "긴급 정지" 버튼 (bg-error-container)

#### 메뉴 구조 (2depth 항상 펼침)

- **1depth (그룹 헤더)**: Material Symbol 아이콘 + `font-label uppercase tracking-[0.1em] font-bold text-sm`
  - 활성: `text-primary-accent`
  - 비활성: `text-white/90`
- **2depth (서브메뉴)**: 항상 펼쳐진 상태, `font-body text-sm`
  - 활성: `text-primary-accent font-semibold bg-primary-accent/10 border-l-2 border-primary-accent` + 좌측 사각 인디케이터 (`w-1.5 h-1.5 bg-primary-accent`)
  - 비활성: `text-white/70 hover:text-white hover:bg-white/5 border-l-2 border-transparent`

### Main Content

- **마진**: `ml-72 mt-16`
- **패딩**: `p-8` (32px)
- **높이**: `h-[calc(100vh-64px)]`
- **스크롤**: `overflow-y-auto`

### TelemetryStrip

- **위치**: `fixed bottom-0`
- **구성**:
  - 좌측 → 우측 전체: `h-1 bg-primary-container` (#e36e4f) 1px 컬러 스트립
  - 우측 상태 표시: `bg-surface-container-highest`, `font-label text-xs uppercase tracking-widest text-primary-accent font-bold`
  - 표시 내용: `System Active | Port 8080 | Secure Link`

---

## 5. 공통 컴포넌트 API

### PageHeader

페이지 최상단 제목 영역. 좌측에 `primary-accent` 수직 바가 붙는다.

```tsx
interface PageHeaderProps {
  title: string;      // 메인 제목 (흰색)
  accent: string;     // 강조 텍스트 (primary-accent 색상)
  nodeRef: string;    // 노드 참조 코드 (예: "RM-001")
  status?: string;    // 시스템 상태 (기본값: "CALIBRATED")
}
```

**스타일 규격:**
- 제목: `text-4xl md:text-5xl font-black tracking-tighter uppercase font-headline`
- 좌측 바: `absolute -left-8 top-0 w-1 h-12 bg-primary-accent`
- nodeRef 태그: `font-label text-xs uppercase tracking-[0.2em] bg-surface-container-high px-2 py-1`
- status 텍스트: `font-label text-xs uppercase tracking-[0.2em] opacity-40`
- 하단 여백: `mb-10`

### DataTable

데이터 테이블. 상단에 제목 바가 있고 좌측 `border-l-4 border-primary-accent`로 강조.

```tsx
interface Column {
  key: string;        // 데이터 키
  label: string;      // 컬럼 헤더 라벨
  className?: string; // 추가 클래스 (정렬 등)
}

interface DataTableProps {
  title: string;           // 테이블 제목
  columns: Column[];       // 컬럼 정의
  data: Record<string, string | number>[]; // 행 데이터
  bufferCount?: number;    // 버퍼 엔트리 수 (선택)
}
```

**스타일 규격:**
- 래퍼: `bg-surface-container-lowest`
- 제목 바: `p-4 bg-surface-container-highest/30 border-l-4 border-primary-accent`
- 제목: `font-headline font-black text-sm uppercase tracking-widest`
- 버퍼 카운트: `opacity-30 font-light`, 3자리 zero-padding
- 테이블 헤더: `bg-surface-container`, `font-label uppercase tracking-widest text-xs opacity-50 font-semibold`
- 테이블 바디: `font-headline text-sm`
- 셀 패딩: `px-4 py-2`
- 행 호버: `hover:bg-surface-container-highest/20`
- 행 구분선: `border-b border-outline-variant/5`
- 새로고침 아이콘: 우측 상단 `refresh` Material Symbol

### FieldHeader

섹션 구분용 헤더. 하단 보더로 영역을 나눈다.

```tsx
interface FieldHeaderProps {
  title: string;       // 섹션 제목
  moduleRef?: string;  // 모듈 참조 코드 (선택)
}
```

**스타일 규격:**
- 제목: `font-label uppercase tracking-widest text-sm font-bold text-primary-container`
- moduleRef: `text-xs opacity-30 font-label`
- 하단 보더: `border-b border-outline-variant/10`
- 하단 여백: `mb-8`, 내부 패딩: `pb-4`

### StatusBadge

상태 표시 배지. 5가지 타입을 지원한다.

```tsx
type StatusType = "running" | "stopped" | "warning" | "idle" | "error";

interface StatusBadgeProps {
  type: StatusType;  // 상태 타입
  label: string;     // 표시 텍스트
}
```

**타입별 스타일:**

| type | 배경 | 텍스트 | 용도 |
|------|------|--------|------|
| `running` | `bg-tertiary/20` | `text-tertiary` (#70d6da) | 가동 중 |
| `stopped` | `bg-error/20` | `text-error` (#ffb4ab) | 정지 |
| `warning` | `bg-[#f59e0b]/20` | `text-[#f59e0b]` | 경고 |
| `idle` | `bg-surface-container-highest` | `text-on-surface-variant` | 대기 |
| `error` | `bg-error-container` (#93000a) | `text-error` (#ffb4ab) | 에러/고장 |

**공통 스타일**: `px-3 py-1 text-xs font-label uppercase tracking-wider font-bold`

---

## 6. UI 요소 규격

### 버튼

| 유형 | 배경 | 텍스트 | 보더 | 비고 |
|------|------|--------|------|------|
| Primary | `bg-primary-accent` (#C85A3C) | `text-white` | 없음 | 주요 액션 |
| Secondary (Ghost) | 투명 | `text-on-surface` | 없음 | opacity hover 전환 |
| Error / 긴급 | `bg-error-container` (#93000a) | `text-error` (#ffb4ab) | `border border-error/20` | 긴급 정지, 삭제 등 |
| Error Hover | `bg-error` | `text-on-error` | — | hover 시 전환 |
| Icon Button | 투명 | `text-on-surface` | 없음 | `hover:text-primary-accent` |

### 입력 필드

- **배경**: `bg-surface-container-lowest` (#0e0e0e)
- **하단 보더**: `border-b-2` (기본 색상)
- **포커스**: `focus:border-primary-accent`
- **border-radius**: 0px (전역 규칙)

### 테이블

| 요소 | 폰트 | 크기 | opacity | 기타 |
|------|------|------|---------|------|
| 헤더 | `font-label` | `text-xs` | `opacity-50` | `uppercase tracking-widest font-semibold` |
| 바디 | `font-headline` | `text-sm` | 1.0 | `tabular-nums` |
| 셀 패딩 | — | — | — | `px-4 py-2` |
| 행 구분 | — | — | — | `border-b border-outline-variant/5` |
| 행 호버 | — | — | — | `hover:bg-surface-container-highest/20` |

### 카드

- **배경**: `bg-surface-container` (#201f1f) 또는 `bg-surface-container-lowest` (#0e0e0e)
- **좌측 강조**: `border-l-4 border-primary-accent`
- **내부 패딩**: `p-4`
- **border-radius**: 0px (항상)

### 스크롤바

- **너비**: 4px (전역), 3px (사이드바)
- **트랙**: `#0e0e0e` (전역), 투명 (사이드바)
- **썸**: `#353534` (전역), `rgba(200, 90, 60, 0.3)` (사이드바, primary-accent 계열)

---

## 7. 화면 유형별 패턴

### 현장 화면 (터치/스캔)

**해당 화면**: 투입 스캔, 라벨 발행, LOT 라벨, KS 라벨, 슬리퍼 라벨 등

- 폰트 크기 16px 이상 (`text-base`+)
- 터치 타겟 최소 44x44px
- 스캔 입력 필드 크게 배치
- 큰 확인/취소 버튼
- 상태 배지 크게 표시

### 사무실 화면 (필터+테이블)

**해당 화면**: 재고 현황, 생산 실적, 생산량 집계, 출하 처리 등

- 상단 필터 영역 + 하단 DataTable 조합
- 폰트 크기 14px (`text-sm`)
- FieldHeader로 섹션 구분
- 페이지네이션 또는 무한 스크롤
- 내보내기/인쇄 기능

### 대시보드 (KPI+차트)

**해당 화면**: 실시간 현황판, 생산 리포트, MTBF 리포트

- KPI 숫자: `text-4xl`~`text-5xl font-black tabular-nums`
- 차트 영역은 `bg-surface-container` 카드 안에 배치
- 실시간 갱신 인디케이터
- 전체 화면 모드 지원

### 모바일 (알림 카드)

**해당 화면**: 부적합 알람, 설비 알람, 조립 지시

- 카드 기반 레이아웃
- StatusBadge로 긴급도 표시
- 스와이프/터치 인터랙션
- 알림 타임스탬프 `tabular-nums`

### 안돈 (대형 표시)

**해당 화면**: 자재교체 안돈, 가동 모니터링

- 대형 디스플레이 최적화
- 최소 32px 이상 폰트
- 고대비 색상 (running=시안, stopped=레드)
- 자동 갱신, 마우스/키보드 인터랙션 없음

---

## 8. 한국어 UI 가이드

### 메뉴 표기

1depth 메뉴는 한국어로 표기하되 `uppercase` CSS가 적용되므로 영문 혼용 시 자동 대문자 변환된다.

| 영역 | 메뉴 표기 | 아이콘 |
|------|----------|--------|
| 원자재 관리 | 입고 등록, 라벨 발행, 재고 현황 | `inventory_2` |
| 1공정 신선 | 투입 스캔, 생산 실적, LOT 라벨, KS 라벨, 부적합 등록, 다이 관리 | `manufacturing` |
| 2공정 TG | 가동 모니터링, 생산량 집계, 투입 스캔, 생산 실적, LOT 라벨, 타입 세팅, 부적합 등록, 파라미터 기록 | `precision_manufacturing` |
| 3공정 성형 | 투입 스캔, 생산 실적, LOT 라벨, 부적합 등록, 파라미터 기록 | `view_in_ar` |
| 4공정 조립 | 외주 작업지시, 투입 스캔, 생산 실적, LOT 라벨, 부적합 등록 | `construction` |
| 마무리 | 용접 확인, 슬리퍼 라벨 | `check_circle` |
| 야적장 | 구역 마스터, 위치 등록, 위치 조회, 위치 이동, 재고 현황, 적재/출하 현황 | `warehouse` |
| 출하 | 출하 처리, 품질 성적서 | `local_shipping` |
| 이력추적 | LOT 계보, 순방향 추적, 역방향 추적, 이력 타임라인 | `timeline` |
| 설비관리 | 가동 현황, 정지 알림, 고장 입력, MTBF 리포트 | `engineering` |
| 알람 | 부적합 알람, 설비 알람, 조립 지시, 자재교체 안돈 | `warning` |
| 대시보드 | 실시간 현황판, 생산 리포트 | `dashboard` |
| 시스템 관리 | 공정 진행현황, 감사 로그, 사용자/권한 | `settings` |

### 버튼 텍스트

- 동작 버튼: 한국어 (등록, 조회, 삭제, 저장, 인쇄, 스캔)
- 긴급 버튼: `긴급 정지` (한국어, uppercase 적용)

### 상태값 표기

StatusBadge의 `label`은 용도에 따라 한국어 또는 영문 코드를 사용한다.

| 상태 | 한국어 라벨 예시 | 영문 라벨 예시 |
|------|----------------|---------------|
| running | 가동 중 | RUNNING |
| stopped | 정지 | STOPPED |
| warning | 경고 | WARNING |
| idle | 대기 | IDLE |
| error | 에러 | ERROR |

### 라벨 규칙

- `font-label` (Space Grotesk) 사용 시 CSS `uppercase` 유지
- 한국어 라벨에도 `uppercase` 클래스가 적용되나, 한글에는 효과 없음 (영문 혼용 시 대문자 변환)
- `tracking-widest` 또는 `tracking-[0.1em]`~`tracking-[0.2em]` 자간 확대 적용

---

## 9. Do's and Don'ts

### Do's

| 규칙 | 구현 |
|------|------|
| border-radius 0px 유지 | `--radius-*: 0rem` + `* { border-radius: 0 !important }` |
| 배경 시프트로 영역 구분 | `surface` → `surface-container` → `surface-container-high` 단계적 명도 |
| 고스트 보더는 낮은 opacity | `border-outline-variant/5`, `/10`, `/15` (최대 20%) |
| 숫자에 tabular-nums | 모든 수량/시간/코드 데이터에 `.tabular-nums` 적용 |
| 라벨은 uppercase + wide tracking | `font-label uppercase tracking-widest` |
| 좌측 수직 바로 강조 | `border-l-4 border-primary-accent` 또는 `w-1 bg-primary-accent` |
| hover는 배경 변화로 | `hover:bg-surface-container-highest/20`, `hover:bg-white/5` |
| 아이콘은 Material Symbols Outlined | `material-symbols-outlined`, FILL 0 / wght 400 / GRAD 0 / opsz 24 |
| 다크 테마 전용 | 라이트 모드 없음. `bg-surface` (#131313) 고정 |
| 컬러 스트립으로 시스템 상태 표시 | TelemetryStrip `h-1 bg-primary-container` |

### Don'ts

| 금지 사항 | 이유 |
|----------|------|
| border-radius 사용 금지 | Precision Brutalism 원칙. 전역 `!important`로 강제 |
| 명시적 보더로 영역 구분 금지 | 배경색 단계 차이로 구분. 보더 사용 시 반드시 5~20% opacity |
| 밝은 테마 / 흰 배경 금지 | 산업 현장 다크 테마 전용 |
| 그림자(box-shadow) 사용 지양 | 배경 시프트와 border-l 액센트로 깊이감 표현 |
| 둥근 아바타/아이콘 금지 | 정사각형 유지 (사용자 아바타: `w-8 h-8` 정사각) |
| 컬러풀한 그라디언트 금지 | 단색(solid) 배경만 사용 |
| 과도한 애니메이션 금지 | `transition-colors duration-150` 정도의 미세 전환만 허용 |
| opacity 100% 보더 금지 | 고스트 보더만 사용: `border-surface-container-highest/20`, `border-outline-variant/10` 등 |
