'use client';
import { InputCustom, Label } from '@/components/ui';
import { shioWithIcon } from '@/lib/helper';
import { cn, poppins, safeParseFloat } from '@/lib/utils';
import { FiftyFiftyMsKkkTableSchema } from '@/schemas/togel-schema';

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

type FiftyFiftyComboColumnsProps = {};

export const useShioColumns = (
  register: UseFormRegister<FiftyFiftyMsKkkTableSchema | any>,
  control: Control<FiftyFiftyMsKkkTableSchema | any>,
  watch: UseFormWatch<FiftyFiftyMsKkkTableSchema | any>,
  setFocus: UseFormSetFocus<FiftyFiftyMsKkkTableSchema>,
  getValues: UseFormGetValues<FiftyFiftyMsKkkTableSchema> | any,
  setValue: UseFormGetValues<FiftyFiftyMsKkkTableSchema> | any,
  handleInputChange: (field: any, e: any, i: number) => void,
  handleRadioChange: (e: any, rowIndex: number, key: string) => void
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

  const shioValue = useWatch({
    control,
    name: 'shio',
  });

  useEffect(() => {
    inputRefs.current.forEach((input) => {
      if (input) {
        input.focus();
      }
    });
  }, []);

  const shioColumns = useMemo(
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
        id: 'shio',
        header: () => (
          <div className='w-20 p-0 m-0 text-zinc-700 font-semibold'>shio</div>
        ),
        size: 80,
        enableResizing: false,
        cell: ({ row }: any) => {
          const filteredShio = shioWithIcon
            .filter((shio, i) => shio.label === row.original.shio)
            .map(({ name, icon: Icon }, i) => (
              <Icon key={name} size={20} className='text-white text-lg svg ' />
            ))[0];
          let radioGroupItems;
          switch (row.index) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
              <div>{row.original.shio}</div>;
              break;
            default:
              radioGroupItems = null;
          }
          return (
            <div
              className={cn(
                'w-24 h-7 gap-2 flex px-2 font-semibold text-xs shadow-lg  border border-orange-500 bg-amber-500 rounded-lg pl-2 text-yellow-100 items-center p-0',
                poppins.className
              )}>
              <span className='pl-2 flex items-center text-shadow gap-2'>
                {filteredShio} {row.original.shio}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: 'wager',
        header: ({ column }: any) => (
          <div className='flex flex-col gap-1 items-center '>bet</div>
        ),
        cell: ({ row }: any) => {
          return (
            <div className='relative flex justify-center'>
              <InputCustom
                {...register(`shio.${row.index}.wager`)}
                type='tel'
                placeholder='bet'
                className={cn(
                  'w-24 h-7 text-xs font-semibold border border-zinc-400 pl-5 text-zinc-600 placeholder:text-slate-300 bg-indigo-100',
                  poppins.className
                )}
                suffix={
                  <FaRupiahSign
                    size={12}
                    className='text-zinc-400 absolute left-1 svg'
                  />
                }
              />
              {/* <pre>{JSON.stringify(row.original.shio, null, 2)}</pre> */}
            </div>
          );
        },
      },
      {
        accessorKey: 'dis',
        header: ({ column }: any) => (
          <div className='flex items-center justify-center '>
            dis (9 <Percent size={10} /> )
          </div>
        ),
        cell: ({ row }: any) => {
          const wager = Number(row.original.wager);
          const discount =
            isNaN(wager) || wager === 0 ? '' : ((wager * 9) / 100).toFixed();
          return (
            <div className='relative flex justify-center'>
              <div
                className={cn(
                  'w-24 h-7 flex items-center gap-2 text-center font-semibold text-xs border border-rose-200 text-zinc-500 rounded-md bg-violet-100',
                  poppins.className
                )}>
                <FaRupiahSign size={12} className='text-zinc-400 ml-1 svg' />
                {discount}
              </div>
            </div>
          );
        },
        footer: () => (
          <div className='text-xs w-full font-semibold mx-auto text-center'>
            Total
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
          const net =
            isNaN(wager) || wager === 0
              ? ''
              : (wager * 0.91).toFixed().toString();
          return (
            <div className='relative flex justify-center'>
              <div
                className={cn(
                  'w-24 h-7 flex items-center gap-2 text-center font-semibold text-xs border border-slate-400 text-zinc-500 rounded-md bg-teal-100',
                  poppins.className
                )}>
                <FaRupiahSign size={12} className='text-zinc-400 ml-1 svg' />
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
              }, 0) * 0.91;
          return (
            <div className='flex justify-center '>
              <div
                className={cn(
                  'w-24 h-7 flex items-center bg-gray-500 gap-1 shadow-inner text-center font-semibold text-xs border border-slate-400 rounded',
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

  return { shioColumns };
};
