import { BellIcon } from 'lucide-react';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Badge } from '@/components/core/badge/index';
import { IconButton } from '@/components/core/icon-button/index';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '알림 배지 — count(숫자 pill, 높이 20)와 dot(6×6 점) 두 variant. 기본 배경은 danger 레드. children으로 대상 요소를 감싸면 우상단에 오프셋해 붙는다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['count', 'dot'],
      description: '배지 형태',
    },
    count: {
      control: 'number',
      description: '표시할 숫자 (count variant)',
    },
    max: {
      control: 'number',
      description: '초과 시 "99+" 형태로 축약',
    },
    children: {
      control: false,
      description: '배지를 붙일 대상 요소',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    count: 3,
  },
};

export const Overflow: Story = {
  args: {
    count: 120,
    max: 99,
  },
};

export const Dot: Story = {
  args: {
    variant: 'dot',
  },
};

export const Anchored: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <Badge count={3}>
        <IconButton variant="filled" aria-label="알림">
          <BellIcon />
        </IconButton>
      </Badge>
      <Badge variant="dot">
        <IconButton variant="filled" aria-label="새 알림">
          <BellIcon />
        </IconButton>
      </Badge>
    </div>
  ),
};
