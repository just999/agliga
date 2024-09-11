'use client';

import { createDepo } from '@/actions/member-actions';
import {
  Button,
  Card,
  HeadingLogo,
  InputCustom,
  SelectInput,
  Spinner,
} from '@/components/ui';

import useBanks from '@/hooks/use-banks';
import useGames from '@/hooks/use-games';
import { banks } from '@/lib/helper';
import { cn } from '@/lib/utils';
import { DepoSchema, depoSchema } from '@/schemas';
import { DepoProps, UserProps } from '@/types/types';

import { zodResolver } from '@hookform/resolvers/zod';

import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

type DepoFormProps = { user: UserProps };
const defaultBank = {
  value: '',
  icon: null,
};

const defaultGame = {
  value: '',
  icon: null,
};

const MemberDepoForm = ({ user }: DepoFormProps) => {
  const [userData, setUserData] = useState<UserProps>();

  useEffect(() => {
    if (user) setUserData(user);
  }, [setUserData, user]);
  const { getBanks } = useBanks();

  const methods = useForm<DepoSchema>({
    resolver: zodResolver(depoSchema),
    mode: 'onTouched',
  });

  const {
    register,
    getValues,
    setValue,
    reset,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isValid, isSubmitting, isLoading },
  } = methods;
  const { getGames } = useGames();
  const banks = getBanks();
  const bankOptions = banks.map((bank) => ({
    value: bank.value,
    icon: bank.icon,
  }));
  const userBank = banks.filter(
    (bank: { value: string; icon: any }) => bank.value === userData?.bank
  ) || {
    value: '',
    icon: '',
  };

  useEffect(() => {
    if (user) {
      const initialData = {
        email: user.email || '',
        name: user.name || '',
        bank: banks.find((b) => b.value === user.bank) || defaultBank,
        accountNumber: user.accountNumber || '',
        depoAmount: '',
        game: defaultGame,
        gameUserId: '',
        bankPT: defaultBank,
      };

      reset(initialData); // Use reset from react-hook-form to set default form data
    }
  }, [user, banks, reset]);

  const setCustomValue = (id: any, value: any) => {
    if (setValue)
      setValue(id, value, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
  };

  const games = getGames();
  const gameOptions = games.map((game) => ({
    value: game.value,
    icon: game.icon,
  }));
  const onSubmit = async (data: DepoSchema) => {
    const depoData = JSON.parse(JSON.stringify(getValues()));
    const res = await createDepo(depoData);
  };
  return (
    <Card className='w-3/4 mx-auto p-4 shadow-lg'>
      <div className='flex flex-col space-y-4'>
        <HeadingLogo title='Deposit' subtitle='' />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='w-full flex flex-col gap-3 px-4'>
          {userData?.email && userData?.name && userData?.accountNumber && (
            <>
              <InputCustom
                className='h-12'
                placeholder='Email'
                defaultValue={userData?.email}
                {...register('email')}
                isInvalid={!!errors.email}
                errorMessage={errors.email?.message as string}
              />
              <InputCustom
                className='h-12'
                placeholder='Name'
                defaultValue={userData?.name}
                {...register('name')}
                isInvalid={!!errors.name}
                errorMessage={errors.name?.message as string}
              />
              <SelectInput
                register={register}
                label='bank'
                id='bank'
                defaultValue={userBank[0]}
                isMulti={false}
                onChange={(value) => setCustomValue('bank', value)}
                placeholder='Banks'
                options={() => bankOptions}
                errors={errors}
                required
              />
              <InputCustom
                className='h-12'
                placeholder='No rek'
                defaultValue={userData.accountNumber}
                {...register('accountNumber')}
                isInvalid={!!errors.accountNumber}
                errorMessage={errors.accountNumber?.message as string}
              />
            </>
          )}
          <InputCustom
            className='h-12'
            placeholder='Nominal deposit'
            defaultValue={getValues('depoAmount')}
            {...register('depoAmount')}
            isInvalid={!!errors.depoAmount}
            errorMessage={errors.depoAmount?.message as string}
          />

          <SelectInput
            label='game'
            id='game'
            register={register}
            isMulti={false}
            defaultValue={getValues('game')}
            onChange={(value) => setCustomValue('game', value)}
            placeholder='Games'
            options={() => gameOptions}
            errors={errors}
            required
          />

          <InputCustom
            className='h-12'
            placeholder='Game User id'
            defaultValue={getValues('gameUserId')}
            {...register('gameUserId')}
            isInvalid={!!errors.gameUserId}
            errorMessage={errors.gameUserId?.message as string}
          />

          <SelectInput
            register={register}
            label='bank tujuan deposit'
            id='bankPT'
            defaultValue={getValues('bankPT')}
            isMulti={false}
            onChange={(value) => setCustomValue('bankPT', value)}
            placeholder='Banks'
            options={() => bankOptions}
            errors={errors}
            required
          />

          <Button
            type='submit'
            variant='ghost'
            className={cn(
              'rounded-lg cursor-pointer  bg-sky-500 text-gray-50 px-2 py-4 h-12',
              isValid && 'hover:bg-blue-300 hover:text-blue-800'
            )}
            // disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? (
              <Spinner className='gap-0' size={14} color='sky-700' />
            ) : (
              <div className='text-base '>
                {isValid ? 'valid' : 'NotValid'} - Submit
              </div>
            )}
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default MemberDepoForm;
