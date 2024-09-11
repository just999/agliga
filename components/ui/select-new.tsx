'use client';

import { FieldValues, UseFormRegister } from 'react-hook-form';
import Select from 'react-select';

export type SelectNewValue = {
  icon: string;
  value: string;
  desc?: string;
  style?: string;
};

type SelectNewProps = {
  id: string;
  register: UseFormRegister<FieldValues>;
  required: boolean;
  options: () => SelectNewValue[];
  defaultValue?: SelectNewValue;
  onChange: (newValue: SelectNewValue) => void;
};

const SelectNew = ({
  options,
  id,
  register,
  required,
  onChange,
}: SelectNewProps) => {
  return (
    <div>
      <Select
        {...register(id, { required })}
        options={options() as any}
        onChange={(newValue: any) => onChange(newValue.value as SelectNewValue)}
      />
    </div>
  );
};

export default SelectNew;
