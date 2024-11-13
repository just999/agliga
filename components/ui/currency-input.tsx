import React, { ChangeEvent, useState } from 'react';
import { InputCustom } from './inputCustom';

type CurrencyInputProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
};

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  value,
  onChange,
  className,
  placeholder,
  ...props
}) => {
  const formatValue = (value: string) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\./g, '');
    const formattedValue = formatValue(rawValue);
    e.target.value = formattedValue;
    onChange(e);
  };

  return (
    <InputCustom
      value={value}
      onChange={handleChange}
      className={className}
      placeholder={placeholder}
      {...props}
    />
  );
};

export default CurrencyInput;
