'use client';

import { ChangeEvent, useCallback, useEffect, useState } from 'react';

import { Button, InputCustom } from '@/components/shadcn/ui';
import { useZodForm } from '@/hooks/use-zod-form';
import ClientOnly from '@/lib/client-only';
import { thead4dSet } from '@/lib/helper';
import { cn, oldStandardTT, poppins, safeParseFloat } from '@/lib/utils';
import {
  Sin4dSetFormDataSchema,
  Sin4dSetSchema,
  sin4dSetSchema,
} from '@/schemas/togel-schema';
import { MinusCircle, PlusCircle } from 'lucide-react';
import { SubmitHandler, useFieldArray } from 'react-hook-form';
import { FaRupiahSign } from 'react-icons/fa6';

import { TotalAmountSet } from './togel-games4d';

type Togel4dSetProps = {
  params: {
    slug: string;
  };
};

export type Form4dSetProps = {
  d1?: string;
  d2?: string;
  d3?: string;
  d4?: string;
  bet4d?: string;
  bet3d?: string;
  bet2d?: string;
  allBet?: string;
};

const form4d = {
  d1: '',
  d2: '',
  d3: '',
  d4: '',
  bet4d: '',
  bet3d: '',
  bet2d: '',
  allBet: '',
};

export type FormSetValuesProps = {
  sin4dSet: Form4dSetProps[];
  copy: boolean;
  copyWager: string;
  totalBet: string;
};

const createEmptyRow = () => form4d;

const sin4dSetInitial: Sin4dSetSchema[] = Array(2)
  .fill(null)
  .map(() => createEmptyRow());

let render = 0;
const Togel4dSet = ({ params }: Togel4dSetProps) => {
  // const [disable2d, setDisable2d] = useState<boolean>(true);
  // const [disable3d, setDisable3d] = useState<boolean>(true);
  // const [disable4d, setDisable4d] = useState<boolean>(true);
  const [sin4dSet, setSin4dSet] = useState<Sin4dSetSchema[]>(
    () => sin4dSetInitial
  );
  const {
    register,
    handleSubmit,
    unregister,
    control,
    watch,
    setFocus,
    reset,
    setValue,
    formState: { errors, isValid, isSubmitting, isDirty, isLoading },
    getValues,
  } = useZodForm({
    schema: sin4dSetSchema,
    mode: 'onChange',
    defaultValues: {
      sin4dSet,
      copy: false,
      copyWager: '',
      totalBet: '',
    },
  });

  const watchAllInputs = watch();
  const newSinNumberSet = watchAllInputs.sin4dSet;
  useEffect(() => {
    if (newSinNumberSet) setSin4dSet(newSinNumberSet);
  }, [newSinNumberSet]);

  const sin4dSetData = watch('sin4dSet');

  const { fields, prepend, append, remove, update } = useFieldArray({
    control,
    name: 'sin4dSet',
    rules: {
      required: 'please blah blah',
    },
  });

  const period = '001';

  const filteredSin = sin4dSet.map((sin, i) => {
    return Array(sin).map(({ bet4d, bet3d, bet2d, allBet, ...rest }, i) => {
      const res = Object.values(rest).filter((val) => val !== '').length;
      return { i, res };
    });
  });

  // useSetTogel4d(sin4dSetData, watchAllInputs, watch, setValue);

  // useEffect(() => {
  //   const { copy, copyWager } = watchAllInputs;

  //   sin4dSet.forEach((sin, i) => {
  //     const { bet4d, bet3d, bet2d, allBet, ...rest } = sin;
  //     const countSin = Object.values(rest).filter((val) => val !== '').length;

  //     if (copy && copyWager && countSin === 2) {
  //       setValue(`sin4dSet.${i}.bet2d`, copyWager);
  //     }
  //     if (
  //       copy &&
  //       copyWager &&
  //       countSin === 3 &&
  //       !(rest.d1 && rest.d2 && rest.d3)
  //     ) {
  //       setValue(`sin4dSet.${i}.bet2d`, copyWager);
  //       setValue(`sin4dSet.${i}.bet3d`, copyWager);
  //     }
  //     if (copy && copyWager && countSin === 4) {
  //       setValue(`sin4dSet.${i}.bet2d`, copyWager);
  //       setValue(`sin4dSet.${i}.bet3d`, copyWager);
  //       setValue(`sin4dSet.${i}.bet4d`, copyWager);
  //     }

  //     if (countSin === 2 && allBet) {
  //       setValue(`sin4dSet.${i}.bet2d`, allBet);
  //     }
  //     if (countSin === 3 && allBet && !(rest.d1 && rest.d2 && rest.d3)) {
  //       setValue(`sin4dSet.${i}.bet2d`, allBet);
  //       setValue(`sin4dSet.${i}.bet3d`, allBet);
  //     }
  //     if (countSin === 4 && allBet) {
  //       setValue(`sin4dSet.${i}.bet2d`, allBet);
  //       setValue(`sin4dSet.${i}.bet3d`, allBet);
  //       setValue(`sin4dSet.${i}.bet4d`, allBet);
  //     }
  //   });
  // }, [
  //   watchAllInputs.copy,
  //   watchAllInputs.copyWager,
  //   fields,
  //   setValue,
  //   sin4dSet,
  //   period,
  //   ...useMemo(
  //     () => sin4dSet.map((_, i) => watch(`sin4dSet.${i}.allBet`)),
  //     [sin4dSet]
  //   ),
  // ]);

  // useEffect(() => {
  //   const { copy, copyWager } = watchAllInputs;

  //   sin4dSet.map((sin, i: number) => {
  //     Array(sin).map(({ bet4d, bet3d, bet2d, allBet, ...rest }, idx) => {
  //       const countSin = Object.values(rest).filter((val) => val !== '').length;
  //       if (copy && copyWager && countSin === 2)
  //         setValue(`sin4dSet.${i}.bet2d`, copyWager);
  //       // setValue(`sin4dSet.${i}.bet3d`, '');
  //       // setValue(`sin4dSet.${i}.bet4d`, '');
  //       if (
  //         copy &&
  //         copyWager &&
  //         countSin === 3 &&
  //         !(rest.d1 && rest.d2 && rest.d3)
  //       ) {
  //         setValue(`sin4dSet.${i}.bet2d`, copyWager);
  //         setValue(`sin4dSet.${i}.bet3d`, copyWager);
  //         // setValue(`sin4dSet.${i}.bet4d`, '');
  //       }
  //       if (copy && copyWager && countSin === 4) {
  //         setValue(`sin4dSet.${i}.bet2d`, copyWager);
  //         setValue(`sin4dSet.${i}.bet3d`, copyWager);
  //         setValue(`sin4dSet.${i}.bet4d`, copyWager);
  //       }

  //       if (countSin === 2 && allBet)
  //       setValue(`sin4dSet.${i}.bet2d`, copyWager);
  //     });
  //   });
  // }, [
  //   watchAllInputs.copy,
  //   watchAllInputs.copyWager,
  //   fields,
  //   setValue,
  //   sin4dSet,
  //   ...sin4dSet.map((_, i) => watch(`sin4dSet.${i}.allBet`)),
  //   period,
  // ]);
  // const countFilledFields = (form: any) => {
  //   return form.reduce((count: number, sin: any) => {
  //     return count + Object.values(sin).filter((value) => value !== '').length;
  //   }, 0);
  // };

  // const filledFieldsCount = countFilledFields(sin4dSet);
  // const countFilledFields = (form: any) => {
  //   return form.map((sin: any, index: number) => {
  //     const filledCount = Object.values(sin).filter(
  //       (value) => value !== ''
  //     ).length;
  //     return { index, filledCount };
  //   });
  // };

  // const filledFieldsCounts = countFilledFields(sin4dSet);
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

  const handleInputChange = useCallback(
    (field: string, value: string, i: number) => {
      const valueFields =
        field === 'd1' || field === 'd2' || field === 'd3' || field === 'd4'
          ? value.length === 1
          : value.length === 5;

      if (valueFields) {
        const fields: Array<keyof (typeof watchAllInputs.sin4dSet)[0]> = [
          'd1',
          'd2',
          'd3',
          'd4',
          'bet4d',
          'bet3d',
          'bet2d',
          'allBet',
        ];
        const currentIndex = fields.indexOf(
          field as keyof (typeof watchAllInputs.sin4dSet)[0]
        );
        const nextField = fields[currentIndex + 1];
        if (nextField) {
          setFocus(`sin4dSet.${i}.${nextField}`);
        }
      }
    },
    [setFocus, watchAllInputs]
  );

  const handlePreviewBet = () => {
    const res = getValues('sin4dSet');
  };

  const onSubmit: SubmitHandler<Sin4dSetFormDataSchema> = async (data) => {
    data.sin4dSet.forEach((sin, i) => {
      const { bet4d, bet3d, bet2d, allBet, ...rest } = sin;
      const countSin = Object.values(rest).filter((val) => val !== '').length;
    });

    const filteredData = {
      ...data,
      sin4dSet: data.sin4dSet.filter(
        (item) =>
          (((item.d1 && item.d2) ||
            (item.d2 && item.d3) ||
            (item.d3 && item.d4)) &&
            item.bet2d) ||
          (item.d2 && item.d3 && item.d4 && item.bet3d) ||
          (item.d1 && item.d2 && item.d3 && item.d4 && item.bet4d)
      ),
    };
  };

  render++;
  return (
    <ClientOnly>
      <div>render: {render}</div>
      {/* <div>c: {countNum}</div> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <table>
          <thead>
            <tr>
              {thead4dSet.map((head) => (
                <th
                  key={head.label}
                  colSpan={head.colspan}
                  className='text-sm font-bold'
                >
                  {head.label === 'bet' ? (
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
                        className='w-20 h-7 text-zinc-600 placeholder:text-slate-300'
                        placeholder='bet'
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
                      {...register(`sin4dSet.${i}.d1` as const, {
                        maxLength: 1,
                        onChange: (e) =>
                          handleInputChange('d1', e.target.value, i),
                      })}
                      className={cn(
                        'p-1 h-7 w-9 text-base  rounded-lg mx-auto text-center font-extrabold text-shadow shadow-inner',
                        oldStandardTT.className
                      )}
                    />
                    {/* <pre>{JSON.stringify(`sin4dSet.${i}.d1`, null, 2)}</pre>
                <pre>{JSON.stringify(row.net, null, 2)}</pre>
                <pre>{JSON.stringify(row.game, null, 2)}</pre> */}
                  </td>
                  <td>
                    <InputCustom
                      onInput={handleOnInput}
                      type='tel'
                      {...register(`sin4dSet.${i}.d2`, {
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
                      {...register(`sin4dSet.${i}.d3`, {
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
                      {...register(`sin4dSet.${i}.d4`, {
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

                  {/* <td className='w-12 '>
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
                  </td> */}

                  <td>
                    <InputCustom
                      placeholder='bet 4d'
                      type='tel'
                      onInput={handleWagerInput}
                      {...register(`sin4dSet.${i}.bet4d`, {
                        onChange: (e) =>
                          handleInputChange('bet4d', e.target.value, i),
                      })}
                      suffix={
                        <FaRupiahSign
                          size={12}
                          className='text-zinc-300 absolute left-1'
                        />
                      }
                      // disabled={(countNum ?? 0) > 4}
                      // disabled={
                      //   (countNum !== undefined && countNum > 4) ||
                      //   (countNum !== undefined && countNum < 2)
                      // }
                      className={cn(
                        'w-20 h-7 p-.5  pl-5 mx-auto font-semibold placeholder:text-sky-300  text-xs border border-slate-400 text-zinc-500 rounded',
                        poppins.className
                      )}
                    />

                    {/* <Togel4dSetWager
                      getValues={getValues}
                      register={register}
                      setValue={setValue}
                      control={control}
                      i={i}
                      className={cn(
                        'w-20 h-7 p-.5  pl-5 mx-auto font-semibold placeholder:text-sky-300  text-xs border border-slate-400 text-zinc-500 rounded',
                        poppins.className
                      )}
                    /> */}
                  </td>
                  <td>
                    <InputCustom
                      placeholder='bet 3d'
                      type='tel'
                      onInput={handleWagerInput}
                      {...register(`sin4dSet.${i}.bet3d`, {
                        // disabled: disable3d,
                        onChange: (e) =>
                          handleInputChange('bet3d', e.target.value, i),
                      })}
                      suffix={
                        <FaRupiahSign
                          size={12}
                          className='text-zinc-300 absolute left-1'
                        />
                      }
                      className={cn(
                        'w-20 h-7 p-.5  pl-5 mx-auto font-semibold placeholder:text-sky-300  text-xs border border-slate-400 text-zinc-500 rounded',
                        poppins.className
                      )}
                    />
                  </td>
                  <td>
                    <InputCustom
                      placeholder='bet 2d'
                      type='tel'
                      onInput={handleWagerInput}
                      {...register(`sin4dSet.${i}.bet2d`, {
                        onChange: (e) =>
                          handleInputChange('bet2d', e.target.value, i),
                      })}
                      suffix={
                        <FaRupiahSign
                          size={12}
                          className='text-zinc-300 absolute left-1'
                        />
                      }
                      className={cn(
                        'w-20 h-7 p-.5  pl-5 mx-auto font-semibold placeholder:text-sky-300 text-xs border border-slate-400 text-zinc-500 rounded',
                        poppins.className
                      )}
                    />
                  </td>
                  <td>
                    <InputCustom
                      placeholder='all bet'
                      type='tel'
                      onInput={handleWagerInput}
                      {...register(`sin4dSet.${i}.allBet`, {
                        onChange: (e) =>
                          handleInputChange('bet2d', e.target.value, i),
                      })}
                      suffix={
                        <FaRupiahSign
                          size={12}
                          className='text-zinc-300 absolute left-1'
                        />
                      }
                      className={cn(
                        'w-20 h-7 p-.5  pl-5 mx-auto font-semibold placeholder:text-sky-300 text-xs border border-slate-400 text-zinc-500 rounded',
                        poppins.className
                      )}
                    />
                    {/* <Togel4dSetWager
                      getValues={getValues}
                      register={register}
                      setValue={setValue}
                      control={control}
                      i={i}
                      className={cn(
                        'w-20 h-7 p-.5  pl-5 mx-auto font-semibold placeholder:text-sky-300 text-xs border border-slate-400 text-zinc-500 rounded',
                        poppins.className
                      )}
                    /> */}
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

              <td className='flex items-center text-nowrap text-zinc-500 text-sm font-bold h-7'>
                Total:&nbsp;{' '}
                {/* <FaRupiahSign size={12} className='text-zinc-500 ' />{' '} */}
              </td>
              <td className='text-nowrap text-zinc-500 text-sm font-bold'>
                {/* <TotalNetAmount
                  gameType='togel4dSet'
                  getValues={getValues}
                  register={register}
                  setValue={setValue}
                  control={control}
                  className={cn(
                    'w-20 h-7 p-.5  pl-5 mx-auto font-semibold text-xs border border-slate-400 text-zinc-500 rounded',
                    poppins.className
                  )}
                /> */}
                <TotalAmountSet
                  control={control}
                  className={cn(
                    'w-20 h-7 p-.5  pl-5 mx-auto font-semibold text-xs border border-slate-400 text-zinc-500 rounded',
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
            onClick={handleAddColumn}
          >
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
          <p>{errors.sin4dSet?.root?.message}</p>
          <Button
            type='button'
            disabled={!isValid}
            size='sm'
            onClick={handlePreviewBet}
            variant='primary'
            className='px-3 py-.5'
          >
            Check-Bet
          </Button>
        </div>
      </form>
    </ClientOnly>
  );
};

export default Togel4dSet;
