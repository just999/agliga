'use client';

import { completeSocialLoginProfile } from '@/actions/auth-actions';
import CardWrapper from '@/components/card-wrapper';
import { Button } from '@/components/shadcn/ui/button';
import Spinner from '@/components/shadcn/ui/spinner';
import { cn } from '@/lib/utils';
import { profileSchema, ProfileSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { FormProvider, useForm } from 'react-hook-form';
import { RiProfileLine } from 'react-icons/ri';

import ProfileForm from '../register/profile-form';

type CompleteProfileFormProps = {};

const CompleteProfileForm = () => {
  const methods = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    mode: 'onTouched',
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = methods;

  const onSubmit = async (data: ProfileSchema) => {
    const parseData = JSON.parse(JSON.stringify(data));

    const result = await completeSocialLoginProfile(parseData);

    if (result.status === 'success') {
      signIn(result.data, {
        callbackUrl: '/dashboard',
      });
    }
  };

  const bodyContent = (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='space-y-4'>
          <ProfileForm />
          {errors.root && errors.root.serverError && (
            <p className='text-center text-red-700 w-full mx-auto  text-sm bg-rose-100 shadow-lg'>
              {errors.root.serverError.message}
            </p>
          )}
          <div className='flex flex-row items-center gap-6 '>
            <Button
              size='sm'
              variant='ghost'
              type='submit'
              disabled={!isValid}
              className={cn(
                'bg-indigo-500 px-4 text-gray-50 hover:bg-indigo-500/70 hover:text-gray-200 w-full shadow-md'
              )}
            >
              {isSubmitting ? (
                <span>
                  <Spinner size={24} /> processing...
                </span>
              ) : (
                'Submit'
              )}
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
  return (
    <CardWrapper
      headerText='About You'
      subHeaderText='Please complete your profile to complete to the app'
      headerIcon={RiProfileLine}
      body={bodyContent}
    />
  );
};

export default CompleteProfileForm;
