import * as React from 'react';

import { cn } from '@/lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  isInvalid?: boolean;
  errorMessage?: React.ReactNode;
  isDirty?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, isInvalid, isDirty, errorMessage, ...props }, ref) => {
    return (
      <>
        <textarea
          className={cn(
            'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          {...props}
        />

        {isInvalid && errorMessage && isDirty && (
          <span className='error-message text-red-700 text-xs w-full bg-fuchsia-100 px-4 rounded-sm text-shadow'>
            {errorMessage}
          </span>
        )}
      </>
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
