'use client';

import {
  arrayRange,
  cn,
  oldStandardTT,
  poppins,
  safeParseFloat,
} from '@/lib/utils';
import { ColokBebasTableSchema } from '@/schemas/togel-schema';

import { InputCustom } from '@/components/ui';
import { ChevronDownCircle, Percent } from 'lucide-react';
import { ChangeEvent, useEffect, useMemo, useRef } from 'react';
import {
  Control,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetFocus,
  UseFormWatch,
  useWatch,
} from 'react-hook-form';
import { FaRupiahSign } from 'react-icons/fa6';

type ColokBebasColumnsProps = {};

export const useColokMacauColumns = (
  register: UseFormRegister<ColokBebasTableSchema | any>,
  control: Control<ColokBebasTableSchema | any>,
  watch: UseFormWatch<ColokBebasTableSchema | any>,
  setFocus: UseFormSetFocus<ColokBebasTableSchema>,
  getValues: UseFormGetValues<ColokBebasTableSchema> | any,
  setValue: UseFormGetValues<ColokBebasTableSchema> | any,
  handleInputChange: (field: any, e: any, i: number) => void,
  handleSelectChange: (e: any, rowIndex: number, key: string) => void,
  isOptionDisabled: (i: any, rowIndex: number, key: string) => boolean
) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const handleWagerInput = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    e.target.value = safeParseFloat(
      Math.max(0, parseInt(e.target.value)).toString().slice(0, 6)
    ).toString();
    inputRefs.current[index] = e.target;
  };

  const cmValue = useWatch({
    control,
    name: 'cm',
  });
  // console.log('🚀 ~ cmValue:', cmValue);

  const filteredCmValue = cmValue.filter(
    (val: any) => val.d1 !== '' && val.d2 !== '' && val.wager !== ''
  );
  // console.log('🚀 ~ filteredCmValue:', filteredCmValue);

  useEffect(() => {
    inputRefs.current.forEach((input) => {
      if (input) {
        input.focus();
      }
    });
  }, []);

  // console.log('🚀 ~ inputRefs:', inputRefs);
  const cmColumns = useMemo(
    () => [
      {
        accessorKey: 'index',
        header: ({}) => <div>No.</div>,
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
      ...['d1', 'd2'].map((key, index) => ({
        accessorKey: key,
        header: () => (
          <div className='w-8 p-0 m-0 mx-auto text-zinc-700 font-semibold'>
            {key}
          </div>
        ),
        size: 32,
        enableResizing: false,
        cell: ({ row }: any) => (
          <div className='w-12 h-7 gap-.5 flex flex-row items-center justify-center p-0 border border-orange-200 rounded-lg relative'>
            <select
              {...register(`cm.${row.index}.${key}`, {
                onChange: (e) => handleSelectChange(e, row.index, key),
              })}
              className={cn(
                'w-12 h-7 font-semibold border border-orange-300 rounded-md text-base text-shadow flex items-center justify-center align-middle appearance-none bg-amber-100 text-gray-500 cursor-pointer group-hover:bg-amber-100/70',
                oldStandardTT.className
              )}>
              {arrayRange(0, 9, 1).map((_, i: number) => (
                <option
                  key={i}
                  value={i.toString()}
                  disabled={isOptionDisabled(i, row.index, key)}
                  className={cn(
                    'text-sm text-center',
                    oldStandardTT.className
                  )}>
                  {i.toString()}
                </option>
              ))}
            </select>
            <ChevronDownCircle
              size={14}
              className={cn(
                'absolute right-1 text-gray-500 svg group-hover:text-orange-700',
                getValues(`cm.${row.index}.${key}`) !== '' && 'hidden'
              )}
            />
          </div>
        ),
      })),
      {
        accessorKey: 'wager',
        header: ({ column }: any) => (
          <div className='flex flex-col gap-1 items-center '>
            <div className='flex '>
              <input type='checkbox' {...register('copy')} className='mx-1' />
              <div className='pl-1 shadow-inner bg-slate-100/50'>all bet</div>
            </div>
            <InputCustom
              {...register('copyWager', {
                onChange: (e) => handleWagerInput(e, -1),
                pattern: /^[0-9]+$/,
              })}
              type='tel'
              // onInput={(e) => handleWagerInput(e, -1)}
              className='w-28 h-7 pl-5 text-zinc-600 placeholder:text-slate-300 placeholder:pl-2'
              placeholder='bet all'
              suffix={
                <FaRupiahSign
                  size={12}
                  className='text-zinc-300 absolute left-1'
                />
              }
            />
          </div>
        ),
        cell: ({ row }: any) => {
          const d1Value = getValues('cm')?.[row.index]?.d1;
          const d2Value = getValues('cm')?.[row.index]?.d2;
          const isDisabled = !d1Value || !d2Value;
          // console.log('🚀 ~ isDisabled:', isDisabled);

          // console.log('🚀 ~ d1Value:', getValues('cm')?.[row.index]?.d1);

          return (
            <div className='relative  flex justify-center '>
              <InputCustom
                {...register(`cm.${row.index}.wager`, {
                  onChange: (e: ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(`cm.${row.index}.wager`, e, row.index),
                  disabled: isDisabled,
                })}
                // disabled={
                //   !cmValue?.[row.index]?.d1 || !cmValue?.[row.index]?.d2
                // }
                type='tel'
                placeholder='bet'
                className={cn(
                  'w-28 h-7 text-xs font-semibold pl-5 text-zinc-600 placeholder:text-slate-300',
                  poppins.className
                )}
                suffix={
                  <FaRupiahSign
                    size={12}
                    className='text-zinc-300 absolute left-1'
                  />
                }
                // ref={(el: any) => (inputRefs.current[row.index] = el)}
              />
            </div>
          );
        },
      },
      {
        accessorKey: 'dis',
        header: ({ column }: any) => (
          <div className='flex items-center justify-center '>
            dis (10 <Percent size={12} /> )
          </div>
        ),
        cell: ({ row }: any) => {
          const wager = Number(row.original.wager);
          // console.log('🚀 ~ wager:', wager);
          const discount =
            isNaN(wager) || wager === 0 ? '' : (wager * 0.1).toFixed();
          return (
            <div className='relative flex justify-center'>
              <div
                className={cn(
                  'w-28 h-7 flex items-center gap-2  text-center font-semibold text-xs border border-slate-400 text-zinc-500 rounded',
                  poppins.className
                )}>
                <FaRupiahSign size={12} className='text-zinc-300  ml-1' />
                {/* {row.original.wager === ''
                  ? ''
                  : (Number(row.original.wager) * (10 / 100)).toFixed()} */}
                {discount}
              </div>
              {row.original.dis}
            </div>
          );
        },
        footer: () => (
          <div className='text-xs w-full font-semibold mx-auto text-center'>
            Total{' '}
          </div>
        ),
      },
      {
        accessorKey: 'net',
        header: ({ column }: any) => (
          <div className='flex items-center justify-center '>net</div>
        ),
        cell: ({ row }: any) => {
          const wager = Number(row.original.wager);
          // console.log('🚀 ~ wager:', wager);
          const net =
            isNaN(wager) || wager === 0
              ? ''
              : (wager * 0.9).toFixed().toString();
          return (
            <div className='relative flex justify-center'>
              <div
                className={cn(
                  'w-28 h-7 flex items-center gap-2  text-center font-semibold text-xs border border-slate-400 text-zinc-500 rounded',
                  poppins.className
                )}>
                <FaRupiahSign size={12} className='text-zinc-300  ml-1' />
                {/* {row.original.wager === ''
                  ? ''
                  : (Number(row.original.wager) * (90 / 100)).toFixed()} */}
                {net}
              </div>
            </div>
          );
        },
        footer: (info: any) => {
          const total =
            info.table
              .getFilteredRowModel()
              .rows.reduce((sum: number, row: any) => {
                const wager = Number(row.original.wager);
                return sum + (isNaN(wager) ? 0 : wager);
              }, 0) * 0.9;
          return (
            <div className='flex justify-center '>
              <div
                className={cn(
                  'w-28 h-7 flex items-center bg-gray-500 gap-1 shadow-inner text-center font-semibold text-xs border border-slate-400 rounded',
                  poppins.className
                )}>
                <FaRupiahSign size={12} className='text-zinc-400 ml-1 svg' />
                <span className='text-white text-shadow'>
                  {total.toFixed().toString()}
                </span>
              </div>
            </div>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return {
    cmColumns,
  };
};
