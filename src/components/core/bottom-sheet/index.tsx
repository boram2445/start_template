'use client';

import * as React from 'react';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const BottomSheet = Sheet;
const BottomSheetTrigger = SheetTrigger;
const BottomSheetClose = SheetClose;

/**
 * ui/sheet를 킷 규격 바텀시트로 고정한 래퍼 — 상단 radius 24,
 * 헤어라인 대신 부양 그림자 (design.md bottom-sheet)
 */
function BottomSheetContent({
  className,
  ...props
}: Omit<React.ComponentProps<typeof SheetContent>, 'side'>) {
  return (
    <SheetContent
      side="bottom"
      className={cn(
        'gap-0 rounded-t-2xl border-t-0 bg-card pb-[env(safe-area-inset-bottom)] shadow-[var(--ds-shadow-sheet)]',
        className,
      )}
      {...props}
    />
  );
}

function BottomSheetHeader({ className, ...props }: React.ComponentProps<typeof SheetHeader>) {
  return <SheetHeader className={cn('gap-1 p-5 pb-2', className)} {...props} />;
}

function BottomSheetTitle({ className, ...props }: React.ComponentProps<typeof SheetTitle>) {
  return <SheetTitle className={cn('text-lg', className)} {...props} />;
}

function BottomSheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetDescription>) {
  return <SheetDescription className={cn('text-fg-secondary', className)} {...props} />;
}

function BottomSheetBody({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="bottom-sheet-body" className={cn('px-5 py-3', className)} {...props} />;
}

/** 푸터 버튼은 가로 분할 — 각 버튼이 flex-1 + 최소 너비 120 (design.md) */
function BottomSheetFooter({ className, ...props }: React.ComponentProps<typeof SheetFooter>) {
  return (
    <SheetFooter
      className={cn('flex-row gap-2 p-5 pt-3 *:min-w-[120px] *:flex-1', className)}
      {...props}
    />
  );
}

export {
  BottomSheet,
  BottomSheetTrigger,
  BottomSheetClose,
  BottomSheetContent,
  BottomSheetHeader,
  BottomSheetTitle,
  BottomSheetDescription,
  BottomSheetBody,
  BottomSheetFooter,
};
