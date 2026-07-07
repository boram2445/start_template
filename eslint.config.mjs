// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/purity': 'warn',
      'react/jsx-key': 'warn',

      'no-console': 'warn',
    },
  },
  // core 대체물이 있는 ui/ 직접 import 차단 — ui/ 내부 상호 참조와
  // core/ 래퍼만 예외 (docs/design-web.md "core/ ↔ ui/ 조합 규칙")
  {
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/components/ui/**', 'src/components/core/**'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '@/components/ui/button',
                '@/components/ui/input',
                '@/components/ui/textarea',
                '@/components/ui/skeleton',
                '@/components/ui/checkbox',
                '@/components/ui/radio-group',
                '@/components/ui/switch',
                '@/components/ui/tabs',
                '@/components/ui/dialog',
                '@/components/ui/sheet',
                '@/components/ui/sonner',
              ],
              message:
                'core 대체물이 있는 컴포넌트입니다 — @/components/core/<name>/index 를 사용하세요.',
            },
          ],
        },
      ],
    },
  },
  ...storybook.configs["flat/recommended"]
]);

export default eslintConfig;
