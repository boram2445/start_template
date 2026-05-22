# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

Next.js 16 App Router + shadcn/ui + Tailwind v4 기반 **프로젝트 시작 템플릿**. 실제 비즈니스 로직은 없고, 새 프로젝트를 빠르게 시작할 수 있도록 툴링·컨벤션만 미리 세팅돼 있다.

세팅되어 있는 것:

- shadcn/ui 37개 컴포넌트 (`src/components/ui/`)
- Storybook 10 + Vitest 4 (Playwright browser 모드) 테스트 파이프라인
- TanStack Query / Table, Zustand, next-themes, sonner 등 런타임 라이브러리

새 프로젝트로 사용할 때는 `src/components/core/`(빈 슬롯), `src/app/page.tsx`(placeholder) 부터 채우기 시작한다.

## 개발 커맨드

패키지 매니저는 **pnpm** 고정.

```bash
pnpm dev               # Next 개발 서버 (http://localhost:3000)
pnpm build             # 프로덕션 빌드
pnpm start             # 빌드된 서버 실행
pnpm lint              # ESLint (flat config, eslint.config.mjs)
pnpm lint:fix          # lint --fix
pnpm test              # Vitest (Storybook stories를 Playwright browser-mode로 실행)
pnpm storybook         # Storybook 개발 (port 6006)
pnpm build-storybook   # Storybook 정적 빌드
npx tsc --noEmit       # 타입 검사 (스크립트 없음 — 수동 실행)
```

Vitest 설정(`vitest.config.ts`)은 **Storybook stories를 browser-mode(Playwright Chromium)로 돌리는 파이프라인**이다. 애플리케이션 테스트는 아직 작성돼 있지 않으므로 패턴은 처음 추가하는 쪽이 정립한다.

## 스택 핵심

- **Next.js 16.2.4 App Router + React 19.2.3 + TypeScript 5 (strict)**
- **Tailwind CSS v4** — `tailwind.config.*` 없음. 모든 토큰은 `src/app/globals.css`의 `@theme inline` 블록 + CSS 변수(OKLCH)로 정의. 색상을 추가할 때는 여기에만 추가하고, 컴포넌트에서는 유틸리티 클래스로만 참조한다.
- **shadcn/ui** (new-york 스타일, `baseColor: neutral`) — `src/components/ui/` 아래 37개 컴포넌트가 소스로 설치돼 있다. shadcn CLI가 `src/app/globals.css`를 토큰 소스로 참조하므로 globals.css의 구조를 임의로 뒤섞지 말 것. shadcn 컴포넌트는 원칙적으로 직접 수정하지 않는다 — 확장이 필요하면 `core/`에서 wrapping.
- **Path alias**: `@/*` → `src/*` (`tsconfig.json`, `components.json` 양쪽에 일치).
- **ESLint flat config** (`eslint.config.mjs`) — `next/core-web-vitals` + `next/typescript` + `eslint-config-prettier` + Storybook recommended. 프로젝트 고유 rule: `no-console: warn`, `@typescript-eslint/no-unused-vars` (`_` prefix 허용), `react-hooks/purity: warn`(shadcn sidebar의 Math.random 사용을 경고로 허용).
- **인증 없음** — NextAuth 등은 프로젝트마다 요구가 달라 의도적으로 제외. 첫 사용 시점에 추가한다.
- **axios 기본 인스턴스 제공** — `src/lib/axios.ts`에 `baseURL: NEXT_PUBLIC_API_BASE_URL` 기반 인스턴스 + 응답 인터셉터 스켈레톤.
- **Providers 배선 완료** — `src/app/providers.tsx` 에 `ThemeProvider(next-themes)` → `QueryClientProvider(+devtools)` → `Toaster(sonner)` 가 묶여 있고 루트 `layout.tsx`에서 감싼다. 새 provider는 여기에 추가.

## src/ 디렉터리 구조

```
src/
├── app/                          # Next App Router (RSC 기본)
│   ├── globals.css               # Tailwind v4 + 디자인 토큰 원천
│   ├── layout.tsx                # 루트 레이아웃 (Geist 폰트 + <Providers>)
│   ├── providers.tsx             # Theme / QueryClient / Toaster 묶음
│   ├── page.tsx                  # 홈 placeholder
│   ├── loading.tsx               # 기본 Suspense fallback
│   ├── error.tsx                 # 라우트 에러 바운더리
│   ├── global-error.tsx          # 루트 에러 바운더리 (<html> 포함)
│   ├── not-found.tsx             # 404
│   └── favicon.ico
├── components/
│   ├── core/                     # 프로젝트 도메인 컴포넌트 자리 (현재 비어 있음)
│   └── ui/                       # shadcn 컴포넌트 — 원칙적으로 직접 수정 금지
├── hooks/
│   └── use-mobile.ts             # 반응형 breakpoint 훅
└── lib/
    ├── axios.ts                  # api 인스턴스 (baseURL: NEXT_PUBLIC_API_BASE_URL)
    └── utils.ts                  # cn() (clsx + tailwind-merge)
```

첫 기능을 추가할 때 만들게 되는 디렉터리:

- `src/api/<feature>/<feature>.ts` — axios 래퍼 (`@/lib/axios`의 `api` 인스턴스 사용)
- `src/hooks/<feature>/use-*.ts` — React Query 훅
- `src/lib/types/<feature>/{request,response,type}.ts` — 요청/응답/도메인 타입 분리
- `src/stores/<name>-store.tsx` — Zustand + Context 스토어
- `src/stories/{PascalCase}.stories.tsx` — 스토리는 평탄하게 이 폴더에 모은다

**재사용 우선순위**: 무언가 만들기 전에 `core/` → `ui/` → 신규 생성 순서로 탐색한다.

## 컨벤션

- **파일/폴더명 kebab-case**. 컴포넌트 폴더는 `index.tsx` barrel. 배럴에서 import할 때는 `/index` suffix를 명시.
- **훅/함수는 named export**. default export는 Next 페이지/레이아웃 등 프레임워크가 요구하는 경우 외에는 쓰지 않는다.
- **Props/상태 타입**: 명시적으로 허용한 경우 외에는 타입을 정의한다.
- **import 순서**: React → 3rd-party → `@/*` → 로컬 상대 경로.
- **RSC 우선**: 인터랙션이 필요한 컴포넌트에만 `'use client'`.
- **색상/타이포**: `globals.css`의 토큰 변수만 사용. 하드코딩 HEX 금지.
