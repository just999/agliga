'use client';

import { ChangeEvent, useEffect, useMemo, useRef } from 'react';

import {
  InputCustom,
  Label,
  RadioGroup,
  RadioGroupItem,
} from '@/components/shadcn/ui';
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
          'relative flex h-7 w-24 items-center justify-between gap-1 space-x-2 rounded-md border border-gray-300 px-0 py-0 hover:bg-amber-200 hover:text-gray-500'
        )}
      >
        <select
          {...register(`ffC.${row.index}.${type}`)}
          className={cn(
            'h-7 w-24 cursor-pointer appearance-none rounded-md px-2 text-xs font-semibold text-zinc-400 shadow-lg',
            getValues(`ffC.${row.index}.${type}`) === 'stereo'
              ? 'border border-sky-600 bg-sky-100 text-sky-700'
              : getValues(`ffC.${row.index}.${type}`) === 'mono'
                ? 'border border-emerald-600 bg-emerald-100 text-emerald-700'
                : getValues(`ffC.${row.index}.${type}`) === 'kempis'
                  ? 'border border-indigo-600 bg-indigo-100 text-indigo-700'
                  : getValues(`ffC.${row.index}.${type}`) === 'kembar'
                    ? 'border border-rose-600 bg-rose-100 text-rose-700'
                    : getValues(`ffC.${row.index}.${type}`) === 'kembang'
                      ? 'border border-purple-600 bg-purple-100 text-purple-700'
                      : 'bg-transparent',
            poppins.className
          )}
        >
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
            'svg absolute right-1 text-zinc-600 hover:text-gray-500',
            getValues(`ffC.${row.index}.${type}`) !== values[0] &&
              'svg text-zinc-600'
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
      <div className='flex w-full flex-col items-start'>
        <span className='flex gap-0'>
          {values.map((value, index) => (
            <div
              key={value}
              className={cn(
                'flex w-20 cursor-pointer items-center space-x-2 rounded-md px-2 py-0 hover:bg-slate-200',
                getValues(`ffC.${row.index}.${type}`) === value
                  ? 'h-7 w-20 bg-cyan-500 text-white'
                  : 'text-muted-foreground'
              )}
            >
              <Label
                className={cn(
                  'flex h-7 w-20 cursor-pointer items-center justify-center gap-1 px-1 text-sm font-semibold',
                  poppins.className
                )}
              >
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
          <div className='flex h-full w-7 items-center justify-center font-semibold text-zinc-700'>
            no.
          </div>
        ),
        cell: ({ row }: any) => (
          <div className='flex flex-row justify-center p-0'>
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
        id: 'position',
        header: () => (
          <div className='m-0 flex w-16 justify-center p-0 font-semibold text-zinc-700'>
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
                'text-shadow gap-.5 flex h-7 w-20 items-center justify-center rounded-lg p-0 text-xs font-semibold text-yellow-100 shadow-inner',
                row.original.position === 'belakang'
                  ? 'border border-amber-500 bg-amber-500'
                  : row.original.position === 'tengah'
                    ? 'border border-lime-500 bg-lime-500'
                    : 'border border-emerald-500 bg-green-500',
                poppins.className
              )}
            >
              <span>{row.original.position}</span>
            </div>
          );
        },
      },
      {
        id: 'oddEvenBigSmall',
        header: () => (
          <div className='m-0 w-24 p-0 font-semibold text-zinc-700'>
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
            <div className='gap-.5 flex h-7 w-24 items-center justify-center p-0'>
              {radioGroupItems}
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
            <div className='relative flex h-7 w-full justify-center rounded-md px-0 font-semibold text-zinc-700'>
              <InputCustom
                {...register(`ffC.${row.index}.wager`)}
                type='tel'
                placeholder='bet'
                className={cn(
                  'h-7 w-28 border border-zinc-400 pl-5 text-xs font-semibold text-zinc-600 placeholder:text-slate-300',
                  poppins.className
                )}
                suffix={
                  <FaRupiahSign
                    size={12}
                    className='absolute left-1 text-zinc-300'
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
          <div className='flex h-full w-28 items-center justify-center font-semibold text-zinc-700'>
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
                'mx-auto flex h-7 w-28 items-center justify-between gap-x-0.5 rounded-md border border-amber-500 bg-amber-200/40 text-center text-xs font-semibold text-zinc-700 shadow-inner',
                poppins.className
              )}
            >
              <span className='flex items-center text-zinc-400'>
                <FaRupiahSign size={12} className='mx-1 text-zinc-300' />
                {discount === '' ? '' : rp.format(Number(discount))}
              </span>
              {discount && (
                <div className='flex items-center pr-1 text-[10px] text-rose-500'>
                  (-2 <Percent size={10} className='svg' />)
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
          <div className='flex h-full w-28 items-center justify-center font-semibold text-zinc-700'>
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
            <div className='relative mx-auto flex h-7 w-28 items-center justify-center rounded-md border border-zinc-200 bg-zinc-300/40 px-0 font-semibold text-zinc-700'>
              <div
                className={cn(
                  'flex h-7 w-28 items-center gap-1 rounded border border-slate-400 text-center text-xs font-semibold text-zinc-500',
                  poppins.className
                )}
              >
                <FaRupiahSign size={12} className='ml-1 text-zinc-300' />
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
                  'flex h-7 w-28 items-center gap-1 rounded border border-slate-400 bg-gray-500 text-center text-xs font-semibold shadow-inner',
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
    ffCColumns,
  };
};
