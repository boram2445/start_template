import type * as React from 'react';

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

// 컴파운드 컴포넌트라 ModalTitle 등의 내용은 컴포넌트 props가 아니다 —
// 컨트롤 패널에서 수정해볼 수 있도록 스토리 전용 args로 노출해 render에 배선한다
type ModalStoryArgs = React.ComponentProps<typeof ModalContent> & {
  title: string;
  description: string;
};

const meta: Meta<ModalStoryArgs> = {
  title: 'UI/Modal',
  component: ModalContent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '반응형 모달 — 데스크톱(≥768px)은 중앙 Dialog, 모바일(<768px)은 BottomSheet로 자동 전환된다. API는 하나이므로 사용처는 화면 폭을 신경 쓸 필요 없다.\n\n데스크톱은 radius 20 + 부양 그림자, 너비는 ModalContent의 size(sm 384 / md 448 / lg 512)로 조절하며 기본은 sm이다.',
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
    title: {
      control: 'text',
      description: '헤더 타이틀 — ModalTitle로 렌더 (스토리 전용 arg)',
    },
    description: {
      control: 'text',
      description: '타이틀 아래 설명 — ModalDescription으로 렌더 (스토리 전용 arg)',
    },
  },
  args: {
    size: 'sm',
    title: '루틴을 삭제할까요?',
    description: '삭제한 루틴은 되돌릴 수 없어요.',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ title, description, ...args }) => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="outlined">모달 열기</Button>
      </ModalTrigger>
      <ModalContent {...args}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <ModalDescription>{description}</ModalDescription>
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
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);

    await userEvent.click(canvas.getByRole('button', { name: '모달 열기' }));
    await waitFor(
      async () => {
        await expect(body.getByRole('dialog')).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
    await expect(body.getByText(args.title)).toBeInTheDocument();

    await userEvent.click(body.getByRole('button', { name: '다음에' }));
    await waitFor(
      async () => {
        await expect(body.queryByRole('dialog')).not.toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    showCloseButton: false,
    title: '기록을 모두 삭제할까요?',
    description: '30일이 지난 기록까지 모두 삭제돼요.',
  },
  // Default와 같은 확인형 레이아웃 — lg 너비 + 닫기 버튼 숨김 조합 시연
  render: Default.render,
};

export const WithBody: Story = {
  args: {
    size: 'md',
    title: '이용약관',
  },
  render: ({ title, description: _description, ...args }) => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="outlined">약관 보기</Button>
      </ModalTrigger>
      <ModalContent {...args}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
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
