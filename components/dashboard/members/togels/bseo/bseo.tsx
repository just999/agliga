'use client';

import { Button, InputCustom } from '@/components/ui';
import { useZodForm } from '@/hooks/use-zod-form';
import { cn, generateAndPadArray } from '@/lib/utils';
import { Bseo4dSchema, bseoSchema } from '@/schemas/togel-schema';
import { ChevronLeft } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import BseoTableTest from './bseo-table-test';

type BseoProps = {
  params: {
    slug: string;
  };
};

enum BigSmallOddEven {
  Big = 'big',
  Small = 'small',
  Odd = 'odd',
  Even = 'even',
}

enum Game {
  TwoD = '2d',
  TwoDFront = '2dd',
  TwoDMiddle = '2dt',
}

interface BsOe4dSchema {
  bseo: BigSmallOddEven;
  game: Game;
  status?: string;
  wager?: string;
  dis?: string;
  net?: string;
  period?: string;
}

const Bseo = ({ params }: BseoProps) => {
  const initialBsValues = {
    bseo: '',
    bseoArray: [],
    game: '',
    wager: '',
  } as any;
  const [bs, setBs] = useState<Bseo4dSchema[]>([initialBsValues]);
  const [show, setShow] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setError,
    control,
    setFocus,
    trigger,
    setValue,
    watch,
    formState: { errors, isValid, isSubmitting, isDirty, isLoading },
    getValues,
  } = useZodForm({
    schema: bseoSchema,
    mode: 'onChange',
    defaultValues: {
      bs,
      copy: false,
      copyWager: '',
    },
  });
  const watchAllInputs = watch();
  const bsData = watch('bs');
  const bsDataArray = watch('bs')[0];
  useEffect(() => {
    if (bsData) setBs(bsData);
  }, [setBs, bs, bsData]);

  const { fields } = useFieldArray({
    control,
    name: 'bs',
  });

  const { position, wager, bseo } = bs[0];

  // const handleOptionsChange = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   i: number
  // ) => {
  //   const { name, value } = e.target;

  //   const transEven = allRes.map((va) => ({
  //     d1: va.charAt(0),
  //     d2: va.charAt(1),
  //   }));
  //   if (value === 'even') {
  //     const transEven = newEven.map((va) => ({
  //       d1: va.charAt(0),
  //       d2: va.charAt(1),
  //     }));

  //     setBs((prev) => ({
  //       ...prev,
  //       [name]: transEven,
  //     }));
  //   }
  //   if (value === 'odd') {
  //     const transEven = newOdd.map((va) => ({
  //       d1: va.charAt(0),
  //       d2: va.charAt(1),
  //     }));

  //     setBs((prev) => ({
  //       ...prev,
  //       [name]: transEven,
  //     }));
  //   }

  //   if (value === 'big') {
  //     const transEven = newBig.map((va) => ({
  //       d1: va.charAt(0),
  //       d2: va.charAt(1),
  //     }));

  //     setBs((prev) => ({
  //       ...prev,
  //       [name]: transEven,
  //     }));
  //   }

  //   if (value === 'small') {
  //     const transEven = newSmall.map((va) => ({
  //       d1: va.charAt(0),
  //       d2: va.charAt(1),
  //     }));
  //     setBs((prev) => ({
  //       ...prev,
  //       [name]: transEven,
  //     }));
  //   }
  // };

  // const handleOptionsChange = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   i: number
  // ) => {
  //   const { value } = e.target;
  //   const selectedArray = arrayOptions[value];

  //   // Update the state or perform any other actions with the selected array
  //   setBs((prev) => {
  //     const newState = [...prev];
  //     newState[i] = {
  //       ...newState[i],
  //       bseo: value,
  //       bseoArray: selectedArray,
  //     } as Bseo4dSchema;

  //     setValue('bs', newState);
  //     return newState;
  //   });
  // };

  // const handleGamesChange = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   i: number
  // ) => {
  //   const { value } = e.target;

  //   setBs((prev) => {
  //     const newState = [...prev];
  //     newState[i] = {
  //       ...newState[i],
  //       game: value,
  //     } as Bseo4dSchema;

  //     setValue('bs', newState); // Update the form state
  //     return newState;
  //   });
  // };

  // const handleWagerChange = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   i: number
  // ) => {
  //   const { value } = e.target;

  //   setBs((prev) => {
  //     const newState = [...prev];
  //     newState[i] = {
  //       ...newState[i],
  //       wager: value,
  //     };

  //     setValue('bs', newState); // Update the form state
  //     return newState;
  //   });
  // };

  const newSmall = generateAndPadArray(position, wager, 50, 0);
  const newBig = generateAndPadArray(position, wager, 50, 50);
  const newOdd = generateAndPadArray(position, wager, 50, 1, 2);
  const newEven = generateAndPadArray(position, wager, 50, 0, 2);

  const arrayOptions: any = useMemo(
    () => ({
      big: newBig,
      small: newSmall,
      odd: newOdd,
      even: newEven,
    }),
    [newBig, newEven, newOdd, newSmall]
  );

  // const arrayOptions: any = {
  //   big: newBig,
  //   small: newSmall,
  //   odd: newOdd,
  //   even: newEven,
  // };

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
      const { name, value } = e.target;

      setBs((prev) => {
        const newState = [...prev];
        if (name === `bs.${i}.bseo`) {
          const selectedArray = arrayOptions[value];
          newState[i] = {
            ...newState[i],
            bseo: value,
            bseoArray: selectedArray,
          } as Bseo4dSchema;
        } else {
          newState[i] = {
            ...newState[i],
            [name.split('.')[2]]: value,
          };
        }
        setValue('bs', newState); // Update the form state
        return newState;
      });
    },
    [setBs, setValue, arrayOptions]
  );

  const handleSetBseo = () => {
    const res = getValues();
    setShow((pre) => !pre);
  };

  const positions =
    position === '2d'
      ? '2d umum'
      : position === '2dd'
      ? '2d depan'
      : '2d tengah';

  const bseoValue =
    bseo === 'big'
      ? 'besar'
      : bseo === 'small'
      ? 'kecil'
      : bseo === 'odd'
      ? 'ganjil'
      : 'genap';

  const onSubmit = (data: any) => {};
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, i) => {
          return (
            <div key={field.id} className='flex flex-col'>
              <div className={cn('flex justify-around ')}>
                <div>
                  <div className={cn('flex', show && 'hidden')}>
                    <select
                      {...register(`bs.${i}.bseo`, {
                        onChange: (e) => handleChange(e, i),
                        disabled: !positions && !wager,
                      })}>
                      <option value=''>Besar/kecil/genap/ganjil</option>
                      <option value='big'>Besar</option>
                      <option value='small'>Kecil</option>
                      <option value='odd'>Ganjil</option>
                      <option value='even'>Genap</option>
                    </select>

                    <select
                      {...register(`bs.${i}.position`, {
                        onChange: (e) => handleChange(e, i),
                      })}>
                      <option value=''>2d/2dt/2dd</option>
                      <option value='2dd'>2d depan</option>
                      <option value='2dt'>2d tengah</option>
                      <option value='2d'>2d</option>
                    </select>

                    <InputCustom
                      {...register(`bs.${i}.wager`, {
                        // onChange: (e) => handleChange(e, i),
                      })}
                      placeholder='bet'
                      className='w-32 '
                    />
                  </div>
                  <div className='py-1 relative h-12 '>
                    <Button
                      size='sm'
                      disabled={!isValid}
                      className='px-4 py-1 shadow-lg absolute left-4'
                      type='button'
                      onClick={handleSetBseo}>
                      {show ? (
                        <div className='flex items-center gap-2 '>
                          <ChevronLeft className='svg ' /> Back
                        </div>
                      ) : (
                        'Show details'
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              {/* <BseoTable data={bs} /> */}
              {show && (
                <div>
                  <span className='flex gap-4 items-center '>
                    <p>Pilih: {bseoValue}</p>
                    <p>Posisi: {position}</p>
                  </span>
                  <BseoTableTest
                    data={bsDataArray.bseoArray}
                    gameData={bsDataArray}
                  />
                </div>
              )}
            </div>
          );
        })}
      </form>
    </>
  );
};

export default Bseo;
