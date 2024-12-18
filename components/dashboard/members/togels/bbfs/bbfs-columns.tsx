'use client';

import { cn, oldStandardTT, poppins, rp } from '@/lib/utils';
import {
  BbSin4dSchema,
  BbTab4dSchema,
  BbTabSchema,
  BseoOnlySchema,
  QuickTab4dSchema,
} from '@/schemas/togel-schema';
import { Percent, Trash2Icon } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import {
  Control,
  FieldArrayWithId,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetFocus,
  UseFormWatch,
  useWatch,
} from 'react-hook-form';
import { FaRupiahSign } from 'react-icons/fa6';

type BbfsColumnsProps = {};

interface DisValue {
  betType: string;
  value: number;
}

export const useBbfsColumns = (
  register: UseFormRegister<BbTabSchema | any>,
  control: Control<BbTabSchema | any>,
  watch: UseFormWatch<BbTabSchema | any>,
  setFocus: UseFormSetFocus<BbTabSchema>,
  getValues: UseFormGetValues<BbTabSchema> | any,
  setValue: UseFormGetValues<BbTabSchema> | any,
  remove: (i: number) => void,
  fields: FieldArrayWithId<BbTab4dSchema> | any,
  bbData?: BbSin4dSchema[],
  bbfsTableData?: BbTab4dSchema[],
  data?: string[],
  q2dTableData?: QuickTab4dSchema[],
  q2dData?: BseoOnlySchema,
  handleInputChange?: (field: any, value: any, i: number) => void
) => {
  const re2 = data?.filter(
    (dat: string) => Object.entries(dat).length === 2
  ).length;
  const re3 = data?.filter(
    (dat: string) => Object.entries(dat).length === 3
  ).length;
  const re4 = data?.filter(
    (dat: string) => Object.entries(dat).length === 4
  ).length;
  // const disVal: DisValue[] = bbData?.reduce((acc: DisValue[], b, i) => {
  //   if (b.bet4d || b.bet3d || b.bet2d) {
  //     if (re4) {
  //       const tempVal4 = Number(b.bet4d) * re4 * 0.41;
  //       acc.push({ betType: '4d', value: tempVal4 });
  //     }
  //     if (re3) {
  //       const tempVal3 = Number(b.bet3d) * re3 * 0.39;
  //       acc.push({ betType: '3d', value: tempVal3 });
  //     }
  //     if (re2) {
  //       const tempVal2 = Number(b.bet2d) * re2 * 0.71;
  //       acc.push({ betType: '2d', value: tempVal2 });
  //     }
  //   }
  //   return acc;
  // }, []);
  const bbfsColumns = useMemo(
    () => [
      {
        accessorKey: 'index',
        header: ({}) => (
          <div className='flex h-full w-7 items-center justify-center font-semibold text-zinc-700'>
            no.
          </div>
        ),
        cell: ({ row }: any) => (
          <div className='flex flex-row justify-center p-0'>
            <span
              className={cn(
                'm-0 p-0 font-semibold text-zinc-300',
                poppins.className
              )}
            >
              {row.index + 1}.
            </span>
          </div>
        ),
      },
      {
        id: 'number',
        header: ({ column }: any) => (
          <div
            className={cn(
              'text-shadow flex h-7 w-32 items-center justify-end pr-3 text-base font-normal [&>*:nth-child(odd)]:bg-orange-50',
              poppins.className
            )}
          >
            <span className='flex h-5 w-7 items-end justify-center rounded-sm border border-stone-100 bg-stone-100 text-xs text-zinc-500 shadow-md'>
              d1
            </span>
            <span className='flex h-5 w-7 items-end justify-center rounded-sm border border-stone-100 bg-stone-100 text-xs text-zinc-500 shadow-md'>
              d2
            </span>
            <span className='flex h-5 w-7 items-end justify-center rounded-sm border border-stone-100 bg-stone-100 text-xs text-zinc-500 shadow-md'>
              d3
            </span>
            <span className='flex h-5 w-7 items-end justify-center rounded-sm border border-stone-100 bg-stone-100 text-xs text-zinc-500 shadow-md'>
              d4
            </span>
          </div>
        ),
        cell: ({ row }: any) => (
          <div className='flex w-full justify-center px-0 font-semibold text-zinc-700'>
            <div className='w-32'>
              <div
                className={cn(
                  'text-shadow flex h-7 w-32 items-center justify-end pr-3 text-base font-extrabold [&>*:nth-child(odd)]:bg-orange-50/50',
                  oldStandardTT.className
                )}
              >
                <span className='flex h-7 w-7 items-center justify-center rounded-md border border-input bg-background'>
                  {row.original.d1}
                </span>
                <span className='flex h-7 w-7 items-center justify-center rounded-md border border-input bg-background'>
                  {row.original.d2}
                </span>
                <span className='flex h-7 w-7 items-center justify-center rounded-md border border-input bg-background'>
                  {row.original.d3}
                </span>
                <span className='flex h-7 w-7 items-center justify-center rounded-md border border-input bg-background'>
                  {row.original.d4}
                </span>
                {/* <pre>{JSON.stringify(row.original, null, 2)}</pre> */}
              </div>
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'game',
        header: ({}) => <div className='font-semibold text-zinc-700'>game</div>,
        cell: ({ row }: any) => (
          <div
            className={cn(
              'text-shadow flex h-7 w-full items-center justify-center rounded-lg border-2 border-emerald-600 bg-emerald-400/40 text-center text-xs font-semibold text-green-700',
              poppins.className
            )}
          >
            <div className='px-1 text-xs text-emerald-800'>
              {row.original.game}
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'wager',
        header: () => (
          <div className={cn('font-semibold text-zinc-700')}>bet</div>
        ),
        cell: ({ row }: any) => (
          <div
            className={cn(
              'h-7 w-full rounded-md border border-zinc-400 px-0 font-semibold text-zinc-700',
              poppins.className
            )}
          >
            {/* <pre>{JSON.stringify(newBBwagerValue[0].bet2d, null, 2)}</pre> */}
            {/* {bbData?.map((b: any, i: number) =>
              b.bet4d || b.bet3d || b.bet2d ? (
                <div
                  key={i}
                  className='flex gap-2 items-center bg-stone-300/40 h-7 text-center shadow-inner rounded-md '>
                  <FaRupiahSign size={10} className='text-zinc-400 ml-1 ' />
                  <span
                    className={cn(
                      'text-left px-0 text-gray-500 tracking-wider text-xs',
                      poppins.className
                    )}>
                    {Object.entries(row.original).length === 4 ? (
                      <div>{b.bet4d}</div>
                    ) : Object.entries(row.original).length === 3 ? (
                      <div>{b.bet3d}</div>
                    ) : (
                      <div>{b.bet2d}</div>
                    )}
                    {row.original.wager}
                  </span>
                  <pre>{JSON.stringify(row.original.wager, null, 2)}</pre>
                </div>
              ) : (
                ''
              )
            )} */}
            {/* <pre>{bbData && JSON.stringify(bbData[0].bbNumber, null, 2)}</pre> */}

            <div
              className={cn(
                'flex h-7 items-center gap-1 rounded-md bg-stone-300/40 text-center shadow-inner',
                poppins.className
              )}
            >
              <FaRupiahSign size={10} className='ml-1 text-zinc-400' />
              <span
                className={cn(
                  'px-0 text-left text-xs tracking-wider text-gray-500',
                  poppins.className
                )}
              >
                {rp.format(row.original.wager)}
              </span>
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'dis',
        header: () => (
          <div className='w-28 font-semibold text-zinc-700'>dis(%)</div>
        ),
        cell: ({ row }: any) => {
          return (
            <div
              className={cn(
                'flex h-7 w-28 items-center justify-between gap-x-0.5 rounded-md border border-amber-500 bg-amber-200/40 text-center text-xs font-semibold text-zinc-700 shadow-inner',
                poppins.className
              )}
            >
              <span className='flex items-center text-zinc-400'>
                <FaRupiahSign size={10} className='mx-1 text-zinc-400' />
                {rp.format(row.original.dis)}
              </span>
              <div className='flex items-center pr-1 text-[10px] text-teal-600'>
                {row.original.game === '4d' ? (
                  <>
                    (66
                    <Percent size={10} className='svg' />)
                  </>
                ) : row.original.game === '3d' ? (
                  <>
                    (59
                    <Percent size={10} className='svg' />)
                  </>
                ) : (
                  <>
                    (29
                    <Percent size={10} className='svg' />)
                  </>
                )}
                {/* <pre>{JSON.stringify(row.original.dis, null, 2)}</pre> */}
              </div>
            </div>
          );
        },
        footer: () => (
          <div
            className={cn(
              'mx-auto w-28 pt-2 text-center text-xs font-semibold',
              Number(re2) + Number(re3) + Number(re4) === 0 ? 'hidden' : ''
            )}
          >
            total{' '}
          </div>
        ),
      },

      {
        accessorKey: 'net',
        header: () => (
          <div className='flex h-full w-28 items-center justify-center font-semibold text-zinc-700'>
            net
          </div>
        ),
        cell: ({ row }: any) => {
          return (
            <div className='h-7 w-28 rounded-md border border-zinc-400 px-0 font-semibold text-zinc-700'>
              <div
                className={cn(
                  'flex h-7 items-center gap-1 rounded-md bg-zinc-300/40 text-center shadow-inner',
                  poppins.className
                )}
              >
                <FaRupiahSign size={10} className='ml-1 text-zinc-400' />
                <span
                  className={cn(
                    'px-0 text-left text-xs tracking-wider text-gray-500',
                    poppins.className
                  )}
                >
                  {rp.format(row.original.net)}
                </span>
              </div>
            </div>
          );
        },
        footer: (info: any) => {
          const total = info.table
            .getFilteredRowModel()
            .rows.reduce((sum: any, row: any) => {
              const net = Number(row.original.net);
              return sum + (isNaN(net) ? 0 : net);
            }, 0);
          return (
            <div className='flex justify-center py-2'>
              <div
                className={cn(
                  'flex h-7 w-28 items-center gap-1 rounded-md border border-slate-400 bg-gray-500 text-center text-xs font-semibold shadow-inner',
                  Number(re2) + Number(re3) + Number(re4) === 0 ? 'hidden' : ''
                )}
              >
                <FaRupiahSign
                  size={10}
                  className={cn(
                    'svg ml-1 text-zinc-300',
                    Number(re2) + Number(re3) + Number(re4) === 0
                      ? 'hidden'
                      : ''
                  )}
                />
                {/* {bbData?.map((bb, i) => (
                <div
                  key={i}
                  className='text-center text-xs text-white text-shadow'>
                  {bb.bet2d &&
                    (
                      Number(re2) * Number(bb.bet2d) * (71 / 100) +
                      Number(re3) * Number(bb.bet3d) * (41 / 100) +
                      Number(re4) * Number(bb.bet4d) * (34 / 100)
                    ).toFixed()}
                </div>
              ))} */}
                <span className='text-shadow text-white'>
                  {rp.format(total.toFixed())}
                  {/* <pre>{JSON.stringify(row.original, null, 2)}</pre> */}
                </span>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: 'action',
        header: () => <span></span>,
        cell: ({ row }: any) => (
          <div className='w-full'>
            {fields.length > 1 && (
              <Trash2Icon
                size={20}
                onClick={() => remove(row.index)}
                className='svg hover:svg mx-auto cursor-pointer pl-1 text-rose-600 duration-300 hover:-translate-y-1 hover:scale-150'
              />
            )}
          </div>
        ),
      },
    ],
    [re2, re3, re4, remove, fields]
  );

  return {
    bbfsColumns,
  };
};
