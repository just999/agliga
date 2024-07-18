// 'use client';

// import { Column } from '@tanstack/react-table';
// import DebounceSelect from '../ui/debounce-select';
// import { ValueIconProps } from '@/types';

// type FilterProps = {
//   column: Column<any, unknown>;
//   banks: any[];
//   // name: string;
//   value: string;
//   onChange: (value: string) => void;
// };

// const FilterSelect = ({ column, banks, value, onChange }: FilterProps) => {
//   const columnFilterValue = column.getFilterValue();
//   return (
//     <DebounceSelect
//       banks={banks}
//       // name={name}
//       // value={(columnFilterValue ?? '') as string}

//       value={value}
//       onChange={(e) => onChange(value)}
//       // onChange={(value) => column.setFilterValue(value)}
//       placeholder={`Search...`}
//       className='w-36 h-[32px] border shadow rounded px-2'
//     />
//   );
// };

// export default FilterSelect;
