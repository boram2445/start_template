'use client';

import * as React from 'react';

import { Checkbox as UICheckbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

type CheckboxProps = React.ComponentProps<typeof UICheckbox> & {
  /** 컨트롤 오른쪽 라벨 — 지정 시 높이 48 행 레이아웃이 되고 라벨 클릭으로도 토글된다 */
  label?: string;
};

/**
 * ui/checkbox를 킷 규격으로 보정한 래퍼 — 20×20 원형 컨트롤, 체크 시 brand,
 * disabled는 불투명도 대신 gray-300 강등 (design.md checkbox/radio)
 */
function Checkbox({ className, label, id, ...props }: CheckboxProps) {
  const generatedId = React.useId();
  const checkboxId = id ?? generatedId;

  const control = (
    <UICheckbox
      id={checkboxId}
      className={cn(
        'size-5 rounded-full border-2 border-[var(--ds-select-unchecked-border)] shadow-none',
        'bg-card transition-colors duration-100 ease-ds dark:bg-card',
        'data-[state=checked]:border-[var(--ds-select-checked-bg)] data-[state=checked]:bg-[var(--ds-select-checked-bg)]',
        'disabled:cursor-default disabled:opacity-100',
        'disabled:data-[state=checked]:border-[var(--ds-gray-300)] disabled:data-[state=checked]:bg-[var(--ds-gray-300)]',
        'disabled:data-[state=unchecked]:border-[var(--ds-gray-300)]',
        className,
      )}
      {...props}
    />
  );

  if (!label) {
    return control;
  }

  return (
    <div
      data-slot="checkbox-row"
      className="press-scale-row flex h-12 w-full items-center gap-2 rounded-sm px-4 py-3"
    >
      {control}
      <label
        htmlFor={checkboxId}
        className={cn('flex-1 text-base', props.disabled ? 'text-fg-disabled' : 'text-foreground')}
      >
        {label}
      </label>
    </div>
  );
}

export { Checkbox };
export type { CheckboxProps };
