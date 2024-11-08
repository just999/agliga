// 'use client';

// import { Button, InputCustom, Spinner } from '@/components/ui';
// import { Label } from '@/components/ui/label';
// import { makeUniqPermutations } from '@/hooks/use-togel-bbfs';

// import { useZodForm } from '@/hooks/use-zod-form';
// import {
//   cn,
//   oldStandardTT,
//   poppins,
//   roboto,
//   safeParseFloat,
// } from '@/lib/utils';
// import {
//   BbSin4dSchema,
//   bbSin4dSchema,
//   BbSinSchema,
// } from '@/schemas/togel-schema';
// import { ChangeEvent, useCallback, useEffect, useState } from 'react';
// import { useFieldArray } from 'react-hook-form';
// import { FaRupiahSign } from 'react-icons/fa6';
// import { Bb4dNumber } from './togel-games4d';

// type TogelTableBbfsProps = {
//   params: {
//     slug: string;
//   };
// };

// export type FormBbProps = {
//   bbNumber: string;
//   bet4d?: string;
//   bet3d?: string;
//   bet2d?: string;
//   allBet?: string;
// };

// const form4d = {
//   bbNumber: '',
//   bet4d: '',
//   bet3d: '',
//   bet2d: '',
//   allBet: '',
// };
// const initialValues = {
//   bbNumber: '',
//   bet2d: '',
//   bet3d: '',
//   bet4d: '',
//   allBet: '',
// };

// type CalculatorResults = {
//   result4d: string[];
//   result3d: string[];
//   result2d: string[];
//   netWager: string;
// };

// const createEmptyRow = () => form4d;

// const initialData = Array(1)
//   .fill(null)
//   .map(() => createEmptyRow());

// const TogelTableBbfs = ({ params }: TogelTableBbfsProps) => {
//   const [bbfs, setBbfs] = useState<BbSin4dSchema[]>(() => initialData);
//   const [values, setValues] = useState<FormBbProps>(initialValues);
//   const [results, setResults] = useState<CalculatorResults>({
//     result4d: [],
//     result3d: [],
//     result2d: [],
//     netWager: '',
//   });
//   const {
//     register,
//     handleSubmit,
//     setError,
//     control,
//     setFocus,
//     setValue,
//     watch,
//     formState: { errors, isValid, isSubmitting, isDirty, isLoading },
//     getValues,
//   } = useZodForm({
//     schema: bbSin4dSchema,
//     mode: 'onChange',
//     defaultValues: {
//       bbfs,
//       copy: false,
//       copyWager: '',
//       totalBet: '',
//     },
//   });

//   // const { results, updateValues } = useCalculator(initialValues);
//   const { fields } = useFieldArray({
//     control,
//     name: 'bbfs',
//   });

//   const bbfsSin4 = watch('bbfs');
//   useEffect(() => {
//     if (bbfsSin4) setBbfs(bbfsSin4);
//   }, [setValues, values,bbfsS]);

//   useEffect(() => {
//     const calculateResults = () => {
//       const permutate = (input: string, size: number): string[] => {
//         const results: string[] = [];
//         const doPermute = (
//           input: string[],
//           output: string[],
//           used: boolean[],
//           size: number,
//           level: number
//         ) => {
//           if (size === level) {
//             const word = output.join('');
//             results.push(word);
//             return;
//           }
//           level++;
//           for (let i = 0; i < input.length; i++) {
//             if (used[i]) continue;
//             used[i] = true;
//             output.push(input[i]);
//             doPermute(input, output, used, size, level);
//             used[i] = false;
//             output.pop();
//           }
//         };
//         const chars = Math.max(0, parseInt(input)).toString().split('');
//         const output: string[] = [];
//         const used: boolean[] = new Array(chars.length).fill(false);
//         doPermute(chars, output, used, size, 0);
//         return results;
//       };

//       const unique = (arr: string[]): string[] => [...new Set(arr)];

//       const result4d = unique(permutate(values.bbNumber, 4).sort());

//       const result3d = unique(permutate(values.bbNumber, 3).sort());

//       const result2d = unique(permutate(values.bbNumber, 2).sort());

//       // const result3d = unique(permutate(values.bbNumber, 3).sort());
//       // const result2d = unique(permutate(values.bbNumber, 2).sort());

//       const netWager =
//         values.bet2d &&
//         values.bet3d &&
//         values.bet4d &&
//         (-(
//           parseFloat(result2d.length.toString()) *
//             parseFloat(values.bet2d) *
//             0.407 +
//           parseFloat(result3d.length.toString()) *
//             parseFloat(values.bet3d) *
//             0.407 +
//           parseFloat(result4d.length.toString()) *
//             parseFloat(values.bet4d) *
//             0.337
//         )).toFixed();

//       if (netWager) setResults({ result4d, result3d, result2d, netWager });
//     };

//     calculateResults();
//   }, [values]);
//   const handleInputChange = useCallback(
//     (
//       field: string,
//       target: {
//         name: string;
//         value: string;
//       },
//       i: number
//     ) => {
//       if (target.value.length === 5) {
//         const fields: Array<keyof (typeof bbfs)[0]> = [
//           `bbNumber`,
//           'bet4d',
//           'bet3d',
//           'bet2d',
//         ];
//         const currentIndex = fields.indexOf(field as keyof (typeof bbfs)[0]);
//         const nextField = fields[currentIndex + 1];
//         if (nextField) {
//           setFocus(`bbfs.${i}.${nextField}`);
//         }
//       }
//       const { name, value } = target;
//       setValues((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     },
//     [fields, setFocus, bbfsSin4]
//   );
//   const va = values?.bbNumber;
//   const res =
//     Object.entries(va).length > 0 ? (
//       makeUniqPermutations(4, [bbfsSin4[0].bbNumber])
//     ) : (
//       <div>no value</div>
//     );

//   const handleCheckNumber = () => {
//     if (bbfsSin4[0]) setValues(bbfsSin4[0]);
//   };
//   const handleOnInput = (e: ChangeEvent<HTMLInputElement>) => {
//     e.target.value = safeParseFloat(
//       Math.max(0, parseInt(e.target.value)).toString().slice(0, 1)
//     ).toString();
//   };

//   const handleWagerInput = (e: ChangeEvent<HTMLInputElement>) => {
//     e.target.value = safeParseFloat(
//       Math.max(0, parseInt(e.target.value)).toString().slice(0, 12)
//     ).toString();
//   };

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     // updateValues({ [name]: bbfsSin4 });
//   };

//   const onSubmit = (data: BbSinSchema) => {};

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <div className='flex py-2'>
//         <div className='flex gap-.5'>
//           {fields.map((field, i) => {
//             return (
//               <div key={field.id} className='flex flex-col '>
//                 <span
//                   className={cn(
//                     'text-center flex items-center justify-around text-sm font-semibold py-1',
//                     roboto.className
//                   )}>
//                   <div>
//                     <Label>Nomor</Label>
//                   </div>
//                   <div className='flex gap-1 items-center '>
//                     <input
//                       type='checkbox'
//                       {...register('copy')}
//                       className='mx-1'
//                     />
//                     <InputCustom
//                       onInput={handleWagerInput}
//                       {...register('copyWager', {
//                         pattern: /^[0-9]+$/,
//                       })}
//                       type='tel'
//                       className='w-24 h-7 text-zinc-600 placeholder:text-slate-300'
//                       placeholder='bet'
//                       isInvalid={!!errors.copyWager}
//                       errorMessage={errors.copyWager?.message as string}
//                       suffix={
//                         <FaRupiahSign
//                           size={12}
//                           className='text-zinc-300 absolute left-1'
//                         />
//                       }
//                     />
//                     <div className='pl-1'>all bet</div>
//                   </div>
//                 </span>
//                 <div className='flex flex-col'>
//                   <div className='flex justify-between gap-2'>
//                     <InputCustom
//                       type='tel'
//                       placeholder='max 5 number'
//                       {...register(`bbfs.${i}.bbNumber`, {
//                         onChange: (e: ChangeEvent<HTMLInputElement>) =>
//                           handleInputChange('bbNumber', e.target, i),
//                       })}
//                       className={cn(
//                         'p-1 w-24 h-7 text-base tracking-[8px] rounded-lg placeholder:text-zinc-200 placeholder:font-semibold   font-extrabold shadow-inner',
//                         oldStandardTT.className
//                       )}
//                     />

//                     <Bb4dNumber
//                       getValues={getValues}
//                       register={register}
//                       setValue={setValue}
//                       control={control}
//                       i={i}
//                       className={cn(
//                         'w-24 h-7 p-.5 px-2 mx-auto font-semibold text-xs border text-zinc-500 text-center rounded-lg',
//                         poppins.className
//                       )}
//                     />
//                   </div>
//                   <div className='flex gap-0.5'>
//                     {['bet4d', 'bet3d', 'bet2d'].map((key) => (
//                       <InputCustom
//                         key={key}
//                         onInput={handleWagerInput}
//                         {...register(
//                           `bbfs.${i}.${key}` as `bbfs.${number}.${keyof BbSin4dSchema}`,
//                           {
//                             onChange: (e: ChangeEvent<HTMLInputElement>) =>
//                               handleInputChange &&
//                               handleInputChange('bet4d', e.target, i),
//                           }
//                         )}
//                         type='tel'
//                         className='w-20 h-7 placeholder:pl-2 placeholder:text-stone-200 placeholder:font-bold'
//                         placeholder='bet 4d'
//                         suffix={
//                           <FaRupiahSign
//                             size={12}
//                             className='text-zinc-300 absolute left-1'
//                           />
//                         }
//                       />
//                     ))}

//                     {/* <InputCustom
//                       onInput={handleWagerInput}
//                       {...register(`bbfs.${i}.bet3d`, {
//                         onChange: (e: ChangeEvent<HTMLInputElement>) =>
//                           handleInputChange &&
//                           handleInputChange('bet3d', e.target, i),
//                       })}
//                       type='tel'
//                       className='w-20 h-7 placeholder:pl-2 placeholder:text-stone-200 placeholder:font-bold'
//                       placeholder='bet 3d'
//                       suffix={
//                         <FaRupiahSign
//                           size={12}
//                           className='text-zinc-300 absolute left-1'
//                         />
//                       }
//                     />
//                     <InputCustom
//                       onInput={handleWagerInput}
//                       {...register(`bbfs.${i}.bet2d`, {
//                         onChange: (e: ChangeEvent<HTMLInputElement>) =>
//                           handleInputChange &&
//                           handleInputChange('bet2d', e.target, i),
//                       })}
//                       type='tel'
//                       className='w-20 h-7 placeholder:pl-2 placeholder:text-stone-200 placeholder:font-bold'
//                       placeholder='bet 2d'
//                       suffix={
//                         <FaRupiahSign
//                           size={12}
//                           className='text-zinc-300 absolute left-1'
//                         />
//                       }
//                     /> */}

//                     <div>
//                       <h3>Results:</h3>
//                       <p>
//                         Result 4D:{' '}
//                         {results.result4d.length > 0
//                           ? results.result4d.join(', ')
//                           : 'No results'}{' '}
//                         -{results.result4d.length}
//                       </p>
//                       <p>
//                         Result 3D:{' '}
//                         {results.result3d.length > 0
//                           ? results.result3d.join(', ')
//                           : 'No results'}{' '}
//                         -{results.result3d.length}
//                       </p>
//                       <p>
//                         Result 2D:{' '}
//                         {results.result2d && results.result2d.length > 0
//                           ? results.result2d.join(', ')
//                           : 'No results'}{' '}
//                         -{results.result2d.length}
//                       </p>
//                       <p>Net Wager: {results.netWager}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//       <Button
//         type='button'
//         variant='default'
//         size='sm'
//         className='right-0 py-2 px-2 '
//         onClick={handleCheckNumber}>
//         {isLoading ? <Spinner /> : 'Check Details Nomor'}
//       </Button>
//     </form>
//   );
// };

// export default TogelTableBbfs;
