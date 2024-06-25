'use client';

import { useCallback } from 'react';
import { cn } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { IconType } from 'react-icons';
import qs from 'query-string';
import useModal from '@/hooks/use-modal';

type PeriodBoxProps = {
  label: string;
  value: string;
  description?: string;
  icon: IconType | string;
  selected?: boolean;
  last?: string;
};

type QueryParams = {
  period?: string;
};

const PeriodBox = ({
  label,
  value,
  description,
  icon: Icon,
  selected,
  last,
}: PeriodBoxProps) => {
  const router = useRouter();
  const params = useSearchParams();

  const { isOpen, setGroup } = useModal();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: QueryParams = {
      ...currentQuery,
      period: value,
    };
    // if (params.get('period') === value) {
    //   delete updatedQuery.period;
    // }

    const url = qs.stringifyUrl(
      {
        url: '/soccer',
        query: updatedQuery as qs.StringifiableRecord,
      },
      {
        skipNull: true,
      }
    );
    setGroup('new-fixture', isOpen, value, url);
    router.push(url);
  }, [params, router, value, isOpen, selected, setGroup]);
  if (!last) return;
  const lastVal = last;
  return (
    <div
      onClick={handleClick}
      className={cn(
        'flex  flex-row justify-center items-center gap-2 px-4 py-2 hover:text-nowrap  hover:shadow-md  hover:text-gray-800 transition cursor-pointer ',
        selected
          ? ' bg-indigo-50  rounded-sm text-stone-900 text-nowrap border-x-4 border-indigo-600 shadow-xl underline decoration-indigo-300'
          : 'border-transparent text-neutral-400'
      )}
    >
      <Icon size={12} className='w-4 h-4 ' />
      <div className='text-xs break-keep'>{label}</div>
      {/* <VerticalDropdown period={period} value={value} /> */}
    </div>
  );
};

export default PeriodBox;
