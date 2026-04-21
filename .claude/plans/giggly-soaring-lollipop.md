# 템플릿 평가 & 보강 제안

## Context

이전 턴까지 TrustBite 잔재 제거(auth/stories/proxy)와 Next 16.2.4 업그레이드, CLAUDE.md/README.md 작성이 완료된 상태. 사용자는 이제 "이 템플릿이 어떤 상태이며 무엇을 더 넣으면 좋을지" 평가와 추천을 원한다. 의도는 남들에게 공유하거나 스스로 재사용할 수 있는 수준으로 템플릿의 완성도를 끌어올리는 것.

---

## 현재 템플릿 평가

### ⭐️ 총평
**중상(B+).** 최신 스택과 shadcn 일괄 설치, `.claude/` 자산이라는 차별화 요소까지 갖춰 "시작하자마자 UI 붙이기 가능"한 상태. 다만 **런타임 프로바이더 미배선**이라는 즉각적인 함정이 있고, App Router 기본 규약 페이지들이 비어 있어 "첫 실수"를 유도한다.

### ✅ 강점
- **스택 최신성**: Next 16.2.4 / React 19.2.3 / Tailwind v4 / TS 5 strict / pnpm — 2026년 기준 업계 상단
- **UI 레디니스**: shadcn/ui 37개 컴포넌트 소스 설치, new-york + neutral, CSS 변수 토큰
- **테스트 파이프라인**: Storybook 10 + Vitest 4 (Playwright browser mode) — 설정 완료, 스크립트만 추가하면 됨
- **`.claude/` 자산** (이 템플릿의 USP):
  - `/register-api-hook`, `/zustand-context-store`, `/generate-story` 스킬
  - `frontend-code-reviewer` 에이전트
  - `block-env-read`, `track-modified`, `typecheck-modified` 훅
- **린트/포맷**: ESLint 9 flat config + Prettier + Storybook rules 통합
- **보안 기본값**: `.gitignore`에 `.env*` 전체 제외, 비밀 유출 훅 존재
- **문서 완비**: CLAUDE.md(컨벤션·스킬 가이드) + README.md(스택·체크리스트)

### ❌ 치명적 갭 (반드시 보강 권장)

| # | 항목 | 증상 | 근거 |
|---|------|------|------|
| G1 | **`QueryClientProvider` 미배선** | 첫 `useQuery` 호출 시 `No QueryClient set` 에러 | `@tanstack/react-query` 의존성 있음 / `src/app/layout.tsx`에 Provider 없음 |
| G2 | **`ThemeProvider` 미배선 (next-themes)** | `sonner`가 `useTheme()` 호출 — Provider 없으면 의도한 다크모드 토스트가 시스템 기본값으로 고정 | `next-themes` 의존성 있음 / layout 미설정 |
| G3 | **`<Toaster />` 미마운트** | `toast.*` 호출해도 아무것도 표시 안 됨 | `src/components/ui/sonner.tsx`만 존재, layout에 안 붙음 |
| G4 | **App Router 기본 페이지 부재** | 에러/로딩/404가 Next 기본 화면으로 나감 | `src/app/error.tsx`, `loading.tsx`, `not-found.tsx`, `global-error.tsx` 없음 |
| G5 | **`axios` 패키지 자체 없음** | `register-api-hook` 스킬이 axios 래퍼를 만드는 구조인데 의존성 미설치 | `package.json` dependencies 확인 |

### 🟡 권장 보강 (템플릿 품질 향상)

| # | 항목 | 이유 |
|---|------|------|
| R1 | `package.json` name 정리 (`trustbite_frontend` → `start-template`) | 아직 이전 프로젝트 이름 잔존 |
| R2 | `src/app/layout.tsx` metadata 교체 (`Create Next App` → 템플릿용 placeholder) | create-next-app 기본값 그대로 |
| R3 | `docs/PRD.md` 삭제 (TrustBite 기획서 28KB) | 프로젝트 잔재 |
| R4 | `src/lib/axios.ts` 기본 인스턴스 (baseURL `process.env.NEXT_PUBLIC_API_BASE_URL`, 에러 인터셉터 스켈레톤) | 스킬이 첫 사용 시 만들 수 있지만 템플릿에 미리 두면 스킬 실행이 더 깔끔 |
| R5 | `react-hook-form` + `zod` + `@hookform/resolvers` | 폼은 거의 모든 프로젝트가 필요 + shadcn `form` 컴포넌트 패턴과 맞물림 |
| R6 | `.env.example` (빈 파일 + `NEXT_PUBLIC_API_BASE_URL=` 주석 템플릿) | 신규 사용자의 첫 env 경로 안내 |
| R7 | `pnpm test` 스크립트 등록 (`vitest`) | 현재 `pnpm exec vitest`를 외워야 함 |
| R8 | `package.json`에 `engines.node` + `.nvmrc` | 팀/CI 환경 Node 버전 고정 |
| R9 | `.editorconfig` | 크로스 에디터 기본값 (indent/LF/UTF-8) |
| R10 | `.vscode/extensions.json` + `settings.json` | Tailwind IntelliSense / ESLint / Prettier 권장 |
| R11 | `next.config.ts`에 `reactStrictMode`, `images.remotePatterns` 뼈대 | 흔히 나중에 켜는 것을 미리 명시 |

### 🟢 선택 보강 (범위에 따라)

| # | 항목 | 채택 기준 |
|---|------|----------|
| O1 | `.github/workflows/ci.yml` (lint + typecheck + build) | 팀 용도 / GitHub 호스팅 시 |
| O2 | `.husky/` + `lint-staged` | pre-commit 자동 검증 원할 때 |
| O3 | `commitlint` + Conventional Commits | 커밋 메시지 규율 |
| O4 | `.github/PULL_REQUEST_TEMPLATE.md` | 팀 용도 |
| O5 | Dependabot / Renovate 설정 | 의존성 자동 PR |
| O6 | `src/middleware.ts` 예시 스켈레톤 | 라우트 보호 샘플. 하지만 실제 로직 없이는 노이즈 |
| O7 | MSW (Mock Service Worker) 세팅 | Storybook에서 API 모킹 원할 때 |
| O8 | Playwright E2E 분리 프로젝트 (`tests/e2e`) | 컴포넌트 테스트만으로 충분한지에 따라 |
| O9 | `@t3-oss/env-nextjs` + zod env 검증 | 환경변수 오타/누락 방지 |
| O10 | `next-intl` (i18n) | 다국어 필요 시 |
| O11 | 분석 스켈레톤 (`@vercel/analytics` 등) | 배포 플랫폼에 따라 |
| O12 | Dockerfile + `.dockerignore` | Docker 배포 시 |

### 🧱 의도적으로 넣지 않는 것 (권장 X)
- **인증(NextAuth 등)**: 직전 턴에 의도적으로 제거. 프로젝트마다 요구가 상이하고, 미리 넣으면 오히려 치우는 비용 발생
- **상태관리 "예시 스토어"**: Zustand는 스킬로 생성, 템플릿에 빈 예시는 노이즈
- **예시 스토리**: `generate-story` 스킬로 생성하므로 미리 채울 필요 없음
- **페이지별 예시 라우트**: 홈 placeholder만 유지, 나머지는 프로젝트 시작 시 추가

---

## 권장 실행 범위 (3단계 옵션)

사용자가 고르기 쉽도록 3단계로 묶음:

### 🅰️ Tier A — 필수 (즉시 가치, bloat 없음)
G1–G5 + R1–R4, R6, R7
- 프로바이더 배선 (QueryClient / ThemeProvider / Toaster)
- 기본 App Router 페이지 (error/loading/not-found/global-error)
- axios 패키지 + `src/lib/axios.ts`
- 프로젝트 이름/메타데이터/PRD.md 정리
- `.env.example`, `pnpm test` 스크립트

### 🅱️ Tier B — 협업 품질 (팀/오픈소스용)
A + R5, R8–R11 + O1 (CI 최소)
- react-hook-form + zod
- engines + .nvmrc + .editorconfig + .vscode
- next.config 기본 옵션
- GitHub Actions CI (lint + typecheck + build)

### 🅲️ Tier C — 풀스택 (원할 때만)
B + O2–O12 중 고른 것
- husky / commitlint / PR 템플릿 / Dependabot
- MSW / Playwright E2E
- zod env 검증 / i18n / Docker

---

## 사용자 결정 (2026-04-21)

- **범위**: **Tier A — 필수만**
- **사용 형태**: **개인 재사용** → Tier B/C의 팀/오픈소스용 항목(CI, husky, commitlint, PR 템플릿, Dependabot 등)은 전부 제외

---

## 최종 실행 체크리스트 (Tier A)

### 1. Provider 배선 (G1–G3)

**`src/app/providers.tsx` 신규** (client component) — 모든 런타임 프로바이더를 한 파일에 묶는다:
```tsx
'use client';
import { ThemeProvider } from 'next-themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from '@/components/ui/sonner';
import { useState, ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: { queries: { staleTime: 60_000, refetchOnWindowFocus: false } },
  }));
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster richColors closeButton position="top-center" />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
```

**`src/app/layout.tsx` 수정**: `<body>` 내부에 `<Providers>`로 감싸기. `suppressHydrationWarning`을 `<html>`에 추가 (next-themes 요구).

### 2. App Router 기본 페이지 (G4)

- `src/app/loading.tsx` — shadcn 스피너 또는 간단한 skeleton
- `src/app/not-found.tsx` — 404 placeholder + 홈 링크
- `src/app/error.tsx` — client component, `reset()` 재시도 버튼
- `src/app/global-error.tsx` — `<html><body>` 포함, root error boundary

모두 **스타일 최소화**, shadcn `Button`만 사용해 템플릿 신규 프로젝트가 쉽게 커스터마이즈 가능하게.

### 3. axios 인프라 (G5, R4)

- `pnpm add axios` — 런타임 의존성 추가
- `src/lib/axios.ts` 신규:
  ```ts
  import axios from 'axios';

  export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? '',
    timeout: 10_000,
    withCredentials: true,
  });

  api.interceptors.response.use(
    (res) => res,
    (error) => {
      // 프로젝트별 에러 표준화는 여기서
      return Promise.reject(error);
    },
  );
  ```

### 4. 프로젝트 잔재 정리 (R1–R3)

- `package.json` name: `trustbite_frontend` → `start-template`
- `src/app/layout.tsx` metadata:
  ```ts
  export const metadata: Metadata = {
    title: 'Start Template',
    description: 'Next.js 16 + shadcn/ui + Tailwind v4 starter template',
  };
  ```
- `docs/PRD.md` 삭제 (필요 시 `docs/` 디렉터리째)

### 5. 환경 변수 & 스크립트 (R6, R7)

- `.env.example` 신규:
  ```
  # Public API base URL (클라이언트에서 접근 가능)
  NEXT_PUBLIC_API_BASE_URL=
  ```
- `package.json` scripts에 `"test": "vitest"` 추가

### 6. 문서 업데이트

- `CLAUDE.md`:
  - "인증/백엔드 없음" 문구 유지하되 "axios 기본 인스턴스 있음"으로 수정
  - "알려진 제약"에서 `pnpm test 없음`, `axios 없음` 항목 제거
  - Providers 구조 한 줄 추가
- `README.md`:
  - "새 프로젝트 시작 시 체크리스트"에서 `package.json name` 항목은 이미 `start-template`이므로 "프로젝트 이름으로 변경" 유지, metadata 교체는 "원하면 브랜드에 맞게" 로 문구 수정

---

## 실행 순서

1. `pnpm add axios` (의존성만 먼저)
2. `src/lib/axios.ts` 생성
3. `src/app/providers.tsx` 생성
4. `src/app/layout.tsx` 수정 (Providers 삽입, metadata 교체, `suppressHydrationWarning`)
5. `src/app/loading.tsx`, `not-found.tsx`, `error.tsx`, `global-error.tsx` 생성
6. `package.json` name 변경 + test 스크립트 추가
7. `docs/PRD.md` 삭제
8. `.env.example` 생성
9. `CLAUDE.md`, `README.md` 업데이트
10. 검증: `pnpm install && pnpm lint && pnpm build && pnpm dev` 로 실제 에러/토스트 동작 확인

---

## Critical Files (이번 범위 확정 후 수정/추가될 파일)

변경 대상 (Tier A 기준):
- `src/app/layout.tsx` — Providers 삽입 + metadata 교체
- `src/app/providers.tsx` (신규) — QueryClient / ThemeProvider / Toaster 묶음 (client component)
- `src/app/error.tsx`, `loading.tsx`, `not-found.tsx`, `global-error.tsx` (신규)
- `src/lib/axios.ts` (신규)
- `package.json` — name 변경, axios 추가, test 스크립트 추가
- `.env.example` (신규)
- `docs/PRD.md` 삭제
- `CLAUDE.md` / `README.md` — 추가된 사항 반영

---

## Verification

- `pnpm install` → 의존성 반영 확인
- `pnpm lint` → 통과
- `pnpm build` → 통과, `/` + `/_not-found` + 기타 기본 라우트 렌더 확인
- `pnpm dev` → 콘솔에 `No QueryClient set` 에러 없음 확인
- 간단한 `toast('ok')` 호출 시 실제 토스트 노출 확인
- `pnpm test` → Vitest 실행 (스토리 테스트 발견 없음이어도 exit 0)
