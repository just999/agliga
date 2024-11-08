'use client';

import { Control, useWatch } from 'react-hook-form';

type Sin4dProps = {
  control: Control;
  i: number;
};
const Price = ({ control, i }: Sin4dProps) => {
  const value = useWatch({
    control,
    name: 'items',
    // name: `items[${i}]`,
    defaultValue: {},
  });
  return null;
  // return <span>{(value.type || 0) * (value.amount || 0)}</span>;
};

export default Price;
