import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import { cn } from '@/lib/utils';

const textButtonVariants = cva(
  [
    'press-scale-row inline-flex shrink-0 items-center gap-1 rounded-[4px] px-1 py-0.5 whitespace-nowrap',
    'text-sm font-medium transition-colors duration-100 ease-ds outline-none',
    'focus-visible:ring-[3px] focus-visible:ring-ring/50',
    'disabled:pointer-events-none disabled:text-fg-disabled',
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ].join(' '),
  {
    variants: {
      variant: {
        primary: 'text-primary',
        secondary: 'text-foreground',
        tertiary: 'text-fg-secondary',
      },
      underline: {
        true: 'underline underline-offset-2',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      underline: false,
    },
  },
);

type TextButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof textButtonVariants> & {
    asChild?: boolean;
  };

function TextButton({
  className,
  variant = 'primary',
  underline = false,
  asChild = false,
  ...props
}: TextButtonProps) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot="text-button"
      data-variant={variant}
      className={cn(textButtonVariants({ variant, underline }), className)}
      {...props}
    />
  );
}

export { TextButton, textButtonVariants };
export type { TextButtonProps };
