'use client';

import { cn } from '@/lib/utils';
import useRunToggleStore from '@/store/use-table-store';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { useCallback } from 'react';

type RunBoxProps = {
  label: number;
  selected?: boolean;
  toggle?: (label: number) => void;
};

interface QueryParams {
  week?: number;
}

const RunBox = ({ label, selected, toggle }: RunBoxProps) => {
  const router = useRouter();
  const params = useSearchParams();

  const { setRun, isOpen } = useRunToggleStore();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: QueryParams = {
      ...currentQuery,
      week: label,
    };

    const el = params?.get('week')?.toString();
    const newWeek = Number(el || 0);
    if (newWeek === label) {
      delete updatedQuery.week;
    }

    if (toggle && updatedQuery) {
      toggle(label);
      setRun(label);
    }
    const url = qs.stringifyUrl(
      {
        url: '/soccer',
        query: updatedQuery as qs.StringifiableRecord,
      },
      { skipNull: true }
    );
    router.push(url);
  }, [label, params, router, toggle, setRun]);
  return (
    <div
      onClick={handleClick}
      // className={cn(
      //   'flex flex-col items-center gap-0 p-0 border-b-2 hover:shadow-md  hover:text-neutral-800 transition cursor-pointer',
      //   selected
      //     ? 'border-b-indigo-500/40 bg-indigo-50 drop-shadow-md rounded-sm text-stone-900'
      //     : 'border-transparent text-neutral-400'
      // )}
    >
      <div className='font-medium text-xs '>{label}</div>
    </div>
  );
};

export default RunBox;
