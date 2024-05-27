'use client';

import { cn } from '@/lib/utils';

type InputTextProps = {
  label?: string;
  name: string;
  type: string;
  id?: string;
  defaultValue: string;
  placeholder?: string;
  className?: string;
  rows?: number;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
};

const InputText = ({
  label,
  name,
  type,
  id,
  rows,
  defaultValue,
  placeholder,
  className,
  handleChange,
}: InputTextProps) => {
  let input;
  if (type === 'text') {
    input = (
      <div className='mb-4'>
        <label htmlFor={id} className='block text-gray-700 font-bold mb-2'>
          {label}
        </label>
        <input
          type={type}
          id={id}
          name={name}
          className={cn(
            `peer w-full p-3 pt-1 font-light bg-stone-100  border-2 rounded-md outline-none transition  disabled:opacity-70 disabled:cursor-not-allowed`,
            className
          )}
          placeholder={placeholder}
          required
          defaultValue={defaultValue}
          onChange={handleChange}
        />
      </div>
    );
  } else if (type === 'textarea') {
    input = (
      <div className='mb-4'>
        <label htmlFor={id} className='block text-gray-700 font-bold mb-2'>
          {label}
        </label>
        <textarea
          id={id}
          name={name}
          className={cn(
            `peer w-full p-3 pt-4 font-light bg-stone-100 border-2 rounded-md outline-none transition  disabled:opacity-70 disabled:cursor-not-allowed`,
            className
          )}
          rows={rows}
          placeholder={placeholder}
          defaultValue={defaultValue}
          onChange={handleChange}
        />
      </div>
    );
  }

  return input;
};

export default InputText;
