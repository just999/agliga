'use client';

import {
  InputCustom,
  Label,
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui';

import {
  arrayRange,
  cn,
  oldStandardTT,
  poppins,
  rp,
  safeParseFloat,
} from '@/lib/utils';
import {
  FiftyFiftyOeBsTableSchema,
  FiftyFiftyTableSchema,
} from '@/schemas/togel-schema';

import { Percent } from 'lucide-react';

import { ChangeEvent, useEffect, useMemo, useRef } from 'react';
import {
  Control,
  Controller,
  useForm,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetFocus,
  UseFormWatch,
  useWatch,
} from 'react-hook-form';
import { FaRupiahSign } from 'react-icons/fa6';

type FiftyFiftySpecialColumnsProps = {};

export const FiftyFiftySpecialColumns = (
  register: UseFormRegister<FiftyFiftyOeBsTableSchema | any>,
  control: Control<FiftyFiftyOeBsTableSchema | any>,
  watch: UseFormWatch<FiftyFiftyOeBsTableSchema | any>,
  setFocus: UseFormSetFocus<FiftyFiftyOeBsTableSchema>,
  getValues: UseFormGetValues<FiftyFiftyOeBsTableSchema> | any,
  setValue: UseFormGetValues<FiftyFiftyOeBsTableSchema> | any,
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

  // const { register, handleSubmit, watch, control } = useForm();

  const ffSpValue = useWatch({
    control,
    name: 'ffSp',
  });

  useEffect(() => {
    inputRefs.current.forEach((input) => {
      if (input) {
        input.focus();
      }
    });
  }, []);

  const renderRadioGroup = (row: any, type: string) => {
    const values = type === 'bigSmall' ? ['big', 'small'] : ['odd', 'even'];
    const labels =
      type === 'bigSmall' ? ['Besar', 'Kecil'] : ['Ganjil', 'Genap'];

    return (
      <div className='flex flex-col items-start w-full'>
        <span className='flex gap-0'>
          {values.map((value, index) => (
            <div
              key={value}
              className={cn(
                'flex w-20 items-center space-x-2 px-2 py-0 rounded-md shadow-md hover:bg-amber-400 hover:text-white cursor-pointer',
                getValues(`ffSp.${row.index}.bigSmall`) === value
                  ? 'bg-cyan-500 w-20 h-7 text-yellow-100 hover:bg-cyan-500/70  border border-cyan-600'
                  : getValues(`ffSp.${row.index}.oddEven`) === value
                  ? 'bg-fuchsia-500 w-20 h-7 text-yellow-100 hover:bg-fuchsia-500/70   border border-fuchsia-600'
                  : 'bg-transparent text-gray-500  border border-zinc-400'
              )}>
              <Label
                className={cn(
                  'text-sm gap-1 w-20 h-7 flex items-center justify-center font-semibold px-1 cursor-pointer',
                  poppins.className
                )}>
                <input
                  {...register(`ffSp.${row.index}.${type}`)}
                  type='radio'
                  value={value}
                  className='hidden'
                />
                <span className='text-shadow text-xs'>{labels[index]}</span>
              </Label>
            </div>
          ))}
        </span>
      </div>
    );
  };

  const ffSpColumns = useMemo(
    () => [
      {
        accessorKey: 'index',
        header: ({}) => (
          <div className='w-7 text-zinc-700 h-full font-semibold flex items-center justify-center'>
            No.
          </div>
        ),
        cell: ({ row }: any) => (
          <div className='w-7 flex flex-row justify-center p-0'>
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
        id: 'suit',
        header: () => (
          <div className='w-16 p-0 m-0 text-zinc-700 font-semibold'>suits</div>
        ),
        size: 80,
        enableResizing: false,
        cell: ({ row }: any) => {
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
              <div>{row.original.suit}</div>;
            default:
              radioGroupItems = null;
          }
          return (
            <div
              className={cn(
                'w-16 border text-xs shadow-inner font-semibold text-shadow text-yellow-100 h-7 gap-.5 flex justify-center bg-amber-600 items-center rounded-lg p-0',
                row.index < 4
                  ? 'bg-orange-500   border border-orange-600'
                  : 'bg-rose-500   border border-red-600',
                poppins.className
              )}>
              {row.original.suit}
            </div>
          );
        },
      },
      {
        id: 'oddEvenBigSmall',
        header: () => (
          <div className='w-40 p-0 m-0 text-zinc-700 font-semibold'>
            genap/ganjil-besar/kecil
          </div>
        ),
        size: 80,
        enableResizing: false,
        cell: ({ row }: any) => {
          let radioGroupItems;
          switch (row.index) {
            case 0:
            case 1:
            case 2:
            case 3:
              // radioGroupItems = (
              //   <div className='flex  flex-col items-start w-full'>
              //     <span className='flex gap-0 '>
              //       <div
              //         className={cn(
              //           'flex w-20 items-center space-x-2  px-2 py-0 rounded-md hover:bg-sky-200 cursor-pointer',
              //           getValues(`ffSp.${row.index}.oddEven`) === 'odd'
              //             ? 'bg-fuchsia-500 w-20 h-7 text-white'
              //             : 'text-muted-foreground'
              //         )}>
              //         <Label
              //           className={cn(
              //             'text-sm gap-1 w-20 h-7 flex items-center justify-center font-semibold px-1 cursor-pointer',
              //             poppins.className
              //           )}>
              //           <input
              //             {...register(`ffSp.${row.index}.oddEven`)}
              //             type='radio'
              //             value={'odd'}
              //             className={cn('hidden')}
              //           />{' '}
              //           <span className='text-shadow text-xs'>Ganjil</span>
              //         </Label>
              //       </div>
              //       <div
              //         className={cn(
              //           'flex w-20 items-center space-x-2 px-2 py-0 rounded-md hover:bg-sky-200 cursor-pointer',
              //           getValues(`ffSp.${row.index}.oddEven`) === 'even'
              //             ? 'bg-fuchsia-500 w-20 h-7 text-white'
              //             : 'text-muted-foreground'
              //         )}>
              //         <Label
              //           className={cn(
              //             'text-sm gap-1 w-20 h-7 flex items-center justify-center font-semibold px-1 cursor-pointer',
              //             poppins.className
              //           )}>
              //           <input
              //             {...register(`ffSp.${row.index}.oddEven`)}
              //             type='radio'
              //             value={'even'}
              //             className='hidden'
              //           />{' '}
              //           <span className='text-shadow text-xs '>Genap</span>
              //         </Label>
              //       </div>
              //     </span>
              //   </div>
              // );
              radioGroupItems = renderRadioGroup(row, 'oddEven');
              break;
            case 4:
            case 5:
            case 6:
            case 7:
              // radioGroupItems = (
              //   <div className='flex  flex-col items-start w-full'>
              //     <span className='flex gap-0 '>
              //       <div
              //         className={cn(
              //           'flex w-20 items-center space-x-2 px-2 py-0 rounded-md hover:bg-blue-200 cursor-pointer',
              //           getValues(`ffSp.${row.index}.bigSmall`) === 'big'
              //             ? 'bg-cyan-500 w-20 h-7 text-white'
              //             : 'text-muted-foreground'
              //         )}>
              //         <Label
              //           className={cn(
              //             'text-sm gap-1 w-20 h-7 flex items-center justify-center  font-semibold px-1 cursor-pointer',
              //             poppins.className
              //           )}>
              //           <input
              //             {...register(`ffSp.${row.index}.bigSmall`)}
              //             type='radio'
              //             value={'big'}
              //             className='hidden'
              //           />{' '}
              //           <span className='text-shadow text-xs '>Besar</span>
              //         </Label>
              //       </div>
              //       <div
              //         className={cn(
              //           'flex w-20  items-center space-x-2 px-2 py-0 rounded-md hover:bg-sky-200 cursor-pointer',
              //           getValues(`ffSp.${row.index}.bigSmall`) === 'small'
              //             ? 'bg-cyan-500 w-20 h-7 text-white'
              //             : 'text-muted-foreground'
              //         )}>
              //         <Label
              //           className={cn(
              //             'text-sm gap-1 w-20 h-7 flex items-center justify-center font-semibold px-1 cursor-pointer',
              //             poppins.className
              //           )}>
              //           <input
              //             {...register(`ffSp.${row.index}.bigSmall`)}
              //             type='radio'
              //             value={'small'}
              //             className='hidden'
              //           />{' '}
              //           <span className='text-shadow text-xs'>kecil</span>
              //         </Label>
              //       </div>
              //     </span>
              //   </div>
              // );
              radioGroupItems = renderRadioGroup(row, 'bigSmall');
              break;

            default:
              radioGroupItems = null;
          }
          return (
            <div className='w-40 h-7 gap-.5 flex justify-center items-center p-0 '>
              {' '}
              {radioGroupItems}{' '}
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
                {...register(`ffSp.${row.index}.wager`)}
                type='tel'
                placeholder='bet'
                className={cn(
                  'w-24 h-7 text-xs font-semibold border border-zinc-400 rounded-md pl-5 text-zinc-600 placeholder:text-slate-300',
                  poppins.className
                )}
                suffix={
                  <FaRupiahSign
                    size={12}
                    className='text-zinc-400 absolute left-1'
                  />
                }
              />
              {/* <pre>{JSON.stringify(row.original.suit, null, 2)}</pre> */}
            </div>
          );
        },
      },
      {
        accessorKey: 'dis',
        header: ({ column }: any) => (
          <div className='text-zinc-700 font-semibold w-28  h-full flex items-center justify-center'>
            <div className='flex items-center text-xs font-semibold'>
              kei (2 <Percent size={12} /> )
            </div>
          </div>
        ),
        cell: ({ row }: any) => {
          const wager = Number(row.original.wager);
          const discount =
            isNaN(wager) || wager === 0
              ? ''
              : (-wager * 0.02).toFixed().toString();
          return (
            <div
              className={cn(
                'h-7 text-zinc-700 mx-auto flex items-center justify-between border border-amber-500 gap-x-0.5 text-xs shadow-inner font-semibold w-28 bg-amber-200/40 text-center rounded-md',
                poppins.className
              )}>
              <span className='flex items-center text-zinc-400'>
                <FaRupiahSign size={12} className='text-zinc-400 ml-1' />
                {discount === '' ? '' : rp.format(Number(discount))}
              </span>
              {discount && (
                <div className='flex items-center text-[10px] text-amber-500 pr-1  '>
                  -(2 <Percent size={10} className='svg' />)
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
          <div className='text-zinc-700 font-semibold w-24  h-full flex items-center justify-center'>
            net
          </div>
        ),
        cell: ({ row }: any) => {
          const wager = Number(row.original.wager);
          const net =
            isNaN(wager) || wager === 0
              ? ''
              : (wager * 1.02).toFixed().toString();
          return (
            <div className='relative flex justify-center items-center bg-zinc-300/40 text-zinc-700 border border-zinc-200 rounded-md h-7 px-0 font-semibold w-24 mx-auto'>
              <div
                className={cn(
                  'w-24 h-7 flex items-center gap-1  text-center font-semibold text-xs border border-slate-400 text-zinc-500 rounded',
                  poppins.className
                )}>
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
              }, 0) * 1.02
          )
            .toFixed()
            .toString();
          return (
            <div className='flex justify-center py-1'>
              <div
                className={cn(
                  'w-24 h-7 flex items-center bg-gray-500 gap-1 shadow-inner text-center font-semibold text-xs border border-slate-400 rounded',
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return {
    ffSpColumns,
  };
};
