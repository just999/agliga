'use client';

import { ChangeEvent, useCallback, useEffect, useMemo, useRef } from 'react';

import { InputCustom, Label } from '@/components/ui';
import { cn, poppins, safeParseFloat } from '@/lib/utils';
import { BseoTableSchema } from '@/schemas/togel-schema';
import { ChevronDownCircle } from 'lucide-react';
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
        <div className='flex w-full flex-col items-end'>
          <span className='grid grid-cols-2 gap-0.5'>
            {values.map((value, index) => (
              <div
                key={value}
                className={cn(
                  'flex cursor-pointer items-center space-x-2 rounded-md border border-orange-300 px-2 py-0 shadow-lg hover:bg-amber-400 hover:text-white',
                  getValues(`bsEo.${row.index}.bseo`) === value &&
                    'w-24 bg-cyan-500 text-yellow-100 hover:bg-cyan-500/70'
                )}
              >
                <Label
                  className={cn(
                    'flex h-7 w-20 cursor-pointer items-center justify-center gap-1 px-1 text-sm font-semibold',
                    poppins.className
                  )}
                >
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
                      'text-shadow text-xs text-gray-500',
                      getValues(`bsEo.${row.index}.bseo`) === value &&
                        'text-white hover:bg-cyan-500/70'
                    )}
                  >
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
            'group relative flex h-8 w-40 items-center justify-between gap-1 space-x-2 rounded-md px-0 py-0'
          )}
        >
          <select
            {...register(`bsEo.${row.index}.position`, {
              onChange: (e) => handleChange(key, e, row.index),
            })}
            className={cn(
              'h-8 w-40 cursor-pointer appearance-none rounded-lg border border-cyan-600 px-2 text-xs font-semibold text-zinc-400 shadow-lg',
              getValues(`bsEo.${row.index}.${type}`) === '2d'
                ? 'bg-teal-500 text-white hover:bg-teal-500/70 hover:text-gray-600'
                : getValues(`bsEo.${row.index}.${type}`) === '2dd'
                  ? 'bg-indigo-500 text-white hover:bg-indigo-500/70 hover:text-gray-600'
                  : getValues(`bsEo.${row.index}.${type}`) === '2dt'
                    ? 'bg-emerald-500 text-white hover:bg-emerald-500/70 hover:text-gray-600'
                    : 'bg-transparent',
              poppins.className
            )}
          >
            {positionValues.map((val, i) => (
              <option value={val} key={val} className={cn('px-2')}>
                {labels[i]}
              </option>
            ))}
          </select>
          <ChevronDownCircle
            size={14}
            className={cn(
              'svg group-hover:svg absolute right-1 text-white group-hover:text-gray-500'
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
          <div className='m-0 w-48 p-0 font-semibold text-zinc-700'>tebak</div>
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
            <div className='gap-.5 flex h-16 w-48 items-center p-0 py-2'>
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
            <div className='relative flex h-14 justify-center'>
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
                  'h-8 w-44 border border-zinc-400 pl-5 text-xs font-semibold text-zinc-600 placeholder:text-slate-300',
                  poppins.className
                )}
                suffix={
                  <FaRupiahSign
                    size={12}
                    className='absolute left-1 text-zinc-300'
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
            <div className='gap-.5 flex h-7 w-44 items-center p-0 py-2'>
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
