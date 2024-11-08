'use client';

import { Button, InputCustom } from '@/components/ui';
import { thead4d } from '@/lib/helper';
import { cn, oldStandardTT, poppins, safeParseFloat } from '@/lib/utils';
import {
  Sin4dFormDataSchema,
  sin4dSchema,
  Sin4dSchema,
} from '@/schemas/togel-schema';

import { MinusCircle, PlusCircle } from 'lucide-react';
import { ChangeEvent, useEffect, useState } from 'react';
import { SubmitHandler, useFieldArray } from 'react-hook-form';
import { FaRupiahSign } from 'react-icons/fa6';
import {
  TogelDiscount,
  TogelGames4d,
  TogelNetWager,
  TotalNetAmount,
} from './togel-games4d';

import { createTogel } from '@/actions/togel-actions';
import { useZodForm } from '@/hooks/use-zod-form';
import ClientOnly from '@/lib/client-only';

type TogelSinProps = {
  slug: string;
};

export type Form4dProps = {
  d1: string;
  d2: string;
  d3: string;
  d4: string;
  game: string;
  wager: string;
  dis: string;
  net: string;
  period: string;
  status: string;
};

const form4d = {
  d1: '',
  d2: '',
  d3: '',
  d4: '',
  game: '',
  wager: '',
  dis: '',
  net: '',
  period: '001',
  status: 'processing',
};

const createEmptyRow = () => form4d;

const sin4dInitial: Sin4dSchema[] = Array(2)
  .fill(null)
  .map(() => createEmptyRow());

let render = 0;

const TogelSin = ({ slug }: TogelSinProps) => {
  const [sin4ds, setSin4ds] = useState<Sin4dSchema[]>(() => sin4dInitial);
  const {
    register,
    handleSubmit,
    control,
    watch,
    setFocus,
    setValue,
    formState: { errors, isValid, isSubmitting, isDirty, isLoading },
    getValues,
  } = useZodForm({
    schema: sin4dSchema,
    mode: 'onChange',
    defaultValues: {
      sin4ds,
    },
  });

  const watchAllInputs = watch();

  const newSinNumber = watchAllInputs.sin4ds;
  useEffect(() => {
    if (newSinNumber) setSin4ds(newSinNumber);
  }, [setSin4ds, newSinNumber]);
  const { fields, prepend, append, remove, update } = useFieldArray({
    control,
    name: 'sin4ds',
  });

  const period = '001';

  useEffect(() => {
    const { copy, copyWager } = watchAllInputs;

    sin4ds.forEach((sin, i: number) => {
      if (copy && copyWager) setValue(`sin4ds.${i}.wager`, copyWager);
    });
  }, [
    watchAllInputs.copy,
    watchAllInputs.copyWager,
    fields,
    sin4ds,
    setValue,
    watchAllInputs.sin4ds,
    period,
    watchAllInputs,
  ]);

  const handleOnInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value = safeParseFloat(
      Math.max(0, parseInt(e.target.value)).toString().slice(0, 1)
    ).toString();
  };

  const handleAddColumn = () => {
    append(form4d);
  };

  const handleWagerInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value = safeParseFloat(
      Math.max(0, parseInt(e.target.value)).toString().slice(0, 12)
    ).toString();
  };

  const handleInputChange = (field: string, value: string, i: number) => {
    if (value.length === 1) {
      const fields: Array<keyof (typeof watchAllInputs.sin4ds)[0]> = [
        'd1',
        'd2',
        'd3',
        'd4',
        'wager',
      ];
      const currentIndex = fields.indexOf(
        field as keyof (typeof watchAllInputs.sin4ds)[0]
      );
      const nextField = fields[currentIndex + 1];
      if (nextField) {
        setFocus(`sin4ds.${i}.${nextField}`);
      }
    }
  };

  const onSubmit: SubmitHandler<Sin4dFormDataSchema> = async (data) => {
    const filteredData = {
      ...data,
      sin4ds: data.sin4ds.filter((item) => item.game !== ' '),
    };
    const res = await createTogel(filteredData);

    if (data) setSin4ds(data.sin4ds);
  };
  useEffect(() => {
    render++;
  }, []);
  return (
    <ClientOnly>
      <div>render: {render}</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <table>
          <thead>
            <tr>
              {thead4d.map((head) => (
                <th
                  key={head.label}
                  colSpan={head.colspan}
                  className='text-sm font-bold'>
                  {head.label === 'wager' ? (
                    <span className='text-center flex items-center justify-center'>
                      <input
                        type='checkbox'
                        {...register('copy')}
                        className='mx-1'
                      />
                      <InputCustom
                        onInput={handleWagerInput}
                        {...register('copyWager', {
                          pattern: /^[0-9]+$/,
                        })}
                        type='tel'
                        className='w-16 h-7 text-zinc-600 placeholder:text-slate-300'
                        placeholder='bet'
                        isInvalid={!!errors.copyWager}
                        errorMessage={errors.copyWager?.message as string}
                      />
                      <div className='pl-1'>bet</div>
                    </span>
                  ) : (
                    <span>{head.label}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fields.map((row, i) => {
              return (
                <tr key={row.id}>
                  <td>
                    <span>{i + 1}.</span>
                    {/* <span>
                      <InputCustom
                        {...register(`sin4ds.${i}.period`)}
                        defaultValue='001'
                      />
                    </span> */}
                  </td>
                  <td>
                    <InputCustom
                      onInput={handleOnInput}
                      type='tel'
                      {...register(`sin4ds.${i}.d1` as const, {
                        maxLength: 1,
                        onChange: (e) =>
                          handleInputChange('d1', e.target.value, i),
                      })}
                      className={cn(
                        'p-1 h-7 w-9 text-base  rounded-lg mx-auto text-center font-extrabold text-shadow shadow-inner',
                        oldStandardTT.className
                      )}
                    />
                    {/* <pre>{JSON.stringify(`sin4ds.${i}.d1`, null, 2)}</pre>
                    <pre>{JSON.stringify(row.net, null, 2)}</pre>
                    <pre>{JSON.stringify(row.game, null, 2)}</pre> */}
                  </td>
                  <td>
                    <InputCustom
                      onInput={handleOnInput}
                      type='tel'
                      {...register(`sin4ds.${i}.d2`, {
                        maxLength: 1,
                        onChange: (e) =>
                          handleInputChange('d2', e.target.value, i),
                      })}
                      className={cn(
                        'p-1 h-7 w-9 text-base  rounded-lg mx-auto text-center font-extrabold text-shadow shadow-inner',
                        oldStandardTT.className
                      )}
                    />
                  </td>
                  <td>
                    <InputCustom
                      onInput={handleOnInput}
                      type='tel'
                      {...register(`sin4ds.${i}.d3`, {
                        maxLength: 1,
                        onChange: (e) =>
                          handleInputChange('d3', e.target.value, i),
                      })}
                      className={cn(
                        'p-1 h-7 w-9 text-base  rounded-lg mx-auto text-center font-extrabold text-shadow shadow-inner',
                        oldStandardTT.className
                      )}
                    />
                  </td>
                  <td>
                    <InputCustom
                      onInput={handleOnInput}
                      type='tel'
                      {...register(`sin4ds.${i}.d4`, {
                        maxLength: 1,
                        onChange: (e) =>
                          handleInputChange('d4', e.target.value, i),
                      })}
                      className={cn(
                        'p-1 h-7 w-9 text-base rounded-lg mx-auto text-center font-extrabold text-shadow shadow-inner',
                        oldStandardTT.className
                      )}
                    />
                  </td>

                  <td className='w-12 '>
                    <TogelGames4d
                      getValues={getValues}
                      register={register}
                      setValue={setValue}
                      control={control}
                      i={i}
                      className={cn(
                        'w-12 h-7 p-.5 px-2 mx-auto font-semibold text-xs border text-zinc-500 text-center rounded',
                        poppins.className
                      )}
                    />
                  </td>
                  <td>
                    <InputCustom
                      onInput={handleWagerInput}
                      {...register(`sin4ds.${i}.wager`, {
                        onChange: (e) =>
                          handleInputChange('wager', e.target.value, i),
                      })}
                      suffix={
                        <FaRupiahSign
                          size={12}
                          className='text-zinc-300 absolute left-1'
                        />
                      }
                      className={cn(
                        'w-32 h-7 p-.5  pl-5 mx-auto font-semibold text-xs border border-slate-400 text-zinc-500 rounded',
                        poppins.className
                      )}
                    />
                  </td>
                  <td>
                    <TogelDiscount
                      getValues={getValues}
                      register={register}
                      setValue={setValue}
                      control={control}
                      i={i}
                      className={cn(
                        'w-12 h-7 p-.5 px-2 mx-auto font-semibold text-xs border text-zinc-500 text-center rounded-lg',
                        poppins.className
                      )}
                    />
                  </td>
                  <td className='border-separate border-spacing-1 border border-amber-300 rounded-lg w-32'>
                    <TogelNetWager
                      getValues={getValues}
                      register={register}
                      setValue={setValue}
                      control={control}
                      i={i}
                      className={cn(
                        'w-32 h-7 p-.5  pl-5 mx-auto font-semibold text-xs border border-slate-400 text-zinc-500 rounded',
                        poppins.className
                      )}
                    />
                  </td>
                  {i > 0 && (
                    <td className='cursor-pointer mx-2'>
                      <MinusCircle
                        size={12}
                        onClick={() => remove(i)}
                        className='svg text-rose-600 hover:-translate-y-1  hover:scale-150 hover:svg duration-300'
                      />
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className='flex items-center text-nowrap text-zinc-500 text-sm font-bold h-7'>
                Total:&nbsp;{' '}
                {/* <FaRupiahSign size={12} className='text-zinc-500 ' />{' '} */}
              </td>
              <td className='text-nowrap text-zinc-500 text-sm font-bold'>
                <TotalNetAmount
                  gameType='togel4d'
                  getValues={getValues}
                  register={register}
                  setValue={setValue}
                  control={control}
                  className={cn(
                    'w-32 h-7 p-.5  pl-5 mx-auto font-semibold text-xs border border-slate-400 text-zinc-500 rounded',
                    poppins.className
                  )}
                />
              </td>
            </tr>
          </tfoot>
        </table>
        <div className='flex justify-between items-center px-4 py-2'>
          <Button
            type='button'
            size='sm'
            variant='default'
            className='text-shadow-lg text-xs text-white font-semibold shadow-lg hover:bg-orange-300 hover:text-gray-600 hover:font-semibold px-2 py-1'
            onClick={handleAddColumn}>
            <PlusCircle
              size={14}
              className='svg text-sky-700 pr-1 hover:text-green-600'
            />{' '}
            Tambah baris
          </Button>

          <br />
          <pre>isValid: {isValid.toString()}</pre>
          <br />
          <pre>errors: {JSON.stringify(errors)}</pre>

          <Button
            disabled={!isValid}
            size='sm'
            variant='primary'
            className='px-3 py-.5'>
            Submit
          </Button>
        </div>
      </form>
    </ClientOnly>
  );
};

export default TogelSin;
