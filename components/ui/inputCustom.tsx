import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isInvalid?: boolean;
  errorMessage?: React.ReactNode;
  suffix?: React.ReactNode;
  isDirty?: boolean;
  errorMessageClass?: string;
}

const InputCustom = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      suffix,
      type,
      isInvalid,
      isDirty,
      errorMessage,
      errorMessageClass,
      ...props
    },
    ref
  ) => {
    return (
      <>
        <div className='flex gap-2 items-center relative'>
          <input
            type={type}
            className={cn(
              'flex h-10  rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              className
            )}
            ref={ref}
            {...props}
          />
          {suffix}
        </div>
        {isInvalid && errorMessage && (
          <span
            className={cn(
              'error-message text-red-700 text-xs  bg-fuchsia-100 px-4 rounded-sm text-shadow',
              errorMessageClass
            )}>
            {errorMessage}
          </span>
        )}
      </>
    );
  }
);
InputCustom.displayName = 'InputCustom';

export { InputCustom };
