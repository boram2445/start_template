import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const cardAccentVariants = cva(
  // 분류용 파스텔 카드 — 비인터랙티브, 진입은 별도 버튼/전체 영역 탭으로 (design.md)
  'flex flex-col gap-1 rounded-tile p-4 text-foreground',
  {
    variants: {
      accent: {
        yellow: 'bg-accent-1',
        mint: 'bg-accent-2',
        coral: 'bg-accent-3',
        lavender: 'bg-accent-4',
        sky: 'bg-accent-5',
        peach: 'bg-accent-6',
      },
    },
    defaultVariants: {
      accent: 'mint',
    },
  },
);

type CardAccentProps = React.ComponentProps<'div'> & VariantProps<typeof cardAccentVariants>;

function CardAccent({ className, accent = 'mint', ...props }: CardAccentProps) {
  return (
    <div
      data-slot="card-accent"
      data-accent={accent}
      className={cn(cardAccentVariants({ accent }), className)}
      {...props}
    />
  );
}

export { CardAccent, cardAccentVariants };
export type { CardAccentProps };
