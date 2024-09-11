'use client';

import { cn } from '@/lib/utils';

import { CSSProperties } from 'react';
import BarLoader from 'react-spinners/BarLoader';

type BarLoaderProps = {
  color?: string;
  loading?: boolean;
  width: string;
  height?: number;
  speedMultiplier?: number;
  className?: string;
};

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};

const BarLoaderSpinner = ({
  color = 'orange',
  loading,
  width,
  height,
  speedMultiplier,
  className,
}: BarLoaderProps) => {
  return (
    <div className={cn('sweet-loading', className)}>
      <BarLoader
        width={width}
        color={color}
        loading={loading}
        cssOverride={override}
        aria-label='Loading Spinner'
        data-testid='loader'
        height={height}
        speedMultiplier={speedMultiplier}
      />
    </div>
  );
};

export default BarLoaderSpinner;
