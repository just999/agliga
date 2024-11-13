'use client';

import React from 'react';
import { generateResetPasswordEmail } from '@/actions/auth-actions';
import CardWrapper from '@/components/card-wrapper';

import { Button } from '@/components/ui/button';
import { InputCustom } from '@/components/ui/inputCustom';
import Spinner from '@/components/ui/spinner';
import { ActionResult } from '@/types';
import { MailIcon } from 'lucide-react';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { GiDialPadlock } from 'react-icons/gi';
import ResultMessage from '@/components/result-message';

type ForgotPasswordFormProps = {};

const ForgotPasswordForm = () => {
  const [result, setResult] = useState<ActionResult<string> | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    setResult(await generateResetPasswordEmail(data.email));
    reset();
  };

  const bodyContent = (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col space-y-4 '>
      <InputCustom
        type='email'
        className='w-full text-sm font-semibold '
        placeholder='Email Address'
        defaultValue=''
        {...register('email', { required: true })}
        suffix={
          <MailIcon
            size={16}
            className='text-zinc-400 absolute right-4 cursor-pointer hover:text-stone-600'
          />
        }
        isInvalid={!!errors.email}
        errorMessage={errors.email?.message as string}
      />

      <Button type='submit' variant='primary' disabled={!isValid}>
        {isSubmitting ? (
          <span className='flex flex-row gap-2 items-center justify-center '>
            {' '}
            <Spinner size={16} color='gray-200' /> Sending...{' '}
          </span>
        ) : (
          'Send reset email'
        )}
      </Button>
    </form>
  );

  const footerContent = <ResultMessage result={result} />;

  return (
    <CardWrapper
      headerIcon={GiDialPadlock}
      headerText='Forgot Password'
      subHeaderText='Please enter your email address and we will send you a link to reset your password'
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default ForgotPasswordForm;
