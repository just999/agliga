'use client';

import SelectInput from '@/components/ui/select-input';
import { InputCustom } from '@/components/ui/inputCustom';
import useBanks from '@/hooks/use-banks';
import useGames from '@/hooks/use-games';
import { findMatchingObjects } from '@/lib/utils';
import { UserProps } from '@/types/types';

import { CreditCardIcon, PhoneIcon, UserPlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useFormContext } from 'react-hook-form';

type Props = {
  user?: UserProps;
};

const ProfileForm = ({ user }: Props) => {
  const [userData, setUserData] = useState<UserProps>();

  const {
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    if (user) setUserData(user);
  }, [setUserData, user]);

  const { getBanks } = useBanks();
  const { getGames } = useGames();

  const setCustomValue = (id: string, value: any) => {
    if (setValue)
      setValue(id, value, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
  };

  const banks = getBanks();
  const bankOptions = banks.map((bank) => ({
    value: bank.value,
    icon: bank.icon,
  }));

  const userBank = bankOptions.filter(
    (bank) =>
      bank.value === userData?.bank || {
        value: '',
        icon: '',
      }
  );
  const games = getGames();
  const gameOptions = games.map((game) => ({
    value: game.value,
    icon: game.icon,
  }));

  // const userGames = userData?.game;
  // if (!userGames) return 'no user games found';
  // const findMatchingUserGames = findMatchingObjects(games, userGames);
  return (
    <div className='space-y-4'>
      <InputCustom
        placeholder='Nama sesuai rek bank'
        defaultValue={getValues('name')}
        {...register('name')}
        suffix={
          <UserPlusIcon
            size={16}
            className='text-zinc-400 absolute right-4 cursor-pointer hover:text-stone-600'
          />
        }
        isInvalid={!!errors?.name}
        errorMessage={errors?.name?.message as string}
      />
      <InputCustom
        placeholder='phone'
        defaultValue={getValues('phone')}
        {...register('phone')}
        suffix={
          <PhoneIcon
            size={16}
            className='text-zinc-400 absolute right-4 cursor-pointer hover:text-stone-600'
          />
        }
        isInvalid={!!errors?.phone}
        errorMessage={errors?.phone?.message as string}
      />
      <InputCustom
        placeholder='nomor rek bank'
        defaultValue={getValues('accountNumber')}
        {...register('accountNumber')}
        suffix={
          <CreditCardIcon
            size={16}
            className='text-zinc-400 absolute right-4 cursor-pointer hover:text-stone-600'
          />
        }
        isInvalid={!!errors?.accountNumber}
        errorMessage={errors?.accountNumber?.message as string}
      />

      <SelectInput
        register={register}
        label='bank'
        id='bank'
        aria-label='bank'
        defaultValue={getValues('bank')}
        isMulti={false}
        onChange={(value) => setCustomValue('bank', value)}
        placeholder='Banks'
        options={() => bankOptions}
        errors={errors}
        required
      />

      <SelectInput
        label='game'
        id='game'
        register={register}
        isMulti={true}
        defaultValue={getValues('game')}
        onChange={(value: any) => setCustomValue('game', value)}
        placeholder='Games'
        options={() => gameOptions}
        errors={errors}
        required
      />
    </div>
  );
};

export default ProfileForm;
