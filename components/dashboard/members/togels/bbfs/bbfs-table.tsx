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
  Table as TanTable,
  Column,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
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
import { cn, poppins } from '@/lib/utils';
import { BbSchema, BbTab4dSchema, BbTabSchema } from '@/schemas/togel-schema';
import { rankItem } from '@tanstack/match-sorter-utils';
import { useEffect, useState } from 'react';
import { Control, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { useBbfsColumns } from './bbfs-columns';
import { initial4dValues } from '@/lib/helper';
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from 'lucide-react';

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

interface DataTableProps<TData, TValue> {
  data: TData[] | any;
  bbData?: BbSchema[] | any;
  i: number;
  // control?: Control<BbSchema | any>;
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
  const [bbfs, setBbfs] = useState<BbTab4dSchema[]>([initial4dValues]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const defaultFilterFns = {
    fuzzy: () => true,
    contains: () => true,
  };

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
    remove,
    fields,
    bbData,
    bbfsTableData,
    data
  );

  const onSubmit = (data: BbTabSchema) => {
    const validateBet = data.bbfs.filter((val, i) => val.game && val.wager);
  };

  const table = useReactTable({
    data: fields,
    columns: bbfsColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    filterFns: defaultFilterFns,
    state: {
      pagination,
    },
  });
  useEffect(() => {
    render++;
  }, []);
  return (
    <ClientOnly>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex justify-between items-center py-2'>
          {/* <div className='font-semibold text-xs my-5'>render: {render}</div> */}
          <Button type='submit' size='sm' className='px-2 '>
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

        <div className='h-2' />
        <div className='flex justify-center items-center gap-2 bg-orange-100'>
          <div className='text-xs '>
            tampil{' '}
            <span
              className={cn(
                'h-3 bg-emerald-50 rounded-sm px-1 font-semibold',
                poppins.className
              )}>
              {table.getRowModel().rows.length.toLocaleString()}{' '}
            </span>{' '}
            dari
            <span
              className={cn(
                'h-3 bg-emerald-50 rounded-sm px-1 font-semibold',
                poppins.className
              )}>
              {table.getRowCount().toLocaleString()}
            </span>{' '}
            baris
          </div>
          <div className='flex  '>
            <Button
              variant='ghost'
              type='button'
              className={cn(
                ' border rounded-md h-5 w-7 p-0 m-auto flex items-center justify-center bg-orange-500 hover:bg-orange-500/70',
                !table.getCanPreviousPage()
                  ? 'bg-orange-400/70 cursor-not-allowed'
                  : ''
              )}
              onClick={() => table.firstPage()}
              disabled={!table.getCanPreviousPage()}>
              <ChevronsLeft size={14} className='  text-white svg ' />
            </Button>
            <Button
              variant='ghost'
              type='button'
              className={cn(
                'border rounded-md h-5 w-7 p-0 m-auto flex items-center justify-center bg-orange-500 hover:bg-orange-500/70',
                !table.getCanPreviousPage()
                  ? 'bg-orange-400/70 cursor-not-allowed'
                  : ''
              )}
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}>
              <ChevronLeft size={14} className='  text-white svg ' />
            </Button>
            <Button
              variant='ghost'
              type='button'
              className={cn(
                'border rounded-md h-5 w-7 p-0 m-auto flex items-center justify-center bg-orange-500 hover:bg-orange-500/70',
                !table.getCanNextPage()
                  ? 'bg-orange-400/70 cursor-not-allowed'
                  : ''
              )}
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}>
              <ChevronRight size={14} className='  text-white svg ' />
            </Button>
            <Button
              variant='ghost'
              type='button'
              className={cn(
                'border rounded-md h-5 w-7 p-0 m-auto flex items-center justify-center bg-orange-500 hover:bg-orange-500/70',
                !table.getCanNextPage()
                  ? 'bg-orange-400/70 cursor-not-allowed'
                  : ''
              )}
              onClick={() => table.lastPage()}
              disabled={!table.getCanNextPage()}>
              <ChevronsRight size={14} className='  text-white svg ' />
            </Button>
          </div>
          <span className='flex items-center gap-1 text-xs'>
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount().toLocaleString()}
            </strong>
          </span>
          {/* <span className='flex items-center gap-1'>
              | Go to page:
              <input
                type='number'
                min='1'
                max={table.getPageCount()}
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
                className='border p-1 rounded w-16'
              />
            </span> */}
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className='text-xs bg-amber-100'>
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </form>

      {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
    </ClientOnly>
  );
}

function Filter({
  column,
  table,
}: {
  column: Column<any, any>;
  table: TanTable<any>;
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  return typeof firstValue === 'number' ? (
    <div className='flex space-x-2' onClick={(e) => e.stopPropagation()}>
      <input
        type='number'
        value={(columnFilterValue as [number, number])?.[0] ?? ''}
        onChange={(e) =>
          column.setFilterValue((old: [number, number]) => [
            e.target.value,
            old?.[1],
          ])
        }
        placeholder={`Min`}
        className='w-24 border shadow rounded'
      />
      <input
        type='number'
        value={(columnFilterValue as [number, number])?.[1] ?? ''}
        onChange={(e) =>
          column.setFilterValue((old: [number, number]) => [
            old?.[0],
            e.target.value,
          ])
        }
        placeholder={`Max`}
        className='w-24 border shadow rounded'
      />
    </div>
  ) : (
    <input
      className='w-36 border shadow rounded'
      onChange={(e) => column.setFilterValue(e.target.value)}
      onClick={(e) => e.stopPropagation()}
      placeholder={`Search...`}
      type='text'
      value={(columnFilterValue ?? '') as string}
    />
  );
}
