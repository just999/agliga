'use client';

import { ChangeEvent, useEffect, useMemo, useRef } from 'react';

import { InputCustom, Label } from '@/components/ui';
import { shioWithIcon } from '@/lib/helper';
import { cn, poppins, rp, safeParseFloat } from '@/lib/utils';
import { ShioTableSchema } from '@/schemas/togel-schema';
import { Percent } from 'lucide-react';
import {
  Control,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetFocus,
  UseFormWatch,
  useWatch,
} from 'react-hook-form';
import { FaRupiahSign } from 'react-icons/fa6';

type ShioColumnsProps = {};

export const useShioColumns = (
  register: UseFormRegister<ShioTableSchema | any>,
  control: Control<ShioTableSchema | any>,
  watch: UseFormWatch<ShioTableSchema | any>,
  setFocus: UseFormSetFocus<ShioTableSchema>,
  getValues: UseFormGetValues<ShioTableSchema> | any,
  setValue: UseFormGetValues<ShioTableSchema> | any,
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
              )}
            >
              {row.index + 1}.
            </span>
          </div>
        ),
      },
      {
        id: 'shio',
        header: () => (
          <div className='w-33 p-0 m-0 text-zinc-700 font-semibold'>shio</div>
        ),
        size: 80,
        enableResizing: false,
        cell: ({ row }: any) => {
          const filteredShio = shioWithIcon
            .filter((shio, i) => shio.label === row.original.shio)
            .map(({ name, icon: Icon }, i) => (
              <Icon
                key={name}
                size={20}
                className='text-yellow-100 text-lg svg '
              />
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
                'w-33 h-7 gap-2 flex px-2 font-semibold text-xs shadow-lg  border border-orange-700 bg-orange-500 rounded-lg pl-2 text-orange-100 items-center p-0',
                poppins.className
              )}
            >
              <span className='pl-2 flex items-center text-yellow-100 text-shadow gap-2'>
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
                {...register(`shio.${row.index}.wager`, {
                  onChange: (e) => handleInputChange('wager', e, row.index),
                })}
                type='tel'
                placeholder='bet'
                className={cn(
                  'w-28 h-7 text-xs font-semibold pl-5 border border-sky-400 bg-blue-50 rounded-md text-zinc-600 placeholder:text-slate-300',
                  poppins.className
                )}
                defaultValue={getValues(`shio.${row.index}.wager`)}
                suffix={
                  <FaRupiahSign
                    size={12}
                    className='text-zinc-400 absolute left-1'
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
          <div className='text-zinc-700 font-semibold w-28  h-full flex items-center justify-center'>
            <div className='flex items-center text-xs font-semibold'>
              dis (9 <Percent size={10} /> )
            </div>
          </div>
        ),
        cell: ({ row }: any) => {
          const wager = Number(row.original.wager);
          const discount =
            isNaN(wager) || wager === 0 ? '' : ((wager * 9) / 100).toFixed();
          return (
            <div
              className={cn(
                'h-7 text-zinc-700 mx-auto flex items-center justify-between border border-amber-500 gap-x-0.5 text-xs shadow-inner font-semibold w-28 bg-amber-200/40 text-center rounded-md',
                poppins.className
              )}
            >
              <span className='flex items-center text-zinc-400'>
                <FaRupiahSign size={12} className='text-zinc-400 mx-1 ' />
                {discount === '' ? '' : rp.format(Number(discount))}
              </span>
              {discount && (
                <div className='flex items-center text-[10px] text-teal-500 pr-1  '>
                  (-9 <Percent size={10} className='svg' />)
                  {/* <pre>{JSON.stringify(row.original.dis, null, 2)}</pre> */}
                </div>
              )}
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
          <div className='text-zinc-700 font-semibold w-28  h-full flex items-center justify-center'>
            net
          </div>
        ),
        cell: ({ row }: any) => {
          const wager = Number(row.original.wager);
          const net =
            isNaN(wager) || wager === 0
              ? ''
              : (wager * 0.91).toFixed().toString();
          return (
            <div className='relative flex justify-center items-center bg-zinc-300/40 text-zinc-700 border border-zinc-200 rounded-md h-7 px-0 font-semibold w-28 mx-auto'>
              <div
                className={cn(
                  'w-28 h-7 flex items-center gap-1  text-center font-semibold text-xs border border-slate-400 text-zinc-500 rounded',
                  poppins.className
                )}
              >
                <FaRupiahSign size={12} className='text-zinc-400 ml-1' />
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
              }, 0) * 0.91
          )
            .toFixed()
            .toString();
          return (
            <div className='flex justify-center py-1'>
              <div
                className={cn(
                  'w-28 h-7 flex items-center bg-gray-500 gap-1 shadow-inner text-center font-semibold text-xs border border-slate-400 rounded',
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

  return { shioColumns };
};
