'use client';

import * as React from 'react';

import { RadioGroup as UIRadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

type RadioGroupProps = React.ComponentProps<typeof UIRadioGroup> & {
  /** 그룹 컨테이너 스타일 — radius-sm + 회색 배경 (design.md) */
  boxed?: boolean;
};

function RadioGroup({ className, boxed = false, ...props }: RadioGroupProps) {
  return (
    <UIRadioGroup
      className={cn('grid gap-0', boxed && 'rounded-sm bg-muted', className)}
      {...props}
    />
  );
}

type RadioProps = React.ComponentProps<typeof RadioGroupItem> & {
  /** 컨트롤 오른쪽 라벨 — 지정 시 높이 48 행 레이아웃이 되고 라벨 클릭으로도 선택된다 */
  label?: React.ReactNode;
};

/**
 * ui/radio-group을 킷 규격으로 보정한 행 아이템 — 20×20 원형 컨트롤,
 * 선택 시 brand dot, disabled는 gray-300 강등 (design.md checkbox/radio)
 */
function Radio({ className, label, id, ...props }: RadioProps) {
  const generatedId = React.useId();
  const radioId = id ?? generatedId;

  const control = (
    <RadioGroupItem
      id={radioId}
      className={cn(
        'size-5 border-2 border-[var(--ds-select-unchecked-border)] shadow-none',
        'bg-card transition-colors duration-100 ease-ds dark:bg-card',
        'data-[state=checked]:border-primary',
        'disabled:cursor-default disabled:opacity-100 disabled:border-[var(--ds-gray-300)]',
        'disabled:[&_svg]:fill-[var(--ds-gray-300)] disabled:[&_svg]:text-[var(--ds-gray-300)]',
        className,
      )}
      {...props}
    />
  );

  if (!label) {
    // 시각적으로는 20px 박스를 유지하되, 보이지 않는 패딩으로 클릭 영역만 44px 확보 (checkbox와 동일)
    return (
      <span data-slot="radio-hitbox" className="inline-flex items-center justify-center p-3">
        {control}
      </span>
    );
  }

  return (
    <div
      data-slot="radio-row"
      className="press-scale-row flex h-12 w-full items-center gap-2 rounded-sm px-4 py-3"
    >
      {control}
      <label
        htmlFor={radioId}
        className={cn('flex-1 text-base', props.disabled ? 'text-fg-disabled' : 'text-foreground')}
      >
        {label}
      </label>
    </div>
  );
}

export { RadioGroup, Radio };
export type { RadioGroupProps, RadioProps };
