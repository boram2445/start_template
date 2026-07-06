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

const meta: Meta<typeof BottomSheet> = {
  title: 'UI/BottomSheet',
  component: BottomSheet,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '하단에서 올라오는 시트 — 상단 코너 radius 24, 딤 스크림, 부양 그림자. 푸터 버튼은 가로 분할(flex-1)로 배치된다.',
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
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <BottomSheet>
      <BottomSheetTrigger asChild>
        <Button variant="outlined">시트 열기</Button>
      </BottomSheetTrigger>
      <BottomSheetContent>
        <BottomSheetHeader>
          <BottomSheetTitle>루틴을 삭제할까요?</BottomSheetTitle>
          <BottomSheetDescription>삭제한 루틴은 되돌릴 수 없어요.</BottomSheetDescription>
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);

    await userEvent.click(canvas.getByRole('button', { name: '시트 열기' }));
    await waitFor(
      async () => {
        await expect(body.getByRole('dialog')).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
    await expect(body.getByText('루틴을 삭제할까요?')).toBeInTheDocument();

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
  render: () => (
    <BottomSheet>
      <BottomSheetTrigger asChild>
        <Button variant="outlined">옵션 선택</Button>
      </BottomSheetTrigger>
      <BottomSheetContent>
        <BottomSheetHeader>
          <BottomSheetTitle>반복 주기</BottomSheetTitle>
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
