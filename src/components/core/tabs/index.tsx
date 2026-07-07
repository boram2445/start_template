'use client';

import * as React from 'react';

import {
  Tabs as UITabs,
  TabsContent as UITabsContent,
  TabsList as UITabsList,
  TabsTrigger as UITabsTrigger,
} from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

function Tabs({ className, ...props }: React.ComponentProps<typeof UITabs>) {
  return <UITabs className={cn('gap-0', className)} {...props} />;
}

/**
 * 킷 규격 탭 바 — sticky + 1px 회색 하단 보더 + px 16,
 * active 탭 아래 2px 브랜드 인디케이터 (design.md tab)
 */
function TabsList({ className, ...props }: React.ComponentProps<typeof UITabsList>) {
  return (
    <UITabsList
      variant="line"
      className={cn(
        'sticky top-0 z-10 w-full justify-start gap-0 border-b border-line px-4 py-0',
        // ui의 h-9(36px)는 변형 체인 특이도가 높아 일반 h-auto로 못 이긴다 — 같은 체인으로 병합
        'group-data-[orientation=horizontal]/tabs:h-auto',
        // 탭이 많으면 가로 스크롤(트리거 flex-none) — 세로 스크롤 컨텍스트와 썸은 차단
        'overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof UITabsTrigger>) {
  return (
    <UITabsTrigger
      className={cn(
        'h-[38px] flex-none rounded-none px-3 text-base font-semibold',
        // 인디케이터는 CTA 톤(--ds-bg-brand, green-600) — 얇은 선이라 진한 톤이 더 또렷하게 보인다.
        // active 텍스트 색(foreground)은 design.md 규격대로 유지
        'after:bg-primary',
        'text-fg-secondary hover:text-foreground data-[state=active]:text-foreground',
        // press-scale-row는 ::after(inset:0) 오버레이가 ui 인디케이터 ::after와 충돌한다 —
        // ::after는 인디케이터 전용으로 두고, press/hover 오버레이는 ::before로 재구현
        'transition-[color,transform] duration-100 ease-ds active:scale-[var(--ds-scale-press-row)]',
        'before:pointer-events-none before:absolute before:inset-0 before:transition-colors before:duration-100',
        'hover:before:bg-[var(--ds-overlay-hover)] active:before:bg-[var(--ds-overlay-press)]',
        // 인디케이터를 리스트 하단 보더와 완전히 겹치게 — bottom-0은 보더 바로 위에서
        // 인접만 하고 겹치지 않는다(트리거 박스 기준). 1px 더 내려 보더를 덮는다
        'group-data-[orientation=horizontal]/tabs:after:-bottom-px',
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof UITabsContent>) {
  return <UITabsContent className={cn('pt-4', className)} {...props} />;
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
