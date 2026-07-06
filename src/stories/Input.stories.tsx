import { expect, userEvent, within } from 'storybook/test';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Input } from '@/components/core/input/index';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '라벨 + 필드(높이 48, radius 14) + 헬퍼 텍스트로 구성된 입력 필드. filled(회색 배경)/outlined(흰 배경 + 헤어라인)/underline(하단 보더만) 3개 variant를 제공하며, 포커스 시 브랜드 보더, 에러 시 danger 보더 + 에러 메시지로 전환된다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'underline'],
      description: '필드 표면 스타일',
    },
    label: {
      control: 'text',
      description: '필드 위 라벨',
    },
    helperText: {
      control: 'text',
      description: '필드 아래 보조 텍스트',
    },
    error: {
      control: 'text',
      description: '에러 메시지 — 지정 시 danger 보더 + helperText 대체',
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더',
    },
    disabled: {
      control: 'boolean',
      description: '비활성 상태 — 색 교체 방식',
    },
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: '닉네임',
    placeholder: '닉네임을 입력해 주세요',
    helperText: '2~10자 한글 또는 영문',
    variant: 'filled',
  },
};

export const Outlined: Story = {
  args: {
    label: '이메일',
    placeholder: 'me@example.com',
    variant: 'outlined',
  },
};

export const Underline: Story = {
  args: {
    label: '목표',
    placeholder: '이번 달 목표를 입력해 주세요',
    variant: 'underline',
  },
};

export const Error: Story = {
  args: {
    label: '닉네임',
    defaultValue: '한',
    error: '닉네임은 2자 이상이어야 해요',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByLabelText('닉네임');
    await expect(input).toHaveAttribute('aria-invalid', 'true');
    await expect(canvas.getByText('닉네임은 2자 이상이어야 해요')).toBeInTheDocument();
  },
};

export const Disabled: Story = {
  args: {
    label: '닉네임',
    defaultValue: '고요',
    disabled: true,
  },
};

export const Typing: Story = {
  args: {
    label: '검색',
    placeholder: '검색어를 입력해 주세요',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByLabelText('검색');
    await userEvent.type(input, '아침 러닝');
    await expect(input).toHaveValue('아침 러닝');
  },
};

export const AllVariants: Story = {
  parameters: {
    layout: 'padded',
  },
  render: () => (
    <div className="flex w-80 flex-col gap-6">
      <Input variant="filled" label="filled" placeholder="닉네임을 입력해 주세요" />
      <Input variant="outlined" label="outlined" placeholder="닉네임을 입력해 주세요" />
      <Input variant="underline" label="underline" placeholder="닉네임을 입력해 주세요" />
      <Input label="helper" placeholder="닉네임" helperText="2~10자 한글 또는 영문" />
      <Input label="error" defaultValue="한" error="닉네임은 2자 이상이어야 해요" />
      <Input label="disabled" defaultValue="고요" disabled />
    </div>
  ),
};
