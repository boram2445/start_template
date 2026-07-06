import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Tag } from '@/components/core/tag/index';

const meta: Meta<typeof Tag> = {
  title: 'UI/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '비인터랙티브 분류 라벨 — 파스텔 분류색의 주 무대. accent 배경 + 동계열 진한 텍스트 조합이며, 기본은 브랜드 그린 tint. 클릭 대상이 아니므로 press 피드백이 없다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    accent: {
      control: 'select',
      options: ['green', 'yellow', 'mint', 'coral', 'lavender', 'sky', 'peach'],
      description: '분류 색상 — 파스텔 6색 + 기본 그린',
    },
    children: {
      control: 'text',
      description: '태그 내용',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '건강',
    accent: 'green',
  },
};

export const AllVariants: Story = {
  parameters: {
    layout: 'padded',
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Tag accent="green">건강</Tag>
      <Tag accent="yellow">아침 루틴</Tag>
      <Tag accent="mint">운동</Tag>
      <Tag accent="coral">식단</Tag>
      <Tag accent="lavender">수면</Tag>
      <Tag accent="sky">공부</Tag>
      <Tag accent="peach">취미</Tag>
    </div>
  ),
};
