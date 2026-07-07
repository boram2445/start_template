'use client';

import * as React from 'react';

import { Switch as UISwitch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

type SwitchProps = React.ComponentProps<typeof UISwitch> & {
  /** 스위치 오른쪽에 붙는 라벨 — 지정 시 라벨 클릭으로도 토글된다 */
  label?: React.ReactNode;
};

/**
 * ui/switch를 킷 트랙 색으로 보정한 래퍼.
 * on 트랙 = 브랜드 그린(green-500), off 트랙 = gray-300, knob = 흰색.
 * disabled는 불투명도 대신 색 교체 — 트랙을 gray-300으로 강등 (design.md)
 */
function Switch({ className, label, id, ...props }: SwitchProps) {
  const generatedId = React.useId();
  const switchId = id ?? generatedId;

  const control = (
    <UISwitch
      id={switchId}
      className={cn(
        'data-[state=checked]:bg-[var(--ds-switch-on-track)]',
        'data-[state=unchecked]:bg-[var(--ds-switch-off-track)]',
        'shadow-none transition-colors duration-150 ease-ds',
        'disabled:opacity-100',
        'disabled:data-[state=checked]:bg-[var(--ds-gray-300)]',
        'disabled:data-[state=unchecked]:bg-[var(--ds-gray-300)]',
        className,
      )}
      {...props}
    />
  );

  if (!label) {
    return control;
  }

  return (
    <div data-slot="switch-field" className="flex items-center gap-2">
      {control}
      <label htmlFor={switchId} className="text-base text-foreground">
        {label}
      </label>
    </div>
  );
}

export { Switch };
export type { SwitchProps };
