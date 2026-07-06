import * as React from 'react';

import { cn } from '@/lib/utils';

type SelectionBoxProps = React.ComponentProps<'button'> & {
  /** 타이틀 */
  title: string;
  /** 타이틀 아래 서브텍스트 */
  description?: string;
  /** 선택 상태 — aria-pressed로 노출된다 */
  selected?: boolean;
};

/**
 * 큰 선택 카드 — radius 14, 가로 full, 선택 시 브랜드 보더 + 옅은 tint 배경 위
 * 진한 동계열 텍스트로 전환된다 (design.md selection-box)
 */
function SelectionBox({
  className,
  title,
  description,
  selected = false,
  ...props
}: SelectionBoxProps) {
  return (
    <button
      type="button"
      data-slot="selection-box"
      aria-pressed={selected}
      className={cn(
        'press-scale-row flex min-h-[82px] w-full flex-col items-start justify-center gap-0.5 rounded-md border px-4 py-3 text-left',
        'transition-colors duration-100 ease-ds outline-none',
        'focus-visible:ring-[3px] focus-visible:ring-ring/50',
        'border-line bg-card',
        'aria-pressed:border-brand aria-pressed:bg-[var(--ds-select-item-bg)]',
        'disabled:pointer-events-none disabled:bg-muted',
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          'text-base font-semibold',
          selected ? 'text-[var(--ds-select-item-fg)]' : 'text-foreground',
          props.disabled && 'text-fg-disabled',
        )}
      >
        {title}
      </span>
      {description && (
        <span
          className={cn(
            'text-sm',
            selected ? 'text-[var(--ds-select-item-fg)]' : 'text-fg-secondary',
            props.disabled && 'text-fg-disabled',
          )}
        >
          {description}
        </span>
      )}
    </button>
  );
}

export { SelectionBox };
export type { SelectionBoxProps };
