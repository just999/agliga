'use client';

import { Form4dSetProps } from '@/components/dashboard/members/togels/togel-4d-set';
import {
  TogelDiscount,
  TogelGames4d,
  TogelNetWager,
  TotalNetAmount,
} from '@/components/dashboard/members/togels/togel-games4d';
import { InputCustom } from '@/components/ui';
import { cn, oldStandardTT, poppins, safeParseFloat } from '@/lib/utils';
import { Sin4dFormDataSchema, Sin4dSchema } from '@/schemas/togel-schema';

import { Percent, Trash2Icon } from 'lucide-react';

import { ChangeEvent, useMemo } from 'react';
import {
  Control,
  FieldArrayWithId,
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetFocus,
  UseFormWatch,
} from 'react-hook-form';

import { FaRupiahSign } from 'react-icons/fa6';

export const useTogel4dColumns = (
  register: UseFormRegister<FieldValues | any>,
  control: Control<FieldValues | any>,
  watch: UseFormWatch<FieldValues | any>,
  setFocus: UseFormSetFocus<FieldValues>,
  getValues: UseFormGetValues<FieldValues> | any,
  setValue: UseFormGetValues<FieldValues> | any,
  remove: (i: number) => void,
  fields: FieldArrayWithId<FieldValues> | any,
  handleInputChange?: (field: any, value: any, i: number) => void,
  handleInputValue?: (field: any, value: any, i?: number) => void
) => {
  // const handleOnInput = (key: string, e: ChangeEvent<HTMLInputElement>) => {
  //   if (key === 'copyWager' || key === 'wager') {
  //     e.target.value = safeParseFloat(
  //       Math.max(0, parseInt(e.target.value)).toString().slice(0, 6)
  //     ).toString();
  //   } else {
  //     e.target.value = safeParseFloat(
  //       Math.max(0, parseInt(e.target.value)).toString().slice(0, 1)
  //     ).toString();
  //   }
  // };

  const togel4dColumns = useMemo(
    () => [
      {
        accessorKey: 'index',
        header: () => <div className='text-zinc-300 font-semibold'>No.</div>,
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
          <div className='text-zinc-700 font-semibold w-28 h-full flex items-end justify-center'>
            Number
          </div>
        ),
        cell: ({ row }: any) => (
          <div className='flex justify-around w-28'>
            {['d1', 'd2', 'd3', 'd4'].map((key) => (
              <div key={key} className='w-7'>
                <InputCustom
                  onInput={(e: ChangeEvent<HTMLInputElement>) =>
                    handleInputValue && handleInputValue(key, e, row.index)
                  }
                  {...register(`sin4ds.${row.index}.${key}` as const, {
                    onChange: (e: ChangeEvent<HTMLInputElement>) =>
                      handleInputChange && handleInputChange(key, e, row.index),
                  })}
                  type='tel'
                  className={cn(
                    'p-1 h-7 text-base rounded-md mx-auto text-center font-extrabold text-shadow shadow-inner',
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
          <div className='text-zinc-700 h-full font-semibold flex items-end'>
            game
          </div>
        ),
        cell: ({ row }: any) => (
          <div
            className={cn(
              'text-zinc-300 h-7 flex items-center justify-center border border-emerald-400 font-semibold text-xs  bg-emerald-400/40 text-center rounded-md text-shadow',
              poppins.className
            )}>
            <div className='text-zinc-400 text-xs px-1'>
              {row.original.game}
            </div>
            {/* <pre>{JSON.stringify(row.original, null, 2)}</pre> */}
          </div>
        ),
      },
      {
        accessorKey: 'wager',
        header: ({ column }: any) => (
          // {head.label === 'wager' ? (
          <span className='text-center flex flex-col items-center justify-center'>
            <span className='flex '>
              <input
                type='checkbox'
                {...register('copy')}
                className={cn('mx-1')}
              />

              <div className={cn('text-zinc-700 font-semibold')}>bet</div>
              {/* <pre>{JSON.stringify(column, null, 2)}</pre> */}
            </span>

            <InputCustom
              onInput={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputValue && handleInputValue('copyWager', e)
              }
              {...register('copyWager', {
                pattern: /^[0-9]+$/,
              })}
              suffix={
                <FaRupiahSign
                  size={10}
                  className='text-zinc-400 absolute left-1 svg'
                />
              }
              type='tel'
              className={cn(
                'w-28 h-7 p-.5 pl-5 mx-auto font-semibold placeholder:text-zinc-300 text-xs border border-slate-400 text-zinc-500 rounded-md',
                poppins.className
              )}
              placeholder='bet'
            />
            {/* <div className='pl-1'>bet</div> */}
          </span>
        ),
        cell: ({ row }: any) => (
          <div className='text-zinc-700 border border-zinc-400 rounded-md h-7 px-0 font-semibold w-28'>
            <div className='flex gap-2 items-center  h-7 text-center shadow-inner rounded-md '>
              <InputCustom
                onInput={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputValue && handleInputValue('wager', e, row.index)
                }
                {...register(`sin4ds.${row.index}.wager`, {
                  onChange: (e: ChangeEvent<HTMLInputElement>) =>
                    handleInputChange &&
                    handleInputChange('wager', e, row.index),
                })}
                suffix={
                  <FaRupiahSign
                    size={10}
                    className='text-zinc-400 absolute left-1 svg'
                  />
                }
                type='tel'
                className={cn(
                  'w-28 h-7 p-.5 pl-5 mx-auto font-semibold placeholder:text-zinc-300 text-xs border border-slate-400 text-zinc-500 rounded-md',
                  poppins.className
                )}
              />
              {/* <pre className='z-10000  h-full pt-10'>
                {JSON.stringify(row.original.wager, null, 4)}
              </pre> */}
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'dis',
        header: () => (
          <div className='text-zinc-700 font-semibold w-28  h-full flex items-end justify-center'>
            dis(%)
          </div>
        ),
        cell: ({ row }: any) => {
          return (
            <div className='text-zinc-700 border border-zinc-400 rounded-md h-7 px-0 font-semibold w-full'>
              <div
                className={cn(
                  'flex gap-1 items-center bg-zinc-300/40 h-7 text-center shadow-inner rounded-md',
                  poppins.className
                )}>
                <FaRupiahSign size={10} className='text-zinc-400 ml-1 svg' />
                <span
                  className={cn(
                    'text-left px-0 w-28 text-gray-500 tracking-tight text-xs',
                    poppins.className
                  )}>
                  {row.original.dis === '66%' ? (
                    <div className='flex items-center justify-between '>
                      {(Number(row.original.wager) * 0.66).toFixed()}
                      <span className='flex items-center text-[10px] text-amber-500 pr-1'>
                        (66
                        <Percent size={10} className='svg ' />)
                      </span>
                    </div>
                  ) : row.original.dis === '59%' ? (
                    <div className='flex items-center justify-between '>
                      {(Number(row.original.wager) * 0.59).toFixed()}
                      <span className='flex items-center text-[10px] text-amber-500 pr-1'>
                        (59
                        <Percent size={10} className='svg ' />)
                      </span>
                    </div>
                  ) : row.original.dis === '29%' ? (
                    <div className='flex items-center justify-between '>
                      {(Number(row.original.wager) * 0.29).toFixed()}
                      <span className='flex items-center text-[10px] text-amber-500 pr-1'>
                        (29
                        <Percent size={10} className='svg ' />)
                      </span>
                    </div>
                  ) : (
                    ''
                  )}
                </span>
              </div>
            </div>
          );
        },
        footer: () => (
          <div
            className={cn(
              'text-xs w-28 font-semibold mx-auto text-center pt-2'
            )}>
            Total{' '}
          </div>
        ),
      },

      {
        accessorKey: 'net',
        header: ({ column }: any) => (
          <div className='text-zinc-700 font-semibold w-28  h-full flex items-end justify-center'>
            net
          </div>
        ),
        cell: ({ row }: any) => {
          return (
            <div className='text-zinc-700 border border-zinc-400 rounded-md h-7 px-0 font-semibold w-28'>
              <div
                className={cn(
                  'flex gap-1 items-center bg-zinc-300/40 h-7 text-center shadow-inner rounded-md',
                  poppins.className
                )}>
                <FaRupiahSign size={10} className='text-zinc-400 ml-1 svg' />
                <span
                  className={cn(
                    'text-left px-0 text-gray-500 tracking-wider text-xs',
                    poppins.className
                  )}>
                  {row.original.net}
                </span>
              </div>
            </div>
          );
        },
        footer: (info: any) => {
          const total = info.table
            .getFilteredRowModel()
            .rows.reduce((sum: number, row: any) => {
              console.log('🚀 ~ .rows.reduce ~ row:', row);
              const net = Number(row.original.net);
              return sum + (isNaN(net) ? 0 : net);
            }, 0);
          return (
            <div className='flex justify-center '>
              <div
                className={cn(
                  'w-28 h-7 flex items-center bg-gray-500 gap-1 shadow-inner text-center font-semibold text-xs border border-slate-400 rounded ',
                  poppins.className
                )}>
                <FaRupiahSign size={10} className='text-zinc-400 ml-1 svg' />
                <span className='text-white text-shadow'>
                  {total.toFixed()}
                  {/* <pre>{JSON.stringify(row.original, null, 2)}</pre> */}
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
    [fields.length, handleInputChange, handleInputValue, register, remove]
  );

  return {
    togel4dColumns,
  };
};
