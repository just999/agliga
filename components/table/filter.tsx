'use client';

import { Column } from '@tanstack/react-table';
import { DebouncedInput } from '../ui/debounce-input';

type FilterProps = {};

const Filter = ({ column }: { column: Column<any, unknown> }) => {
  const columnFilterValue = column.getFilterValue();
  return (
    <DebouncedInput
      type='text'
      value={(columnFilterValue ?? '') as string}
      onChange={(value) => column.setFilterValue(value)}
      placeholder={`Search...`}
      className='w-full h-6 border shadow rounded px-2'
    />
  );
};

export default Filter;
