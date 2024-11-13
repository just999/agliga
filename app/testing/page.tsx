// 'use client';

// import dynamic from 'next/dynamic';
// import { useEffect, useState } from 'react';

// import AppTest from '@/components/testing/quick2d-virtualization';
// import { Control, useFieldArray, useForm, useWatch } from 'react-hook-form';

// export type TestingPageProps = {
//   cart: {
//     name: string;
//     amount: number;
//     check: boolean;
//   }[];
//   checkbox: boolean;
// };

// let renderCount = 0;

// const TestingPage = () => {
//   const [check, setCheck] = useState(false);
//   const {
//     register,
//     control,
//     handleSubmit,
//     watch,
//     unregister,
//     setValue,
//     formState: { errors },
//   } = useForm<TestingPageProps>({
//     defaultValues: {
//       cart: [{ name: '', amount: 0, check: false }],
//       checkbox: true,
//     },
//     shouldUnregister: true,
//   });
//   const { fields, append, prepend, remove } = useFieldArray({
//     name: 'cart',
//     control,
//     rules: {
//       required: 'Please append at least 1 item',
//     },
//   });

//   const checkbox = watch('checkbox');
//   const cart = watch('cart');

//   const onSubmit = (data: TestingPageProps) => console.log(data);
//   renderCount++;

//   useEffect(() => {
//     if (!checkbox) {
//       unregister('cart', { keepError: true });
//     }
//   }, [unregister, checkbox]);

//   const getTotal = (payload: TestingPageProps['cart']) => {
//     let total = 0;

//     for (const item of payload) {
//       total = total + (Number.isNaN(item.amount) ? 0 : item.amount);
//     }
//     return total;
//   };

//   const DynamicTotalAmount = dynamic(() => import('./total-amount'), {
//     ssr: false,
//   });
//   const TotalAmount = ({ control }: { control: Control<TestingPageProps> }) => {
//     const cartValues = useWatch({
//       control,
//       name: `cart`,
//     });
//     console.log(cartValues);
//     return getTotal(cartValues);
//   };

//   return (
//     // <ClientOnly>
//     //   <div className='flex flex-col justify-center items-center bg-amber-50 '>
//     //     <Header renderCount={renderCount} description='blah blah' />
//     //     <form onSubmit={handleSubmit(onSubmit)}>
//     //       {fields.map((field, i) => {
//     //         return (
//     //           <span key={field.id}>
//     //             {checkbox ? (
//     //               <div>
//     //                 <section key={field.id} className='flex '>
//     //                   <label htmlFor='name'>
//     //                     <span>Name</span>
//     //                     <InputCustom
//     //                       {...register(`cart.${i}.name`, { required: true })}
//     //                     />
//     //                   </label>
//     //                   <label htmlFor='amount'>
//     //                     <span>Amount</span>
//     //                     <InputCustom
//     //                       type='number'
//     //                       {...register(`cart.${i}.amount`, {
//     //                         valueAsNumber: true,
//     //                       })}
//     //                     />
//     //                   </label>

//     //                   <InputCustom
//     //                     type='checkbox'
//     //                     {...register(`cart.${i}.check`, {
//     //                       onChange: (e) => {
//     //                         if (`cart.${i}.name` && `cart.${i}.amount`) {
//     //                           setCheck((prev) => !prev);
//     //                         }
//     //                       },
//     //                     })}
//     //                   />

//     //                   <Button
//     //                     type='button'
//     //                     onClick={() => {
//     //                       remove(i);
//     //                     }}>
//     //                     Remove
//     //                   </Button>
//     //                 </section>
//     //               </div>
//     //             ) : null}
//     //           </span>
//     //         );
//     //       })}
//     //       <span>Checkbox</span>
//     //       <InputCustom type='checkbox' {...register(`checkbox`)} />
//     //       <Button
//     //         type='button'
//     //         onClick={() => {
//     //           append({
//     //             name: 'Append',
//     //             amount: 0,
//     //             check: false,
//     //           });
//     //         }}>
//     //         Append
//     //       </Button>
//     //       <Button
//     //         type='button'
//     //         onClick={() => {
//     //           prepend({
//     //             name: 'Prepend',
//     //             amount: 0,
//     //             check: false,
//     //           });
//     //         }}>
//     //         Prepend
//     //       </Button>

//     //       <DynamicTotalAmount
//     //         control={control}
//     //         getTotal={getTotal}
//     //         useWatch={useWatch}
//     //       />

//     //       <p>{errors.cart?.root?.message}</p>
//     //       <Button type='submit'>Submit</Button>
//     //     </form>
//     //   </div>
//     //   <TableTesting />
//     //   {/* <Sin4d /> */}
//     // </ClientOnly>

//     // <TestTable />
//     <AppTest />
//   );
// };

// export default TestingPage;

'use client';

import Container from '@/components/container';

import TanstackTable from '@/components/testing/tanstack-table';

import CurrencyInput from '@/components/ui/currency-input';
import { cn, poppins } from '@/lib/utils';
import { ChangeEvent, useState } from 'react';

type TestingPageProps = {};

const TestingPage = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <Container>
      <CurrencyInput
        value={inputValue}
        onChange={handleInputChange}
        className={cn(
          'p-1 w-full h-7 text-center text-base  rounded-lg placeholder:text-zinc-200 placeholder:font-semibold font-semibold placeholder:text-xs shadow-inner placeholder:tracking-normal placeholder:text-left',
          poppins.className
        )}
        placeholder='Enter number'
      />
    </Container>
  );
};

export default TestingPage;
