'use client';

import SidePostItem from '@/components/posts/side-post-item';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { DepoProps, DepoWdProps, tabsData, WdProps } from '@/types';
import { useState } from 'react';
import DepoWdClient from './depo-wd-client';

type DepoWdTabsActiveProps = {
  depo: (DepoProps & WdProps)[];
};

const DepoWdTabsActive = ({ depo }: DepoWdTabsActiveProps) => {
  const [tabs, setTabs] = useState(tabsData);
  const [tabVal, setTabVal] = useState('');

  const newDepoCount = depo.filter(function (dep) {
    return dep.depoAmount && dep.status !== undefined && dep.status !== '';
  }).length;
  if (!depo) return [];
  const handleTabActive = (id: number): void => {
    setTabs(
      tabsData.map((tab) => {
        tab.active = false;
        if (tab.id === id) tab.active = true;
        if (tab.active === true) setTabVal(tab.value);
        return tab;
      })
    );
  };

  const renderedTabsActive = tabsData.map((tab) => (
    <li
      key={tab.id}
      className={cn(
        'nav-item   rounded-sm mx-auto ',
        tab.active
          ? ' bg-orange-100/50 w-full border-b-2 border-orange-400 '
          : ' bg-gray-50 w-full'
      )}
    >
      <Button
        onClick={() => handleTabActive(tab.id)}
        variant='ghost'
        size='sm'
        type='button'
        className={cn(
          `flex gap-4 text-center w-full text-gray-400  nav-link`,
          tab.active ? 'active text-black ring-orange-400' : undefined
        )}
      >
        {tab.label}{' '}
        <span className='rounded-full bg-rose-300 px-2 border border-solid border-red-400 '>
          {newDepoCount}
        </span>
      </Button>
    </li>
  ));

  const filteredDepo = depo.filter(
    (dep) => dep.depoAmount !== undefined || null
  );
  const filteredWd = depo.filter((wd) => wd?.wdAmount !== undefined || null);
  return (
    <div className='aside-block '>
      <ul className='nav nav-pills custom-tab-nav  mb-0 flex flex-row justify-center items-center '>
        {renderedTabsActive}
      </ul>
      <div className='tab-content '>
        <div
          className={`tab-pane fade ${
            tabs[0].active ? 'show active' : 'hidden'
          }`}
        >
          {/* {depoWd.slice(0, 6).map((item, i) => (
            <SidePostItem key={item.id} item={item} i={i} />
          ))} */}
          {/* <pre>{JSON.stringify(tabs, null, 2)}</pre> */}
          <DepoWdClient
            tab={tabVal}
            depo={filteredDepo}
            footerClassName='flex flex-row gap-2 justify-between items-center bg-sky-200/60'
            euroClassName='flex flex-wrap gap-2 justify-center group-card py-2'
            className={cn('hidden')}
            depoWdClassName={cn(
              'flex flex-row items-center justify-end right-0'
            )}
            // tableCellClassName='bg-orange-100/50'
            euCardClassName='pt-2 px-2 gap-0 justify-start items-center bg-emerald-50 odd:bg-zinc-100 even:bg-stone-50'
            // tableCellClassName='flex flex-col w-full'
          />
        </div>
        <div
          className={`tab-pane fade ${
            tabs[1].active ? 'show active' : 'hidden'
          }`}
        >
          {/* {depoWd.slice(6, 12).map((item, i) => (
            <SidePostItem key={item.id} item={item} i={i} />
          ))} */}
          <DepoWdClient
            tab={tabVal}
            depo={filteredWd}
            footerClassName='flex flex-row gap-2 justify-between items-center bg-sky-200/60'
            euroClassName='flex flex-wrap gap-2 justify-center group-card py-2'
            className={cn('hidden')}
            depoWdClassName={cn(
              'flex flex-row items-center justify-end right-0'
            )}
            // tableCellClassName='bg-orange-100/50'
            euCardClassName='pt-2 px-2 gap-0 justify-start items-center bg-emerald-50 odd:bg-zinc-100 even:bg-stone-50'
            // tableCellClassName='flex flex-row w-full'
          />
        </div>
      </div>
    </div>
  );
};

export default DepoWdTabsActive;
