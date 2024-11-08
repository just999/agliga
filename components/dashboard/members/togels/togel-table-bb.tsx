'use client';

import { useEffect, useRef, useState } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';

import { useTogel } from '@/hooks/use-togel';
import { useZodForm } from '@/hooks/use-zod-form';
import ClientOnly from '@/lib/client-only';

import { Sin4dSchema, sin4dSchema } from '@/schemas/togel-schema';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useFieldArray } from 'react-hook-form';

type TogelTableBbProps = {
  dataTable: Sin4dSchema[];
};

const form4d = {
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
const TogelTableBb = ({ dataTable }: TogelTableBbProps) => {
  const [sin4ds, setSin4ds] = useState<Sin4dSchema[]>(() => initialData);

  const gamesRef = useRef(dataTable);

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
    schema: sin4dSchema,
    mode: 'onChange',
    defaultValues: {
      sin4ds,
      copy: false,
      copyWager: '',
    },
  });
  useEffect(() => {
    if (Array.isArray(dataTable) && dataTable !== gamesRef.current) {
      // setSin4ds(dataTable);
      setValue('sin4ds', dataTable);
      gamesRef.current = dataTable;
    }
  }, [dataTable, setValue]);

  const watchAllInputs = watch();
  const sin4d = watch('sin4ds');
  const sin4dRef = useRef(sin4d);

  useEffect(() => {
    if (dataTable) setSin4ds(dataTable);
    if (dataTable !== sin4dRef.current) {
      setValue('sin4ds', dataTable);
      sin4dRef.current = dataTable;
    }
  }, [setSin4ds, setValue, dataTable]);

  const { fields, prepend, append, remove } = useFieldArray({
    control,
    name: 'sin4ds',
  });
  const defaultFilterFns = {
    fuzzy: () => true,
    contains: () => true,
  };

  const handleInputChange = (field: string, value: string, i: number) => {
    if (value.length === 1) {
      const fields: Array<keyof (typeof watchAllInputs.sin4ds)[0]> = [
        'd1',
        'd2',
        'd3',
        'd4',
        'wager',
      ];
      const currentIndex = fields.indexOf(
        field as keyof (typeof watchAllInputs.sin4ds)[0]
      );
      const nextField = fields[currentIndex + 1];
      if (nextField) {
        setFocus(`sin4ds.${i}.${nextField}`);
      }
    }
  };

  const { togelColumns } = useTogel(
    register,
    control,
    watch,
    setFocus,
    getValues,
    setValue,
    remove,
    handleInputChange
  );

  const onSubmit = (data: any) => {};
  const table = useReactTable({
    data: sin4d,
    columns: togelColumns,
    getCoreRowModel: getCoreRowModel(),
    filterFns: defaultFilterFns,
  });
  render++;
  return (
    <ClientOnly>
      <div className='font-semibold text-xs'>render: {render}</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className='p-0 m-0 h-8 text-xs font-bold text-center'>
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
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className='p-0 m-0'>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                      {/* <pre>
                        {JSON.stringify(cell.column.columnDef, null, 2)}
                      </pre> */}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  // colSpan={headers.}
                  className='h-24 text-center'>
                  No Results
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
        <pre>{JSON.stringify(watch(), null, 2)}</pre>
      </form>
    </ClientOnly>
  );
};

export default TogelTableBb;
