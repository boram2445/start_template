import React, { useEffect } from 'react';

import type { Decorator, Preview } from '@storybook/nextjs-vite';

import '../src/app/globals.css';

/**
 * next-themes(attribute="class")와 동일하게 html에 .dark를 토글해
 * design-tokens.css의 .dark 시맨틱 리매핑을 그대로 재사용한다.
 */
function ThemeWrapper({ theme, children }: { theme: string; children: React.ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;
  }, [theme]);

  return (
    <div className="bg-[var(--ds-bg-elevated)] p-6 font-sans text-foreground">{children}</div>
  );
}

const withTheme: Decorator = (Story, context) => (
  <ThemeWrapper theme={context.globals.theme ?? 'light'}>
    <Story />
  </ThemeWrapper>
);

const preview: Preview = {
  globalTypes: {
    theme: {
      description: '라이트/다크 테마 전환',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  decorators: [withTheme],
  parameters: {
    options: {
      // 사이드바 정렬: Foundation(토큰 문서) → UI(컴포넌트)
      storySort: {
        order: ['Foundation', 'UI'],
      },
    },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    backgrounds: { disable: true },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
};

export default preview;
