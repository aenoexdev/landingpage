# Aenoex Landing Page — Frontend Structure

## 프로젝트 개요
- **프레임워크**: Next.js 16.2.6 (App Router)
- **스타일링**: Tailwind CSS v4 (다크 모드 기본, bg-black / text-zinc-100)
- **데이터베이스**: Supabase
- **언어**: TypeScript
- **제품**: API Defense Proxy (Fake Door 검증)

## 디렉토리 구조

```
landingpage/
├── app/                    # Next.js App Router pages
│   ├── globals.css         # 전역 스타일 (다크 테마)
│   ├── layout.tsx          # 루트 레이아웃
│   └── page.tsx            # Fake Door 랜딩 페이지 (메인)
├── components/
│   └── ui/
│       └── Toast.tsx       # 커스텀 알림 컴포넌트
├── src/
│   └── utils/
│       └── supabase/
│           └── client.ts   # Supabase 클라이언트 (Browser)
├── venv/                   # Python 가상환경
├── .env.local              # Next.js 환경 변수 (NEXT_PUBLIC_ 접두사)
├── .env                    # Python 환경 변수 (SERVICE_KEY)
├── front_structure.md      # 프론트엔드 구조 문서
└── package.json
```

## 컴포넌트 명세

### `app/layout.tsx`
- **역할**: 루트 레이아웃. 전역 폰트(Geist) 설정, 다크 배경 적용.
- **Props**: `children: React.ReactNode`

### `app/page.tsx`
- **역할**: API Defense Proxy 제품의 가설 검증을 위한 **Fake Door 랜딩 페이지**.
- **상태 (State)**:
  - `isModalOpen: boolean` — 대기자 명단 모달 열림/닫힘
  - `email: string` — 사용자가 입력한 이메일
  - `submitted: boolean` — 대기자 명단 제출 완료 여부
- **함수**:
  - `handleSubmit(e: React.FormEvent)` — 폼 제출 핸들러
    - **TODO**: 실제 배포 시 Formspree 엔드포인트로 이메일 전송 로직으로 교체 필요
    - 현재는 `setSubmitted(true)`로 즉시 성공 화면으로 전환 (Fake)
- **섹션 구성**:
  1. 네비게이션 바 — `aenoex.` 로고
  2. Hero Section — CTA 버튼 ("Protect My API Now - $15/mo")
  3. Features Section — 3개 핵심 가치 (Prompt Caching / Rate Limiting / Drop-in Replacement)
  4. Waitlist Modal — 이메일 수집 폼 (Fake Door)

### `components/ui/Toast.tsx`
- **역할**: 브라우저 기본 alert 대신 사용하는 커스텀 알림 컴포넌트.
- **Props**:
  - `message: string` - 표시할 메시지
  - `type?: "success" | "error" | "info"` - 알림 타입 (기본: "success")
  - `onClose: () => void` - 닫힘 콜백
  - `duration?: number` - 표시 시간 (ms, 기본: 3000)
- **특징**: fade-in/out 애니메이션, 상단 중앙 고정, 초록/빨강/파랑 색상

### `src/utils/supabase/client.ts`
- **역할**: Supabase Browser 클라이언트 생성
- **사용 환경 변수**: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **반환**: `createClient()` → Supabase 클라이언트 인스턴스

## 데이터 흐름

```
[Browser] → src/utils/supabase/client.ts → Supabase API
                ↕ (NEXT_PUBLIC_ env vars)
            .env.local
```

## 환경 변수

| 파일 | 변수명 | 용도 |
|------|--------|------|
| `.env.local` | `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 URL (Next.js) |
| `.env.local` | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase 익명 키 (Next.js) |
| `.env` | `SUPABASE_URL` | Supabase 프로젝트 URL (Python) |
| `.env` | `SUPABASE_SERVICE_KEY` | Supabase 서비스 키 (Python, 백엔드 전용) |

## 스타일링 규칙
- **기본 테마**: 다크 모드 (`background: #0a0a0a`, `foreground: #ededed`)
- **포인트 컬러**: 초록 계열 (`#22c55e` primary, `#16a34a` hover, `#166534` muted)
- **표면 색상**: `#111111` (surface), `#1a1a1a` (surface-hover)
- **테두리**: `#27272a`
- **알림**: `window.alert` 사용 금지 → `Toast` 컴포넌트 사용
