'use client';

import { useCallback, useEffect, useState } from 'react';

import { newVerification } from '@/actions/new-verification';
import { useSearchParams } from 'next/navigation';
import { BeatLoader } from 'react-spinners';

import { FormError, FormSuccess } from '../shadcn/ui/success-error-form';
import CardWrapper from './card-wrapper';

type NewVerificationFormProps = {};

const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const token = searchParams?.get('token');

  const onSubmit = useCallback(() => {
    if (!token) {
      setError('Missing Token!');
      return;
    }

    newVerification(token).then((data) => {
      setSuccess(data.success);
      setError(data.error);
    });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <CardWrapper
      headerLabel='Confirming your verification'
      backButtonLabel='Back to login'
      backButtonHref='/login'
    >
      <div className='flex items-center w-full justify-center'>
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;
