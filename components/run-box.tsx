'use client';

import { cn } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { useCallback } from 'react';
import { IconType } from 'react-icons';

type RunBoxProps = {
  label: number;
  selected?: boolean;
  toggle?: (label: number) => void;
};

interface QueryParams {
  run?: number;
}

const RunBox = ({ label, selected, toggle }: RunBoxProps) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: QueryParams = {
      ...currentQuery,
      run: label,
    };

    const el = params.get('run')?.toString();
    const newRun = Number(el || 0);
    if (newRun === label) {
      delete updatedQuery.run;
    }

    if (toggle) {
      toggle(label);
    }
    const url = qs.stringifyUrl(
      {
        url: '/soccer',
        query: updatedQuery as qs.StringifiableRecord,
      },
      { skipNull: true }
    );
    router.push(url);
  }, [label, params, router, toggle]);

  return (
    <div
      onClick={handleClick}
      className={
        cn()
        // 'flex flex-col items-center gap-0 p-0 border-b-2 hover:shadow-md  hover:text-neutral-800 transition cursor-pointer',
        // selected
        //   ? 'border-b-indigo-500/40 bg-indigo-50 drop-shadow-md rounded-sm'
        //   : 'border-transparent',
        // selected ? 'text-stone-900' : 'text-neutral-400'
      }
    >
      <div className='font-medium text-xs '>{label}</div>
    </div>
  );
};

export default RunBox;
