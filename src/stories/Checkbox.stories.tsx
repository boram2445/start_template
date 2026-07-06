import { expect, userEvent, within } from 'storybook/test';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Checkbox } from '@/components/core/checkbox/index';

const meta: Meta<typeof Checkbox> = {
  title: 'UI/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '20×20 원형 컨트롤의 체크박스. 체크 시 브랜드 배경 + 흰 체크, disabled는 불투명도 대신 gray-300으로 색 강등된다. label을 지정하면 높이 48 행 레이아웃이 되고 행 press 피드백이 붙는다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: '컨트롤 오른쪽 라벨 (클릭 시 토글)',
    },
    disabled: {
      control: 'boolean',
      description: '비활성 상태 — 색 교체 방식',
    },
    checked: {
      control: false,
      description: '제어형 체크 상태',
    },
    onCheckedChange: {
      control: false,
      description: '상태 변경 콜백',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultChecked: true,
  },
};

export const WithLabel: Story = {
  args: {
    label: '이용약관에 동의합니다',
    defaultChecked: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const checkbox = canvas.getByRole('checkbox', { name: '이용약관에 동의합니다' });
    await expect(checkbox).not.toBeChecked();

    await userEvent.click(canvas.getByText('이용약관에 동의합니다'));
    await expect(checkbox).toBeChecked();
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col">
      <Checkbox label="비활성 (해제)" disabled />
      <Checkbox label="비활성 (체크)" disabled defaultChecked />
    </div>
  ),
};

export const AllVariants: Story = {
  parameters: {
    layout: 'padded',
  },
  render: () => (
    <div className="flex w-80 flex-col">
      <Checkbox label="아침 러닝 30분" defaultChecked />
      <Checkbox label="물 2L 마시기" defaultChecked />
      <Checkbox label="스트레칭 10분" />
      <Checkbox label="비활성 항목" disabled />
      <Checkbox label="비활성 체크 항목" disabled defaultChecked />
    </div>
  ),
};
