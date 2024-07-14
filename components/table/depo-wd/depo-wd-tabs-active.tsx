'use client';

import SidePostItem from '@/components/posts/side-post-item';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { DepoWdProps, tabsData } from '@/types';
import { useState } from 'react';

type DepoWdTabsActiveProps = {
  depoWd: DepoWdProps[];
};

const DepoWdTabsActive = ({ depoWd }: DepoWdTabsActiveProps) => {
  const [tabs, setTabs] = useState(tabsData);

  const handleTabActive = (id: number): void => {
    setTabs(
      tabsData.map((tab) => {
        tab.active = false;
        if (tab.id === id) tab.active = true;
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
          `text-center w-full text-gray-400  nav-link`,
          tab.active ? 'active text-black ring-orange-400' : undefined
        )}
      >
        {tab.label}
      </Button>
    </li>
  ));
  return (
    <div className='aside-block '>
      <ul className='nav nav-pills custom-tab-nav  mb-4 flex flex-row justify-center items-center '>
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
          DEPO
        </div>
        <div
          className={`tab-pane fade ${
            tabs[1].active ? 'show active' : 'hidden'
          }`}
        >
          {/* {depoWd.slice(6, 12).map((item, i) => (
            <SidePostItem key={item.id} item={item} i={i} />
          ))} */}
          WD
        </div>
      </div>
    </div>
  );
};

export default DepoWdTabsActive;
