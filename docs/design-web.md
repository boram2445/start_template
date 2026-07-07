# Design Kit — 웹 적응 가이드 (design-web.md)

> `design.md` 킷은 모바일 기준으로 정의됐다("Known Gaps: breakpoint 미정의"). 이 문서는 이 템플릿에서 킷을 **데스크톱 웹사이트**에 적용할 때의 규칙을 보충한다. 시각 언어(색·radius·헤어라인·모션)는 design.md를 그대로 따른다.

## Breakpoint

Tailwind 기본 스케일을 그대로 쓴다. **모바일 우선**으로 작성하고 `md:` 이상에서 데스크톱 레이아웃을 얹는다.

| 토큰 | 폭 | 용도 |
|---|---|---|
| (기본) | ~639 | 모바일 |
| `sm` | 640 | 큰 모바일/작은 태블릿 |
| `md` | 768 | **모바일↔데스크톱 전환 기준** (`useIsMobile()` 훅과 동일) |
| `lg` | 1024 | 데스크톱 본선 |
| `xl` | 1280 | 넓은 데스크톱 |

`src/hooks/use-mobile.ts`의 `useIsMobile()`(768px)이 JS 분기의 단일 기준이다. CSS 분기(`md:`)와 JS 분기가 항상 같은 값을 보도록 다른 breakpoint를 임의로 만들지 않는다.

## 컨테이너

- 페이지 본문: `mx-auto max-w-screen-lg px-4` (필요 시 `max-w-screen-xl`)
- 화면 좌우 아우터는 모바일 `px-4`(= `--ds-gutter-screen`), 데스크톱 `md:px-8` (풀폭 헤더는 모바일 `px-5`)
- 페이지 배경은 `body`의 회색 워시가 기본이고, 콘텐츠는 흰 카드(헤어라인)로 띄운다 — design.md의 elevation 규칙 그대로

## core/ ↔ ui/ 조합 규칙

**모바일·공용 화면 어휘는 `core/`, 데스크톱 전용 패턴은 `ui/`(shadcn)를 그대로 쓴다.** ui/는 토큰 리매핑으로 이미 킷 색·radius를 입고 있다.

### core가 ui를 감싸는 기준

- **radix 등 동작 프리미티브가 있으면 감싼다** — 상태·포커스·키보드·`data-[state]` 배선을 공짜로 얻는다 (checkbox, radio, switch, tabs, modal↔dialog, bottom-sheet↔sheet, snackbar↔sonner).
- **스타일뿐인 껍데기면 독자 구현한다** — 감싸도 클래스 문자열 하나를 대부분 덮어쓰게 되므로 재사용분이 없다 (button, input, textarea, card, skeleton 등).
- **`ui/` 직접 수정은 금지** — ui/끼리 서로 import하므로(예: calendar·pagination이 buttonVariants 사용) 수정이 연쇄되고, shadcn 업데이트 경로도 잃는다. 색처럼 CSS 변수로 흐르는 값은 `globals.css` 토큰 리매핑 층에서 바꾼다.

### ui/ 직접 import 제한 (lint 강제)

core 대체물이 있는 ui 파일(button·input·skeleton + 래핑된 7종)은 `ui/`·`core/` 내부에서만 import할 수 있다 — `eslint.config.mjs`의 `no-restricted-imports`가 차단하고, 앱 코드는 항상 `core/`를 쓴다.

역할 없는 ui는 정리했다. 남은 21종은 세 그룹뿐이다:
- **core가 감싸는 8종**: checkbox, dialog, radio-group, sheet, sonner, spinner, switch, tabs
- **데스크톱 툴박스 8종**(위 표의 역할): calendar, dropdown-menu, navigation-menu, pagination, popover, select, sidebar, table
- **그 내부 부품 5종**: button, input, separator, skeleton, tooltip

삭제된 컴포넌트(card·badge·toggle·textarea·label·accordion·alert·avatar·breadcrumb·carousel·empty·field·input-group·progress·resizable·scroll-area)가 필요해지면 `npx shadcn add`로 재설치한다.

| 상황 | 사용 |
|---|---|
| 버튼·폼·칩·카드 등 공용 | `core/` (킷 규격) |
| 드롭다운 메뉴, 컨텍스트 메뉴 | `ui/dropdown-menu` |
| 데이터 테이블, 페이지네이션 | `ui/table`, `ui/pagination` |
| 콤보박스/셀렉트, 캘린더 | `ui/select`, `ui/calendar`, `ui/popover` |
| 툴팁, 호버카드 | `ui/tooltip` |
| 복잡한 데스크톱 내비 | `ui/navigation-menu`, `ui/sidebar` |

## 반응형 컴포넌트 매핑

| 역할 | 모바일 | 데스크톱 | 비고 |
|---|---|---|---|
| 오버레이 확인/선택 | BottomSheet | 중앙 Dialog | **`core/modal`이 자동 분기** — 새 코드는 Modal 사용, BottomSheet 직접 사용은 모바일 전용 화면일 때만 |
| 화면 상단 | `core/top-app-bar` (뒤로가기+타이틀) | `core/site-header` (GNB) | 앱 스타일 화면 vs 웹사이트 |
| 버튼 기본 사이즈 | `xlarge`(56, 풀폭 CTA) | `medium`(40) | 데스크톱에서 h-56 풀폭은 과함. 모달/시트 푸터는 `large`(48) |
| 행 리스트(체크박스 등) | 그대로 | 그대로 | 48px 행은 데스크톱에서도 무난 |

## 인터랙션

- 모든 버튼은 전역 `cursor: pointer` (globals.css base — Tailwind v4는 리셋하지 않음)
- hover는 `press-scale`/`press-scale-row` 유틸의 4% 오버레이가 공통 언어. 개별 컴포넌트에 hover 색을 더할 때도 킷의 절제 기조(무채색 tint 우선)를 유지한다
- `press-scale`/`press-scale-row`의 축소(0.92/0.96)는 데스크톱(≥768px, md)에서 1로 완화된다 — `design-tokens.css`의 `@media (min-width: 768px) { :root { --ds-scale-press: 1; --ds-scale-press-row: 1; } }`. 마우스는 커서 자체가 클릭 의도를 표시하므로 크기 변화까지 더하면 과잉 피드백으로 읽히기 때문. hover/press 색상 오버레이는 두 플랫폼 모두 유지되며, 변수 하나만 바뀌므로 컴포넌트별 수정은 필요 없다

## SSR 주의

`useIsMobile()`은 effect 기반이라 **SSR 첫 렌더는 항상 데스크톱(false)**. Modal처럼 상호작용 후에만 분기가 드러나는 컴포넌트는 문제없지만, 첫 페인트부터 모바일/데스크톱 레이아웃이 갈리는 UI는 JS 분기 대신 CSS(`hidden md:flex`)로 처리한다 — SiteHeader의 nav 숨김이 그 예시다.
