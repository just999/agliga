'use client';

import { useCallback } from 'react';
import { cn } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { IconType } from 'react-icons';
import qs from 'query-string';

type CategoryBoxProps = {
  label: string;
  description?: string;
  icon: IconType | string;
  selected?: boolean;
  className?: string;
};
interface QueryParams {
  category?: string;

  // Add other query parameters you might have
}

const CategoryBox = ({
  label,
  description,
  icon: Icon,
  selected,
  className,
}: CategoryBoxProps) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: QueryParams = {
      ...currentQuery,
      category: label,
    };

    if (params.get('category') === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery as qs.StringifiableRecord,
      },
      { skipNull: true }
    );
    router.push(url);
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={cn(
        'flex flex-col items-center gap-2 p-3 border-b-2 hover:shadow-md hover:text-neutral-800 transition cursor-pointer',
        selected
          ? 'border-b-indigo-500/40 bg-indigo-50 drop-shadow-md rounded-sm text-sky-900 scale-105 font-extrabold'
          : 'border-transparent  text-neutral-400'
      )}
    >
      <Icon
        size={26}
        className={cn(
          'w-8 h-8 grayscale hover:grayscale-0 transition ease-in-out delay-50  hover:-translate-y-1 hover:scale-150 hover:bg-slate-100 duration-300',
          selected && 'grayscale-0 -translate-y-1 scale-125'
        )}
      />
      <div className='font-medium text-xs'>{label}</div>
    </div>
  );
};

export default CategoryBox;
