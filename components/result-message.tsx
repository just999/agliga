'use client';

import { cn } from '@/lib/utils';
import { ActionResult } from '@/types';
import Link from 'next/link';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

type ResultMessageProps = {
  result: ActionResult<string> | null;
};

const ResultMessage = ({ result }: ResultMessageProps) => {
  if (!result) return null;
  return (
    <div
      className={cn(
        'p-3 rounded-xl w-full flex items-center justify-center gap-x-2 text-sm',
        result?.status === 'error' && 'text-danger-800 bg-danger-50',
        result?.status === 'success' && 'text-success-800 bg-success-50'
      )}>
      {result?.status === 'success' ? (
        <FaCheckCircle size={28} className='text-emerald-600 ' />
      ) : (
        <FaExclamationTriangle size={28} className='text-rose-500 ' />
      )}
      <p>
        {(result?.status === 'success' ? result.data : result?.error) as string}
      </p>
      {result.status === 'success' ? (
        <Link href={'/login'}>Go to Login</Link>
      ) : (
        ''
      )}
    </div>
  );
};

export default ResultMessage;
