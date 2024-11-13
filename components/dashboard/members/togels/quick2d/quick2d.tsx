'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { useZodForm } from '@/hooks/use-zod-form';
import { cn, generateAndPadArrayFn, safeParseFloat } from '@/lib/utils';

import { bseoTableSchema } from '@/schemas/togel-schema';
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import ClientOnly from '@/lib/client-only';
import { ArrayOptProps } from '@/types/types';
import { useQuick2dColumns } from './quick2d-columns';
import Quick2dDetailsTable from './quick2d-details-table';
import { useTogelStore } from '@/store/use-togel-store';

type BseoSpecialTableProps = {};

// Define the valid keys for array options
type BseoKey = 'big' | 'small' | 'odd' | 'even';
type PosKey = '2d' | '2dd' | '2dt';

// !Type guard
function isBseoKey(value: string): value is BigSmallOddEven {
  return Object.values(BigSmallOddEven).includes(value as BigSmallOddEven);
}

function isPosKey(value: string): value is Position {
  return ['2d', '2dd', '2dt'].includes(value);
}

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

type ArrayOptionsProps = {
  newBseo: ArrayOptProps;
};

export interface BsOe4dSchema {
  bseo: BigSmallOddEven;
  position: Position;
  game: string;
  status?: string;
  wager?: string;
  dis?: string;
  net?: string;
  period?: string;
  bseoArray?: ArrayOptProps[];
}

const defaultFilterFns = { fuzzy: () => true, contains: () => true };

const formBseo: BsOe4dSchema = {
  bseo: BigSmallOddEven.Big,
  position: Position.TwoD,
  game: 'quick 2d',
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

const Quick2d = () => {
  const [bsEo, setBsEo] = useState<BsOe4dSchema[]>(() => initialData);
  const [show, setShow] = useState<boolean>(false);
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>(
    {}
  );
  // const [arrayValues, setArrayValues] = useState<ArrayOptProps[]>([]);

  // Refs
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const arrayOptionsRef = useRef<ArrayOptProps[]>([]);

  // Form setup
  const {
    register,
    handleSubmit,
    setValue,
    control,
    setFocus,
    watch,
    getValues,
    formState: { errors, isValid, isSubmitting, isDirty },
  } = useZodForm({
    schema: bseoTableSchema,
    mode: 'onChange',
    defaultValues: {
      bsEo: [formBseo],
      copy: false,
      copyWager: '',
    },
  });

  const bseoVal = watch('bsEo');

  const { bseo, position, wager } = bseoVal[0];

  // const { sin4d, setSin4d } = useTogelStore((state) => ({
  //   sin4d: state.sin4d,
  //   setSin4d: state.setSin4d,
  // }));

  // Memoized array options
  // const arrayOptions: ArrayOptProps[] = useMemo(() => {
  //   const newBseo = generateAndPadArrayFn(position, wager, bseo);
  //   if (newBseo) {
  //     setArrayValues(newBseo);

  //     arrayOptionsRef.current = newBseo; // Keep ref updated
  //   }
  //   return newBseo;
  // }, [position, wager, bseo]);
  // Handlers
  // const handleChange = useCallback(
  //   (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
  //     const { name, value } = e.target;
  //     setBsEo((prev) => {
  //       const newState = [...prev];
  //       if (name === `bsEo.${i}.bseo`) {
  //         if (isBseoKey(value)) {
  //           const selectedArray = arrayOptionsRef.current; // !Use ref for latest value
  //           newState[i] = {
  //             ...newState[i],
  //             bseo: value,
  //             bseoArray: selectedArray,
  //           };
  //         }
  //       } else {
  //         newState[i] = {
  //           ...newState[i],
  //           [name.split('.')[2]]: value,
  //         };
  //         // setSelectedValues((prev) => ({
  //         //   ...prev,
  //         //   [name.split('.')[2]]: value,
  //         // }));
  //       }
  //       setValue('bsEo', newState);
  //       return newState;
  //     });
  //   },
  //   [setValue, bsEo]
  // );

  const handleChange = useCallback(
    (field: string, e: React.ChangeEvent<HTMLInputElement>, i: number) => {
      const { name, value } = e.target;
      setBsEo((prev) => {
        const newState = [...prev];
        if (name === `bsEo.${i}.bseo`) {
          if (isBseoKey(value)) {
            const selectedArray = arrayOptionsRef.current; // Use ref for latest value
            newState[i] = {
              ...newState[i],
              bseo: value,
              // bseoArray: selectedArray,
              wager: prev[i].wager, // Preserve the wager value
            };
          }
        } else if (name === `bsEo.${i}.position`) {
          if (isPosKey(value)) {
            newState[i] = {
              ...newState[i],
              position: value,
              wager: prev[i].wager, // Preserve the wager value
            } as BsOe4dSchema;
          }
        } else {
          newState[i] = {
            ...newState[i],
            [name.split('.')[2]]: value,
          };
        }
        setValue('bsEo', newState);

        return newState;
      });
    },
    [setValue]
  );

  const handleInputChange = useCallback(
    (field: string, e: ChangeEvent<HTMLInputElement>, i: number) => {
      e.preventDefault();
      e.stopPropagation();

      const safeValue = safeParseFloat(
        Math.max(0, parseInt(e.target.value)).toString().slice(0, 6)
      ).toString();

      e.target.value = safeValue;
      inputRefs.current[i] = e.target;
    },
    []
  );

  const handleRadioChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, rowIndex: number, key: string) => {
      const { value } = e.target;
      setSelectedValues((prev) => ({
        ...prev,
        [`bsEo.${rowIndex}.${key}`]: value,
      }));
    },
    []
  );

  const { quick2dColumns } = useQuick2dColumns(
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

  const table = useReactTable({
    data: bseoVal,
    columns: quick2dColumns,
    getCoreRowModel: getCoreRowModel(),
    filterFns: defaultFilterFns,
  });
  useEffect(() => {
    render++;
  }, []);
  return (
    <ClientOnly>
      {/* <div className='font-semibold text-xs my-5'>render: {render}</div> */}
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className={cn('p-0 m-0 h-8 text-xs font-bold text-center')}
                    style={{ width: `${header.getSize()}px` }}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {/* <pre>{JSON.stringify(header.getSize(), null, 2)}</pre> */}
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
                className='bg-orange-50 shadow-inner '>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={cn('p-0 m-0')}
                    style={{ width: `${cell.column.getSize()}px` }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    {/* <pre>{JSON.stringify(cell.column.getSize(), null, 2)}</pre> */}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={quick2dColumns.length}
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
      <div
        className={cn(
          'w-full flex flex-col'
          // show ? 'w-full flex flex-row-reverse justify-between' : ''
        )}>
        <Quick2dDetailsTable q2dData={bseoVal} />
      </div>

      {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
    </ClientOnly>
  );
};

export default Quick2d;
