import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const tagVariants = cva(
  [
    // 비인터랙티브 분류 라벨 — 파스텔의 주 무대 (design.md)
    'inline-flex h-7 shrink-0 items-center gap-1 rounded-sm px-2 text-xs font-medium whitespace-nowrap',
    "[&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3",
  ].join(' '),
  {
    variants: {
      accent: {
        green: 'bg-brand-weak text-[var(--ds-green-700)]',
        yellow: 'bg-accent-1 text-accent-1-fg',
        mint: 'bg-accent-2 text-accent-2-fg',
        coral: 'bg-accent-3 text-accent-3-fg',
        lavender: 'bg-accent-4 text-accent-4-fg',
        sky: 'bg-accent-5 text-accent-5-fg',
        peach: 'bg-accent-6 text-accent-6-fg',
      },
    },
    defaultVariants: {
      accent: 'green',
    },
  },
);

type TagProps = React.ComponentProps<'span'> & VariantProps<typeof tagVariants>;

function Tag({ className, accent = 'green', ...props }: TagProps) {
  return (
    <span
      data-slot="tag"
      data-accent={accent}
      className={cn(tagVariants({ accent }), className)}
      {...props}
    />
  );
}

export { Tag, tagVariants };
export type { TagProps };
