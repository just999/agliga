'use client';

import { InputCustom } from '@/components/shadcn/ui';
import { cn, oldStandardTT } from '@/lib/utils';
import { Sin4dSchema } from '@/schemas/togel-schema';
import { ColumnDef } from '@tanstack/react-table';
import {
  Control,
  FieldArrayWithId,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form';

// export type TogelTableColumnsProps = {
//   d1: string | null;
//   d2: string | null;
//   d3: string | null;
//   d4: string | null;
//   game: string;
//   wager: string;
//   dis: string;
//   net: string;
// };

export const createTogelTableColumns = (
  control: Control<FieldValues> | any,
  register: UseFormRegister<FieldValues> | any,
  errors: FieldErrors,
  isDirty: boolean,
  fields: FieldArrayWithId<Sin4dSchema[]>[]
): ColumnDef<Sin4dSchema>[] => [
  {
    accessorKey: 'index',
    header: () => <div className='text-slate-700 font-semibold'>No.</div>,
    cell: ({ row }) => (
      <div className='flex flex-row justify-center p-0'>
        <span className={cn('p-0 m-0 text-white')}>{row.index + 1}.</span>
      </div>
    ),
  },
  {
    id: 'number',
    header: ({ column }) => (
      <div className='font-semibold'>Number 4d/3d/2d</div>
    ),
    cell: ({ row }) => (
      <div className='flex justify-around w-40'>
        {['d1', 'd2', 'd3', 'd4'].map((key) => (
          <div key={key}>
            <InputCustom
              {...register(`${row.index}.${key}`, {
                validate: (value: string) =>
                  value === '' || value.length <= 1 || 'Only one digit allowed',
              })}
              type='text'
              // value={row.original[key as keyof TogelTableColumnsProps] || ''}
              className={cn(
                'p-1 h-7 w-9 text-base  rounded-lg mx-auto text-center font-extrabold text-shadow shadow-inner',
                oldStandardTT.className
              )}
              isInvalid={!!errors[`${row.index}.${key}`] && isDirty}
              errorMessage={
                (errors[`${row.index}.${key}`]?.message as string) && isDirty
              }
            />
            {/* <pre>{JSON.stringify(`${row.index}.${key}`, null, 2)}</pre> */}
          </div>
        ))}
      </div>
    ),
  },
  {
    accessorKey: 'game',
    header: ({}) => <div className='text-zinc-700 font-semibold'>Game</div>,
    cell: ({ row }) => (
      <div>
        <InputCustom
          // disabled
          type='text'
          {...register(`${row.index}.game`, {
            // onchange: (e: any) => console.log(e.target.value),
          })}
          // value={row.original.game || ''}
          className='w-full h-8 p-1 border rounded'
          isInvalid={!!errors[`${row.index}.game`] && isDirty}
          errorMessage={(errors?.game?.message as string) && isDirty}
        />
        {/* {row.index} */}
      </div>
    ),
  },
  {
    accessorKey: 'wager',
    header: () => (
      <div className='text-[12px] w-28 text-zinc-700'>Bet min(500)</div>
    ),
    cell: ({ row }) => (
      <div className='w-28'>
        <InputCustom
          {...register(`${row.index}.wager`)}
          type='text'
          className='w-28 p-.5 px-1 mx-.5 h-7 border rounded'
          // style={{ width: '120px' }}
          isInvalid={!!errors[`${row.index}.wager`] && isDirty}
          errorMessage={
            (errors[`${row.index}.wager`]?.message as string) && isDirty
          }
        />
      </div>
    ),
    footer: (props) => (
      <div className='text-nowrap text-xs text-left  bg-sky-600 text-white px-2 py-1 rounded-md'>
        Sum of Wager{' '}
      </div>
    ),
  },
  {
    accessorKey: 'dis',
    header: () => <div className='text-[12px] text-gray-700'>Dis(%)</div>,
    cell: ({ row }) => (
      <div className='w-full'>
        <InputCustom
          {...register(`${row.index}.dis`)}
          // disabled
          isDirty={isDirty}
          type='text'
          className='w-full p-.5 h-7 mx-.5 border rounded'
          isInvalid={!!errors[`${row.index}.dis`] && isDirty}
          errorMessage={(errors?.dis?.message as string) && isDirty}
        />
      </div>
      // <pre>{JSON.stringify(`rows.${row.index}.dis`, null, 2)}</pre>
    ),
    footer: (props) => (
      <div className='text-nowrap text-xs text-left w-full bg-sky-600 text-white px-2 py-1 rounded-md'>
        Sum of Dis{' '}
      </div>
    ),
  },

  {
    accessorKey: 'net',
    header: () => <div className='text-[12px] w-28 text-gray-700'>Net</div>,
    cell: ({ row }) => (
      <div className='w-full'>
        <InputCustom
          {...register(`${row.index}.net`)}
          // disabled
          type='text'
          className='w-full p-.5 h-7 mx-.5 border rounded'
          isInvalid={!!errors[`${row.index}.net`] && isDirty}
          errorMessage={(errors?.nets?.message as string) && isDirty}
        />
      </div>
    ),
    footer: (props) => (
      <div className='text-nowrap text-xs text-left w-full bg-sky-600 text-white px-2 py-1 rounded-md'>
        Sum of Net{' '}
      </div>
    ),
  },
];
