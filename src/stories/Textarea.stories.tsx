import { expect, userEvent, within } from 'storybook/test';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Textarea } from '@/components/core/textarea/index';

const meta: Meta<typeof Textarea> = {
  title: 'UI/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '멀티라인 입력 필드 — showCount와 maxLength를 함께 쓰면 "12/200" 형태의 글자수 카운터가 붙는다.\n\nInput과 동형인 filled(회색 배경)/outlined(흰 배경 + 헤어라인)/underline(하단 보더만) 3개 variant. 최소 높이 64에서 내용에 따라 auto-grow하며, radius 14(underline은 0).',
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
    showCount: {
      control: 'boolean',
      description: '글자수 카운터 표시',
    },
    maxLength: {
      control: 'number',
      description: '최대 글자수',
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
    label: '메모',
    placeholder: '오늘의 기록을 남겨 보세요',
  },
};

export const Outlined: Story = {
  args: {
    label: '메모',
    placeholder: '오늘의 기록을 남겨 보세요',
    variant: 'outlined',
  },
};

export const Underline: Story = {
  args: {
    label: '메모',
    placeholder: '오늘의 기록을 남겨 보세요',
    variant: 'underline',
  },
};

export const WithCounter: Story = {
  args: {
    label: '소개',
    placeholder: '내 소개를 입력해 주세요',
    showCount: true,
    maxLength: 200,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const textarea = canvas.getByLabelText('소개');
    await userEvent.type(textarea, '아침 러닝');
    await expect(canvas.getByText('5/200')).toBeInTheDocument();
  },
};

export const Error: Story = {
  args: {
    label: '소개',
    defaultValue: '안',
    error: '소개는 2자 이상이어야 해요',
  },
};

export const Disabled: Story = {
  args: {
    label: '메모',
    defaultValue: '작성 완료된 메모',
    disabled: true,
  },
};

export const AllVariants: Story = {
  parameters: {
    layout: 'padded',
  },
  render: () => (
    <div className="flex w-80 flex-col gap-6">
      <Textarea label="filled" placeholder="오늘의 기록을 남겨 보세요" />
      <Textarea variant="outlined" label="outlined" placeholder="오늘의 기록을 남겨 보세요" />
      <Textarea variant="underline" label="underline" placeholder="오늘의 기록을 남겨 보세요" />
      <Textarea label="카운터" placeholder="내 소개" showCount maxLength={200} />
      <Textarea label="헬퍼" placeholder="메모" helperText="최대 200자까지 저장돼요" />
      <Textarea label="에러" defaultValue="안" error="소개는 2자 이상이어야 해요" />
      <Textarea label="비활성" defaultValue="작성 완료된 메모" disabled />
    </div>
  ),
};
