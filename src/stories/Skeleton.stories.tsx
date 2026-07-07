import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Skeleton } from '@/components/core/skeleton/index';

const meta: Meta<typeof Skeleton> = {
  title: 'UI/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '로딩 표준 스켈레톤 — 사각 / 원형 / 카드 3개 variant.\n\n회색 베이스 + 웨이브 시머. 사각은 radius 12, 카드는 radius 16 + 헤어라인 + 그림자.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['rect', 'circle', 'card'],
      description: '스켈레톤 형태',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Skeleton className="h-4 w-48" />,
};

export const Circle: Story = {
  render: () => <Skeleton variant="circle" className="size-12" />,
};

export const CardShape: Story = {
  render: () => <Skeleton variant="card" className="h-32 w-72" />,
};

export const ListLoading: Story = {
  parameters: {
    layout: 'padded',
  },
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      {Array.from({ length: 3 }, (_, index) => (
        <div key={index} className="flex items-center gap-3">
          <Skeleton variant="circle" className="size-11" />
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  ),
};
