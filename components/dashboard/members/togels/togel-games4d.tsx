'use client';

import { InputCustom } from '@/components/ui';
import { cn } from '@/lib/utils';
import { useEffect, useMemo, useState } from 'react';
import {
  Control,
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  useWatch,
} from 'react-hook-form';
import { FaRupiahSign } from 'react-icons/fa6';

import { useTogel4d } from '@/hooks/use-togel4d';
import { FormValuesProps } from '@/types/types';
import { FormSetValuesProps } from './togel-4d-set';

type TogelGames4dProps = {
  control: Control<FieldValues> | any;
  i?: number;
  setValue: UseFormSetValue<FieldValues> | any;
  className?: string;
  register: UseFormRegister<FieldValues> | any;
  getValues: UseFormGetValues<FieldValues> | any;
  gameType?: 'togel4d' | 'togel4dSet';
};

export const TogelGames4d = ({
  control,
  i,
  className,
  setValue,
  register,
  getValues,
}: TogelGames4dProps) => {
  const [number, setNumber] = useState('');
  const value = useWatch({
    control,
    name: `sin4ds.${i}`,
    defaultValue: {},
  });
  const type = 'game';

  const game4d = useTogel4d({ value, type });
  useEffect(() => {
    if (game4d && typeof game4d === 'string') {
      setValue(`sin4ds.${i}.game`, game4d);

      setNumber(game4d);
    }
  }, [game4d, i, setValue]);

  // useEffect(() => {
  //   if (game4d && typeof game4d === 'string') {
  //     setValue(`sin4ds.${i}.game`, game4d);

  //     setNumber(game4d);
  //   }
  // }, [game4d, i, setValue]);
  return (
    <InputCustom
      disabled
      aria-disabled
      className={cn(className, 'aria-disabled:opacity-100')}
      defaultValue={getValues(`sin4ds.${i}.game`)}
    />
  );
};

export const TogelDiscount = ({
  control,
  i,
  className,
  setValue,
  getValues,
  register,
}: TogelGames4dProps) => {
  const [disco, setDisco] = useState('');
  const value = useWatch({
    control,
    name: `sin4ds.${i}`,
    defaultValue: {},
  });

  const type = 'dis';

  const game4d = useTogel4d({ value, type });

  // useEffect(() => {
  //   if (game4d && typeof game4d === 'string') {
  //     setValue(`sin4ds.${i}.dis`, game4d);
  //     setDisco(game4d);
  //   }
  // }, [game4d, i, setValue]);
  return (
    <InputCustom
      disabled
      aria-disabled
      className={cn(className, 'aria-disabled:opacity-100')}
      defaultValue={getValues(`sin4ds.${i}.dis`)}
    />
  );
};

export const TogelNetWager = ({
  control,
  i,
  className,
  getValues,
  setValue,
}: TogelGames4dProps) => {
  const [nett, setNett] = useState('');
  const value = useWatch({
    control,
    name: `sin4ds.${i}`,
    defaultValue: {},
  });
  const { d1, d2, d3, d4, game, wager, dis, net } = value;

  const netWager = useMemo(() => {
    if (d1 && d2 && d3 && d4) return Math.round((34 / 100) * Number(wager));
    if (
      (d1 && d2 && !d3 && !d4) ||
      (!d1 && d2 && d3 && !d4) ||
      (!d1 && !d2 && d3 && d4)
    )
      return Math.round((71 / 100) * Number(wager));
    if (!d1 && d2 && d3 && d4) return Math.round((41 / 100) * Number(wager));
    return '';
  }, [d1, d2, d3, d4, wager]);

  // useEffect(() => {
  //   if (netWager) {
  //     setValue(`sin4ds.${i}.net`, netWager.toString());
  //     setNett(netWager.toString());
  //   }
  //   if (netWager === '') {
  //     setValue(`sin4ds.${i}.net`, ' ');
  //   }
  // }, [netWager, i, setValue]);
  return (
    <InputCustom
      type='number'
      disabled
      aria-disabled
      suffix={
        <FaRupiahSign size={12} className='text-zinc-300 absolute left-1' />
      }
      className={cn(className, 'aria-disabled:opacity-100')}
      defaultValue={Number(netWager) === 0 ? '' : Number(netWager).toString()}
    />
  );
};

// ?TOTAL NET AMOUNT OF BET
export const TotalNetAmount = ({
  control,
  i,
  className,
  getValues,
  setValue,
  gameType,
}: TogelGames4dProps) => {
  const value = useWatch({
    control,
    name: `sin4ds`,
    defaultValue: [],
  });

  function getTotal(payload: FormValuesProps['sin4ds']) {
    // let total = 0;

    // for (const item of payload) {
    //   total += Number.isNaN(Number(item.net)) ? 0 : Number(item.net);
    // }

    // return total.toString();

    const total = payload.reduce((acc, item) => {
      const netValue = Number(item.net);
      return acc + (Number.isNaN(netValue) ? 0 : netValue);
    }, 0);

    return total;
  }

  const totalAmount = getTotal(value);
  useEffect(() => {
    if (totalAmount) {
      setValue(`totalBet`, totalAmount.toString());
    }
  }, [totalAmount, i, setValue]);

  return (
    <InputCustom
      type='number'
      disabled
      aria-disabled
      suffix={
        <FaRupiahSign size={12} className='text-zinc-300 absolute left-1' />
      }
      className={cn(className, 'aria-disabled:opacity-100')}
      defaultValue={
        Number(totalAmount) === 0
          ? ''
          : Number(totalAmount).toFixed().toString()
      }
    />
  );
};

export const TotalAmountSet = ({
  control,
  className,
}: {
  control: Control<FormSetValuesProps> | any;
  className: string;
}) => {
  const getTotalNetWagerTogel4dSet = (
    payload: FormSetValuesProps['sin4dSet']
  ) => {
    let total = 0;
  };
  const sin4dSetValue = useWatch({
    control,
    name: 'sin4dSet',
  });

  return (
    <InputCustom
      type='number'
      disabled
      aria-disabled
      suffix={
        <FaRupiahSign size={12} className='text-zinc-300 absolute left-1' />
      }
      className={cn(className, 'aria-disabled:opacity-100')}
    />
  );
};

export const TogelNomor4d = ({
  control,
  className,
  i,
  getValues,
  setValue,
  key,
}: {
  control: Control<FormSetValuesProps> | any;
  className: string;
  i: number;
  getValues: UseFormGetValues<FieldValues> | any;
  key: string;
  setValue: UseFormSetValue<FieldValues> | any;
}) => {
  const sin4dSetValue = useWatch({
    control,
    name: `sin4ds`,
  });

  return (
    <InputCustom
      type='number'
      disabled
      aria-disabled
      defaultValue={getValues(`sin4ds.${i}.${key}`)}
      className={cn(className, 'aria-disabled:opacity-100')}
    />
  );
};

export const Bb4dNumber = ({
  control,
  i,
  className,
  setValue,
  register,
  getValues,
}: TogelGames4dProps) => {
  const bbfsValue = useWatch({
    control,
    name: 'bbfs',
  });

  return (
    <InputCustom
      type='number'
      disabled
      aria-disabled
      defaultValue={getValues(`bbfs.${i}.bet4d`)}
      className={cn(className, 'aria-disabled:opacity-100')}
    />
  );
};

export const BbWager = ({
  control,
  i,
  className,
  setValue,
  register,
  getValues,
}: TogelGames4dProps) => {
  const bb4dValue = useWatch({
    control,
    name: `bbfs`,
    defaultValue: [],
  });

  useEffect(() => {
    if (bb4dValue) {
      setValue(`bbfs`, bb4dValue[0]);
    }
  }, [bb4dValue, i, setValue]);
  return (
    <InputCustom
      type='number'
      disabled
      aria-disabled
      defaultValue={getValues(`bbfs.${i}.bet4d`)}
      className={cn(className, 'aria-disabled:opacity-100')}
    />
  );
};

// export const Togel4dSetWager = ({
//   control,
//   i,
//   className,
//   getValues,
//   setValue,
//   register,
// }: TogelGames4dProps) => {
//   const value = useWatch({
//     control,
//     name: `sin4dSet.${i}`,
//     defaultValue: {},
//   });
//   const { d1, d2, d3, d4, bet2d, allBet } = value;

//   const type = 'sin4dSet';

//   const game4d = useTogel4d({ value, type });

//   useEffect(() => {
//     // if (d1 && d2) setValue(`sin4ds.${i}.bet2d`, allBet);
//     if (game4d === '2dd') setValue(`sin4ds.${i}.bet2d`, allBet);
//   }, [allBet, value, i, setValue, game4d]);

//   return (
//     <InputCustom
//       type='tel'
//       className={cn(className)}
//       {...register(`sin4dSet.${i}.allBet`)}
//       // defaultValue={getValues(`sin4dSet.${i}.allBet`)}
//     />
//   );
// };
