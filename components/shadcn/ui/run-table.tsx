'use client';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shadcn/ui/table';
import { weeksTableRows } from '@/lib/helper';
import { cn } from '@/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';

// import { rows } from '../table/run-table';
// import useRunToggleStore from '@/store/use-table-store';

import RunBox from '../../run-box';

export type RunTableProps = {
  toggle: (value?: number) => void;
  setIsOpen: (value: number) => void;
  className?: string;
};

const RunTable = ({ toggle, setIsOpen, className }: RunTableProps) => {
  const params = useSearchParams();
  const week = params?.get('week');
  const pathname = usePathname();

  const isMainPage = pathname === '/soccer';

  // const { isOpen } = useRunToggleStore();
  if (!isMainPage) return null;

  const handleToggleRun = (run: number) => {
    toggle(run);
  };

  return (
    <Table
      className={cn(
        'e_run_tb border shadow-lg overflow-hidden overscroll-x-none border-slate-200 text-xs mx-auto w-full mb-1 2xs:mt-0 xs:mt-0 sm:mt-0 md:mt-6 lg:mt-2',
        className
      )}
    >
      <TableHeader></TableHeader>
      <TableBody className='bg-stone-100 '>
        {weeksTableRows.map((row, rowIndex) => (
          <TableRow
            key={rowIndex}
            className='text-center text-xs h-full w-full flex flex-wrap gap-0 py-1'
          >
            {row.map((cellData, cellIndex) => (
              <TableCell
                key={`${rowIndex}-${cellIndex}`}
                className={cn(
                  'w-m p-0  flex-grow cursor-pointer leading-5 xs:px-1 sm:px-1  md:px-1 lg:px-2 xl:px-2 2xl:px-3 my-auto text-center text-xs border-b-2 hover:bg-zinc-200 hover:rounded-md  hover:drop-shadow-md  hover:text-neutral-800 transition',
                  Number(week) === cellData.value
                    ? 'border-b-indigo-500/40 bg-indigo-50 drop-shadow-md rounded-sm'
                    : 'border-transparent',
                  Number(week) === cellData.value
                    ? 'text-stone-900'
                    : 'text-neutral-400'
                )}
              >
                <RunBox
                  label={cellData.value}
                  selected={Number(week) === cellData.value}
                  toggle={toggle}
                  // onClick={() => handleToggleRun(cellData.value)}
                />

                {/* {cellData.value} */}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RunTable;
