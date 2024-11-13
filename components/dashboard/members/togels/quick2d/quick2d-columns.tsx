'use client';

import { InputCustom, Label } from '@/components/ui';

import { cn, poppins, safeParseFloat } from '@/lib/utils';
import { BseoTableSchema } from '@/schemas/togel-schema';

import { ChevronDownCircle } from 'lucide-react';

import { ChangeEvent, useCallback, useEffect, useMemo, useRef } from 'react';
import {
  Control,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetFocus,
  UseFormWatch,
} from 'react-hook-form';
import { FaRupiahSign } from 'react-icons/fa6';

type useFiftyFiftyColumnsProps = {};

export const useQuick2dColumns = (
  register: UseFormRegister<BseoTableSchema | any>,
  control: Control<BseoTableSchema | any>,
  watch: UseFormWatch<BseoTableSchema | any>,
  setFocus: UseFormSetFocus<BseoTableSchema>,
  getValues: UseFormGetValues<BseoTableSchema> | any,
  setValue: UseFormGetValues<BseoTableSchema> | any,
  handleInputChange: (field: any, e: any, i: number) => void,
  handleRadioChange: (e: any, rowIndex: number, key: string) => void,
  handleChange: (key: string, e: any, i: number) => void
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

  useEffect(() => {
    inputRefs.current.forEach((input) => {
      if (input) {
        input.focus();
      }
    });
  }, []);

  const renderRadioGroup = useCallback(
    (row: any) => {
      const values = ['big', 'small', 'even', 'odd'];
      const labels = ['Besar', 'Kecil', 'Genap', 'Ganjil'];

      return (
        <div className='flex flex-col items-end w-full'>
          <span className='grid grid-cols-2 gap-0.5'>
            {values.map((value, index) => (
              <div
                key={value}
                className={cn(
                  'flex items-center space-x-2 px-2 py-0 border border-orange-300 rounded-md shadow-lg hover:bg-amber-400 hover:text-white cursor-pointer ',
                  getValues(`bsEo.${row.index}.bseo`) === value &&
                    'bg-cyan-500 w-24  text-yellow-100 hover:bg-cyan-500/70'
                )}>
                <Label
                  className={cn(
                    'text-sm gap-1 w-20 h-7 flex items-center justify-center font-semibold px-1 cursor-pointer',
                    poppins.className
                  )}>
                  <input
                    {...register(`bsEo.${row.index}.bseo`, {
                      onChange: (e) => handleChange(value, e, row.index),
                    })}
                    type='radio'
                    value={value}
                    className='hidden'
                  />
                  <span
                    className={cn(
                      'text-shadow text-gray-500 text-xs',
                      getValues(`bsEo.${row.index}.bseo`) === value &&
                        ' text-white hover:bg-cyan-500/70'
                    )}>
                    {labels[index]}
                  </span>
                </Label>
              </div>
            ))}
          </span>
        </div>
      );
    },
    [getValues, handleChange, register]
  );

  const renderPositionGroup = useCallback(
    (row: any, type: string, key: string) => {
      const positionValues = ['2d', '2dd', '2dt'];
      const labels = ['2d', '2d depan', '2d tengah'];
      return (
        <div
          key={key}
          className={cn(
            'group flex w-40 gap-1 h-8 items-center justify-between space-x-2 px-0 py-0 rounded-md relative'
          )}>
          <select
            {...register(`bsEo.${row.index}.position`, {
              onChange: (e) => handleChange(key, e, row.index),
            })}
            className={cn(
              'w-40 h-8 text-xs rounded-lg shadow-lg cursor-pointer font-semibold px-2  appearance-none text-zinc-400 border border-cyan-600',
              getValues(`bsEo.${row.index}.${type}`) === '2d'
                ? 'bg-teal-500 text-white hover:text-gray-600 hover:bg-teal-500/70'
                : getValues(`bsEo.${row.index}.${type}`) === '2dd'
                ? 'bg-indigo-500 text-white hover:text-gray-600 hover:bg-indigo-500/70'
                : getValues(`bsEo.${row.index}.${type}`) === '2dt'
                ? 'bg-emerald-500 text-white hover:text-gray-600 hover:bg-emerald-500/70 '
                : 'bg-transparent',
              poppins.className
            )}>
            {positionValues.map((val, i) => (
              <option value={val} key={val} className={cn('px-2')}>
                {labels[i]}
              </option>
            ))}
          </select>
          <ChevronDownCircle
            size={14}
            className={cn(
              'absolute right-1 text-white svg group-hover:text-gray-500 group-hover:svg'
            )}
          />
        </div>
      );
    },
    [getValues, handleChange, register]
  );

  const quick2dColumns = useMemo(
    () => [
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
              radioGroupItems = renderRadioGroup(row);
              break;
            default:
              radioGroupItems = null;
          }
          return (
            <div className='w-48 h-16 gap-.5 flex  items-center py-2 p-0'>
              {radioGroupItems}
            </div>
          );
        },
      },
      {
        accessorKey: 'wager',
        header: ({ column }: any) => (
          <div className='flex flex-col gap-1 items-center'>bet</div>
        ),
        cell: ({ row }: any) => {
          return (
            <div className='relative h-14 flex justify-center'>
              <InputCustom
                onInput={(e: ChangeEvent<HTMLInputElement>) =>
                  handleWagerInput(e, row.index)
                }
                {...register(`bsEo.${row.index}.wager`, {
                  onChange: (e) => handleChange('wager', e, row.index),
                })}
                type='tel'
                placeholder='bet'
                className={cn(
                  'w-38 h-8 text-xs font-semibold pl-5 text-zinc-600 placeholder:text-slate-300 border border-zinc-400',
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
        accessorKey: 'position',
        header: ({ column }: any) => (
          <div className='flex items-center justify-center'>position</div>
        ),
        cell: ({ row }: any) => {
          let radioGroupItems;
          switch (row.index) {
            case 0:
              radioGroupItems = renderPositionGroup(
                row,
                'position',
                `bsEo.${row.index}.position`
              );
              break;
            default:
              radioGroupItems = null;
          }
          return (
            <div className='w-38 h-7 gap-.5 flex  items-center py-2 p-0'>
              {radioGroupItems}
            </div>
          );
        },
      },
    ],
    [handleChange, register, renderPositionGroup, renderRadioGroup]
  );

  return {
    quick2dColumns,
  };
};
