import * as React from 'react';

import { ChevronLeftIcon } from 'lucide-react';

import { IconButton } from '@/components/core/icon-button/index';
import { cn } from '@/lib/utils';

type TopAppBarProps = React.ComponentProps<'header'> & {
  /** 중앙 타이틀 */
  title?: React.ReactNode;
  /** 지정 시 왼쪽에 뒤로가기 버튼이 붙는다 */
  onBack?: () => void;
  /** 오른쪽 액션 슬롯 — IconButton 최대 3개 권장 (design.md) */
  actions?: React.ReactNode;
};

/**
 * 최소 52 높이의 상단 앱 바 — 흰 배경, BackButton + Title + 액션 슬롯 구조
 */
function TopAppBar({ className, title, onBack, actions, children, ...props }: TopAppBarProps) {
  return (
    <header
      data-slot="top-app-bar"
      className={cn('flex min-h-[52px] w-full items-center gap-1 bg-card px-2', className)}
      {...props}
    >
      {onBack && (
        <IconButton aria-label="뒤로가기" onClick={onBack}>
          <ChevronLeftIcon />
        </IconButton>
      )}
      <h1 className="min-w-0 flex-1 truncate px-1 text-lg font-semibold text-foreground">
        {title ?? children}
      </h1>
      {actions && <div className="flex shrink-0 items-center gap-0.5">{actions}</div>}
    </header>
  );
}

export { TopAppBar };
export type { TopAppBarProps };
