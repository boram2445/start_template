import type { Meta, StoryObj } from '@storybook/nextjs-vite';

type ShadowToken = {
  token: string;
  note: string;
};

const SHADOWS: ShadowToken[] = [
  { token: '--ds-shadow-sm', note: '카드 미세 그림자 (4% black)' },
  { token: '--ds-shadow-tip', note: '툴팁 / 팝오버 (12%)' },
  { token: '--ds-shadow-sheet', note: '바텀시트 / 모달 (25%)' },
];

type MotionToken = {
  token: string;
  value: string;
  note: string;
};

const MOTION_TOKENS: MotionToken[] = [
  { token: '--ds-ease', value: 'cubic-bezier(0.42, 0, 0.58, 1)', note: '기본 이징' },
  { token: '--ds-dur-fast', value: '100ms', note: 'press 피드백' },
  { token: '--ds-dur-base', value: '150ms', note: '일반 트랜지션' },
  { token: '--ds-scale-press', value: '0.92', note: '인터랙티브 표면 축소' },
  { token: '--ds-scale-press-row', value: '0.96', note: '텍스트 인접 행(chip/checkbox)' },
];

const meta: Meta = {
  title: 'Foundation/Elevation & Motion',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '그림자·모션 토큰 (원본: docs/design.md).\n\n표면 분리는 그림자보다 헤어라인(border)이 우선 — 그림자는 sm/tip/sheet 3단계만 둔다. 모션은 100~150ms 단일 이징에 press 시 scale 축소 + 무채색 tint(press-scale 유틸리티).',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Elevation: Story = {
  render: () => (
    <div className="flex max-w-3xl flex-wrap gap-8 py-6">
      {SHADOWS.map(({ token, note }) => (
        <div key={token} className="flex w-44 flex-col gap-2">
          <div
            className="bg-background h-24 rounded-lg"
            style={{ boxShadow: `var(${token})` }}
          />
          <code className="text-foreground text-[11px] leading-tight">{token}</code>
          <span className="text-fg-secondary text-[11px] leading-tight">{note}</span>
        </div>
      ))}
    </div>
  ),
};

export const Motion: Story = {
  render: () => (
    <div className="flex max-w-2xl flex-col gap-8">
      <section className="flex flex-col gap-2.5">
        <h3 className="text-foreground text-base font-semibold">토큰</h3>
        {MOTION_TOKENS.map(({ token, value, note }) => (
          <div key={token} className="flex items-baseline gap-6">
            <code className="text-foreground w-48 shrink-0 text-sm">{token}</code>
            <code className="text-fg-brand w-56 shrink-0 text-sm">{value}</code>
            <span className="text-fg-secondary text-sm">{note}</span>
          </div>
        ))}
      </section>
      <section className="flex flex-col gap-3">
        <h3 className="text-foreground text-base font-semibold">Press 피드백 데모</h3>
        <p className="text-fg-secondary text-sm">
          눌러보면 scale 축소 + 무채색 tint가 동시에 적용된다.
        </p>
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="press-scale bg-primary text-primary-foreground h-12 rounded-md px-6 text-sm font-semibold"
          >
            press-scale (0.92)
          </button>
          <button
            type="button"
            className="press-scale-row bg-background ring-line text-foreground h-12 rounded-full px-6 text-sm ring-1"
          >
            press-scale-row (0.96)
          </button>
        </div>
      </section>
    </div>
  ),
};
