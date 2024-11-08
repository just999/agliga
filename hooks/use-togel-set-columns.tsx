'use client';

import { InputCustom } from '@/components/ui';
import { cn, oldStandardTT, poppins, safeParseFloat } from '@/lib/utils';
import { Sin4dSetSchema } from '@/schemas/togel-schema';
import { Trash2Icon } from 'lucide-react';
import { ChangeEvent, useCallback, useEffect, useMemo } from 'react';
import {
  Control,
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetFocus,
  UseFormWatch,
} from 'react-hook-form';
import { FaRupiahSign } from 'react-icons/fa6';

type useTogelSetColumnsProps = {};

const useTogelSetColumns = (
  register: UseFormRegister<FieldValues | any>,
  control: Control<FieldValues | any>,
  watch: UseFormWatch<FieldValues | any>,
  setFocus: UseFormSetFocus<FieldValues>,
  getValues: UseFormGetValues<FieldValues> | any,
  setValue: UseFormGetValues<FieldValues> | any,
  remove: (i: number) => void,
  handleInputChange: (field: any, value: any, i: number) => void
) => {
  const watchAllInputs = watch();
  const sin4dSet = watch('sin4dSet');
  const { copy, copyWager } = watchAllInputs;

  const setWager4dSet = useCallback(() => {
    sin4dSet.forEach((sin: Sin4dSetSchema, i: number) => {
      const { bet4d, bet3d, bet2d, allBet, ...rest } = sin;
      const countSin = Object.values(rest).filter((val) => val !== '').length;
      if (copy && copyWager && countSin === 2) {
        setValue(`sin4dSet.${i}.bet2d`, copyWager);
        setValue(`sin4dSet.${i}.bet3d`, '');
        setValue(`sin4dSet.${i}.bet4d`, '');
      }
      if (copy && copyWager && countSin === 3) {
        setValue(`sin4dSet.${i}.bet2d`, copyWager);
        setValue(`sin4dSet.${i}.bet3d`, copyWager);
        setValue(`sin4dSet.${i}.bet4d`, '');
      }
      if (copy && copyWager && countSin === 4) {
        setValue(`sin4dSet.${i}.bet2d`, copyWager);
        setValue(`sin4dSet.${i}.bet3d`, copyWager);
        setValue(`sin4dSet.${i}.bet4d`, copyWager);
      }
      if (countSin === 2 && allBet) {
        setValue(`sin4dSet.${i}.bet2d`, allBet);
      }
      if (countSin === 3 && allBet && !(rest.d1 && rest.d2 && rest.d3)) {
        setValue(`sin4dSet.${i}.bet2d`, allBet);
        setValue(`sin4dSet.${i}.bet3d`, allBet);
      }
      if (countSin === 4 && allBet) {
        setValue(`sin4dSet.${i}.bet2d`, allBet);
        setValue(`sin4dSet.${i}.bet3d`, allBet);
        setValue(`sin4dSet.${i}.bet4d`, allBet);
      }
    });
  }, [copyWager, copy]);

  // const allBet = useAutoSetValues(sin4dSet, watchAllInputs, watch, setValue);
  useEffect(() => {
    setWager4dSet();
    return () => {
      setWager4dSet();
    };
  }, [setWager4dSet]);

  const handleOnInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value = safeParseFloat(
      Math.max(0, parseInt(e.target.value)).toString().slice(0, 1)
    ).toString();
  };

  const handleWagerInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value = safeParseFloat(
      Math.max(0, parseInt(e.target.value)).toString().slice(0, 12)
    ).toString();
  };

  const togelColumns = useMemo(
    () => [
      {
        accessorKey: 'index',
        header: () => <div className='text-zinc-700 font-semibold'>No.</div>,
        cell: ({ row }: any) => (
          <div className='flex flex-row justify-center p-0'>
            <span
              className={cn(
                'p-0 m-0 text-zinc-700 font-semibold',
                poppins.className
              )}>
              {row.index + 1}.
            </span>
          </div>
        ),
      },
      {
        id: 'number',
        header: ({ column }: any) => (
          <div className='text-zinc-700 font-semibold w-40'>
            Number 4d/3d/2d
          </div>
        ),
        cell: ({ row }: any) => (
          <div className='flex  w-40'>
            {['d1', 'd2', 'd3', 'd4'].map((key) => (
              <div key={key} className='w-10'>
                <InputCustom
                  onInput={handleOnInput}
                  {...register(`sin4dSet.${row.index}.${key}`, {
                    onChange: (e: ChangeEvent<HTMLInputElement>) =>
                      handleInputChange(key, e.target.value, row.index),
                    // disabled: (key === 'd1' || key === 'd2'),
                  })}
                  type='tel'
                  // value={row.original[key as keyof TogelTableColumnsProps] || ''}
                  className={cn(
                    'p-1 h-7 text-base rounded-lg mx-auto text-center font-extrabold text-shadow shadow-inner',
                    oldStandardTT.className
                  )}
                  style={{ width: '38px' }}
                />
              </div>
            ))}
          </div>
        ),
      },

      {
        id: 'bet',
        header: () => (
          // {head.label === 'wager' ? (
          <span className='text-center flex items-center justify-center'>
            <input type='checkbox' {...register('copy')} className='mx-1' />
            <InputCustom
              onInput={handleWagerInput}
              {...register('copyWager', {
                pattern: /^[0-9]+$/,
              })}
              type='tel'
              className={cn(
                'w-20 h-7 text-xs font-semibold text-zinc-600 placeholder:text-slate-300',
                poppins.className
              )}
              placeholder='bet'
            />
            <div className='pl-1'>bet</div>
          </span>
        ),
        cell: ({ row }: any) => (
          <div className='flex w-80'>
            {['bet4d', 'bet3d', 'bet2d', 'allBet'].map((key) => (
              <div key={key}>
                <InputCustom
                  onInput={handleWagerInput}
                  placeholder={key}
                  {...register(`sin4dSet.${row.index}.${key}`, {
                    onChange: (e: ChangeEvent<HTMLInputElement>) =>
                      handleInputChange(key, e.target.value, row.index),
                  })}
                  suffix={
                    <FaRupiahSign
                      size={12}
                      className='text-zinc-300 absolute left-1'
                    />
                  }
                  type='tel'
                  // value={row.original[key as keyof TogelTableColumnsProps] || ''}
                  className={cn(
                    'w-20 h-7 p-.5  pl-5 mx-auto font-semibold placeholder:text-sky-300  text-xs border border-slate-400 text-zinc-500 rounded',
                    poppins.className
                  )}
                  // style={{ width: '38px' }}
                />
                {/* <pre>{JSON.stringify(row, null, 2)}</pre> */}
              </div>
            ))}
          </div>
        ),
      },
      {
        accessorKey: 'action',
        cell: ({ row }: any) =>
          row.index > 0 && (
            <Trash2Icon
              size={20}
              onClick={() => remove(row.index)}
              className='svg text-rose-600 hover:-translate-y-1  hover:scale-150 hover:svg duration-300  cursor-pointer pl-1'
            />
          ),
      },
    ],
    []
  );

  return { togelColumns };
};

export default useTogelSetColumns;
