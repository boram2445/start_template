'use client';

import * as React from 'react';

import { BottomSheetContent } from '@/components/core/bottom-sheet/index';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

/**
 * 반응형 모달 — 데스크톱(≥768px)은 중앙 Dialog, 모바일은 BottomSheet로 자동 전환.
 * ui/sheet와 ui/dialog가 같은 radix Dialog 프리미티브라 루트·트리거는 공유하고
 * Content만 분기한다. 사용처는 화면 폭을 신경 쓸 필요 없다.
 */
const Modal = Dialog;
const ModalTrigger = DialogTrigger;
const ModalClose = DialogClose;

const modalSizes = {
  // 확인/삭제류 기본. 데스크톱 모달 너비는 내용이 아니라 고정 단계로 제한한다
  sm: 'sm:max-w-sm', // 384
  md: 'sm:max-w-md', // 448
  lg: 'sm:max-w-lg', // 512
} as const;

function ModalContent({
  className,
  size = 'sm',
  ...props
}: React.ComponentProps<typeof DialogContent> & {
  /** 데스크톱 모달 최대 너비 — 모바일(BottomSheet)에는 영향 없음 */
  size?: keyof typeof modalSizes;
}) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <BottomSheetContent className={className} {...props} />;
  }

  return (
    <DialogContent
      className={cn(
        // 중앙 카드 — radius 20, 부양 그림자, 패딩은 Header/Body/Footer가 책임진다
        'gap-0 rounded-xl border-0 bg-card p-0 shadow-[var(--ds-shadow-sheet)]',
        modalSizes[size],
        className,
      )}
      {...props}
    />
  );
}

function ModalHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="modal-header"
      className={cn('flex flex-col gap-1 p-5 pb-2 text-left', className)}
      {...props}
    />
  );
}

function ModalTitle({ className, ...props }: React.ComponentProps<typeof DialogTitle>) {
  return <DialogTitle className={cn('text-lg font-semibold', className)} {...props} />;
}

function ModalDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogDescription>) {
  return <DialogDescription className={cn('text-sm text-fg-secondary', className)} {...props} />;
}

function ModalBody({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="modal-body" className={cn('px-5 py-3', className)} {...props} />;
}

/** 푸터 버튼은 가로 분할 — BottomSheet와 동일한 규칙 */
function ModalFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="modal-footer"
      className={cn('flex flex-row gap-2 p-5 pt-3 *:min-w-[120px] *:flex-1', className)}
      {...props}
    />
  );
}

export {
  Modal,
  ModalTrigger,
  ModalClose,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
};
