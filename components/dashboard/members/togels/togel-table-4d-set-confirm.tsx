'use client';

import { useEffect, useRef, useState } from 'react';

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
} from '@/components/shadcn/ui';
import { useTogel } from '@/hooks/use-togel';
import useTransformGames from '@/hooks/use-togel-transform-games';
import { useZodForm } from '@/hooks/use-zod-form';
import { handleFormServerErrors } from '@/lib/utils';
import { Sin4dSchema, sin4dSchema } from '@/schemas/togel-schema';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { PlusCircle } from 'lucide-react';
import { useFieldArray } from 'react-hook-form';
import toast from 'react-hot-toast';

import { Form4dSetProps } from './togel-4d-set';

type TogelTable4dSetConfirmProps = {
  params: {
    slug: string;
  };
  sin4dSet: Form4dSetProps[];
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

const TogelTable4dSetConfirm = ({
  params,
  sin4dSet: sin4dSetData,
}: TogelTable4dSetConfirmProps) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [sin4ds, setSin4ds] = useState<Sin4dSchema[]>(() => initialData);

  const games = useTransformGames(sin4dSetData);

  // const { sin4dSet, sin4d, setSin4d, setSin4dSet } = useTogelStore((state) => ({
  //   sin4dSet: state.sin4dSet,
  //   setSin4dSet: state.setSin4dSet,
  //   sin4d: state.sin4d,
  //   setSin4d: state.setSin4d,
  // }));

  const gamesRef = useRef(games);
  // const sin4dRef = useRef(games);

  // const gamesData = sin4dSet && useTransformGames(sin4dSet);
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
    },
  });

  useEffect(() => {
    if (Array.isArray(games) && games !== gamesRef.current) {
      setSin4ds(games);
      setValue('sin4ds', games);
      gamesRef.current = games;
    }
  }, [setSin4ds, games, setValue]);

  // const transform = sin4dSet.forEach((sin, i) => {
  //   const { bet4d, bet3d, bet2d, allBet, ...rest } = sin;

  //   const countSin = Object.values(rest).filter((val) => val !== '').length;
  //   let games = [];
  //   if (countSin === 4) {
  //     if (bet4d) {
  //       games.push({
  //         d1: rest.d1,
  //         d2: rest.d2,
  //         d3: rest.d3,
  //         d4: rest.d4,
  //         game: '4d',
  //         wager: bet4d,
  //         dis: '66%',
  //         net: Number(bet4d) * (34 / 100),
  //       });
  //     } else if (bet3d) {
  //       games.push({
  //         d1: null,
  //         d2: rest.d2,
  //         d3: rest.d3,
  //         d4: rest.d4,
  //         games: '3d',
  //         wager: bet3d,
  //         dis: '59%',
  //         net: Number(bet3d) * (41 / 100),
  //       });
  //     } else if (bet2d) {
  //       games.push({
  //         d1: null,
  //         d2: null,
  //         d3: rest.d3,
  //         d4: rest.d4,
  //         games: '2d',
  //         wager: bet2d,
  //         dis: '29%',
  //         net: Number(bet3d) * (71 / 100),
  //       });
  //     }
  //   }
  //   console.log(games);
  //   return games.map((game) => ({
  //     d1: rest.d1,
  //     d2: rest.d2,
  //     d3: rest.d3,
  //     d4: rest.d4,
  //     game: game.game,
  //     wager: game.wager,
  //     dis: game.dis,
  //     net: game.net,
  //   }));
  // });
  // const transformedForm4d = sin4dSet.filter((sin) => {
  //   const games = [];
  // if (sin.bet4d && sin.d1 && sin.d2 && sin.d3 && sin.d4) {
  //   games.push({
  //     d1: sin.d1,
  //     d2: sin.d2,
  //     d3: sin.d3,
  //     d4: sin.d4,
  //     game: '4d',
  //     wager: sin.bet4d,
  //     dis: '66%',
  //     net: Number(sin.bet4d) * (34 / 100),
  //   });
  // }
  // if (sin.bet3d && sin.d2 && sin.d3 && sin.d4)
  //   games.push({
  //     d1: '',
  //     d2: sin.d2,
  //     d3: sin.d3,
  //     d4: sin.d4,
  //     games: '3d',
  //     wager: sin.bet3d,
  //     dis: '59%',
  //     net: Number(sin.bet3d) * (41 / 100),
  //   });
  // if (sin.bet2d && sin.d3 && sin.d4)
  //   games.push({
  //     d1: '',
  //     d2: '',
  //     d3: sin.d3,
  //     d4: sin.d4,
  //     games: '2d',
  //     wager: sin.bet2d,
  //     dis: '29%',
  //     net: Number(sin.bet3d) * (71 / 100),
  //   });
  // if ((sin.d2 && sin.d3 && sin.d4) || (sin.d1 && sin.d2 && sin.d3)) {
  //   if (sin.bet3d && sin.d2 && sin.d3 && sin.d4)
  //     games.push({
  //       d1: '',
  //       d2: sin.d2,
  //       d3: sin.d3,
  //       d4: sin.d4,
  //       game: '3d',
  //       wager: sin.bet3d,
  //       dis: '59%',
  //       net: Number(sin.bet3d) * (41 / 100),
  //     });
  //   if (sin.bet3d && sin.d1 && sin.d2 && sin.d3)
  //     games.push({
  //       d1: '',
  //       d2: sin.d1,
  //       d3: sin.d2,
  //       d4: sin.d3,
  //       game: '3d',
  //       wager: sin.bet3d,
  //       dis: '59%',
  //       net: Number(sin.bet3d) * (41 / 100),
  //     });
  //   if (sin.bet2d && sin.d2 && sin.d3 && sin.d4)
  //     games.push({
  //       d1: '',
  //       d2: '',
  //       d3: sin.d3,
  //       d4: sin.d4,
  //       game: '2d',
  //       wager: sin.bet2d,
  //       dis: '29%',
  //       net: Number(sin.bet2d) * (71 / 100),
  //     });
  //   if (sin.bet2d && sin.d1 && sin.d2 && sin.d3)
  //     games.push({
  //       d1: '',
  //       d2: '',
  //       d3: sin.d2,
  //       d4: sin.d3,
  //       game: '2d',
  //       wager: sin.bet2d,
  //       dis: '29%',
  //       net: Number(sin.bet2d) * (71 / 100),
  //     });
  // }
  // if (
  //   (sin.d1 && sin.d2) ||
  //   (sin.d1 && sin.d3) ||
  //   (sin.d1 && sin.d4) ||
  //   (sin.d2 && sin.d3) ||
  //   (sin.d2 && sin.d4) ||
  //   (sin.d3 && sin.d4)
  // ) {
  //   games.push({
  //     game: '2d',
  //     wager: sin.bet2d,
  //     dis: '29%',
  //     net: Number(sin.bet2d) * (71 / 100),
  //   });
  // }

  // return games.map((game) => ({
  //   d1: sin.d1,
  //   d2: sin.d2,
  //   d3: sin.d3,
  //   d4: sin.d4,
  //   game: game.game,
  //   wager: game.wager,
  //   dis: game.dis,
  //   net: game.net,
  // }));
  // });
  // const transformedForm4d = sin4dSet.flatMap((obj) => {
  //   const games = [];

  //   // if (obj.d1 && obj.d2 && obj.d3 && obj.d4) {
  //   if (obj.bet4d && obj.d1 && obj.d2 && obj.d3 && obj.d4)
  //     games.push({
  //       d1: obj.d1,
  //       d2: obj.d2,
  //       d3: obj.d3,
  //       d4: obj.d4,
  //       game: '4d',
  //       wager: obj.bet4d,
  //       dis: '66%',
  //       net: Number(obj.bet4d) * (34 / 100),
  //     });
  //   if (obj.bet3d && obj.d2 && obj.d3 && obj.d4)
  //     games.push({
  //       d1: '',
  //       d2: obj.d2,
  //       d3: obj.d3,
  //       d4: obj.d4,
  //       games: '3d',
  //       wager: obj.bet3d,
  //       dis: '59%',
  //       net: Number(obj.bet3d) * (41 / 100),
  //     });
  //   if (obj.bet2d && obj.d3 && obj.d4)
  //     games.push({
  //       d1: '',
  //       d2: '',
  //       d3: obj.d3,
  //       d4: obj.d4,
  //       games: '2d',
  //       wager: obj.bet2d,
  //       dis: '29%',
  //       net: Number(obj.bet3d) * (71 / 100),
  //     });
  //   // }
  //   if ((obj.d2 && obj.d3 && obj.d4) || (obj.d1 && obj.d2 && obj.d3)) {
  //     if (obj.bet3d && obj.d2 && obj.d3 && obj.d4)
  //       games.push({
  //         d1: '',
  //         d2: obj.d2,
  //         d3: obj.d3,
  //         d4: obj.d4,
  //         game: '3d',
  //         wager: obj.bet3d,
  //         dis: '59%',
  //         net: Number(obj.bet3d) * (41 / 100),
  //       });
  //     if (obj.bet3d && obj.d1 && obj.d2 && obj.d3)
  //       games.push({
  //         d1: '',
  //         d2: obj.d1,
  //         d3: obj.d2,
  //         d4: obj.d3,
  //         game: '3d',
  //         wager: obj.bet3d,
  //         dis: '59%',
  //         net: Number(obj.bet3d) * (41 / 100),
  //       });
  //     if (obj.bet2d && obj.d2 && obj.d3 && obj.d4)
  //       games.push({
  //         d1: '',
  //         d2: '',
  //         d3: obj.d3,
  //         d4: obj.d4,
  //         game: '2d',
  //         wager: obj.bet2d,
  //         dis: '29%',
  //         net: Number(obj.bet2d) * (71 / 100),
  //       });
  //     if (obj.bet2d && obj.d1 && obj.d2 && obj.d3)
  //       games.push({
  //         d1: '',
  //         d2: '',
  //         d3: obj.d2,
  //         d4: obj.d3,
  //         game: '2d',
  //         wager: obj.bet2d,
  //         dis: '29%',
  //         net: Number(obj.bet2d) * (71 / 100),
  //       });
  //   }
  //   if (
  //     (obj.d1 && obj.d2) ||
  //     (obj.d1 && obj.d3) ||
  //     (obj.d1 && obj.d4) ||
  //     (obj.d2 && obj.d3) ||
  //     (obj.d2 && obj.d4) ||
  //     (obj.d3 && obj.d4)
  //   ) {
  //     games.push({
  //       game: '2d',
  //       wager: obj.bet2d,
  //       dis: '29%',
  //       net: Number(obj.bet2d) * (71 / 100),
  //     });
  //   }

  //   return games.map((game) => ({
  //     d1: obj.d1,
  //     d2: obj.d2,
  //     d3: obj.d3,
  //     d4: obj.d4,
  //     game: game.game,
  //     wager: game.wager,
  //     dis: game.dis,
  //     net: game.net,
  //   }));
  // });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'sin4ds',
  });
  const handleAddColumn = () => {
    append(form4d);
  };
  const defaultFilterFns = {
    fuzzy: () => true,
    contains: () => true,
  };
  // const handleInputChange = (field: string, value: string, i: number) => {
  //   if (value.length === 1) {
  //     const fields: Array<keyof (typeof watchAllInputs.sin4ds)[0]> = [
  //       'd1',
  //       'd2',
  //       'd3',
  //       'd4',
  //       'wager',
  //     ];
  //     const currentIndex = fields.indexOf(
  //       field as keyof (typeof watchAllInputs.sin4ds)[0]
  //     );
  //     const nextField = fields[currentIndex + 1];
  //     if (nextField) {
  //       setFocus(`sin4ds.${i}.${nextField}`);
  //     }
  //   }
  // };

  const { togelColumns } = useTogel(
    register,
    control,
    watch,
    setFocus,
    getValues,
    setValue,
    remove
  );

  const onSubmit = async (data: any) => {
    // const newData = JSON.parse(JSON.stringify(getValues()));
    // const filteredData = {
    //   ...data,
    //   sin4ds: data.sin4ds.filter((item: Sin4dSchema) => item.game !== ' '),
    // };
    // const res = await createTogel(filteredData);
    // if (res.status === 'success' && res.data) {
    //   // setTogel([res.data]);
    //   console.log(res.data);
    //   setShowSuccessMessage(true);
    // } else if (res.status === 'error') {
    //   handleFormServerErrors(res, setError);
    // }

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
    data: sin4ds,
    columns: togelColumns,
    getCoreRowModel: getCoreRowModel(),
    filterFns: defaultFilterFns,
  });
  render++;
  return (
    <div>
      <div>{params.slug}</div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <Button
            disabled={!isValid}
            size='sm'
            variant='primary'
            className='px-3 py-.5'
          >
            Submit
          </Button>
        </div>
        {/* <pre>{JSON.stringify({ games }, null, 2)}</pre>
        <pre>{JSON.stringify({ sin4dSetData }, null, 2)}</pre>
        <pre>{JSON.stringify({ sin4ds }, null, 2)}</pre> */}
      </form>
    </div>
  );
};

export default TogelTable4dSetConfirm;
