'use client';

import { RoutesProps } from '@/types/types';
import { FcMenu } from 'react-icons/fc';

import { Sheet, SheetContent, SheetTrigger } from '../shadcn/ui/sheet';
import Sidebar from './sidebar';

type MobileSidebarProps = {
  routes: RoutesProps[];
};

const MobileSidebar = ({ routes }: MobileSidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger className='md:hidden pr-4 hover:opacity-75 transition '>
        <FcMenu className='h-10 w-10 ' />
      </SheetTrigger>
      <SheetContent side='left' className='p-0 bg-white  '>
        <Sidebar routes={routes} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
