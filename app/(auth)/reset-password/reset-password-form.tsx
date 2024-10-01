'use client';

import React from 'react';
import {
  generateResetPasswordEmail,
  resetPassword,
} from '@/actions/auth-actions';
import CardWrapper from '@/components/card-wrapper';

import { Button } from '@/components/ui/button';

import Spinner from '@/components/ui/spinner';
import { ActionResult } from '@/types';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { GiDialPadlock } from 'react-icons/gi';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetPasswordSchema, resetPasswordSchema } from '@/schemas';
import { useRouter, useSearchParams } from 'next/navigation';
import { PasswordInput } from '@/components/ui/password-input';
import toast from 'react-hot-toast';

import ResultMessage from '@/components/result-message';
import ClientOnly from '@/lib/client-only';

type ResetPasswordFormProps = {};

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [result, setResult] = useState<ActionResult<string> | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting, isValid, isLoading, isDirty },
  } = useForm<ResetPasswordSchema>({
    mode: 'onTouched',
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordSchema) => {
    try {
      const res = await resetPassword(data.password, searchParams.get('token'));
      if (res.status === 'success') {
        setResult(res);
        reset();
        toast.success('password berhasil di update');
        router.push('/users');
      } else {
        toast.error('password gagal di update!');
        setError('root.serverError', {
          type: 'server',
          message: res.error as string,
        });
      }
    } catch (err: any) {
      console.error('Login error:', err);
      toast.error('An unexpected error occurred');
      setError('root.serverError', {
        type: 'server',
        message: 'An unexpected error occurred',
      });
    }
  };

  const bodyContent = (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col space-y-4 '>
      <PasswordInput
        isDirty={isDirty}
        className='text-sm font-semibold'
        placeholder='Password Baru'
        defaultValue=''
        {...register('password')}
        type='password'
        isInvalid={!!errors.password}
        errorMessage={errors.password?.message as string}
      />
      <PasswordInput
        isDirty={isDirty}
        className='text-sm font-semibold'
        placeholder='confirmPassword'
        defaultValue=''
        {...register('confirmPassword')}
        type='password'
        isInvalid={!!errors.confirmPassword}
        errorMessage={errors.confirmPassword?.message as string}
      />

      <Button type='submit' variant='primary' disabled={!isValid}>
        {isSubmitting || isLoading ? (
          <span className='flex flex-row gap-2 items-center justify-center '>
            <Spinner size={16} color='gray-200' /> Sending...
          </span>
        ) : (
          'Send reset email'
        )}
      </Button>
    </form>
  );

  const footerContent = <ResultMessage result={result} />;

  return (
    <ClientOnly>
      <CardWrapper
        headerIcon={GiDialPadlock}
        headerText='Reset Password'
        subHeaderText='Enter your new password'
        body={bodyContent}
        footer={footerContent}
      />
    </ClientOnly>
  );
};

export default ResetPasswordForm;
