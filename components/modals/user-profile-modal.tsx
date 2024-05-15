'use client';

import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

import { Label } from '../ui/label';

import Modal from './modal';
import useModal from '@/hooks/use-modal';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

import Image from 'next/image';

import {
  BsTrash,
  BsPen,
  BsPersonFillGear,
  BsHouse,
  BsPencil,
} from 'react-icons/bs';

import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import Input from '../ui/input';
import SelectInput from '../select-input';
import useBanks from '@/hooks/use-banks';
import useGames from '@/hooks/use-games';
import axios from 'axios';
import toast from 'react-hot-toast';

import { BiUser } from 'react-icons/bi';
import Link from 'next/link';
import Heading from '../heading';
import { useRouter } from 'next/navigation';

export type UserProfileModalProps = {
  name: string;
  bank: string;
  accountNumber: string;
  email: string;
  game: string;
  phone: string;
  role: 'user' | 'admin';
  image: string | null;
};

interface VerifyPasswordProps {
  onSubmit: (password: string) => void;
  onTimeOut?: () => void;
}

const UserProfileModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfileModalProps>();
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  // const [verificationTime, setVerificationTime] = useState<number | null>(null);

  const { modalType, isOpen, onOpen, onClose } = useModal();

  const { data: session, status } = useSession();
  // if (session?.user) {
  //   const { name, bank, accountNumber, email,game, phone, role, image } =
  //     session?.user.curUser;
  //   setProfile(session.user.curUser);
  // } else {
  //   return 'no logged in user found';
  // }
  const router = useRouter();
  const userId = session?.user.id;

  const { getBanks } = useBanks();
  const { getGames } = useGames();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      name: profile?.name,
      bank: profile?.bank,
      accountNumber: profile?.accountNumber,
      email: profile?.email,
      game: profile?.game,
      phone: profile?.phone,
    },
  });

  useEffect(() => {
    if (modalType === 'editProfile') {
      const timer = setInterval(() => {
        if (remainingTime > 0) {
          setRemainingTime(remainingTime - 1);
        }
        //  else if (onTimeOut) {
        //   onTimeOut();
        // }
        else if (remainingTime === 0) {
          onOpen('profile');
          setIsPasswordVerified(false);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [modalType, onOpen, remainingTime]);

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
  useEffect(() => {
    if (session?.user.curUser) {
      setProfile(session.user.curUser);

      const bank = banks.filter(
        (b) => b.value === session.user.curUser.bank
      ) || {
        icon: '',
        value: '',
      };
      const game = games.filter(
        (g) => g.value === session.user.curUser.game
      ) || {
        icon: '',
        value: '',
      };

      setValue('name', session?.user.curUser.name);
      setValue('bank', bank[0]);
      setValue('accountNumber', session?.user.curUser.accountNumber);
      setValue('email', session?.user.curUser.email);
      setValue('game', game[0]);
      setValue('phone', session?.user.curUser.phone);
    } else {
      console.log('no logged in user found');
    }
  }, [banks, games, session?.user.curUser, setValue]);

  // const name = watch('name');
  // const email = watch('email');
  // const bank = watch('bank');
  // const game = watch('game');
  // const phone = watch('phone');
  // const accountNumber = watch('accountNumber');

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (modalType === 'validateUser') {
      const response = axios
        .post('api/verify-password', data)
        .then((res) => {
          if (res.data.isValid === true) {
            setIsPasswordVerified(true);
            setRemainingTime(900);
            onOpen('editProfile');
            toast.success('user validation success');
          }
        })
        .catch((err) => toast.error('error validate user'))
        .finally(() => setIsLoading(false));
    }

    if (modalType === 'editProfile' && isPasswordVerified) {
      axios
        .put(`/api/profiles/${userId}`, data)
        .then(() => {
          let g;
          data.game.forEach((item: any) => {
            g = item.value;
          });

          const newData: any = {
            name: data.name,
            bank: data.bank.value,
            accountNumber: data.accountNumber,
            email: data.email,
            game: g,
            phone: data.phone,
          };
          router.refresh();
          setProfile(newData);
          toast.success('user successfully registered');
          onOpen('profile');
        })
        .catch((error) => {
          toast.error('Something Went Wrong');
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else if (!isPasswordVerified) {
      onOpen('validateUser');
    }
  };
  let bodyContent;
  if (modalType === 'profile' && profile) {
    bodyContent = (
      <Card className='border-none pt-4'>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Data Pribadi anda</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col w-1/4 space-y-1.5 items-center justify-'>
              <Image
                src={profile.image === null ? '/img/user.svg' : profile.image}
                alt='user avatar'
                width={50}
                height={50}
                priority
                className='w-20 h-auto '
              />
              <p className='text-xs w-full text-center '>Edit Avatar?</p>
            </div>
            <div>
              <Button
                variant='ghost'
                size='sm'
                type='button'
                className='flex gap-2 '
              >
                <p>Email: {profile.email}</p> <BsPencil />
              </Button>
            </div>
            <div className='flex flex-col space-y-1.5'>
              <p>Name: {profile?.name}</p>
              <p>Bank: {profile?.bank}</p>
              <p>Nomor-Rekening: {profile?.accountNumber}</p>
              <p>Email: {profile?.email}</p>
              <p>Game: {profile?.game}</p>
              <p>Phone: {profile?.phone}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className='flex justify-between'>
          <div className='flex flex-row justify-between gap-6  my-2 '>
            <Button
              size='sm'
              variant='ghost'
              asChild
              className='group text-xs flex-flex-row items-center justify-center gap-2 shadow-sm bg-stone-50 hover:text-red-500 hover:drop-shadow-xl px-4'
            >
              <Link href='/'>
                Delete Profile{' '}
                <BsTrash className='group-hover:text-red-500  text-neutral-400 h-4 w-4 m-0 p-0 cursor-pointer hover:font-bold hover:shadow-lg ' />
              </Link>
            </Button>
            <Button
              size='sm'
              variant='ghost'
              type='button'
              className='group text-xs flex-flex-row items-center justify-center gap-2 shadow-sm bg-stone-50 hover:text-sky-500  hover:drop-shadow-xl px-4'
              onClick={() => onOpen('validateUser')}
            >
              Edit profile
              <BsPersonFillGear className='group-hover:text-sky-500 text-neutral-400  hover:font-bold h-4 w-4 m-0 cursor-pointer   hover:shadow-lg' />
            </Button>
          </div>
        </CardFooter>
      </Card>
    );
  }
  if (modalType === 'validateUser' && isPasswordVerified === false) {
    bodyContent = (
      <Card className='border-none pt-4'>
        <CardHeader>
          <CardTitle>Verifikasi User</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-1.5'>
              <Input
                id='email'
                type='email'
                label='Email'
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

              <Input
                id='password'
                type='password'
                label='Password'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
              />
              {errors.password && (
                <span className='text-sm text-red-700 '>
                  <span className='text-xs  underline decoration-rose-300 rounded-lg bg-pink-100 px-4 '>
                    Kolom Wajib di isi...
                  </span>
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  if (modalType === 'editProfile' && profile && isPasswordVerified === true) {
    bodyContent = (
      <Card className='border-none pt-4'>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Data Pribadi anda</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-1.5'>
              <Image
                src={profile.image === null ? '/img/user.svg' : profile.image}
                alt='user avatar'
                width={50}
                height={50}
                priority
                className='w-20 h-auto '
              />
              <p className='text-xs '>Edit Avatar?</p>
            </div>
            <div>
              <p>Email: {profile.email}</p>
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Input
                id='name'
                type='text'
                label='Nama sesuai dengan rek bank'
                disabled={isLoading}
                defaultValue={profile.name}
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
                label='bank player'
                isMulti={false}
                id='bank'
                register={register}
                value={watch('bank')}
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
                label='Nomor Rekening'
                defaultValue={profile.accountNumber}
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

              {/* <Input
                id='email'
                type='email'
                label='Email'
                defaultValue={profile.email}
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
              )} */}

              <SelectInput
                label='game'
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

              <Input
                id='phone'
                type='tel'
                label='Tel'
                defaultValue={profile.phone}
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
            </div>
          </div>
        </CardContent>
        <CardFooter className='flex justify-start'>
          <div className='flex flex-row justify-between gap-6  my-2 '>
            <Button
              size='sm'
              variant='ghost'
              asChild
              className='text-xs flex-flex-row items-center justify-center gap-2 drop-shadow-lg bg-stone-50'
            >
              <Link href='/'>
                Back to Homepage{' '}
                <BsHouse className='text-neutral-400 h-4 w-4 m-0 p-0 cursor-pointer hover:text-red-500 hover:font-bold hover:shadow-lg ' />
              </Link>
            </Button>
            <Button
              size='sm'
              variant='ghost'
              type='button'
              className='text-xs flex-flex-row items-center justify-center gap-2 drop-shadow-lg bg-stone-50'
              onClick={() => onOpen('profile')}
            >
              Back to your profile
              <BiUser className='text-neutral-400  hover:font-bold h-4 w-4 m-0 cursor-pointer hover:text-sky-500  hover:shadow-lg' />
            </Button>
          </div>
        </CardFooter>
      </Card>
    );
  }

  let btnClass;
  if (modalType === 'profile') {
    btnClass = 'hidden';
  } else if (modalType === 'editProfile' || modalType === 'validateUser') {
    btnClass = 'block';
  }

  return (
    <>
      <Modal
        disabled={isLoading}
        isOpen={
          isOpen &&
          (modalType === 'profile' ||
            modalType === 'validateUser' ||
            modalType === 'editProfile')
        }
        btnClassName={btnClass}
        title='Profile'
        actionLabel={modalType === 'validateUser' ? 'validate' : 'Continue'}
        onClose={handleCloseClearForm}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        // footer={footerContent}
      />
    </>
  );
};

export default UserProfileModal;
