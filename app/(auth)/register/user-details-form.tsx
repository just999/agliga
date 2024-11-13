'use client';

import { InputCustom } from '@/components/ui/inputCustom';
import { PasswordInput } from '@/components/ui/password-input';
import ClientOnly from '@/lib/client-only';

import { MailIcon } from 'lucide-react';

import { useFormContext } from 'react-hook-form';

const UserDetailsForm = () => {
  const {
    register,
    getValues,
    formState: { errors, isDirty, touchedFields },
  } = useFormContext();
  return (
    <ClientOnly>
      <div className='space-y-4'>
        <InputCustom
          className='w-full text-sm font-semibold '
          placeholder='Email'
          defaultValue={getValues('email')}
          {...register('email')}
          suffix={
            <MailIcon
              size={16}
              className='text-zinc-400 absolute right-4 cursor-pointer hover:text-stone-600'
            />
          }
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message as string}
        />
        {isDirty}
        <PasswordInput
          className='w-full text-sm font-semibold '
          placeholder='Password'
          defaultValue={getValues('password')}
          {...register('password')}
          type='password'
          isInvalid={!!errors.password}
          errorMessage={errors.password?.message as string}
        />
        {/* {errors.root && errors.root.serverError && (
        <p className='text-center text-red-700 w-full mx-auto text-sm bg-rose-100 shadow-lg'>
          {errors.root.serverError.message as string}
        </p>
      )} */}
      </div>{' '}
    </ClientOnly>
  );
};

export default UserDetailsForm;
