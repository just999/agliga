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
import { useMacauCColumns } from './macau-combo-columns';
import { macauBsOeTableSchema } from '@/schemas/togel-schema';

type MacauComboTableProps = {};

enum BigSmall {
  Big = 'big',
  Small = 'small',
}
enum OddEven {
  Odd = 'odd',
  Even = 'even',
}
enum Position {
  Belakang = 'belakang',
  Tengah = 'tengah',
  Depan = 'depan',
}

interface MacauComboTableSchema {
  position?: Position;
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

const formMacauC: MacauComboTableSchema = {
  position: Position.Belakang,
  bigSmall: BigSmall.Big,
  oddEven: OddEven.Even,
  game: 'macau-combo',
  wager: '',
  dis: '',
  net: '',
  period: '001',
  status: 'processing',
};
// const createEmptyRow = (index: number): MacauComboTableSchema => {
//   switch (index) {
//     case 0:
//       return {
//         position: Position.Belakang,
//         bigSmall: BigSmall.Big,
//         oddEven: OddEven.Even,
//         game: 'macau-combo',
//         wager: '',
//         dis: '',
//         net: '',
//         period: '001',
//         status: 'processing',
//       };
//     case 1:
//       return {
//         position: Position.Belakang,
//         bigSmall: BigSmall.Big,
//         oddEven: OddEven.Even,
//         game: 'macau-combo',
//         wager: '',
//         dis: '',
//         net: '',
//         period: '001',
//         status: 'processing',
//       };
//     case 2:
//       return {
//         position: Position.Tengah,
//         bigSmall: BigSmall.Big,
//         oddEven: OddEven.Even,
//         game: 'macau-combo',
//         wager: '',
//         dis: '',
//         net: '',
//         period: '001',
//         status: 'processing',
//       };
//     case 3:
//       return {
//         position: Position.Tengah,
//         bigSmall: BigSmall.Big,
//         oddEven: OddEven.Even,
//         game: 'macau-combo',
//         wager: '',
//         dis: '',
//         net: '',
//         period: '001',
//         status: 'processing',
//       };
//     case 4:
//       return {
//         position: Position.Depan,
//         bigSmall: BigSmall.Big,
//         oddEven: OddEven.Even,
//         game: 'macau-combo',
//         wager: '',
//         dis: '',
//         net: '',
//         period: '001',
//         status: 'processing',
//       };
//     case 5:
//       return {
//         position: Position.Depan,
//         bigSmall: BigSmall.Big,
//         oddEven: OddEven.Even,
//         game: 'macau-combo',
//         wager: '',
//         dis: '',
//         net: '',
//         period: '001',
//         status: 'processing',
//       };

//     default:
//       return {
//         position: Position.Belakang,
//         bigSmall: BigSmall.Big,
//         oddEven: OddEven.Even,
//         game: 'macau-combo',
//         wager: '',
//         dis: '',
//         net: '',
//         period: '001',
//         status: 'processing',
//       };
//   }
// };

const createEmptyRow = (index: number): MacauComboTableSchema => {
  const positions = [Position.Belakang, Position.Tengah, Position.Depan];
  const position = positions[Math.floor(index / 2) % positions.length];
  return {
    position,
    bigSmall: BigSmall.Big,
    oddEven: OddEven.Even,
    game: 'macau-combo',
    wager: '',
    dis: '',
    net: '',
    period: '001',
    status: 'processing',
  };
};

const initialData = [...Array(6)]
  .fill(null)
  .map((_, index) => createEmptyRow(index));
let render = 0;

const MacauComboTable = () => {
  const [macauC, setMacauC] = useState<MacauComboTableSchema[]>(
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
    schema: macauBsOeTableSchema,
    mode: 'onChange',
    defaultValues: {
      macauC,
      copy: false,
      copyWager: '',
    },
  });

  const watchAllInputs = watch();
  const macauComb = watch('macauC');
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
      [`macauSp.${rowIndex}.${key}`]: value,
    }));

    // setValue(`macau.${rowIndex}.${key}`, value);
  };

  const { macauCColumns } = useMacauCColumns(
    register,
    control,
    watch,
    isDirty,
    setFocus,
    getValues,
    setValue,
    handleInputChange,
    handleRadioChange
  );
  const onSubmit = (data: any) => {
    const filteredData = data.macauC.filter(
      (dat: any) => dat.wager !== '' && dat.d1 !== '' && dat.position !== ''
    );

    const renderedNet = filteredData.map((item: any) => ({
      ...item,
      dis: (Number(item.wager) * (5 / 100)).toFixed().toString(),
      net: (Number(item.wager) * (95 / 100)).toFixed().toString(),
    }));
    const totalBet = renderedNet.reduce(function (acc: any, cur: any) {
      return acc + Number(cur.net);
    }, 0);
    setValue('totalBet', totalBet);
  };

  const table = useReactTable({
    data: macauComb,
    columns: macauCColumns,
    getCoreRowModel: getCoreRowModel(),
    filterFns: defaultFilterFns,
  });

  useEffect(() => {
    render++;
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='py-2 '>
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
                    colSpan={macauCColumns.length}
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
              className='py-0 w-24'>
              Submit
            </Button>
          </div>
        </div>
        {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
      </form>
    </>
  );
};

export default MacauComboTable;
