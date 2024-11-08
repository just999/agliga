// 'use client';

// import {
//   FilterFn,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from '@tanstack/react-table';

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import ClientOnly from '@/lib/client-only';
// import { cn } from '@/lib/utils';
// import { BbSchema, BbTab4dSchema, BbTabSchema } from '@/schemas/togel-schema';
// import { rankItem } from '@tanstack/match-sorter-utils';
// import { useEffect, useState } from 'react';
// import {
//   Control,
//   FieldValues,
//   SubmitHandler,
//   useForm,
//   useWatch,
// } from 'react-hook-form';

// import { useBbfsColumns } from './bbfs-columns';
// import { initialBbValues } from '../bbfs';

// const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
//   // Rank the item
//   const itemRank = rankItem(row.getValue(columnId), value);

//   // Store the itemRank info
//   addMeta({
//     itemRank,
//   });

//   // Return if the item should be filtered in/out
//   return itemRank.passed;
// };

// export type FormBbfsTableProps = {
//   d1?: string;
//   d2?: string;
//   d3?: string;
//   d4?: string;
//   game?: string;
//   wager?: string;
//   dis?: string;
//   net?: string;
//   period?: string;
//   status?: string;
// };

// const initialBbfsTableValues = {
//   d1: '',
//   d2: '',
//   d3: '',
//   d4: '',
//   game: '',
//   wager: '',
//   dis: '',
//   net: '',
//   period: '001',
//   status: 'processing',
// };

// interface DataTableProps<TData, TValue> {
//   data: TData[] | any;
//   bbData?: BbSchema[] | any;
//   i: number;
//   control: Control<BbSchema | any>;
//   bbfsTableData?: FormBbfsTableProps | any;
// }

// let render = 0;
// export function BbfsTable<TData, TValue>({
//   data,
//   bbData,
//   i,
//   control,
//   bbfsTableData,
//   ...props
// }: DataTableProps<TData, TValue>) {
//   const [bbfs, setBbfs] = useState<BbTab4dSchema[]>([initialBbfsTableValues]);

//   const {
//     register,
//     setFocus,
//     setValue,
//     watch,
//     formState: { errors, isValid, isSubmitting, isDirty, isLoading },
//     getValues,
//   } = useForm<BbTabSchema>({
//     mode: 'onChange',
//     defaultValues: {
//       bbfs,
//     },
//   });

//   const togelTableBbValue = useWatch({
//     control,
//     name: 'bb',
//   });

//   const { bbfsColumns } = useBbfsColumns(
//     register,
//     control,
//     watch,
//     setFocus,
//     getValues,
//     setValue,
//     bbData,
//     data
//   );

//   useEffect(() => {
//     if (bbfsTableData) setValue(`bbfs`, bbfsTableData);
//   }, [setValue, data, bbfs]);

//   const table = useReactTable({
//     data,
//     columns: bbfsColumns,
//     getCoreRowModel: getCoreRowModel(),
//     filterFns: {
//       fuzzy: fuzzyFilter,
//     },
//   });
//   render++;
//   return (
//     <ClientOnly>
//       <div className='font-semibold text-xs my-5'>render: {render}</div>
//       {/* <form onSubmit={handleSubmit(onSubmit)}> */}
//       <Table>
//         <TableHeader className={'h-7 shadow-lg'}>
//           {table.getHeaderGroups().map((headerGroup) => (
//             <TableRow key={headerGroup.id}>
//               {headerGroup.headers.map((header) => {
//                 return (
//                   <TableHead
//                     key={header.id}
//                     className={cn(
//                       'p-0 m-0 h-8 text-xs font-bold text-center',
//                       header.getContext().header.column.id === 'index' && 'w-8',
//                       header.getContext().header.column.id === 'number' &&
//                         'w-20',
//                       header.getContext().header.column.id === 'game' && 'w-10',
//                       header.getContext().header.column.id === 'wager' &&
//                         'w-28',
//                       header.getContext().header.column.id === 'dis' && 'w-12',
//                       header.getContext().header.column.id === 'net' && 'w-28'
//                     )}>
//                     {header.isPlaceholder
//                       ? null
//                       : flexRender(
//                           header.column.columnDef.header,
//                           header.getContext()
//                         )}
//                   </TableHead>
//                 );
//               })}
//             </TableRow>
//           ))}
//         </TableHeader>
//         <TableBody className='border-b pb-2 '>
//           {table.getRowModel().rows?.length ? (
//             table.getRowModel().rows.map((row) => (
//               <TableRow
//                 key={row.id}
//                 data-state={row.getIsSelected() && 'selected'}>
//                 {row.getVisibleCells().map((cell) => (
//                   <TableCell
//                     key={cell.id}
//                     className={cn(
//                       'p-0 m-0',
//                       cell.column.id === 'number' && 'w-20',
//                       cell.column.id === 'dis' && 'w-12',
//                       cell.column.id === 'bet' && 'w-28',
//                       cell.column.id === 'net' && 'w-28'
//                     )}>
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                     {/* <pre>{JSON.stringify(cell.column, null, 2)}</pre> */}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             ))
//           ) : (
//             <TableRow>
//               <TableCell
//                 colSpan={bbfsColumns?.length}
//                 className='text-center italic bg-cyan-100 shadow-inner'>
//                 Detail Bet...
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//         <TableFooter className='bg-transparent '>
//           {table.getFooterGroups().map((footerGroup) => (
//             <TableRow key={footerGroup.id}>
//               {footerGroup.headers.map((header) => (
//                 <TableCell key={header.id} className='p-0'>
//                   {header.isPlaceholder
//                     ? null
//                     : flexRender(
//                         header.column.columnDef.footer,
//                         header.getContext()
//                       )}
//                 </TableCell>
//               ))}
//             </TableRow>
//           ))}
//         </TableFooter>
//       </Table>
//       <pre>{JSON.stringify(watch(), null, 2)}</pre>
//       {/* </form> */}
//     </ClientOnly>
//   );
// }

// 'use client';

// import {
//   FilterFn,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from '@tanstack/react-table';

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import ClientOnly from '@/lib/client-only';
// import { cn } from '@/lib/utils';
// import { BbSchema, BbTab4dSchema, BbTabSchema } from '@/schemas/togel-schema';
// import { rankItem } from '@tanstack/match-sorter-utils';
// import { useEffect, useState } from 'react';
// import {
//   Control,
//   FieldValues,
//   SubmitHandler,
//   useForm,
//   useWatch,
// } from 'react-hook-form';

// import { useBbfsColumns } from './bbfs-columns';
// import { initialBbValues } from '../bbfs';

// const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
//   // Rank the item
//   const itemRank = rankItem(row.getValue(columnId), value);

//   // Store the itemRank info
//   addMeta({
//     itemRank,
//   });

//   // Return if the item should be filtered in/out
//   return itemRank.passed;
// };

// export type FormBbfsTableProps = {
//   d1?: string;
//   d2?: string;
//   d3?: string;
//   d4?: string;
//   game?: string;
//   wager?: string;
//   dis?: string;
//   net?: string;
//   period?: string;
//   status?: string;
// };

// const initialBbfsTableValues = {
//   d1: '',
//   d2: '',
//   d3: '',
//   d4: '',
//   game: '',
//   wager: '',
//   dis: '',
//   net: '',
//   period: '001',
//   status: 'processing',
// };

// interface DataTableProps<TData, TValue> {
//   data: TData[] | any;
//   bbData?: BbSchema[] | any;
//   i: number;
//   control: Control<BbSchema | any>;
//   bbfsTableData?: FormBbfsTableProps | any;
// }

// let render = 0;
// export function BbfsTable<TData, TValue>({
//   data,
//   bbData,
//   i,
//   control,
//   bbfsTableData,
//   ...props
// }: DataTableProps<TData, TValue>) {
//   const [bbfs, setBbfs] = useState<BbTab4dSchema[]>([initialBbfsTableValues]);

//   const {
//     register,
//     setFocus,
//     setValue,
//     watch,
//     formState: { errors, isValid, isSubmitting, isDirty, isLoading },
//     getValues,
//   } = useForm<BbTabSchema>({
//     mode: 'onChange',
//     defaultValues: {
//       bbfs,
//     },
//   });

//   const togelTableBbValue = useWatch({
//     control,
//     name: 'bb',
//   });

//   const { bbfsColumns } = useBbfsColumns(
//     register,
//     control,
//     watch,
//     setFocus,
//     getValues,
//     setValue,
//     bbData,
//     data
//   );

//   useEffect(() => {
//     if (bbfsTableData) {
//       setValue('bbfs', bbfsTableData, {
//         shouldValidate: true,
//         shouldDirty: true,
//       });

//       setBbfs(bbfsTableData);
//     }
//   }, [bbfsTableData, data, bbfs, setValue]);
//   const table = useReactTable({
//     data,
//     columns: bbfsColumns,
//     getCoreRowModel: getCoreRowModel(),
//     filterFns: {
//       fuzzy: fuzzyFilter,
//     },
//   });
//   render++;
//   return (
//     <ClientOnly>
//       <div className='font-semibold text-xs my-5'>render: {render}</div>
//       {/* <form onSubmit={handleSubmit(onSubmit)}> */}
//       <Table>
//         <TableHeader className={'h-7 shadow-lg'}>
//           {table.getHeaderGroups().map((headerGroup) => (
//             <TableRow key={headerGroup.id}>
//               {headerGroup.headers.map((header) => {
//                 return (
//                   <TableHead
//                     key={header.id}
//                     className={cn(
//                       'p-0 m-0 h-8 text-xs font-bold text-center',
//                       header.getContext().header.column.id === 'index' && 'w-8',
//                       header.getContext().header.column.id === 'number' &&
//                         'w-20',
//                       header.getContext().header.column.id === 'game' && 'w-10',
//                       header.getContext().header.column.id === 'wager' &&
//                         'w-28',
//                       header.getContext().header.column.id === 'dis' && 'w-12',
//                       header.getContext().header.column.id === 'net' && 'w-28'
//                     )}>
//                     {header.isPlaceholder
//                       ? null
//                       : flexRender(
//                           header.column.columnDef.header,
//                           header.getContext()
//                         )}
//                   </TableHead>
//                 );
//               })}
//             </TableRow>
//           ))}
//         </TableHeader>
//         <TableBody className='border-b pb-2 '>
//           {table.getRowModel().rows?.length ? (
//             table.getRowModel().rows.map((row) => (
//               <TableRow
//                 key={row.id}
//                 data-state={row.getIsSelected() && 'selected'}>
//                 {row.getVisibleCells().map((cell) => (
//                   <TableCell
//                     key={cell.id}
//                     className={cn(
//                       'p-0 m-0',
//                       cell.column.id === 'number' && 'w-20',
//                       cell.column.id === 'dis' && 'w-12',
//                       cell.column.id === 'bet' && 'w-28',
//                       cell.column.id === 'net' && 'w-28'
//                     )}>
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                     {/* <pre>{JSON.stringify(cell.column, null, 2)}</pre> */}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             ))
//           ) : (
//             <TableRow>
//               <TableCell
//                 colSpan={bbfsColumns?.length}
//                 className='text-center italic bg-cyan-100 shadow-inner'>
//                 Detail Bet...
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//         <TableFooter className='bg-transparent '>
//           {table.getFooterGroups().map((footerGroup) => (
//             <TableRow key={footerGroup.id}>
//               {footerGroup.headers.map((header) => (
//                 <TableCell key={header.id} className='p-0'>
//                   {header.isPlaceholder
//                     ? null
//                     : flexRender(
//                         header.column.columnDef.footer,
//                         header.getContext()
//                       )}
//                 </TableCell>
//               ))}
//             </TableRow>
//           ))}
//         </TableFooter>
//       </Table>
//       <pre>{JSON.stringify(watch(), null, 2)}</pre>
//       {/* </form> */}
//     </ClientOnly>
//   );
// }

'use client';

import {
  FilterFn,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  Button,
} from '@/components/ui';
import ClientOnly from '@/lib/client-only';
import { cn } from '@/lib/utils';
import { BbSchema, BbTab4dSchema, BbTabSchema } from '@/schemas/togel-schema';
import { rankItem } from '@tanstack/match-sorter-utils';
import { useEffect, useState } from 'react';
import { Control, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { useBbfsColumns } from './bbfs-columns';
import { control } from 'leaflet';

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({ itemRank });
  return itemRank.passed;
};

export type FormBbfsTableProps = {
  d1?: string;
  d2?: string;
  d3?: string;
  d4?: string;
  game?: string;
  wager?: string;
  dis?: string;
  net?: string;
  period?: string;
  status?: string;
};

const initialBbfsTableValues = {
  d1: '',
  d2: '',
  d3: '',
  d4: '',
  game: '',
  wager: '',
  dis: '',
  net: '',
  period: '001',
  status: 'processing',
};

interface DataTableProps<TData, TValue> {
  data: TData[] | any;
  bbData?: BbSchema[] | any;
  i: number;
  control?: Control<BbSchema | any>;
  bbfsTableData?: FormBbfsTableProps | any;
}

let render = 0;
export function BbfsTable<TData, TValue>({
  data,
  bbData,
  i,
  bbfsTableData,
  ...props
}: DataTableProps<TData, TValue>) {
  const [bbfs, setBbfs] = useState<BbTab4dSchema[]>([initialBbfsTableValues]);

  const {
    register,
    setFocus,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors, isValid, isSubmitting, isDirty, isLoading },
    getValues,
  } = useForm<BbTabSchema>({
    mode: 'onChange',
    defaultValues: {
      bbfs,
      totalBet: '',
    },
  });

  const bbfsValue = useWatch({
    control,
    name: 'bbfs',
  });
  useEffect(() => {
    const getTotal = bbfsValue.reduce((acc: any, curr) => {
      return acc + Number(curr?.net);
    }, 0);
    if (getTotal) setValue(`totalBet`, getTotal);
  }, [setValue, bbfsValue]);

  useEffect(() => {
    if (bbfsTableData) {
      setBbfs(bbfsTableData);
      setValue('bbfs', bbfsTableData, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [bbfsTableData, data, setBbfs, setValue]);

  const { fields, remove } = useFieldArray({
    control,
    name: 'bbfs',
  });

  const { bbfsColumns } = useBbfsColumns(
    register,
    control,
    watch,
    setFocus,
    getValues,
    setValue,
    bbData,
    bbfsTableData,
    remove,
    fields,
    data
  );

  const onSubmit = (data: BbTabSchema) => {
    console.log('🚀 ~ onSubmit ~ data:', data);
  };

  const table = useReactTable({
    data: fields,
    columns: bbfsColumns,
    getCoreRowModel: getCoreRowModel(),
    filterFns: {
      fuzzy: fuzzyFilter,
    },
  });
  useEffect(() => {
    render++;
  }, []);
  return (
    <ClientOnly>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex justify-between items-center '>
          <div className='font-semibold text-xs my-5'>render: {render}</div>
          <Button type='submit' size='sm'>
            Submit
          </Button>
        </div>
        <Table className={cn('bg-emerald-50')}>
          <TableHeader className={'h-7 shadow-lg'}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        'p-0 m-0 h-8 text-xs font-bold text-center',
                        header.getContext().header.column.id === 'index' &&
                          'w-8',
                        header.getContext().header.column.id === 'number' &&
                          'w-20',
                        header.getContext().header.column.id === 'game' &&
                          'w-10',
                        header.getContext().header.column.id === 'wager' &&
                          'w-28',
                        header.getContext().header.column.id === 'dis' &&
                          'w-12',
                        header.getContext().header.column.id === 'net' && 'w-28'
                      )}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className='border-b pb-2 '>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        'p-0 m-0',
                        cell.column.id === 'number' && 'w-20',
                        cell.column.id === 'dis' && 'w-12',
                        cell.column.id === 'bet' && 'w-28',
                        cell.column.id === 'net' && 'w-28'
                      )}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={bbfsColumns?.length}
                  className='text-center italic bg-cyan-100 shadow-inner'>
                  Detail Bet...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter className='bg-transparent '>
            {table.getFooterGroups().map((footerGroup) => (
              <TableRow key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <TableCell key={header.id} className='p-0'>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableFooter>
        </Table>
      </form>

      {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
    </ClientOnly>
  );
}
