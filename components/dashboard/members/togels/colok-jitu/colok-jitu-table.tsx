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
import { useZodForm } from '@/hooks/use-zod-form';
import { safeParseFloat } from '@/lib/utils';
import { colokJituTableSchema } from '@/schemas/togel-schema';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState, useRef, useCallback, ChangeEvent, useEffect } from 'react';
import { useColokJituColumns } from '../colok-jitu/colok-jitu-columns';
import { useWatch } from 'react-hook-form';

type ColokJituTableProps = {};

enum Position {
  As = 'as',
  Kop = 'kop',
  Kepala = 'kepala',
  Ekor = 'ekor',
}
interface ColokJituTableSchema {
  d1: string;
  position: Position | undefined;
  status?: string;
  game?: string;
  wager?: string;
  dis?: string;
  net?: string;
  period?: string;
}

const defaultFilterFns = {
  fuzzy: () => true,
  contains: () => true,
};

const formCl = {
  d1: '',
  position: undefined,
  game: 'colok-jitu',
  wager: '',
  dis: '',
  net: '',
  period: '001',
  status: 'processing',
};

const createEmptyRow = () => formCl;

const initialData = [...Array(10)].fill(null).map(() => createEmptyRow());
let render = 0;

const ColokJituTable = () => {
  const [cj, setCj] = useState<ColokJituTableSchema[]>(() => initialData);

  const [selectedValues, setSelectedValues] = useState<string | []>([]);
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
    schema: colokJituTableSchema,
    mode: 'onChange',
    defaultValues: {
      cj,
      copy: false,
      copyWager: '',
      totalBet: '',
    },
  });

  const watchAllInputs = watch();
  const colokJitu = watch('cj');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const copy = useWatch({ control, name: 'copy' });
  const copyWager = useWatch({ control, name: 'copyWager' });

  useEffect(() => {
    if (copy) {
      const cj = getValues('cj');
      cj.forEach((val, index) => {
        if (val.d1 && val.position) setValue(`cj.${index}.wager`, copyWager);
      });
    }
  }, [copy, copyWager, setValue, getValues]);

  const handleInputChange = useCallback(
    (field: string, e: ChangeEvent<HTMLInputElement>, i: number) => {
      e.preventDefault();
      e.stopPropagation();

      e.target.value = safeParseFloat(
        Math.max(0, parseInt(e.target.value)).toString().slice(0, 6)
      ).toString();
      inputRefs.current[i] = e.target;
    },

    []
  );

  const handleSelectChange = (
    e: ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    key: string
  ) => {
    const { name, value } = e.target;

    setSelectedValues((prev: any) => ({
      ...prev,
      [`${rowIndex}.${key}`]: value,
    }));
  };

  const { cjColumns } = useColokJituColumns(
    register,
    control,
    watch,
    setFocus,
    getValues,
    setValue,
    handleInputChange,
    handleSelectChange
  );

  const onSubmit = (data: any) => {
    const filteredData = data.cj.filter(
      (dat: any) => dat.wager !== '' && dat.d1 !== '' && dat.position !== ''
    );

    const renderedNet = filteredData.map((item: any) => ({
      ...item,
      dis: (Number(item.wager) * (6 / 100)).toFixed().toString(),
      net: (Number(item.wager) * (94 / 100)).toFixed().toString(),
    }));
    const totalBet = renderedNet.reduce(function (acc: any, cur: any) {
      return acc + Number(cur.net);
    }, 0);
    setValue('totalBet', totalBet);
  };

  const table = useReactTable({
    data: colokJitu,
    columns: cjColumns,
    getCoreRowModel: getCoreRowModel(),
    filterFns: defaultFilterFns,
  });

  useEffect(() => {
    render++;
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>render: {render}</div>
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
                  colSpan={cjColumns.length}
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
        <div className='w-full text-right py-2 pr-4 '>
          <Button
            size='sm'
            type='submit'
            disabled={!isValid}
            className='py-1 px-2 '>
            Submit
          </Button>
        </div>
        {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
      </form>
    </>
  );
};

export default ColokJituTable;
