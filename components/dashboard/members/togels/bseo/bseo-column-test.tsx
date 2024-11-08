import { cn, oldStandardTT, poppins } from '@/lib/utils';
import { Bseo4dSchema, BseoArraySchema } from '@/schemas/togel-schema';
import { ColumnDef } from '@tanstack/react-table';
import { Percent, Trash2Icon } from 'lucide-react';
import { FaRupiahSign } from 'react-icons/fa6';

export const useBsColumns = (
  data: BseoArraySchema,
  gameData?: Bseo4dSchema
) => {
  const dynamicColumns = ['d1', 'd2', 'd3', 'd4'].map((key, index) => ({
    accessorKey: key,
    header: () => (
      <div className='w-8 p-0 m-0 text-zinc-700 font-semibold'>{key}</div>
    ),
    size: 32,
    enableResizing: false,
    cell: ({ row }: any) => (
      <div className='w-8 h-7 flex flex-row items-center justify-center p-0 border border-orange-200 rounded-lg'>
        <span
          className={cn(
            'p-0 m-0 flex justify-center text-sm items-center text-zinc-700 font-semibold w-8 text-center',
            oldStandardTT.className
          )}>
          {row.original[key]}
        </span>
      </div>
    ),
  }));

  const columns: ColumnDef<BseoArraySchema>[] = [
    {
      accessorKey: 'index',
      header: () => <div className='w-8 text-zinc-700 font-semibold'>No.</div>,
      size: 32,
      enableResizing: false,
      cell: ({ row }: any) => (
        <div className='w-8 flex flex-row justify-center p-0'>
          <span
            className={cn('p-0 m-0 text-zinc-400 text-xs', poppins.className)}>
            {row.index + 1}.
          </span>
        </div>
      ),
    },
    ...dynamicColumns,
    {
      accessorKey: 'game',
      header: () => <div className='w-12 text-center'>game</div>,
      size: 48,
      enableResizing: false,
      cell: ({ row }) => (
        <div
          className={cn(
            'w-12 h-7 text-xs text-center border border-sky-200 rounded-lg flex justify-center items-center',
            poppins.className
          )}>
          {row.original.game}
          {/* <pre>{JSON.stringify(row.original, null, 2)}</pre> */}
        </div>
      ),
    },
    {
      accessorKey: 'wager',
      header: () => (
        <span className='w-20 text-center flex items-center justify-center'>
          Bet
        </span>
      ),
      size: 80,
      enableResizing: false,
      cell: ({ row }: any) => (
        <div
          className={cn(
            'w-20 h-7 flex items-center gap-1  text-center font-semibold text-xs border border-slate-400 text-zinc-500 rounded',
            poppins.className
          )}>
          <FaRupiahSign size={12} className='text-zinc-400 ml-1 ' />
          {row.original.wager}
        </div>
      ),
    },
    {
      accessorKey: 'dis',
      header: () => (
        <div className='p-0 m-0 w-20 mx-auto flex justify-center items-center'>
          dis(29
          <Percent size={12} />)
        </div>
      ),
      size: 80,
      cell: ({ row }: any) => {
        const wager = Number(row.original.wager);

        const discount =
          isNaN(wager) || wager === 0 ? '' : (wager * 0.29).toFixed();
        return (
          <div className='relative flex justify-center'>
            <div
              className={cn(
                'w-20 h-7 flex items-center gap-2  text-center font-semibold text-xs border border-slate-400 text-zinc-500 rounded',
                poppins.className
              )}>
              <FaRupiahSign size={12} className='text-zinc-300  ml-1' />
              {/* {row.original.wager === ''
              ? ''
              : (Number(row.original.wager) * (5 / 100)).toFixed()} */}
              {discount}
            </div>
          </div>
        );
      },
      footer: () => (
        <div className='text-xs w-full font-semibold mx-auto text-center'>
          Total{' '}
        </div>
      ),
    },
    {
      accessorKey: 'net',
      header: () => <div className='w-20'>Net</div>,
      size: 80,
      cell: ({ row }: any) => (
        <span className='flex w-20 justify-center items-center '>
          <div
            className={cn(
              'w-20 h-7 flex items-center gap-1  text-center font-semibold text-xs border border-slate-200 text-zinc-500 rounded',
              poppins.className
            )}>
            <FaRupiahSign size={12} className='text-zinc-400 ml-1 ' />
            {row.original.net}
          </div>
        </span>
      ),
      footer: (info: any) => {
        const total = info.table
          .getFilteredRowModel()
          .rows.reduce(
            (sum: number, row: any) => sum + Number(row.original.net),
            0
          );
        return (
          <div className='flex justify-center '>
            <div
              className={cn(
                'w-20 h-7 flex items-center bg-gray-500 gap-1 shadow-inner text-center font-semibold text-xs border border-slate-400 rounded',
                poppins.className
              )}>
              <FaRupiahSign size={12} className='text-zinc-400 ml-1 svg' />
              <span className='text-white text-shadow'>
                {total.toFixed().toString()}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'action',
      header: () => <div className='text-center w-12 p-0 m-0'>Action</div>,
      size: 48,
      cell: ({ row }: any) =>
        row.index > 0 && (
          <div className='flex justify-center w-12'>
            <Trash2Icon
              size={20}
              // onClick={() => remove(row.index)}
              className='svg  text-rose-600 hover:-translate-y-1  hover:scale-150 hover:svg duration-300  cursor-pointer pl-1'
            />
          </div>
        ),
    },
  ];

  return {
    columns,
  };
};
