'use client';

import { ChangeEvent, useEffect, useMemo, useRef } from 'react';

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
import { FiftyFiftyTableSchema } from '@/schemas/togel-schema';
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

type useFiftyFiftyColumnsProps = {};

export const useFiftyFiftyColumns = (
  register: UseFormRegister<FiftyFiftyTableSchema | any>,
  control: Control<FiftyFiftyTableSchema | any>,
  watch: UseFormWatch<FiftyFiftyTableSchema | any>,
  setFocus: UseFormSetFocus<FiftyFiftyTableSchema>,
  getValues: UseFormGetValues<FiftyFiftyTableSchema> | any,
  setValue: UseFormGetValues<FiftyFiftyTableSchema> | any,
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

  const ffValue = useWatch({
    control,
    name: 'ff',
  });
  useEffect(() => {
    inputRefs.current.forEach((input) => {
      if (input) {
        input.focus();
      }
    });
  }, []);

  const renderRadioGroup = (row: any, type: string) => {
    const values =
      type === 'bigSmall'
        ? ['big', 'small']
        : type === 'oddEven'
          ? ['even', 'odd']
          : ['middle', 'side'];

    const labels =
      type === 'bigSmall'
        ? ['Besar', 'Kecil']
        : type === 'oddEven'
          ? ['Genap', 'Ganjil']
          : ['tengah', 'tepi'];

    return (
      <div className='flex flex-col items-start w-full'>
        <span className='flex gap-0'>
          {values.map((value, index) => (
            <div
              key={value}
              className={cn(
                'flex w-24 items-center space-x-2 px-2 py-0 rounded-md shadow-md hover:bg-amber-400 hover:text-white cursor-pointer',
                getValues(`ff.${row.index}.bigSmall`) === value
                  ? 'bg-cyan-500 w-24 h-7 text-yellow-100 border-blue-400 hover:bg-cyan-500/70'
                  : getValues(`ff.${row.index}.oddEven`) === value
                    ? 'bg-fuchsia-500 w-24 h-7 text-yellow-100 hover:bg-fuchsia-500/70'
                    : getValues(`ff.${row.index}.sideMiddle`) === value
                      ? 'bg-rose-500 w-24 h-7 text-yellow-100 hover:bg-fuchsia-500/70'
                      : 'bg-transparent text-gray-500 border border-zinc-300 rounded-md'
              )}
            >
              <Label
                className={cn(
                  'text-sm gap-1 w-20 h-7 flex items-center justify-center font-semibold px-1 cursor-pointer',
                  poppins.className
                )}
              >
                <input
                  {...register(`ff.${row.index}.${type}`)}
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

  const ffColumns = useMemo(
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

      // {
      //   id: 'action',
      //   header: () => (
      //     <div className='w-40 p-0 m-0 text-zinc-700 font-semibold'>tebak</div>
      //   ),
      //   size: 80,
      //   enableResizing: false,
      //   cell: ({ row }: any) => {
      //     let radioGroupItems;
      //     switch (row.index) {
      //       case 0:
      //         radioGroupItems = (
      //           <Controller
      //             name={`ff.${row.index}.bigSmall`}
      //             control={control}
      //             defaultValue='big'
      //             render={({ field }) => (
      //               <RadioGroup
      //                 {...field}
      //                 className='flex flex-col items-start w-full'>
      //
      //                 <span className='flex gap-2'>
      //
      //                   <div className='flex w-20 items-center space-x-2'>
      //
      //                     <RadioGroupItem
      //                       value='big'
      //                       id={`r1-${row.index}`}
      //                     />
      //                     <Label>Big</Label>
      //                   </div>
      //                   <div className='flex w-20 items-center space-x-2'>
      //
      //                     <RadioGroupItem
      //                       value='small'
      //                       id={`r2-${row.index}`}
      //                     />
      //                     <Label>Small</Label>
      //                   </div>
      //                 </span>
      //               </RadioGroup>
      //             )}
      //           />
      //         );
      //         break;
      //       case 1:
      //         radioGroupItems = (
      //           <Controller
      //             name={`ff.${row.index}.oddEven`}
      //             control={control}
      //             defaultValue='odd'
      //             render={({ field }) => (
      //               <RadioGroup
      //                 {...field}
      //                 className='flex flex-col items-start w-full'>
      //
      //                 <span className='flex gap-2'>
      //
      //                   <div className='flex w-20 items-center space-x-2'>
      //
      //                     <RadioGroupItem
      //                       value='odd'
      //                       id={`r3-${row.index}`}
      //                     />
      //                     <Label>Odd</Label>
      //                   </div>
      //                   <div className='flex w-20 items-center space-x-2'>
      //
      //                     <RadioGroupItem
      //                       value='even'
      //                       id={`r4-${row.index}`}
      //                     />
      //                     <Label>Even</Label>
      //                   </div>
      //                 </span>
      //               </RadioGroup>
      //             )}
      //           />
      //         );
      //         break;
      //       case 2:
      //         radioGroupItems = (
      //           <Controller
      //             name={`ff.${row.index}.sideMiddle`}
      //             control={control}
      //             defaultValue='middle'
      //             render={({ field }) => (
      //               <RadioGroup
      //                 {...field}
      //                 className='flex flex-col items-start w-full'>
      //
      //                 <span className='flex gap-2'>
      //
      //                   <div className='flex w-20 items-center space-x-2'>
      //
      //                     <RadioGroupItem
      //                       value='middle'
      //                       id={`r5-${row.index}`}
      //                     />
      //                     <Label>Middle</Label>
      //                   </div>
      //                   <div className='flex w-20 items-center space-x-2'>
      //
      //                     <RadioGroupItem
      //                       value='side'
      //                       id={`r6-${row.index}`}
      //                     />
      //                     <Label>Side</Label>
      //                   </div>
      //                 </span>
      //               </RadioGroup>
      //             )}
      //           />
      //         );
      //         break;
      //       default:
      //         radioGroupItems = null;
      //     }
      //     return (
      //       <div className='w-40 h-7 gap-.5 flex items-center p-0'>
      //
      //         {radioGroupItems}
      //       </div>
      //     );
      //   },
      // },

      {
        id: 'action',
        header: () => (
          <div className='w-48 p-0 m-0 text-zinc-700 font-semibold'>tebak</div>
        ),
        size: 80,
        enableResizing: false,
        cell: ({ row }: any) => {
          let radioGroupItems;
          switch (row.index) {
            case 0:
              // radioGroupItems = (
              // <RadioGroup
              //   {...register(`ff.${row.index}.bigSmall`, {
              //     onChange: (e) =>
              //       handleRadioChange(e, row.index, `bigSmall`),
              //   })}
              //   className='flex flex-col items-start w-full'>
              //
              //   <span className='flex gap-2'>
              //
              //     <div className='flex w-20 items-center space-x-2'>
              //
              //       <RadioGroupItem
              //         value='big'
              //         id={`ff.${row.index}.big`}
              //         // name={`ff.${row.index}.bigSmall`}
              //       />
              //       <Label>Big</Label>
              //     </div>
              //     <div className='flex w-20 items-center space-x-2'>
              //
              //       <RadioGroupItem
              //         value='small'
              //         id={`r2-${row.index}.small`}
              //         // name={`ff.${row.index}.bigSmall`}
              //       />
              //       <Label>Small</Label>
              //     </div>
              //   </span>
              // </RadioGroup>
              // <div className='flex  flex-col items-start w-full'>
              //   <span className='flex gap-2 '>
              //     <div
              //       className={cn(
              //         'flex w-24 items-center space-x-2  px-2 py-1 rounded-md hover:bg-slate-200 cursor-pointer',
              //         getValues(`ff.${row.index}.bigSmall`) === 'big' &&
              //           'bg-emerald-400 w-24 h-7 text-white'
              //       )}>
              //       <Label
              //         className={cn(
              //           'text-sm gap-1 flex items-center font-semibold px2 cursor-pointer',
              //           poppins.className
              //         )}>
              //         <input
              //           {...register(`ff.${row.index}.bigSmall`)}
              //           type='radio'
              //           value={'big'}
              //           className={cn(
              //             'w-4 h-4 px-2 cursor-pointer input-radio',
              //             ffValue === 'big' && 'bg-emerald-700'
              //           )}
              //         />
              //         <span className='text-shadow '>Besar</span>
              //       </Label>
              //     </div>
              //     <div
              //       className={cn(
              //         'flex w-24 items-center space-x-2 px-2 py-1 rounded-md hover:bg-slate-200 cursor-pointer',
              //         getValues(`ff.${row.index}.bigSmall`) === 'small' &&
              //           'bg-emerald-400 w-24 h-7 text-white'
              //       )}>
              //       <Label
              //         className={cn(
              //           'text-sm gap-1 flex items-center font-semibold px2 cursor-pointer',
              //           poppins.className
              //         )}>
              //         <input
              //           {...register(`ff.${row.index}.bigSmall`)}
              //           type='radio'
              //           value={'small'}
              //           className='w-4 h-4 px-2'
              //         />
              //         <span className='text-shadow '>Kecil</span>
              //       </Label>
              //     </div>
              //   </span>
              // </div>
              // );
              // break;
              radioGroupItems = renderRadioGroup(row, 'bigSmall');
              break;
            case 1:
              // radioGroupItems = (
              // <RadioGroup
              //   {...register(`ff.${row.index}.oddEven`, {
              //     onChange: (e) => handleRadioChange(e, row.index, `oddEven`),
              //   })}
              //   className='flex flex-col items-start w-full'
              //   defaultValue='odd'>
              //
              //   <span className='flex gap-2'>
              //
              //     <div className='flex w-20 items-center space-x-2'>
              //
              //       <RadioGroupItem
              //         value='odd'
              //         id={`r3-${row.index}.odd`}
              //         // name={`ff.${row.index}.oddEven`}
              //       />
              //       <Label className={cn('text-sm font-semibold px2', poppins.className)} >Odd</Label>
              //     </div>
              //     <div className='flex w-20 items-center space-x-2'>
              //
              //       <RadioGroupItem
              //         value='even'
              //         id={`r4-${row.index}.even`}
              //         // name={`ff.${row.index}.oddEven`}
              //       />
              //       <Label className={cn('text-sm font-semibold px2', poppins.className)} >Even</Label>
              //     </div>
              //   </span>
              // </RadioGroup>
              //   <div className='flex  flex-col items-start w-full'>
              //     <span className='flex gap-2 '>
              //       <div
              //         className={cn(
              //           'flex w-24 items-center space-x-2 px-2 py-1 rounded-md hover:bg-slate-200 cursor-pointer',
              //           getValues(`ff.${row.index}.oddEven`) === 'even' &&
              //             'bg-cyan-500 w-24 h-7 text-white'
              //         )}>
              //         <Label
              //           className={cn(
              //             'text-sm gap-1 flex items-center font-semibold px2 cursor-pointer',
              //             poppins.className
              //           )}>
              //           <input
              //             {...register(`ff.${row.index}.oddEven`)}
              //             type='radio'
              //             value={'even'}
              //             className='w-4 h-4 '
              //           />
              //           <span className='text-shadow '>Genap</span>
              //         </Label>
              //       </div>
              //       <div
              //         className={cn(
              //           'flex w-24 items-center space-x-2 px-2 py-1 rounded-md hover:bg-slate-200 cursor-pointer',
              //           getValues(`ff.${row.index}.oddEven`) === 'odd' &&
              //             'bg-cyan-500 w-24 h-7 text-white'
              //         )}>
              //         <Label
              //           className={cn(
              //             'text-sm gap-1 flex items-center font-semibold px2 cursor-pointer',
              //             poppins.className
              //           )}>
              //           <input
              //             {...register(`ff.${row.index}.oddEven`)}
              //             type='radio'
              //             value={'odd'}
              //             className='w-4 h-4 px-2'
              //           />
              //           <span className='text-shadow '>Ganjil</span>
              //         </Label>
              //       </div>
              //     </span>
              //   </div>
              // );
              // break;
              radioGroupItems = renderRadioGroup(row, 'oddEven');
              break;
            case 2:
              // radioGroupItems = (
              // <RadioGroup
              //   {...register(`ff.${row.index}.sideMiddle`, {
              //     onChange: (e) =>
              //       handleRadioChange(e, row.index, `sideMiddle`),
              //   })}
              //   className='flex flex-col items-start w-full'
              //   defaultValue='middle'>
              //
              //   <span className='flex gap-2'>
              //
              //     <div className='flex w-20 items-center space-x-2'>
              //
              //       <RadioGroupItem
              //         value='middle'
              //         id={`ff.${row.index}.middle`}
              //         // name={`ff.${row.index}.sideMiddle`}
              //       />
              //       <Label className={cn('text-sm font-semibold px2', poppins.className)} >Middle</Label>
              //     </div>
              //     <div className='flex w-20 items-center space-x-2'>
              //
              //       <RadioGroupItem
              //         value='side'
              //         id={`r6-${row.index}.side`}
              //         // name={`ff.${row.index}.sideMiddle`}
              //       />
              //       <Label className={cn('text-sm font-semibold px2', poppins.className)} >Side</Label>
              //     </div>
              //   </span>
              // </RadioGroup>
              //   <div className='flex  flex-col items-start w-full'>
              //     <span className='flex gap-2 '>
              //       <div
              //         className={cn(
              //           'flex w-24 items-center space-x-2 px-2 py-1 rounded-md hover:bg-slate-200 cursor-pointer',
              //           getValues(`ff.${row.index}.sideMiddle`) === 'middle' &&
              //             'bg-purple-500 w-24 h-7 text-white'
              //         )}>
              //         <Label
              //           className={cn(
              //             'text-sm gap-1 flex items-center font-semibold px2 cursor-pointer',
              //             poppins.className
              //           )}>
              //           <input
              //             {...register(`ff.${row.index}.sideMiddle`)}
              //             type='radio'
              //             value={'middle'}
              //             className='w-4 h-4 px-2'
              //           />
              //           <span className='text-shadow '>Tengah</span>
              //         </Label>
              //       </div>
              //       <div
              //         className={cn(
              //           'flex w-24 items-center space-x-2 px-2 py-1 rounded-md hover:bg-slate-200 cursor-pointer',
              //           getValues(`ff.${row.index}.sideMiddle`) === 'side' &&
              //             'bg-purple-500 w-24 h-7 text-white border border-purple-300'
              //         )}>
              //         <Label
              //           className={cn(
              //             'text-sm gap-1 flex items-center font-semibold px2 cursor-pointer',
              //             poppins.className
              //           )}>
              //           <input
              //             {...register(`ff.${row.index}.sideMiddle`)}
              //             type='radio'
              //             value={'side'}
              //             className='w-4 h-4 px-2'
              //           />
              //           <span className='text-shadow '>Tepi</span>
              //         </Label>
              //       </div>
              //     </span>
              //   </div>
              // );
              radioGroupItems = renderRadioGroup(row, 'sideMiddle');
              break;
            default:
              radioGroupItems = null;
          }
          return (
            <div className='w-48 h-7 gap-.5 flex items-center p-0'>
              {radioGroupItems}
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
            <div className='relative  flex justify-center text-zinc-700 border border-zinc-400 rounded-md h-7 px-0 font-semibold w-full '>
              <InputCustom
                {...register(`ff.${row.index}.wager`)}
                type='tel'
                placeholder='bet'
                className={cn(
                  'w-28 h-7 text-xs font-semibold pl-5 border border-zinc-300 rounded-md text-zinc-600 placeholder:text-slate-300',
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
          );
        },
      },
      {
        accessorKey: 'dis',
        header: ({ column }: any) => (
          <div className='text-zinc-700 font-semibold w-28  h-full flex items-center justify-center'>
            <div className='flex items-center text-xs font-semibold'>
              kei (1.5 <Percent size={10} /> )
            </div>
          </div>
        ),
        cell: ({ row }: any) => {
          const wager = Number(row.original.wager);
          const discount =
            isNaN(wager) || wager === 0 ? '' : (-wager * 0.015).toFixed();
          return (
            <div
              className={cn(
                'h-7 text-zinc-700 mx-auto flex items-center justify-between border border-amber-500 gap-x-0.5 text-xs shadow-inner font-semibold w-28 bg-amber-200/40 text-center rounded-md',
                poppins.className
              )}
            >
              <span className='flex items-center text-zinc-400'>
                <FaRupiahSign size={12} className='text-zinc-300 mx-1' />
                {discount === '' ? '' : rp.format(Number(discount))}
              </span>
              {discount.length < 7 && discount && (
                <div className='flex items-center text-[10px] text-amber-500 pr-1  '>
                  (-5 <Percent size={10} className='svg' />)
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
              : (wager * 1.015).toFixed().toString();
          return (
            <div className='relative flex justify-center items-center bg-zinc-300/40 text-zinc-700 border border-zinc-200 rounded-md h-7 px-0 font-semibold w-28 mx-auto'>
              <div
                className={cn(
                  'w-28 h-7 flex items-center gap-1  text-center font-semibold text-xs border border-slate-400 text-zinc-500 rounded',
                  poppins.className
                )}
              >
                <FaRupiahSign size={12} className='text-zinc-300 ml-1' />
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
              }, 0) * 1.015
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

  return {
    ffColumns,
  };
};
