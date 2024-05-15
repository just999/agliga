'use client';

import { Label } from '@radix-ui/react-label';

import { BiUser } from 'react-icons/bi';
import { BsHouse } from 'react-icons/bs';
import SelectInput from './select-input';
import { Button } from './ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './ui/card';
import Image from 'next/image';
import Input from './ui/input';
import useBanks from '@/hooks/use-banks';
import useGames from '@/hooks/use-games';

import { useForm, FieldValues } from 'react-hook-form';
import useModal from '@/hooks/use-modal';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { UserProfileModalProps } from './modals/user-profile-modal';
import Link from 'next/link';

const UserEditProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfileModalProps>();

  const { modalType, isOpen, onOpen, onClose } = useModal();

  const { data: session, status } = useSession();
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

      setValue('game', game[0]);
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

  return (
    <>
      {modalType === 'editProfile' && profile && (
        <Card className='border-none pt-4'>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Data Pribadi anda</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className='grid w-full items-center gap-4'>
                <div className='flex flex-col space-y-1.5'>
                  <Image
                    src={
                      profile.image === null ? '/img/user.svg' : profile.image
                    }
                    alt='user avatar'
                    width={50}
                    height={50}
                    priority
                    className='w-20 h-auto '
                  />
                  <Label htmlFor='name' className='text-xs '>
                    Edit Avatar?
                  </Label>
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

                  <Input
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
                  )}

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
            </form>
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
      )}
    </>
  );
};

export default UserEditProfile;
