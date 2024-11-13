'use client';

import {
  InputCustom,
  Label,
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui';
import { positionVal } from '@/lib/helper';
import {
  arrayRange,
  cn,
  oldStandardTT,
  poppins,
  rp,
  safeParseFloat,
} from '@/lib/utils';
import {
  FiftyFiftyMsKkkTableSchema,
  FiftyFiftyTableSchema,
} from '@/schemas/togel-schema';
import { id } from 'date-fns/locale';

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

export const FiftyFiftyComboColumns = (
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

  // const { register, handleSubmit, watch, control } = useForm();

  const ffCValue = useWatch({
    control,
    name: 'ffC',
  });

  useEffect(() => {
    inputRefs.current.forEach((input) => {
      if (input) {
        input.focus();
      }
    });
  }, []);

  const renderTebakGroup = (row: any, type: string) => {
    const values =
      type === 'monoStereo'
        ? ['mono', 'stereo']
        : ['kembang', 'kempis', 'kembar'];
    const labels =
      type === 'monoStereo'
        ? ['mono', 'stereo']
        : ['kembang', 'kempis', 'kembar'];

    return (
      <div
        className={cn(
          'flex w-24 gap-1 border border-gray-300 h-7 items-center justify-between space-x-2 px-0 py-0 rounded-md hover:bg-amber-200 hover:text-gray-500 relative'
        )}>
        <select
          {...register(`ffC.${row.index}.${type}`)}
          className={cn(
            'w-24 h-7 text-xs rounded-md shadow-lg cursor-pointer font-semibold px-2  appearance-none text-zinc-400',
            getValues(`ffC.${row.index}.${type}`) === 'stereo'
              ? 'bg-teal-200 text-teal-700 border border-teal-500'
              : getValues(`ffC.${row.index}.${type}`) === 'mono'
              ? 'bg-lime-200 text-lime-700 border border-lime-500'
              : getValues(`ffC.${row.index}.${type}`) === 'kempis'
              ? 'bg-indigo-200 text-indigo-700 border border-indigo-500'
              : getValues(`ffC.${row.index}.${type}`) === 'kembar'
              ? 'bg-violet-200 text-violet-700 border border-violet-500'
              : getValues(`ffC.${row.index}.${type}`) === 'kembang'
              ? 'bg-purple-200 text-purple-700 border border-purple-500'
              : 'bg-transparent',
            poppins.className
          )}>
          {type === 'monoStereo'
            ? values.map((val, i) => (
                <option value={val} key={val}>
                  {labels[i]}
                </option>
              ))
            : values.map((item, i) => (
                <option value={item} key={item}>
                  {labels[i]}
                </option>
              ))}
        </select>
        <ChevronDownCircle
          size={14}
          className={cn(
            'absolute right-1 text-zinc-400 svg hover:text-gray-500 ',
            getValues(`ffC.${row.index}.${type}`) !== values[0] &&
              'text-white svg'
          )}
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
                'flex w-20 items-center space-x-2 px-2 py-0 rounded-md hover:bg-slate-200 cursor-pointer',
                getValues(`ffC.${row.index}.${type}`) === value
                  ? 'bg-cyan-500 w-20 h-7 text-white'
                  : 'text-muted-foreground'
              )}>
              <Label
                className={cn(
                  'text-sm gap-1 w-20 h-7 flex items-center justify-center font-semibold px-1 cursor-pointer',
                  poppins.className
                )}>
                <input
                  {...register(`ffC.${row.index}.${type}`)}
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

  const ffCColumns = useMemo(
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
        id: 'position',
        header: () => (
          <div className='w-16 p-0 m-0 flex justify-center text-zinc-700 font-semibold'>
            position
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
              <div>{row.original.tebak}</div>;
            default:
              radioGroupItems = null;
          }
          return (
            <div
              className={cn(
                'w-20  text-xs shadow-inner font-semibold text-shadow text-yellow-100 h-7 gap-.5 flex justify-center  items-center rounded-lg p-0',
                row.original.position === 'belakang'
                  ? 'bg-amber-500 border border-amber-500'
                  : row.original.position === 'tengah'
                  ? 'bg-lime-500 border border-lime-500'
                  : 'bg-green-500 border border-emerald-500',
                poppins.className
              )}>
              <span>{row.original.position}</span>
            </div>
          );
        },
      },
      {
        id: 'oddEvenBigSmall',
        header: () => (
          <div className='w-24 p-0 m-0 text-zinc-700 font-semibold'>
            genap/ganjil-besar/kecil
          </div>
        ),
        size: 96,
        enableResizing: false,
        cell: ({ row }: any) => {
          let radioGroupItems;
          switch (row.index) {
            case 0:
              radioGroupItems = renderTebakGroup(row, 'monoStereo');
              break;
            case 1:
              radioGroupItems = renderTebakGroup(row, 'kembangKempisKembar');
              break;
            case 2:
              radioGroupItems = renderTebakGroup(row, 'monoStereo');
              break;
            case 3:
              radioGroupItems = renderTebakGroup(row, 'kembangKempisKembar');
              break;

            case 4:
              radioGroupItems = renderTebakGroup(row, 'monoStereo');
              break;
            case 5:
              radioGroupItems = renderTebakGroup(row, 'kembangKempisKembar');
              break;

            default:
              radioGroupItems = null;
          }
          return (
            <div className='w-24 h-7 gap-.5 flex justify-center items-center p-0'>
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
                {...register(`ffC.${row.index}.wager`)}
                type='tel'
                placeholder='bet'
                className={cn(
                  'w-28 h-7 text-xs font-semibold pl-5 text-zinc-600 border border-zinc-400 placeholder:text-slate-300',
                  poppins.className
                )}
                suffix={
                  <FaRupiahSign
                    size={12}
                    className='text-zinc-300 absolute left-1'
                  />
                }
              />
              {/* <pre>{JSON.stringify(row.original.tebak, null, 2)}</pre> */}
            </div>
          );
        },
      },
      {
        accessorKey: 'dis',
        header: ({ column }: any) => (
          <div className='text-zinc-700 font-semibold w-28  h-full flex items-center justify-center'>
            <div className='flex items-center text-xs font-semibold'>
              kei (2 <Percent size={10} /> )
            </div>
          </div>
        ),
        cell: ({ row }: any) => {
          const wager = Number(row.original.wager);
          const discount =
            isNaN(wager) || wager === 0 ? '' : (-wager * 0.02).toFixed();
          return (
            <div
              className={cn(
                'h-7 text-zinc-700 mx-auto flex items-center justify-between border border-amber-500 gap-x-0.5 text-xs shadow-inner font-semibold w-28 bg-amber-200/40 text-center rounded-md',
                poppins.className
              )}>
              <span className='flex items-center text-zinc-400'>
                <FaRupiahSign size={12} className='text-zinc-300 mx-1' />
                {discount === '' ? '' : rp.format(Number(discount))}
              </span>
              {discount && (
                <div className='flex items-center text-[10px] text-rose-500 pr-1  '>
                  (-2 <Percent size={10} className='svg' />)
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
              : (wager * 1.02).toFixed().toString();
          return (
            <div className='relative flex justify-center items-center bg-zinc-300/40 text-zinc-700 border border-zinc-200 rounded-md h-7 px-0 font-semibold w-28 mx-auto'>
              <div
                className={cn(
                  'w-28 h-7 flex items-center gap-1  text-center font-semibold text-xs border border-slate-400 text-zinc-500 rounded',
                  poppins.className
                )}>
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
              }, 0) * 1.02
          )
            .toFixed()
            .toString();
          return (
            <div className='flex justify-center py-1'>
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return {
    ffCColumns,
  };
};
