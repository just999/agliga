// 'use client';

// import { InputCustom, Label } from '@/components/ui';

// import { cn, poppins, safeParseFloat } from '@/lib/utils';
// import { FiftyFiftyMsKkkTableSchema } from '@/schemas/togel-schema';

// import { ChevronDownCircle, Percent } from 'lucide-react';

// import { ChangeEvent, useEffect, useMemo, useRef } from 'react';
// import {
//   Control,
//   UseFormGetValues,
//   UseFormRegister,
//   UseFormSetFocus,
//   UseFormWatch,
//   useWatch,
// } from 'react-hook-form';
// import { FaRupiahSign } from 'react-icons/fa6';

// type FiftyFiftyComboColumnsProps = {};

// export const useDasarColumns = (
//   register: UseFormRegister<FiftyFiftyMsKkkTableSchema | any>,
//   control: Control<FiftyFiftyMsKkkTableSchema | any>,
//   watch: UseFormWatch<FiftyFiftyMsKkkTableSchema | any>,
//   setFocus: UseFormSetFocus<FiftyFiftyMsKkkTableSchema>,
//   getValues: UseFormGetValues<FiftyFiftyMsKkkTableSchema> | any,
//   setValue: UseFormGetValues<FiftyFiftyMsKkkTableSchema> | any,
//   handleInputChange: (field: any, e: any, i: number) => void,
//   handleRadioChange: (e: any, rowIndex: number, key: string) => void
// ) => {
//   const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
//   const handleWagerInput = (
//     e: ChangeEvent<HTMLInputElement>,
//     index: number
//   ) => {
//     e.target.value = safeParseFloat(
//       Math.max(0, parseInt(e.target.value)).toString().slice(0, 6)
//     ).toString();
//     inputRefs.current[index] = e.target;
//   };

//   // const { register, handleSubmit, watch, control } = useForm();

//   const dasarValue = useWatch({
//     control,
//     name: 'dasar',
//   });

//   useEffect(() => {
//     inputRefs.current.forEach((input) => {
//       if (input) {
//         input.focus();
//       }
//     });
//   }, []);

//   const renderRadioGroup = (row: any, type: string) => {
//     const values = type === 'bigSmall' ? ['big', 'small'] : ['odd', 'even'];
//     const labels =
//       type === 'bigSmall' ? ['Besar', 'Kecil'] : ['Ganjil', 'Genap'];
//     return (
//       <div className='flex flex-col items-start w-full'>
//         <span className='flex gap-0'>
//           {values.map((value, index) => (
//             <div
//               key={value}
//               className={cn(
//                 'flex w-20 items-center space-x-2 px-2 py-1 rounded-md hover:bg-slate-200 cursor-pointer',
//                 getValues(`dasar.${row.index}.${type}`) === value
//                   ? 'bg-cyan-500 w-20 h-7 text-white'
//                   : 'text-muted-foreground'
//               )}>
//               <Label
//                 className={cn(
//                   'text-sm gap-1 w-20 h-7 flex items-center justify-center font-semibold px-1 cursor-pointer',
//                   poppins.className
//                 )}>
//                 <input
//                   {...register(`dasar.${row.index}.${type}`)}
//                   type='radio'
//                   value={value}
//                   className='hidden'
//                 />
//                 <span className='text-shadow text-xs'>{labels[index]}</span>
//               </Label>
//             </div>
//           ))}
//         </span>
//       </div>
//     );
//   };

//   const dasarColumns = useMemo(
//     () => [
//       {
//         accessorKey: 'index',
//         header: ({}) => <div>No.</div>,
//         cell: ({ row }: any) => (
//           <div className='flex flex-row justify-center p-0'>
//             <span
//               className={cn(
//                 'p-0 m-0 text-zinc-300 font-semibold',
//                 poppins.className
//               )}>
//               {row.index + 1}.
//             </span>
//           </div>
//         ),
//       },

//       {
//         id: 'oddEvenBigSmall',
//         header: () => (
//           <div className='w-20 p-0 m-0 text-zinc-700 font-semibold'>
//             genap/ganjil-besar/kecil
//           </div>
//         ),
//         size: 80,
//         enableResizing: false,
//         cell: ({ row }: any) => {
//           let radioGroupItems;
//           switch (row.index) {
//             case 0:
//             case 1:
//               radioGroupItems = renderRadioGroup(row, 'oddEven');
//               break;
//             case 2:
//             case 3:
//               radioGroupItems = renderRadioGroup(row, 'bigSmall');
//               break;
//             case 4:
//             case 5:
//               break;
//             default:
//               radioGroupItems = null;
//           }
//           return (
//             <div className='w-40 h-7 gap-.5 flex justify-center items-center p-0'>
//               {radioGroupItems}
//             </div>
//           );
//         },
//       },
//       {
//         accessorKey: 'wager',
//         header: ({ column }: any) => (
//           <div className='flex flex-col gap-1 items-center '>bet</div>
//         ),
//         cell: ({ row }: any) => {
//           return (
//             <div className='relative flex justify-center'>
//               <InputCustom
//                 {...register(`dasar.${row.index}.wager`)}
//                 type='tel'
//                 placeholder='bet'
//                 className={cn(
//                   'w-24 h-7 text-xs font-semibold pl-5 text-zinc-600 placeholder:text-slate-300',
//                   poppins.className
//                 )}
//                 suffix={
//                   <FaRupiahSign
//                     size={12}
//                     className='text-zinc-300 absolute left-1'
//                   />
//                 }
//               />
//               <pre>{JSON.stringify(row.original.wager, null, 2)}</pre>
//             </div>
//           );
//         },
//       },
//       {
//         accessorKey: 'dis',
//         header: ({ column }: any) => (
//           <div className='flex items-center justify-center '>
//             kei (25 <Percent size={12} /> )
//           </div>
//         ),
//         cell: ({ row }: any) => {
//           const wager = Number(row.original.wager);
//           const discount =
//             isNaN(wager) || wager === 0 ? '' : -((wager * 25) / 100).toFixed();
//           return (
//             <div className='relative flex justify-center'>
//               <div
//                 className={cn(
//                   'w-24 h-7 flex items-center gap-2 text-center font-semibold text-xs border border-slate-400 text-zinc-500 rounded',
//                   poppins.className
//                 )}>
//                 <FaRupiahSign size={12} className='text-zinc-300 ml-1' />
//                 {discount}
//               </div>
//             </div>
//           );
//         },
//         footer: () => (
//           <div className='text-xs w-full font-semibold mx-auto text-center'>
//             Total
//           </div>
//         ),
//       },
//       {
//         accessorKey: 'net',
//         header: ({ column }: any) => (
//           <div className='flex items-center justify-center '>net</div>
//         ),
//         cell: ({ row }: any) => {
//           const wager = Number(row.original.wager);
//           const net =
//             isNaN(wager) || wager === 0
//               ? ''
//               : (wager * 1.25).toFixed().toString();
//           return (
//             <div className='relative flex justify-center'>
//               <div
//                 className={cn(
//                   'w-24 h-7 flex items-center gap-2 text-center font-semibold text-xs border border-slate-400 text-zinc-500 rounded',
//                   poppins.className
//                 )}>
//                 <FaRupiahSign size={12} className='text-zinc-300 ml-1' />
//                 {net}
//                 {/* <pre>{JSON.stringify(row.original, null, 2)}</pre> */}
//               </div>
//             </div>
//           );
//         },
//         footer: (info: any) => {
//           const total =
//             info.table
//               .getFilteredRowModel()
//               .rows.reduce((sum: number, row: any) => {
//                 const wager = Number(row.original.wager);
//                 return sum + (isNaN(wager) ? 0 : wager);
//               }, 0) * 1.25;
//           return (
//             <div className='flex justify-center '>
//               <div
//                 className={cn(
//                   'w-24 h-7 flex items-center gap-1 text-center font-semibold text-xs border border-slate-400 text-zinc-500 rounded',
//                   poppins.className
//                 )}>
//                 <FaRupiahSign size={12} className='text-zinc-400 ml-1' />
//                 {total.toFixed()}
//               </div>
//             </div>
//           );
//         },
//       },
//     ],
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     []
//   );

//   return {
//     dasarColumns,
//   };
// };

'use client';

import { ChangeEvent, useEffect, useMemo, useRef } from 'react';

import { InputCustom, Label } from '@/components/shadcn/ui';
import { cn, poppins, rp, safeParseFloat } from '@/lib/utils';
import { FiftyFiftyMsKkkTableSchema } from '@/schemas/togel-schema';
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

type FiftyFiftyComboColumnsProps = {};

export const useDasarColumns = (
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

  const dasarValue = useWatch({
    control,
    name: 'dasar',
  });

  useEffect(() => {
    inputRefs.current.forEach((input) => {
      if (input) {
        input.focus();
      }
    });
  }, []);

  const renderTebakGroup = (row: any, type: string) => {
    const values = type === 'bigSmall' ? ['big', 'small'] : ['even', 'odd'];
    const labels =
      type === 'bigSmall' ? ['Besar', 'Kecil'] : ['Genap', 'Ganjil'];
    return (
      <div
        className={cn(
          'flex w-40 gap-1 border h-7 items-center justify-between space-x-2 px-0 py-0 rounded-md cursor-pointer relative'
        )}
      >
        <select
          {...register(`dasar.${row.index}.${type}`)}
          className={cn(
            'w-full text-xs bg-transparent font-semibold px-1 appearance-none text-zinc-500',
            poppins.className
          )}
        >
          {values.map((val, i) => (
            <option value={val} key={val} className='px-2 '>
              {labels[i]}
            </option>
          ))}
        </select>
        <ChevronDownCircle
          size={14}
          className='absolute right-1 text-zinc-400 svg'
        />
      </div>
    );
  };

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
                'flex w-20 items-center space-x-2 px-2 py-0 rounded-md shadow-md hover:bg-stone-200 hover:text-gray-400 cursor-pointer',
                poppins.className,
                getValues(`dasar.${row.index}.bigSmall`) === value
                  ? 'bg-cyan-500 w-20 h-7 text-yellow-100 border border-blue-400 hover:bg-cyan-500/70 hover:text-white/70'
                  : getValues(`dasar.${row.index}.oddEven`) === value
                    ? 'bg-fuchsia-500 w-20 h-7 text-yellow-100 hover:bg-fuchsia-500/70 hover:text-white/70 border border-purple-400'
                    : 'bg-muted text-violet-700 border border-purple-400'
              )}
            >
              <Label
                className={cn(
                  'text-sm gap-1 w-20 h-7 flex items-center justify-center font-normal px-1 cursor-pointer',
                  poppins.className
                )}
              >
                <input
                  {...register(`dasar.${row.index}.${type}`)}
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

  const dasarColumns = useMemo(
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
              radioGroupItems = renderRadioGroup(row, 'oddEven');
              break;
            case 2:
            case 3:
              radioGroupItems = renderRadioGroup(row, 'bigSmall');
              break;
            case 4:
            case 5:
              break;
            default:
              radioGroupItems = null;
          }
          return (
            <div className='w-40 h-7 gap-.5 flex justify-center items-center p-0'>
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
            <div className='relative  flex justify-center text-zinc-700 rounded-md h-7 px-0 font-semibold w-full '>
              <InputCustom
                {...register(`dasar.${row.index}.wager`)}
                type='tel'
                placeholder='bet'
                className={cn(
                  'w-30 h-7 text-xs font-semibold pl-5 border border-zinc-300 rounded-md text-zinc-600 placeholder:text-slate-300',
                  poppins.className
                )}
                suffix={
                  <FaRupiahSign
                    size={12}
                    className='text-zinc-300 absolute left-1'
                  />
                }
              />
              {/* <pre>{JSON.stringify(row.original.wager, null, 2)}</pre> */}
            </div>
          );
        },
      },
      {
        accessorKey: 'dis',
        header: ({ column }: any) => (
          <div className='text-zinc-700 font-semibold w-30  h-full flex items-center justify-center'>
            <div className='flex items-center text-xs font-semibold'>
              kei (25 <Percent size={10} /> )
            </div>
          </div>
        ),
        cell: ({ row }: any) => {
          const wager = Number(row.original.wager);
          const discount =
            isNaN(wager) || wager === 0 ? '' : (-wager * 0.25).toFixed();
          return (
            <div
              className={cn(
                'h-7 text-zinc-700 mx-auto flex items-center justify-between border border-amber-500 gap-x-0.5 text-xs shadow-inner font-semibold w-30 bg-amber-200/40 text-center rounded-md',
                poppins.className
              )}
            >
              <span className='flex items-center text-zinc-400'>
                <FaRupiahSign size={12} className='text-zinc-300 mx-1' />
                {discount === '' ? '' : rp.format(Number(discount))}
              </span>
              {discount && (
                <div className='flex items-center text-[10px] text-rose-500 pr-1  '>
                  (-25 <Percent size={10} className='svg' />)
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
          <div className='text-zinc-700 font-semibold w-30  h-full flex items-center justify-center'>
            net
          </div>
        ),
        cell: ({ row }: any) => {
          const wager = Number(row.original.wager);
          const net =
            isNaN(wager) || wager === 0
              ? ''
              : (wager * 1.25).toFixed().toString();
          return (
            <div className='relative flex justify-center items-center bg-zinc-300/40 text-zinc-700 border border-zinc-200 rounded-md h-7 px-0 font-semibold w-30 mx-auto'>
              <div
                className={cn(
                  'w-30 h-7 flex items-center gap-1  text-center font-semibold text-xs border border-slate-400 text-zinc-500 rounded',
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
              }, 0) * 1.25
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

  return { dasarColumns };
};
