import { useState } from 'react';

import { expect, userEvent, within } from 'storybook/test';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Switch } from '@/components/core/switch/index';

const meta: Meta<typeof Switch> = {
  title: 'UI/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '토글 스위치 — label을 지정하면 라벨 클릭으로도 토글되는 행 레이아웃이 된다.\n\non 트랙은 브랜드 그린, off 트랙은 gray-300, knob은 흰색이다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: '스위치 오른쪽 라벨 (클릭 시 토글)',
    },
    size: {
      control: 'select',
      options: ['default', 'sm'],
      description: '스위치 크기',
    },
    disabled: {
      control: 'boolean',
      description: '비활성 상태',
    },
    checked: {
      control: false,
      description: '제어형 on/off 상태',
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
    label: '알림 받기',
    defaultChecked: false,
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Switch disabled />
      <Switch disabled defaultChecked />
    </div>
  ),
};

function ControlledSwitch() {
  const [checked, setChecked] = useState(false);

  return (
    <Switch label={checked ? '알림 켜짐' : '알림 꺼짐'} checked={checked} onCheckedChange={setChecked} />
  );
}

export const Interactive: Story = {
  render: () => <ControlledSwitch />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const toggle = canvas.getByRole('switch');
    await expect(toggle).not.toBeChecked();

    await userEvent.click(toggle);
    await expect(toggle).toBeChecked();
    await expect(canvas.getByText('알림 켜짐')).toBeInTheDocument();
  },
};

export const AllVariants: Story = {
  parameters: {
    layout: 'padded',
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-6">
        <span className="w-24 text-sm text-fg-secondary">default</span>
        <Switch />
        <Switch defaultChecked />
        <Switch disabled />
        <Switch disabled defaultChecked />
      </div>
      <div className="flex items-center gap-6">
        <span className="w-24 text-sm text-fg-secondary">sm</span>
        <Switch size="sm" />
        <Switch size="sm" defaultChecked />
      </div>
      <div className="flex items-center gap-6">
        <span className="w-24 text-sm text-fg-secondary">label</span>
        <Switch label="알림 받기" defaultChecked />
      </div>
    </div>
  ),
};
