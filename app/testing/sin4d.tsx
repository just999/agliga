'use client';

import { Button, InputCustom } from '@/components/shadcn/ui';
import Header from '@/components/testing/header';
import ClientOnly from '@/lib/client-only';
import dynamic from 'next/dynamic';
import { Control, useFieldArray, useForm, useWatch } from 'react-hook-form';

import Price from './price';

type Sin4dProps = {
  control: Control;
  i: number;
};
let renderCount = 0;
// const Price = ({ control, i }: Sin4dProps) => {
//   const value = useWatch({
//     control,
//     name: `items[${i}].name`,
//   });
//   return <span>{(value.type || 0) * (value.amount || 0)}</span>;
// };

const DynamicPrice = dynamic(() => import('./price'), { ssr: false });

const Sin4d = () => {
  const { register, control, handleSubmit, watch } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });
  const onSubmit = (data: any) => {};
  renderCount++;

  return (
    <ClientOnly>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col justify-center w-full '
      >
        {fields.map(({ id, name, type, amount }: any, i) => {
          return (
            <div key={id} className='flex justify-center'>
              <Header renderCount={renderCount} description='blah blah' />
              <InputCustom
                type='text'
                {...register(`items[${i}].name`)}
                defaultValue={name}
              />
              <select {...register(`items[${i}].type`)} defaultValue={type}>
                <option value=''>Select</option>
                <option value='10'>A</option>
                <option value='20'>B</option>s<option value='30'>C</option>
              </select>
              <InputCustom
                type='number'
                {...register(`items[${i}].amount`)}
                defaultValue={amount}
              />

              <DynamicPrice control={control} i={i} />
              <DynamicPrice control={control} i={i} />
              <Button type='button' onClick={() => remove(i)}>
                remove
              </Button>
            </div>
          );
        })}
        <Button size='sm' variant='destructive'>
          Submit
        </Button>
        <Button
          type='button'
          onClick={() => append({})}
          variant='ghost'
          size='sm'
        >
          Append
        </Button>
      </form>
    </ClientOnly>
  );
};

export default Sin4d;
