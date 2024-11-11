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
} from '@/components/ui/table';
import { useZodForm } from '@/hooks/use-zod-form';
import ClientOnly from '@/lib/client-only';
import { cn } from '@/lib/utils';
import {
  BbSchema,
  Bseo4dSchema,
  bseoSchema,
  Sin4dSchema,
} from '@/schemas/togel-schema';
import { rankItem } from '@tanstack/match-sorter-utils';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { useBsTogelColumns } from './bseo-column';

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

interface DataTableProps<TData, TValue> {
  data: TData[] | any;
  btnType?: string;
  actions?: string;
  disabled?: boolean;
  form?: any;
  onSubmit?: SubmitHandler<FieldValues> | any;
  type?: 'button' | 'submit' | 'reset';
  bbData?: BbSchema[] | any;
  gameData?: Bseo4dSchema[] | any;
  gameType?: string;
  i?: number;
  bsData?: Bseo4dSchema | any;
  // bsData?: TData[] | any;
}

export const form4d = {
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

const createEmptyRow = () => form4d;

const initialData = Array(2)
  .fill(null)
  .map(() => createEmptyRow());

let render = 0;
export function BseoTable<TData, TValue>({
  data,
  type,
  actions,
  disabled,
  onSubmit,
  bbData,
  gameData,
  gameType,
  bsData,
  i,
  form,

  ...props
}: DataTableProps<TData, TValue>) {
  const [sin4ds, setSin4ds] = useState<Sin4dSchema[]>(() => initialData);
  const [bs, setBs] = useState<Bseo4dSchema[]>([]);

  const {
    register,
    handleSubmit,
    setError,
    control,
    setFocus,
    setValue,
    watch,
    formState: { errors, isValid, isSubmitting, isDirty, isLoading },
    getValues,
  } = useZodForm({
    schema: bseoSchema,
    mode: 'onChange',
    defaultValues: {
      bs,
    },
  });

  // const numberData = gameData.map((dat: any, i: number) => dat.numVal);
  // const watchAllInputs = watch();
  const { bsColumns } = useBsTogelColumns(
    data,
    register,
    control,
    watch,
    setFocus,
    getValues,
    setValue,
    bsData,
    gameData
  );

  const handleSubmitChange = useCallback(() => {
    if (disabled) return;
  }, [disabled]);

  const table = useReactTable({
    data,
    columns: bsColumns,
    getCoreRowModel: getCoreRowModel(),
    filterFns: {
      fuzzy: fuzzyFilter,
    },
  });
  render++;
  return (
    <ClientOnly>
      <div className='font-semibold text-xs my-5'>render: {render}</div>
      {/* <form onSubmit={handleSubmit(onSubmit)}> */}
      <Table>
        <TableHeader className={'h-7 shadow-lg'}>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className={cn(
                      'p-0 m-0 h-8 text-xs font-bold text-center',
                      header.getContext().header.column.id === 'index' && 'w-8',
                      header.getContext().header.column.id === 'number' &&
                        'w-20',
                      header.getContext().header.column.id === 'game' && 'w-10',
                      header.getContext().header.column.id === 'wager' &&
                        'w-28',
                      header.getContext().header.column.id === 'dis' && 'w-12',
                      header.getContext().header.column.id === 'net' && 'w-28'
                    )}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {/* <pre>
                      {JSON.stringify(
                        header.getContext().header.column,
                        null,
                        2
                      )}
                    </pre> */}
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    {/* <pre>{JSON.stringify(cell.column, null, 2)}</pre> */}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={bsColumns?.length}
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

      {/* </form> */}
    </ClientOnly>
  );
}