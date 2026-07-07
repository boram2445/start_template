import * as React from 'react';

import { cn } from '@/lib/utils';

// variant별로 유효한 조합을 타입으로 강제한다 — dot에 count를 주거나
// count pill에서 숫자를 빠뜨리는 오용을 컴파일 타임에 막는다 (design.md badge).
// 배지는 시각 정보뿐이므로 스크린리더용 aria-label을 함께 지정한다
// (예: aria-label="읽지 않은 알림 3개" — span 상속 props로 전달)
type BadgeProps = React.ComponentProps<'span'> & {
  /** 지정 시 대상 요소 우상단에 배지를 오프셋해 붙인다 */
  children?: React.ReactNode;
} & (
    | {
        /** dot — 6×6 알림 점 */
        variant: 'dot';
        count?: never;
        max?: never;
      }
    | {
        /** count — 숫자 pill (기본) */
        variant?: 'count';
        /** 표시할 숫자 */
        count: number;
        /** 이 값을 넘으면 "99+" 형태로 줄인다 */
        max?: number;
      }
  );

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
          : 'h-5 min-w-5 rounded-[17px] px-1.5 text-xs font-normal text-white',
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
          variant === 'dot' ? '-top-1.5 right-1' : '-top-2 -right-2',
        )}
      >
        {badge}
      </span>
    </span>
  );
}

export { Badge };
export type { BadgeProps };
