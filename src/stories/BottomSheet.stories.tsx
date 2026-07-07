import type * as React from 'react';

import { expect, userEvent, waitFor, within } from 'storybook/test';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import {
  BottomSheet,
  BottomSheetBody,
  BottomSheetClose,
  BottomSheetContent,
  BottomSheetDescription,
  BottomSheetFooter,
  BottomSheetHeader,
  BottomSheetTitle,
  BottomSheetTrigger,
} from '@/components/core/bottom-sheet/index';
import { Button } from '@/components/core/button/index';

// 컴파운드 컴포넌트라 BottomSheetTitle 등의 내용은 컴포넌트 props가 아니다 —
// 컨트롤 패널에서 수정해볼 수 있도록 스토리 전용 args로 노출해 render에 배선한다
type BottomSheetStoryArgs = React.ComponentProps<typeof BottomSheet> & {
  title: string;
  description: string;
};

const meta: Meta<BottomSheetStoryArgs> = {
  title: 'UI/BottomSheet',
  component: BottomSheet,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '하단에서 올라오는 **모바일 오버레이** 패턴(확인·선택 시트) — 푸터 버튼은 가로 분할(flex-1)로 배치된다. 데스크톱은 중앙 Dialog가 관례라, 새 코드는 뷰포트에 따라 자동 분기하는 `core/modal`을 쓰고 BottomSheet 직접 사용은 모바일 전용 화면일 때만 한다.\n\n상단 코너 radius 24, 딤 스크림, 부양 그림자.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: false,
      description: '제어형 열림 상태',
    },
    onOpenChange: {
      control: false,
      description: '열림 상태 변경 콜백',
    },
    title: {
      control: 'text',
      description: '헤더 타이틀 — BottomSheetTitle로 렌더 (스토리 전용 arg)',
    },
    description: {
      control: 'text',
      description: '타이틀 아래 설명 — BottomSheetDescription으로 렌더 (스토리 전용 arg)',
    },
  },
  args: {
    title: '루틴을 삭제할까요?',
    description: '삭제한 루틴은 되돌릴 수 없어요.',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ title, description }) => (
    <BottomSheet>
      <BottomSheetTrigger asChild>
        <Button variant="outlined">시트 열기</Button>
      </BottomSheetTrigger>
      <BottomSheetContent>
        <BottomSheetHeader>
          <BottomSheetTitle>{title}</BottomSheetTitle>
          <BottomSheetDescription>{description}</BottomSheetDescription>
        </BottomSheetHeader>
        <BottomSheetFooter>
          <BottomSheetClose asChild>
            <Button variant="tertiary" size="large">
              다음에
            </Button>
          </BottomSheetClose>
          <BottomSheetClose asChild>
            <Button size="large">삭제하기</Button>
          </BottomSheetClose>
        </BottomSheetFooter>
      </BottomSheetContent>
    </BottomSheet>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);

    await userEvent.click(canvas.getByRole('button', { name: '시트 열기' }));
    await waitFor(
      async () => {
        await expect(body.getByRole('dialog')).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
    await expect(body.getByText(args.title)).toBeInTheDocument();

    await userEvent.click(body.getByRole('button', { name: '다음에' }));
    // 닫힘 애니메이션(300ms)이 끝난 뒤 dialog가 제거된다
    await waitFor(
      async () => {
        await expect(body.queryByRole('dialog')).not.toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  },
};

export const WithBody: Story = {
  args: {
    title: '반복 주기',
  },
  render: ({ title }) => (
    <BottomSheet>
      <BottomSheetTrigger asChild>
        <Button variant="outlined">옵션 선택</Button>
      </BottomSheetTrigger>
      <BottomSheetContent>
        <BottomSheetHeader>
          <BottomSheetTitle>{title}</BottomSheetTitle>
        </BottomSheetHeader>
        <BottomSheetBody>
          <p className="text-base text-fg-secondary">매일 / 평일만 / 주말만 중에서 선택하세요.</p>
        </BottomSheetBody>
        <BottomSheetFooter>
          <BottomSheetClose asChild>
            <Button size="large">확인</Button>
          </BottomSheetClose>
        </BottomSheetFooter>
      </BottomSheetContent>
    </BottomSheet>
  ),
};
