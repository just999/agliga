'use client';

import { cn } from '@/lib/utils';
import { GiSoccerKick } from 'react-icons/gi';

type PenaltyProps = {
  className?: string;
  penClassName?: string;
};

const Penalty = ({ className, penClassName }: PenaltyProps) => {
  return (
    <div className={cn('hidden w-2 h-3 text-sm text-nowrap', className)}>
      <span className={cn('hidden', penClassName)}>
        <GiSoccerKick />
      </span>
    </div>
  );
};

export default Penalty;
