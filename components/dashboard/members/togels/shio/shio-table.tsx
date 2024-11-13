'use client';

import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
  Table,
  Button,
} from '@/components/ui';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { useZodForm } from '@/hooks/use-zod-form';
import { safeParseFloat } from '@/lib/utils';

import { useState, useRef, useCallback, ChangeEvent, useEffect } from 'react';
import { useShioColumns } from './shio-columns';
import { shioTableSchema } from '@/schemas/togel-schema';
import ClientOnly from '@/lib/client-only';

type ShioTableProps = {};

enum Shio {
  Dragon = 'dragon',
  Rabbit = 'rabbit',
  Tiger = 'tiger',
  Ox = 'ox',
  Rat = 'rat',
  Swine = 'swine',
  Dog = 'dog',
  Rooster = 'rooster',
  Monkey = 'monkey',
  Lamb = 'lamb',
  Horse = 'horse',
  Snake = 'snake',
}

const shioValues = Object.values(Shio);

const createShioObject = (index: number) => {
  const shio = shioValues[index % shioValues.length];
  return {
    shio,
    game: 'shio',
    wager: '',
    dis: '',
    net: '',
    period: '001',
    status: 'processing',
  };
};

interface ShioTableSchema {
  shio?: Shio;
  status?: string;
  game?: string;
  wager?: string;
  dis?: string;
  net?: string;
  period?: string;
}
const defaultFilterFns = { fuzzy: () => true, contains: () => true };

const formShio: ShioTableSchema = {
  shio: Shio.Ox,
  game: 'shio',
  wager: '',
  dis: '',
  net: '',
  period: '001',
  status: 'processing',
};
const createEmptyRow = (index: number): ShioTableSchema => {
  switch (index) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
      return createShioObject(index);
    default:
      return createShioObject(3); // Default to 'Cow' if index is out of range
  }
};
const initialData = [...Array(12)]
  .fill(null)
  .map((_, index) => createEmptyRow(index));
let render = 0;

const ShioTable = () => {
  const [shio, setShio] = useState<ShioTableSchema[]>(() => initialData);

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
    schema: shioTableSchema,
    mode: 'onChange',
    defaultValues: {
      shio,
      copy: false,
      copyWager: '',
    },
  });

  const watchAllInputs = watch();
  const shioComb = watch('shio');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

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

  const handleRadioChange = (
    e: ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    key: string
  ) => {
    const { name, value } = e.target;
    setSelectedValues((prev: any) => ({
      ...prev,
      [`shio.${rowIndex}.${key}`]: value,
    }));

    // setValue(`shio.${rowIndex}.${key}`, value);
  };

  const { shioColumns } = useShioColumns(
    register,
    control,
    watch,
    setFocus,
    getValues,
    setValue,
    handleInputChange,
    handleRadioChange
  );
  const onSubmit = (data: any) => {
    const filteredData = data.shio.filter(
      (dat: ShioTableSchema) => dat.wager !== ''
    );
    // .map((sh: ShioTableSchema) => ({
    //   ...sh,
    //   dis: Number(sh.wager) * (9 / 100),
    //   net: Number(sh.wager) * (91 / 100),
    // }));

    const renderedNet = filteredData.map((item: any) => ({
      ...item,
      dis: (Number(item.wager) * 0.09).toFixed().toString(),
      net: (Number(item.wager) * 0.91).toFixed().toString(),
    }));

    const totalBet = renderedNet.reduce(function (acc: any, cur: any) {
      return acc + Number(cur.net);
    }, 0);
    setValue('totalBet', totalBet);
  };

  const table = useReactTable({
    data: shioComb,
    columns: shioColumns,
    getCoreRowModel: getCoreRowModel(),
    filterFns: defaultFilterFns,
  });

  useEffect(() => {
    render++;
  }, []);

  return (
    <ClientOnly>
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
                  colSpan={shioColumns.length}
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
    </ClientOnly>
  );
};

export default ShioTable;
