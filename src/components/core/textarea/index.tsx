'use client';

import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const textareaVariants = cva(
  [
    'field-sizing-content min-h-16 w-full min-w-0 resize-none py-3 text-base md:resize-y',
    'transition-colors duration-100 ease-ds outline-none',
    'placeholder:text-fg-placeholder',
    'disabled:pointer-events-none disabled:bg-muted disabled:text-fg-disabled',
    'aria-invalid:border-destructive',
  ].join(' '),
  {
    variants: {
      // Input과 동일한 3-variant — filled(기본, 회색 배경)/outlined(흰 배경 + 헤어라인)/underline(하단 보더만)
      variant: {
        filled: 'rounded-md border border-transparent bg-muted px-4 focus:border-brand',
        outlined: 'rounded-md border border-line bg-card px-4 focus:border-brand',
        underline: 'rounded-none border-b border-line bg-transparent px-0 focus:border-brand',
      },
    },
    defaultVariants: {
      variant: 'filled',
    },
  },
);

type TextareaProps = React.ComponentProps<'textarea'> &
  VariantProps<typeof textareaVariants> & {
    /** 필드 위 라벨 */
    label?: string;
    /** 필드 아래 보조 텍스트 */
    helperText?: string;
    /** 에러 메시지 — 지정 시 helperText 대신 표시되고 보더가 danger로 바뀐다 */
    error?: string;
    /** 글자수 카운터 표시 — maxLength와 함께 쓰면 "12/200" 형태 */
    showCount?: boolean;
    // textarea는 auto-grow라 고정 높이 개념이 없어 필드에는 영향이 없다 —
    // Input과 라벨 크기만 맞추기 위한 값이라 cva variant가 아니라 별도 prop으로 둔다
    /** 라벨 크기 — medium(14, 기본)/large(16, 모바일). 필드 자체는 영향 없음 */
    size?: 'large' | 'medium';
  };

function Textarea({
  className,
  variant = 'filled',
  size = 'medium',
  label,
  helperText,
  error,
  showCount = false,
  maxLength,
  id,
  defaultValue,
  onChange,
  ...props
}: TextareaProps) {
  const generatedId = React.useId();
  const textareaId = id ?? generatedId;
  const description = error ?? helperText;
  const descriptionId = description ? `${textareaId}-description` : undefined;

  // uncontrolled일 때만 내부 state로 추적 — controlled는 value에서 직접 파생해
  // 외부 리셋(폼 초기화 등)에도 카운터가 어긋나지 않는다
  const [internalCount, setInternalCount] = React.useState(
    () => String(defaultValue ?? '').length,
  );
  const count = props.value != null ? String(props.value).length : internalCount;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInternalCount(event.target.value.length);
    onChange?.(event);
  };

  return (
    <div data-slot="textarea-field" className="flex w-full flex-col gap-1.5">
      {label && (
        <label
          htmlFor={textareaId}
          className={cn('text-fg-secondary', size === 'large' ? 'text-base' : 'text-sm')}
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        data-slot="textarea"
        data-variant={variant}
        data-size={size}
        maxLength={maxLength}
        aria-invalid={error ? true : undefined}
        aria-describedby={descriptionId}
        onChange={showCount ? handleChange : onChange}
        defaultValue={defaultValue}
        className={cn(textareaVariants({ variant }), className)}
        {...props}
      />
      {(description || showCount) && (
        <div className="flex items-baseline gap-3">
          {description && (
            <p
              id={descriptionId}
              className={cn('text-sm', error ? 'text-destructive' : 'text-fg-tertiary')}
            >
              {description}
            </p>
          )}
          {showCount && (
            <span className="ml-auto shrink-0 text-sm text-fg-tertiary">
              {count}
              {maxLength != null && `/${maxLength}`}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export { Textarea, textareaVariants };
export type { TextareaProps };
