'use client';

import { Inbox } from '@/components/assets/icons/inbox';
import { Outbox } from '@/components/assets/icons/outbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { useMessageStore } from '@/store/use-message-store';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const MessageSidebar = () => {
  const { unreadCount } = useMessageStore((state) => ({
    unreadCount: state.unreadCount,
  }));
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [selected, setSelected] = useState<string>(
    searchParams.get('container') || 'inbox'
  );
  const items = [
    { key: 'inbox', label: 'Inbox', icon: Inbox, chip: true },
    { key: 'outbox', label: 'Outbox', icon: Outbox, chip: false },
  ];

  const handleSelect = (key: string) => {
    setSelected(key);
    const params = new URLSearchParams();
    params.set('container', key);
    router.replace(`${pathname}?${params}`);
  };
  return (
    <div className='flex flex-col cursor-pointer  bg-amber-50/70 h-full'>
      {items.map(({ key, icon: Icon, label, chip }) => (
        <Button
          key={key}
          variant='ghost'
          className={cn(
            'flex flex-row group  hover:bg-indigo-500/70 justify-center items-center rounded-none  gap-2 p-1 text-shadow text-xs px-4',
            selected !== key
              ? 'text-black hover:text-gray-600/50 '
              : 'text-white bg-indigo-500  hover:bg-indigo-500/70  border-r-4 border-solid border-purple-800 rounded-none shadow-lg'
          )}
          onClick={() => handleSelect(key)}>
          <Icon
            className={cn('fill-orange-800 group-hover:fill-black   svg')}
          />
          <div className='flex flex-grow justify-between relative'>
            <span>{label}</span>
            {chip && (
              <Badge className='bg-emerald-600 absolute px-1 py-0 text-xs left-7 top-0'>
                {unreadCount < 0 ? 0 : unreadCount}
              </Badge>
            )}
          </div>
        </Button>
      ))}
    </div>
  );
};

export default MessageSidebar;
