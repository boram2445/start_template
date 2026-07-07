import type { Meta, StoryObj } from '@storybook/nextjs-vite';

type SpaceToken = {
  token: string;
  px: string;
  note?: string;
};

const SPACE_SCALE: SpaceToken[] = [
  { token: '--ds-space-1', px: '4' },
  { token: '--ds-space-2', px: '8' },
  { token: '--ds-space-3', px: '12' },
  { token: '--ds-space-4', px: '16' },
  { token: '--ds-space-5', px: '20' },
  { token: '--ds-space-6', px: '24' },
  { token: '--ds-space-8', px: '32' },
  { token: '--ds-space-10', px: '40' },
];

const SPACE_SEMANTIC: SpaceToken[] = [
  { token: '--ds-gutter-screen', px: '16', note: '화면 좌우 아우터' },
  { token: '--ds-gutter-card', px: '16', note: '카드 내부 패딩' },
  { token: '--ds-gap-section', px: '32', note: '섹션 간 간격' },
];

type RadiusToken = {
  token: string;
  px: string;
  note?: string;
};

const RADIUS_SCALE: RadiusToken[] = [
  { token: '--ds-radius-sm', px: '8', note: 'tag' },
  { token: '--ds-radius-md', px: '14', note: 'input' },
  { token: '--ds-radius-lg', px: '16', note: 'card' },
  { token: '--ds-radius-xl', px: '20' },
  { token: '--ds-radius-2xl', px: '24', note: 'sheet' },
  { token: '--ds-radius-tile', px: '22', note: 'accent tile' },
  { token: '--ds-radius-full', px: '9999', note: 'pill / circle' },
];

function SpaceRow({ token, px, note }: SpaceToken) {
  return (
    <div className="flex items-center gap-6">
      <div className="flex w-44 shrink-0 flex-col gap-0.5">
        <code className="text-foreground text-sm">{token}</code>
        <span className="text-fg-secondary text-xs">
          {px}px{note ? ` — ${note}` : ''}
        </span>
      </div>
      <div className="bg-brand h-4 rounded-full" style={{ width: `var(${token})` }} />
    </div>
  );
}

function RadiusChip({ token, px, note }: RadiusToken) {
  return (
    <div className="flex w-36 flex-col gap-1.5">
      <div
        className="bg-background ring-line h-16 w-full ring-1"
        style={{ borderRadius: `var(${token})` }}
      />
      <code className="text-foreground text-[11px] leading-tight break-all">{token}</code>
      <span className="text-fg-secondary text-[11px] leading-tight">
        {px}px{note ? ` — ${note}` : ''}
      </span>
    </div>
  );
}

const meta: Meta = {
  title: 'Foundation/Spacing & Radius',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '간격·라디우스 토큰 (원본: docs/design.md).\n\n간격은 4px 베이스 스케일 8단계 + semantic gutter, 라디우스는 8~24px 램프 — input 14 / card 16 / sheet 24가 기준값이다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Spacing: Story = {
  render: () => (
    <div className="flex max-w-2xl flex-col gap-8">
      <section className="flex flex-col gap-3">
        <h3 className="text-foreground text-base font-semibold">Scale — 4px 베이스</h3>
        <div className="flex flex-col gap-2.5">
          {SPACE_SCALE.map((token) => (
            <SpaceRow key={token.token} {...token} />
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-3">
        <h3 className="text-foreground text-base font-semibold">Semantic</h3>
        <div className="flex flex-col gap-2.5">
          {SPACE_SEMANTIC.map((token) => (
            <SpaceRow key={token.token} {...token} />
          ))}
        </div>
      </section>
    </div>
  ),
};

export const Radius: Story = {
  render: () => (
    <div className="flex max-w-3xl flex-wrap gap-4">
      {RADIUS_SCALE.map((token) => (
        <RadiusChip key={token.token} {...token} />
      ))}
    </div>
  ),
};
