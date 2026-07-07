# core/ 컴포넌트 웹 적용성 · Props 감사 (2026-07-07)

> `src/components/core/` 21종을 `docs/design-web.md` 기준으로 감사한 결과. 판정: ✅ 웹 그대로 사용 가능 / ⚠️ 사용처 대응 필요 / ❌ 컴포넌트 보완 필요. 코드 수정은 하지 않았고 개선안만 기록한다.

## 요약

- **21종 중 반응형 분기(`md:`/`useIsMobile`)가 추가로 필요한 컴포넌트는 없다.** 킷이 "밀도는 `size` prop, hover는 `press-scale` 유틸(`@media (hover: hover)`), 폭은 사용처" 3층으로 관심사를 나눠둔 덕에, 브레이크포인트 없는 19종도 대부분 웹에서 그대로 성립한다.
- 실제 "모바일 중심" 잔재는 컴포넌트 내부가 아니라 **패턴 3곳**: ① Modal/BottomSheet 푸터의 풀폭 가로분할 버튼(데스크톱 관례는 우측 정렬), ② SiteHeader에 모바일 내비 대응 슬롯 부재, ③ Input에 데스크톱 밀도용 사이즈 부재.
- props 설계는 전반적으로 견고(ComponentProps 상속 + CVA + named export + `useId`/aria 배선). 개선 대상은 조합 금지 타입, `string` → `ReactNode` 완화, Badge 판별 유니온 정도.

## 컴포넌트별 판정

### Task 1 — 버튼류

| 컴포넌트 | 판정 | 요지 |
|---|---|---|
| button | ✅ | 기본 `medium`(40)이 design-web.md 데스크톱 기본과 일치. hover는 press-scale 오버레이 + primary/outlined 전용 hover 색 |
| text-button | ✅ | 사이즈 개념 없음, 밀도 문제 없음 |
| icon-button | ✅ | 28~46px 정사각은 데스크톱 관례와 겹침 |
| chip | ✅ | 데스크톱 밀도가 필요하면 `size="xsmall"`(36)로 흡수 |

**Props 개선안**
- `Button`: `asChild`+`loading` 조합이 조용히 무시됨(`isLoading = !asChild && loading`). 타입 유니온으로 조합 금지 또는 JSDoc 명시.
- `Chip`: 버튼류 중 유일하게 `asChild` 부재 — 필터 칩을 링크로 쓰는 웹 패턴에서 필요. 추가 시 `type="button"` 하드코딩과의 상호작용 주의.
- `Chip` 사이즈 스케일(40/38/36)은 단계 간 2px 차이라 구분 의미가 약함 — 킷 규격 자체에 피드백할 지점.

### Task 2 — 폼 컨트롤

| 컴포넌트 | 판정 | 요지 |
|---|---|---|
| input | ⚠️ | `h-12`(48) 단일 규격. 폼 페이지는 무난하나 데스크톱 밀집 UI(필터 바·테이블 인라인)엔 큼 — `size` variant(예: medium 40) 추가 검토 |
| textarea | ⚠️ | `field-sizing-content` auto-grow는 미지원 브라우저에서 min-h 64 고정으로 강등되는데 `resize-none`이라 수동 리사이즈도 불가 — 데스크톱은 `resize-y` 허용 검토 |
| checkbox | ✅ | 48px 행은 design-web.md가 데스크톱에서도 무난하다고 명시 |
| radio | ✅ | 동일 |
| switch | ✅ | 크기는 ui/switch 위임, 색 토큰 보정만 |
| selection-box | ⚠️ | `w-full` + min-h 82 — 데스크톱에선 사용처가 `md:grid-cols-2/3` 등으로 폭을 제약해야 카드형으로 성립 |

**Props 개선안**
- `Textarea`: 글자수 카운터가 내부 state 기반이라 **controlled 값이 외부에서 바뀌면(리셋 등) count가 갱신 안 됨**. `props.value != null`일 땐 value에서 파생하도록 수정.
- `Checkbox.label` / `Radio.label` / `Switch.label`: `string` 고정 — 약관 동의처럼 라벨에 링크·강조가 들어가는 웹 폼에서 막힘. `React.ReactNode`로 완화.
- `SelectionBox.title/description`: `string` 고정 — 킷의 "숫자 bold + 단위 regular" 규칙을 라벨에 적용하려면 `ReactNode` 필요.
- `SelectionBox`: 단일 선택 그룹으로 쓸 때 `aria-pressed`(토글 시맨틱)가 어색 — radiogroup 시맨틱 옵션 검토(장기).
- `Switch`: 데스크톱 설정 행 관례(라벨 왼쪽 + 스위치 오른쪽 끝)용 배치 옵션 부재 — 사용처 조합으로 해결 가능하므로 낮은 우선순위.
- 잘된 점: Input/Textarea의 `useId` + `aria-describedby`/`aria-invalid` 배선, error가 helperText를 대체하는 단일 슬롯 설계.

### Task 3 — 표시 계열

| 컴포넌트 | 판정 | 요지 |
|---|---|---|
| card | ✅ | 폭·높이 없음, 헤어라인 분리 — 그대로 사용 |
| card-accent | ✅ | 비인터랙티브 파스텔 타일, 문제 없음 |
| tag | ✅ | h-7(28) 규격 그대로 |
| badge | ✅ | dot/count + 앵커 오프셋, 웹 무관 |
| skeleton | ✅ | 크기 사용처 위임 — 그대로 사용 |
| snackbar | ✅ | bottom-center는 데스크톱에서도 성립(sonner가 폭 관리) |

**Props 개선안**
- `Badge`: `variant`와 `count`의 판별 유니온화 — 현재는 `variant="count"`에 `count` 누락 시 빈 pill이 렌더되고, `variant="dot"`에 `count`를 줘도 조용히 무시됨. `{ variant: 'dot' } | { variant?: 'count'; count: number }` 형태 권장.
- `Badge` a11y: dot/count 모두 시각 정보뿐 — `aria-label`(예: "읽지 않은 알림 3개") 또는 sr-only 슬롯 검토.
- `CardTitle`이 `div` — 헤딩 레벨은 사용처 책임임을 스토리/문서에 명시하거나 `asChild` 검토.

### Task 4 — 오버레이

| 컴포넌트 | 판정 | 요지 |
|---|---|---|
| modal | ✅ | 유일한 JS 분기 컴포넌트 — 상호작용 후에만 열리므로 SSR 첫-렌더 데스크톱 문제 없음(design-web.md 규칙 준수) |
| bottom-sheet | ✅ | 모바일 전용이 명시된 역할 — 데스크톱 대응물(Modal 자동 분기)이 코드·문서 양쪽에 존재 |

**Props·패턴 개선안**
- `ModalFooter`/`BottomSheetFooter`의 `*:min-w-[120px] *:flex-1` — 모바일 가로분할 규격이 데스크톱에도 그대로 적용됨. 데스크톱 웹 관례는 우측 정렬 고정폭. 개선안: 푸터에 `md:justify-end md:*:flex-none` 추가 또는 `align` prop. **감사에서 발견한 가장 실질적인 "모바일 중심" 잔재.**
- 같은 클래스로 버튼 3개 이상이면 sm(384px) 모달에서 오버플로(120×3 + gap > 콘텐츠 폭) — 버튼 2개 규칙을 문서화하거나 wrap 허용.
- `ModalContent`의 `className`이 모바일(BottomSheet)·데스크톱(Dialog) 양쪽에 동일 전달 — 데스크톱 전용 보정이 모바일에 새는 구조임을 JSDoc에 명시 권장.

### Task 5 — 내비게이션·구조

| 컴포넌트 | 판정 | 요지 |
|---|---|---|
| site-header | ⚠️ | 반응형 모범(CSS 분기 `hidden md:flex`). 단, 모바일에서 nav가 숨겨진 뒤 **대체 진입점(햄버거/드로어) 슬롯이 없음** |
| top-app-bar | ✅ | 모바일 전용 역할 — 데스크톱 대응물(site-header) 매핑 존재 |
| tabs | ✅ | hover 처리 있음, 데스크톱 그대로 사용 가능 |

**Props 개선안**
- `SiteHeader`: ① 모바일 메뉴 슬롯(예: `mobileMenu?: ReactNode`, `md:hidden`로 노출) 추가 또는 ui/sidebar·drawer 조합 가이드 문서화. ② 본문이 `max-w-screen-lg` 중앙 정렬일 때 헤더 내용물은 풀폭으로 벌어짐 — 내부 컨테이너 정렬 옵션 검토.
- `TopAppBar`: ① 뒤로가기 `aria-label="뒤로가기"` 하드코딩 — prop으로 노출(기본값 유지). ② JSDoc은 "중앙 타이틀"이지만 실제 레이아웃은 좌측 정렬(`flex-1 truncate`) — 주석 또는 레이아웃 중 하나로 통일. ③ `title ?? children`이 모두 `<h1>` 안에 렌더됨 — children에 비텍스트를 넣으면 시맨틱이 어긋남.
- `Tabs`: 탭이 많을 때 가로 스크롤 처리(`overflow-x-auto`) 없음 — 모바일에서 오히려 문제. design.md의 "sticky 바"도 미적용(사용처 책임인지 명확화 필요).

## 문서-코드 불일치 (design.md 갱신 대상)

| 항목 | design.md | 코드 | 권장 |
|---|---|---|---|
| button 사이즈 | 4단(large 56 / medium 40 / small 34 / xSmall 32) | 5단(xlarge 56 / large 48 / medium 40 / small 34 / xsmall 32) | design-web.md가 이미 5단 기준 — design.md 표를 5단으로 갱신 |
| 포커스 링 | "2px brand 링"(chip) | 전 컴포넌트 `ring-[3px] ring-ring/50` 통일 | 코드가 일관적 — 문서를 코드에 맞춤 |
| tab 높이 | 30 | 트리거 `h-[38px]` | 실측 확인 후 문서 갱신 |
| tab 인디케이터 | "2px 슬라이딩" | ui/tabs line variant(슬라이드 애니메이션 없음) | "슬라이딩" 표현 조정 또는 애니메이션 추가 여부 결정 |

## 권장 후속 태스크 (우선순위순)

> 2026-07-07 반영 완료: 아래 1~5 전부 적용됨 (tsc·lint·build·test 통과). BottomSheetFooter는 모바일 전용 역할이라 1번에서 제외했고, TopAppBar/SelectionBox의 HTML `title` 속성 충돌(Omit 누락)을 추가로 발견해 함께 수정.
>
> 같은 날 잔여 백로그도 처리: Button `asChild`+`loading` 판별 유니온 금지, Chip `asChild` 지원, Input `size` variant(large 48/medium 40, HTML size 속성 Omit), Textarea `md:resize-y`, TabsList `overflow-x-auto`, Badge aria-label 가이드(JSDoc+스토리). 미착수 잔여: SelectionBox radiogroup 시맨틱(장기), SiteHeader 내부 컨테이너 정렬 옵션(검토), Switch 라벨 좌측 배치(낮음).

1. **Modal/BottomSheet 푸터 데스크톱 정렬** — 유일하게 데스크톱 시각 관례를 깨는 항목
2. **Textarea controlled count 버그 수정 + resize 정책** — 유일한 동작 결함
3. **Badge 판별 유니온 + label ReactNode 완화 (checkbox/radio/switch/selection-box)** — 타입 개선 일괄
4. **SiteHeader 모바일 메뉴 슬롯** — 실제 웹 GNB로 쓰기 위한 마지막 조각
5. **design.md 표기 4건 갱신** — 문서 동기화
