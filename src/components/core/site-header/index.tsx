import * as React from 'react';

import { Slot } from 'radix-ui';

import { cn } from '@/lib/utils';

type SiteHeaderProps = React.ComponentProps<'header'> & {
  /** 왼쪽 로고/브랜드 슬롯 */
  logo?: React.ReactNode;
  /** 가운데 내비게이션 슬롯 — 모바일에서는 숨겨진다 */
  nav?: React.ReactNode;
  /** 오른쪽 액션 슬롯 (버튼·아이콘 등) */
  actions?: React.ReactNode;
};

/**
 * 웹 GNB 헤더 — sticky, 흰 배경 + 1px 하단 헤어라인.
 * 데스크톱 h-16 / 모바일 h-[52px]. 링크 렌더링은 슬롯에 위임하고
 * 레이아웃만 책임진다 (앱 화면 헤더는 core/top-app-bar 사용)
 */
function SiteHeader({ className, logo, nav, actions, children, ...props }: SiteHeaderProps) {
  return (
    <header
      data-slot="site-header"
      className={cn(
        'sticky top-0 z-40 flex h-[52px] w-full items-center gap-4 border-b border-line bg-card px-5 md:h-16 md:gap-6 md:px-8',
        className,
      )}
      {...props}
    >
      {logo && <div className="flex shrink-0 items-center">{logo}</div>}
      {nav && (
        <nav className="hidden min-w-0 flex-1 items-center gap-1 md:flex">{nav}</nav>
      )}
      {!nav && <div className="flex-1" />}
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
      {children}
    </header>
  );
}

type SiteHeaderLinkProps = React.ComponentProps<'a'> & {
  /** 현재 페이지 여부 — 진한 텍스트 + aria-current로 표시된다 */
  active?: boolean;
  /** next/link 등으로 렌더링할 때 사용 (radix Slot) */
  asChild?: boolean;
};

function SiteHeaderLink({ className, active = false, asChild = false, ...props }: SiteHeaderLinkProps) {
  const Comp = asChild ? Slot.Root : 'a';

  return (
    <Comp
      data-slot="site-header-link"
      aria-current={active ? 'page' : undefined}
      className={cn(
        'press-scale-row inline-flex h-9 items-center rounded-sm px-3 text-base font-medium',
        'transition-colors duration-100 ease-ds outline-none',
        'focus-visible:ring-[3px] focus-visible:ring-ring/50',
        active ? 'font-semibold text-foreground' : 'text-fg-secondary hover:text-foreground',
        className,
      )}
      {...props}
    />
  );
}

export { SiteHeader, SiteHeaderLink };
export type { SiteHeaderProps, SiteHeaderLinkProps };
