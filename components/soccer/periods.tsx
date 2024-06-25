'use client';

import { EPLPeriod } from '@/lib/helper';
import PeriodBox from './period-box';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';

type PeriodsProps = {};

const Periods = () => {
  const params = useSearchParams();
  const period = params.get('period');
  const pathname = usePathname();
  const router = useRouter();
  const isMainPage = pathname === '/soccer';

  const last = EPLPeriod.at(-1);
  if (!last) throw new Error('error');

  const setDefaultPeriod = useCallback(() => {
    if (!period) {
      const newSearchParams = new URLSearchParams(params as any);
      newSearchParams.set('period', last.value);
      router.replace(`${pathname}?${newSearchParams.toString()}`);
    }
  }, [period, last, pathname, params, router]);

  useEffect(() => {
    setDefaultPeriod();
  }, [setDefaultPeriod]);

  // if (!isMainPage) return null;
  return (
    <div className='flex flex-col bg-stone-50'>
      {EPLPeriod.map((per, i) => (
        <PeriodBox
          key={per.value}
          value={per.value}
          label={per.label}
          selected={period ? period === per.value : last.value === per.value}
          icon={per.icon}
          last={last?.value}
        />
      ))}
    </div>
  );
};

export default Periods;
