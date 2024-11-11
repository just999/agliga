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
import {
  ColokNagaTableSchema,
  colokNagaTableSchema,
} from '@/schemas/togel-schema';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useColokNagaColumns } from './colok-naga-columns';
import { useWatch } from 'react-hook-form';

type ColokNagaTableProps = {};

interface ColokMacauTableSchema {
  d1: string;
  d2: string;
  d3: string;
  status?: string;
  game?: string;
  wager?: string;
  dis?: string;
  net?: string;
  period?: string;
  [key: string]: string | undefined; // Index signature }
}

const defaultFilterFns = {
  fuzzy: () => true,
  contains: () => true,
};

const formCn = {
  d1: '',
  d2: '',
  d3: '',
  game: 'colok-naga',
  wager: '',
  dis: '',
  net: '',
  period: '001',
  status: 'processing',
};

const createEmptyRow = () => formCn;

const initialData = [...Array(10)].fill(null).map(() => createEmptyRow());
let render = 0;

const ColokNagaTable = () => {
  const [cn, setCn] = useState<ColokNagaTableSchema[]>(() => initialData);

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
    schema: colokNagaTableSchema,
    mode: 'onChange',
    defaultValues: {
      cn,
    },
  });

  const watchAllInputs = watch();
  const colokNaga = watch('cn');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const copy = useWatch({ control, name: 'copy' });
  const copyWager = useWatch({ control, name: 'copyWager' });

  useEffect(() => {
    if (copy) {
      const cn = getValues('cn');
      cn.forEach((val, index) => {
        if (val.d1 && val.d2 && val.d3)
          setValue(`cn.${index}.wager`, copyWager);
      });
    }
  }, [copy, copyWager, setValue, getValues]);

  const handleInputChange = useCallback(
    (field: string, e: ChangeEvent<HTMLInputElement>, i: number) => {
      e.preventDefault();
      e.stopPropagation();
      // if (e.target.value.length === 5) {
      //   const fields: Array<keyof (typeof cm)[0]> = ['d1', 'd2', 'wager'];
      //   const currentIndex = fields.indexOf(field as keyof (typeof cm)[0]);
      //   const nextField = fields[currentIndex + 1];
      //   if (nextField) {
      //     setFocus(`cm.${i}.${nextField}`);
      //   }
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

  const isOptionDisabled = (
    i: number,
    rowIndex: number,
    key: string
  ): boolean => {
    const selectedValues: ColokMacauTableSchema[] = watch('cn');
    const otherKeys = ['d1', 'd2', 'd3'].filter((k) => k !== key);
    return otherKeys.some(
      (otherKey) => selectedValues?.[rowIndex]?.[otherKey] === i.toString()
    );
  };

  const { cnColumns } = useColokNagaColumns(
    register,
    control,
    watch,
    setFocus,
    getValues,
    setValue,
    handleInputChange,
    handleSelectChange,
    isOptionDisabled
  );

  const onSubmit = (data: any) => {
    const filteredData = data.cn.filter(
      (dat: any) =>
        dat.wager !== '' && dat.d1 !== '' && dat.d2 !== '' && dat.d3 !== ''
    );

    const renderedNet = filteredData.map((item: any) => ({
      ...item,
      dis: (Number(item.wager) * (10 / 100)).toFixed().toString(),
      net: (Number(item.wager) * (90 / 100)).toFixed().toString(),
    }));
    const totalBet = renderedNet.reduce(function (acc: any, cur: any) {
      return acc + Number(cur.net);
    }, 0);

    setValue('totalBet', totalBet);
  };

  const table = useReactTable({
    data: colokNaga,
    columns: cnColumns,
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
                  colSpan={cnColumns.length}
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
      </form>
    </>
  );
};

export default ColokNagaTable;
