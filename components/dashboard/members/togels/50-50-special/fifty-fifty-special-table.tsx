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

import { FiftyFiftySpecialColumns } from './fifty-fifty-special-columns';
import { useZodForm } from '@/hooks/use-zod-form';
import { safeParseFloat } from '@/lib/utils';

import { useState, useRef, useCallback, ChangeEvent, useEffect } from 'react';
import {
  fiftyFiftyOeBsTableSchema,
  fiftyFiftyTableSchema,
} from '@/schemas/togel-schema';

type FiftyFiftySpecialTableProps = {};

enum BigSmall {
  Big = 'big',
  Small = 'small',
}
enum OddEven {
  Odd = 'odd',
  Even = 'even',
}

enum Suit {
  As = 'as',
  Kop = 'kop',
  Kepala = 'kepala',
  Ekor = 'ekor',
}

interface FiftyFiftySpecialTableSchema {
  suit?: Suit;
  bigSmall?: BigSmall;
  oddEven?: OddEven;
  status?: string;
  game?: string;
  wager?: string;
  dis?: string;
  net?: string;
  period?: string;
}
const defaultFilterFns = { fuzzy: () => true, contains: () => true };

const formFf: FiftyFiftySpecialTableSchema = {
  suit: Suit.As,
  game: '50-50-sp',
  wager: '',
  dis: '',
  net: '',
  period: '001',
  status: 'processing',
  bigSmall: BigSmall.Big,
  oddEven: OddEven.Odd,
};

// const createEmptyRow = (index: number): FiftyFiftySpecialTableSchema => {
//   switch (index) {
//     case 0:
//       return {
//         suit: Suit.As,
//         game: '50-50-sp',
//         wager: '',
//         dis: '',
//         net: '',
//         period: '001',
//         status: 'processing',
//         oddEven: OddEven.Odd,
//       };
//     case 1:
//       return {
//         suit: Suit.Kop,
//         game: '50-50-sp',
//         wager: '',
//         dis: '',
//         net: '',
//         period: '001',
//         status: 'processing',
//         oddEven: OddEven.Odd,
//       };
//     case 2:
//       return {
//         suit: Suit.Kepala,
//         game: '50-50-sp',
//         wager: '',
//         dis: '',
//         net: '',
//         period: '001',
//         status: 'processing',
//         oddEven: OddEven.Odd,
//       };
//     case 3:
//       return {
//         suit: Suit.Ekor,
//         game: '50-50-sp',
//         wager: '',
//         dis: '',
//         net: '',
//         period: '001',
//         status: 'processing',
//         oddEven: OddEven.Odd,
//       };
//     case 4:
//       return {
//         suit: Suit.As,
//         game: '50-50-sp',
//         wager: '',
//         dis: '',
//         net: '',
//         period: '001',
//         status: 'processing',
//         bigSmall: BigSmall.Big,
//       };
//     case 5:
//       return {
//         suit: Suit.Kop,
//         game: '50-50-sp',
//         wager: '',
//         dis: '',
//         net: '',
//         period: '001',
//         status: 'processing',
//         bigSmall: BigSmall.Big,
//       };
//     case 6:
//       return {
//         suit: Suit.Kepala,
//         game: '50-50-sp',
//         wager: '',
//         dis: '',
//         net: '',
//         period: '001',
//         status: 'processing',
//         bigSmall: BigSmall.Big,
//       };
//     case 7:
//       return {
//         suit: Suit.Ekor,
//         game: '50-50-sp',
//         wager: '',
//         dis: '',
//         net: '',
//         period: '001',
//         status: 'processing',
//         bigSmall: BigSmall.Big,
//       };
//     default:
//       return {
//         suit: Suit.As,
//         game: '50-50-sp',
//         wager: '',
//         dis: '',
//         net: '',
//         period: '001',
//         status: 'processing',
//         oddEven: OddEven.Odd,
//       };
//   }
// };

const createEmptyRow = (index: number): FiftyFiftySpecialTableSchema => {
  const suits = [Suit.As, Suit.Kop, Suit.Kepala, Suit.Ekor];
  const suit = suits[Math.floor(index / 1) % suits.length];

  const row: FiftyFiftySpecialTableSchema = {
    suit,
    game: 'macau-combo',
    wager: '',
    dis: '',
    net: '',
    period: '001',
    status: 'processing',
  };

  if (index >= 0 && index <= 3) {
    row.oddEven = OddEven.Odd;
  } else if (index >= 4 && index <= 7) {
    row.bigSmall = BigSmall.Big;
  }
  return row;
};

const initialData = [...Array(8)]
  .fill(null)
  .map((_, index) => createEmptyRow(index));

let render = 0;

const FiftyFiftySpecialTable = () => {
  const [ffSp, setFfSp] = useState<FiftyFiftySpecialTableSchema[]>(
    () => initialData
  );

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
    schema: fiftyFiftyOeBsTableSchema,
    mode: 'onChange',
    defaultValues: {
      ffSp,
      copy: false,
      copyWager: '',
    },
  });

  const watchAllInputs = watch();
  console.log('🚀 ~ watchAllInputs:', watchAllInputs);
  const fiftyFiftySp = watch('ffSp');
  console.log('🚀 ~ fiftyFifty:', fiftyFiftySp);
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
    console.log(
      '🚀 ~ FiftyFiftySpTable ~ name, value:',
      `ffSp.${rowIndex}.${key}`,
      name,
      value
    );
    setSelectedValues((prev: any) => ({
      ...prev,
      [`ffSp.${rowIndex}.${key}`]: value,
    }));

    // setValue(`ff.${rowIndex}.${key}`, value);
  };

  const { ffSpColumns } = FiftyFiftySpecialColumns(
    register,
    control,
    watch,
    setFocus,
    getValues,
    setValue,
    handleInputChange,
    handleRadioChange
  );

  console.log('🚀 ~ FiftyFiftySpTable ~ selectedValues:', selectedValues);
  const onSubmit = (data: any) => {
    const filteredData = data.ffSp.filter(
      (dat: any) => dat.wager !== '' && dat.d1 !== '' && dat.position !== ''
    );

    const renderedNet = filteredData.map((item: any) => ({
      ...item,
      dis: (Number(item.wager) * -(2 / 100)).toFixed().toString(),
      net: (Number(item.wager) * (102 / 100)).toFixed().toString(),
    }));
    console.log('🚀 ~ renderedNet ~ renderedNet:', renderedNet);

    const totalBet = renderedNet.reduce(function (acc: any, cur: any) {
      return acc + Number(cur.net);
    }, 0);

    setValue('totalBet', totalBet);
  };

  const table = useReactTable({
    data: fiftyFiftySp,
    columns: ffSpColumns,
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
                  colSpan={ffSpColumns.length}
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

export default FiftyFiftySpecialTable;
