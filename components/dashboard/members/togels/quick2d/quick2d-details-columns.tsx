import { Spinner } from '@/components/ui';
import { cn, oldStandardTT, poppins, rp } from '@/lib/utils';
import { BseoArraySchema } from '@/schemas/togel-schema';
import { ColumnDef } from '@tanstack/react-table';
import { Percent, Trash2Icon } from 'lucide-react';
import { FieldArrayWithId } from 'react-hook-form';
import { FaRupiahSign } from 'react-icons/fa6';

export const useQuick2dDetailsColumns = (
  // data: QuickTab4dSchema[],
  remove: (i: number) => void,
  fields: FieldArrayWithId<BseoArraySchema> | any
  // gameData?: Bseo4dSchema
) => {
  const dynamicColumns = ['d1', 'd2', 'd3', 'd4'].map((key, index) => ({
    accessorKey: key,
    header: () => (
      <div className='w-8 p-0 m-0 text-zinc-700 font-semibold'>{key}</div>
    ),
    size: 32,
    enableResizing: false,
    cell: ({ row }: any) => (
      <div className='w-8 h-7 flex flex-row items-center justify-center p-0 border border-orange-200 rounded-md'>
        <span
          className={cn(
            'p-0 m-0 flex justify-center text-base items-center text-zinc-700 font-extrabold w-8 text-center',
            oldStandardTT.className
          )}>
          {row.original[key]}
        </span>
      </div>
    ),
  }));

  const isLoading = false;
  const columns: ColumnDef<BseoArraySchema>[] = [
    {
      accessorKey: 'index',
      header: () => <div className='w-5 text-zinc-700 font-semibold'>no.</div>,
      size: 20,
      enableResizing: false,
      cell: ({ row }: any) => (
        <div className='w-5 flex flex-row justify-center p-0'>
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
      header: () => (
        <div className='w-9 text-zinc-700 font-semibold '>game</div>
      ),
      size: 36,
      cell: ({ row }) => (
        <div
          className={cn(
            'text-green-700 h-7 flex items-center justify-center border-2 border-emerald-600 font-semibold text-xs w-full bg-emerald-400/40 text-center rounded-lg text-shadow',
            poppins.className
          )}>
          <div className='text-emerald-800 text-xs px-1'>
            {row.original.game}
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'wager',
      header: () => (
        <span className='w-28 text-center flex items-center justify-center'>
          bet
        </span>
      ),
      size: 112,
      enableResizing: false,
      cell: ({ row }: any) => (
        <div
          className={cn(
            'w-28 h-7 flex items-center bg-stone-300/40  gap-1 text-center font-semibold text-xs border border-slate-400 text-zinc-500 rounded-md',
            poppins.className
          )}>
          <FaRupiahSign size={12} className='text-zinc-400 ml-1 ' />
          {new Intl.NumberFormat('en-ID').format(row.original.wager)}
          <pre>{JSON.stringify(row.original.position, null, 2)}</pre>
        </div>
      ),
    },
    {
      accessorKey: 'dis',
      header: () => (
        <div className='p-0 m-0 w-28 mx-auto flex justify-center items-center'>
          dis(29
          <Percent size={12} />)
        </div>
      ),
      size: 112,
      cell: ({ row }: any) => {
        const wager = Number(row.original.wager);

        const discount =
          isNaN(wager) || wager === 0 ? '' : (wager * 0.29).toFixed();
        return (
          <div
            className={cn(
              'h-7 text-zinc-700 flex items-center justify-between border border-amber-500 gap-x-0.5 text-xs shadow-inner font-semibold w-28 bg-amber-200/40 text-center rounded-md',
              poppins.className
            )}>
            <div
              className={cn(
                'w-28 h-7 flex items-center gap-2  text-center font-semibold text-xs border border-slate-400 text-zinc-500 rounded-md',
                poppins.className
              )}>
              <FaRupiahSign size={12} className='text-zinc-400  ml-1' />
              {/* {row.original.wager === ''
              ? ''
              : (Number(row.original.wager) * (5 / 100)).toFixed()} */}
              {rp.format(Number(discount))}
              {/* <pre>{JSON.stringify(typeof discount, null, 2)}</pre> */}
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
      header: () => <div className='w-28'>Net</div>,
      size: 112,
      cell: ({ row }: any) => (
        <span className='flex w-28 justify-center items-center '>
          <div
            className={cn(
              'w-28 h-7 flex items-center gap-1  text-center font-semibold text-xs border border-slate-400 text-zinc-500 rounded-md bg-zinc-300/40 ',
              poppins.className
            )}>
            <FaRupiahSign size={12} className='text-zinc-400 ml-1 ' />
            <span
              className={cn(
                'text-left px-0 text-gray-500 tracking-wider text-xs',
                poppins.className
              )}>
              {row.original.net === '0'
                ? ''
                : new Intl.NumberFormat('en-ID').format(row.original.net)}
            </span>
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
          <div className='flex justify-center py-2'>
            <div
              className={cn(
                'w-28 h-7 flex items-center bg-gray-500 gap-1 shadow-inner text-center font-semibold text-xs border border-slate-400 rounded-md',
                poppins.className
              )}>
              <FaRupiahSign size={12} className='text-zinc-400 ml-1 svg' />
              <span className='text-white text-shadow'>
                {new Intl.NumberFormat('en-ID').format(total.toFixed())}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'action',
      header: () => <span></span>,
      size: 20,
      enableResizing: false,
      cell: ({ row }: any) => (
        <div className='w-8'>
          {fields.length > 1 && (
            <div className='w-8'>
              <Trash2Icon
                size={20}
                onClick={() => remove(row.index)}
                className={cn(
                  'svg text-rose-600 hover:-translate-y-1 mx-auto  hover:scale-150 hover:svg duration-300  cursor-pointer pl-1',
                  isLoading && 'hidden'
                )}
              />
              {isLoading && <Spinner />}
            </div>
          )}
        </div>
      ),
    },
  ];

  return {
    columns,
  };
};
