'use client';

import Logo from './logo';
import SidebarRoutes from './sidebar-routes';

type SidebarProps = {};

const Sidebar = () => {
  return (
    <div className='h-full border-r flex flex-col sm:h-full overflow-y-none bg-neutral-50 shadow-sm '>
      <div className='m-0 pl-4 pt-10 2xs:pt-10'>
        <Logo />
      </div>
      <div>
        <SidebarRoutes
          size={24}
          extraClassName='bg-slate-100 flex flex-row justify-center items-center gap-2 shadow-lg'
        />
      </div>
    </div>
  );
};

export default Sidebar;
