'use client';

import { login } from '@/actions/auth-actions';

import { zodResolver } from '@hookform/resolvers/zod';

import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';

import { toast } from 'react-hot-toast';
import SocialLogin from './social-login';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { LoginSchema, loginSchema } from '@/schemas';
import { InputCustom } from '@/components/ui/inputCustom';
import Spinner from '@/components/ui/spinner';

import { LogInIcon, MailIcon } from 'lucide-react';
import { PasswordInput } from '@/components/ui/password-input';
import { cn } from '@/lib/utils';
import ClientOnly from '@/lib/client-only';
import LoginRegisterButton from '../_components/login-register-button';
import { HeadingLogo } from '@/components/ui';

const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting, isDirty, isLoading },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
  });
  const onSubmit = async (data: LoginSchema) => {
    const loadingToast = toast.loading('logged in...');
    try {
      const res = await login(data);
      toast.dismiss(loadingToast);
      if (res.status === 'success') {
        router.push('/dashboard');
        router.refresh();
      } else {
        toast.error(res.status === 'error' ? 'error' : '');
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

  return (
    <ClientOnly>
      <Card className='w-full h-fit border-none shadow-lg'>
        <CardHeader className='flex flex-col items-center justify-center'>
          <HeadingLogo
            title='Login'
            subtitle='Selamat datang kembali'
            center
            className='text-zinc-500'
          />
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-4 '>
              <InputCustom
                isDirty={isDirty}
                className='text-sm font-semibold '
                placeholder='Email'
                defaultValue=''
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
              <PasswordInput
                isDirty={isDirty}
                className='text-sm font-semibold'
                placeholder='Password'
                defaultValue=''
                {...register('password')}
                type='password'
                isInvalid={!!errors.password}
                errorMessage={errors.password?.message as string}
              />
              {errors.root && errors.root.serverError && (
                <p className='text-center text-red-700 w-full mx-auto text-xs bg-rose-100 shadow-md rounded-md text-shadow'>
                  {errors.root.serverError.message as string}
                </p>
              )}
              <Button
                disabled={!isValid || isSubmitting || isLoading}
                variant='ghost'
                className={cn(
                  'bg-indigo-500 px-4 text-gray-50 hover:bg-indigo-500/70 hover:text-gray-200 w-full shadow-lg'
                )}>
                {isSubmitting || isLoading ? (
                  <div className='flex gap-2 items-center justify-center'>
                    <Spinner size={16} color='gray-200' /> processing...
                  </div>
                ) : (
                  <div className='flex items-center gap-2 justify-center text-shadow'>
                    <LogInIcon size={16} className='svg' /> Login
                  </div>
                )}
              </Button>
              <SocialLogin />
              <div className='flex justify-center text-sm '>
                <LoginRegisterButton type='login' />
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </ClientOnly>
  );
};

export default LoginForm;
