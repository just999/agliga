'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import useModal from '@/hooks/use-modal';
import { convertDateMonthYear, convertDateTime } from '@/lib/convert-date-time';
import { cn, noto } from '@/lib/utils';
import { EuroProps, EuroWithIconProps } from '@/types';

import { BsPencilFill, BsTrashFill } from 'react-icons/bs';
import EuroCardContent from './euro-card-content';

type EuroCardProps = {
  eu?: {
    date: string;
    games: EuroWithIconProps[];
  };
  className?: string;
  groupClassName?: string;
  footerClassName?: string;
  trashClassName?: string;
  euroClassName?: string;
  euroCardDateClassName?: string;
  euCardClassName?: string;
};

const EuroCard = ({
  eu,
  className,
  groupClassName,
  footerClassName,
  trashClassName,
  euroClassName,
  euroCardDateClassName,
  euCardClassName,
}: EuroCardProps) => {
  if (!eu) return <Skeleton />;

  // const filterGroupLength = eu.games.filter(
  //   (it) => convertDateMonthYear(it.date.toISOString()) === eu.date
  // ).length;
  // const filterGroup = eu.games
  //   .filter((it) => convertDateMonthYear(it.date.toISOString()) === eu.date)
  //   .map((t) => t.id);
  return (
    <div className={cn('flex flex-col justify-stretch ', euCardClassName)}>
      <div
        className={cn(
          euroCardDateClassName,
          'text-xs font-semibold text-zinc-500 underline'
        )}
      >
        Tanggal: {eu.date}
      </div>
      <div className='flex gap-4'>
        {eu.games
          .filter((t) => convertDateMonthYear(t.date.toISOString()) === eu.date)
          .map((it) => (
            <span key={it.id}>
              <EuroCardContent
                playDate={convertDateMonthYear(it.date.toISOString())}
                className={className}
                groupClassName={groupClassName}
                footerClassName={footerClassName}
                trashClassName={trashClassName}
                it={it}
              />
            </span>
          ))}
      </div>
    </div>
  );
};

export default EuroCard;
