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
import { cn, safeParseFloat } from '@/lib/utils';

import { useState, useRef, useCallback, ChangeEvent, useEffect } from 'react';
import { useDasarColumns } from './dasar-columns';
import { dasarBsOeTableSchema } from '@/schemas/togel-schema';
import DasarRules from './dasar-rules';
import { ChevronUpSquareIcon, ChevronDownSquareIcon } from 'lucide-react';

type DasarTableProps = {};

enum BigSmall {
  Big = 'big',
  Small = 'small',
}
enum OddEven {
  Odd = 'odd',
  Even = 'even',
}

interface DasarTableSchema {
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

const formDasar: DasarTableSchema = {
  oddEven: OddEven.Odd,
  bigSmall: BigSmall.Big,
  game: 'dasar',
  wager: '',
  dis: '',
  net: '',
  period: '001',
  status: 'processing',
};
// const createEmptyRow = (index: number): DasarTableSchema => {
//   switch (index) {
//     case 0:
//       return {
//         oddEven: OddEven.Odd,
//         game: 'dasar',
//         wager: '',
//         dis: '',
//         net: '',
//         period: '001',
//         status: 'processing',
//       };
//     case 1:
//       return {
//         oddEven: OddEven.Odd,
//         game: 'dasar',
//         wager: '',
//         dis: '',
//         net: '',
//         period: '001',
//         status: 'processing',
//       };
//     case 2:
//       return {
//         bigSmall: BigSmall.Big,
//         game: 'dasar',
//         wager: '',
//         dis: '',
//         net: '',
//         period: '001',
//         status: 'processing',
//       };
//     case 3:
//       return {
//         bigSmall: BigSmall.Big,
//         game: 'dasar',
//         wager: '',
//         dis: '',
//         net: '',
//         period: '001',
//         status: 'processing',
//       };

//     default:
//       return {
//         bigSmall: BigSmall.Big,
//         oddEven: OddEven.Even,
//         game: 'dasar',
//         wager: '',
//         dis: '',
//         net: '',
//         period: '001',
//         status: 'processing',
//       };
//   }
// };

const createEmptyRow = (index: number): DasarTableSchema => {
  const row: DasarTableSchema = {
    game: 'dasar',
    wager: '',
    dis: '',
    net: '',
    period: '001',
    status: 'processing',
  };

  if (index >= 0 && index <= 1) {
    row.oddEven = OddEven.Odd;
  } else if (index >= 2 && index <= 3) {
    row.bigSmall = BigSmall.Big;
  }
  return row;
};

const initialData = [...Array(4)]
  .fill(null)
  .map((_, index) => createEmptyRow(index));
let render = 0;

const DasarTable = () => {
  const [dasar, setDasar] = useState<DasarTableSchema[]>(() => initialData);
  const [showDescription, setShowDescription] = useState(false);
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
    schema: dasarBsOeTableSchema,
    mode: 'onChange',
    defaultValues: {
      dasar,
      copy: false,
      copyWager: '',
    },
  });

  const watchAllInputs = watch();
  const dasarComb = watch('dasar');
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
      [`dasarSp.${rowIndex}.${key}`]: value,
    }));

    // setValue(`dasar.${rowIndex}.${key}`, value);
  };

  const { dasarColumns } = useDasarColumns(
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
    const filteredData = data.dasar.filter((dat: any) => dat.wager !== '');

    const renderedNet = filteredData.map((item: any) => ({
      ...item,
      dis: (Number(item.wager) * (25 / 100)).toFixed().toString(),
      net: (Number(item.wager) * (125 / 100)).toFixed().toString(),
    }));
    const totalBet = renderedNet.reduce(function (acc: any, cur: any) {
      return acc + Number(cur.net);
    }, 0);
    setValue('totalBet', totalBet);
  };

  const table = useReactTable({
    data: dasarComb,
    columns: dasarColumns,
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
          {/* <div className='font-semibold text-xs'>render: {render}</div> */}
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
                    colSpan={dasarColumns.length}
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

        <div className={cn('w-140 flex flex-col')}>
          <Button
            variant='ghost'
            size='sm'
            type='button'
            onClick={() => setShowDescription(!showDescription)}
            className='w-full flex justify-between hover:bg-emerald-100/70 '>
            <div>Keterangan:</div>
            <div>
              {showDescription ? (
                <ChevronUpSquareIcon className='text-emerald-600 svg ' />
              ) : (
                <ChevronDownSquareIcon className='text-emerald-600 svg ' />
              )}
            </div>
          </Button>
          <DasarRules
            showDescription={showDescription}
            setShowDescription={setShowDescription}
          />
        </div>
      </form>
    </>
  );
};

export default DasarTable;
