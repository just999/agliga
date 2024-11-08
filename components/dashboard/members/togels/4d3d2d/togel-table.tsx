'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { sin4dSchema, Sin4dSchema } from '@/schemas/togel-schema';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useFieldArray, useWatch } from 'react-hook-form';

import { createTogel } from '@/actions/togel-actions';
import { Button } from '@/components/ui';
import { handleFormServerErrors, safeParseFloat } from '@/lib/utils';

import { useZodForm } from '@/hooks/use-zod-form';
import ClientOnly from '@/lib/client-only';
import { PlusCircle } from 'lucide-react';
import { useTogel4dColumns } from './togel-4d-columns';

type TogelTableProps = {
  slug: string;
};

export type Form4dProps = {
  d1: string;
  d2: string;
  d3: string;
  d4: string;
  game: string;
  wager: string;
  dis: string;
  net: string;
  period: string;
  status: string;
};

export const form4d = {
  d1: '',
  d2: '',
  d3: '',
  d4: '',
  game: '',
  wager: '',
  dis: '',
  net: '',
  period: '001',
  status: 'processing',
};

const createEmptyRow = () => form4d;

const initialData = Array(2)
  .fill(null)
  .map(() => createEmptyRow());

let render = 0;

const TogelTable = ({ slug }: TogelTableProps) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [sin4ds, setSin4ds] = useState<Sin4dSchema[]>(() => initialData);

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
    schema: sin4dSchema,
    mode: 'onChange',
    defaultValues: {
      sin4ds,
      copy: false,
      copyWager: '',
      totalBet: '',
    },
  });
  const watchAllInputs = watch();
  const sin4d = watch('sin4ds');
  console.log('🚀 ~ TogelTable ~ sin4d:', sin4d);

  // const { copy, copyWager, sin4ds: newSin4ds } = watchAllInputs;

  const copy = useWatch({ control, name: 'copy' });
  const copyWager = useWatch({ control, name: 'copyWager' });

  useEffect(() => {
    if (sin4d) {
      // Update the entire sin4ds state with the new sin4d data
      setSin4ds(sin4d);
    }

    if (copy) {
      // Update the 'net' field for each item in the sin4ds array
      setSin4ds((prevSin4ds) =>
        prevSin4ds.map((val, i) => {
          if (val.wager && val.game === '4d') {
            return {
              ...val,
              net: (Number(val.wager) * 0.34).toFixed().toString(),
            };
          }
          return val;
        })
      );

      // Update the 'net' field for each item in the sin4ds array individually
      sin4d.forEach((item, i) => {
        const { game, dis, net, period, wager, status, ...rest } = item;
        console.log('🚀 ~ newSin4ds.forEach ~ item:', item);

        const number = Object.values(rest).filter((no) => no).length >= 2;
        console.log('🚀 ~ newSin4ds.forEach ~ number:', number);

        if (copy) {
          if (copyWager && game) {
            setValue(`sin4ds.${i}.wager`, copyWager);
            if (game === '4d' && rest.d1 && rest.d2 && rest.d3 && rest.d4) {
              setValue(`sin4ds.${i}.net`, (Number(copyWager) * 0.34).toFixed());
            } else if (
              game === '3d' &&
              !rest.d1 &&
              rest.d2 &&
              rest.d3 &&
              rest.d4
            ) {
              setValue(`sin4ds.${i}.net`, (Number(copyWager) * 0.41).toFixed());
            } else if (
              (game === '2d' || game === '2dt' || game === '2dd') &&
              ((rest.d1 && rest.d2 && !rest.d3 && !rest.d4) ||
                (!rest.d1 && rest.d2 && rest.d3 && !rest.d4) ||
                (!rest.d1 && !rest.d2 && rest.d3 && rest.d4))
            ) {
              setValue(`sin4ds.${i}.net`, (Number(copyWager) * 0.71).toFixed());
            } else {
              setValue(`sin4ds.${i}.net`, '');
            }
          }
        }
      });
    }
  }, [copy, copyWager, setSin4ds, setValue, sin4d]);
  console.log('🚀 ~ TogelTable ~ sin4ds:', sin4ds);

  // const copy = useWatch({ control, name: 'copy' });
  // const copyWager = useWatch({ control, name: 'copyWager' });

  // const newWager = useCallback(() => {
  //   if (copy) {
  //     const sin = getValues('sin4ds');
  //     console.log('🚀 ~ newWager ~ sin:', sin);

  //     sin.forEach((val, idx) => {
  //       console.log('🚀 ~ sin.forEach ~ game:', val.game);
  //       console.log('🚀 ~ sin.forEach ~ val:', val);
  //       console.log('🚀 ~ sin.forEach ~ val.wager:', val.wager);

  //       const { game, dis, net, period, status, ...rest } = val;
  //       console.log(Object.values(rest).filter((item) => item));

  //       if (Object.values(rest).filter((item) => item).length >= 2 && game) {
  //         setValue(`sin4ds.${idx}.wager`, copyWager);
  //       } else {
  //         setValue(`sin4ds.${idx}.wager`, '');
  //       }
  //     });
  //   }
  // }, [copy, copyWager, setValue, getValues]);

  // useEffect(() => {
  //   newWager();
  // }, [newWager, copy, copyWager]);

  // const setAllWager = useCallback(() => {
  //   sin4ds.forEach((item, i) => {
  //     const { game, dis, net, period, wager, status, ...rest } = item;
  //     console.log('🚀 ~ newSin4ds.forEach ~ item:', item);

  //     const number = Object.values(rest).filter((no) => no).length >= 2;
  //     console.log('🚀 ~ newSin4ds.forEach ~ number:', number);

  //     if (copy) {
  //       if (copyWager && number && game) {
  //         // if (
  //         //   (rest.d1 && rest.d2 && !rest.d3 && !rest.d4) ||
  //         //   (!rest.d1 && rest.d2 && rest.d3 && !rest.d4) ||
  //         //   (!rest.d1 && !rest.d2 && rest.d3 && rest.d4)
  //         // ) {
  //         setValue(`sin4ds.${i}.wager`, copyWager);
  //         // }
  //         if (game === '4d' && rest.d1 && rest.d2 && rest.d3 && rest.d4) {
  //           setValue(`sin4ds.${i}.net`, (Number(copyWager) * 0.34).toFixed());
  //         } else if (
  //           game === '3d' &&
  //           !rest.d1 &&
  //           rest.d2 &&
  //           rest.d3 &&
  //           rest.d4
  //         ) {
  //           setValue(`sin4ds.${i}.net`, (Number(copyWager) * 0.41).toFixed());
  //         } else if (game === '2d' || game === '2dt' || game === '2dd') {
  //           setValue(`sin4ds.${i}.net`, (Number(copyWager) * 0.71).toFixed());
  //         } else {
  //           setValue(`sin4ds.${i}.net`, '');
  //         }
  //       }
  //     }
  //   });
  // }, [copy, copyWager, setValue, sin4ds]);

  // useEffect(() => {
  //   setAllWager();
  //   return () => {
  //     setAllWager();
  //   };
  // }, [setAllWager]);

  const { fields, prepend, append, remove } = useFieldArray({
    control,
    name: 'sin4ds',
  });

  const period = '001';
  // const setNewWager = useCallback(() => {
  //   const { copy, copyWager } = watchAllInputs;

  //   sin4ds.forEach((sin, i: number) => {
  //     if (copy && copyWager) setValue(`sin4ds.${i}.wager`, copyWager);
  //   });
  // }, [sin4ds, setValue]); // todo please do not add dependency array of watchAllInputs
  // console.log('🚀 ~ TogelTable ~ sin4d:', sin4d);

  // useEffect(() => {
  //   setNewWager();

  //   return () => {
  //     setNewWager();
  //   };
  // }, [setNewWager]);

  const handleAddColumn = () => {
    append(form4d);
  };
  // const columns = useMemo(
  //   () => createTogelTableColumns(control, register, errors, isDirty, fields),
  //   [control, register, errors, isDirty, fields]
  // );

  // const renderedCol = fields.map((row,i)=>(

  // ))

  const defaultFilterFns = {
    fuzzy: () => true,
    contains: () => true,
  };

  const handleInputValue = useCallback(
    (field: string, e: ChangeEvent<HTMLInputElement>, i?: number) => {
      const { name, value } = e.target;

      if (field === 'copyWager' || field === 'wager') {
        e.target.value = safeParseFloat(
          Math.max(0, parseInt(e.target.value)).toString().slice(0, 6)
        ).toString();
      } else {
        e.target.value = safeParseFloat(
          Math.max(0, parseInt(e.target.value)).toString().slice(0, 1)
        ).toString();
      }
    },
    []
  );

  const handleInputChange = useCallback(
    (
      field: 'wager' | 'd1' | 'd2' | 'd3' | 'd4',
      e: ChangeEvent<HTMLInputElement>,
      i: number
    ) => {
      const { name, value } = e.target;
      console.log('🚀 ~ TogelTable ~ name, value :', name, value);

      // Update the value in the form state
      setValue(`sin4ds.${i}.${field}`, value);

      // Get the updated sin4d array
      const updatedSin4d = getValues('sin4ds');

      if (value === '') {
        setValue(`sin4ds.${i}.${field}`, '');

        // if (copyWager) {
        //   setValue(`sin4ds.${i}.wager`, '');
        // }
      }

      if (name) {
        // updatedSin4d.forEach((no, idx) => {
        const { game, wager, dis, net, period, status, ...rest } =
          updatedSin4d[i];
        console.log('🚀 ~ updatedSin4d.forEach ~ wager:', wager);
        if (rest || wager) {
          const { d1, d2, d3, d4 } = rest;
          if (d1 && d2 && !d3 && !d4) {
            setValue(`sin4ds.${i}.game`, '2dd');
            setValue(`sin4ds.${i}.dis`, '29%');
            setValue(`sin4ds.${i}.net`, (Number(wager) * 0.71).toFixed());
          } else if (!d1 && d2 && d3 && !d4) {
            setValue(`sin4ds.${i}.game`, '2dt');
            setValue(`sin4ds.${i}.dis`, '29%');
            setValue(`sin4ds.${i}.net`, (Number(wager) * 0.71).toFixed());
          } else if (!d1 && !d2 && d3 && d4) {
            setValue(`sin4ds.${i}.game`, '2d');
            setValue(`sin4ds.${i}.dis`, '29%');
            setValue(`sin4ds.${i}.net`, (Number(wager) * 0.71).toFixed());
          } else if (!d1 && d2 && d3 && d4) {
            setValue(`sin4ds.${i}.game`, '3d');
            setValue(`sin4ds.${i}.dis`, '59%');
            setValue(`sin4ds.${i}.net`, (Number(wager) * 0.41).toFixed());
          } else if (d1 && d2 && d3 && d4) {
            setValue(`sin4ds.${i}.game`, '4d');
            setValue(`sin4ds.${i}.dis`, '66%');
            setValue(`sin4ds.${i}.net`, (Number(wager) * 0.34).toFixed());
          } else {
            setValue(`sin4ds.${i}.game`, '');
            setValue(`sin4ds.${i}.dis`, '');
            setValue(`sin4ds.${i}.net`, '');
          }
        }
        // });
      }

      if (value.length === 1 && field) {
        const fields: Array<keyof (typeof sin4d)[0]> = [
          'd1',
          'd2',
          'd3',
          'd4',
          'wager',
        ];
        const currentIndex = fields.indexOf(field as keyof (typeof sin4d)[0]);
        const nextField = fields[currentIndex + 1];
        if (nextField) {
          setFocus(`sin4ds.${i}.${nextField}`);
        }
      }
    },
    [setFocus, getValues, setValue]
  );

  console.log('🚀 ~ TogelTable ~ sin4ds:', sin4ds);

  const { togel4dColumns } = useTogel4dColumns(
    register,
    control,
    watch,
    setFocus,
    getValues,
    setValue,
    remove,
    fields,
    handleInputChange,
    handleInputValue
  );

  const onSubmit = async (data: any) => {
    // const newData = JSON.parse(JSON.stringify(getValues()));
    const filteredData = {
      ...data,
      sin4ds: data.sin4ds.filter((item: Sin4dSchema) => item.game !== ' '),
    };
    const res = await createTogel(filteredData);
    if (res.status === 'success' && res.data) {
      setShowSuccessMessage(true);
    } else if (res.status === 'error') {
      handleFormServerErrors(res, setError);
    }
  };

  const table = useReactTable({
    data: sin4d,
    columns: togel4dColumns,
    getCoreRowModel: getCoreRowModel(),
    filterFns: defaultFilterFns,
  });

  useEffect(() => {
    render++;
  }, []);

  return (
    <ClientOnly>
      <div className='font-semibold text-xs'>render: {render}</div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                  colSpan={togel4dColumns.length}
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
            variant='default'
            className='text-shadow-lg text-xs text-white font-semibold shadow-lg hover:bg-orange-300 hover:text-gray-600 hover:font-semibold px-2 py-1'
            onClick={handleAddColumn}>
            <PlusCircle
              size={14}
              className='svg text-sky-700 pr-1 hover:text-green-600'
            />{' '}
            Tambah baris
          </Button>
          <Button
            disabled={!isValid}
            size='sm'
            variant='primary'
            className='px-3 py-.5'>
            Submit
          </Button>
        </div>
      </form>
      {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
    </ClientOnly>
  );
};

export default TogelTable;
