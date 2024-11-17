'use client';

import { ChangeEvent, useEffect, useMemo, useRef } from 'react';

import { InputCustom } from '@/components/shadcn/ui';
import { positionVal } from '@/lib/helper';
import {
  arrayRange,
  cn,
  oldStandardTT,
  poppins,
  rp,
  safeParseFloat,
} from '@/lib/utils';
import { ColokJituTableSchema } from '@/schemas/togel-schema';
import { ChevronDownCircle, Percent } from 'lucide-react';
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
  const filteredCjValue = cjValue.filter(
    (val: any) => val.d1 !== '' && val.d2 !== '' && val.wager !== ''
  );
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
        header: ({}) => (
          <div className='w-7 text-zinc-700 h-full font-semibold flex items-end justify-center'>
            no.
          </div>
        ),
        cell: ({ row }: any) => (
          <div className='flex flex-row justify-center p-0'>
            <span
              className={cn(
                'p-0 m-0 text-zinc-300 font-semibold',
                poppins.className
              )}
            >
              {row.index + 1}.
            </span>
          </div>
        ),
      },
      {
        accessorKey: 'd1',
        header: () => (
          <div className='w-8 h-full p-0 m-0 mx-auto text-zinc-700 font-semibold flex items-end justify-center'>
            nomor
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
                'w-12 h-7 pt-0.5 pr-1 font-semibold rounded-md text-base text-shadow flex items-center justify-center appearance-none  text-gray-500 cursor-pointer group-hover:bg-amber-100/70 bg-violet-100 border border-violet-300',
                oldStandardTT.className
              )}
            >
              <option value=''></option>
              {arrayRange(0, 9, 1).map((_, i: number) => (
                <option
                  key={i}
                  value={i.toString()}
                  className={cn(
                    'w-12 h-7 flex items-center justify-center text-sm font-semibold text-center',
                    poppins.className
                  )}
                >
                  {i.toString()}
                </option>
              ))}
            </select>
            <ChevronDownCircle
              size={14}
              className={cn(
                'absolute right-1 text-violet-500 svg group-hover:text-orange-700',
                getValues(`cj.${row.index}.d1`) !== '' && 'hidden'
              )}
            />
          </div>
        ),
      },

      {
        accessorKey: 'position',
        header: () => (
          <div className='w-8 h-full p-0 m-0 mx-auto text-zinc-700 font-semibold flex items-end justify-center'>
            pos
          </div>
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
                'w-20 h-7 font-normal rounded-md text-sm text-shadow flex items-center justify-center align-middle appearance-none bg-teal-100 border border-teal-300',
                poppins.className
              )}
            >
              <option value=''></option>
              {positionVal.map((pos, i: number) => (
                <option
                  key={i}
                  value={pos}
                  className={cn(
                    'text-sm font-normal text-center',
                    poppins.className
                  )}
                >
                  {pos}
                </option>
              ))}
            </select>
            <ChevronDownCircle
              size={14}
              className={cn(
                'absolute right-1 text-teal-500 svg hover:text-orange-700 ',
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
              className='w-30 h-7 pl-5 border border-zinc-300 text-xs text-zinc-600 placeholder:text-slate-300 placeholder:pl-2'
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
            <div className='relative  flex justify-center text-zinc-700  rounded-md h-7 px-0 font-semibold w-full '>
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
                  'w-30 h-7 text-xs font-semibold pl-5 border border-zinc-400 text-zinc-600 placeholder:text-slate-300',
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
          <div className='text-zinc-700 font-semibold w-30 h-full flex items-end justify-center'>
            <div className='flex items-center text-xs font-semibold'>
              dis (6 <Percent size={10} /> )
            </div>
          </div>
        ),
        cell: ({ row }: any) => {
          const wager = Number(row.original.wager);
          const discount =
            isNaN(wager) || wager === 0 ? '' : (wager * 0.06).toFixed();
          return (
            <div
              className={cn(
                'h-7 text-zinc-700 mx-auto flex items-center justify-between border border-amber-500 gap-x-0.5 text-xs shadow-inner font-semibold w-30 bg-amber-200/40 text-center rounded-md',
                poppins.className
              )}
            >
              <span className='flex items-center text-zinc-400'>
                <FaRupiahSign size={12} className='text-zinc-300  mx-1' />
                {/* {row.original.wager === ''
                  ? ''
                  : (Number(row.original.wager) * (10 / 100)).toFixed()} */}
                {discount === '' ? '' : rp.format(Number(discount))}
              </span>
              {discount && (
                <div className='flex items-center text-[10px] text-amber-500 pr-1  '>
                  (6 <Percent size={10} className='svg' />)
                  {/* <pre>{JSON.stringify(row.original.dis, null, 2)}</pre> */}
                </div>
              )}
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
          <div className='text-zinc-700 font-semibold w-30  h-full flex items-end justify-center'>
            net
          </div>
        ),
        cell: ({ row }: any) => {
          const wager = Number(row.original.wager);
          const net =
            isNaN(wager) || wager === 0
              ? ''
              : (wager * 0.94).toFixed().toString();
          return (
            <div className='relative flex justify-center items-center bg-zinc-300/40 text-zinc-700 border border-zinc-200 rounded-md h-7 px-0 font-semibold w-30 mx-auto'>
              <div
                className={cn(
                  'w-30 h-7 flex items-center gap-1  text-center font-semibold text-xs border border-slate-400 text-zinc-500 rounded',
                  poppins.className
                )}
              >
                <FaRupiahSign size={12} className='text-zinc-300  ml-1' />
                {/* {row.original.wager === ''
                  ? ''
                  : (Number(row.original.wager) * (90 / 100)).toFixed()} */}
                {net === '' ? '' : rp.format(Number(net))}
              </div>
            </div>
          );
        },
        footer: (info: any) => {
          const total = (
            info.table
              .getFilteredRowModel()
              .rows.reduce((sum: number, row: any) => {
                const wager = Number(row.original.wager);
                return sum + (isNaN(wager) ? 0 : wager);
              }, 0) * 0.94
          )
            .toFixed()
            .toString();

          return (
            <div className='flex justify-center py-1'>
              <div
                className={cn(
                  'w-30 h-7 flex items-center bg-gray-500 gap-1 shadow-inner text-center font-semibold text-xs border border-slate-400 rounded',
                  poppins.className
                )}
              >
                <FaRupiahSign size={12} className='text-zinc-400 ml-1 svg' />
                <span className='text-white text-shadow'>
                  {rp.format(Number(total))}
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
