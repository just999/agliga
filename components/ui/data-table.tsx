'use client';

import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  SortingFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  sortingFns,
  getSortedRowModel,
} from '@tanstack/react-table';

import {
  RankingInfo,
  rankItem,
  compareItems,
} from '@tanstack/match-sorter-utils';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from '@/components/ui/table';

import { InputCustom } from './inputCustom';
import { Button } from './button';
import React, { useCallback, useEffect, useReducer, useState } from 'react';

import useRunToggleStore from '@/store/use-table-store';
import RunTable from './run-table';
import { cn, orbit } from '@/lib/utils';

import useModal from '@/hooks/use-modal';

import {
  BsArrowDownSquare,
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsChevronLeft,
  BsChevronRight,
} from 'react-icons/bs';
import EuroCard from '../table/euro/euro-card';

import { Euro24 } from '../assets/games/euro24';

import { useSession } from 'next-auth/react';

import { FcParallelTasks } from 'react-icons/fc';
import FixtureTable from '../table/euro/fixture/fixture-table';
import Heading from './heading';
import {
  DepoProps,
  DepoWdProps,
  EuroWithIconProps,
  tabsAdmin,
  WdProps,
} from '@/types';
import { EPL } from '../assets/sports';

import Periods from '../soccer/periods';

import { TbNewSection } from 'react-icons/tb';

import { Fixture } from '@prisma/client';
import { useTabsStore } from '@/store/use-tabs-store';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';

import { banks, games, processDepoWd, statuses } from '@/lib/helper';
import DepoWdDropdownBankSelect from '../table/depo-wd/depo-wd-dropdown-bank-select';
import { DebouncedInput } from './debounce-input';
import Filter from '../table/filter';

declare module '@tanstack/react-table' {
  //add fuzzy filter to the filterFns
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

// Define a custom fuzzy filter function that will apply ranking info to rows (using match-sorter utils)
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

// Define a custom fuzzy sort function that will sort by rank if the row has ranking information
const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0;

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank!,
      rowB.columnFiltersMeta[columnId]?.itemRank!
    );
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

type GroupArrayProps = {
  date: string;
  games: EuroWithIconProps[];
};

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[] | any;
  eu?: Fixture[] | TData[] | (DepoProps[] & WdProps[]) | any;
  searchKey: string;
  className?: string;
  depoWdClassName?: string;
  group?: any;
  round?: string;
  mergedData?: any;
  footerClassName?: string;
  euroClassName?: string;
  euroTableClassName?: string;
  euCardClassName?: string;
  tableCellClassName?: string;
  trashClassName?: string;
  thClassName?: string;
  groupArrays?: GroupArrayProps[];
  period?: string;
}

export function DataTable<TData, TValue>({
  columns,
  eu,
  searchKey,
  className,
  group,
  round,
  footerClassName,
  euroClassName,
  euroTableClassName,
  euCardClassName,
  tableCellClassName,
  trashClassName,
  depoWdClassName,
  thClassName,
  groupArrays,
  period,
}: // mergedData,
DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filtering, setFiltering] = useState('');

  const [isToggle, setIsToggle] = useState(false);
  const [isToggleFixture, setIsToggleFixture] = useState(false);

  const { tabs, tabVal, setTabs, setTabVal } = useTabsStore();
  const [loading, setLoading] = useState(true);

  const rerender = useReducer(() => ({}), {})[1];

  const [globalFilter, setGlobalFilter] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const cachedTabVal = localStorage.getItem('tabVal') || tabsAdmin[0].value;
      setTabs(
        tabsAdmin.map((tab) => ({ ...tab, active: tab.value === cachedTabVal }))
      );
      setTabVal(cachedTabVal);
      setLoading(false);
    }
  }, [setTabs, setTabVal]);

  useEffect(() => {
    if (typeof window !== 'undefined' && tabVal) {
      localStorage.setItem('tabVal', tabVal);
    }
  }, [tabVal]);
  // const { items } = useGetEuros();

  const { data: session } = useSession();

  const role = session?.user.curUser.role;
  const table = useReactTable({
    data: eu as TData[],
    columns,
    filterFns: {
      fuzzy: fuzzyFilter, //define as a filter function that can be used in column definitions
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    globalFilterFn: 'fuzzy',
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    debugTable: false,
    debugHeaders: false,
    debugColumns: false,
    state: {
      // pagination: round
      //   ? { pageSize: 16, pageIndex: 0 }
      //   : { pageSize: 10, pageIndex: 0 },
      globalFilter,
      sorting,
      columnFilters,
    },
  });

  //apply the fuzzy sort if the fullName column is being filtered
  useEffect(() => {
    if (table.getState().columnFilters[0]?.id === 'depoAmount') {
      if (table.getState().sorting[0]?.id !== 'depoAmount') {
        table.setSorting([{ id: 'depoAmount', desc: false }]);
      }
    }
  }, [table]);

  let newPeriod;
  if (period) {
    newPeriod = period?.slice(0, 2) + period.slice(3);
  }
  const newDeleteModalType = `delete-epl${newPeriod}`;
  const newEditModalType = `edit-epl${newPeriod}`;
  const newFixtureModalType = `new-epl${newPeriod}`;
  const { toggle, setIsOpen } = useRunToggleStore();
  const {
    modalType,
    onOpen,
    setGroup,
    isOpen,
    id,
    group: gr,
    period: pr,
  } = useModal();
  const handleOpenGroup = (group?: string) => {
    if (group) {
      onOpen('new-euro');
      setGroup('new-euro', isOpen === false, group);
    } else if (round) {
      const title = 'New Round-16';
      onOpen('new-euro', title);
      setGroup('new-euro', isOpen === false, group, round);
    }
  };

  // if (!items || items.length === 0) return <Skeleton />;

  const handleNewFixture = (week: any) => {
    if (
      week &&
      (newFixtureModalType === 'new-epl2122' ||
        newFixtureModalType === 'new-epl2223' ||
        newFixtureModalType === 'new-epl2324' ||
        newFixtureModalType === 'new-epl2425' ||
        newFixtureModalType === 'new-fixture')
    ) {
      onOpen(newFixtureModalType);
      setGroup(newFixtureModalType, isOpen === false, week, period);
    }
  };

  const year1 = period?.slice(0, 2);
  const year2 = period?.slice(3, 5);

  const handleSelectChange = (searchKey: string, value: string) => {
    table.getColumn(searchKey)?.setFilterValue(value);
  };

  const handleFilterChange = useCallback(
    (value: string | number) => {
      if (typeof value === 'string') setGlobalFilter(value);
    },
    [setGlobalFilter]
  );

  return (
    <div className='rounded-xl mx-auto w-full md:w-full md:mx-auto'>
      <div
        className={cn(
          'flex flex-row items-center py-2 bg-orange-50/60 border border-solid border-orange-100 rounded-lg',
          className
        )}
      >
        {/* {eu && <pre>{JSON.stringify(eu[0]?.category, null, 2)}</pre>} */}
        <InputCustom
          placeholder='Search...'
          // value={filtering}
          value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ''}
          // onChange={(event) => setFiltering(event.target.value)}
          onChange={(e) =>
            table.getColumn(searchKey)?.setFilterValue(e.target.value)
          }
          className='max-w-sm text-stone-700 mx-2 bg-zinc-50'
        />

        {period && (
          <div className='w-full flex flex-row items-center justify-center '>
            <Heading
              title={`English Premier League ${period}`}
              className=' text-zinc-500  w-full  text-lg text-nowrap 2xs:text-[8px] xs:text-xs sm:text-sm 2xl:text-base '
            />
            {session?.user.curUser.role === 'admin' && (
              <div className='flex flex-row justify-start gap-4 w-full '>
                <div className='hidden text-nowrap lg:block'>
                  <Button
                    className='w-full h-6 p-4 flex flex-row hover:shadow-lg hover:text-cyan-500 hover:bg-amber-100'
                    variant='ghost'
                    size='sm'
                    type='button'
                    onClick={() => {
                      const week = table.options.data.map(
                        (we: any) => we?.week
                      )[0];

                      handleNewFixture(week);
                    }}
                  >
                    <TbNewSection size={30} />
                    {/* <pre>
                    {JSON.stringify(table.options.data[0]?.week, null, 2)}
                  </pre> */}
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div
        className={cn(
          'flex flex-row w-full gap-4 md:gap-4 md:w-full lg:gap-4 justify-center'
        )}
      >
        <div>
          <RunTable
            toggle={() => toggle}
            setIsOpen={() => setIsOpen}
            className={cn(className)}
          />
          <div>
            <div className='rounded-md shadow-xl'>
              <Table className='bg-amber-50 border-none overflow-hidden'>
                <TableHeader className='bg-amber-50 '>
                  <TableRow
                    className={cn(
                      'rounded-full h-8 p-0 m-0 border-none',
                      euroTableClassName
                    )}
                  >
                    {round && (!eu[0]?.depoAmount || !eu[0]?.wdAmount) && (
                      <TableHead
                        className={cn(
                          'flex flex-row font-semibold justify-center ml-2 bg-emerald-300 rounded-l-lg  h-8 hover:bg-green-300 hover:font-semibold hover:text-gray-800 shadow-xl text-md text-gray-400 cursor-pointer',
                          group && 'w-full'
                        )}
                      >
                        <Euro24 />
                        <Button
                          variant='ghost'
                          size='sm'
                          className={cn(
                            'p-0 h-7 text-sm',
                            round && 'text-base',
                            role !== 'admin'
                              ? 'text-black font-semibold bg-emerald-300'
                              : 'hover:font-semibold hover:text-gray-800 hover:bg-green-300'
                          )}
                          onClick={() => handleOpenGroup(group)}
                          disabled={role === 'admin' ? false : true}
                        >
                          {group ? `Group ${group}` : `Round ${round}`}
                        </Button>
                      </TableHead>
                    )}
                    {group && (
                      <>
                        <TableHead
                          className={cn(
                            'bg-amber-200  mx-4 font-semibold h-8 hover:bg-cyan-100 hover:backdrop-blur-sm  hover:text-gray-800 hover:font-bold shadow-xl cursor-pointer text-md text-gray-400',
                            group ? 'rounded-none' : 'rounded-r-full'
                          )}
                        >
                          <Button
                            variant='ghost'
                            size='sm'
                            className='px-0 h-7 mx-auto'
                            onClick={() => {
                              if (group) {
                                setGroup('new-euro', isOpen === true, group);
                              }

                              setIsToggle((prev) => !prev);
                            }}
                          >
                            {/* <pre>{JSON.stringify(euroGroup, null, 2)}</pre> */}
                            <BsArrowDownSquare size={18} className='mx-auto ' />
                          </Button>
                        </TableHead>

                        <TableHead
                          className={cn(
                            'bg-amber-100 rounded-r-lg px-4 font-semibold h-8 hover:bg-orange-100/70 hover:text-gray-800 hover:font-bold shadow-xl cursor-pointer text-md text-gray-400',
                            group && 'rounded-r-full'
                          )}
                        >
                          <Button
                            variant='ghost'
                            size='sm'
                            className='px-0 h-7'
                            onClick={() => {
                              const round = '16';
                              const newGroup = undefined;
                              onOpen('new-euro');
                              setGroup(
                                'new-euro',
                                isOpen === false,
                                newGroup,
                                round
                              );

                              setIsToggleFixture((prev) => !prev);
                            }}
                          >
                            {/* <pre>{JSON.stringify(euroGroup, null, 2)}</pre> */}
                            <FcParallelTasks size={18} className='mx-auto ' />
                          </Button>
                        </TableHead>
                      </>
                    )}
                  </TableRow>
                  {!round && !period && !group && (
                    <TableRow className='h-8'>
                      <TableHead className='h-8'></TableHead>
                      <TableHead className='h-8'></TableHead>
                      <TableHead className='h-8 w-full px-2'>
                        <div>
                          {(tabVal === 'depo' || tabVal === 'wd') && (
                            <DebouncedInput
                              value={globalFilter ?? ''}
                              onChange={handleFilterChange}
                              // onChange={(value) => setGlobalFilter(String(value))}
                              className='px-2 h-8 font-2xl text-black border shadow-inner border-block bg-cyan-200'
                              placeholder='Search all columns...'
                            />
                          )}
                        </div>
                      </TableHead>
                      <TableHead className='h-8'></TableHead>
                    </TableRow>
                  )}

                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header, i) => {
                        return (
                          <TableHead
                            key={header.id}
                            className={cn(
                              ' text-xs text-stone-500 h-8  text-center px-2 bg-stone-100 border border-solid border-zinc-200',
                              thClassName,
                              round && 'w-12'
                            )}
                            colSpan={header.colSpan}
                          >
                            {header.isPlaceholder ? null : (
                              <>
                                <div
                                  {...{
                                    className: header.column.getCanSort()
                                      ? 'cursor-pointer select-none'
                                      : '',
                                    onClick:
                                      header.column.getToggleSortingHandler(),
                                  }}
                                  className='flex flex-row gap-2 items-center text-nowrap h-6 px-2 align-middle cursor-pointer'
                                >
                                  {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                                  {/* <pre>
                                    {JSON.stringify(header.column, null, 2)}
                                  </pre> */}
                                  {{
                                    asc: '🔼',
                                    desc: '🔽',
                                  }[header.column.getIsSorted() as string] ??
                                    null}
                                </div>
                                {header.column.id === 'bank' ? (
                                  <DepoWdDropdownBankSelect
                                    banks={banks}
                                    value={
                                      (table
                                        .getColumn('bank')
                                        ?.getFilterValue() as string) ?? ''
                                    }
                                    onChange={(value: string) =>
                                      handleSelectChange('bank', value)
                                    }
                                    column='bank'
                                  />
                                ) : header.column.id === 'status' ? (
                                  <>
                                    <DepoWdDropdownBankSelect
                                      className='overflow-visible'
                                      banks={statuses}
                                      value={
                                        (table
                                          .getColumn('status')
                                          ?.getFilterValue() as string) ?? ''
                                      }
                                      onChange={(value: string) =>
                                        handleSelectChange('status', value)
                                      }
                                      column='status'
                                    />
                                    {/* <pre>
                                      {JSON.stringify(
                                        table.getColumn('status'),
                                        null,
                                        3
                                      )}
                                    </pre> */}
                                  </>
                                ) : header.column.id === 'game' ? (
                                  <>
                                    <DepoWdDropdownBankSelect
                                      banks={games}
                                      value={
                                        (table
                                          .getColumn('game')
                                          ?.getFilterValue() as string) ?? ''
                                      }
                                      onChange={(value: string) =>
                                        handleSelectChange('game', value)
                                      }
                                      column='game'
                                    />
                                    {/* <pre>
                                      {JSON.stringify(
                                        table.getColumn('actions'),
                                        null,
                                        2
                                      )}
                                    </pre> */}
                                  </>
                                ) : header.column.getCanFilter() ? (
                                  <Filter column={header.column} />
                                ) : null}
                              </>
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
                        className='h-8 bg-amber-50 even:bg-orange-50 odd:bg-amber-200/30'
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell
                            key={cell.id}
                            className={cn(
                              'p-0 text-center lg:text-sm even:bg-indigo-50',
                              tableCellClassName
                            )}
                            style={{ height: '18px' }}
                          >
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
                        colSpan={columns.length}
                        className='h-12 text-center'
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>

                <TableFooter>
                  {table.getFooterGroups().map((footerGroup) => (
                    <TableRow key={footerGroup.id}>
                      {footerGroup.headers.map((header) => (
                        <TableCell key={header.id}>
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

              {isToggle && (
                <div className='flex flex-col mx-auto gap-0 py-2 rounded-lg justify-center'>
                  {groupArrays?.map((item: any) => (
                    <EuroCard
                      key={item.games[0].id}
                      eu={item}
                      className='bg-sky-100 mt-2'
                      groupClassName='w-full text-center  py-1 '
                      footerClassName={footerClassName}
                      euroClassName={euroClassName}
                      euCardClassName={euCardClassName}
                      trashClassName={trashClassName}
                    />
                  ))}
                </div>
              )}
              {isToggleFixture && (
                <div className='flex flex-col mx-auto gap-0 py-2 rounded-lg justify-center'>
                  <FixtureTable />
                </div>
              )}
            </div>

            <div
              className={cn(
                'space-x-2 py-4 pr-4 w-full text-nowrap',
                className,
                depoWdClassName
              )}
            >
              {/* <Button
                variant='ghost'
                size='sm'
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className={cn(
                  'w-1/6 bg-stone-200 mx-6 text-stone-900 hover:bg-amber-200 hover:text-black hover:font-semibold hover:drop-shadow-xl shadow-lg text-xs',
                  !table.getCanPreviousPage() && 'text-zinc-600'
                )}
              >
                <BsChevronDoubleLeft className='mr-4  grayscale hover:grayscale-0 transition ease-in-out delay-50  hover:-translate-y-1 hover:scale-150 mx-1 hover:bg-amber-200 hover:drop-shadow-lg duration-300' />
                Prev
              </Button>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className={cn(
                  'w-1/6 bg-stone-200 mx-6 text-stone-900 hover:bg-amber-200 hover:text-black hover:font-semibold hover:drop-shadow-xl shadow-lg text-xs',
                  !table.getCanNextPage() && 'text-zinc-600'
                )}
              >
                {' '}
                Next
                <BsChevronDoubleRight className='ml-4  grayscale hover:grayscale-0 transition ease-in-out delay-50  hover:-translate-y-1 hover:scale-150 mx-1 hover:bg-amber-200 hover:drop-shadow-lg duration-300' />
              </Button> */}

              <div className='h-2' />
              <div className='flex items-center gap-2 h-6'>
                <Button
                  variant='ghost'
                  size='sm'
                  className='border rounded p-1 h-6'
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  <BsChevronDoubleLeft className='mr-4  grayscale hover:grayscale-0 transition ease-in-out delay-50  hover:-translate-y-1 hover:scale-150 mx-1 hover:bg-amber-50 hover:drop-shadow-lg duration-300 h-4' />
                  1st
                </Button>
                <Button
                  variant='ghost'
                  size='sm'
                  className={cn(
                    'w-1/6 bg-stone-50  flex flex-row justify-center px-2 items-center text-stone-900 hover:bg-amber-50 hover:text-black hover:font-semibold hover:drop-shadow-xl shadow-lg text-xs h-6',
                    !table.getCanPreviousPage() && 'text-zinc-600'
                  )}
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <BsChevronLeft className='mr-4  grayscale hover:grayscale-0 transition ease-in-out delay-50  hover:-translate-y-1 hover:scale-150 mx-1 hover:bg-amber-50 hover:drop-shadow-lg duration-300 h-4' />
                  Prev
                </Button>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className={cn(
                    ' bg-stone-50 flex flex-row justify-center px-2 items-center text-stone-900 hover:bg-amber-50 hover:text-black hover:font-semibold hover:drop-shadow-xl shadow-lg text-xs h-6',
                    !table.getCanNextPage() && 'text-zinc-600'
                  )}
                >
                  Next
                  <BsChevronRight className='ml-4  grayscale hover:grayscale-0 transition ease-in-out delay-50  hover:-translate-y-1 hover:scale-150 mx-1 hover:bg-amber-200 hover:drop-shadow-lg duration-300 h-4' />
                </Button>
                <Button
                  variant='ghost'
                  size='sm'
                  className='border-none text-xs shadow-md rounded p-1 h-6'
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  Last
                  <BsChevronDoubleRight className='ml-4  grayscale hover:grayscale-0 transition ease-in-out delay-50  hover:-translate-y-1 hover:scale-150 mx-1 hover:bg-amber-200 hover:drop-shadow-lg duration-300 h-4' />
                </Button>
                <span className='flex items-center text-xs gap-1 h-6'>
                  <div>Page</div>
                  <strong className='text-nowrap '>
                    {table.getState().pagination.pageIndex + 1} of{' '}
                    {table.getPageCount()}
                  </strong>
                </span>
                <span className='flex items-center text-xs gap-1 text-nowrap h-6'>
                  | Go to page:
                  <input
                    type='number'
                    defaultValue={table.getState().pagination.pageIndex + 1}
                    onChange={(e) => {
                      const page = e.target.value
                        ? Number(e.target.value) - 1
                        : 0;
                      table.setPageIndex(page);
                    }}
                    className='border p-1  rounded w-8 h-6'
                  />
                </span>
                <select
                  value={table.getState().pagination.pageSize}
                  onChange={(e) => {
                    table.setPageSize(Number(e.target.value));
                  }}
                  className='text-xs h-6'
                >
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      Show {pageSize}
                    </option>
                  ))}
                </select>
                <div className='text-xs text-nowrap'>
                  {table.getPrePaginationRowModel().rows.length} Rows
                </div>
              </div>
              {/* <div>
                <button onClick={() => rerender()}>Force Rerender</button>
              </div> */}
              {/* <div>
                <button onClick={() => refreshData()}>Refresh Data</button>
              </div> */}
              {/* <pre>
                {JSON.stringify(
                  {
                    columnFilters: table.getState().columnFilters,
                    globalFilter: table.getState().globalFilter,
                  },
                  null,
                  2
                )}
              </pre> */}
            </div>
          </div>
        </div>
        <div className={cn('rounded-lg mt-2', className)}>
          <div className='w-full border rounded-lg mx-auto py-2'>
            <EPL className='mx-auto xs:h-30 sm:h-40 lg:h-50 xl:h-60' />

            <div
              className={cn(
                'px-4 text-center w-full text-base text-nowrap font-bold py-2 text-[#340239] bg-purple-50 drop-shadow-md sm:text-xs',
                orbit.className
              )}
            >
              20{year1} - 20{year2}{' '}
            </div>
            <Periods />
          </div>
        </div>
      </div>
    </div>
  );
}
