'use client';

import { createTogel } from '@/actions/togel-actions';
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

import useTransformGames from '@/hooks/use-togel-transform-games';
import { useZodForm } from '@/hooks/use-zod-form';
import { cn, handleFormServerErrors } from '@/lib/utils';
import { Sin4dSchema, sin4dSchema } from '@/schemas/togel-schema';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { useEffect, useRef, useState } from 'react';
import { useFieldArray, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Form4dSetProps } from '../togel-4d-set';
import { useTogel4dSetDetailsColumns } from './togel-4d-set-details-columns';
import { ChevronLeftCircle, PlusCircle } from 'lucide-react';
import { useTogelStore } from '@/store/use-togel-store';

type TogelTable4dSetConfirmProps = {
  params: {
    slug: string;
  };
  sin4dSet: Form4dSetProps[];
  show: boolean;
};

const form4d = {
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

const Togel4dSetDetailsTable = ({
  params,
  sin4dSet,
  show,
}: TogelTable4dSetConfirmProps) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [sin4ds, setSin4ds] = useState<Sin4dSchema[]>(() => initialData);

  const games = useTransformGames(sin4dSet);

  const gamesRef = useRef(games);

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
      totalBet: '',
    },
  });

  const sin4dSetValue = useWatch({
    control,
    name: 'sin4ds',
  });
  useEffect(() => {
    const getTotal = sin4dSetValue.reduce((acc: any, curr) => {
      return acc + Number(curr?.net);
    }, 0);
    if (getTotal) setValue('totalBet', getTotal.toFixed());
  }, [setValue, sin4dSetValue, sin4dSet]);

  useEffect(() => {
    if (Array.isArray(games) && games !== gamesRef.current) {
      setSin4ds(games);
      setValue('sin4ds', games);
      gamesRef.current = games;
    }
  }, [setSin4ds, games, setValue]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'sin4ds',
  });
  const handleBackChange = () => {
    setIsToggle(isToggle);
  };
  const defaultFilterFns = {
    fuzzy: () => true,
    contains: () => true,
  };

  const handleRemove = (index: number) => {
    remove(index);
    console.log(`Removed item at index: ${index}`);
  };

  const type = 'togel4dSet';
  const { togel4dSetColumns } = useTogel4dSetDetailsColumns(
    register,
    control,
    watch,
    setFocus,
    getValues,
    setValue,
    handleRemove,
    sin4dSet,
    type
  );

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

  const onSubmit = async (data: any) => {
    try {
      const res = await createTogel(data);
      if (res.status === 'success') {
        setShowSuccessMessage(true);
      } else {
        toast.error(res.status === 'error' ? 'error' : '');
        handleFormServerErrors(res, setError);
      }
    } catch (err) {
      console.error('error submit togel 4d set', err);
      toast.error('Submit Togel error');
    }
  };

  const table = useReactTable({
    data: fields,
    columns: togel4dSetColumns,
    getCoreRowModel: getCoreRowModel(),
    filterFns: defaultFilterFns,
  });

  useEffect(() => {
    render++;
  }, []);

  return (
    <>
      {/* <div className={cn('font-semibold text-xs my-5', !show && 'hidden')}>
        render detail: {render}
      </div> */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn(!show ? 'hidden' : '')}>
        <Table className={cn('bg-emerald-50 overflow-hidden')}>
          <TableHeader className={'h-7 shadow-lg'}>
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
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell className='h-24 text-center'>No Results</TableCell>
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
        <div className='flex justify-between items-center px-4 py-2 relative'>
          <Button
            type='button'
            size='sm'
            variant='default'
            className='group text-shadow-lg text-xs text-white font-semibold shadow-lg hover:bg-orange-300 hover:text-gray-600 hover:font-semibold px-2 py-1'
            onClick={handleBackChange}>
            <ChevronLeftCircle
              size={18}
              className='svg text-white pr-1 group-hover:text-gray-600'
            />{' '}
            back
          </Button>
          <Button
            type='submit'
            disabled={!isValid}
            size='sm'
            variant='primary'
            className='px-3 py-.5 absolute right-3 top-2'>
            Submit
          </Button>
        </div>
        {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
      </form>
    </>
  );
};

export default Togel4dSetDetailsTable;
