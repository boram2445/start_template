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
    // disabled는 불투명도 대신 색 교체 (design.md) — loading은 disabled 속성을 같이 쓰지만
    // variant 색을 유지해야 하므로 data-loading일 때는 색 교체에서 제외한다
    'disabled:pointer-events-none disabled:not-data-loading:border-transparent disabled:not-data-loading:bg-muted disabled:not-data-loading:text-fg-disabled',
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ].join(' '),
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-[var(--ds-bg-brand-hover)]',
        secondary: 'bg-secondary text-secondary-foreground',
        tertiary: 'bg-muted text-foreground',
        outlined: 'border border-line bg-card text-primary hover:bg-brand-weak',
      },
      // 사이즈에 따라 radius가 함께 스케일한다 (56/48/40/34/32 · 14/12/12/10/8)
      size: {
        xlarge: 'h-14 rounded-md px-5 text-base font-semibold',
        large: 'h-12 rounded-[12px] px-4 text-base font-semibold',
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

// 로딩 스피너 크기를 버튼 size에 맞춰 스케일한다 (56/48/40 → 24/20/20, 34/32 → 16)
const spinnerSizeBySize: Record<NonNullable<VariantProps<typeof buttonVariants>['size']>, string> = {
  xlarge: 'size-6',
  large: 'size-5',
  medium: 'size-5',
  small: 'size-4',
  xsmall: 'size-4',
};

// loading 렌더는 스피너+숨김 children 2개 노드를 만들어 Slot(단일 자식 요구)과
// 양립할 수 없다 — 조합 자체를 타입에서 금지한다
type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> &
  (
    | {
        asChild?: false;
        /** 로딩 중에는 클릭이 차단되고 너비를 유지한 채 스피너만 보인다 */
        loading?: boolean;
      }
    | {
        asChild: true;
        loading?: never;
      }
  );

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
      data-loading={isLoading || undefined}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="absolute inset-0 inline-flex items-center justify-center">
            <Spinner className={spinnerSizeBySize[size ?? 'medium']} />
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
