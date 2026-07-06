import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Button } from '@/components/core/button/index';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/core/card/index';
import { Tag } from '@/components/core/tag/index';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '킷 규격 카드 — radius 16, 패딩 16. 그림자 대신 1px 헤어라인 + 배경 워시로 표면을 분리한다. CardHeader/CardTitle/CardDescription/CardContent/CardFooter 컴파운드 구조.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false,
      description: '카드 내용 (컴파운드 컴포넌트)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>오늘의 루틴</CardTitle>
        <CardDescription>3개 중 2개 완료</CardDescription>
      </CardHeader>
      <CardContent>아침 러닝 30분, 물 2L 마시기를 완료했어요.</CardContent>
      <CardFooter>
        <Button size="small">이어서 하기</Button>
        <Button variant="tertiary" size="small">
          다음에
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const WithTags: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>주간 리포트</CardTitle>
        <CardDescription>6월 4주차</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-1.5">
          <Tag accent="mint">운동</Tag>
          <Tag accent="coral">식단</Tag>
          <Tag accent="lavender">수면</Tag>
        </div>
      </CardContent>
    </Card>
  ),
};

export const ContentOnly: Story = {
  render: () => (
    <Card className="w-80">
      <CardContent>내용만 있는 가장 단순한 카드.</CardContent>
    </Card>
  ),
};
