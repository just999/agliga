'use client';

import useFormTypes from '@/hooks/use-form-types';
import { FormSchema, NewFormSchema } from '@/schemas';
import { FieldPath, UseFormReturn } from 'react-hook-form';

import { InputCustom } from './shadcn/ui';

type AmountInputProps = {
  methods: UseFormReturn<NewFormSchema, any, undefined>;
};

const AmountInput: React.FC<AmountInputProps> = ({ methods }) => {
  const { formType } = useFormTypes();
  const {
    register,
    formState: { errors },
  } = methods;

  const fieldName: FieldPath<NewFormSchema> =
    formType === 'depo' ? 'depoAmount' : 'wdAmount';

  return (
    <InputCustom
      className='h-12'
      placeholder={formType === 'depo' ? 'Nominal deposit' : 'Nominal Wd'}
      {...register(fieldName)}
      isInvalid={!!errors[fieldName]}
      errorMessage={errors[fieldName]?.message as string}
    />
  );
};

export default AmountInput;
