'use client';

import * as React from 'react';

import { toast, type ToasterProps } from 'sonner';

import { Toaster } from '@/components/ui/sonner';

/**
 * 킷 규격 스낵바 — 하단 중앙, 어두운 둥근 컨테이너 + 흰 텍스트, 자동 소멸.
 * 앱에 적용할 때는 providers.tsx의 기본 Toaster를 이 컴포넌트로 교체한다.
 * 트리거는 sonner의 toast를 그대로 쓴다: snackbar('저장했어요'), snackbar.success(...)
 */
function Snackbar(props: ToasterProps) {
  return (
    <Toaster
      position="bottom-center"
      style={
        {
          '--normal-bg': 'var(--ds-bg-neutral-strong)',
          '--normal-text': 'var(--ds-fg-on-neutral)',
          '--normal-border': 'transparent',
          '--border-radius': 'var(--ds-radius-md)',
        } as React.CSSProperties
      }
      {...props}
    />
  );
}

const snackbar = toast;

export { Snackbar, snackbar };
