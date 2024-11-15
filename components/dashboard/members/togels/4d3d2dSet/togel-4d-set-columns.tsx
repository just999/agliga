'use client';

import { ChangeEvent, useCallback, useEffect, useMemo } from 'react';

import { InputCustom } from '@/components/ui';
import { cn, oldStandardTT, poppins, safeParseFloat } from '@/lib/utils';
import { Sin4dSetSchema } from '@/schemas/togel-schema';
import { Trash2Icon } from 'lucide-react';
import {
  Control,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetFocus,
  UseFormWatch,
} from 'react-hook-form';
import { FaRupiahSign } from 'react-icons/fa6';
import {
  PiNumberCircleFourBold,
  PiNumberCircleThreeBold,
  PiNumberCircleTwoBold,
} from 'react-icons/pi';
import { RiCharacterRecognitionLine } from 'react-icons/ri';

const useTogel4dSetColumns = (
  register: UseFormRegister<Sin4dSetSchema | any>,
  control: Control<Sin4dSetSchema | any>,
  watch: UseFormWatch<Sin4dSetSchema | any>,
  setFocus: UseFormSetFocus<Sin4dSetSchema>,
  getValues: UseFormGetValues<Sin4dSetSchema> | any,
  setValue: UseFormGetValues<Sin4dSetSchema> | any,
  remove: (i: number) => void,
  handleRemove: (i: number) => void,
  handleInputChange: (
    field: any,
    e: ChangeEvent<HTMLInputElement>,
    i: number
  ) => void
) => {
  const watchAllInputs = watch();
  const sin4dSet = watch('sin4dSet');
  const { copy, copyWager } = watchAllInputs;

  useEffect(() => {
    sin4dSet.forEach((row: any, i: number) => {
      if (copyWager === '') {
        setValue(`sin4dSet.${i}.bet2d`, '');
        setValue(`sin4dSet.${i}.bet3d`, '');
        setValue(`sin4dSet.${i}.bet4d`, '');
      }

      const filledFields = ['d1', 'd2', 'd3', 'd4'].filter(
        (key) => row[key] !== ''
      ).length;
      if (filledFields < 2) {
        setValue(`sin4dSet.${i}.allBet`, '', { shouldValidate: false });
        setValue(`sin4dSet.${i}.bet2d`, '', { shouldValidate: false });
        setValue(`sin4dSet.${i}.bet3d`, '', { shouldValidate: false });
        setValue(`sin4dSet.${i}.bet4d`, '', { shouldValidate: false });
      }
    });
  }, [setValue, sin4dSet, copyWager]);

  const setWager4dSet = useCallback(() => {
    sin4dSet.forEach((sin: Sin4dSetSchema, i: number) => {
      const { bet4d, bet3d, bet2d, allBet, ...rest } = sin;
      const countSin = Object.values(rest).filter(
        (val, i) => val !== ''
      ).length;
      if (copy && copyWager && countSin === 2) {
        setValue(`sin4dSet.${i}.bet2d`, copyWager);
        setValue(`sin4dSet.${i}.bet3d`, '');
        setValue(`sin4dSet.${i}.bet4d`, '');
      }
      if (copy && copyWager && countSin === 3) {
        setValue(`sin4dSet.${i}.bet2d`, copyWager);
        setValue(`sin4dSet.${i}.bet3d`, copyWager);
        setValue(`sin4dSet.${i}.bet4d`, '');
      }
      if (copy && copyWager && countSin === 4) {
        setValue(`sin4dSet.${i}.bet2d`, copyWager);
        setValue(`sin4dSet.${i}.bet3d`, copyWager);
        setValue(`sin4dSet.${i}.bet4d`, copyWager);
      }
      if (countSin === 2 && allBet) {
        setValue(`sin4dSet.${i}.bet2d`, allBet);
      }
      if (countSin === 3 && allBet && !(rest.d1 && rest.d2 && rest.d3)) {
        setValue(`sin4dSet.${i}.bet2d`, allBet);
        setValue(`sin4dSet.${i}.bet3d`, allBet);
      }
      if (countSin === 4 && allBet) {
        setValue(`sin4dSet.${i}.bet2d`, allBet);
        setValue(`sin4dSet.${i}.bet3d`, allBet);
        setValue(`sin4dSet.${i}.bet4d`, allBet);
      }
    });
  }, [sin4dSet, copy, copyWager, setValue]);

  useEffect(() => {
    setWager4dSet();
  }, [setWager4dSet]);

  const handleOnInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value = safeParseFloat(
      Math.max(0, parseInt(e.target.value)).toString().slice(0, 1)
    ).toString();
  };

  const handleWagerInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value = safeParseFloat(
      Math.max(0, parseInt(e.target.value)).toString().slice(0, 6)
    ).toString();
  };

  const togel4dSetColumns = useMemo(
    () => [
      {
        accessorKey: 'index',
        header: () => (
          <div className='text-zinc-700 h-full font-semibold flex items-center justify-center'>
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
        id: 'number',
        header: ({ column }: any) => (
          <div className='text-zinc-700 font-semibold w-28 h-full flex items-center justify-center'>
            number
          </div>
        ),
        cell: ({ row }: any) => (
          <div className='flex justify-around w-28'>
            {['d1', 'd2', 'd3', 'd4'].map((key) => (
              <div key={key} className='w-7'>
                <InputCustom
                  onInput={handleOnInput}
                  {...register(`sin4dSet.${row.index}.${key}`, {
                    onChange: (e: ChangeEvent<HTMLInputElement>) =>
                      handleInputChange(key, e, row.index),
                  })}
                  type='tel'
                  className={cn(
                    'p-1 h-7 text-base rounded-lg mx-auto text-center font-extrabold text-shadow shadow-inner',
                    oldStandardTT.className
                  )}
                  style={{ width: '28px' }}
                />
              </div>
            ))}
          </div>
        ),
      },
      {
        id: 'bet',
        header: () => (
          <span className='w-72 h-full text-center flex  items-center justify-center'>
            <input
              type='checkbox'
              {...register('copy')}
              className='w-8 flex justify-center items-end '
            />
            <InputCustom
              onInput={handleWagerInput}
              {...register('copyWager', { pattern: /^[0-9]+$/ })}
              type='tel'
              className={cn(
                'w-24 h-7 text-xs flex items-center pl-5 border border-zinc-300 text-zinc-400 placeholder:text-slate-300  placeholder:text-xs'
              )}
              additionalClass='w-24 gap-0 flex justify-center relative mr-4'
              placeholder='bet all'
              suffix={
                <FaRupiahSign
                  size={10}
                  className='text-zinc-400 absolute left-1'
                />
              }
            />
            <div className=''>bet</div>
          </span>
        ),
        cell: ({ row }: any) => {
          const filledFields = ['d1', 'd2', 'd3', 'd4'].filter(
            (key) => row.original[key] !== ''
          ).length;
          return (
            <div className='flex w-96'>
              {['bet4d', 'bet3d', 'bet2d', 'allBet'].map((key) => (
                <div key={key} className='relative'>
                  <InputCustom
                    onInput={handleWagerInput}
                    placeholder={key}
                    {...register(`sin4dSet.${row.index}.${key}`, {
                      onChange: (e: ChangeEvent<HTMLInputElement>) =>
                        handleInputChange(key, e, row.index),
                    })}
                    suffix={
                      <FaRupiahSign
                        size={10}
                        className='text-zinc-400 absolute left-1 '
                      />
                    }
                    type='tel'
                    className={cn(
                      'w-24 h-7 p-.5  pl-4 mx-auto font-semibold text-xs text-zinc-500 rounded-md placeholder:text-zinc-300 placeholder:text-[10px] flex items-center',
                      key === 'bet4d'
                        ? 'bg-purple-100 border border-purple-400 '
                        : key === 'bet3d'
                          ? 'bg-teal-100  border border-teal-400 '
                          : 'bg-amber-100  border border-amber-400 ',
                      poppins.className
                    )}
                    disabled={key === 'allBet' && filledFields < 2}
                  />
                  {key === 'bet4d' ? (
                    <PiNumberCircleFourBold
                      size={14}
                      className={cn(
                        'text-purple-500 absolute right-1 top-1 svg',
                        row.original.bet4d && 'hidden'
                      )}
                    />
                  ) : key === 'bet3d' ? (
                    <PiNumberCircleThreeBold
                      size={14}
                      className={cn(
                        'text-green-500 absolute right-1 top-1 svg',
                        row.original.bet3d && 'hidden'
                      )}
                    />
                  ) : key === 'bet2d' ? (
                    <PiNumberCircleTwoBold
                      size={14}
                      className={cn(
                        'text-orange-500 absolute right-1 top-1 svg',
                        row.original.bet2d && 'hidden'
                      )}
                    />
                  ) : (
                    <RiCharacterRecognitionLine
                      size={14}
                      className={cn(
                        'text-zinc-500 absolute right-1 top-1 svg',
                        row.original.allBet && 'hidden'
                      )}
                    />
                  )}
                </div>
              ))}
              {/* <pre>{JSON.stringify(row.original, null, 2)}</pre> */}
            </div>
          );
        },
      },
      {
        accessorKey: 'action',
        header: () => <span></span>,
        cell: ({ row }: any) => (
          <Trash2Icon
            size={20}
            onClick={() => remove(row.index)}
            className='svg text-rose-600 hover:-translate-y-1  hover:scale-150 hover:svg duration-300  cursor-pointer pl-1'
          />
        ),
      },
    ],
    [handleInputChange, register, remove]
  );

  return { togel4dSetColumns };
};

export default useTogel4dSetColumns;
