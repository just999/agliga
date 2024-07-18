'use client';

import { useState, useEffect } from 'react';
import SelectInput from '../select-input';
import DepoWdDropdownBankSelect from '../table/depo-wd/depo-wd-dropdown-bank-select';
import { ValueIconProps } from '@/types';

type DebounceSelectProps = {};

const DebounceSelect = ({
  banks,
  value: initialValue,
  onChange,
  // name,
  debounce = 500,
  ...props
}: {
  banks?: ValueIconProps[];
  // name: string;
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <DepoWdDropdownBankSelect
      {...props}
      // name={name}
      banks={banks}
      // value={value}
      onChange={(e) => setValue(value)}
    />
  );
};

export default DebounceSelect;
