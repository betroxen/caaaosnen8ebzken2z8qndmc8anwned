import React from 'react';
import { Icons } from './icons';

// A simplified cva-like function
const cva = (base: string, variants: Record<string, Record<string, string>>) => {
  return (props: { variant?: string, size?: string }) => {
    let variantClasses = '';
    if (props.variant && variants.variant[props.variant]) {
      variantClasses += variants.variant[props.variant] + ' ';
    }
    if (props.size && variants.size[props.size]) {
      variantClasses += variants.size[props.size] + ' ';
    }
    return [base, variantClasses].join(' ').trim();
  };
};

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-foundation focus:ring-neon-surge disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] font-orbitron',
  {
    variant: {
      primary: 'bg-neon-surge text-black hover:bg-opacity-90 shadow-neon-card hover:shadow-neon-card-hover hover:-translate-y-0.5',
      secondary: 'bg-foundation-light text-text-secondary border border-foundation-lighter hover:border-neon-surge hover:text-white hover:shadow-[0_0_15px_rgba(0,255,192,0.3)] active:bg-foundation active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]',
      ghost: 'bg-transparent hover:bg-foundation-light text-text-secondary hover:text-white',
      destructive: 'bg-warning-high text-white hover:bg-opacity-90',
    },
    size: {
      default: 'h-10 py-2 px-4',
      sm: 'h-9 px-3 rounded-md',
      lg: 'h-12 px-8 rounded-lg text-base',
    },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  size?: 'default' | 'sm' | 'lg';
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'default', children, loading = false, ...props }, ref) => {
    return (
      <button
        className={buttonVariants({ variant, size }) + ` ${className}`}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Icons.Loader2 className="h-5 w-5 animate-spin" />
            <span>{children}</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };