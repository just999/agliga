'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Modal from './modal';
import Heading from '../heading';
import Input from '../ui/input';
import toast from 'react-hot-toast';

import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import { ImFacebook2 } from 'react-icons/im';
import { signIn } from 'next-auth/react';

import useModal from '@/hooks/use-modal';
import { useRouter } from 'next/navigation';

import useBanks from '@/hooks/use-banks';

import SelectInput from '../select-input';
import useGames from '@/hooks/use-games';
import { Button } from '../ui/button';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
// import BankSelect from '../select-input';

// const bankOptions = banks.map((bank) => ({
//   value: bank.value,
//   icon: bank.icon || 'No label provided', // Handle missing labels
//   // Add any other missing properties with default values if needed
// }));

type AuthModalProps = {};

const AuthModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleToggleVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  // const [selectedBankOption, setSelectedBankOption] = useState<
  //   SelectInputValue | undefined
  // >(undefined);
  // const [selectedGameOption, setSelectedGameOption] = useState<
  //   SelectInputValue | undefined
  // >(undefined);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const router = useRouter();

  const { getBanks } = useBanks();
  const { getGames } = useGames();

  const { modalType, isOpen, onOpen, onClose } = useModal();
  let auth;
  if (modalType === 'register') {
    auth = {
      name: '',
      email: '',
      bank: null,
      game: null,
      phone: '',
      accountNumber: '',
      password: '',
    };
  } else if (modalType === 'login') {
    auth = { email: '', password: '' };
  }

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: auth,
  });

  const name = watch('name');
  const email = watch('email');
  const bank = watch('bank');
  const game = watch('game');
  const phone = watch('phone');
  const accountNumber = watch('accountNumber');
  const password = watch('password');

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  if (!isMounted) return null;
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (modalType === 'register') {
      axios
        .post('/api/register', data)
        .then(() => {
          toast.success('user successfully registered');
          onClose();
        })
        .catch((error) => {
          toast.error('Something Went Wrong');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    if (modalType === 'login') {
      signIn('credentials', {
        ...data,
        redirect: false,
      }).then((callback) => {
        setIsLoading(false);

        if (callback?.ok) {
          toast.success('Logged In');
          router.refresh();
          onClose();
        }

        if (callback?.error) {
          toast.error(callback.error);
        }
      });
    }
  };

  const handleCloseClearForm = () => {
    onClose();
    setValue('name', '');
    setValue('email', '');
    setValue('bank', '');
    setValue('game', '');
    setValue('phone', '');
    setValue('accountNumber', '');
    setValue('password', '');

    reset();
  };

  const banks = getBanks();
  const bankOptions = banks.map((bank) => ({
    value: bank.value,
    icon: bank.icon,
  }));

  const games = getGames();
  const gameOptions = games.map((game) => ({
    value: game.value,
    icon: game.icon,
  }));

  const bodyContent = (
    <div className='flex flex-col gap-1'>
      <Heading
        title={modalType === 'register' ? 'Daftar' : 'Login'}
        subtitle={modalType === 'register' ? 'Member Baru' : 'Login'}
      />

      <Input
        id='email'
        type='email'
        label={email ? '' : 'email'}
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      {errors.email && (
        <span className='text-sm text-red-500 '>
          <span className='text-xs  underline decoration-rose-300 rounded-lg bg-pink-100 px-4 '>
            Kolom Wajib di isi...
          </span>
        </span>
      )}
      <div className='relative w-full'>
        <Input
          id='password'
          type={
            modalType === 'login'
              ? 'password'
              : isPasswordVisible
              ? 'text'
              : 'password'
          }
          label={password ? '' : 'password'}
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          className='pl-9 tracking-wider font-bold'
        />
        {modalType === 'register' && (
          <button
            type='button'
            className={`password-visibility-toggle absolute right-2 top-1/2 mr-4 h-6 w-6 -translate-y-1/2 transform text-muted-foreground ${
              isPasswordVisible ? 'show' : ''
            }`}
            onClick={handleToggleVisibility}
            aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
          >
            {isPasswordVisible ? (
              <BsEyeSlash className='h-5 w-5' />
            ) : (
              <BsEye className='h-5 w-5' />
            )}
          </button>
        )}
      </div>
      {errors.password && (
        <span className='text-sm text-red-700 '>
          <span className='text-xs  underline decoration-rose-300 rounded-lg bg-pink-100 px-4 '>
            Kolom Wajib di isi...
          </span>
        </span>
      )}

      {modalType !== 'login' && modalType === 'register' && (
        <>
          <Input
            id='phone'
            type='tel'
            label={phone ? '' : 'phone'}
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          {errors.phone && (
            <span className='text-sm text-red-500 '>
              <span className='text-xs  underline decoration-rose-300 rounded-lg bg-pink-100 px-4 '>
                Kolom Wajib di isi...
              </span>
            </span>
          )}

          <SelectInput
            register={register}
            label={bank ? '' : 'bank'}
            id='bank'
            value={watch('bank')}
            isMulti={false}
            onChange={(value) => setCustomValue('bank', value)}
            placeholder='Banks'
            options={() => bankOptions}
            errors={errors}
            required
          />
          {errors.bank && (
            <span className='text-sm text-red-500 '>
              <span className='text-xs  underline decoration-rose-300 rounded-lg bg-pink-100 px-4 '>
                Kolom Wajib di isi...
              </span>
            </span>
          )}

          <Input
            id='accountNumber'
            type='tel'
            label={accountNumber ? '' : 'accountNumber'}
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />

          {errors.accountNumber && (
            <span className='text-sm text-red-500 '>
              <span className='text-xs  underline decoration-rose-300 rounded-lg bg-pink-100 px-4 '>
                Kolom Wajib di isi...
              </span>
            </span>
          )}

          <Input
            id='name'
            type='text'
            label={name ? '' : 'name'}
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          {errors.name && (
            <span className='text-sm text-red-500 '>
              <span className='text-xs  underline decoration-rose-300 rounded-lg bg-pink-100 px-4 '>
                Kolom Wajib di isi...
              </span>
            </span>
          )}

          <SelectInput
            label={game ? '' : 'game'}
            id='game'
            register={register}
            isMulti={true}
            value={watch('game')}
            onChange={(value) => setCustomValue('game', value)}
            placeholder='Games'
            options={() => gameOptions}
            errors={errors}
            required
          />
          {errors.game && (
            <span className='text-sm text-red-500 '>
              <span className='text-xs  underline decoration-rose-300 rounded-lg bg-pink-100 px-4 '>
                Kolom Wajib di isi...
              </span>
            </span>
          )}
        </>
      )}
    </div>
  );

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3 '>
      <hr />
      <div className='flex flex-row items-center justify-center gap-2 '>
        <Button
          variant='outline'
          className='text-xs '
          // label='Continue with Google'
          // icon={FcGoogle}
          onClick={() => signIn('google')}
        >
          <FcGoogle className='mr-2 ' size={20} />
          Login with Google
        </Button>
        <Button
          variant='outline'
          className='text-xs '
          // label='Continue with Github'
          // icon={AiFillGithub}
          onClick={() => signIn('github')}
        >
          <AiFillGithub className='mr-2 ' size={20} />
          Login with Github
        </Button>
        <Button
          variant='outline'
          className='text-xs '
          // label='Continue with Github'
          // icon={AiFillGithub}
          onClick={() => signIn('facebook')}
        >
          <ImFacebook2 className='mr-2 text-[#3b5999] ' size={20} />
          Login with Facebook
        </Button>
      </div>

      <div className='text-neutral-500 text-center mt-4 font-light '>
        <div className='justify-center flex flex-row items-center gap-2 '>
          <div>
            {modalType === 'register'
              ? 'Sudah Pernah Daftar?'
              : 'Belum Pernah Daftar?'}
          </div>
          <div
            onClick={
              modalType === 'register'
                ? () => {
                    setValue('name', '');
                    setValue('email', '');
                    setValue('bank', '');
                    setValue('game', '');
                    setValue('phone', '');
                    setValue('accountNumber', '');
                    setValue('password', '');
                    reset();
                    onOpen('login');
                  }
                : () => {
                    setValue('name', '');
                    setValue('email', '');
                    setValue('bank', '');
                    setValue('game', '');
                    setValue('phone', '');
                    setValue('accountNumber', '');
                    setValue('password', '');
                    reset();
                    onOpen('register');
                  }
            }
            className='text-neutral-800 cursor-pointer hover:underline '
          >
            {modalType === 'register' ? 'Login' : 'Daftar'}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpen && (modalType === 'login' || modalType === 'register')}
      title={modalType === 'register' ? 'Daftar' : 'Login'}
      actionLabel='Continue'
      onClose={handleCloseClearForm}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default AuthModal;
