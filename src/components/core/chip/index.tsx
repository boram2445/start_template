import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import { cn } from '@/lib/utils';

const chipVariants = cva(
  [
    'press-scale-row inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full border whitespace-nowrap',
    'transition-colors duration-100 ease-ds outline-none',
    'focus-visible:ring-[3px] focus-visible:ring-ring/50',
    // 비선택: 흰 표면 + 헤어라인 + 보조 텍스트 / 선택: 브랜드 tint + 브랜드 보더
    'border-line bg-card text-fg-secondary',
    'aria-pressed:border-brand aria-pressed:bg-brand-weak aria-pressed:text-fg-brand',
    'disabled:pointer-events-none disabled:border-line disabled:bg-muted disabled:text-fg-disabled',
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ].join(' '),
  {
    variants: {
      size: {
        medium: 'h-9 px-3 text-sm',
        small: 'h-[34px] px-3 text-sm',
        xsmall: 'h-8 px-2.5 text-xs',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  },
);

type ChipProps = React.ComponentProps<'button'> &
  VariantProps<typeof chipVariants> & {
    /** 선택 상태 — aria-pressed로 노출된다 */
    selected?: boolean;
    /** 링크 등 다른 요소로 렌더링할 때 사용 (radix Slot) */
    asChild?: boolean;
  };

function Chip({ className, size = 'medium', selected = false, asChild = false, ...props }: ChipProps) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      type={asChild ? undefined : 'button'}
      data-slot="chip"
      data-size={size}
      aria-pressed={selected}
      className={cn(chipVariants({ size }), className)}
      {...props}
    />
  );
}

export { Chip, chipVariants };
export type { ChipProps };
