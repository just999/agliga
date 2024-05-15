'use client';

import useRunToggleStore from '@/store/use-table-store';
import RunBox from '../run-box';
import { ru } from 'date-fns/locale';
import { useSearchParams, usePathname } from 'next/navigation';

type TableData = { value: number; className?: string };

export const rows: TableData[][] = [
  [
    { value: 1, className: 'lsm2' },
    { value: 2, className: 'lsm2' },
    { value: 3, className: 'lsm2' },
    { value: 4, className: 'lsm2' },
    { value: 5, className: 'lsm2' },
    { value: 6, className: 'lsm2' },
    { value: 7, className: 'lsm2' },
    { value: 8, className: 'lsm2' },
    { value: 9, className: 'lsm2' },
    { value: 10, className: 'lsm2' },
    { value: 11, className: 'lsm2' },
    { value: 12, className: 'lsm2' },
    { value: 13, className: 'lsm2' },
    { value: 14, className: 'lsm2' },
    { value: 15, className: 'lsm2' },
    { value: 16, className: 'lsm2' },
    { value: 17, className: 'lsm2' },
    { value: 18, className: 'lsm2' },
    { value: 19, className: 'lsm2' },

    { value: 20, className: 'lsm2' },
    { value: 21, className: 'lsm2' },
    { value: 22, className: 'lsm2' },
    { value: 23, className: 'lsm2' },
    { value: 24, className: 'lsm2' },
    { value: 25, className: 'lsm2' },
    { value: 26, className: 'lsm2' },
    { value: 27, className: 'lsm2' },
    { value: 28, className: 'lsm2' },
    { value: 29, className: 'lsm2' },
    { value: 30, className: 'lsm2' },
    { value: 31, className: 'lsm2' },
    { value: 32, className: 'lsm2' },
    { value: 33, className: 'lsm2' },
    { value: 34, className: 'lsm2' },
    { value: 35, className: 'lsm2' },
    { value: 36, className: 'lsm2' },
    { value: 37, className: 'lsm2' },
    { value: 38, className: 'lsm2' },
    // { value: 39, className: 'lsm2' },
  ],
];

export type RunTableProps = {
  toggle: (value?: number) => void;
  setIsOpen: (value: number) => void;
};

const RunTable = ({ toggle, setIsOpen }: RunTableProps) => {
  const params = useSearchParams();
  const run = params.get('run');
  const pathname = usePathname();

  const isMainPage = pathname === '/';

  if (!isMainPage) return null;

  const handleToggleRun = (run: number) => {
    toggle(run);
  };
  return (
    <table
      border={1}
      cellPadding={1}
      cellSpacing={0}
      id='e_run_tb'
      className='e_run_tb border shadow-lg border-slate-200 text-xs mx-auto w-full mb-1 xs:mt-8 lg:mt-2 '
    >
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex} className='text-center text-xs  '>
            {row.map((cellData, cellIndex) => (
              <td
                key={`${rowIndex}-${cellIndex}`}
                onClick={() => handleToggleRun(cellData.value)}
                className=' text-blue-600 underline  cursor-pointer leading-5 h-7 my-auto text-center text-xs hover:bg-stone-300 border-neutral-200 bg-stone-100 px-3 '
              >
                <RunBox
                  label={cellData.value}
                  selected={Number(run) === cellData.value}
                  toggle={() => toggle(cellData.value)}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RunTable;
