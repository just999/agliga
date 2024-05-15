'use client';

import { scis } from '@/data/data';
import IconBox from './icon-box';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

type SciProps = {
  size?: number | string | undefined;
  iconClass?: string;
  className?: string;
};

const Sci = ({ size, iconClass, className }: SciProps) => {
  if (!size || typeof size === 'string') return;

  return (
    <>
      {scis.map((soc) => (
        <Button
          variant='ghost'
          size='sm'
          type='button'
          key={soc.id}
          className={cn('text-left', iconClass)}
        >
          <IconBox
            color={soc.color}
            icon={soc.icon}
            size={size}
            className={cn(`flex flex-row gap-3`, iconClass)}
          />
        </Button>
      ))}
    </>
  );
};

export default Sci;
