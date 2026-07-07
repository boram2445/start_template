import { useState } from 'react';

import { expect, userEvent, within } from 'storybook/test';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { SelectionBox } from '@/components/core/selection-box/index';

const meta: Meta<typeof SelectionBox> = {
  title: 'UI/SelectionBox',
  component: SelectionBox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '타이틀 + 서브텍스트로 구성된 큰 선택 카드 — 선택 상태는 aria-pressed로 노출된다.\n\nradius 14, 높이 ~82. 선택 시 브랜드 보더 + 옅은 그린 tint 배경 + 진한 동계열 텍스트로 전환된다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '타이틀',
    },
    description: {
      control: 'text',
      description: '타이틀 아래 서브텍스트',
    },
    selected: {
      control: 'boolean',
      description: '선택 상태 (aria-pressed)',
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
    title: '가볍게 시작하기',
    description: '하루 10분, 부담 없는 루틴부터',
    selected: false,
  },
};

export const Selected: Story = {
  args: {
    title: '제대로 해보기',
    description: '하루 30분, 주 5회 루틴',
    selected: true,
  },
};

export const Disabled: Story = {
  args: {
    title: '준비 중이에요',
    description: '다음 업데이트에서 열려요',
    disabled: true,
  },
};

function SelectionGroup() {
  const [value, setValue] = useState('light');

  const options = [
    { value: 'light', title: '가볍게 시작하기', description: '하루 10분, 부담 없는 루틴부터' },
    { value: 'full', title: '제대로 해보기', description: '하루 30분, 주 5회 루틴' },
  ];

  return (
    <div className="flex w-80 flex-col gap-3">
      {options.map((option) => (
        <SelectionBox
          key={option.value}
          title={option.title}
          description={option.description}
          selected={value === option.value}
          onClick={() => setValue(option.value)}
        />
      ))}
    </div>
  );
}

export const Interactive: Story = {
  render: () => <SelectionGroup />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const full = canvas.getByRole('button', { name: /제대로 해보기/ });
    await expect(full).toHaveAttribute('aria-pressed', 'false');

    await userEvent.click(full);
    await expect(full).toHaveAttribute('aria-pressed', 'true');
    await expect(canvas.getByRole('button', { name: /가볍게 시작하기/ })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  },
};
