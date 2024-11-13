'use client';

import { cn, poppins, rp } from '@/lib/utils';
import { ColokBebasTableSchema } from '@/schemas/togel-schema';

import { InputCustom } from '@/components/ui';
import { oldStandardTT } from '@/lib/utils';
import { Percent } from 'lucide-react';
import { useMemo } from 'react';
import {
  Control,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetFocus,
  UseFormWatch,
} from 'react-hook-form';
import { FaRupiahSign } from 'react-icons/fa6';

type ColokBebasColumnsProps = {};

export const useColokBebasColumns = (
  register: UseFormRegister<ColokBebasTableSchema | any>,
  control: Control<ColokBebasTableSchema | any>,
  watch: UseFormWatch<ColokBebasTableSchema | any>,
  setFocus: UseFormSetFocus<ColokBebasTableSchema>,
  getValues: UseFormGetValues<ColokBebasTableSchema> | any,
  setValue: UseFormGetValues<ColokBebasTableSchema> | any,
  handleInputChange: (field: any, value: any, i: number) => void
) => {
  const cbColumns = useMemo(
    () => [
      {
        accessorKey: 'index',
        header: ({}) => (
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
          <div className='text-zinc-700 mx-auto font-semibold w-12'>nomor</div>
        ),
        size: 48,
        cell: ({ row }: any) => (
          <div
            className={cn(
              'w-12 h-7 text-base flex items-center justify-center border border-emerald-500 rounded-md font-extrabold text-shadow shadow-inner text-emerald-700 bg-emerald-100 ',
              oldStandardTT.className
            )}>
            {/* <InputCustom
                  disabled
                  {...register(`cl.${row.index}.d1`)}
                  defaultValue={row.index}
                  className='w-8 '
                /> */}
            {row.original.d1}
          </div>
        ),
      },
      {
        accessorKey: 'wager',
        header: 'bet',
        cell: ({ row }: any) => (
          <div className='relative  flex justify-center text-zinc-700 border border-zinc-400 rounded-md h-7 px-0 font-semibold w-28 '>
            <InputCustom
              {...register(`cb.${row.index}.wager`)}
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
            />
          </div>
        ),
      },
      {
        accessorKey: 'dis',
        header: ({ column }: any) => (
          <div className='flex items-center justify-center '>
            dis (5 <Percent size={12} /> )
          </div>
        ),
        cell: ({ row }: any) => {
          const wager = Number(row.original.wager);

          const discount =
            isNaN(wager) || wager === 0 ? '' : (wager * 0.05).toFixed();
          return (
            // <div className='relative flex justify-center'>
            <div
              className={cn(
                'h-7 text-zinc-700 mx-auto flex items-center justify-between border border-amber-500 gap-x-0.5 text-xs shadow-inner font-semibold w-28 bg-amber-200/40 text-center rounded-md',
                poppins.className
              )}>
              <span className='flex items-center text-zinc-400 '>
                <FaRupiahSign size={12} className='text-zinc-300  mx-1' />
                {/* {row.original.wager === ''
                    ? ''
                    : (Number(row.original.wager) * (5 / 100)).toFixed()} */}
                {discount === '' ? '' : rp.format(Number(discount))}
              </span>
              {discount && (
                <div className='flex items-center text-[10px] text-amber-500 pr-1  '>
                  (5 <Percent size={10} className='svg' />)
                  {/* <pre>{JSON.stringify(row.original.dis, null, 2)}</pre> */}
                </div>
              )}
            </div>
            // </div>
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
          const wager = row.original.wager;
          const netValue = (Number(wager) * 0.95).toFixed();
          return (
            <div className='relative flex justify-center items-center bg-zinc-300/40 text-zinc-700 border border-zinc-200 rounded-md h-7 px-0 font-semibold w-28 mx-auto'>
              <div
                className={cn(
                  'w-28 h-7 flex items-center gap-1  text-center font-semibold text-xs border border-slate-400 text-zinc-500 rounded',
                  poppins.className
                )}>
                <FaRupiahSign size={12} className='text-zinc-300  ml-1' />
                {row.original.wager === '' ? '' : rp.format(Number(netValue))}
              </div>
            </div>
          );
        },
        footer: (info: any) => {
          const total = (
            info.table
              .getFilteredRowModel()
              .rows.reduce(
                (sum: number, row: any) => sum + Number(row.original.wager),
                0
              ) *
            (95 / 100)
          )
            .toFixed()
            .toString();
          return (
            <div className='flex justify-center py-2'>
              <div
                className={cn(
                  'w-28 h-7 flex items-center bg-gray-500 gap-1 shadow-inner text-center font-semibold text-xs border border-slate-400 rounded',
                  poppins.className
                )}>
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
    [register]
  );

  return {
    cbColumns,
  };
};
