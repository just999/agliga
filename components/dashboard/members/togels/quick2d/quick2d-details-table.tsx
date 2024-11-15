'use client';

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { cn, generateAndPadArrayFn, poppins } from '@/lib/utils';
import {
  BseoOnlySchema,
  QuickTab4dSchema,
  QuickTabSchema,
} from '@/schemas/togel-schema';
import { useTogelStore } from '@/store/use-togel-store';
import {
  Column,
  Table as TanTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table';
import {
  ChevronDownSquareIcon,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronUpSquareIcon,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { useQuick2dDetailsColumns } from './quick2d-details-columns';
import { ArrayOptProps } from '@/types/types';
import React from 'react';

type Quick2dDetailsTableProps = {
  // data?: Togel4dValues[];
  // q2dTableData?: QuickTab4dSchema[];
  q2dData: BseoOnlySchema[];
};

let render = 0;

const Quick2dDetailsTable = ({ q2dData }: Quick2dDetailsTableProps) => {
  const [q2d, setQ2d] = useState<QuickTab4dSchema[]>([]);
  const [arrayValues, setArrayValues] = useState<ArrayOptProps[]>([]);
  const { bseo, position, wager } = q2dData[0];
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const arrayOptionsRef = useRef<QuickTab4dSchema[]>([]);

  const defaultFilterFns = {
    fuzzy: () => true,
    contains: () => true,
  };

  const { isToggle, setIsToggle } = useTogelStore((state) => ({
    isToggle: state.isToggle,
    setIsToggle: state.setIsToggle,
  }));

  const {
    register,
    setFocus,
    handleSubmit,
    setValue,
    control,
    watch,
    reset,
    formState: { errors, isValid, isSubmitting, isDirty, isLoading },
    getValues,
  } = useForm<QuickTabSchema>({
    mode: 'onChange',
    defaultValues: {
      q2d,
      totalBet: '',
    },
  });

  // const { sin4d, setSin4d } = useTogelStore((state) => ({
  //   sin4d: state.sin4d,
  //   setSin4d: state.setSin4d,
  // }));
  const arrayOptions: ArrayOptProps[] = useMemo(() => {
    const newBseo = generateAndPadArrayFn(position, wager, bseo);
    if (newBseo) {
      setArrayValues(newBseo);
      setValue(`q2d`, newBseo);
      arrayOptionsRef.current = newBseo; // Keep ref updated
    }
    return newBseo;
  }, [position, wager, bseo, setValue]);

  const quick2dValue = useWatch({
    control,
    name: 'q2d',
  });
  // const quick2dData = useCallback(() => {
  //   if (sin4d) setValue(`q2d`, sin4d);
  // }, [setValue, sin4d]);

  // useEffect(() => {
  //   quick2dData();

  //   return () => quick2dData();
  // }, [quick2dData]);

  // Memoized array options
  // const arrayOptions: QuickTab4dSchema[] = useMemo(() => {
  //   const newBseo = generateAndPadArrayFn(position, bseo);

  //   if (newBseo) {
  //     setQ2d(newBseo);
  //     setValue(`q2d`, newBseo);
  //     arrayOptionsRef.current = newBseo; // Keep ref updated
  //   }
  //   return newBseo;
  // }, [position, bseo, setValue, wager]);
  const handleSetIsToggle = () => {
    const res = getValues();
    setIsToggle(isToggle);

    // if (isToggle) {
    //   setValue(`q2d`, q2d);
    // }
  };
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'q2d',
  });

  const { columns } = useQuick2dDetailsColumns(remove, fields);

  // const { bbfsColumns } = useBbfsColumns(
  //   register,
  //   control,
  //   watch,
  //   setFocus,
  //   getValues,
  //   setValue,
  //   remove,
  //   fields,
  //   // data,
  //   q2dTableData,
  //   q2dData
  // );
  const onSubmit = (data: any) => {
    // const filteredData = data.bsEo.filter(
    //   (dat: any) => dat.wager !== '' && dat.d1 !== '' && dat.position !== ''
    // );
    // const renderedNet = filteredData.map((item: any) => ({
    //   ...item,
    //   dis: (Number(item.wager) * (29 / 100)).toFixed().toString(),
    //   net: (Number(item.wager) * (71 / 100)).toFixed().toString(),
    // }));
    // renderedNet.map((val: any, i: number) => {
    //   setValue(`bsEo.${i}.dis`, val.dis);
    //   setValue(`bsEo.${i}.net`, val.net);
    // });
    // const totalBet = renderedNet.reduce(function (acc: any, cur: any) {
    //   return acc + Number(cur.net) * 50;
    // }, 0);
    // setValue('totalBet', totalBet);
  };

  const table = useReactTable({
    data: quick2dValue,
    columns: columns,
    // debugTable: true,
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
    <>
      {/* <div
        className={cn(
          'font-semibold text-xs transition-opacity duration-2000 ease-in-out',
          isToggle ? 'opacity-100 max-h-10' : 'opacity-0 max-h-0'
        )}>
        render: {render}
      </div> */}
      <form onSubmit={handleSubmit(onSubmit)} className='py-2'>
        <div className='flex w-full flex-row-reverse items-center justify-between'>
          <div
            className={cn(
              'w-full py-2 pr-4 text-right'
              // show ? 'text-left' : 'text-right'
            )}
          >
            <Button
              onClick={handleSetIsToggle}
              size='sm'
              disabled={!wager || table.getRowModel().rows?.length === 0}
              type='button'
              className='w-20 px-2 py-1'
            >
              {isToggle ? (
                <div className='flex w-full items-center justify-between gap-1'>
                  Hide <ChevronUpSquareIcon size={16} className='svg' />
                </div>
              ) : (
                <div className='flex w-full items-center justify-between gap-1'>
                  details <ChevronDownSquareIcon size={16} />{' '}
                </div>
              )}
            </Button>
          </div>
          <div
            className={cn(
              'duration-2000 transition-opacity ease-in-out',
              isToggle ? 'max-h-10 opacity-100' : 'max-h-0 opacity-0'
            )}
          >
            <div className={isToggle ? 'block' : 'hidden'}>
              <div className='w-full py-2 pr-4 text-left'>
                <Button
                  size='sm'
                  type='submit'
                  // disabled={!isValid || !wager}
                  className='px-2 py-1'
                >
                  <div className='flex items-center gap-2'>Submit</div>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div
          className={cn(
            'transform overflow-hidden transition-all duration-1000 ease-in-out',
            isToggle ? 'max-h-[1705px] opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className={cn(
                          'm-0 h-8 p-0 text-center text-xs font-bold'
                        )}
                        style={{ width: `${header.getSize()}px` }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        {/* <pre>{JSON.stringify(header.getSize(), null, 2)}</pre> */}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={cn('m-0 p-0')}
                        style={{ width: `${cell.column.getSize()}px` }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                        {/* <pre>{JSON.stringify(cell.column.getSize(), null, 2)}</pre> */}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center'
                  >
                    No Results
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableFooter className='bg-transparent'>
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
          <div className='flex items-center justify-center gap-2 bg-orange-100'>
            <div className='text-xs'>
              tampil{' '}
              <span
                className={cn(
                  'h-3 rounded-sm bg-emerald-50 px-1 font-semibold',
                  poppins.className
                )}
              >
                {table.getRowModel().rows.length.toLocaleString()}{' '}
              </span>{' '}
              dari
              <span
                className={cn(
                  'h-3 rounded-sm bg-emerald-50 px-1 font-semibold',
                  poppins.className
                )}
              >
                {table.getRowCount().toLocaleString()}
              </span>{' '}
              baris
            </div>
            <div className='flex'>
              <Button
                variant='ghost'
                type='button'
                className={cn(
                  'm-auto flex h-5 w-7 items-center justify-center rounded-md border bg-orange-500 p-0 hover:bg-orange-500/70',
                  !table.getCanPreviousPage()
                    ? 'cursor-not-allowed bg-orange-400/70'
                    : ''
                )}
                onClick={() => table.firstPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronsLeft size={14} className='svg text-white' />
              </Button>
              <Button
                variant='ghost'
                type='button'
                className={cn(
                  'm-auto flex h-5 w-7 items-center justify-center rounded-md border bg-orange-500 p-0 hover:bg-orange-500/70',
                  !table.getCanPreviousPage()
                    ? 'cursor-not-allowed bg-orange-400/70'
                    : ''
                )}
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeft size={14} className='svg text-white' />
              </Button>
              <Button
                variant='ghost'
                type='button'
                className={cn(
                  'm-auto flex h-5 w-7 items-center justify-center rounded-md border bg-orange-500 p-0 hover:bg-orange-500/70',
                  !table.getCanNextPage()
                    ? 'cursor-not-allowed bg-orange-400/70'
                    : ''
                )}
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <ChevronRight size={14} className='svg text-white' />
              </Button>
              <Button
                variant='ghost'
                type='button'
                className={cn(
                  'm-auto flex h-5 w-7 items-center justify-center rounded-md border bg-orange-500 p-0 hover:bg-orange-500/70',
                  !table.getCanNextPage()
                    ? 'cursor-not-allowed bg-orange-400/70'
                    : ''
                )}
                onClick={() => table.lastPage()}
                disabled={!table.getCanNextPage()}
              >
                <ChevronsRight size={14} className='svg text-white' />
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
              className='bg-amber-100 text-xs'
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>

          {/* <pre>{JSON.stringify(table.getState().pagination, null, 2)}</pre> */}
        </div>
        {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
      </form>
    </>
  );
};

export default Quick2dDetailsTable;

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
        className='w-24 rounded border shadow'
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
        className='w-24 rounded border shadow'
      />
    </div>
  ) : (
    <input
      className='w-36 rounded border shadow'
      onChange={(e) => column.setFilterValue(e.target.value)}
      onClick={(e) => e.stopPropagation()}
      placeholder={`Search...`}
      type='text'
      value={(columnFilterValue ?? '') as string}
    />
  );
}
