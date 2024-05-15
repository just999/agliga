'use client';

import { cn } from '@/lib/utils';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { BiDollar } from 'react-icons/bi';

type InputProps = {
  id: string;
  className?: string;

  accept?: string;
  labelClassName?: string;
  value?: string;
  rows?: number;
  cols?: number;
  multiple?: boolean;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  defaultValue?: any;
  placeholder?: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  as?: React.ElementType;
};

const Input: React.FC<InputProps> = ({
  id,
  className,
  labelClassName,
  value,
  accept,
  multiple,
  label,
  rows,
  cols,
  type,

  disabled,
  formatPrice,
  required,
  defaultValue,
  placeholder,
  register,
  errors,
  as = 'input',
}: InputProps) => {
  return (
    <div className='w-full relative '>
      {formatPrice && (
        <BiDollar
          size={24}
          className='text-neutral-700 absolute top-5 left-2'
        />
      )}

      {as === 'textarea' ? (
        <textarea
          id={id}
          rows={rows}
          cols={cols}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          {...register(id, { required })}
          placeholder={placeholder}
          className={cn(
            `peer w-full p-3 pt-4 font-light bg-stone-100 border-2 rounded-md outline-none transition  disabled:opacity-70 disabled:cursor-not-allowed`,
            className,
            formatPrice ? 'pl-9' : 'pl-4',
            errors[id] ? 'border-rose-500' : 'border-neutral-300',
            errors[id]
              ? 'focus:border-rose-500 bg-rose-100/30'
              : 'focus:border-black'
          )}
        />
      ) : (
        <input
          id={id}
          accept={accept}
          defaultValue={defaultValue}
          disabled={disabled}
          multiple={multiple}
          {...register(id, { required })}
          placeholder={placeholder}
          type={type}
          className={cn(
            `peer w-full p-3 pt-4 font-light bg-stone-100  border-2 rounded-md outline-none transition  disabled:opacity-70 disabled:cursor-not-allowed`,
            className,
            formatPrice ? 'pl-9' : 'pl-4',
            errors[id]
              ? 'border-rose-500 bg-rose-100/30'
              : 'border-neutral-300',
            errors[id] ? 'focus:border-rose-500' : 'focus:border-black'
          )}
        />
      )}

      <label
        className={cn(
          `absolute text-sm duration-150 transform -translate-y-3 top-4  origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4`,
          labelClassName,
          formatPrice ? 'left-9' : 'left-4',
          errors[id] ? 'text-red-500' : 'text-zinc-400/50'
        )}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
