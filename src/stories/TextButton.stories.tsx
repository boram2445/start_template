import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { TextButton } from '@/components/core/text-button/index';

const meta: Meta<typeof TextButton> = {
  title: 'UI/TextButton',
  component: TextButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '배경 없는 텍스트 버튼. radius 4 고정, variant로 텍스트 색이 결정되며(primary 브랜드 / secondary 본문 / tertiary 보조) 옵션으로 underline을 지원한다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: '텍스트 색 variant',
    },
    underline: {
      control: 'boolean',
      description: '밑줄 표시',
    },
    disabled: {
      control: 'boolean',
      description: '비활성 상태 — 색 교체 방식',
    },
    asChild: {
      control: false,
      description: '자식 요소로 렌더링 (radix Slot)',
    },
    children: {
      control: 'text',
      description: '버튼 내용',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '전체 보기',
    variant: 'primary',
  },
};

export const Underline: Story = {
  args: {
    children: '자세히 보기',
    variant: 'secondary',
    underline: true,
  },
};

export const Disabled: Story = {
  args: {
    children: '전체 보기',
    disabled: true,
  },
};

export const AllVariants: Story = {
  parameters: {
    layout: 'padded',
  },
  render: () => (
    <div className="flex flex-col gap-4">
      {(['primary', 'secondary', 'tertiary'] as const).map((variant) => (
        <div key={variant} className="flex items-center gap-4">
          <span className="w-24 text-sm text-fg-secondary">{variant}</span>
          <TextButton variant={variant}>전체 보기</TextButton>
          <TextButton variant={variant} underline>
            자세히 보기
          </TextButton>
          <TextButton variant={variant} disabled>
            비활성
          </TextButton>
        </div>
      ))}
    </div>
  ),
};
