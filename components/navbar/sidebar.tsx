'use client';

import { RoutesProps } from '@/types';
import Logo from './logo';
import SidebarRoutes from './sidebar-routes';

type SidebarProps = {
  routes: RoutesProps[];
};

const Sidebar = ({ routes }: SidebarProps) => {
  return (
    <div className='h-full border-r flex flex-col sm:h-full overflow-y-none bg-neutral-50 shadow-sm '>
      <div className='m-0 pl-4 pt-10 2xs:pt-10'>
        <Logo
          className='w-20 h-auto '
          styles={{ width: '8%', height: 'auto' }}
        />
      </div>
      <div>
        <SidebarRoutes
          routes={routes}
          size={24}
          extraClassName='bg-slate-100 flex flex-row justify-center items-center gap-2 shadow-lg'
        />
      </div>
    </div>
  );
};

export default Sidebar;
