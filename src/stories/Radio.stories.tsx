import { expect, userEvent, within } from 'storybook/test';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Radio, RadioGroup } from '@/components/core/radio/index';

const meta: Meta<typeof RadioGroup> = {
  title: 'UI/Radio',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '단일 선택 라디오 그룹 — boxed를 켜면 그룹이 radius-sm + 회색 배경 컨테이너로 감싸진다. label은 checkbox와 동일하게 선택 사항이며, 없으면 20px 박스를 유지한 채 클릭 영역만 44px로 넓어진다.\n\n20×20 원형 컨트롤. 선택 시 안쪽 dot이 브랜드 색으로 채워지고, 행(높이 48) 단위로 press 피드백이 붙는다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    boxed: {
      control: 'boolean',
      description: '그룹 컨테이너 스타일 (radius-sm + 회색 배경)',
    },
    defaultValue: {
      control: false,
      description: '초기 선택 값',
    },
    onValueChange: {
      control: false,
      description: '선택 변경 콜백',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="morning" className="w-72">
      <Radio value="morning" label="아침" />
      <Radio value="afternoon" label="점심" />
      <Radio value="evening" label="저녁" />
    </RadioGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const morning = canvas.getByRole('radio', { name: '아침' });
    const evening = canvas.getByRole('radio', { name: '저녁' });
    await expect(morning).toBeChecked();

    await userEvent.click(canvas.getByText('저녁'));
    await expect(evening).toBeChecked();
    await expect(morning).not.toBeChecked();
  },
};

export const Boxed: Story = {
  render: () => (
    <RadioGroup defaultValue="daily" boxed className="w-72">
      <Radio value="daily" label="매일" />
      <Radio value="weekday" label="평일만" />
      <Radio value="weekend" label="주말만" />
    </RadioGroup>
  ),
};

export const Bare: Story = {
  name: '라벨 없음 (44px 히트박스)',
  render: () => (
    <RadioGroup defaultValue="a" className="flex flex-row gap-4">
      <Radio value="a" aria-label="옵션 A" />
      <Radio value="b" aria-label="옵션 B" />
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="fixed" className="w-72">
      <Radio value="fixed" label="선택됨 (비활성)" disabled />
      <Radio value="other" label="선택 안 됨 (비활성)" disabled />
    </RadioGroup>
  ),
};
