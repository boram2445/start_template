import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import { cn } from '@/lib/utils';

const iconButtonVariants = cva(
  [
    // 완전 원형 — press 리플이 radius-full에 클리핑된다 (design.md)
    'press-scale relative inline-flex shrink-0 items-center justify-center rounded-full',
    'transition-colors duration-100 ease-ds outline-none',
    'focus-visible:ring-[3px] focus-visible:ring-ring/50',
    'disabled:pointer-events-none disabled:bg-muted disabled:text-fg-disabled',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  ].join(' '),
  {
    variants: {
      variant: {
        ghost: 'bg-transparent text-foreground',
        filled: 'bg-muted text-foreground',
      },
      size: {
        xsmall: "size-7 [&_svg:not([class*='size-'])]:size-4",
        small: "size-[34px] [&_svg:not([class*='size-'])]:size-4",
        medium: "size-[38px] [&_svg:not([class*='size-'])]:size-5",
        large: "size-[42px] [&_svg:not([class*='size-'])]:size-5",
        xlarge: "size-[46px] [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: {
      variant: 'ghost',
      size: 'medium',
    },
  },
);

type IconButtonProps = Omit<React.ComponentProps<'button'>, 'aria-label'> &
  VariantProps<typeof iconButtonVariants> & {
    asChild?: boolean;
    /** 아이콘 전용 버튼이므로 스크린리더용 라벨이 필수다 */
    'aria-label': string;
  };

function IconButton({
  className,
  variant = 'ghost',
  size = 'medium',
  asChild = false,
  ...props
}: IconButtonProps) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot="icon-button"
      data-variant={variant}
      data-size={size}
      className={cn(iconButtonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { IconButton, iconButtonVariants };
export type { IconButtonProps };
