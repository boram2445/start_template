import { expect, userEvent, waitFor, within } from 'storybook/test';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Button } from '@/components/core/button/index';
import {
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from '@/components/core/modal/index';

const meta: Meta<typeof ModalContent> = {
  title: 'UI/Modal',
  component: ModalContent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '반응형 모달 — 데스크톱(≥768px)은 중앙 Dialog(radius 20 + 부양 그림자), 모바일(<768px)은 BottomSheet로 자동 전환된다. API는 하나이므로 사용처는 화면 폭을 신경 쓸 필요 없다. 데스크톱 너비는 ModalContent의 size(sm 384 / md 448 / lg 512)로 조절하며 기본은 sm이다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '데스크톱 모달 최대 너비 — sm 384 / md 448 / lg 512 (모바일 시트는 영향 없음)',
    },
    showCloseButton: {
      control: 'boolean',
      description: '우상단 닫기 버튼 표시',
    },
    children: {
      control: false,
      description: '모달 내용 (컴파운드 컴포넌트)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'sm',
  },
  render: (args) => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="outlined">모달 열기</Button>
      </ModalTrigger>
      <ModalContent {...args}>
        <ModalHeader>
          <ModalTitle>루틴을 삭제할까요?</ModalTitle>
          <ModalDescription>삭제한 루틴은 되돌릴 수 없어요.</ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="tertiary" size="large">
              다음에
            </Button>
          </ModalClose>
          <ModalClose asChild>
            <Button size="large">삭제하기</Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);

    await userEvent.click(canvas.getByRole('button', { name: '모달 열기' }));
    await waitFor(
      async () => {
        await expect(body.getByRole('dialog')).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
    await expect(body.getByText('루틴을 삭제할까요?')).toBeInTheDocument();

    await userEvent.click(body.getByRole('button', { name: '다음에' }));
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
    size: 'md',
  },
  render: (args) => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="outlined">약관 보기</Button>
      </ModalTrigger>
      <ModalContent {...args}>
        <ModalHeader>
          <ModalTitle>이용약관</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <p className="text-base text-fg-secondary">
            서비스 이용에 필요한 약관 내용이 이 영역에 표시됩니다. 데스크톱에서는 중앙 카드,
            모바일에서는 하단 시트로 열립니다.
          </p>
        </ModalBody>
        <ModalFooter>
          <ModalClose asChild>
            <Button size="large">확인했어요</Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};
