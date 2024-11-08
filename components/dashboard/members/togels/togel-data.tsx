'use client';

import { Button } from '@/components/ui';
import { thead4dData } from '@/lib/helper';
import { cn } from '@/lib/utils';
import { Sin4d, SinPool } from '@prisma/client';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

type TogelDataProps = {
  slug: string;
  togel: SinPool | any;
};

const TogelData = ({ slug, togel }: TogelDataProps) => {
  const [show, setShow] = useState(false);
  const sinData = togel.data[8].sinNumber;
  const renderedSinData = sinData.map((dat: Sin4d, i: number) => (
    <div key={i}>{dat.game}</div>
  ));

  return (
    <div>
      <div className='flex justify-between items-center '>
        <span className='text-xs'>
          {slug} - data - periode: {sinData[0].period}
        </span>
        <Button
          size='sm'
          variant='ghost'
          className='p-0 m-0 h-4'
          type='button'
          onClick={() => setShow((prev) => !prev)}>
          <ChevronDown size={14} />
        </Button>
      </div>
      {/* <pre>{JSON.stringify(sinData, null, 2)}</pre> */}
      <table className={cn(show ? 'hidden' : 'text-xs')}>
        <thead>
          <tr>
            {thead4dData.map((sin) => (
              <th
                key={sin.label}
                colSpan={sin.colspan}
                className='text-sm font-bold px-2'>
                {sin.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sinData.map((sin: Sin4d, i: number) => {
            return (
              <tr key={i}>
                <td className='flex items-center justify-center '>
                  <span className='text-center'>{i + 1}.</span>
                </td>
                <td className='w-3 bg-orange-50 text-gray-600 '>
                  <span className=' w-2 rounded-md '>{sin.d1}</span>
                </td>
                <td className='w-3 bg-orange-50 text-gray-600 '>
                  <span className=' w-2 rounded-md '>{sin.d2}</span>
                </td>
                <td className='w-3 bg-orange-50 text-gray-600 '>
                  <span className=' w-2 rounded-md '>{sin.d3}</span>
                </td>
                <td className='w-3 bg-orange-50 text-gray-600 '>
                  <span className=' w-2 rounded-md '>{sin.d4}</span>
                </td>
                <td className='w-fit text-center'>
                  <span>{sin.game}</span>
                </td>
                <td className='w-fit text-center'>
                  <span>{sin.wager}</span>
                </td>
                <td className='w-fit text-center'>
                  <span>{sin.dis}</span>
                </td>
                <td className='w-fit text-center'>
                  <span>{sin.net}</span>
                </td>
                <td className='w-fit text-center'>
                  <span>{sin.status}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TogelData;
