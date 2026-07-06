import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  [
    'press-scale relative inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap',
    'transition-colors duration-100 ease-ds outline-none',
    'focus-visible:ring-[3px] focus-visible:ring-ring/50',
    // disabled는 불투명도 대신 색 교체 (design.md)
    'disabled:pointer-events-none disabled:border-transparent disabled:bg-muted disabled:text-fg-disabled',
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ].join(' '),
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-[var(--ds-bg-brand-hover)]',
        secondary: 'bg-secondary text-secondary-foreground',
        tertiary: 'bg-muted text-foreground',
        outlined: 'border border-line bg-card text-brand',
      },
      // 사이즈에 따라 radius가 함께 스케일한다 (56/40/34/32 · 14/12/10/8)
      size: {
        large: 'h-14 rounded-md px-5 text-base font-semibold',
        medium: 'h-10 rounded-[12px] px-4 text-sm font-semibold',
        small: 'h-[34px] rounded-[10px] px-3.5 text-sm',
        xsmall: 'h-8 rounded-sm px-3 text-xs',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  },
);

type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    /** 로딩 중에는 클릭이 차단되고 너비를 유지한 채 스피너만 보인다 */
    loading?: boolean;
  };

function Button({
  className,
  variant = 'primary',
  size = 'medium',
  asChild = false,
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : 'button';
  const isLoading = !asChild && loading;

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(
        buttonVariants({ variant, size }),
        isLoading && 'pointer-events-none border-transparent bg-muted text-fg-disabled',
        className,
      )}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="absolute inset-0 inline-flex items-center justify-center">
            <Spinner />
          </span>
          <span aria-hidden className="invisible inline-flex items-center gap-2">
            {children}
          </span>
        </>
      ) : (
        children
      )}
    </Comp>
  );
}

export { Button, buttonVariants };
export type { ButtonProps };
