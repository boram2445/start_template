import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { CardAccent } from '@/components/core/card-accent/index';

const meta: Meta<typeof CardAccent> = {
  title: 'UI/CardAccent',
  component: CardAccent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '분류용 파스텔 카드 — 비인터랙티브 표면이며 진입 액션은 별도 버튼이나 전체 영역 탭으로 처리한다. 파스텔이 허용되는 두 표면(Tag와 CardAccent) 중 하나.\n\nradius 22, accent 배경 + 기본 텍스트.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    accent: {
      control: 'select',
      options: ['yellow', 'mint', 'coral', 'lavender', 'sky', 'peach'],
      description: '분류 파스텔 색상',
    },
    children: {
      control: false,
      description: '카드 내용',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <CardAccent accent="mint" className="w-44">
      <span className="text-2xl">🏃</span>
      <span className="text-base font-semibold">운동</span>
      <span className="text-sm text-fg-secondary">12개 루틴</span>
    </CardAccent>
  ),
};

export const AllVariants: Story = {
  parameters: {
    layout: 'padded',
  },
  render: () => (
    <div className="grid w-[480px] grid-cols-3 gap-3">
      {(
        [
          { accent: 'yellow', emoji: '🌅', label: '아침 루틴' },
          { accent: 'mint', emoji: '🏃', label: '운동' },
          { accent: 'coral', emoji: '🥗', label: '식단' },
          { accent: 'lavender', emoji: '😴', label: '수면' },
          { accent: 'sky', emoji: '📚', label: '공부' },
          { accent: 'peach', emoji: '🎨', label: '취미' },
        ] as const
      ).map(({ accent, emoji, label }) => (
        <CardAccent key={accent} accent={accent}>
          <span className="text-2xl">{emoji}</span>
          <span className="text-base font-semibold">{label}</span>
        </CardAccent>
      ))}
    </div>
  ),
};
