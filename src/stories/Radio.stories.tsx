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
          '20×20 원형 컨트롤의 라디오 그룹. 선택 시 안쪽 dot이 브랜드 색으로 채워지고, 행(높이 48) 단위로 press 피드백이 붙는다. boxed를 켜면 그룹이 radius-sm + 회색 배경 컨테이너로 감싸진다.',
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

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="fixed" className="w-72">
      <Radio value="fixed" label="선택됨 (비활성)" disabled />
      <Radio value="other" label="선택 안 됨 (비활성)" disabled />
    </RadioGroup>
  ),
};
