'use client';

import Heading from '@/components/ui/heading-logo';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { profileSchema, RegisterSchema, registerSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import UserDetailsForm from './user-details-form';
import ProfileForm from './profile-form';
import { Button } from '@/components/ui/button';
import Spinner from '@/components/ui/spinner';
import { cn, handleFormServerErrors } from '@/lib/utils';

import toast from 'react-hot-toast';
import { register as signUp } from '@/actions/auth-actions';
import LoginRegisterButton from '../_components/login-register-button';
import SocialLogin from '../login/social-login';
import { PlayCircleIcon } from 'lucide-react';

const stepSchema = [registerSchema, profileSchema];

const RegisterForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const router = useRouter();
  const currentValidationSchema = stepSchema[activeStep];

  const methods = useForm<RegisterSchema>({
    resolver: zodResolver(currentValidationSchema),
    mode: 'onTouched',
  });

  const {
    handleSubmit,
    setError,
    getValues,
    formState: { errors, isValid, isSubmitting, isLoading },
  } = methods;

  const onSubmit = async () => {
    const data = JSON.parse(JSON.stringify(getValues()));
    const res = await signUp(data);
    if (res.status === 'success') {
      router.push('/register/success');
      router.refresh();
      toast.success('register successfully');
    } else {
      handleFormServerErrors(res, setError);
    }
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <UserDetailsForm />;
      case 1:
        return <ProfileForm />;
      default:
        return 'Unknown Step';
    }
  };

  const onBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const onNext = async () => {
    if (activeStep === stepSchema.length - 1) {
      await onSubmit();
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  return (
    <Card className='w-full h-fit border-none shadow-lg'>
      <CardHeader>
        <Heading
          title='Daftar'
          subtitle='Selamat datang'
          center
          className='text-zinc-500'
        />
      </CardHeader>
      <CardContent>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onNext)}>
            <div className='space-y-4'>
              {getStepContent(activeStep)}
              {errors.root && errors.root.serverError && (
                <p className='text-center text-red-700 w-full mx-auto  text-sm bg-rose-100 shadow-lg'>
                  {errors.root.serverError.message}
                </p>
              )}
              <div className='flex flex-row items-center gap-6 '>
                {activeStep !== 0 && (
                  <Button
                    size='sm'
                    onClick={onBack}
                    className='w-full bg-emerald-200 shadow-md'
                    variant='ghost'
                    type='button'>
                    Back
                  </Button>
                )}

                <Button
                  size='sm'
                  variant='ghost'
                  type='submit'
                  // disabled={!isValid}
                  className={cn(
                    'bg-indigo-500 px-4 text-gray-50 hover:bg-indigo-500/70 hover:text-gray-200 w-full shadow-md'
                  )}>
                  {isSubmitting || isLoading ? (
                    <span className='flex flex-row gap-2 items-center justify-center '>
                      <Spinner size={16} /> process...
                    </span>
                  ) : activeStep === stepSchema.length - 1 ? (
                    'Submit'
                  ) : (
                    <div className='flex items-center gap-2 justify-center text-shadow'>
                      <PlayCircleIcon size={16} className='svg' /> Continue
                    </div>
                  )}
                </Button>
              </div>
              <SocialLogin />
              <div className='flex justify-center text-sm '>
                <LoginRegisterButton type='register' />
              </div>
            </div>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
