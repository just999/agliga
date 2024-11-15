'use client';

import { useEffect } from 'react';

import EmptyState from '@/components/empty-state';

type ErrorProps = {
  error: Error;
};

const Error = ({ error }: ErrorProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return <EmptyState title='Uh Oh' subtitle='Something went wrong!' link='/' />;
};

export default Error;
