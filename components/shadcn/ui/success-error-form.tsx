'use client';

import { cn } from '@/lib/utils';
import { BsExclamationTriangle } from 'react-icons/bs';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';

interface ErrorSuccessFormProps {
  message?: string;
  className?: string;
}

export const FormError = ({ message, className }: ErrorSuccessFormProps) => {
  if (!message) return null;

  return (
    <div className='bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive'>
      <BsExclamationTriangle className='h-12 w-12' />
      <p className={cn(className)}> {message} </p>
    </div>
  );
};

export const FormSuccess = ({ message, className }: ErrorSuccessFormProps) => {
  if (!message) return null;

  return (
    <div className='bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500'>
      <IoMdCheckmarkCircleOutline className='h-12 w-12' />
      <p className={cn(className)}> {message} </p>
    </div>
  );
};
