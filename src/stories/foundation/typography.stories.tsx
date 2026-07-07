import type * as React from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

type TypeStyle = {
  name: string;
  sizeToken: string;
  lhToken: string;
  weightToken: string;
  /** px / line-height / weight 요약 */
  spec: string;
  usage?: string;
};

const TYPE_SCALE: TypeStyle[] = [
  {
    name: 'display',
    sizeToken: '--ds-text-display',
    lhToken: '--ds-lh-display',
    weightToken: '--ds-fw-bold',
    spec: '36 / 1.25 / Bold',
  },
  {
    name: 'h1',
    sizeToken: '--ds-text-h1',
    lhToken: '--ds-lh-h1',
    weightToken: '--ds-fw-bold',
    spec: '26 / 1.30 / Bold',
  },
  {
    name: 'h2',
    sizeToken: '--ds-text-h2',
    lhToken: '--ds-lh-h2',
    weightToken: '--ds-fw-bold',
    spec: '24 / 1.35 / Bold',
  },
  {
    name: 'h3',
    sizeToken: '--ds-text-h3',
    lhToken: '--ds-lh-h3',
    weightToken: '--ds-fw-bold',
    spec: '22 / 1.35 / Bold',
  },
  {
    name: 'h4',
    sizeToken: '--ds-text-h4',
    lhToken: '--ds-lh-h4',
    weightToken: '--ds-fw-bold',
    spec: '20 / 1.40 / Bold',
  },
  {
    name: 'title-1',
    sizeToken: '--ds-text-title-1',
    lhToken: '--ds-lh-title-1',
    weightToken: '--ds-fw-semibold',
    spec: '18 / 1.45 / SemiBold',
  },
  {
    name: 'title-2',
    sizeToken: '--ds-text-title-2',
    lhToken: '--ds-lh-title-2',
    weightToken: '--ds-fw-semibold',
    spec: '16 / 1.50 / SemiBold',
  },
  {
    name: 'title-3',
    sizeToken: '--ds-text-title-3',
    lhToken: '--ds-lh-title-3',
    weightToken: '--ds-fw-semibold',
    spec: '14 / 1.55 / SemiBold',
  },
  {
    name: 'body-1',
    sizeToken: '--ds-text-body-1',
    lhToken: '--ds-lh-body-1',
    weightToken: '--ds-fw-regular',
    spec: '18 / 1.45 / Regular',
  },
  {
    name: 'body-2',
    sizeToken: '--ds-text-body-2',
    lhToken: '--ds-lh-body-2',
    weightToken: '--ds-fw-regular',
    spec: '16 / 1.50 / Regular',
    usage: '기본 본문',
  },
  {
    name: 'body-3',
    sizeToken: '--ds-text-body-3',
    lhToken: '--ds-lh-body-3',
    weightToken: '--ds-fw-regular',
    spec: '14 / 1.55 / Regular',
  },
  {
    name: 'caption',
    sizeToken: '--ds-text-caption',
    lhToken: '--ds-lh-caption',
    weightToken: '--ds-fw-regular',
    spec: '12 / 1.50 / Regular',
  },
];

const WEIGHTS = [
  { token: '--ds-fw-regular', label: 'Regular 400' },
  { token: '--ds-fw-medium', label: 'Medium 500' },
  { token: '--ds-fw-semibold', label: 'SemiBold 600' },
  { token: '--ds-fw-bold', label: 'Bold 700' },
];

const SAMPLE = '다람쥐 헌 쳇바퀴에 타고파 Sphinx 0123';

function ScaleRow({ name, sizeToken, lhToken, weightToken, spec, usage }: TypeStyle) {
  return (
    <div className="border-line flex items-baseline gap-6 border-b pb-4">
      <div className="flex w-36 shrink-0 flex-col gap-0.5">
        <code className="text-foreground text-sm font-semibold">{name}</code>
        <span className="text-fg-secondary text-xs">{spec}</span>
        {usage ? <span className="text-fg-brand text-xs">{usage}</span> : null}
      </div>
      <p
        className="text-foreground min-w-0 truncate"
        style={{
          fontSize: `var(${sizeToken})`,
          lineHeight: `var(${lhToken})`,
          fontWeight: `var(${weightToken})` as React.CSSProperties['fontWeight'],
        }}
      >
        {SAMPLE}
      </p>
    </div>
  );
}

const meta: Meta = {
  title: 'Foundation/Typography',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '타이포그래피 토큰 (원본: docs/design.md).\n\n폰트는 Pretendard Variable, 스케일은 display~caption 12단계 — heading은 Bold, title은 SemiBold, body는 Regular. 숫자는 굵게, 단위 라벨은 Regular로 쓰는 것이 킷 규칙.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  render: () => (
    <div className="flex max-w-3xl flex-col gap-4">
      {TYPE_SCALE.map((style) => (
        <ScaleRow key={style.name} {...style} />
      ))}
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div className="flex max-w-3xl flex-col gap-3">
      {WEIGHTS.map(({ token, label }) => (
        <div key={token} className="flex items-baseline gap-6">
          <div className="flex w-36 shrink-0 flex-col gap-0.5">
            <span className="text-foreground text-sm">{label}</span>
            <code className="text-fg-secondary text-xs">{token}</code>
          </div>
          <p
            className="text-foreground text-lg"
            style={{ fontWeight: `var(${token})` as React.CSSProperties['fontWeight'] }}
          >
            {SAMPLE}
          </p>
        </div>
      ))}
    </div>
  ),
};

export const NumberRule: Story = {
  name: '숫자·단위 규칙',
  render: () => (
    <div className="flex flex-col gap-2">
      <p className="text-foreground">
        <span className="text-3xl font-bold">1,240</span>{' '}
        <span className="text-fg-secondary text-base font-normal">kcal</span>
      </p>
      <p className="text-foreground">
        <span className="text-3xl font-bold">86</span>{' '}
        <span className="text-fg-secondary text-base font-normal">점</span>
      </p>
      <p className="text-fg-secondary text-sm">숫자는 Bold, 단위 라벨은 Regular + 보조색.</p>
    </div>
  ),
};
