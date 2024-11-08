'use client';

import { Button, InputCustom } from '@/components/ui';
import { Label } from '@/components/ui/label';
import { useCalculator, usePermAndFormat } from '@/hooks/use-togel-bbfs';
import { useZodForm } from '@/hooks/use-zod-form';
import {
  cn,
  formatInputValue,
  oldStandardTT,
  poppins,
  roboto,
  safeParseFloat,
} from '@/lib/utils';
import {
  bbSin4dSchema,
  BbSin4dSchema,
  Number4dSetSchema,
  Sin4dSchema,
} from '@/schemas/togel-schema';

import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { FaRupiahSign } from 'react-icons/fa6';

import { form4d } from './4d3d2d/togel-table';
import TogelTableBb from './togel-table-bb';
import { TogelTableComponent } from './togel-table-component';
import bbfs from './bbfs/bbfs';

type BbfsProps = {
  params: {
    slug: string;
  };
};

export const initialBbValues = {
  bbNumber: '',
  bet2d: '',
  bet3d: '',
  bet4d: '',
  allBet: '',
};

// const formatInputValue = (value: string): string => {
//   // Remove any non-digit characters
//   const digits = value.replace(/\D/g, '');

//   // Limit to 5 characters
//   const limitedDigits = digits.slice(0, 5);

//   // Add commas after each digit
//   return limitedDigits.split('').join(',');
// };

const Bbfs = ({ params }: BbfsProps) => {
  const [num, setNum] = useState<string[]>([]);
  const [showBbfs, setShowBbfs] = useState<boolean>(false);
  const [bb, setBb] = useState<BbSin4dSchema[]>([initialBbValues]);
  const [sin4ds, setSin4ds] = useState<Sin4dSchema[]>([form4d]);
  const [un2d, setUn2d] = useState<Sin4dSchema[]>([]);
  const [un3d, setUn3d] = useState<Sin4dSchema[]>([]);
  const [un4d, setUn4d] = useState<Sin4dSchema[]>([]);
  const [bbNum, setBbNum] = useState<Number4dSetSchema[]>([]);

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
    defaultValues: { bb, copy: false, copyWager: '' },
  });
  const { fields } = useFieldArray({
    control,
    name: 'bb',
  });

  const watchAllInputs = watch();
  const bbVal = watch('bb');

  useEffect(() => {
    if (bb) setBb(bbVal);
  }, [setBb, bb, bbVal]);

  const { copy, copyWager, bb: bf } = watchAllInputs;
  const { results, updateValues } = useCalculator(initialBbValues);

  // const res2 = usePerm(2, num);
  // const res3 = usePerm(3, num);
  // const res4 = usePerm(4, num);
  const { unique2dArray, unique3dArray, unique4dArray } = usePermAndFormat(
    num,
    bb,
    copy === false,
    copyWager
  );
  const setAllBet = useCallback(() => {
    bb.forEach((_, i) => {
      if (copy && copyWager) {
        if (bf[0].bbNumber.length >= 2) {
          setValue(`bb.${i}.bet2d`, copyWager);
          setValue(`bb.${i}.bet3d`, '');
          setValue(`bb.${i}.bet4d`, '');
        }
        if (bf[0].bbNumber.length >= 3) {
          setValue(`bb.${i}.bet2d`, copyWager);
          setValue(`bb.${i}.bet3d`, copyWager);
          setValue(`bb.${i}.bet4d`, '');
        }
        if (bf[0].bbNumber.length >= 4) {
          setValue(`bb.${i}.bet2d`, copyWager);
          setValue(`bb.${i}.bet3d`, copyWager);
          setValue(`bb.${i}.bet4d`, copyWager);
        } else if (bf[0].bbNumber.length < 2) {
          setValue(`bb.${i}.bet2d`, '');
          setValue(`bb.${i}.bet3d`, '');
          setValue(`bb.${i}.bet4d`, '');
        }
      }
    });
  }, [copy, copyWager, bf, setValue, bb]);

  useEffect(() => {
    setAllBet();

    return () => {
      setAllBet();
    };
  }, [setAllBet]);

  // !FORMAT NUMBER INTO 2D NUMBER
  // const formatted2d = res2.reduce<Sin4dSchema[]>((acc, curr) => {
  //   if (curr && bbfs[0].bet2d) {
  //     const temp = curr.split('').map((t, i) => ({
  //       d1: '',
  //       d2: '',
  //       d3: curr[0],
  //       d4: curr[1],
  //       game: '2d',
  //       wager: bbfs[0].bet2d,
  //       dis: '29%',
  //       net: (Number(bbfs[0].bet2d) * (71 / 100)).toString(),
  //       period: '001',
  //       status: 'processing',
  //     }));
  //     acc.push(...temp);
  //   }
  //   return acc;
  // }, []);
  // const unique2d = Array.from(
  //   new Set(formatted2d.map((item) => JSON.stringify(item)))
  // ).map((item) => JSON.parse(item));
  // !FORMAT NUMBER INTO 3D NUMBER
  // let newRes3: any = [];
  // const formatted3d = res3.reduce<Sin4dSchema[]>((acc, curr) => {
  //   if (curr && bbfs[0].bet3d) {
  //     const temp = curr.split('').map((t, i) => ({
  //       d1: '',
  //       d2: curr[0],
  //       d3: curr[1],
  //       d4: curr[2],
  //       game: '3d',
  //       wager: bbfs[0].bet3d,
  //       dis: '59%',
  //       net: (Number(bbfs[0].bet3d) * (41 / 100)).toString(),
  //       period: '001',
  //       status: 'processing',
  //     }));
  //     acc.push(...temp);
  //   }
  //   return acc;
  // }, []);
  // const new3dArray = formatted3d.flat(1);

  // const unique3d = Array.from(
  //   new Set(new3dArray.map((item) => JSON.stringify(item)))
  // ).map((item) => JSON.parse(item));
  // !FORMAT NUMBER INTO 4D NUMBER
  // let newRes4: any = [];
  // const formatted4d = res4.reduce<Sin4dSchema[]>((acc, curr) => {
  //   if (curr && bbfs[0].bet4d) {
  //     const temp = curr.split('').map((t, i) => ({
  //       d1: curr[0],
  //       d2: curr[1],
  //       d3: curr[2],
  //       d4: curr[3],
  //       game: '4d',
  //       wager: bbfs[0].bet4d,
  //       dis: '66%',
  //       net: (Number(bbfs[0].bet4d) * (34 / 100)).toString(),
  //       period: '001',
  //       status: 'processing',
  //     }));
  //     acc.push(...temp);
  //   }
  //   return acc;
  // }, []);
  // const new4dArray = formatted4d.flat(1);

  // const unique4d = Array.from(
  //   new Set(new4dArray.map((item) => JSON.stringify(item)))
  // ).map((item) => JSON.parse(item));
  const handleCheckNumber = () => {
    // if (bbfsSin4[0]) setValues(bbfsSin4[0]);

    const v = getValues();
    setShowBbfs((prev) => !prev);
  };

  const handleWagerInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value = safeParseFloat(
      Math.max(0, parseInt(e.target.value)).toString().slice(0, 6)
    ).toString();
  };
  const handle4dInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value = safeParseFloat(
      Math.max(0, parseInt(e.target.value)).toString().slice(0, 8)
    ).toString();
  };

  const handleOptionsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    const formattedValue = formatInputValue(e.target.value);
    setNum(formattedValue.split(','));

    if (bb) {
      updateValues(bb[0]);
      setValue(`bb.${i}`, bb[0]);
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

  // const allRes = [
  //   ...results.result2d,
  //   ...results.result3d,
  //   ...results.result4d,
  // ];
  const allRes = useMemo(
    () => [...results.result2d, ...results.result3d, ...results.result4d],
    [results.result2d, results.result3d, results.result4d]
  );

  useEffect(() => {
    const updateBbNumber = () => {
      const updatedBbNumber = bb.map((b) => {
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
  }, [bb, allRes]);

  const isEmptyResult = (arr: string[]) => arr.length === 1 && arr[0] === '';

  const onSubmit = (data: any) => {};

  // Watch specific fields
  const watchedFields = watch(['bb', 'copy', 'copyWager', 'totalBet']);
  useEffect(() => {
    // Perform actions based on watched fields

    const subscription = watch((data) => {});

    return () => subscription.unsubscribe();
  }, [watch]);

  const bbfsDataTable = [...unique4dArray, ...unique3dArray, ...unique2dArray];
  const bbData = [...un4d, ...un3d, ...un2d];
  // useEffect(() => {
  //   const updateBbNumber = () => {
  //     const updatedBbNumber = bb.map((b) => {
  //       const { bbNumber: _, ...rest } = b; // Remove bbNumber property
  //       return { ...rest, ...allRes };
  //     });

  //     setBbNum((prev) => {
  //       // Check if the new array is different from the previous state to avoid unnecessary updates
  //       if (JSON.stringify(prev) !== JSON.stringify(updatedBbNumber)) {
  //         return updatedBbNumber;
  //       }
  //       return prev;
  //     });
  //   };

  //   updateBbNumber();
  // }, [bb, allRes]);
  useEffect(() => {
    const formatResults = (
      formatted: string[],
      bet: string,
      game: string,
      dis: string,
      netFactor: number
    ) => {
      return formatted.reduce<Sin4dSchema[]>((acc, curr) => {
        if (curr && bet) {
          const temp = curr.split('').map((_, i) => ({
            d1: game === '4d' ? curr[0] : '',
            d2: game === '4d' ? curr[1] : game === '3d' ? curr[0] : '',
            d3: game === '4d' ? curr[2] : game === '3d' ? curr[1] : curr[0],
            d4: game === '4d' ? curr[3] : game === '3d' ? curr[2] : curr[1],
            game,
            wager: bet,
            dis,
            net: (Number(bet) * netFactor).toString(),
            period: '001',
            status: 'processing',
          }));
          acc.push(...temp);
        }
        return acc;
      }, []);
    };

    const result2 =
      bb[0].bet2d &&
      formatResults(results.result2d, bb[0].bet2d, '2d', '29%', 0.71);
    const result3 =
      bb[0].bet3d &&
      formatResults(results.result3d, bb[0].bet3d, '3d', '59%', 0.41);
    const result4 =
      bb[0].bet4d &&
      formatResults(results.result4d, bb[0].bet4d, '4d', '66%', 0.34);

    result2 &&
      setUn2d(
        Array.from(new Set(result2.map((item) => JSON.stringify(item)))).map(
          (item) => JSON.parse(item)
        )
      );
    result3 &&
      setUn3d(
        Array.from(new Set(result3.map((item) => JSON.stringify(item)))).map(
          (item) => JSON.parse(item)
        )
      );
    result4 &&
      setUn4d(
        Array.from(new Set(result4.map((item) => JSON.stringify(item)))).map(
          (item) => JSON.parse(item)
        )
      );
  }, [results.result2d, results.result3d, results.result4d, bb]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex py-2 w-full'>
          <div className='flex flex-col '>
            {fields.map((field, i) => {
              return (
                <div key={field.id} className='flex flex-col'>
                  <span
                    className={cn(
                      'text-center flex items-center justify-around text-sm font-semibold py-1',
                      roboto.className
                    )}>
                    <div className='w-fit'>
                      <Label className='text-sm font-semibold bg-slate-100 text-center'>
                        Nomor
                      </Label>
                    </div>
                    <div className='flex gap-1 items-center '>
                      <input
                        type='checkbox'
                        {...register('copy')}
                        className='mx-1'
                      />
                      <InputCustom
                        {...register('copyWager', {
                          pattern: /^[0-9]+$/,
                        })}
                        type='tel'
                        onInput={handleWagerInput}
                        className='w-24 h-7 pl-5 text-zinc-600 placeholder:text-slate-300 placeholder:pl-2'
                        placeholder='bet all'
                        suffix={
                          <FaRupiahSign
                            size={12}
                            className='text-zinc-300 absolute left-1'
                          />
                        }
                      />
                      <div className='pl-1 shadow-inner bg-slate-100/50'>
                        all bet
                      </div>
                    </div>
                  </span>
                  <div className='flex w-full gap-1'>
                    <div className='flex w-full'>
                      <InputCustom
                        onInput={handle4dInput}
                        {...register(`bb.${i}.bbNumber` as const, {
                          onChange: (e) => handleOptionsChange(e, i),
                        })}
                        defaultValue={field.bbNumber}
                        className={cn(
                          'p-1 w-full h-7 pl-5 text-base tracking-[8px] rounded-lg placeholder:text-zinc-200 placeholder:font-semibold font-extrabold shadow-inner placeholder:tracking-normal',
                          oldStandardTT.className
                        )}
                        placeholder='max 5 angka'
                      />
                    </div>
                    <div className='flex '>
                      {/* <label className='flex flex-col'>bet:</label> */}
                      <div className='flex items-center gap-.5'>
                        {['bet4d', 'bet3d', 'bet2d'].map((key) => (
                          <InputCustom
                            key={key}
                            onInput={handleWagerInput}
                            {...register(
                              `bb.${i}.${key}` as `bb.${number}.${keyof BbSin4dSchema}`,
                              {
                                onChange: (e) => handleWagerChange(e),
                              }
                            )}
                            defaultValue={
                              field[key as keyof BbSin4dSchema] || ''
                            }
                            suffix={
                              <FaRupiahSign
                                size={12}
                                className='text-zinc-300 absolute left-1'
                              />
                            }
                            type='tel'
                            className={cn(
                              'w-36 h-7 p-.5  pl-5 mx-auto font-semibold text-xs border border-slate-400 text-zinc-500 rounded placeholder:text-zinc-200',
                              poppins.className
                            )}
                            placeholder={key}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className='w-full relative py-1'>
                    <Button
                      size='sm'
                      className='w-14 absolute right-2 px-2 py-1 my-1  '>
                      Submit
                    </Button>
                    <TogelTableComponent
                      data={allRes}
                      i={i}
                      bbData={watchAllInputs.bb}
                    />
                  </div>
                </div>
              );
            })}

            <div>
              {/* <div>
                <h2>
                  Permutations of size 2 with length:{' '}
                  {isEmptyResult(res2) ? 0 : res2.length}
                </h2>
                <ul>
                  {res2.map((perm, index) => (
                    <li key={index}>{formatInputValue(perm)}</li>
                  ))}
                  <pre>{JSON.stringify(res2, null, 2)}</pre>
                </ul>
              </div> */}
              {/* <div>
                <h2>
                  Permutations of size 3 with length:{' '}
                  {isEmptyResult(res3) ? 0 : res3.length}
                </h2>
                <ul>
                  {res3.map((perm, index) => (
                    <li key={index}>{formatInputValue(perm)}</li>
                  ))}
                  <pre>{JSON.stringify(res3, null, 2)}</pre>
                </ul>
              </div> */}
              {/* <div>
                <h2>
                  Permutations of size 4 with length:{' '}
                  {isEmptyResult(res4) ? 0 : res4.length}
                </h2>
                <ul>
                  {res4.map((perm, index) => (
                    <li key={index}>{formatInputValue(perm)}</li>
                  ))}
                  <pre>{JSON.stringify(res4, null, 2)}</pre>
                </ul>
              </div> */}
              <div className=' '>
                {/* {result2.map((res, i) => (
                  <div key={i} className='flex flex-col '>
                    <div>d1:''</div>
                    <div>d2:'' </div>
                    <div>d3:{res.d3}</div>
                    <div>d4:{res.d4}</div>
                    <div>game:'d2'</div>
                    <div>wager:{res.wager}</div>
                    <div>dis:'29%'</div>
                    <div>net:Rp. {Number(res.wager) * (71 / 100)} </div>
                    <div>periode:'001'</div>
                  </div>
                ))} */}

                {/* <pre>{JSON.stringify(bbNum, null, 2)}</pre>
                <pre>{JSON.stringify(allRes, null, 2)}</pre> */}
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* {isEmptyResult(results.result2d)
        ? 0
        : results.result2d.map((res) => (
            <p key={res}>
              {res} - {results.result2d.length}
            </p>
          ))}
      {results.result3d.map((res3) => (
        <li key={res3}>
          {res3} - {results.result3d.length}
        </li>
      ))}
      {results.result4d.map((res4) => (
        <li key={res4}>
          {res4} - {results.result4d.length}
        </li>
      ))} */}

      {/* {bbData.map((dat, i) => (
        <div key={i}>{dat.game}</div>
      ))} */}
      {/* <div>
        2d {results.result2d.length} nomor x 29% Rp.{bb[0].bet2d} = Rp.{' '}
        {(results.result2d.length * Number(bb[0].bet2d) * (71 / 100)).toFixed(
          1
        )}
      </div>
      <div>
        3d {results.result3d.length} nomor x 59% Rp.{bb[0].bet3d} = Rp.{' '}
        {(results.result3d.length * Number(bb[0].bet3d) * (71 / 100)).toFixed(
          1
        )}
      </div>
      <div>
        2d {results.result4d.length} nomor x 29% Rp.{bb[0].bet4d} = Rp.{' '}
        {(results.result4d.length * Number(bb[0].bet4d) * (34 / 100)).toFixed(
          1
        )}
      </div> */}
      {/* <TogelTableBb dataTable={bbData} /> */}
      {showBbfs && bbfsDataTable && <TogelTableBb dataTable={bbData} />}
    </>
  );
};

export default Bbfs;
