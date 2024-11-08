'use client';

import { cn, oldStandardTT, poppins } from '@/lib/utils';
import { BbSin4dSchema, BbTabSchema } from '@/schemas/togel-schema';
import { Percent, Trash2Icon } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import {
  Control,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetFocus,
  UseFormWatch,
  useWatch,
} from 'react-hook-form';
import { FaRupiahSign } from 'react-icons/fa6';

type BbfsColumnsProps = {};

export const useBBTogelColumns = (
  register: UseFormRegister<BbTabSchema | any>,
  control: Control<BbTabSchema | any>,
  watch: UseFormWatch<BbTabSchema | any>,
  setFocus: UseFormSetFocus<BbTabSchema>,
  getValues: UseFormGetValues<BbTabSchema> | any,
  setValue: UseFormGetValues<BbTabSchema> | any,
  bbData?: BbSin4dSchema[],
  data?: string[],
  remove?: (i: number) => void,
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
  const newWagerValue = useWatch({
    control,
    name: 'bbfs',
    defaultValue: [],
  });
  useEffect(() => {
    if (newWagerValue) setValue('wager', newWagerValue.wager);
  }, [newWagerValue, setValue]);

  const BbColumns = useMemo(
    () => [
      {
        accessorKey: 'index',

        header: ({}) => <div>No.</div>,
        cell: ({ row }: any) => (
          <div className='flex flex-row justify-center p-0'>
            <span
              className={cn(
                'p-0 m-0 text-zinc-400 font-semibold',
                poppins.className
              )}>
              {row.index + 1}.
            </span>
          </div>
        ),
      },
      {
        id: 'number',
        header: ({ column }: any) => (
          <div className='text-zinc-700 font-semibold w-32'>
            Number 4d/3d/2d
          </div>
        ),
        cell: ({ row }: any) => (
          <div className='text-zinc-700 px-2 font-semibold flex justify-center w-full'>
            <div className='w-32'>
              <div
                className={cn(
                  'h-7 text-base border rounded-lg px-5 w-32 text-right font-extrabold text-shadow tracking-[10px] shadow-inner [&>*:nth-child(odd)]:bg-orange-100',
                  oldStandardTT.className
                )}
                style={{ width: '100%', textAlign: 'right' }}>
                {row.original}
              </div>
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'game',
        header: ({}) => (
          <div className='text-zinc-700 font-semibold '>Game</div>
        ),
        cell: ({ row }: any) => (
          <div
            className={cn(
              'text-zinc-700 font-semibold text-xs w-full bg-emerald-400/40 text-center rounded-md',
              poppins.className
            )}>
            {Object.entries(row.original).length === 4
              ? '4d'
              : Object.entries(row.original).length === 3
              ? '3d'
              : '2d'}{' '}
          </div>
        ),
      },
      {
        accessorKey: 'wager',
        header: () => (
          <div className={cn('text-zinc-700 font-semibold')}>bet</div>
        ),
        cell: ({ row }: any) => (
          <div className='text-zinc-700 px-2 font-semibold w-full'>
            {/* <pre>{JSON.stringify(newBBwagerValue[0].bet2d, null, 2)}</pre> */}
            {bbData?.map((b: any, i: number) =>
              b.bet4d || b.bet3d || b.bet2d ? (
                <div
                  key={i}
                  className='flex items-center bg-zinc-300/40 text-center shadow-inner rounded-md '>
                  <FaRupiahSign
                    size={10}
                    className='text-sky-400 ml-2  align-middle'
                  />
                  <span
                    className={cn(
                      'text-left px-2 text-gray-500 tracking-wider text-xs',
                      poppins.className
                    )}>
                    {Object.entries(row.original).length === 4 ? (
                      <div>{b.bet4d}</div>
                    ) : Object.entries(row.original).length === 3 ? (
                      <div>{b.bet3d}</div>
                    ) : (
                      <div>{b.bet2d}</div>
                    )}
                  </span>
                </div>
              ) : (
                ''
              )
            )}
            {/* <pre>{bbData && JSON.stringify(bbData[0].bbNumber, null, 2)}</pre> */}
          </div>
        ),
      },
      {
        accessorKey: 'dis',
        header: () => (
          <div className='text-zinc-700 font-semibold '>dis(%)</div>
        ),
        cell: ({ row }: any) => {
          const wager = Number(row.original.bet3d);
          const discount4d =
            isNaN(wager) || wager === 0 ? '' : (wager * 0.34).toFixed();
          const discount3d =
            isNaN(wager) || wager === 0 ? '' : (wager * 0.41).toFixed();
          return (
            <span
              className={cn(
                'text-zinc-700 text-xs shadow-inner font-semibold w-full bg-emerald-400/40 text-center rounded-md',
                poppins.className
              )}>
              {Object.entries(row.original).length === 4 ? (
                <div className='border rounded-md shadow-inner flex '>
                  {discount4d}(66
                  <Percent size={10} />)
                </div>
              ) : Object.entries(row.original).length === 3 ? (
                <div className='border rounded-md shadow-inner flex text-xs items-center'>
                  {discount3d}(59
                  <Percent size={10} />)
                </div>
              ) : (
                <div className='border rounded-md shadow-inner '>29%</div>
              )}
            </span>
          );

          // <pre>{JSON.stringify(`rows.${row.index}.dis`, null, 2)}</pre>
        },
        footer: () => (
          <div
            className={cn(
              'text-xs  font-semibold mx-auto text-center pt-2',
              Number(re2) + Number(re3) + Number(re4) === 0 ? 'hidden' : ''
            )}>
            Total{' '}
          </div>
        ),
      },

      {
        accessorKey: 'net',
        header: () => (
          <div className={cn('text-zinc-700 font-semibold')}>Net</div>
        ),
        cell: ({ row }: any) => (
          <div className='text-zinc-700  font-semibold w-full  '>
            {bbData?.map((b: any, i: number) =>
              b.bet4d || b.bet3d || b.bet2d ? (
                <div
                  key={i}
                  className='w-28 h-7 flex items-center gap-2  text-center font-semibold text-xs border border-slate-400 text-zinc-500 rounded'>
                  <FaRupiahSign
                    size={10}
                    className='text-sky-400 ml-1  align-middle'
                  />
                  <span
                    className={cn(
                      'text-left px-2 text-zinc-500 font-semibold tracking-wider text-xs',
                      poppins.className
                    )}>
                    {Object.entries(row.original).length === 4 ? (
                      <div>{(Number(b.bet4d) * (34 / 100)).toFixed()}</div>
                    ) : Object.entries(row.original).length === 3 ? (
                      <div>{(Number(b.bet3d) * (41 / 100)).toFixed()}</div>
                    ) : (
                      <div>{(Number(b.bet2d) * (71 / 100)).toFixed()}</div>
                    )}
                  </span>
                </div>
              ) : (
                ''
              )
            )}
          </div>
        ),
        footer: ({ row }: any) => (
          <div
            className={cn(
              'w-28 h-7 flex items-center bg-gray-500 gap-1 shadow-inner text-center font-semibold text-xs border border-slate-400 rounded',
              Number(re2) + Number(re3) + Number(re4) === 0 ? 'hidden' : ''
            )}>
            <FaRupiahSign
              size={10}
              className={cn(
                'text-sky-400 ml-2  align-middle svg',
                Number(re2) + Number(re3) + Number(re4) === 0 ? 'hidden' : ''
              )}
            />
            {bbData?.map((bb, i) => (
              <div
                key={i}
                className='px-2 text-center text-xs text-white text-shadow'>
                {bb.bet2d &&
                  (
                    Number(re2) * Number(bb.bet2d) * (71 / 100) +
                    Number(re3) * Number(bb.bet3d) * (41 / 100) +
                    Number(re4) * Number(bb.bet4d) * (34 / 100)
                  ).toFixed()}
              </div>
            ))}
          </div>
        ),
      },
      {
        accessorKey: 'action',
        cell: ({ row }: any) =>
          row.index > 0 && (
            <div className='w-full '>
              <Trash2Icon
                size={20}
                // onClick={() => remove(row.index)}
                className='svg text-rose-600 hover:-translate-y-1 mx-auto  hover:scale-150 hover:svg duration-300  cursor-pointer pl-1'
              />
            </div>
          ),
      },
    ],
    [bbData, re2, re3, re4]
  );

  return {
    BbColumns,
  };
};
