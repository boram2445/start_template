import type * as React from 'react';

import { BellIcon } from 'lucide-react';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Badge } from '@/components/core/badge/index';
import { IconButton } from '@/components/core/icon-button/index';

// BadgeProps는 판별 유니온이라 Storybook의 args 추론(교차 변환)에서 never로 접힌다.
// 컨트롤 패널은 variant·count를 자유 조합하는 도구이므로 유니온을 편 느슨한 타입으로 다룬다.
type BadgeStoryProps = React.ComponentProps<'span'> & {
  variant?: 'count' | 'dot';
  count?: number;
  max?: number;
};

const meta: Meta<BadgeStoryProps> = {
  title: 'UI/Badge',
  component: Badge as React.ComponentType<BadgeStoryProps>,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '알림 배지 — count(숫자 pill)와 dot(점) 두 variant. children으로 대상 요소를 감싸면 우상단에 오프셋해 붙는다.\n\ncount는 높이 20 pill, dot은 6×6 점. 기본 배경은 danger 레드.',
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
      {/* 배지는 시각 정보뿐 — 스크린리더용 aria-label을 함께 지정한다 */}
      <Badge count={3} aria-label="읽지 않은 알림 3개">
        <IconButton variant="ghost" aria-label="알림">
          <BellIcon />
        </IconButton>
      </Badge>
      <Badge variant="dot" aria-label="새 알림 있음">
        <IconButton variant="ghost" aria-label="새 알림">
          <BellIcon />
        </IconButton>
      </Badge>
    </div>
  ),
};
