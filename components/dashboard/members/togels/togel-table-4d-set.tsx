'use client';

import { useCallback, useEffect, useState } from 'react';

import { Button } from '@/components/shadcn/ui';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shadcn/ui/table';
import useTogelSetColumns from '@/hooks/use-togel-set-columns';
import { useZodForm } from '@/hooks/use-zod-form';
import ClientOnly from '@/lib/client-only';
import { cn, validBet4dSet } from '@/lib/utils';
import {
  Sin4dSetFormDataSchema,
  sin4dSetSchema,
  Sin4dSetSchema,
} from '@/schemas/togel-schema';
import { useTogelStore } from '@/store/use-togel-store';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { PlusCircle } from 'lucide-react';
import { SubmitHandler, useFieldArray, useWatch } from 'react-hook-form';

import TogelTable4dSetConfirm from './togel-table-4d-set-confirm';

type TogelTable4dSetProps = {
  params: {
    slug: string;
  };
};

export type Form4dSetProps = {
  d1?: string;
  d2?: string;
  d3?: string;
  d4?: string;
  bet4d?: string;
  bet3d?: string;
  bet2d?: string;
  allBet?: string;
  [key: string]: any;
};

const form4d = {
  d1: '',
  d2: '',
  d3: '',
  d4: '',
  bet4d: '',
  bet3d: '',
  bet2d: '',
  allBet: '',
};

export type FormSetValuesProps = {
  sin4dSet: Form4dSetProps[];
  copy: boolean;
  copyWager: string;
  totalBet: string;
};

const createEmptyRow = () => form4d;

const sin4dSetInitial: Sin4dSetSchema[] = Array(2)
  .fill(null)
  .map(() => createEmptyRow());

let render = 0;

const TogelTable4dSet = ({ params }: TogelTable4dSetProps) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [sin4dSet, setSin4dSet] = useState<Sin4dSetSchema[]>(
    () => sin4dSetInitial
  );
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
    schema: sin4dSetSchema,
    mode: 'onChange',
    defaultValues: {
      sin4dSet,
      copy: false,
      copyWager: '',
      totalBet: '',
    },
  });

  const { sin4dSet: sin4d, setSin4dSet: setSin4d } = useTogelStore((state) => ({
    sin4dSet: state.sin4dSet,
    setSin4dSet: state.setSin4dSet,
  }));

  const sin4dSetData = watch('sin4dSet');
  useEffect(() => {
    if (sin4dSetData) setSin4dSet(sin4dSetData);
  }, [sin4dSetData]);

  // const allBetValues = useWatch({ control, name: 'allBet' });
  const validateObject = (obj: Form4dSetProps): boolean => {
    const keys = ['d1', 'd2', 'd3', 'd4'];
    const count = keys.reduce((acc, key: any) => (obj[key] ? acc + 1 : acc), 0);
    return count >= 2;
  };

  const validateArray = (arr: Form4dSetProps[]): boolean[] => {
    return arr.map(validateObject);
  };

  // const validationResults = validateArray(togel4dSet);
  const { fields, prepend, append, remove, update } = useFieldArray({
    control,
    name: 'sin4dSet',
    rules: {
      required: 'please blah blah',
    },
  });

  const period = '001';

  // const filteredSin = sin4dSet.map((sin, i) => {
  //   return Array(sin).map(({ bet4d, bet3d, bet2d, allBet, ...rest }, i) => {
  //     const res = Object.values(rest).filter((val) => val !== '').length;
  //     return { i, res };
  //   });
  // });

  // const filledFieldsCounts = countFilledFields(sin4dSet);

  const handleAddColumn = () => {
    append(form4d);
  };

  const defaultFilterFns = {
    fuzzy: () => true,
    contains: () => true,
  };

  const handleInputChange = useCallback(
    (field: string, value: string, i: number) => {
      const valueFields =
        field === 'd1' || field === 'd2' || field === 'd3' || field === 'd4'
          ? value.length === 1
          : value.length === 5;

      if (valueFields) {
        const fields: Array<keyof (typeof sin4dSetData)[0]> = [
          'd1',
          'd2',
          'd3',
          'd4',
          'bet4d',
          'bet3d',
          'bet2d',
          'allBet',
        ];
        const currentIndex = fields.indexOf(
          field as keyof (typeof sin4dSetData)[0]
        );
        const nextField = fields[currentIndex + 1];
        if (nextField) {
          setFocus(`sin4dSet.${i}.${nextField}`);
        }
      }
    },
    [setFocus]
  );

  const { togelColumns } = useTogelSetColumns(
    register,
    control,
    watch,
    setFocus,
    getValues,
    setValue,
    remove,
    handleInputChange
  );

  const handleValidateBet = () => {
    const res = getValues('sin4dSet');
    const validBet = validBet4dSet(res);

    if (validBet) setSin4d(validBet);
  };

  const onSubmit: SubmitHandler<Sin4dSetFormDataSchema> = async (data) => {
    data.sin4dSet.forEach((sin, i) => {
      const { bet4d, bet3d, bet2d, allBet, ...rest } = sin;

      const countSin = Object.values(rest).filter((val) => val !== '').length;
      const { d1, d2, d3, d4 } = rest;
      let game;
      if (countSin === 4 && d1 && d2 && d3 && d4) {
        game = '4d';
      }
      if (countSin === 3 && ((d1 && d2 && d3) || (d2 && d3 && d4))) {
        game = '3d';
      }
      if (
        countSin === 2 &&
        ((d1 && d2) ||
          (d2 && d3) ||
          (d3 && d4) ||
          (d1 && d3) ||
          (d1 && d4) ||
          (d2 && d4))
      ) {
        game = '2d';
      }

      const res = validBet4dSet(data.sin4dSet);
      if (res) setSin4dSet(res);
    });
  };

  const table = useReactTable({
    data: sin4dSet,
    columns: togelColumns,
    getCoreRowModel: getCoreRowModel(),
    filterFns: defaultFilterFns,
  });

  render++;
  return (
    <ClientOnly>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        'p-0 m-0 h-8 text-xs font-bold text-center',
                        header.column.id === 'number' && 'w-40',
                        header.column.id === 'bet' && 'w-80'
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {/* <pre>{JSON.stringify(header.column.id, null, 2)}</pre> */}
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
                    <TableCell key={cell.id} className='p-0 m-0 '>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  // colSpan={columns.length}
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
        {showSuccessMessage && (
          <div className='bg-green-200 text-green-800 p-4 rounded-md mt-4'>
            Form submitted successfully!
          </div>
        )}
        {errors.root && errors.root.serverError && (
          <p className='text-center text-red-700 w-full mx-auto text-xs bg-rose-100 shadow-md rounded-md text-shadow'>
            {errors.root.serverError.message as string}
          </p>
        )}
        <div className='flex justify-between items-center px-4 py-2'>
          <Button
            type='button'
            size='sm'
            variant='default'
            className='text-shadow-lg text-xs text-white font-semibold shadow-lg hover:bg-orange-300 hover:text-gray-600 hover:font-semibold px-2 py-1'
            onClick={handleAddColumn}
          >
            <PlusCircle
              size={14}
              className='svg text-sky-700 pr-1 hover:text-green-600'
            />{' '}
            Tambah baris
          </Button>

          <br />
          <pre>isValid: {isValid.toString()}</pre>
          <br />
          <pre>errors: {JSON.stringify(errors)}</pre>
          <p>{errors.sin4dSet?.root?.message}</p>
          <Button
            type='button'
            disabled={!isValid}
            size='sm'
            variant='primary'
            className='px-3 py-.5'
            onClick={handleValidateBet}
          >
            Check Bet
          </Button>
        </div>
      </form>
      <TogelTable4dSetConfirm params={params} sin4dSet={sin4d} />
    </ClientOnly>
  );
};

export default TogelTable4dSet;
