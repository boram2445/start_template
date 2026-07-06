---
name: Design Kit
category: starter-kit
lang: ko
tokens: design-tokens-kit.css
---

# Design Kit — design.md

> 사이드 프로젝트용 스타터 디자인 킷. 밝은 그린 단일 강조색 + 저채도 파스텔 분류색, 넉넉한 라운드와 미세한 elevation, 무채색 press 피드백을 특징으로 한다. 모든 값은 `design-tokens-kit.css`의 `--ds-*` 토큰으로 정의되며, 본 문서는 그 토큰을 `{group.name}`으로 참조한다. 웹/앱 공용, 라이트 + 다크.

## Brand & Style

절제되고 기능적인 톤을 지향한다 — 장식보다 정보 위계가 앞서고, 위계는 색이 아니라 크기·굵기로 만든다. 밝은 표면 위에 단일 그린 강조색(`{colors.brand}`)이 놓이고, 콘텐츠 분류가 필요할 때만 저채도 파스텔(`{colors.accent-*}`)이 보조한다. 그라디언트·텍스처·손그림은 쓰지 않으며 표면은 전부 플랫이다.

핵심 규율은 세 가지다. (1) **강조색은 그린 하나** — 버튼·CTA·선택·focus는 전부 `{colors.brand}` 계열이고, 화면당 primary 액션은 하나만 둔다. (2) **파스텔은 분류 전용** — `{component.tag}`나 분류 카드 배경 같은 비인터랙티브 표면에만 쓰고, 액션에는 절대 쓰지 않는다. (3) **숫자는 bold, 단위는 regular** — 가격·시간·횟수 등 수치는 굵게, 그 단위 라벨은 얇게 분리해 한눈에 읽히게 한다.

아이콘은 이모지가 아니라 라인/필 아이콘 세트를 쓴다. 성공·완료 상태는 느낌표나 과한 축하가 아니라 체크 아이콘 + 결과를 먼저 알리는 차분한 카피로 표현한다. 인터랙션 피드백은 무채색 press(`{motion.scale-press}` + `{colors.overlay-press}` 리플)로 통일한다.

카피는 동사로 시작하고 마침표·느낌표 없이 정중체(`-요`/`합니다`)로 쓴다(예: `시작하기`, `저장하기`, `다음에`). 사용자에게 `당신`·`저희`를 쓰지 않으며, 사용자 소유물은 `내 …`로 칭한다.

## Colors

3계층(Primitive → Semantic → Component)으로 운영한다. 제품 표면에서는 raw 팔레트가 아니라 시맨틱 토큰(`{colors.brand}`, `{colors.fg-default}`, `{colors.bg-default}` 등)을 호출한다.

### Brand (green)

```yaml
brand: green-500 # 브랜드 대표색(로고·강조·비-텍스트 표면)
bg-brand: green-600 # CTA 배경(흰 텍스트 전제, AA 통과)
bg-brand-hover: green-500 # 웹 hover
bg-brand-press: green-700 # pressed
bg-brand-weak: green-50 # 선택 강조 tint 배경
fg-brand: green-800 # 강조 텍스트/타이틀(흰 배경 위)
```

`{colors.brand}`(밝은 그린)는 흰 텍스트 대비가 아슬아슬하므로, 흰 텍스트를 얹는 CTA에는 한 단계 진한 `{colors.bg-brand}`를 쓴다. 강조 텍스트는 `{colors.fg-brand}`(green-800)로 더 진하게 쓴다.

### Neutral

푸른 기가 옅게 도는 회색 램프라 전체 온도가 차갑게 읽힌다.

```yaml
bg-default: gray-100 # 페이지/앱 배경
bg-elevated: gray-0 # 카드 표면(흰색)
fg-default: gray-900 # 본문
fg-secondary: gray-500 # 보조
fg-tertiary: gray-400 # helper
line-default: gray-200 # divider
line-strong: gray-300 # input border
```

### Accent (분류 전용)

```yaml
accent-1: yellow    accent-2: mint      accent-3: coral
accent-4: lavender  accent-5: sky       accent-6: peach
```

저채도·고명도 파스텔 6색. `{component.tag}`·분류 카드 배경 등 비인터랙티브 표면에만 쓴다. 한 화면에 여러 accent가 동시에 나오는 건 분류 목적일 때만 허용된다.

### Status

information / success / warning / danger를 각각 정의한다. 배지·알림 점은 `{colors.danger}`(red)를 쓴다.

```yaml
success: #1e9e6a    warning: #e89923
danger: #e23b3b    info:    #3d7ee0
```

## Typography

**Pretendard Variable** 단일 패밀리로 일원화한다(폴백에 Apple SD Gothic Neo, Noto Sans KR). 위계는 크기·굵기로 만든다 — Heading/Display는 bold(700), Title은 semibold(600), Body는 regular(400).

```yaml
display: 36 / 1.25 / 700
h1: 26 / 1.30 / 700
h2: 24 / 1.35 / 700
h3: 22 / 1.35 / 700
h4: 20 / 1.40 / 700
title-1: 18 / 1.45 / 600
title-2: 16 / 1.50 / 600
title-3: 14 / 1.55 / 600
body-1: 18 / 1.45 / 400
body-2: 16 / 1.50 / 400 # 기본 본문
body-3: 14 / 1.55 / 400
caption: 12 / 1.50 / 400
```

가격·시간·거리 등 숫자는 title(semibold)로, 그 단위 라벨은 body(regular)로 분리한다.

## Spacing

4px 베이스. 컨테이너 패딩은 대부분 12/16, 스택 간격은 8/12, 섹션 간격은 `{spacing.space-8}`(32) 이상.

```yaml
space-1: 4   space-2: 8   space-3: 12  space-4: 16
space-5: 20  space-6: 24  space-8: 32  space-10: 40
```

## Rounded

넉넉하게 둥근 램프. 2~3px 미세 라운딩은 쓰지 않는다.

```yaml
radius-sm: 8 # tag, group
radius-md: 14 # input, selection card
radius-lg: 16 # card
radius-xl: 20
radius-2xl: 24 # bottom sheet
radius-tile: 22 # accent tile
radius-full: 9999 # pill / circle / chip
```

버튼은 사이즈에 따라 8~14로 스케일한다(xSmall 8 → large 14). 칩은 완전한 pill.

## Elevation & Depth

깊이 언어는 절제되어 있다 — 표면 분리는 드롭섀도가 아니라 **1px 헤어라인(`{colors.line-default}`) + 배경 워시**가 담당한다. 흰 카드가 밝은 회색 필드 위에 간격과 헤어라인으로 구분된다. 그림자는 희소하며 모두 미세하다.

```yaml
shadow-sm: 0 1px 2px  (검정 4%) # skeleton 카드 등 예외
shadow-tip: 0 2px 4px  (검정 12%) # 툴팁
shadow-sheet: 0 0 20px   (검정 25%) # 부양된 바텀시트
```

inner shadow·elevation 레벨 시스템은 없다. 카드는 그림자 대신 헤어라인을 받는다.

## Motion

짧고 표준적이다. spring/bounce·화면 전환 페이드는 쓰지 않는다.

```yaml
ease: cubic-bezier(0.42, 0, 0.58, 1)
dur-fast: 100ms
dur-base: 150ms
scale-press: 0.92 # 인터랙티브 표면
scale-press-row: 0.96 # 텍스트 인접 행(chip/checkbox/radio)
```

모든 인터랙티브 표면은 press feedback을 갖는다 — `{motion.scale-press}` 축소 + `{colors.overlay-press}` 리플(컴포넌트 radius에 클리핑). hover는 웹에서만 `{colors.overlay-hover}`로 정의하며 press와 별개다.

## Components

### button

주 행동 버튼. 4사이즈, radius가 사이즈 따라 스케일.

| 사이즈 | height | radius | typography       |
| ------ | ------ | ------ | ---------------- |
| large  | 56     | 14     | title-2 (16/600) |
| medium | 40     | 12     | title-3 (14/600) |
| small  | 34     | 10     | body-3 (14)      |
| xSmall | 32     | 8      | caption (12)     |

| variant   | bg                                 | text                  |
| --------- | ---------------------------------- | --------------------- |
| primary   | `{colors.bg-brand}`                | 흰색                  |
| secondary | `{colors.green-100}`               | `{colors.green-700}`  |
| tertiary  | `{colors.gray-100}`                | `{colors.fg-default}` |
| outlined  | 흰색 + 1px `{colors.line-default}` | `{colors.brand}`      |

- **Disabled**: 불투명도 변화 없이 색 교체 — bg `{colors.gray-100}` / text `{colors.fg-disabled}`.
- **Loading**: bg `{colors.gray-100}` + 스피너, 클릭 차단, 너비 유지.
- **Active**: `{motion.scale-press}` + `{colors.overlay-press}` 리플.
- **Hover(웹)**: bg `{colors.bg-brand-hover}`.

화면당 primary 버튼은 하나만 둔다.

### text-button

배경 없음, radius 4 고정, padding 4/2. variant로 색 결정(primary `{colors.brand}` / secondary `{colors.fg-default}` / tertiary `{colors.fg-secondary}`). 옵션 underline.

### icon-button

완전 원형(`{rounded.radius-full}`) 정사각. xSmall(~28)~xLarge(~46) 5사이즈. press 리플 원형 클리핑. 라인/필 아이콘만(이모지 금지).

### chip

선택 가능한 pill(radius `{rounded.radius-full}`), padding 8/12, gap 6. medium/small/xSmall(높이 36~40).

- **비선택**: 흰 bg + 1px `{colors.line-default}` + `{colors.fg-secondary}`.
- **선택**: `{colors.bg-brand-weak}`(green-50) bg + 1px `{colors.brand}` 보더 + `{colors.fg-brand}` 텍스트.
- **Active**: `{motion.scale-press-row}` + 리플. **Focus(웹)**: 2px `{colors.brand}` 링.

### checkbox / radio

동형. 행 48(padding 12/16, gap 8), 20×20 원형 컨트롤(2px `{colors.gray-500}` 보더). 그룹은 `{rounded.radius-sm}` + `{colors.gray-100}` 배경.

- **체크(checkbox)**: 컨트롤 `{colors.bg-brand}` + 흰 체크. **체크(radio)**: 안쪽 dot `{colors.bg-brand}`.
- **Disabled+체크**: 컨트롤 `{colors.gray-300}`으로 강등(색 교체).
- **Active**: `{motion.scale-press-row}` + `{colors.overlay-press}`.

### selection-box

큰 선택 카드. radius `{rounded.radius-md}`(14), 가로 full, ~82 높이(타이틀 + 서브텍스트). 선택 시 강조 보더 `{colors.brand}` + `{colors.select-item-bg}`(green-100) 배경. 옅은 tint 위 텍스트는 진한 동계열(`{colors.select-item-fg}`, green-800).

### switch

트랙 pill + 원형 knob. on `{colors.brand}` 트랙 / off `{colors.gray-300}` 트랙 / 흰 knob. 전환 `{motion.dur-base}` `{motion.ease}`. disabled는 색 강등.

### input

`<label>`(body-2 `{colors.fg-secondary}`) + 필드(~48 높이) + helper(body-3 `{colors.fg-tertiary}`).

| variant   | 표면                                   | radius |
| --------- | -------------------------------------- | ------ |
| filled    | `{colors.gray-100}` bg + 1px 투명 보더 | 14     |
| outlined  | 흰 bg + 1px `{colors.line-default}`    | 14     |
| underline | 하단 보더만(평소 opacity 0)            | 0      |

- **Focus**: 보더 `{colors.line-brand}`. **Error**: 보더 + helper `{colors.fg-danger}`. **Disabled**: bg `{colors.gray-100}` / text `{colors.fg-disabled}`.

### text-area

멀티라인. 최소 64(auto-grow), radius 14, `{colors.gray-100}` bg, 1px `{colors.line-default}`, gap 12. 글자수 카운터 body-3 `{colors.fg-tertiary}` "0/200".

### card

radius `{rounded.radius-lg}`(16), padding `{spacing.gutter-card}`. **그림자 대신 1px `{colors.line-default}` 헤어라인**으로 분리. 이미지는 항상 radius 12~16 카드 안에 마스킹(full-bleed 금지).

### card-accent (분류 카드)

분류용 카드에 한해 `{colors.accent-*}` 배경 허용. radius `{rounded.radius-tile}`(22), 텍스트 `{colors.fg-default}`. 액션 아님 — 진입은 별도 버튼/전체 영역 탭으로.

### tag

비인터랙티브 라벨. radius `{rounded.radius-sm}`(6~8), padding 4/8, gap 4, ~28~30 높이. **파스텔 분류의 주 무대** — `{colors.accent-*}` 배경 + 동계열 진한 텍스트, 또는 `{colors.green-50}` + `{colors.green-700}`.

### bottom-sheet

상단 코너 radius `{rounded.radius-2xl}`(24), 딤 `{colors.overlay-scrim}`, 부양 시 `{elevation.shadow-sheet}`. 푸터 버튼은 가로 분할(`flex-1 min-w-120`).

### top-app-bar

최소 52 높이, 흰 배경. BackButton + Title + 액션 슬롯(최대 3). 좁은 화면 액션 넘침 방지.

### tab

sticky 바 1px 하단 보더 `{colors.line-default}` + `{colors.gray-100}` bg + px 16. 탭 30 높이 title-2. active `{colors.fg-default}` / inactive `{colors.fg-secondary}`, press `{motion.scale-press-row}`. 2px 슬라이딩 인디케이터.

### snackbar

하단 일시 토스트. 어두운 둥근 컨테이너 + 텍스트 + 선택적 액션, 자동 소멸. 성공은 체크 아이콘.

### skeleton

`{colors.gray-100}` 베이스 + 웨이브 시머. 사각(radius 12) / 원형 / 카드(radius 16 + 1px 보더 + `{elevation.shadow-sm}`). 로딩 표준.

### badge

content(숫자 pill, 높이 20, radius 17, caption 흰 텍스트) / dot(6×6). 기본 bg `{colors.danger}`. 대상 우상단 오프셋.

## Do's and Don'ts

**Do**

- primary는 그린 하나로 고정하고 화면당 primary는 하나만 둔다.
- 파스텔(`{colors.accent-*}`)은 `{component.tag}`·분류 카드 등 비인터랙티브 표면에만 쓴다.
- 표면 분리는 그림자보다 1px `{colors.line-default}` 헤어라인 + 배경 워시로 먼저 해결한다.
- 숫자는 bold, 단위 라벨은 regular로 분리한다.
- 모든 인터랙티브 표면에 press feedback(`{motion.scale-press}` + 리플)을 건다.
- disabled는 불투명도가 아니라 색 토큰 교체로 표현한다.
- 옅은 tint(green-50) 위엔 진한 동계열 텍스트(green-700/800), 흰 배경 근처 선택 강조는 green-100 이상.
- CTA 카피는 동사로 시작, 마침표·느낌표 없이 정중체로 쓴다.

**Don't**

- 파스텔을 버튼·CTA·선택 상태 등 액션에 쓰지 않는다.
- 한 화면에 primary 버튼을 둘 이상 두지 않는다.
- 강한 드롭섀도로 표면을 부양시키지 않는다.
- 이모지를 아이콘으로 쓰지 않는다 — 라인/필 아이콘만.
- 성공 상태를 느낌표·과한 축하로 표현하지 않는다 — 체크 + 결과 우선 카피.
- 사용자에게 `당신`·`저희`를 쓰지 않는다.
- 다크 모드 토큰을 확정값처럼 신뢰하지 않는다 — 권장 매핑이며 제품에서 검증이 필요하다.

## Known Gaps

- **다크 모드**는 semantic 재매핑 권장값이며 제품에서 대비 검증이 필요하다.
- **breakpoint** 시스템은 정의되지 않았다 — 모바일 기준이며 데스크톱 레이아웃 분기는 제품에서 정의한다.
- **브랜드 그린 색값**은 근사치이므로, 정밀 브랜드 적용 시 최종 hex를 확정해 토큰을 갱신한다.

---

_이 킷의 시각 언어는 SOCAR Frame 2.0의 컴포넌트 구조·인터랙션 규율과 마이루틴의 색·톤을 참고해 재구성했다. 차용한 것은 시각 언어이며, 브랜드·도메인 개념은 포함하지 않는다._
