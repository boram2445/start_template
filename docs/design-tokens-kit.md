/_ ============================================================
Design Kit — Tokens
3-tier: Primitive → Semantic → Component
웹/앱 공용. 색은 OKLCH(폴백 hex 병기). 라이트 + 다크.
============================================================ _/

:root {
/_ ==========================================================
TIER 1 — PRIMITIVE (원시 팔레트, 직접 호출 금지)
========================================================== _/

/_ --- Brand (green) --- _/
--ds-green-50: oklch(0.975 0.020 150); /_ #eefaf1 _/
--ds-green-100: oklch(0.940 0.055 145); /_ #d5f4de _/
--ds-green-200: oklch(0.930 0.080 128); /_ #d6f0b8 - tint fill _/
--ds-green-300: oklch(0.870 0.130 148); /_ #8fe6a8 _/
--ds-green-400: oklch(0.820 0.165 150); /_ #4fdd7f _/
--ds-green-500: oklch(0.780 0.180 152); /_ #24d16a - 브랜드 대표색 _/
--ds-green-600: oklch(0.660 0.160 155); /_ #17a656 - CTA(흰 텍스트 AA) _/
--ds-green-700: oklch(0.560 0.130 158); /_ #12864a - pressed _/
--ds-green-800: oklch(0.520 0.100 160); /_ #1f7a55 - 강조 텍스트 _/
--ds-green-900: oklch(0.420 0.080 162); /_ #185c40 _/

/_ --- Neutral (cool-tinted grey) --- _/
--ds-gray-0: oklch(1.000 0 0); /_ #ffffff _/
--ds-gray-50: oklch(0.985 0.002 250); /_ #fafbfb _/
--ds-gray-100: oklch(0.968 0.003 250); /_ #f4f5f6 - 페이지 배경 _/
--ds-gray-200: oklch(0.928 0.004 250); /_ #e5e7e9 - divider _/
--ds-gray-300: oklch(0.872 0.005 250); /_ #d1d4d7 - border _/
--ds-gray-400: oklch(0.760 0.007 250); /_ #a8adb2 - disabled fg _/
--ds-gray-500: oklch(0.640 0.009 250); /_ #7f858b - secondary text _/
--ds-gray-600: oklch(0.520 0.010 250); /_ #5c626a _/
--ds-gray-700: oklch(0.410 0.010 250); /_ #43484f _/
--ds-gray-800: oklch(0.320 0.009 250); /_ #2f333a - chip active _/
--ds-gray-900: oklch(0.240 0.008 250); /_ #1f2329 - primary text _/

/_ --- Accent (콘텐츠 분류 전용, 액션 색 아님) --- _/
--ds-accent-yellow: oklch(0.940 0.080 95); /_ #fbf0c9 _/
--ds-accent-mint: oklch(0.940 0.050 160); /_ #d9f2e4 _/
--ds-accent-coral: oklch(0.920 0.050 20); /_ #fcdcd6 _/
--ds-accent-lavender: oklch(0.920 0.040 290); /_ #e6def3 _/
--ds-accent-sky: oklch(0.930 0.040 240); /_ #dbe8f7 _/
--ds-accent-peach: oklch(0.930 0.050 60); /_ #fbe6cf _/

/_ --- Data viz --- _/
--ds-viz-blue: oklch(0.720 0.110 260);
--ds-viz-amber: oklch(0.850 0.120 85);
--ds-viz-coral: oklch(0.720 0.140 25);
--ds-viz-green: oklch(0.800 0.140 150);
--ds-viz-empty: oklch(0.940 0.004 250);

/_ --- Functional (status) --- _/
--ds-red-500: oklch(0.628 0.218 22); /_ #e23b3b - error/danger _/
--ds-success: oklch(0.585 0.130 160); /_ #1e9e6a - success _/
--ds-amber-500: oklch(0.760 0.150 75); /_ #e89923 - warning _/
--ds-blue-500: oklch(0.606 0.170 250); /_ #3d7ee0 - info _/

/_ --- Static alpha --- _/
--ds-overlay-scrim: oklch(0.240 0.008 250 / 0.55); /_ modal/sheet dim _/
--ds-overlay-press: oklch(0.240 0.008 250 / 0.08); /_ pressed tint _/
--ds-overlay-hover: oklch(0.240 0.008 250 / 0.04); /_ hover tint (웹) _/

/_ ==========================================================
TIER 2 — SEMANTIC (역할 토큰, 제품에서 이걸 호출)
========================================================== _/

/_ --- Background / surface --- _/
--ds-bg-default: var(--ds-gray-100); /_ 페이지/앱 배경 _/
--ds-bg-elevated: var(--ds-gray-0); /_ 카드 표면 _/
--ds-brand: var(--ds-green-500); /_ 브랜드 대표색(로고·강조·비-텍스트 표면) _/
--ds-bg-brand: var(--ds-green-600); /_ CTA 배경(흰 텍스트 전제) _/
--ds-bg-brand-hover: var(--ds-green-500); /_ 웹 hover _/
--ds-bg-brand-press: var(--ds-green-700); /_ pressed _/
--ds-bg-brand-weak: var(--ds-green-50); /_ 선택 강조 tint 배경 _/
--ds-bg-brand-weak-strong: var(--ds-green-100);
--ds-bg-neutral: var(--ds-gray-100); /_ 보조 버튼 배경 _/
--ds-bg-neutral-strong: var(--ds-gray-800); /_ 활성 chip _/
--ds-bg-danger: var(--ds-red-500);
--ds-bg-success: var(--ds-success);

/_ --- Foreground (text / icon) --- _/
--ds-fg-default: var(--ds-gray-900); /_ 본문 _/
--ds-fg-secondary: var(--ds-gray-500); /_ 보조 _/
--ds-fg-tertiary: var(--ds-gray-400); /_ helper _/
--ds-fg-disabled: var(--ds-gray-400);
--ds-fg-placeholder: var(--ds-gray-400);
--ds-fg-brand: var(--ds-green-800); /_ 강조 텍스트/타이틀(흰 배경 위) _/
--ds-fg-on-brand: var(--ds-gray-0); /_ 브랜드 배경 위 텍스트 = 흰색 _/
--ds-fg-on-neutral: var(--ds-gray-0); /_ 차콜 배경 위 텍스트 _/
--ds-fg-danger: var(--ds-red-500);

/_ --- Border / line --- _/
--ds-line-default: var(--ds-gray-200); /_ divider _/
--ds-line-strong: var(--ds-gray-300); /_ input border _/
--ds-line-brand: var(--ds-green-500); /_ focus/selected border _/

/_ --- State --- _/
--ds-state-hover: var(--ds-overlay-hover);
--ds-state-press: var(--ds-overlay-press);
--ds-state-disabled-opacity: 0.4;

/_ --- Accent (콘텐츠 분류) --- _/
--ds-accent-1: var(--ds-accent-yellow);
--ds-accent-2: var(--ds-accent-mint);
--ds-accent-3: var(--ds-accent-coral);
--ds-accent-4: var(--ds-accent-lavender);
--ds-accent-5: var(--ds-accent-sky);
--ds-accent-6: var(--ds-accent-peach);

/_ ==========================================================
TYPOGRAPHY
========================================================== _/
--ds-font-sans: "Pretendard Variable", Pretendard, -apple-system,
BlinkMacSystemFont, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif;

--ds-fw-regular: 400;
--ds-fw-medium: 500;
--ds-fw-semibold: 600;
--ds-fw-bold: 700;

/_ size / line-height (rem, 16px 베이스) _/
--ds-text-display: 2.25rem; --ds-lh-display: 1.25; /_ 36 _/
--ds-text-h1: 1.625rem; --ds-lh-h1: 1.30; /_ 26 _/
--ds-text-h2: 1.5rem; --ds-lh-h2: 1.35; /_ 24 _/
--ds-text-h3: 1.375rem; --ds-lh-h3: 1.35; /_ 22 _/
--ds-text-h4: 1.25rem; --ds-lh-h4: 1.40; /_ 20 _/
--ds-text-title-1: 1.125rem; --ds-lh-title-1: 1.45; /_ 18 / 600 _/
--ds-text-title-2: 1rem; --ds-lh-title-2: 1.50; /_ 16 / 600 _/
--ds-text-title-3: 0.875rem; --ds-lh-title-3: 1.55; /_ 14 / 600 _/
--ds-text-body-1: 1.125rem; --ds-lh-body-1: 1.45; /_ 18 / 400 _/
--ds-text-body-2: 1rem; --ds-lh-body-2: 1.50; /_ 16 / 400 - 기본 본문 _/
--ds-text-body-3: 0.875rem; --ds-lh-body-3: 1.55; /_ 14 / 400 _/
--ds-text-caption: 0.75rem; --ds-lh-caption: 1.50; /_ 12 _/

/_ ==========================================================
SPACING (4px 베이스)
========================================================== _/
--ds-space-1: 0.25rem; /_ 4 _/
--ds-space-2: 0.5rem; /_ 8 _/
--ds-space-3: 0.75rem; /_ 12 _/
--ds-space-4: 1rem; /_ 16 _/
--ds-space-5: 1.25rem; /_ 20 _/
--ds-space-6: 1.5rem; /_ 24 _/
--ds-space-8: 2rem; /_ 32 _/
--ds-space-10: 2.5rem; /_ 40 _/

--ds-gutter-screen: var(--ds-space-4); /_ 화면 좌우 아우터 _/
--ds-gutter-card: var(--ds-space-4); /_ 카드 내부 _/
--ds-gap-section: var(--ds-space-8); /_ 섹션 간 _/

/_ ==========================================================
RADIUS
========================================================== _/
--ds-radius-sm: 0.5rem; /_ 8 _/
--ds-radius-md: 0.875rem; /_ 14 - input _/
--ds-radius-lg: 1rem; /_ 16 - card _/
--ds-radius-xl: 1.25rem; /_ 20 _/
--ds-radius-2xl: 1.5rem; /_ 24 - sheet _/
--ds-radius-tile: 1.375rem; /_ 22 - accent tile _/
--ds-radius-full: 9999px; /_ pill / circle _/

/_ ==========================================================
ELEVATION (미세 — 표면 분리는 헤어라인 우선)
========================================================== _/
--ds-shadow-sm: 0 1px 2px oklch(0.240 0.008 250 / 0.04);
--ds-shadow-tip: 0 2px 4px oklch(0 0 0 / 0.12);
--ds-shadow-sheet: 0 0 20px oklch(0 0 0 / 0.25);

/_ ==========================================================
MOTION
========================================================== _/
--ds-ease: cubic-bezier(0.42, 0, 0.58, 1);
--ds-dur-fast: 100ms;
--ds-dur-base: 150ms;
--ds-scale-press: 0.92; /_ 인터랙티브 표면 _/
--ds-scale-press-row: 0.96; /_ 텍스트 인접 행(chip/checkbox/radio) _/

/_ ==========================================================
TIER 3 — COMPONENT (컴포넌트 전용 alias)
========================================================== _/

/_ Button — Primary _/
--ds-btn-primary-bg: var(--ds-bg-brand);
--ds-btn-primary-bg-hover: var(--ds-bg-brand-hover);
--ds-btn-primary-bg-press: var(--ds-bg-brand-press);
--ds-btn-primary-fg: var(--ds-fg-on-brand);
--ds-btn-primary-disabled-bg: var(--ds-gray-100);
--ds-btn-primary-disabled-fg: var(--ds-fg-disabled);
/_ height: large 56 / medium 40 / small 34 / xSmall 32 _/
/_ radius: large 14 / medium 12 / small 10 / xSmall 8 _/

/_ Button — Secondary / Tertiary _/
--ds-btn-secondary-bg: var(--ds-green-100);
--ds-btn-secondary-fg: var(--ds-green-700);
--ds-btn-tertiary-bg: var(--ds-gray-100);
--ds-btn-tertiary-fg: var(--ds-fg-default);

/_ Chip _/
--ds-chip-radius: var(--ds-radius-full);
--ds-chip-selected-bg: var(--ds-green-50);
--ds-chip-selected-border: var(--ds-brand);
--ds-chip-selected-fg: var(--ds-green-800);
--ds-chip-bg: var(--ds-gray-0);
--ds-chip-border: var(--ds-line-default);
--ds-chip-fg: var(--ds-fg-secondary);

/_ Card _/
--ds-card-bg: var(--ds-bg-elevated);
--ds-card-radius: var(--ds-radius-lg);
--ds-card-padding: var(--ds-gutter-card);
--ds-card-border: var(--ds-line-default);

/_ Input / Field _/
--ds-field-radius: var(--ds-radius-md);
--ds-field-bg: var(--ds-gray-100);
--ds-field-border: var(--ds-line-default);
--ds-field-border-focus: var(--ds-line-brand);
--ds-field-border-error: var(--ds-fg-danger);

/_ Toggle / Switch _/
--ds-switch-on-track: var(--ds-brand);
--ds-switch-off-track: var(--ds-gray-300);
--ds-switch-knob: var(--ds-gray-0);

/_ Bottom Sheet / Modal _/
--ds-sheet-bg: var(--ds-bg-elevated);
--ds-sheet-radius: var(--ds-radius-2xl);
--ds-sheet-scrim: var(--ds-overlay-scrim);
--ds-sheet-shadow: var(--ds-shadow-sheet);

/_ Selection (checkbox/radio/select item) _/
--ds-select-checked-bg: var(--ds-bg-brand);
--ds-select-checked-fg: var(--ds-fg-on-brand);
--ds-select-unchecked-border: var(--ds-line-strong);
--ds-select-item-bg: var(--ds-green-100);
--ds-select-item-fg: var(--ds-green-800);
--ds-select-item-border: var(--ds-bg-brand);

/_ Tag (비인터랙티브, 파스텔 분류) _/
--ds-tag-radius: var(--ds-radius-sm);
/_ 배경은 --ds-accent-_ 중 택1, 텍스트는 동계열 진한 색 \*/

/_ Progress _/
--ds-progress-track: var(--ds-viz-empty);
--ds-progress-fill: var(--ds-brand);
}

/_ ============================================================
DARK MODE (semantic만 재매핑 — 권장값)
============================================================ _/
@media (prefers-color-scheme: dark) {
:root {
--ds-bg-default: oklch(0.200 0.006 250);
--ds-bg-elevated: oklch(0.255 0.008 250);
--ds-brand: var(--ds-green-400);
--ds-bg-brand: var(--ds-green-500);
--ds-bg-brand-hover: var(--ds-green-400);
--ds-bg-brand-press: var(--ds-green-600);
--ds-bg-brand-weak: oklch(0.300 0.050 150);
--ds-bg-neutral: oklch(0.300 0.008 250);
--ds-bg-neutral-strong: var(--ds-gray-100);

    --ds-fg-default:      var(--ds-gray-100);
    --ds-fg-secondary:    var(--ds-gray-400);
    --ds-fg-brand:        var(--ds-green-300);
    --ds-fg-on-neutral:   var(--ds-gray-900);

    --ds-line-default:    oklch(1 0 0 / 0.10);
    --ds-line-strong:     oklch(1 0 0 / 0.16);
    --ds-line-brand:      var(--ds-green-400);

    --ds-select-item-bg:  oklch(0.300 0.050 150);
    --ds-select-item-fg:  var(--ds-green-300);
    --ds-chip-selected-fg: var(--ds-green-300);

}
}
