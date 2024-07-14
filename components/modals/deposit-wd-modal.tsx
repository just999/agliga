'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Modal from './modal';
import Heading from '../heading';
import Input from '../ui/input';
import toast from 'react-hot-toast';

import { useRouter } from 'next/navigation';

import useBanks from '@/hooks/use-banks';

import SelectInput from '../select-input';
import useGames from '@/hooks/use-games';

import useModal from '@/hooks/use-modal';

import {
  depoInitialValues,
  initialDepoValues,
  initialWdValues,
  wdInitialValues,
} from '@/lib/helper';
import { useSession } from 'next-auth/react';
import useCaptchaStore from '@/store/use-captcha-store';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import useDepoWdStore from '@/store/use-depo-wd-store';
import useStatus from '@/hooks/use-depo-wd-status';
import { fetchDepoById } from '@/lib/queries/depo-wd';
import { DepoProps, DepoWdProps, ValueIconProps, WdProps } from '@/types';
import { useGetDepo, useGetWd } from '@/hooks/use-get-depo-wd';

const DepositWdModal = () => {
  const [depo, setDepo] = useState<DepoProps>(initialDepoValues);
  const [wd, setWd] = useState<WdProps>(initialWdValues);
  const [isLoading, setIsLoading] = useState(false);

  const { data: session, status: sessionStatus } = useSession();
  // const [isMounted, setIsMounted] = useState(false);

  // const { depo, setDepo } = useDepoWdStore();

  const router = useRouter();

  const { getBanks } = useBanks();
  const { getStatus } = useStatus();
  const { getGames } = useGames();

  const {
    isLoading: captchaLoading,
    error,
    setCaptcha,
    captcha,
  } = useCaptchaStore();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const { modalType, isOpen, onOpen, onClose, setGroup, id } = useModal();
  const { depo: depoResult, depos } = useGetDepo(id ? id : undefined);

  const { wd: wdResult, wds } = useGetWd(id ? id : undefined);
  let items;
  if (modalType === 'depo' && session) {
    const email = session?.user.email;
    const bank = session?.user.curUser.bank;
    const accountNumber = session?.user.curUser.accountNumber;
    const name = session?.user.name;

    items = {
      email,
      bank,
      accountNumber,
      name,
      game: '',
      depoAmount: null,
      gameUserId: '',
      bankPT: '',
      status: '',
    };
  } else if (modalType === 'wd' && session) {
    const email = session?.user.email;
    const bank = session?.user.curUser.bank;
    const accountNumber = session?.user.curUser.accountNumber;
    const name = session?.user.name;
    items = {
      email,
      bank,
      accountNumber,
      name,
      game: '',
      wdAmount: null,
      gameUserId: '',
      status: '',
    };
  } else if (modalType === 'edit-depo') {
    items = {
      email: depoResult.email,
      bank: depoResult.bank,
      accountNumber: depoResult.accountNumber,
      name: depoResult.name,
      game: depoResult.game,
      depoAmount: depoResult.depoAmount,
      gameUserId: depoResult.gameUserId,
      status: depoResult.status,
    };
  } else if (modalType === 'edit-wd') {
    items = {
      email: wdResult.email,
      bank: wdResult.bank,
      accountNumber: wdResult.accountNumber,
      name: wdResult.name,
      game: wdResult.game,
      wdAmount: wdResult.wdAmount,
      gameUserId: wdResult.gameUserId,
      status: wdResult.status,
    };
  }
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: items,
  });

  const bankOpt = getBanks();
  const bankOptions = bankOpt.map((bank) => ({
    value: bank.value,
    icon: bank.icon,
  }));

  const statusOpt = getStatus();
  const statusOptions = statusOpt.map((stat) => ({
    value: stat.value,
    icon: stat.icon,
  }));

  useEffect(() => {
    if (modalType === 'depo' && !error) {
      const data = {
        email: session?.user.email,
        bank: session?.user.curUser.bank,
        accountNumber: session?.user.curUser.accountNumber,
        name: session?.user.name,
        game: '',
        wdAmount: null,
        depoAmount: null,
        bankPT: '',
        gameUserId: '',
        status: '',
      } as DepoWdProps;
      setDepo(data);

      const bank = bankOpt.filter(
        (ba) => ba.value === session?.user.curUser.bank
      ) || {
        icon: '',
        value: '',
      };
      const bankPT = bankOpt.filter((ba) => ba.value === depo.bankPT) || {
        icon: '',
        value: '',
      };

      const gameUser = gameOption.filter((go) => go.value === game) || {
        value: '',
        icon: '',
      };
      setValue('email', session?.user.email);
      setValue('name', session?.user.name);
      setValue('bank', bank[0]);
      setValue('depoAmount', depoAmount);
      setValue('wdAmount', wdAmount);
      setValue('accountNumber', session?.user.curUser.accountNumber);
      setValue('bankPT', bankPT[0]);
    }
    // if (depo) setDepoWd(depo);

    if (session && modalType === 'edit-depo') {
      setValue('email', email);
      setValue('name', name);
      setValue('bank', bank[0]);
      setValue('depoAmount', depoAmount);
      setValue('wdAmount', wdAmount);
      setValue('accountNumber', accountNumber);
      setValue('bankPT', bankPT[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, bankOpt, session, setValue]);

  const name = watch('name');
  const email = watch('email');
  const bank = watch('bank');
  const game = watch('game');
  const gameUserId = watch('gameUserId');
  const depoAmount = watch('depoAmount');
  const wdAmount = watch('wdAmount');
  const accountNumber = watch('accountNumber');
  const bankPT = watch('bankPT');
  const status = watch('status');

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };
  // if (!isMounted) return null;
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    // const gameValues: GameProps = data.game.map((val: any) => val.value);
    setCaptcha('');
    if (!executeRecaptcha) {
      console.log('not available to execute recaptcha');
      return;
    }

    // let recaptchaToken;
    // if (executeRecaptcha) {
    // }
    const recaptchaToken = await executeRecaptcha('inquirySubmit');
    const response = await axios({
      method: 'post',
      url: '/api/recaptcha',
      data: { recaptchaToken },
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    });
    if (response.data.success === true) {
      console.log(`Success with score:${response.data.score}`);
      setCaptcha('ReCaptcha Verified and Form Submitted');
    } else {
      console.log(`Failure with score: ${response.data.score}`);
      setCaptcha('Failed to verify recaptcha! you must reboot!');
    }

    if (modalType === 'depo') {
      data = {
        email,
        accountNumber,
        name,
        depoAmount: +depoAmount,
        bank: bank.value,
        bankPT: bankPT.value,
        gameUserId,
        game: game.value,
      };

      try {
        axios
          .post('/api/depo', data)
          .then((res) => {
            toast.success('Deposit form success di kirim!');
            router.refresh();
            reset();
            onClose();
          })
          .catch((error) => {
            toast.error('Something Went Wrong', error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } catch (err) {
        console.error(err);
      }
    } else if (modalType === 'edit-depo') {
      data = {
        email,
        accountNumber,
        name,
        depoAmount: +depoAmount,
        bank: bank.value,
        bankPT: bankPT.value,
        gameUserId,
        game: game.value,
        status,
      };

      try {
        axios.put(`/api/depo/${id}`, data).then(() => {
          toast.success('depo status berhasil di update');
          router.refresh();
          reset();
          onClose();
        });
      } catch (err) {
        console.error(err);
      }
    }

    if (modalType === 'wd') {
      data = {
        email,
        bank: bank.value,
        accountNumber,
        name,
        game: game.value,
        wdAmount: +wdAmount,
        gameUserId,
        status,
      };

      try {
        axios
          .post('/api/wd', data)
          .then(() => {
            toast.success('WD Form Success di kirim!');
            router.refresh();
            reset();
            onClose();
          })
          .catch((error) => {
            toast.error('Something Went Wrong, Error');
          })
          .finally(() => {
            setIsLoading(false);
          });
      } catch (err) {
        console.error(err);
      }
    } else if (modalType === 'edit-wd') {
      data = {
        email,
        bank: bank.value,
        accountNumber,
        name,
        game: game.value,
        wdAmount: +wdAmount,
        gameUserId,
        status,
      };

      try {
        axios.put(`/api/wd/${id}`, data).then(() => {
          toast.success('WD status berhasil di update');
          router.refresh();
          reset();
          onClose();
        });
      } catch (err) {
        console.error(err);
      }
    }
  };
  const handleModalTypeChange = (newType: 'depo' | 'wd') => {
    // Reset form values based on the new modal type
    if (newType === 'depo')
      reset({
        ...depoInitialValues,
        // Optionally preserve specific fields like email if needed
        // To keep email field value across modes
      });
    onOpen(newType); // Open the modal with the new type
    if (newType === 'wd')
      reset({
        ...wdInitialValues,
        // Optionally preserve specific fields like email if needed
        // To keep email field value across modes
      });
    onOpen(newType); // Open the modal with the new type
  };

  const gameOpt = getGames();

  const gameOption = gameOpt.map((game) => ({
    value: game.value,
    icon: game.icon,
  }));

  const bankPTOptions = bankOpt.map((bank) => ({
    value: bank.value,
    icon: bank.icon,
  }));

  const handleCloseClearForm = () => {
    onClose();
    const data = {
      name,
      email,
      bank,
      accountNumber,
      game: '',
      gameUserId: '',
      bankPT: '',
      depoAmount: 0,
      wdAmount: 0,
    };
    reset();
    setWd(data);
    setDepo(data);
  };

  const bodyContent = (
    <div className='flex flex-col gap-2'>
      <Heading
        title={
          modalType === 'depo'
            ? 'Deposit'
            : modalType === 'wd'
            ? 'WD'
            : modalType === 'edit-depo'
            ? 'Edit Depo'
            : 'Edit WD'
        }
        subtitle={
          modalType === 'depo'
            ? 'Deposit'
            : modalType === 'wd'
            ? 'WD'
            : modalType === 'edit-depo'
            ? 'Edit Depo status'
            : 'Edit WD status'
        }
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
          <span className=' text-xs underline decoration-rose-300 rounded-lg bg-pink-50 px-4 '>
            Kolom Wajib di isi...
          </span>
        </span>
      )}
      <SelectInput
        label={bank ? '' : 'bank'}
        isMulti={false}
        id='bank'
        defaultValue={watch('bank')}
        register={register}
        required
        onChange={(value) => setCustomValue('bank', value)}
        placeholder='Banks'
        options={() => bankOptions}
        errors={errors}
        optionIconClassName='w-5 h-5'
        optionClassName='text-sm ml-4 text-gray-600 font-bold'
      />
      {errors.bank && (
        <span className='text-sm text-red-500 '>
          <span className=' text-xs underline decoration-rose-300 rounded-lg bg-pink-50 px-4 '>
            Kolom Wajib di isi...
          </span>
        </span>
      )}
      {bank}
      <Input
        id='accountNumber'
        type='tel'
        label={accountNumber ? '' : 'No Rekening'}
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      {errors.accountNumber && (
        <span className='text-sm text-red-500 '>
          <span className=' text-xs underline decoration-rose-300 rounded-lg bg-pink-50 px-4 '>
            Kolom Wajib di isi...
          </span>
        </span>
      )}
      <Input
        id='name'
        type='text'
        label={name ? '' : 'Nama sesuai dengan rek bank'}
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      {errors.name && (
        <span className='text-sm text-red-500 '>
          <span className=' text-xs underline decoration-rose-300 rounded-lg bg-pink-50 px-4 '>
            Kolom Wajib di isi...
          </span>
        </span>
      )}
      <Input
        id={modalType === 'depo' ? 'depoAmount' : 'wdAmount'}
        type='number'
        label={
          depoAmount || wdAmount
            ? ''
            : modalType === 'depo'
            ? 'jumlah depo'
            : modalType === 'wd'
            ? 'Jumlah WD'
            : modalType === 'edit-depo'
            ? 'edit depo'
            : 'edit-wd'
        }
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      {modalType} - {session?.user.name}
      {(errors.depoAmount || errors.wdAmount) && (
        <span className='text-sm text-red-500 '>
          <span className=' text-xs underline decoration-rose-300 rounded-lg bg-pink-50 px-4 '>
            Kolom Wajib di isi...
          </span>
        </span>
      )}
      <SelectInput
        label={game ? '' : 'game'}
        isMulti={false}
        id='game'
        register={register}
        required
        value={game}
        onChange={(value) => setCustomValue('game', value)}
        placeholder='Games'
        options={() => gameOption}
        errors={errors}
        optionClassName='text-sm font-semibold'
      />
      {/* <pre>{JSON.stringify(game, null, 2)}</pre> */}
      {errors.game && (
        <span className='text-sm text-red-500  '>
          <span className=' text-xs underline decoration-rose-300 rounded-lg bg-pink-50 px-4 '>
            Kolom Wajib di isi...
          </span>
        </span>
      )}
      <Input
        id='gameUserId'
        type='text'
        label={gameUserId ? '' : 'user id game'}
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      {errors.gameUserId && (
        <span className='text-sm text-red-500 '>
          <span className=' text-xs underline decoration-rose-300 rounded-lg bg-pink-50 px-4 '>
            Kolom Wajib di isi...
          </span>
        </span>
      )}
      {(modalType === 'depo' || modalType === 'edit-depo') && (
        <>
          <SelectInput
            label={bankPT ? '' : 'bankPT'}
            isMulti={false}
            id='bankPT'
            value={watch('bankPT')}
            register={register}
            required
            onChange={(value) => setCustomValue('bankPT', value)}
            placeholder='Rekening Tujuan Deposit'
            options={() => bankPTOptions}
            errors={errors}
            optionIconClassName='w-5 h-5'
            optionClassName='text-sm ml-4 text-gray-600 font-bold'
          />
          {errors.bankPT && (
            <span className='text-sm text-red-500 '>
              <span className=' text-xs underline decoration-rose-300 rounded-lg bg-pink-50 px-4 '>
                Kolom Wajib di isi...
              </span>
            </span>
          )}
        </>
      )}
      {modalType === 'edit-depo' && (
        <>
          <SelectInput
            label='depo status'
            isMulti={false}
            id='status'
            value={watch('status')}
            register={register}
            required
            onChange={(value) => setCustomValue('status', value)}
            placeholder='status'
            options={() => statusOptions}
            errors={errors}
            optionClassName='text-sm ml-4 text-gray-600 font-bold'
          />
          {errors.status && (
            <span className='text-sm text-red-500 '>
              <span className=' text-xs underline decoration-rose-300 rounded-lg bg-pink-50 px-4 '>
                Kolom Wajib di isi...
              </span>
            </span>
          )}
        </>
      )}
    </div>
  );

  const footerContent = (
    <div className='flex flex-col  m-0 '>
      <hr />

      <div className='text-neutral-500 text-center mt-2 font-light '>
        <div className='justify-center flex flex-row items-center gap-2 '>
          <div>{modalType === 'depo' ? 'Apakah mau Wd?' : 'Mau deposit?'}</div>
          <div
            // onClick={
            //   modalType === 'depo' ? () => onOpen('wd') : () => onOpen('depo')
            // }
            onClick={() =>
              handleModalTypeChange(modalType === 'depo' ? 'wd' : 'depo')
            }
            className='text-neutral-800 cursor-pointer hover:underline '
          >
            {modalType === 'depo' ? 'withdrawal' : ' Deposit'}
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      isOpen={
        isOpen &&
        (modalType === 'depo' ||
          modalType === 'wd' ||
          modalType === 'edit-depo' ||
          modalType === 'edit-wd')
      }
      onClose={handleCloseClearForm}
      onSubmit={handleSubmit(onSubmit)}
      title={modalType === 'depo' ? 'Deposit' : 'Withdrawal'}
      actionLabel='Continue'
      disabled={isLoading}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default DepositWdModal;
