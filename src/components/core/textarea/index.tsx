'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

type TextareaProps = React.ComponentProps<'textarea'> & {
  /** 필드 위 라벨 */
  label?: string;
  /** 필드 아래 보조 텍스트 */
  helperText?: string;
  /** 에러 메시지 — 지정 시 helperText 대신 표시되고 보더가 danger로 바뀐다 */
  error?: string;
  /** 글자수 카운터 표시 — maxLength와 함께 쓰면 "12/200" 형태 */
  showCount?: boolean;
};

function Textarea({
  className,
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

  const [count, setCount] = React.useState(
    () => String(props.value ?? defaultValue ?? '').length,
  );

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCount(event.target.value.length);
    onChange?.(event);
  };

  return (
    <div data-slot="textarea-field" className="flex w-full flex-col gap-1.5">
      {label && (
        <label htmlFor={textareaId} className="text-base text-fg-secondary">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        data-slot="textarea"
        maxLength={maxLength}
        aria-invalid={error ? true : undefined}
        aria-describedby={descriptionId}
        onChange={showCount ? handleChange : onChange}
        defaultValue={defaultValue}
        className={cn(
          // 최소 64 + 내용에 따라 auto-grow (design.md)
          'field-sizing-content min-h-16 w-full min-w-0 resize-none rounded-md border border-line bg-muted p-3 text-base',
          'transition-colors duration-100 ease-ds outline-none',
          'placeholder:text-fg-placeholder focus:border-brand',
          'disabled:pointer-events-none disabled:bg-muted disabled:text-fg-disabled',
          'aria-invalid:border-destructive',
          className,
        )}
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

export { Textarea };
export type { TextareaProps };
