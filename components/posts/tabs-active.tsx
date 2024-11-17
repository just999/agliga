'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils';
import { PostProps, tabsData } from '@/types/types';

import { Button } from '../shadcn/ui/button';
import SidePostItem from './side-post-item';

type TabsActiveProps = {
  items: PostProps[];
};

const TabsActive = ({ items }: TabsActiveProps) => {
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
        {tab.name}
      </Button>
    </li>
  ));
  return (
    <div className='aside-block '>
      <ul className='nav nav-pills custom-tab-nav  mb-4 flex flex-row justify-center items-center'>
        {renderedTabsActive}
      </ul>
      <div className='tab-content '>
        <div
          className={`tab-pane fade ${
            tabs[0].active ? 'show active' : 'hidden'
          }`}
        >
          {items.slice(0, 6).map((item, i) => (
            <SidePostItem key={item.id} item={item} i={i} />
          ))}
        </div>
        <div
          className={`tab-pane fade ${
            tabs[1].active ? 'show active' : 'hidden'
          }`}
        >
          {items.slice(6, 12).map((item, i) => (
            <SidePostItem key={item.id} item={item} i={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabsActive;
