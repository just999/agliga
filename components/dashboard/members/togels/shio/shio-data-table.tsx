'use client';

import React from 'react';

import { shioWithIcon } from '@/lib/helper';
import { cn, oldStandardTT, poppins } from '@/lib/utils';

type ShioDataTableProps = {
  showShioTable: boolean;
  setShowDescription: (showShioTable: boolean) => void;
};

const ShioDataTable = ({
  showShioTable,
  setShowDescription,
}: ShioDataTableProps) => {
  return (
    <div
      className={cn(
        'w-124 bg-amber-100 rounded-sm transition-all duration-1000 ease-in-out transform overflow-hidden',
        showShioTable ? 'max-h-[1705px] opacity-100' : 'max-h-0 opacity-0'
      )}
    >
      <table className='min-w-124 border-collapse border-l-0 border-r-0 mx-auto'>
        <tbody>
          {shioWithIcon.map(({ icon: Icon, name, label, year }) => (
            <tr key={label} className='hover:bg-gray-50  border-l-0 border-r-0'>
              <td className='border border-stone-200 p-1 flex items-center gap-2 min-w-[150px]  border-l-0 border-r-0'>
                <span className='text-lg'>
                  <Icon className='text-emerald-700 svg ' />
                </span>
                <span
                  className={cn('text-xs font-semibold', poppins.className)}
                >
                  {name}
                </span>
              </td>
              {year.map((year) => (
                <td
                  key={year}
                  className={cn(
                    'border w-9 border-stone-300 p-1 text-center text-xs font-semibold  border-l-0 border-r-0',
                    poppins.className
                  )}
                >
                  <div
                    className={cn(
                      'text-emerald-600 font-bold text-xs',
                      oldStandardTT.className
                    )}
                  >
                    {year}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShioDataTable;
