'use client';

import { togelSidebar } from '@/lib/helper';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type TogelSidebarProps = {
  slug: string;
};

// Define group titles
const groupTitles = [
  '4D/3D/2D',
  'Colok',
  '50 - 50',
  'variasi - lain',
  // Add more group titles as needed
];

const TogelSidebar = ({ slug }: TogelSidebarProps) => {
  const pathname = usePathname();
  return (
    <div className='bg-orange-50 rounded-md'>
      {togelSidebar.map((sidebarGroup, groupIndex) => (
        <div
          key={groupIndex}
          className='mb-4  bg-orange-400 shadow-lg rounded-md pb-2'>
          <h3 className='text-sm text-yellow-100 py-1 px-2 font-bold bg-amber-600 w-full mb-1 rounded-t-md'>
            {groupTitles[groupIndex] || `Group ${groupIndex + 1}`}
          </h3>
          {sidebarGroup.map((item, itemIndex) => {
            const Icon = item.icon;
            return (
              <Link
                key={`${groupIndex}-${itemIndex}`}
                href={item.link(slug)}
                className={cn(
                  'flex items-center py-1 hover:bg-gray-100 px-2',
                  pathname === item.link(slug) &&
                    'bg-amber-300 border-r-4 border-orange-800'
                )}>
                <Icon size={14} className='svg mr-2' />
                <span className='text-xs font-semibold'>{item.title}</span>
              </Link>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default TogelSidebar;
