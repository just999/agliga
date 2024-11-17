'use client';

import { type } from 'os';
import { ChangeEvent, useMemo } from 'react';

import { Form4dSetProps } from '@/components/dashboard/members/togels/togel-4d-set';
import {
  TogelDiscount,
  TogelGames4d,
  TogelNetWager,
  TotalNetAmount,
} from '@/components/dashboard/members/togels/togel-games4d';
import { InputCustom } from '@/components/shadcn/ui';
import { cn, oldStandardTT, poppins, safeParseFloat } from '@/lib/utils';
import { Trash2Icon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Control,
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetFocus,
  UseFormWatch,
} from 'react-hook-form';
import { FaRupiahSign } from 'react-icons/fa6';

export const useTogel = (
  register: UseFormRegister<FieldValues | any>,
  control: Control<FieldValues | any>,
  watch: UseFormWatch<FieldValues | any>,
  setFocus: UseFormSetFocus<FieldValues>,
  getValues: UseFormGetValues<FieldValues> | any,
  setValue: UseFormGetValues<FieldValues> | any,
  remove: (i: number) => void,
  handleInputChange?: (field: any, value: any, i: number) => void,
  sin4dSet?: Form4dSetProps[]
) => {
  const router = useRouter();

  const watchAllInputs = watch();

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
        header: () => <div className='text-zinc-300 font-semibold'>No.</div>,
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
        id: 'number',
        header: ({ column }: any) => (
          <div className='text-zinc-700 font-semibold'>Number 4d/3d/2d</div>
        ),
        cell: ({ row }: any) => (
          <div className='flex justify-around w-40'>
            {['d1', 'd2', 'd3', 'd4'].map((key) => (
              <div key={key} className='w-[38px]'>
                <InputCustom
                  onInput={handleOnInput}
                  {...register(`sin4ds.${row.index}.${key}` as const, {
                    onChange: (e: ChangeEvent<HTMLInputElement>) =>
                      handleInputChange &&
                      handleInputChange(key, e.target.value, row.index),
                  })}
                  type='tel'
                  // defaultValue={getValues(`sin4ds.${row.index}.${key}`)}
                  // value={row.original[key as keyof TogelTableColumnsProps] || ''}
                  className={cn(
                    'p-1 h-7 text-base rounded-lg mx-auto text-center font-extrabold text-shadow shadow-inner',
                    oldStandardTT.className
                  )}
                  style={{ width: '38px' }}
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
          <div className='text-zinc-700 font-semibold '>Game</div>
        ),
        cell: ({ row }: any) => (
          // <InputCustom
          //   // disabled
          //   type='text'
          //   {...register(`sin4ds.${row.index}.game`)}
          //   // value={row.original.game || ''}
          //   className={cn(
          //     'w-12 h-7 p-.5 px-2 mx-auto font-semibold text-xs border text-zinc-500 text-center rounded',
          //     poppins.className
          //   )}
          // />
          <TogelGames4d
            getValues={getValues}
            register={register}
            setValue={setValue}
            control={control}
            i={row.index}
            className={cn(
              'w-12 h-7 p-.5 px-2 mx-auto font-semibold text-xs border text-zinc-500 text-center rounded',
              poppins.className
            )}
          />
        ),
      },
      {
        accessorKey: 'wager',
        header: () => (
          // {head.label === 'wager' ? (
          <span className='text-center flex items-center justify-center'>
            <input
              type='checkbox'
              {...register('copy')}
              className={cn('mx-1')}
            />
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
            {<div className='w-20 '>bet</div>}
            {/* <div className='pl-1'>bet</div> */}
          </span>
        ),
        cell: ({ row }: any) => (
          <div className=''>
            <InputCustom
              onInput={handleWagerInput}
              {...register(`sin4ds.${row.index}.wager`, {
                onChange: (e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange &&
                  handleInputChange(`wager`, e.target.value, row.index),
              })}
              suffix={
                <FaRupiahSign
                  size={12}
                  className='text-zinc-300 absolute left-1'
                />
              }
              className={cn(
                'w-32 h-7 p-.5  pl-5 mx-auto font-semibold text-xs border border-slate-400 text-zinc-500 rounded',
                poppins.className
              )}
            />
          </div>
        ),
      },
      {
        accessorKey: 'dis',
        header: () => <div className='p-0 m-0 w-12 '>dis(%)</div>,
        cell: ({ row }: any) => (
          <div className=' '>
            {/* <InputCustom
              onInput={handleOnInput}
              {...register(`sin4ds.${row.index}.dis`)}
              // disabled
              className={cn(
                'w-12 h-7 p-.5 px-2 mx-auto font-semibold text-xs border text-zinc-500 text-center rounded-lg',
                poppins.className
              )}
            /> */}
            <TogelDiscount
              getValues={getValues}
              register={register}
              setValue={setValue}
              control={control}
              i={row.index}
              className={cn(
                'w-12 h-7 p-.5 px-2 mx-auto font-semibold text-xs border text-zinc-500 text-center rounded-lg',
                poppins.className
              )}
            />

            {/* <pre>{JSON.stringify(row.original, null, 2)}</pre> */}
          </div>
        ),
        footer: () => (
          <div className='text-xs w-full font-semibold mx-auto text-center'>
            Total{' '}
          </div>
        ),
      },

      {
        accessorKey: 'net',
        header: () => <div className=''>Net</div>,
        cell: ({ row }: any) => (
          <div className=''>
            {/* <InputCustom
              {...register(`sin4ds.${row.index}.net`, {})}
              // disabled
              suffix={
                <FaRupiahSign
                  size={12}
                  className='text-zinc-300 absolute left-1'
                />
              }
              className={cn(
                'w-32 h-7 p-.5  pl-5 mx-auto font-semibold text-xs border border-slate-400 text-zinc-500 rounded',
                poppins.className
              )}
            /> */}
            <TogelNetWager
              getValues={getValues}
              register={register}
              setValue={setValue}
              control={control}
              i={row.index}
              className={cn(
                'w-32 h-7 p-.5  pl-5 mx-auto font-semibold text-xs border border-slate-400 text-zinc-500 rounded',
                poppins.className
              )}
            />
          </div>
        ),
        footer: () => {
          return (
            <div className='text-nowrap text-zinc-500 text-sm font-bold'>
              <TotalNetAmount
                gameType='togel4d'
                getValues={getValues}
                register={register}
                setValue={setValue}
                control={control}
                className={cn(
                  'w-32 h-7 p-.5  pl-5 mx-auto font-semibold text-xs border border-slate-400 text-zinc-500 rounded',
                  poppins.className
                )}
              />
            </div>
          );
        },
      },
      {
        accessorKey: 'action',
        header: () => <span></span>,
        cell: ({ row }: any) =>
          row.index > 0 && (
            <div className='w-full'>
              <Trash2Icon
                size={20}
                // onClick={() => remove(row.index)}
                className='svg text-rose-600 hover:-translate-y-1 mx-auto  hover:scale-150 hover:svg duration-300  cursor-pointer pl-1'
              />
            </div>
          ),
      },
    ],
    [control, getValues, handleInputChange, register, setValue]
  );

  return {
    togelColumns,
  };
};
