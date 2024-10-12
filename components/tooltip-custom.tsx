'use client';

import { cn } from '@/lib/utils';
import { Button } from './ui';

type TooltipCustomProps = {
  children: React.ReactNode;
  content?: React.ReactNode;
  position: 'top' | 'right' | 'bottom' | 'left';
  triggerText?: string;
  className?: string;
  duration?: number; // add this prop
};

const TooltipCustom = ({
  children,
  content,
  triggerText,
  position,
  className,
  duration = 300,
}: TooltipCustomProps) => {
  return (
    <div
      className={cn('relative group')}
      style={{ '--tooltip-duration': `${duration}ms` } as React.CSSProperties}>
      {children}
      <div
        role='tooltip'
        id='tooltip-id'
        className={cn(
          'absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 z-10 transition-opacity ease-in-out opacity-0 group-hover:opacity-100',
          position === 'top' &&
            'left-1/2 transform -translate-x-1/2 bottom-full -mb-0.5',
          position === 'right' &&
            'left-full top-1/2 transform -translate-y-1/2 ml-.5',
          position === 'bottom' &&
            'left-1/2 transform -translate-x-1/2 top-full mt-.5',
          position === 'left' &&
            'right-full top-1/2 transform -translate-y-1/2 mr-.5',
          className
        )}>
        {content}
      </div>
      {/* <Button aria-describedby='tooltip-id'>
        {triggerText}
      </Button> */}
    </div>
  );
};

export default TooltipCustom;
