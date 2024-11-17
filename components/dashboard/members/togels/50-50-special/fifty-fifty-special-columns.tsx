'use client';

import { ChangeEvent, useEffect, useMemo, useRef } from 'react';

import {
  InputCustom,
  Label,
  RadioGroup,
  RadioGroupItem,
} from '@/components/shadcn/ui';
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
      <div className='flex w-full flex-col items-start'>
        <span className='flex gap-0'>
          {values.map((value, index) => (
            <div
              key={value}
              className={cn(
                'flex w-20 cursor-pointer items-center space-x-2 rounded-md px-2 py-0 shadow-md hover:bg-amber-400 hover:text-white',
                getValues(`ffSp.${row.index}.bigSmall`) === value
                  ? 'h-7 w-20 border border-cyan-600 bg-cyan-500 text-yellow-100 hover:bg-cyan-500/70'
                  : getValues(`ffSp.${row.index}.oddEven`) === value
                    ? 'h-7 w-20 border border-fuchsia-600 bg-fuchsia-500 text-yellow-100 hover:bg-fuchsia-500/70'
                    : 'border border-zinc-400 bg-transparent text-gray-500'
              )}
            >
              <Label
                className={cn(
                  'flex h-7 w-20 cursor-pointer items-center justify-center gap-1 px-1 text-sm font-semibold',
                  poppins.className
                )}
              >
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
          <div className='flex h-full w-7 items-center justify-center font-semibold text-zinc-700'>
            no.
          </div>
        ),
        cell: ({ row }: any) => (
          <div className='flex w-7 flex-row justify-center p-0'>
            <span
              className={cn(
                'm-0 p-0 font-semibold text-zinc-300',
                poppins.className
              )}
            >
              {row.index + 1}.
            </span>
          </div>
        ),
      },

      {
        id: 'suit',
        header: () => (
          <div className='m-0 w-16 p-0 font-semibold text-zinc-700'>suits</div>
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
                'text-shadow gap-.5 flex h-7 w-16 items-center justify-center rounded-lg border bg-amber-600 p-0 text-xs font-semibold text-yellow-100 shadow-inner',
                row.index < 4
                  ? 'border border-orange-600 bg-orange-500'
                  : 'border border-red-600 bg-rose-500',
                poppins.className
              )}
            >
              {row.original.suit}
            </div>
          );
        },
      },
      {
        id: 'oddEvenBigSmall',
        header: () => (
          <div className='m-0 w-40 p-0 font-semibold text-zinc-700'>
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
            <div className='gap-.5 flex h-7 w-40 items-center justify-center p-0'>
              {' '}
              {radioGroupItems}{' '}
            </div>
          );
        },
      },
      {
        accessorKey: 'wager',
        header: ({ column }: any) => (
          <div className='flex flex-col items-center gap-1'>bet</div>
        ),
        cell: ({ row }: any) => {
          return (
            <div className='relative flex justify-center'>
              <InputCustom
                {...register(`ffSp.${row.index}.wager`)}
                type='tel'
                placeholder='bet'
                className={cn(
                  'h-7 w-24 rounded-md border border-zinc-400 pl-5 text-xs font-semibold text-zinc-600 placeholder:text-slate-300',
                  poppins.className
                )}
                suffix={
                  <FaRupiahSign
                    size={12}
                    className='absolute left-1 text-zinc-400'
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
          <div className='flex h-full w-28 items-center justify-center font-semibold text-zinc-700'>
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

          const discountLimit = discount.length;
          return (
            <div
              className={cn(
                'mx-auto flex h-7 w-28 items-center justify-between gap-x-0.5 rounded-md border border-amber-500 bg-amber-200/40 text-center text-xs font-semibold text-zinc-700 shadow-inner',
                poppins.className
              )}
            >
              <span className='flex items-center text-zinc-400'>
                <FaRupiahSign size={12} className='ml-1 text-zinc-400' />
                {discount === '' ? '' : rp.format(Number(discount))}
              </span>
              {discount.length < 7 && discount && (
                <div className='flex items-center pr-1 text-[10px] text-rose-500'>
                  -(2 <Percent size={10} className='svg' />)
                  {/* <pre>{JSON.stringify(row.original.dis, null, 2)}</pre> */}
                </div>
              )}
            </div>
          );
        },
        footer: () => (
          <div className='mx-auto w-full text-center text-xs font-semibold'>
            Total
          </div>
        ),
      },
      {
        accessorKey: 'net',
        header: ({ column }: any) => (
          <div className='flex h-full w-24 items-center justify-center font-semibold text-zinc-700'>
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
            <div className='relative mx-auto flex h-7 w-24 items-center justify-center rounded-md border border-zinc-200 bg-zinc-300/40 px-0 font-semibold text-zinc-700'>
              <div
                className={cn(
                  'flex h-7 w-24 items-center gap-1 rounded border border-slate-400 text-center text-xs font-semibold text-zinc-500',
                  poppins.className
                )}
              >
                <FaRupiahSign size={12} className='ml-1 text-zinc-400' />
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
                  'flex h-7 w-24 items-center gap-1 rounded border border-slate-400 bg-gray-500 text-center text-xs font-semibold shadow-inner',
                  poppins.className
                )}
              >
                <FaRupiahSign size={12} className='svg ml-1 text-zinc-400' />
                <span className='text-shadow text-white'>
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
