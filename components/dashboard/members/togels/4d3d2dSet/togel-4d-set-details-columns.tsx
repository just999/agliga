'use client';

import { Form4dSetProps } from '@/components/dashboard/members/togels/togel-4d-set';
import { Button, InputCustom } from '@/components/ui';
import { cn, oldStandardTT, poppins, rp, safeParseFloat } from '@/lib/utils';
import { Trash2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useCallback, useEffect, useMemo } from 'react';
import {
  Control,
  FieldArrayWithId,
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetFocus,
  UseFormWatch,
  useWatch,
} from 'react-hook-form';

import { FaRupiahSign } from 'react-icons/fa6';

export const useTogel4dSetDetailsColumns = (
  register: UseFormRegister<FieldValues | any>,
  control: Control<FieldValues | any>,
  watch: UseFormWatch<FieldValues | any>,
  setFocus: UseFormSetFocus<FieldValues>,
  getValues: UseFormGetValues<FieldValues> | any,
  setValue: UseFormGetValues<FieldValues> | any,
  remove: (i: number) => void,
  fields: FieldArrayWithId<FieldValues> | any,
  sin4dSet: Form4dSetProps[],
  type: string,
  handleInputChange?: (field: any, value: any, i: number) => void
) => {
  const router = useRouter();

  const sin4dSetValue = useWatch({
    control,
    name: 'sin4ds',
  });
  const calculateTotalBet = useCallback(() => {
    const totalAll = sin4dSetValue.reduce((acc: any, cur: any) => {
      return acc + Number(cur.net);
    }, 0);
    setValue('totalBet', totalAll.toFixed());
  }, [sin4dSetValue, setValue]);

  useEffect(() => {
    calculateTotalBet();
  }, [sin4dSetValue, calculateTotalBet]);

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

  const togel4dSetColumns = useMemo(
    () => [
      {
        accessorKey: 'index',
        header: () => (
          <div className='w-7 text-zinc-700 h-full font-semibold flex items-center justify-center'>
            no.
          </div>
        ),
        cell: ({ row }: any) => (
          <div className='flex flex-row justify-center p-0'>
            <span
              className={cn(
                'p-0 m-0 text-zinc-300 font-semibold',
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
          <div className='text-zinc-700 font-semibold'>Number</div>
        ),
        cell: ({ row }: any) => (
          <div className='flex justify-around w-28'>
            {['d1', 'd2', 'd3', 'd4'].map((key) => (
              <div key={key} className='w-7'>
                <InputCustom
                  onInput={handleOnInput}
                  {...register(`sin4ds.${row.index}.${key}` as const, {
                    onChange: (e: ChangeEvent<HTMLInputElement>) =>
                      handleInputChange &&
                      handleInputChange(key, e.target.value, row.index),
                  })}
                  type='tel'
                  className={cn(
                    'p-1 h-7 text-base rounded-lg mx-auto text-center font-extrabold text-shadow shadow-inner',
                    oldStandardTT.className
                  )}
                  style={{ width: '28px' }}
                />
                <pre>
                  {/* {JSON.stringify(`sin4ds.${row.index}.${key}`, null, 2)} */}
                </pre>
              </div>
            ))}
          </div>
        ),
      },
      {
        accessorKey: 'game',
        header: ({}) => (
          <div className='w-8 h-full p-0 m-0 mx-auto text-zinc-700 font-semibold flex items-center justify-center'>
            game
          </div>
        ),
        cell: ({ row }: any) => (
          <div
            className={cn(
              'text-green-700 h-7 flex items-center justify-center border-2 border-emerald-600 font-semibold text-xs w-full bg-emerald-400/40 text-center rounded-lg text-shadow',
              poppins.className
            )}>
            <div className='text-emerald-800 text-xs px-1'>
              {row.original.game}
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'wager',
        header: () => (
          // {head.label === 'wager' ? (
          <span className='text-center flex items-center justify-center'>
            {/* <input
              type='checkbox'
              {...register('copy')}
              className={cn('mx-1', type === 'togel4dSet' && 'hidden')}
            />
            <InputCustom
              onInput={handleWagerInput}
              {...register('copyWager', {
                pattern: /^[0-9]+$/,
              })}
              type='tel'
              className={cn(
                'w-20 h-7 text-xs font-semibold text-zinc-600 placeholder:text-slate-300',
                type === 'togel4dSet' && 'hidden',
                poppins.className
              )}
              placeholder='bet'
            /> */}

            <div
              className={cn(
                'w-full flex justify-center text-zinc-700 font-semibold'
              )}>
              bet
            </div>

            {/* <div className='pl-1'>bet</div> */}
          </span>
        ),
        cell: ({ row }: any) => (
          <div className='text-zinc-700 border border-zinc-400 rounded-lg h-7 px-0 font-semibold w-29'>
            <div className='flex gap-2 items-center bg-zinc-300/40 h-7 text-center shadow-inner rounded-md '>
              <FaRupiahSign size={10} className='text-zinc-400 ml-1 svg' />
              <span
                className={cn(
                  'text-left px-0 text-zinc-500 font-semibold tracking-wider text-xs',
                  poppins.className
                )}>
                {rp.format(row.original.wager)}
              </span>
            </div>
            {/* <pre>{JSON.stringify(row.original.wager, null, 2)}</pre> */}
          </div>
        ),
      },
      {
        accessorKey: 'dis',
        header: () => (
          <div className='text-zinc-700 font-semibold w-29'>dis(%)</div>
        ),
        cell: ({ row }: any) => {
          const dis4d = (Number(row.original.wager) * 0.66).toFixed();
          const dis3d = (Number(row.original.wager) * 0.59).toFixed();
          const dis2d = (Number(row.original.wager) * 0.29).toFixed();

          return (
            <div
              className={cn(
                'h-7 text-zinc-700 flex items-center border border-amber-500 gap-x-0.5 text-xs shadow-inner font-semibold w-29 bg-amber-200/40 text-center rounded-md',
                poppins.className
              )}>
              <div className='w-29 flex items-center text-zinc-400 gap-1  justify-between h-7 rounded-lg shadow-inner '>
                <div className='flex items-center '>
                  <FaRupiahSign size={10} className='text-zinc-400 mx-1 svg' />
                  <div>
                    {row.original.dis === '66%'
                      ? rp.format(Number(dis4d))
                      : row.original.dis === '59%'
                      ? rp.format(Number(dis3d))
                      : rp.format(Number(dis2d))}
                  </div>
                </div>

                <div className='text-nowrap flex text-[10px] text-amber-600 text-shadow pr-1'>
                  ({row.original.dis})
                </div>
              </div>

              {/* <pre>{JSON.stringify(row.original, null, 2)}</pre> */}
            </div>
          );
        },
        footer: () => (
          <div
            className={cn(
              'text-xs w-29 font-semibold mx-auto text-center pt-2'
            )}>
            Total{' '}
          </div>
        ),
      },

      {
        accessorKey: 'net',
        header: ({ column }: any) => (
          <div className='text-zinc-700 font-semibold w-29  h-full flex items-end justify-center'>
            net
          </div>
        ),
        cell: ({ row }: any) => {
          const net = Number(row.original.net).toFixed();
          return (
            <div className='text-zinc-700 border border-zinc-400 rounded-lg h-7 px-0 font-semibold w-29'>
              <div
                className={cn(
                  'flex gap-1 items-center bg-zinc-300/40 h-7 text-center shadow-inner rounded-md',
                  poppins.className
                )}>
                <FaRupiahSign size={12} className='text-zinc-400 ml-1' />
                <span
                  className={cn(
                    'text-left px-0 text-gray-500 tracking-wider text-xs',
                    poppins.className
                  )}>
                  {row.original.net === '' ? '' : rp.format(row.original.net)}
                </span>
              </div>
            </div>
          );
        },
        footer: (info: any) => {
          const total = info.table
            .getFilteredRowModel()
            .rows.reduce((sum: number, row: any) => {
              const net = Number(row.original.net);
              return sum + (isNaN(net) ? 0 : net);
            }, 0);

          return (
            <div className='flex justify-center py-2'>
              <div
                className={cn(
                  'w-29 h-7 flex items-center bg-gray-500 gap-1 shadow-inner text-center font-semibold text-xs border border-slate-400 rounded',
                  poppins.className
                )}>
                <FaRupiahSign size={12} className='text-zinc-400 ml-1 svg' />
                <span className='text-white text-shadow'>
                  {rp.format(total.toFixed())}
                </span>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: 'action',
        header: () => <span></span>,
        cell: ({ row }: any) => (
          <div className='w-full'>
            {fields.length > 1 && (
              <Trash2Icon
                size={20}
                onClick={() => remove(row.index)}
                className='svg text-rose-600 hover:-translate-y-1 mx-auto  hover:scale-150 hover:svg duration-300  cursor-pointer pl-1'
              />
            )}
          </div>
        ),
      },
    ],
    [fields.length, handleInputChange, register, remove, type]
  );

  return {
    togel4dSetColumns,
  };
};
