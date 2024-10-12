'use client';

import { cn } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { IconType } from 'react-icons';
import qs from 'query-string';
import { useCallback, useState } from 'react';

type GameBoxProps = {
  label: string;
  icon: IconType | string;
  selected?: boolean;
};
interface QueryParams {
  game?: string;

  // Add other query parameters you might have
}

const GameBox = ({ label, icon: Icon, selected }: GameBoxProps) => {
  const [isSelected, setIsSelected] = useState(selected || false);
  const router = useRouter();
  const params = useSearchParams();
  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: QueryParams = {
      ...currentQuery,
      game: label,
    };

    if (params && params.get('game') === label) {
      delete updatedQuery.game;
    }

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery as qs.StringifiableRecord,
      },
      { skipNull: true }
    );
    setIsSelected(params?.get('game') === label);
    router.push(url);
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={cn(
        'flex flex-col items-center gap-2 p-3 border-b-2 hover:shadow-md  hover:text-neutral-800 transition cursor-pointer',
        selected
          ? 'border-b-indigo-500/40 bg-indigo-50 drop-shadow-md rounded-sm'
          : 'border-transparent',
        selected ? 'text-stone-900' : 'text-neutral-400'
      )}>
      <Icon size={26} />
      <div className='font-medium text-xs'>{label}</div>
    </div>
  );
};

export default GameBox;
