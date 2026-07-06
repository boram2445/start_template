import { expect, userEvent, within } from 'storybook/test';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/core/tabs/index';

const meta: Meta<typeof Tabs> = {
  title: 'UI/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '킷 규격 탭 — 1px 하단 보더 + 회색 워시 바 + px 16. active 탭은 진한 텍스트 + 2px 하단 인디케이터, inactive는 보조 텍스트 색이다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      control: false,
      description: '초기 선택 탭 값',
    },
    onValueChange: {
      control: false,
      description: '탭 변경 콜백',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="routine" className="w-96">
      <TabsList>
        <TabsTrigger value="routine">루틴</TabsTrigger>
        <TabsTrigger value="report">리포트</TabsTrigger>
        <TabsTrigger value="settings">설정</TabsTrigger>
      </TabsList>
      <TabsContent value="routine">오늘의 루틴 목록이 표시됩니다.</TabsContent>
      <TabsContent value="report">주간 리포트가 표시됩니다.</TabsContent>
      <TabsContent value="settings">설정 항목이 표시됩니다.</TabsContent>
    </Tabs>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText('오늘의 루틴 목록이 표시됩니다.')).toBeInTheDocument();

    await userEvent.click(canvas.getByRole('tab', { name: '리포트' }));
    await expect(canvas.getByText('주간 리포트가 표시됩니다.')).toBeInTheDocument();
  },
};

export const TwoTabs: Story = {
  render: () => (
    <Tabs defaultValue="all" className="w-96">
      <TabsList>
        <TabsTrigger value="all">전체</TabsTrigger>
        <TabsTrigger value="done">완료</TabsTrigger>
      </TabsList>
      <TabsContent value="all">전체 목록</TabsContent>
      <TabsContent value="done">완료 목록</TabsContent>
    </Tabs>
  ),
};
