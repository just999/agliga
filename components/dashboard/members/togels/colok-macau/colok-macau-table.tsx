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
import { colokMacauTableSchema } from '@/schemas/togel-schema';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useColokMacauColumns } from './colok-macau-columns';
import { useWatch } from 'react-hook-form';

type ColokMacauTableProps = {};

interface ColokMacauTableSchema {
  d1: string;
  d2: string;
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

const formCm = {
  d1: '',
  d2: '',
  game: 'colok-macau',
  wager: '',
  dis: '',
  net: '',
  period: '001',
  status: 'processing',
};

const createEmptyRow = () => formCm;

const initialData = [...Array(10)].fill(null).map(() => createEmptyRow());
let render = 0;

const ColokMacauTable = () => {
  const [cm, setCm] = useState<ColokMacauTableSchema[]>(() => initialData);

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
    schema: colokMacauTableSchema,
    mode: 'onChange',
    defaultValues: {
      cm,
    },
  });

  const watchAllInputs = watch();
  console.log('🚀 ~ watchAllInputs:', watchAllInputs);
  const colokMacau = watch('cm');
  console.log('🚀 ~ colokMacau:', colokMacau);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const copy = useWatch({ control, name: 'copy' });
  const copyWager = useWatch({ control, name: 'copyWager' });

  useEffect(() => {
    if (copy) {
      const cm = getValues('cm');
      cm.forEach((val, index) => {
        if (val.d1 && val.d2) setValue(`cm.${index}.wager`, copyWager);
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
    const otherKey = key === 'd1' ? 'd2' : 'd1';
    const selectedValues = watch('cm');
    return selectedValues?.[rowIndex]?.[otherKey] === i.toString();
  };

  const { cmColumns } = useColokMacauColumns(
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
    console.log('🚀 ~ onSubmit ~ data:', data);

    const filteredData = data.cm.filter(
      (dat: any) => dat.wager !== '' && dat.d1 !== '' && dat.d2 !== ''
    );

    const renderedNet = filteredData.map((item: any) => ({
      ...item,
      dis: (Number(item.wager) * (10 / 100)).toFixed().toString(),
      net: (Number(item.wager) * (90 / 100)).toFixed().toString(),
    }));
    console.log('🚀 ~ renderedNet ~ renderedNet:', renderedNet);

    const totalBet = renderedNet.reduce(function (acc: any, cur: any) {
      return acc + Number(cur.net);
    }, 0);

    setValue('totalBet', totalBet);
  };

  const table = useReactTable({
    data: colokMacau,
    columns: cmColumns,
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
                  colSpan={cmColumns.length}
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

export default ColokMacauTable;
