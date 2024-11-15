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
import {
  FiftyFiftyMsKkkTableSchema,
  FiftyFiftyTableSchema,
} from '@/schemas/togel-schema';
import { id } from 'date-fns/locale';
import { ChevronDown, ChevronDownCircle, Percent } from 'lucide-react';
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

type FiftyFiftyComboColumnsProps = {};

export const useMacauCColumns = (
  register: UseFormRegister<FiftyFiftyMsKkkTableSchema | any>,
  control: Control<FiftyFiftyMsKkkTableSchema | any>,
  watch: UseFormWatch<FiftyFiftyMsKkkTableSchema | any>,
  isDirty: boolean,
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

  const macauCValue = useWatch({
    control,
    name: 'macauC',
  });

  useEffect(() => {
    inputRefs.current.forEach((input) => {
      if (input) {
        input.focus();
      }
    });
  }, []);

  const renderTebakGroup = (row: any, type: string, key: string) => {
    const values = type === 'bigSmall' ? ['big', 'small'] : ['even', 'odd'];
    const labels =
      type === 'bigSmall' ? ['Besar', 'Kecil'] : ['Genap', 'Ganjil'];
    return (
      <div
        key={key}
        className={cn(
          'flex w-40 gap-1 border border-gray-300 h-7 items-center justify-between space-x-2 px-0 py-0 rounded-md relative'
        )}
      >
        <select
          {...register(`macauC.${row.index}.${type}`)}
          defaultValue={values[0]}
          className={cn(
            'w-20 h-7 text-xs rounded-md shadow-lg cursor-pointer font-semibold px-2 hover:bg-amber-200 hover:text-gray-500 appearance-none text-zinc-400',
            getValues(`macauC.${row.index}.${type}`) === 'small'
              ? 'bg-cyan-500 text-white border border-blue-400'
              : getValues(`macauC.${row.index}.${type}`) === 'big'
                ? 'bg-cyan-100 text-cyan-700 border border-cyan-400'
                : getValues(`macauC.${row.index}.${type}`) === 'odd'
                  ? 'bg-fuchsia-500 text-white border border-fuchsia-500'
                  : 'bg-rose-100 text-rose-700 border border-red-400',
            poppins.className
          )}
        >
          {values.map((val, i) => (
            <option value={val} key={val} className={cn('px-2')}>
              {labels[i]}
            </option>
          ))}
        </select>
        <ChevronDownCircle
          size={14}
          className={cn(
            'absolute right-1 text-zinc-400 svg hover:text-gray-500 ',
            getValues(`macauC.${row.index}.${type}`) !== values[0] &&
              'text-white svg'
          )}
        />
      </div>
    );
  };

  const macauCColumns = useMemo(
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
        id: 'position',
        header: () => (
          <div className='w-16 p-0 m-0 text-zinc-700 font-semibold'>
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
                'w-20 border text-xs shadow-inner font-semibold text-shadow text-yellow-100 h-7 gap-.5 flex justify-center  items-center rounded-md p-0',
                row.original.position === 'belakang'
                  ? 'bg-amber-500'
                  : row.original.position === 'tengah'
                    ? 'bg-lime-500'
                    : 'bg-green-500',
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
          <div className='w-40 p-0 m-0 text-zinc-700 font-semibold'>
            genap/ganjil-besar/kecil
          </div>
        ),
        size: 80,
        enableResizing: false,
        cell: ({ row }: any) => {
          let radioGroupItems = [];
          switch (row.index) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
              radioGroupItems.push(
                renderTebakGroup(
                  row,
                  'bigSmall',
                  `macauC.${row.index}.bigSmall`
                )
              );
              radioGroupItems.push(
                renderTebakGroup(row, 'oddEven', `macauC.${row.index}.oddEven`)
              );
              break;
            default:
              radioGroupItems = [];
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
            <div className='relative flex justify-center'>
              <InputCustom
                {...register(`macauC.${row.index}.wager`)}
                type='tel'
                placeholder='bet'
                className={cn(
                  'w-24 h-7 text-xs font-semibold pl-5 border border-zinc-300 rounded-md text-zinc-600 placeholder:text-slate-300',
                  poppins.className
                )}
                suffix={
                  <FaRupiahSign
                    size={12}
                    className='text-zinc-400 absolute left-1'
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
          <div className='text-zinc-700 font-semibold w-24  h-full flex items-center justify-center'>
            <div className='flex items-center text-xs font-semibold'>
              dis (5 <Percent size={10} /> )
            </div>
          </div>
        ),
        cell: ({ row }: any) => {
          const wager = Number(row.original.wager);
          const discount =
            isNaN(wager) || wager === 0 ? '' : ((wager * 5) / 100).toFixed();
          return (
            <div
              className={cn(
                'h-7 text-zinc-700 mx-auto flex items-center justify-between border border-amber-500 gap-x-0.5 text-xs shadow-inner font-semibold w-24 bg-amber-200/40 text-center rounded-md',
                poppins.className
              )}
            >
              <span className='flex items-center text-zinc-400'>
                <FaRupiahSign size={12} className='text-zinc-400 mx-1' />
                {discount === '' ? '' : rp.format(Number(discount))}
              </span>
              {discount && (
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
          <div className='text-zinc-700 font-semibold w-24  h-full flex items-center justify-center'>
            net
          </div>
        ),
        cell: ({ row }: any) => {
          const wager = Number(row.original.wager);
          const net =
            isNaN(wager) || wager === 0
              ? ''
              : (wager * 0.95).toFixed().toString();
          return (
            <div className='relative flex justify-center items-center bg-zinc-300/40 text-zinc-700 border border-zinc-200 rounded-md h-7 px-0 font-semibold w-24 mx-auto'>
              <div
                className={cn(
                  'w-24 h-7 flex items-center gap-1  text-center font-semibold text-xs border border-slate-400 text-zinc-500 rounded',
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
              }, 0) * 0.95
          )
            .toFixed()
            .toString();
          return (
            <div className='flex justify-center py-1'>
              <div
                className={cn(
                  'w-24 h-7 flex items-center bg-gray-500 gap-1 shadow-inner text-center font-semibold text-xs border border-slate-400 rounded',
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
    macauCColumns,
  };
};
