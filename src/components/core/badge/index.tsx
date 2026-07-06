import * as React from 'react';

import { cn } from '@/lib/utils';

type BadgeProps = React.ComponentProps<'span'> & {
  /** dot — 6×6 알림 점 / count — 숫자 pill (design.md badge) */
  variant?: 'count' | 'dot';
  /** 표시할 숫자 (count variant) */
  count?: number;
  /** 이 값을 넘으면 "99+" 형태로 줄인다 */
  max?: number;
  /** 지정 시 대상 요소 우상단에 배지를 오프셋해 붙인다 */
  children?: React.ReactNode;
};

function Badge({ className, variant = 'count', count, max = 99, children, ...props }: BadgeProps) {
  const display = count != null && count > max ? `${max}+` : count;

  const badge = (
    <span
      data-slot="badge"
      data-variant={variant}
      className={cn(
        'inline-flex shrink-0 items-center justify-center bg-destructive',
        variant === 'dot'
          ? 'size-1.5 rounded-full'
          : 'h-5 min-w-5 rounded-[17px] px-1.5 text-xs font-medium text-white',
        className,
      )}
      {...props}
    >
      {variant === 'count' && display}
    </span>
  );

  if (!children) {
    return badge;
  }

  return (
    <span data-slot="badge-anchor" className="relative inline-flex">
      {children}
      <span
        className={cn(
          'absolute',
          variant === 'dot' ? '-top-0.5 -right-0.5' : '-top-2 -right-2',
        )}
      >
        {badge}
      </span>
    </span>
  );
}

export { Badge };
export type { BadgeProps };
