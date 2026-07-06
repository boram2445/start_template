import { useState } from 'react';

import { expect, userEvent, within } from 'storybook/test';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Chip } from '@/components/core/chip/index';

const meta: Meta<typeof Chip> = {
  title: 'UI/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '선택 가능한 pill 형태의 칩. 비선택 시 흰 배경 + 헤어라인 + 보조 텍스트, 선택 시 브랜드 tint 배경 + 브랜드 보더 + 강조 텍스트로 전환된다. 선택 상태는 aria-pressed로 노출된다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['medium', 'small', 'xsmall'],
      description: '칩 크기 (높이 36~40)',
    },
    selected: {
      control: 'boolean',
      description: '선택 상태 (aria-pressed)',
    },
    disabled: {
      control: 'boolean',
      description: '비활성 상태 — 색 교체 방식',
    },
    children: {
      control: 'text',
      description: '칩 내용',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '전체',
    size: 'medium',
    selected: false,
  },
};

export const Selected: Story = {
  args: {
    children: '러닝',
    selected: true,
  },
};

export const Disabled: Story = {
  args: {
    children: '준비 중',
    disabled: true,
  },
};

function ToggleChips() {
  const [selected, setSelected] = useState<string[]>(['러닝']);

  const toggle = (label: string) => {
    setSelected((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label],
    );
  };

  return (
    <div className="flex items-center gap-2">
      {['전체', '러닝', '식단', '수면', '명상'].map((label) => (
        <Chip key={label} selected={selected.includes(label)} onClick={() => toggle(label)}>
          {label}
        </Chip>
      ))}
    </div>
  );
}

export const Interactive: Story = {
  render: () => <ToggleChips />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const chip = canvas.getByRole('button', { name: '식단' });
    await expect(chip).toHaveAttribute('aria-pressed', 'false');

    await userEvent.click(chip);
    await expect(chip).toHaveAttribute('aria-pressed', 'true');

    await userEvent.click(chip);
    await expect(chip).toHaveAttribute('aria-pressed', 'false');
  },
};

export const AllVariants: Story = {
  parameters: {
    layout: 'padded',
  },
  render: () => (
    <div className="flex flex-col gap-4">
      {(['medium', 'small', 'xsmall'] as const).map((size) => (
        <div key={size} className="flex items-center gap-3">
          <span className="w-24 text-sm text-fg-secondary">{size}</span>
          <Chip size={size}>전체</Chip>
          <Chip size={size} selected>
            러닝
          </Chip>
          <Chip size={size} disabled>
            준비 중
          </Chip>
        </div>
      ))}
    </div>
  ),
};
