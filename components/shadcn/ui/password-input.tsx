import * as React from 'react';

import { cn } from '@/lib/utils';
import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form';
import { InputCustom } from './inputCustom';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isInvalid?: boolean;
  isDirty?: boolean;
  errorMessage?: React.ReactNode;
}

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isInvalid, isDirty, errorMessage, ...props }, ref) => {
    const [show, setShow] = React.useState(false);

    return (
      <InputCustom
        isDirty={isDirty}
        type={show ? 'text' : 'password'}
        suffix={
          show ? (
            <EyeIcon
              size={18}
              className='select-none text-zinc-400 absolute right-4 cursor-pointer hover:text-stone-600'
              onClick={() => setShow(false)}
            />
          ) : (
            <EyeOffIcon
              size={18}
              className='select-none text-zinc-400 absolute right-4 cursor-pointer hover:text-stone-600'
              onClick={() => setShow(true)}
            />
          )
        }
        isInvalid={isInvalid}
        errorMessage={errorMessage}
        className={cn('relative', className)}
        {...props}
        ref={ref}
      />
    );
  }
);
PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
