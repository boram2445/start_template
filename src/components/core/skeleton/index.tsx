import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const skeletonVariants = cva(
  [
    // gray 베이스 + 웨이브 시머 — 로딩 표준 (design.md skeleton)
    'animate-shimmer',
    'bg-[linear-gradient(90deg,var(--ds-gray-100)_25%,var(--ds-gray-200)_50%,var(--ds-gray-100)_75%)]',
    'bg-[length:200%_100%]',
  ].join(' '),
  {
    variants: {
      variant: {
        rect: 'rounded-[12px]',
        circle: 'aspect-square rounded-full',
        card: 'rounded-lg border border-line shadow-sm',
      },
    },
    defaultVariants: {
      variant: 'rect',
    },
  },
);

type SkeletonProps = React.ComponentProps<'div'> & VariantProps<typeof skeletonVariants>;

function Skeleton({ className, variant = 'rect', ...props }: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      data-variant={variant}
      aria-hidden
      className={cn(skeletonVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Skeleton, skeletonVariants };
export type { SkeletonProps };
