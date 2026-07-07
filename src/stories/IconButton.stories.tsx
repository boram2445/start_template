import { BellIcon, HeartIcon, SearchIcon, SettingsIcon, XIcon } from 'lucide-react';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { IconButton } from '@/components/core/icon-button/index';

const meta: Meta<typeof IconButton> = {
  title: 'UI/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '완전 원형 아이콘 버튼 — 아이콘 전용이므로 aria-label이 필수다 (라인/필 아이콘만, 이모지 금지).\n\n5개 사이즈(xsmall ~28 → xlarge ~46)를 제공하며 press 리플이 원형에 클리핑된다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['ghost', 'filled'],
      description: '배경 스타일 — ghost(투명) / filled(회색 배경)',
    },
    size: {
      control: 'select',
      options: ['xsmall', 'small', 'medium', 'large', 'xlarge'],
      description: '버튼 크기 (원형 정사각)',
    },
    disabled: {
      control: 'boolean',
      description: '비활성 상태 — 색 교체 방식',
    },
    'aria-label': {
      control: 'text',
      description: '스크린리더용 라벨 (필수)',
    },
    asChild: {
      control: false,
      description: '자식 요소로 렌더링 (radix Slot)',
    },
    children: {
      control: false,
      description: '아이콘 요소',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    'aria-label': '검색',
    variant: 'ghost',
    size: 'medium',
  },
  render: (args) => (
    <IconButton {...args}>
      <SearchIcon />
    </IconButton>
  ),
};

export const Filled: Story = {
  args: {
    'aria-label': '알림',
    variant: 'filled',
    size: 'medium',
  },
  render: (args) => (
    <IconButton {...args}>
      <BellIcon />
    </IconButton>
  ),
};

export const Disabled: Story = {
  args: {
    'aria-label': '설정',
    variant: 'filled',
    disabled: true,
  },
  render: (args) => (
    <IconButton {...args}>
      <SettingsIcon />
    </IconButton>
  ),
};

export const AllVariants: Story = {
  parameters: {
    layout: 'padded',
  },
  render: () => (
    <div className="flex flex-col gap-6">
      {(['ghost', 'filled'] as const).map((variant) => (
        <div key={variant} className="flex items-center gap-3">
          <span className="w-24 text-sm text-fg-secondary">{variant}</span>
          <IconButton variant={variant} size="xsmall" aria-label="닫기">
            <XIcon />
          </IconButton>
          <IconButton variant={variant} size="small" aria-label="검색">
            <SearchIcon />
          </IconButton>
          <IconButton variant={variant} size="medium" aria-label="알림">
            <BellIcon />
          </IconButton>
          <IconButton variant={variant} size="large" aria-label="좋아요">
            <HeartIcon />
          </IconButton>
          <IconButton variant={variant} size="xlarge" aria-label="설정">
            <SettingsIcon />
          </IconButton>
          <IconButton variant={variant} size="medium" aria-label="비활성" disabled>
            <SettingsIcon />
          </IconButton>
        </div>
      ))}
    </div>
  ),
};
