import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const inputVariants = cva(
  [
    'w-full min-w-0 text-base transition-colors duration-100 ease-ds outline-none',
    'placeholder:text-fg-placeholder',
    'disabled:pointer-events-none disabled:bg-muted disabled:text-fg-disabled',
    'aria-invalid:border-destructive',
  ].join(' '),
  {
    variants: {
      variant: {
        filled: 'rounded-md border border-transparent bg-muted px-4 focus:border-brand',
        outlined: 'rounded-md border border-line bg-card px-4 focus:border-brand',
        // 하단 보더만 — 평소 회색 헤어라인, 포커스 시 브랜드색 (design.md)
        underline: 'rounded-none border-b border-line bg-transparent px-0 focus:border-brand',
      },
      // 기본은 medium(40, 데스크톱 밀집 UI) — design-web.md 버튼 어휘와 일치.
      // large(48)는 모바일·터치 화면에서 명시적으로 지정해 쓴다
      size: {
        large: 'h-12',
        medium: 'h-10',
      },
    },
    defaultVariants: {
      variant: 'filled',
      size: 'medium',
    },
  },
);

// HTML input의 size 속성(number)과 충돌하므로 Omit 후 variant로 재선언한다
type InputProps = Omit<React.ComponentProps<'input'>, 'size'> &
  VariantProps<typeof inputVariants> & {
    /** 필드 위 라벨 */
    label?: string;
    /** 필드 아래 보조 텍스트 */
    helperText?: string;
    /** 에러 메시지 — 지정 시 helperText 대신 표시되고 보더가 danger로 바뀐다 */
    error?: string;
  };

function Input({
  className,
  variant = 'filled',
  size = 'medium',
  label,
  helperText,
  error,
  id,
  ...props
}: InputProps) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const description = error ?? helperText;
  const descriptionId = description ? `${inputId}-description` : undefined;

  return (
    <div data-slot="input-field" className="flex w-full flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className={cn('text-fg-secondary', size === 'large' ? 'text-base' : 'text-sm')}
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        data-slot="input"
        data-variant={variant}
        data-size={size}
        aria-invalid={error ? true : undefined}
        aria-describedby={descriptionId}
        className={cn(inputVariants({ variant, size }), className)}
        {...props}
      />
      {description && (
        <p
          id={descriptionId}
          className={cn('text-sm', error ? 'text-destructive' : 'text-fg-tertiary')}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export { Input, inputVariants };
export type { InputProps };
