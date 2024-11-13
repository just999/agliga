'use client';

import { Button } from '@/components/ui';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import useTogelSetColumns from '@/hooks/use-togel-set-columns';
import { useZodForm } from '@/hooks/use-zod-form';
import { cn, validBet4dSet } from '@/lib/utils';
import { Sin4dSetFormDataSchema, sin4dSetSchema } from '@/schemas/togel-schema';

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { PlusCircle } from 'lucide-react';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';

import { SubmitHandler, useFieldArray, useWatch } from 'react-hook-form';
import Togel4dSetDetailsTable from './togel-4d-set-details-table';
import useTogel4dSetColumns from './togel-4d-set-columns';
import { useTogelStore } from '@/store/use-togel-store';

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

enum Sin4dSetFields {
  'bet2d',
  'bet3d',
  'bet4d',
  'allBet',
  'd1',
  'd2',
  'd3',
  'd4',
}

export type FormSetValuesProps = {
  sin4dSet: Form4dSetProps[];
  copy: boolean;
  copyWager: string;
  totalBet: string;
};

const createEmptyRow = () => form4d;

const sin4dSetInitial: Form4dSetProps[] = Array(2)
  .fill(null)
  .map(() => createEmptyRow());

let render = 0;

const Togel4dSetTable = ({ params }: TogelTable4dSetProps) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [show, setShow] = useState(false);
  const [emp, setEmp] = useState(false);
  const [sin4dSet, setSin4dSet] = useState<Form4dSetProps[]>(
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

  const {
    sin4dSet: sin4d,
    setSin4dSet: setSin4d,
    isToggle,
    setIsToggle,
  } = useTogelStore((state) => ({
    sin4dSet: state.sin4dSet,
    setSin4dSet: state.setSin4dSet,
    isToggle: state.isToggle,
    setIsToggle: state.setIsToggle,
  }));

  const sin4dSetData = watch('sin4dSet');
  useEffect(() => {
    if (sin4dSetData) setSin4dSet(sin4dSetData);
  }, [sin4dSetData]);

  const togel4dSet = useWatch({
    control,
    name: 'sin4dSet',
  });
  // const allBetValues = useWatch({ control, name: 'allBet' });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'sin4dSet',
  });
  useEffect(() => {
    if (sin4dSet.length >= 10) {
      setEmp(true);
    } else {
      setEmp(false);
    }
  }, [sin4dSet]);
  const handleAddColumn: any = () => {
    if (!emp && sin4dSet.length < 10) {
      append(form4d);
    } else {
      console.log('Cannot add more rows. Maximum limit reached.');
    }
  };

  const defaultFilterFns = {
    fuzzy: () => true,
    contains: () => true,
  };
  // const handleInputChange = useCallback(
  //   (field: string, e: ChangeEvent<HTMLInputElement>, i: number) => {
  //     const { name, value } = e.target;
  //     const valueFields =
  //       field === 'd1' || field === 'd2' || field === 'd3' || field === 'd4'
  //         ? value.length === 1
  //         : value.length === 5;

  //     if (valueFields) {
  //       const fields: Array<keyof (typeof sin4dSetData)[0]> = [
  //         'd1',
  //         'd2',
  //         'd3',
  //         'd4',
  //         'bet4d',
  //         'bet3d',
  //         'bet2d',
  //         'allBet',
  //       ];
  //       const currentIndex = fields.indexOf(
  //         field as keyof (typeof sin4dSetData)[0]
  //       );
  //       const nextField = fields[currentIndex + 1];
  //       if (nextField) {
  //         setFocus(`sin4dSet.${i}.${nextField}`);
  //       }
  //     }
  //     const res = getValues('sin4dSet');

  //     const allBetValue = getValues(`sin4dSet.${i}.allBet`);

  //     res.filter(({ bet4d, bet3d, bet2d, allBet, ...rest }, idx) => {
  //       if (
  //         Object.values(rest).filter((val, index) => val !== '').length >= 2 &&
  //         allBet
  //       ) {
  //         setValue(`sin4dSet.${i}.bet2d`, allBetValue);
  //         setValue(`sin4dSet.${i}.bet3d`, allBetValue);
  //         setValue(`sin4dSet.${i}.bet4d`, allBetValue);
  //       }
  //     });
  //   },
  //   [getValues, setFocus, setValue]
  // );

  // const handleInputChange = useCallback(
  //   (
  //     field: 'bet2d' | 'bet3d' | 'bet4d' | 'allBet' | 'd1' | 'd2' | 'd3' | 'd4',
  //     e: ChangeEvent<HTMLInputElement>,
  //     i: number
  //   ) => {
  //     const { name, value } = e.target;

  //     // Handle backspace/deletion
  //     if (value === '') {
  //       setValue(`sin4dSet.${i}.${field}`, '');

  //       // Clear related bet fields if allBet is cleared
  //       if (field === 'allBet') {
  //         setValue(`sin4dSet.${i}.bet2d`, '');
  //         setValue(`sin4dSet.${i}.bet3d`, '');
  //         setValue(`sin4dSet.${i}.bet4d`, '');
  //       }
  //       return;
  //     }

  //     // Handle normal input
  //     const isDigitField =
  //       field === 'd1' || field === 'd2' || field === 'd3' || field === 'd4';
  //     const isBetField =
  //       field === 'bet4d' ||
  //       field === 'bet3d' ||
  //       field === 'bet2d' ||
  //       field === 'allBet';

  //     // Validate input is numeric
  //     if (!/^\d*$/.test(value)) {
  //       return;
  //     }

  //     // Apply max length restrictions
  //     if (
  //       (isDigitField && value.length <= 1) ||
  //       (isBetField && value.length <= 5)
  //     ) {
  //       setValue(`sin4dSet.${i}.${field}`, value);

  //       // Handle field navigation
  //       const fields: Array<keyof Form4dSetProps> = [
  //         'd1',
  //         'd2',
  //         'd3',
  //         'd4',
  //         'bet4d',
  //         'bet3d',
  //         'bet2d',
  //         'allBet',
  //       ];

  //       const currentIndex = fields.indexOf(
  //         field as keyof (typeof sin4dSetData)[0]
  //       );
  //       const shouldMoveNext =
  //         (isDigitField && value.length === 1) ||
  //         (isBetField && value.length === 5);

  //       if (shouldMoveNext && currentIndex < fields.length - 1) {
  //         setFocus(`sin4dSet.${i}.${fields[currentIndex + 1]}`);
  //       }

  //       // Handle allBet propagation
  //       const res = getValues('sin4dSet');
  //       const allBetValue = getValues(`sin4dSet.${i}.allBet`);

  //       if (field === 'allBet' && allBetValue) {
  //         const { d1, d2, d3, d4 } = res[i];
  //         const hasAtLeastTwoDigits =
  //           [d1, d2, d3, d4].filter(Boolean).length >= 2;

  //         if (hasAtLeastTwoDigits) {
  //           setValue(`sin4dSet.${i}.bet2d`, allBetValue);
  //           setValue(`sin4dSet.${i}.bet3d`, allBetValue);
  //           setValue(`sin4dSet.${i}.bet4d`, allBetValue);
  //         }
  //       }
  //     }
  //   },
  //   [getValues, setFocus, setValue]
  // );

  // Define the complete form type
  type FormSetValues = {
    sin4dSet: Form4dSetProps[];
    copy: boolean;
    copyWager: string;
    totalBet: string;
  };

  // Define valid field names
  type Sin4dSetField = keyof Form4dSetProps;

  const handleInputChange = useCallback(
    (
      field: 'bet2d' | 'bet3d' | 'bet4d' | 'allBet' | 'd1' | 'd2' | 'd3' | 'd4',
      e: ChangeEvent<HTMLInputElement>,
      i: number
    ) => {
      const { value } = e.target;

      // Handle backspace/deletion
      if (value === '') {
        setValue(`sin4dSet.${i}.${field}`, '');

        // Clear related bet fields if allBet is cleared
        if (field === 'allBet') {
          setValue(`sin4dSet.${i}.bet2d`, '');
          setValue(`sin4dSet.${i}.bet3d`, '');
          setValue(`sin4dSet.${i}.bet4d`, '');
        }
        return;
      }

      // Handle normal input
      const isDigitField =
        field === 'd1' || field === 'd2' || field === 'd3' || field === 'd4';
      const isBetField =
        field === 'bet4d' ||
        field === 'bet3d' ||
        field === 'bet2d' ||
        field === 'allBet';

      // Validate input is numeric
      if (!/^\d*$/.test(value)) {
        return;
      }

      // Apply max length restrictions
      if (
        (isDigitField && value.length <= 1) ||
        (isBetField && value.length <= 6)
      ) {
        setValue(`sin4dSet.${i}.${field}`, value);

        // Handle field navigation
        const fields: Sin4dSetField[] = [
          'd1',
          'd2',
          'd3',
          'd4',
          'bet4d',
          'bet3d',
          'bet2d',
          'allBet',
        ];

        const currentIndex = fields.indexOf(field);
        const shouldMoveNext =
          (isDigitField && value.length === 1) ||
          (isBetField && value.length === 6);

        if (shouldMoveNext && currentIndex < fields.length - 1) {
          setFocus(`sin4dSet.${i}.${fields[currentIndex + 1]}` as any);
        }

        // Handle allBet propagation
        const res = getValues('sin4dSet');
        const allBetValue = getValues(`sin4dSet.${i}.allBet`);

        if (field === 'allBet' && allBetValue) {
          const { d1, d2, d3, d4 } = res[i];
          const hasAtLeastTwoDigits =
            [d1, d2, d3, d4].filter(Boolean).length >= 2;

          console.log(
            '🚀 ~ Togel4dSetTable ~ hasAtLeastTwoDigits:',
            hasAtLeastTwoDigits
          );

          if (hasAtLeastTwoDigits) {
            if ([d1, d2, d3, d4].filter(Boolean).length >= 2) {
              setValue(`sin4dSet.${i}.bet2d`, allBetValue);
              setValue(`sin4dSet.${i}.bet3d`, '');
              setValue(`sin4dSet.${i}.bet4d`, '');
            }
            if ([d1, d2, d3, d4].filter(Boolean).length >= 3) {
              setValue(`sin4dSet.${i}.bet2d`, allBetValue);
              setValue(`sin4dSet.${i}.bet3d`, allBetValue);
              setValue(`sin4dSet.${i}.bet4d`, '');
            }
            if ([d1, d2, d3, d4].filter(Boolean).length >= 4) {
              setValue(`sin4dSet.${i}.bet2d`, allBetValue);
              setValue(`sin4dSet.${i}.bet3d`, allBetValue);
              setValue(`sin4dSet.${i}.bet4d`, allBetValue);
            }
          } else {
            setValue(`sin4dSet.${i}.bet2d`, '');
            setValue(`sin4dSet.${i}.bet3d`, '');
            setValue(`sin4dSet.${i}.bet4d`, '');
          }
        }
      }
    },
    [getValues, setFocus, setValue]
  );

  const handleRemove = useCallback(
    (index: number) => {
      // const filteredItem = sin4dSet.filter((val, i) => i !== index);
      // setSin4dSet(filteredItem);
      // setValue(`sin4dSet`, filteredItem);
      remove(index);
      console.log(`Removed item at index: ${index}`);
    },
    [remove]
  );

  const { togel4dSetColumns } = useTogel4dSetColumns(
    register,
    control,
    watch,
    setFocus,
    getValues,
    setValue,
    remove,
    handleRemove,
    handleInputChange
  );

  console.log('🚀 ~ handleValidateBet ~ sin4dSetData:', sin4dSetData);
  const filteredSin4dData = sin4dSetData.filter((dat, i) => {
    const { bet4d, bet3d, bet2d, allBet, ...rest } = dat;

    if (Object.values(rest).filter((val) => val !== '').length === 2 && bet2d) {
      return 'valid 2d';
    } else if (
      Object.values(rest).filter((val) => val !== '').length === 3 &&
      (bet3d || bet2d)
    ) {
      return 'valid 2d 3d';
    } else if (
      Object.values(rest).filter((val) => val !== '').length === 4 &&
      (bet3d || bet2d || bet4d)
    ) {
      return 'valid 2d 3d 4d';
    }
  });
  console.log('🚀 ~ filteredSin4dData ~ filteredSin4dData:', filteredSin4dData);

  const handleValidateBet = () => {
    const res = getValues('sin4dSet');
    console.log('🚀 ~ handleValidateBet ~ sin4dSet:', sin4dSet);
    console.log('🚀 ~ handleValidateBet ~ res:', res);

    // const validBet = validBet4dSet(res);
    if (filteredSin4dData.length > 0) {
      setSin4d(filteredSin4dData);
      // setShow((prev) => !prev);
      setShow(!show);
    }
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
    data: sin4dSetData,
    columns: togel4dSetColumns,
    getCoreRowModel: getCoreRowModel(),
    filterFns: defaultFilterFns,
  });

  useEffect(() => {
    render++;
  }, []);

  return (
    <>
      {/* <div className={cn('font-semibold text-xs', show && 'hidden')}>
        render form: {render}
      </div> */}
      <form onSubmit={handleSubmit(onSubmit)} className={cn(show && 'hidden')}>
        <Table className='overflow-hidden'>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        'p-0 m-0 h-8 text-xs font-bold text-center',
                        header.column.id === 'number' && 'w-28',
                        header.column.id === 'bet' && 'w-80'
                      )}>
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
                  data-state={row.getIsSelected() && 'selected'}>
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
            variant='primary'
            disabled={emp}
            className='text-shadow-lg text-xs text-white font-semibold shadow-lg hover:bg-blue-300 hover:text-gray-600 hover:font-semibold px-2 py-1'
            onClick={handleAddColumn}>
            <PlusCircle
              size={20}
              className='svg text-sky-50 pr-1 hover:text-sky-500/70'
            />
            {emp ? 'max row' : 'Tambah baris'}
          </Button>
          <Button
            type='button'
            disabled={!isValid}
            size='sm'
            className='px-3 py-.5'
            onClick={handleValidateBet}>
            {show ? 'tutup details' : 'lihat details'}
          </Button>
        </div>
      </form>
      <Togel4dSetDetailsTable
        params={params}
        sin4dSet={sin4d}
        show={show}
        setShow={setShow}
      />
      {/* <TogelTable4dSetConfirm params={params} sin4dSet={sin4d} /> */}
      {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
    </>
  );
};

export default Togel4dSetTable;
