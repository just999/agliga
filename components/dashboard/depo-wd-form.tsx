'use client';

import React, { useState, useEffect } from 'react';
import { createDepo, createWd } from '@/actions/member-actions';
import useBanks from '@/hooks/use-banks';
import useGames from '@/hooks/use-games';

import { handleFormServerErrors, cn } from '@/lib/utils';
import {
  DepoSchema,
  depoSchema,
  NewFormSchema,
  newFormSchema,
  WdSchema,
  wdSchema,
} from '@/schemas';

import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  Button,
  Card,
  HeadingLogo,
  InputCustom,
  SelectInput,
  Spinner,
} from '../ui';
import { useRouter } from 'next/navigation';
import { User } from '@prisma/client';

import useFormTypes from '@/hooks/use-form-types';

import AmountInput from '../amount-input';

type DepoWdFormProps = {
  user: User;
};

const valueWithIcon = {
  value: '',
  icon: '',
};

const DepoWdForm = ({ user }: DepoWdFormProps) => {
  const [userData, setUserData] = useState<User>();

  const router = useRouter();

  const { formType, setOn } = useFormTypes((state) => ({
    formType: state.formType,
    setOn: state.setOn,
  }));

  useEffect(() => {
    if (user) setUserData(user);
  }, [setUserData, user]);

  const { getBanks } = useBanks();

  const methods = useForm<NewFormSchema>({
    resolver: zodResolver(newFormSchema),
    mode: 'onTouched',
  });
  const {
    register,
    getValues,
    setValue,
    reset,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting, isLoading },
  } = methods;

  const { getGames } = useGames();
  const banks = getBanks();

  const bankOptions = banks.map((bank) => ({
    value: bank.value,
    icon: bank.icon,
  }));

  const userBank = banks.filter((bank) => bank.value === userData?.bank);

  useEffect(() => {
    const initialData = {
      email: user.email || '',
      name: user.name || '',
      bank: banks.filter((b) => b.value === user.bank)[0],
      accountNumber: user.accountNumber || '',
      game: valueWithIcon,
      gameUserId: '',
      bankPT: valueWithIcon,
    };
    if (user && formType === 'depo') {
      const newInitialDepo = Object.assign(initialData, { depoAmount: '' });
      reset(newInitialDepo); // Use reset from react-hook-form to set default form data
    } else if (user && formType === 'wd') {
      const newInitialDepo = Object.assign(initialData, { wdAmount: '' });
      reset(newInitialDepo); // Use reset from react-hook-form to set default form data
    }
  }, [user, banks, reset, formType]);

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

  const onSubmit = async (data: NewFormSchema) => {
    const depoWdData = JSON.parse(JSON.stringify(data));
    const res =
      formType === 'depo'
        ? await createDepo(depoWdData)
        : await createWd(depoWdData);

    if (res.status === 'success') {
      router.refresh();
      toast.success('Depo berhasil!');
      reset();
    } else {
      handleFormServerErrors(res, setError);
    }
  };

  return (
    <Card className='w-3/4 mx-auto p-4 shadow-lg'>
      <div className='flex flex-col space-y-4'>
        <HeadingLogo
          title={cn(formType === 'depo' ? 'Deposit' : 'Wds')}
          subtitle=''
        />

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
                isInvalid={!!errors.bank}
                errorMessage={errors.bank?.message as string}
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
          {/* <InputCustom
            className='h-12'
            placeholder={formType === 'depo' ? 'Nominal deposit' : 'Nominal Wd'}
            {...register(depoWd)}
            isInvalid={!!errors[depoWd]}
            errorMessage={errors[depoWd]?.message as string}
          /> */}

          <AmountInput methods={methods} />

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
            isInvalid={!!errors.game}
            errorMessage={errors.game?.message as string}
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
            isInvalid={!!errors.bankPT}
            errorMessage={errors.bankPT?.message as string}
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

export default DepoWdForm;
