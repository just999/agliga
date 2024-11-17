import { cn, federant } from '@/lib/utils';
import React from 'react';

type RupiahProps = {
  value: number;
  className?: string;
};

const formatCurrency = (value: number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return formatter.format(value);
};

export const Rupiah = ({ value, className }: RupiahProps) => {
  const formattedValue = formatCurrency(value);
  const [currencySymbol, amount] = formattedValue.split('$');

  return (
    <span className={cn(className)}>
      <span className={cn('text-stone-400', federant.className)}>Rp. </span>
      {amount}
    </span>
  );
};
