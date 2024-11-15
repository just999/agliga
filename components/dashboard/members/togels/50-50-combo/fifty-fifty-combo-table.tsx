'use client';

import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

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
import { cn, safeParseFloat } from '@/lib/utils';
import { fiftyFiftyMsKkkTableSchema } from '@/schemas/togel-schema';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronDownSquareIcon, ChevronUpSquareIcon } from 'lucide-react';

import { FiftyFiftyComboColumns } from './fifty-fifty-combo-columns';
import FiftyFiftyComboRules from './fifty-fifty-combo-rules';

type FiftyFiftyComboTableProps = {};

enum MonoStereo {
  Mono = 'mono',
  Stereo = 'stereo',
}

enum KembangKempisKembar {
  Kembang = 'kembang',
  Kempis = 'kempis',
  Kembar = 'kembar',
}

enum Position {
  Belakang = 'belakang',
  Tengah = 'tengah',
  Depan = 'depan',
}

interface FiftyFiftyComboTableSchema {
  position?: Position;
  monoStereo?: MonoStereo;
  kembangKempisKembar?: KembangKempisKembar;
  status?: string;
  game?: string;
  wager?: string;
  dis?: string;
  net?: string;
  period?: string;
}
const defaultFilterFns = { fuzzy: () => true, contains: () => true };

const formFfC: FiftyFiftyComboTableSchema = {
  position: Position.Belakang,
  monoStereo: MonoStereo.Mono,
  kembangKempisKembar: KembangKempisKembar.Kembang,
  game: '50-50-combo',
  wager: '',
  dis: '',
  net: '',
  period: '001',
  status: 'processing',
};

// const createEmptyRow = (index: number): FiftyFiftyComboTableSchema => {
//   switch (index) {
//     case 0:
//       return {
//         position: Position.Belakang,
//         monoStereo: MonoStereo.Mono,
//         game: '50-50-combo',
//         wager: '',
//         dis: '',
//         net: '',
//         period: '001',
//         status: 'processing',
//       };
//     case 1:
//       return {
//         position: Position.Belakang,
//         kembangKempisKembar: KembangKempisKembar.Kembang,
//         game: '50-50-combo',
//         wager: '',
//         dis: '',
//         net: '',
//         period: '001',
//         status: 'processing',
//       };
//     case 2:
//       return {
//         position: Position.Tengah,
//         monoStereo: MonoStereo.Mono,
//         game: '50-50-combo',
//         wager: '',
//         dis: '',
//         net: '',
//         period: '001',
//         status: 'processing',
//       };
//     case 3:
//       return {
//         position: Position.Tengah,
//         kembangKempisKembar: KembangKempisKembar.Kembang,
//         game: '50-50-combo',
//         wager: '',
//         dis: '',
//         net: '',
//         period: '001',
//         status: 'processing',
//       };
//     case 4:
//       return {
//         position: Position.Depan,
//         monoStereo: MonoStereo.Mono,
//         game: '50-50-combo',
//         wager: '',
//         dis: '',
//         net: '',
//         period: '001',
//         status: 'processing',
//       };
//     case 5:
//       return {
//         position: Position.Depan,
//         kembangKempisKembar: KembangKempisKembar.Kembang,
//         game: '50-50-combo',
//         wager: '',
//         dis: '',
//         net: '',
//         period: '001',
//         status: 'processing',
//       };

//     default:
//       return {
//         position: Position.Belakang,
//         monoStereo: MonoStereo.Mono,
//         kembangKempisKembar: KembangKempisKembar.Kembang,
//         game: '50-50-combo',
//         wager: '',
//         dis: '',
//         net: '',
//         period: '001',
//         status: 'processing',
//       };
//   }
// };

const createEmptyRow = (index: number): FiftyFiftyComboTableSchema => {
  const positions = [Position.Belakang, Position.Tengah, Position.Depan];
  const position = positions[Math.floor(index / 2) % positions.length];

  const row: FiftyFiftyComboTableSchema = {
    position,
    game: '50-50-combo',
    wager: '',
    dis: '',
    net: '',
    period: '001',
    status: 'processing',
  };

  if (index % 2 === 0) {
    row.monoStereo = MonoStereo.Mono;
  } else if (index % 2 !== 0) {
    row.kembangKempisKembar = KembangKempisKembar.Kembang;
  }
  return row;
};

const initialData = [...Array(6)]
  .fill(null)
  .map((_, index) => createEmptyRow(index));
let render = 0;

const FiftyFiftyComboTable = () => {
  const [ffC, setFfC] = useState<FiftyFiftyComboTableSchema[]>(
    () => initialData
  );
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
    schema: fiftyFiftyMsKkkTableSchema,
    mode: 'onChange',
    defaultValues: {
      ffC,
      copy: false,
      copyWager: '',
    },
  });

  const watchAllInputs = watch();
  const fiftyFiftyC = watch('ffC');
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
      [`ffSp.${rowIndex}.${key}`]: value,
    }));

    // setValue(`ff.${rowIndex}.${key}`, value);
  };

  const { ffCColumns } = FiftyFiftyComboColumns(
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
    const filteredData = data.ffC.filter(
      (dat: any) => dat.wager !== '' && dat.d1 !== '' && dat.position !== ''
    );

    const renderedNet = filteredData.map((item: any) => ({
      ...item,
      dis: (Number(item.wager) * -(2 / 100)).toFixed().toString(),
      net: (Number(item.wager) * (102 / 100)).toFixed().toString(),
    }));
    const totalBet = renderedNet.reduce(function (acc: any, cur: any) {
      return acc + Number(cur.net);
    }, 0);
    setValue('totalBet', totalBet);
  };

  const table = useReactTable({
    data: fiftyFiftyC,
    columns: ffCColumns,
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
          {/* <div className='font-semibold text-xs'>render: {render}</div> */}
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className='m-0 h-8 p-0 text-center text-xs font-bold'
                      >
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
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className='m-0 p-0'>
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
                    colSpan={ffCColumns.length}
                    className='h-24 text-center'
                  >
                    No Results
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableFooter className='bg-transparent'>
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
          <div className='w-full py-2 text-right'>
            <Button
              size='sm'
              type='submit'
              disabled={!isValid}
              className='w-28 py-0'
            >
              Submit
            </Button>
          </div>
        </div>
        {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}

        <div className={cn('flex w-134 flex-col')}>
          <Button
            variant='ghost'
            size='sm'
            type='button'
            onClick={() => setShowDescription(!showDescription)}
            className='flex w-full justify-between hover:bg-emerald-100/70'
          >
            <div>Keterangan:</div>
            <div>
              {showDescription ? (
                <ChevronUpSquareIcon className='svg text-emerald-600' />
              ) : (
                <ChevronDownSquareIcon className='svg text-emerald-600' />
              )}
            </div>
          </Button>
          <FiftyFiftyComboRules
            showDescription={showDescription}
            setShowDescription={setShowDescription}
          />
        </div>
      </form>
    </>
  );
};

export default FiftyFiftyComboTable;
