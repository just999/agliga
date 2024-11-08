'use client';

import { InputCustom } from '@/components/ui';
import { positionVal } from '@/lib/helper';
import {
  arrayRange,
  cn,
  oldStandardTT,
  poppins,
  safeParseFloat,
} from '@/lib/utils';
import { ColokJituTableSchema } from '@/schemas/togel-schema';
import { ChevronDown, ChevronDownCircle, Percent } from 'lucide-react';
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

type useColokJituColumnsProps = {};

export const useColokJituColumns = (
  register: UseFormRegister<ColokJituTableSchema | any>,
  control: Control<ColokJituTableSchema | any>,
  watch: UseFormWatch<ColokJituTableSchema | any>,
  setFocus: UseFormSetFocus<ColokJituTableSchema>,
  getValues: UseFormGetValues<ColokJituTableSchema> | any,
  setValue: UseFormGetValues<ColokJituTableSchema> | any,
  handleInputChange: (field: any, e: any, i: number) => void,
  handleSelectChange: (e: any, rowIndex: number, key: string) => void
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

  const cjValue = useWatch({
    control,
    name: 'cj',
  });
  // console.log('🚀 ~ cjValue:', cjValue);

  const filteredCjValue = cjValue.filter(
    (val: any) => val.d1 !== '' && val.d2 !== '' && val.wager !== ''
  );
  // console.log('🚀 ~ filteredCjValue:', filteredCjValue);

  useEffect(() => {
    inputRefs.current.forEach((input) => {
      if (input) {
        input.focus();
      }
    });
  }, []);

  const cjColumns = useMemo(
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
      {
        accessorKey: 'd1',
        header: () => (
          <div className='w-8 p-0 m-0 mx-auto text-zinc-700 font-semibold'>
            no
          </div>
        ),
        size: 48,
        enableResizing: false,
        cell: ({ row }: any) => (
          <div className='w-12 h-7 group gap-.5 flex items-center justify-between p-0 border border-orange-200 rounded-lg relative'>
            <select
              {...register(`cj.${row.index}.d1`, {
                onChange: (e) => handleSelectChange(e, row.index, 'd1'),
              })}
              className={cn(
                'w-12 h-7 pt-0.5 pr-1 font-semibold border border-orange-300 rounded-md text-base text-shadow flex items-center justify-center appearance-none bg-amber-100 text-gray-500 cursor-pointer group-hover:bg-amber-100/70',
                oldStandardTT.className
              )}>
              <option value=''></option>
              {arrayRange(0, 9, 1).map((_, i: number) => (
                <option
                  key={i}
                  value={i.toString()}
                  className={cn(
                    'w-12 h-7 flex items-center justify-center text-sm font-semibold text-center',
                    poppins.className
                  )}>
                  {i.toString()}
                </option>
              ))}
            </select>
            <ChevronDownCircle
              size={14}
              className={cn(
                'absolute right-1 text-gray-500 svg group-hover:text-orange-700',
                getValues(`cj.${row.index}.d1`) !== '' && 'hidden'
              )}
            />
          </div>
        ),
      },

      {
        accessorKey: 'position',
        header: () => (
          <div className='w-20 p-0 m-0 text-zinc-700 font-semibold'>pos</div>
        ),
        size: 80,
        enableResizing: false,
        cell: ({ row }: any) => (
          <div className='w-20 h-7 gap-.5 flex items-center justify-between p-0 border border-orange-200 rounded-lg relative'>
            <select
              {...register(`cj.${row.index}.position`, {
                onChange: (e) => handleSelectChange(e, row.index, 'position'),
              })}
              className={cn(
                'w-20 h-7 font-semibold border border-orange-300 rounded-md text-sm text-shadow flex items-center justify-center align-middle appearance-none ',
                poppins.className
              )}>
              <option value=''></option>
              {positionVal.map((pos, i: number) => (
                <option
                  key={i}
                  value={pos}
                  className={cn(
                    'text-sm font-semibold text-center',
                    poppins.className
                  )}>
                  {pos}
                </option>
              ))}
            </select>
            <ChevronDownCircle
              size={14}
              className={cn(
                'absolute right-1 text-gray-500 svg hover:text-orange-700 ',
                getValues(`cj.${row.index}.position`) !== '' && 'hidden'
              )}
            />
          </div>
        ),
      },
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
          const d1Value = getValues('cj')?.[row.index]?.d1;
          const posValue = getValues('cj')?.[row.index]?.position;

          const isDisabled = !d1Value || !posValue;

          return (
            <div className='relative  flex justify-center '>
              <InputCustom
                {...register(`cj.${row.index}.wager`, {
                  onChange: (e: ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(`cj.${row.index}.wager`, e, row.index),
                  disabled: isDisabled,
                })}
                // disabled={
                //   !cjValue?.[row.index]?.d1 || !cjValue?.[row.index]?.d2
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
            dis (6 <Percent size={12} /> )
          </div>
        ),
        cell: ({ row }: any) => {
          const wager = Number(row.original.wager);
          // console.log('🚀 ~ wager:', wager);
          const discount =
            isNaN(wager) || wager === 0 ? '' : (wager * 0.06).toFixed();
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
              : (wager * 0.94).toFixed().toString();
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
              }, 0) * 0.94;

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
    cjColumns,
  };
};
