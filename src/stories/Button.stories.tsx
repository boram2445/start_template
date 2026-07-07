import type * as React from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Button } from '@/components/core/button/index';

// ButtonProps는 asChild+loading 조합을 막는 판별 유니온이라 Storybook의
// args 추론(교차 변환)에서 never로 접힌다 — 유니온을 편 느슨한 타입으로 다룬다
type ButtonStoryProps = React.ComponentProps<'button'> & {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'outlined';
  size?: 'xlarge' | 'large' | 'medium' | 'small' | 'xsmall';
  loading?: boolean;
  asChild?: boolean;
};

const meta: Meta<ButtonStoryProps> = {
  title: 'UI/Button',
  component: Button as React.ComponentType<ButtonStoryProps>,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '디자인 킷의 주 행동 버튼 — 화면당 primary는 하나만 둔다.\n\n4개 variant(primary/secondary/tertiary/outlined)와 5개 사이즈(xlarge/large/medium/small/xsmall, 56/48/40/34/32)를 제공하며, 사이즈에 따라 radius가 14/12/12/10/8로 함께 스케일한다. disabled는 불투명도 대신 색 교체.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'outlined'],
      description: '버튼 스타일 variant',
    },
    size: {
      control: 'select',
      options: ['xlarge', 'large', 'medium', 'small', 'xsmall'],
      description: '버튼 크기 (radius가 함께 스케일)',
    },
    loading: {
      control: 'boolean',
      description: '로딩 상태 — 클릭 차단, 너비 유지, 스피너 표시',
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
    children: '저장하기',
    variant: 'primary',
    size: 'medium',
  },
};

export const Primary: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button variant="primary" size="xlarge">
        저장하기
      </Button>
      <Button variant="primary" size="large">
        저장하기
      </Button>
      <Button variant="primary" size="medium">
        저장하기
      </Button>
      <Button variant="primary" size="small">
        저장하기
      </Button>
      <Button variant="primary" size="xsmall">
        저장하기
      </Button>
    </div>
  ),
};

export const Secondary: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button variant="secondary" size="xlarge">
        다음에
      </Button>
      <Button variant="secondary" size="large">
        다음에
      </Button>
      <Button variant="secondary" size="medium">
        다음에
      </Button>
      <Button variant="secondary" size="small">
        다음에
      </Button>
      <Button variant="secondary" size="xsmall">
        다음에
      </Button>
    </div>
  ),
};

export const Tertiary: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button variant="tertiary" size="xlarge">
        취소
      </Button>
      <Button variant="tertiary" size="large">
        취소
      </Button>
      <Button variant="tertiary" size="medium">
        취소
      </Button>
      <Button variant="tertiary" size="small">
        취소
      </Button>
      <Button variant="tertiary" size="xsmall">
        취소
      </Button>
    </div>
  ),
};

export const Outlined: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button variant="outlined" size="xlarge">
        더보기
      </Button>
      <Button variant="outlined" size="large">
        더보기
      </Button>
      <Button variant="outlined" size="medium">
        더보기
      </Button>
      <Button variant="outlined" size="small">
        더보기
      </Button>
      <Button variant="outlined" size="xsmall">
        더보기
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button variant="primary" disabled>
        저장하기
      </Button>
      <Button variant="secondary" disabled>
        다음에
      </Button>
      <Button variant="tertiary" disabled>
        취소
      </Button>
      <Button variant="outlined" disabled>
        더보기
      </Button>
    </div>
  ),
};

export const Loading: Story = {
  args: {
    children: '저장하기',
    variant: 'primary',
    size: 'medium',
    loading: true,
  },
};

export const AllVariants: Story = {
  parameters: {
    layout: 'padded',
  },
  render: () => (
    <div className="flex flex-col gap-6">
      {(['primary', 'secondary', 'tertiary', 'outlined'] as const).map((variant) => (
        <div key={variant} className="flex items-center gap-3">
          <span className="w-24 text-sm text-fg-secondary">{variant}</span>
          <Button variant={variant} size="xlarge">
            저장하기
          </Button>
          <Button variant={variant} size="large">
            저장하기
          </Button>
          <Button variant={variant} size="medium">
            저장하기
          </Button>
          <Button variant={variant} size="small">
            저장하기
          </Button>
          <Button variant={variant} size="xsmall">
            저장하기
          </Button>
          <Button variant={variant} size="medium" disabled>
            비활성
          </Button>
          <Button variant={variant} size="medium" loading>
            로딩
          </Button>
        </div>
      ))}
    </div>
  ),
};
