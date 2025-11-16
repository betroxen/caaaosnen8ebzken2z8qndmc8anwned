import React, { forwardRef } from 'react';

type InputAsInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  as?: 'input';
};
type TextareaAsTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  as: 'textarea';
};
type SelectAsSelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  as: 'select';
};

export type InputProps = InputAsInputProps | TextareaAsTextareaProps | SelectAsSelectProps;

export const Input = forwardRef<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  InputProps
>((props, ref) => {
  const baseClassName = `flex w-full rounded-lg border border-[#333333] bg-foundation-light px-3 py-2 text-sm text-white placeholder:text-text-tertiary font-jetbrains-mono
  transition-all duration-200
  hover:border-[#444444]
  focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-neon-surge focus:border-neon-surge/50 focus:bg-foundation focus:shadow-[0_0_20px_rgba(0,255,192,0.1)]
  disabled:cursor-not-allowed disabled:opacity-50`;

  if (props.as === 'textarea') {
    const { as, className, ...rest } = props;
    return (
      <textarea
        className={`${baseClassName} h-auto py-2 ${className}`}
        ref={ref as React.Ref<HTMLTextAreaElement>}
        {...rest}
      />
    );
  }

  if (props.as === 'select') {
    const { as, className, children, ...rest } = props;
    return (
      <select
        className={`${baseClassName} h-10 appearance-none ${className}`}
        ref={ref as React.Ref<HTMLSelectElement>}
        {...rest}
      >
        {children}
      </select>
    );
  }

  const { as, className, type, ...rest } = props;
  return (
    <input
      type={type}
      className={`${baseClassName} h-10 ${className}`}
      ref={ref as React.Ref<HTMLInputElement>}
      {...rest}
    />
  );
});

Input.displayName = 'Input';