'use client';

import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shadcn/ui';
import { useZodForm } from '@/hooks/use-zod-form';
import ClientOnly from '@/lib/client-only';
import { cn, generateAndPadArray, safeParseFloat } from '@/lib/utils';
import { bseoTableSchema, Sin4dSchema } from '@/schemas/togel-schema';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronLeft, ChevronLeftCircle, Percent } from 'lucide-react';

import BseoTableTest from './bseo-table-test';
import { useBseoTestColumns } from './bseo-test-columns';

type BseoSpecialTableProps = {};

enum BigSmallOddEven {
  Big = 'big',
  Small = 'small',
  Odd = 'odd',
  Even = 'even',
}

enum Position {
  TwoD = '2d',
  TwoDFront = '2dd',
  TwoDMiddle = '2dt',
}

interface BsOe4dSchema {
  bseo: BigSmallOddEven;
  position: Position;
  game: string;
  status?: string;
  wager?: string;
  dis?: string;
  net?: string;
  period?: string;
}

const defaultFilterFns = { fuzzy: () => true, contains: () => true };

const formBseo: BsOe4dSchema = {
  bseo: BigSmallOddEven.Big,
  position: Position.TwoD,
  game: 'Besar-Kecil/Genap-Ganjil',
  wager: '',
  dis: '',
  net: '',
  period: '001',
  status: 'processing',
};

const createEmptyRow = () => formBseo;

const initialData: BsOe4dSchema[] = Array(1)
  .fill(null)
  .map(() => createEmptyRow());

let render = 0;

const BseoTest = () => {
  const [bsEo, setBsEo] = useState<BsOe4dSchema[]>(() => initialData);
  const [show, setShow] = useState<boolean>(false);
  const [sin4d, setSin4d] = useState<Sin4dSchema[]>();
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
    schema: bseoTableSchema,
    mode: 'onChange',
    defaultValues: {
      bsEo,
      copy: false,
      copyWager: '',
    },
  });

  const watchAllInputs = watch();
  const bseoVal = watch('bsEo');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { bseo, position: game, wager } = bseoVal[0];

  useEffect(() => {
    if (bseoVal) {
      const res = bseoVal.map((bsVal, i) => {
        const { bseo, position: game, wager } = bsVal;
        if (bseo === 'small') {
          const newSmall = generateAndPadArray(game, wager, 50, 0);
        } else if (bseo === 'big') {
          const newBig = generateAndPadArray(game, wager, 50, 50);
        } else if (bseo === 'odd') {
          const newOdd = generateAndPadArray(game, wager, 50, 1, 2);
        } else if (bseo === 'even') {
          const newEven = generateAndPadArray(game, wager, 50, 0, 2);
        }
      });
    }
  }, [bseoVal]);

  const arrayOptions: any = useMemo(() => {
    const newSmall = generateAndPadArray(game, wager, 50, 0);
    const newBig = generateAndPadArray(game, wager, 50, 50);
    const newOdd = generateAndPadArray(game, wager, 50, 1, 2);
    const newEven = generateAndPadArray(game, wager, 50, 0, 2);

    return {
      big: newBig,
      small: newSmall,
      odd: newOdd,
      even: newEven,
    };
  }, [game, wager]);
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
      const { name, value } = e.target;
      // setBsEo((prev) => {
      //   const newState = [...prev];
      //   if (name === `bsEo.${i}.bseo`) {
      //     const selectedArray = arrayOptions[value];
      //     newState[i] = {
      //       ...newState[i],
      //       bseo: value,
      //       bseoArray: selectedArray,
      //     } as Bseo4dSchema;
      //   } else {
      //     newState[i] = {
      //       ...newState[i],
      //       [name.split('.')[2]]: value,
      //     };
      //   }
      //   setValue('bsEo', newState);
      //   return newState;
      // });
    },
    []
  );

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
      [`bsEo.${rowIndex}.${key}`]: value,
    }));

    // setValue(`ff.${rowIndex}.${key}`, value);
  };

  const { bseoTestColumns } = useBseoTestColumns(
    register,
    control,
    watch,
    setFocus,
    getValues,
    setValue,
    handleInputChange,
    handleRadioChange,
    handleChange
  );
  const handleSetBseo = () => {
    const res = getValues();
    setShow((pre) => !pre);
  };

  const bseoData =
    bseo === 'big'
      ? arrayOptions.big
      : bseo === 'small'
        ? arrayOptions.small
        : bseo === 'even'
          ? arrayOptions.even
          : arrayOptions.odd;

  const onSubmit = (data: any) => {
    const filteredData = data.bsEo.filter(
      (dat: any) => dat.wager !== '' && dat.d1 !== '' && dat.position !== ''
    );

    const renderedNet = filteredData.map((item: any) => ({
      ...item,
      dis: (Number(item.wager) * (29 / 100)).toFixed().toString(),
      net: (Number(item.wager) * (71 / 100)).toFixed().toString(),
    }));
    renderedNet.map((val: any, i: number) => {
      setValue(`bsEo.${i}.dis`, val.dis);
      setValue(`bsEo.${i}.net`, val.net);
    });

    const totalBet = renderedNet.reduce(function (acc: any, cur: any) {
      return acc + Number(cur.net) * 50;
    }, 0);

    setValue('totalBet', totalBet);
  };

  const table = useReactTable({
    data: bseoVal,
    columns: bseoTestColumns,
    getCoreRowModel: getCoreRowModel(),
    filterFns: defaultFilterFns,
  });
  useEffect(() => {
    render++;
  }, []);

  return (
    <ClientOnly>
      <form onSubmit={handleSubmit(onSubmit)} className='py-3 '>
        <div>render: {render}</div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className='p-0 m-0 h-8 text-xs font-bold text-center'
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
                  colSpan={bseoTestColumns.length}
                  className='h-24 text-center'
                >
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
        <div className='flex w-full '>
          <div
            className={cn(
              'w-full  py-2 pr-4',
              show ? 'text-left' : 'text-right'
            )}
          >
            <Button
              onClick={handleSetBseo}
              size='sm'
              type='button'
              className='py-1 px-2 '
            >
              {show ? (
                <div className='flex items-center gap-2 '>
                  <ChevronLeft className='svg ' /> Back
                </div>
              ) : (
                'Show details'
              )}
            </Button>
          </div>
          {show && (
            <div className='w-full text-right py-2 pr-4 '>
              <Button
                size='sm'
                type='submit'
                disabled={!isValid}
                className='py-1 px-2 '
              >
                <div className='flex items-center gap-2 '>Submit</div>
              </Button>
            </div>
          )}
        </div>
        {show && (
          <div>
            <span className='flex gap-4 items-center '>
              {/* <p>Pilih: {bseoValue}</p>
              <p>Posisi: {position}</p> */}
            </span>
            <BseoTableTest
              data={bseoData}
              // gameData={bsDataArray}
            />
          </div>
        )}
        {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
      </form>
    </ClientOnly>
  );
};

export default BseoTest;
