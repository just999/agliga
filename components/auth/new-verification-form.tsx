'use client';

import { useSearchParams } from 'next/navigation';
import CardWrapper from './card-wrapper';
import { useCallback, useEffect, useState } from 'react';
import { newVerification } from '@/actions/new-verification';
import { BeatLoader } from 'react-spinners';
import { FormSuccess, FormError } from '../ui/success-error-form';

type NewVerificationFormProps = {};

const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const token = searchParams.get('token');

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
      backButtonHref='/auth/login'
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
