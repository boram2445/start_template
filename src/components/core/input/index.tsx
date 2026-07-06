import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const inputVariants = cva(
  [
    'h-12 w-full min-w-0 text-base transition-colors duration-100 ease-ds outline-none',
    'placeholder:text-fg-placeholder',
    'disabled:pointer-events-none disabled:bg-muted disabled:text-fg-disabled',
    'aria-invalid:border-destructive',
  ].join(' '),
  {
    variants: {
      variant: {
        filled: 'rounded-md border border-transparent bg-muted px-4 focus:border-brand',
        outlined: 'rounded-md border border-line bg-card px-4 focus:border-brand',
        // 하단 보더만 — 평소에는 투명, 포커스에만 드러난다 (design.md)
        underline:
          'rounded-none border-b border-transparent bg-transparent px-0 focus:border-brand',
      },
    },
    defaultVariants: {
      variant: 'filled',
    },
  },
);

type InputProps = React.ComponentProps<'input'> &
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
        <label htmlFor={inputId} className="text-base text-fg-secondary">
          {label}
        </label>
      )}
      <input
        id={inputId}
        data-slot="input"
        data-variant={variant}
        aria-invalid={error ? true : undefined}
        aria-describedby={descriptionId}
        className={cn(inputVariants({ variant }), className)}
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
