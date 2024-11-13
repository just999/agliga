'use client';

import { InputCustom } from '@/components/ui';
import { Label } from '@/components/ui/label';
import { useCalculator, usePermAndFormat } from '@/hooks/use-togel-bbfs';
import { useZodForm } from '@/hooks/use-zod-form';
import {
  cn,
  formatInputValue,
  oldStandardTT,
  poppins,
  safeParseFloat,
} from '@/lib/utils';
import {
  bbSin4dSchema,
  BbSin4dSchema,
  Number4dSetSchema,
} from '@/schemas/togel-schema';

import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useFieldArray } from 'react-hook-form';
import { FaRupiahSign } from 'react-icons/fa6';

import { BbfsTable } from './bbfs-table';
import {
  PiNumberCircleFourBold,
  PiNumberCircleThreeBold,
  PiNumberCircleTwoBold,
} from 'react-icons/pi';

type BbfsProps = {
  params: {
    slug: string;
  };
};
let render = 0;
export const initialBbValues = {
  bbNumber: '',
  bet2d: '',
  bet3d: '',
  bet4d: '',
  allBet: '',
};

const Bbfs = ({ params }: BbfsProps) => {
  const [num, setNum] = useState<string[]>([]);

  const [bb, setBb] = useState<BbSin4dSchema[]>([initialBbValues]);

  const [bbNum, setBbNum] = useState<Number4dSetSchema[]>([]);
  const [show, setShow] = useState<boolean>(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const {
    register,
    handleSubmit,
    setError,
    control,
    setFocus,
    setValue,
    watch,
    formState: { errors, isValid, isSubmitting, isDirty, isLoading },
    getValues,
  } = useZodForm({
    schema: bbSin4dSchema,
    mode: 'onChange',
    defaultValues: { bb, copy: false, copyWager: '', totalBet: '' },
  });
  const { fields } = useFieldArray({
    control,
    name: 'bb',
  });

  const watchAllInputs = watch();
  const bbVal = watch('bb');
  useEffect(() => {
    if (bbVal) setBb(bbVal);
  }, [setBb, bb, bbVal]);

  const { copy, copyWager, bb: bf } = watchAllInputs;
  const { results, updateValues } = useCalculator(initialBbValues);

  const { unique2dArray, unique3dArray, unique4dArray } = usePermAndFormat(
    num,
    bbVal,
    copy === false,
    copyWager
  );

  const setAllBet = useCallback(() => {
    bb.forEach((_, i) => {
      if (copy) {
        if (copyWager) {
          if (bf[0].bbNumber.length === 2) {
            setValue(`bb.${i}.bet2d`, copyWager);
            setValue(`bb.${i}.bet3d`, '');
            setValue(`bb.${i}.bet4d`, '');
          }
          if (bf[0].bbNumber.length === 3) {
            setValue(`bb.${i}.bet2d`, copyWager);
            setValue(`bb.${i}.bet3d`, copyWager);
            setValue(`bb.${i}.bet4d`, '');
          }
          if (bf[0].bbNumber.length === 4) {
            setValue(`bb.${i}.bet2d`, copyWager);
            setValue(`bb.${i}.bet3d`, copyWager);
            setValue(`bb.${i}.bet4d`, copyWager);
          }
        } else {
          setValue(`bb.${i}.bet2d`, '');
          setValue(`bb.${i}.bet3d`, '');
          setValue(`bb.${i}.bet4d`, '');
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bb, copy, bbNum, copyWager, bf, setValue]);

  useEffect(() => {
    setAllBet();
  }, [setAllBet, bbNum]);

  const handleWagerInput = (
    key: string,
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (value === '') {
      setValue(`bb.${index}.bet2d`, '');
      setValue(`bb.${index}.bet3d`, '');
      setValue(`bb.${index}.bet4d`, '');
    } else {
      e.target.value = safeParseFloat(
        Math.max(0, parseInt(value)).toString().slice(0, 6)
      ).toString();
      inputRefs.current[index] = e.target;
    }
  };

  // const handle4dInput = (e: ChangeEvent<HTMLInputElement>) => {
  //   e.target.value = safeParseFloat(
  //     Math.max(0, parseInt(e.target.value)).toString().slice(0, 5)
  //   ).toString();
  // };

  const handle4dInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
    e.target.value = value.slice(0, 5); // Limit to 5 characters
  };

  const handleOptionsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    const { name, value } = e.target;
    const formattedValue = formatInputValue(e.target.value);
    setNum(formattedValue.split(','));
    if (bbVal) {
      updateValues(bbVal[0]);
      setValue(`bb.${i}`, bbVal[0]);
    }
  };

  const handleWagerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const [field, index, key] = name.split('.');

    setBb((prev) =>
      prev.map((item, i) => {
        return i === parseInt(index) ? { ...item, [key]: value } : item;
      })
    );
  };

  const allRes = useMemo(
    () => [...results.result2d, ...results.result3d, ...results.result4d],
    [results.result2d, results.result3d, results.result4d]
  );
  useEffect(() => {
    const updateBbNumber = () => {
      const updatedBbNumber = bbVal.map((b) => {
        const { bbNumber: _, ...rest } = b; // Remove bbNumber property
        return { ...rest, ...allRes };
      });

      setBbNum((prev) => {
        // Check if the new array is different from the previous state to avoid unnecessary updates
        if (JSON.stringify(prev) !== JSON.stringify(updatedBbNumber)) {
          return updatedBbNumber;
        }
        return prev;
      });
    };

    updateBbNumber();
  }, [bbVal, allRes]);

  const isEmptyResult = (arr: string[]) => arr.length === 1 && arr[0] === '';

  // const onSubmit = (data: any) => {
  // };

  // Watch specific fields
  const watchedFields = watch(['bb', 'copy', 'copyWager', 'totalBet']);
  useEffect(() => {
    // Perform actions based on watched fields

    const subscription = watch((data) => {});

    return () => subscription.unsubscribe();
  }, [watch]);

  const bbfsDataTable = [...unique4dArray, ...unique3dArray, ...unique2dArray];
  useEffect(() => {
    if (allRes.length > 0) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [allRes.length, bbVal, setShow, show, allRes]);

  useEffect(() => {
    render++;
  }, []);

  return (
    <>
      {/* <div className='font-semibold text-xs'>render: {render}</div> */}
      <div className='flex w-full py-2'>
        <div className='flex flex-col '>
          {fields.map((field, i) => {
            return (
              <div
                key={field.id}
                className={cn(
                  'w-full flex flex-col bg-emerald-100 shadow-inner rounded-md p-2',
                  !show && 'h-20'
                )}>
                <span
                  className={cn(
                    'text-center flex items-center justify-around text-sm font-normal py-1',
                    poppins.className
                  )}>
                  <div className='w-fit'>
                    <Label className='text-xs font-normal text-center'>
                      nomor
                    </Label>
                  </div>
                  <div className='w-108 h-full text-center flex gap-2 pl-12 items-center justify-center'>
                    <input
                      type='checkbox'
                      {...register('copy')}
                      className='h-8 flex justify-center items-end '
                    />
                    <InputCustom
                      {...register('copyWager', {
                        pattern: /^[0-9]+$/,
                        onChange: () => handleWagerInput,
                      })}
                      type='tel'
                      // onInput={() => handleWagerInput}
                      className='w-36 h-7 text-xs flex items-center pl-5 border border-zinc-300 text-zinc-400 placeholder:text-slate-300  placeholder:text-xs'
                      additionalClass='w-36 gap-0 flex justify-center relative'
                      placeholder='bet all'
                      suffix={
                        <FaRupiahSign
                          size={12}
                          className='text-zinc-400 absolute left-1'
                        />
                      }
                    />
                    <div className='text-nowrap'>bet</div>
                  </div>
                </span>
                <div className='flex w-full gap-1'>
                  <div className='flex w-full border border-amber-500 rounded-lg'>
                    <InputCustom
                      onInput={handle4dInput}
                      {...register(`bb.${i}.bbNumber` as const, {
                        onChange: (e) => handleOptionsChange(e, i),
                      })}
                      defaultValue={field.bbNumber}
                      className={cn(
                        'p-1 w-full h-7 text-center text-base tracking-[8px] rounded-lg placeholder:text-zinc-200 placeholder:font-semibold font-semibold placeholder:text-xs shadow-inner placeholder:tracking-normal placeholder:text-left',
                        oldStandardTT.className
                      )}
                      placeholder='max 5 angka'
                    />
                  </div>
                  <div className='flex '>
                    {/* <label className='flex flex-col'>bet:</label> */}
                    <div className='flex items-center gap-.5'>
                      {['bet4d', 'bet3d', 'bet2d'].map((key) => (
                        <span key={key} className='relative'>
                          <InputCustom
                            key={key}
                            // onInput={() => handleWagerInput(key, e, i)}
                            {...register(
                              `bb.${i}.${key}` as `bb.${number}.${keyof BbSin4dSchema}`,
                              {
                                onChange: (e) => handleWagerInput(key, e, i),
                              }
                            )}
                            defaultValue={
                              field[key as keyof BbSin4dSchema] || ''
                            }
                            suffix={
                              <FaRupiahSign
                                size={12}
                                className='text-zinc-400 absolute left-1 '
                              />
                            }
                            type='tel'
                            className={cn(
                              'w-36 h-7 p-.5  pl-5 mx-auto font-semibold text-xs text-zinc-500 rounded-md placeholder:text-zinc-300',
                              key === 'bet4d'
                                ? 'bg-purple-100 border border-purple-400 '
                                : key === 'bet3d'
                                ? 'bg-teal-100  border border-teal-400 '
                                : 'bg-amber-100  border border-amber-400 ',
                              poppins.className
                            )}
                            placeholder={key}
                          />
                          {key === 'bet4d' ? (
                            <PiNumberCircleFourBold
                              size={18}
                              className='text-indigo-500 absolute right-1 top-1 svg'
                            />
                          ) : key === 'bet3d' ? (
                            <PiNumberCircleThreeBold
                              size={18}
                              className='text-emerald-500 absolute right-1 top-1 svg '
                            />
                          ) : (
                            <PiNumberCircleTwoBold
                              size={18}
                              className='text-orange-500 absolute right-1 top-1 svg '
                            />
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className='w-full relative'>
                  {/* <Button
                      type='submit'
                      size='sm'
                      className='w-14 absolute right-2 px-2 py-1 my-1  '>
                      Submit
                    </Button> */}
                  {show && (
                    <BbfsTable
                      data={allRes}
                      i={i}
                      bbData={watchAllInputs.bb}
                      bbfsTableData={bbfsDataTable}
                      // control={control}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
    </>
  );
};

export default Bbfs;
