'use client';

import { useState, useRef, useCallback, ChangeEvent, useEffect } from 'react';
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
import { useZodForm } from '@/hooks/use-zod-form';
import { safeParseFloat } from '@/lib/utils';
import { fiftyFiftyTableSchema } from '@/schemas/togel-schema';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useFiftyFiftyColumns } from './fifty-fifty-columns';
import ClientOnly from '@/lib/client-only';

type FiftyFiftyTableProps = {};

enum BigSmall {
  Big = 'big',
  Small = 'small',
}
enum OddEven {
  Odd = 'odd',
  Even = 'even',
}
enum SideMiddle {
  Side = 'side',
  Middle = 'middle',
}
interface FiftyFiftyTableSchema {
  status?: string;
  game?: string;
  wager?: string;
  dis?: string;
  net?: string;
  period?: string;
  bigSmall?: BigSmall;
  oddEven?: OddEven;
  sideMiddle?: SideMiddle;
}
const defaultFilterFns = { fuzzy: () => true, contains: () => true };

const formFf: FiftyFiftyTableSchema = {
  game: '50 - 50',
  wager: '',
  dis: '',
  net: '',
  period: '001',
  status: 'processing',
  bigSmall: BigSmall.Big,
  oddEven: OddEven.Odd,
  sideMiddle: SideMiddle.Middle,
};
const createEmptyRow = (index: number): FiftyFiftyTableSchema => {
  switch (index) {
    case 0:
      return {
        game: '50 - 50',
        wager: '',
        dis: '',
        net: '',
        period: '001',
        status: 'processing',
        bigSmall: BigSmall.Big,
      };
    case 1:
      return {
        game: '50 - 50',
        wager: '',
        dis: '',
        net: '',
        period: '001',
        status: 'processing',
        oddEven: OddEven.Even,
      };
    case 2:
      return {
        game: '50 - 50',
        wager: '',
        dis: '',
        net: '',
        period: '001',
        status: 'processing',
        sideMiddle: SideMiddle.Middle,
      };
    default:
      return {
        game: '50 - 50',
        wager: '',
        dis: '',
        net: '',
        period: '001',
        status: 'processing',
      };
  }
};
const initialData = [...Array(3)]
  .fill(null)
  .map((_, index) => createEmptyRow(index));
let render = 0;

const FiftyFiftyTable = () => {
  const [ff, setFf] = useState<FiftyFiftyTableSchema[]>(() => initialData);

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
    schema: fiftyFiftyTableSchema,
    mode: 'onChange',
    defaultValues: {
      ff,
      copy: false,
      copyWager: '',
    },
  });

  const watchAllInputs = watch();
  const fiftyFifty = watch('ff');
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
      [`ff.${rowIndex}.${key}`]: value,
    }));

    // setValue(`ff.${rowIndex}.${key}`, value);
  };

  const { ffColumns } = useFiftyFiftyColumns(
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
    const filteredData = data.ff.filter((dat: any) => dat.wager !== '');

    const renderedNet = filteredData.map((item: any) => ({
      ...item,
      dis: (Number(item.wager) * -(1.5 / 100)).toFixed().toString(),
      net: (Number(item.wager) * (101.5 / 100)).toFixed().toString(),
    }));
    const totalBet = renderedNet.reduce(function (acc: any, cur: any) {
      return acc + Number(cur.net);
    }, 0);

    setValue('totalBet', totalBet);
  };

  const table = useReactTable({
    data: fiftyFifty,
    columns: ffColumns,
    getCoreRowModel: getCoreRowModel(),
    filterFns: defaultFilterFns,
  });

  useEffect(() => {
    render++;
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='py-2'>
          {/* <div className='font-semibold text-xs my-5'>render: {render}</div> */}
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
                    colSpan={ffColumns.length}
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
          <div className='w-full text-right py-2'>
            <Button
              size='sm'
              type='submit'
              disabled={!isValid}
              className='py-0 w-28'>
              Submit
            </Button>
          </div>
        </div>
        {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
      </form>
    </>
  );
};

export default FiftyFiftyTable;
