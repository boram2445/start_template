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
 * 킷 규격 탭 바 — 1px 하단 보더 + 회색 워시 배경 + px 16,
 * active 탭 아래 2px 인디케이터 (design.md tab)
 */
function TabsList({ className, ...props }: React.ComponentProps<typeof UITabsList>) {
  return (
    <UITabsList
      variant="line"
      className={cn('h-auto w-full justify-start gap-0 border-b border-line bg-muted px-4', className)}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof UITabsTrigger>) {
  return (
    <UITabsTrigger
      className={cn(
        'press-scale-row h-[38px] flex-none rounded-none px-3 text-base font-semibold',
        'text-fg-secondary hover:text-foreground data-[state=active]:text-foreground',
        // 인디케이터를 리스트 하단 보더 위에 정렬
        'group-data-[orientation=horizontal]/tabs:after:bottom-0',
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
