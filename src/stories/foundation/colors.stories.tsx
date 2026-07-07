import type { Meta, StoryObj } from '@storybook/nextjs-vite';

type ColorToken = {
  /** 스와치 배경으로 쓸 CSS 변수명 */
  token: string;
  /** 용도 메모 */
  note?: string;
  /** 텍스트 토큰이면 이 배경 토큰 위에 'Aa' 샘플로 렌더 */
  textOn?: string;
  /** 파스텔 배경 위 동계열 텍스트 토큰 (accent 페어) */
  pairFg?: string;
};

type ColorGroup = {
  title: string;
  description?: string;
  tokens: ColorToken[];
};

const PRIMITIVE_GROUPS: ColorGroup[] = [
  {
    title: 'Brand — Green',
    description: '브랜드 그린 램프. 500이 대표색, 600이 CTA(흰 텍스트 AA), 700이 pressed.',
    tokens: [
      { token: '--ds-green-50' },
      { token: '--ds-green-100' },
      { token: '--ds-green-200', note: 'tint fill' },
      { token: '--ds-green-300' },
      { token: '--ds-green-400' },
      { token: '--ds-green-500', note: '브랜드 대표색' },
      { token: '--ds-green-600', note: 'CTA' },
      { token: '--ds-green-700', note: 'pressed' },
      { token: '--ds-green-800', note: '강조 텍스트' },
      { token: '--ds-green-900' },
    ],
  },
  {
    title: 'Neutral — Gray',
    description: '쿨 톤 그레이. 텍스트·배경·라인 전부 이 램프에서 파생된다.',
    tokens: [
      { token: '--ds-gray-0', note: '흰색' },
      { token: '--ds-gray-50' },
      { token: '--ds-gray-100', note: '페이지 배경' },
      { token: '--ds-gray-200', note: 'divider' },
      { token: '--ds-gray-300', note: 'border' },
      { token: '--ds-gray-400', note: 'disabled fg' },
      { token: '--ds-gray-500', note: '보조 텍스트' },
      { token: '--ds-gray-600' },
      { token: '--ds-gray-700' },
      { token: '--ds-gray-800', note: 'chip active' },
      { token: '--ds-gray-900', note: '본문 텍스트' },
    ],
  },
  {
    title: 'Accent — 파스텔 (콘텐츠 분류 전용)',
    description: '액션 색이 아니다. 배경 위 텍스트는 반드시 동계열 진한 `*-fg` 페어를 쓴다.',
    tokens: [
      { token: '--ds-accent-yellow', pairFg: '--ds-accent-yellow-fg' },
      { token: '--ds-accent-mint', pairFg: '--ds-accent-mint-fg' },
      { token: '--ds-accent-coral', pairFg: '--ds-accent-coral-fg' },
      { token: '--ds-accent-lavender', pairFg: '--ds-accent-lavender-fg' },
      { token: '--ds-accent-sky', pairFg: '--ds-accent-sky-fg' },
      { token: '--ds-accent-peach', pairFg: '--ds-accent-peach-fg' },
    ],
  },
  {
    title: 'Data Viz',
    description: '차트 전용 팔레트. chart-1~5 shadcn 변수로도 매핑돼 있다.',
    tokens: [
      { token: '--ds-viz-green' },
      { token: '--ds-viz-blue' },
      { token: '--ds-viz-amber' },
      { token: '--ds-viz-coral' },
      { token: '--ds-viz-empty', note: '빈 구간' },
    ],
  },
  {
    title: 'Functional — Status',
    tokens: [
      { token: '--ds-red-500', note: 'error / danger' },
      { token: '--ds-success', note: 'success' },
      { token: '--ds-amber-500', note: 'warning' },
      { token: '--ds-blue-500', note: 'info' },
    ],
  },
  {
    title: 'Static Alpha — Overlay',
    description: '흰 표면 위에 얹었을 때의 실제 농도.',
    tokens: [
      { token: '--ds-overlay-scrim', note: 'modal/sheet dim 55%' },
      { token: '--ds-overlay-press', note: 'pressed tint 8%' },
      { token: '--ds-overlay-hover', note: 'hover tint 4%' },
    ],
  },
];

const SEMANTIC_GROUPS: ColorGroup[] = [
  {
    title: 'Background / Surface',
    description: '페이지·표면·CTA 배경. 다크 토글 시 재매핑되는 걸 확인할 것.',
    tokens: [
      { token: '--ds-bg-default', note: '페이지 배경' },
      { token: '--ds-bg-elevated', note: '카드 표면' },
      { token: '--ds-brand', note: '브랜드 대표(비-텍스트 표면)' },
      { token: '--ds-bg-brand', note: 'CTA 배경' },
      { token: '--ds-bg-brand-hover', note: '웹 hover' },
      { token: '--ds-bg-brand-press', note: 'pressed' },
      { token: '--ds-bg-brand-weak', note: '선택 tint' },
      { token: '--ds-bg-brand-weak-strong' },
      { token: '--ds-bg-neutral', note: '보조 버튼' },
      { token: '--ds-bg-neutral-strong', note: '활성 chip' },
      { token: '--ds-bg-danger' },
      { token: '--ds-bg-success' },
    ],
  },
  {
    title: 'Foreground (text / icon)',
    description: '텍스트 토큰은 실제 사용 배경 위에 Aa 샘플로 렌더했다.',
    tokens: [
      { token: '--ds-fg-default', textOn: '--ds-bg-elevated', note: '본문' },
      { token: '--ds-fg-secondary', textOn: '--ds-bg-elevated', note: '보조' },
      { token: '--ds-fg-tertiary', textOn: '--ds-bg-elevated', note: 'helper' },
      { token: '--ds-fg-disabled', textOn: '--ds-bg-elevated' },
      { token: '--ds-fg-placeholder', textOn: '--ds-bg-elevated' },
      { token: '--ds-fg-brand', textOn: '--ds-bg-elevated', note: '강조 텍스트' },
      { token: '--ds-fg-on-brand', textOn: '--ds-bg-brand', note: '브랜드 배경 위' },
      { token: '--ds-fg-on-neutral', textOn: '--ds-bg-neutral-strong', note: '차콜 배경 위' },
      { token: '--ds-fg-danger', textOn: '--ds-bg-elevated' },
    ],
  },
  {
    title: 'Border / Line',
    tokens: [
      { token: '--ds-line-default', note: 'divider' },
      { token: '--ds-line-strong', note: 'input border' },
      { token: '--ds-line-brand', note: 'focus / selected' },
    ],
  },
  {
    title: 'Accent Alias',
    description: '콘텐츠 분류용 순번 alias — 실제 색은 Primitive 파스텔을 가리킨다.',
    tokens: [
      { token: '--ds-accent-1' },
      { token: '--ds-accent-2' },
      { token: '--ds-accent-3' },
      { token: '--ds-accent-4' },
      { token: '--ds-accent-5' },
      { token: '--ds-accent-6' },
    ],
  },
];

function Swatch({ token, note, textOn, pairFg }: ColorToken) {
  const chipBackground = textOn ? `var(${textOn})` : `var(${token})`;
  const sampleColor = textOn ? `var(${token})` : pairFg ? `var(${pairFg})` : undefined;

  return (
    <div className="flex w-36 flex-col gap-1.5">
      <div
        className="ring-line flex h-14 items-center justify-center rounded-sm ring-1"
        style={{ backgroundColor: chipBackground }}
      >
        {sampleColor ? (
          <span className="text-base font-semibold" style={{ color: sampleColor }}>
            Aa
          </span>
        ) : null}
      </div>
      <code className="text-foreground text-[11px] leading-tight break-all">{token}</code>
      {note ? <span className="text-fg-secondary text-[11px] leading-tight">{note}</span> : null}
    </div>
  );
}

function GroupSection({ title, description, tokens }: ColorGroup) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-col gap-0.5">
        <h3 className="text-foreground text-base font-semibold">{title}</h3>
        {description ? <p className="text-fg-secondary text-sm">{description}</p> : null}
      </div>
      <div className="flex flex-wrap gap-4">
        {tokens.map((token) => (
          <Swatch key={token.token} {...token} />
        ))}
      </div>
    </section>
  );
}

function PaletteView({ groups }: { groups: ColorGroup[] }) {
  return (
    <div className="flex max-w-4xl flex-col gap-10">
      {groups.map((group) => (
        <GroupSection key={group.title} {...group} />
      ))}
    </div>
  );
}

const meta: Meta = {
  title: 'Foundation/Colors',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '디자인 킷 색상 토큰 (원본: docs/design.md · src/app/design-tokens.css).\n\n3-tier 구조 — Primitive(원시 팔레트, 직접 호출 금지) → Semantic(역할 토큰, 제품에서 이걸 호출) → Component(컴포넌트 alias). 스와치는 CSS 변수를 그대로 참조하므로 툴바의 다크 토글에 Semantic 토큰이 실시간 반응한다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Semantic: Story = {
  render: () => <PaletteView groups={SEMANTIC_GROUPS} />,
};

export const Primitive: Story = {
  render: () => <PaletteView groups={PRIMITIVE_GROUPS} />,
};
