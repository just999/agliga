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
} from '@/components/ui/table';
import { rows } from '../table/run-table';
// import useRunToggleStore from '@/store/use-table-store';

import RunBox from '../run-box';
import { useSearchParams, usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

export type RunTableProps = {
  toggle: (value?: number) => void;
  setIsOpen: (value: number) => void;
};

const RunTable = ({ toggle, setIsOpen }: RunTableProps) => {
  const params = useSearchParams();
  const run = params.get('run');
  const pathname = usePathname();

  const isMainPage = pathname === '/soccer';

  if (!isMainPage) return null;

  // const { isOpen } = useRunToggleStore();
  const handleToggleRun = (run: number) => {
    toggle(run);
  };

  return (
    <Table className='e_run_tb border shadow-lg overflow-hidden overscroll-x-none border-slate-200 text-xs mx-auto w-full mb-1 2xs:mt-0 xs:mt-0 sm:mt-0 md:mt-6 lg:mt-2  '>
      <TableHeader></TableHeader>
      <TableBody className='bg-stone-100 '>
        {rows.map((row, rowIndex) => (
          <TableRow
            key={rowIndex}
            className='text-center text-xs h-full w-full flex flex-wrap gap-0 py-1'
          >
            {row.map((cellData, cellIndex) => (
              <TableCell
                key={`${rowIndex}-${cellIndex}`}
                className={cn(
                  'w-m p-0  flex-grow cursor-pointer leading-5 xs:px-2 sm:px-4  md:px-4 lg:px-4 xl:px-4 2xl:px-7  my-auto text-center text-xs border-b-2 hover:bg-zinc-200 hover:rounded-md  hover:drop-shadow-md  hover:text-neutral-800 transition',
                  Number(run) === cellData.value
                    ? 'border-b-indigo-500/40 bg-indigo-50 drop-shadow-md rounded-sm'
                    : 'border-transparent',
                  Number(run) === cellData.value
                    ? 'text-stone-900'
                    : 'text-neutral-400'
                )}
              >
                {/* <TableCell
                key={`${rowIndex}-${cellIndex}`}
                className={cn(' text-blue-600  align-middle flex-1 underline p-0  cursor-pointer leading-5  my-auto text-center text-xs hover:bg-stone-300 border-neutral-200 py-2  px-3 flex flex-col items-center gap-0  border-b-2 hover:shadow-md  hover:text-neutral-800 transition', )}
              > */}
                <RunBox
                  label={cellData.value}
                  selected={Number(run) === cellData.value}
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
