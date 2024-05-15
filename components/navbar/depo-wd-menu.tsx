'use client';

import useModal from '@/hooks/use-modal';
import { useUserRole } from '@/hooks/use-user-role';

import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { BiUserCircle } from 'react-icons/bi';

const DepoWdMenu = () => {
  const params = useSearchParams();
  const router = useRouter();

  const guestCount = params?.get('guestCount');

  const { onOpen, modalType } = useModal();

  const guestLabel = useMemo(() => {
    if (guestCount) return `${guestCount} guests`;

    return 'Current User';
  }, [guestCount]);

  const userRole = useUserRole();

  return (
    <div className='border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer '>
      <div className=' flex flex-row items-center justify-between '>
        <div
          onClick={() => onOpen('depo')}
          className=' text-xs font-semibold px-6 '
        >
          Deposit
        </div>
        <div
          onClick={() => onOpen('wd')}
          className='hidden sm:block text-xs font-semibold px-6 border-x-[1px] flex-1 text-center '
        >
          withdrawal
        </div>
        <div
          onClick={() => router.push('/posts')}
          className=' text-xs font-semibold px-6  md:hidden lg:block '
        >
          Berita
        </div>

        {userRole === 'admin' && (
          <>
            <div
              onClick={() => {
                onOpen('post');
              }}
              className='hidden sm:block text-xs font-semibold px-6 border-x-[1px] flex-1 text-center   md:hidden lg:block '
            >
              Post
            </div>
            <div
              onClick={() => {
                onOpen('topic');
              }}
              className='hidden sm:block text-xs font-semibold px-6 border-x-[1px] flex-1 text-center  md:hidden lg:block '
            >
              Topic
            </div>
          </>
        )}

        <div
          onClick={() => router.push('/soccer')}
          className='hidden sm:block text-xs font-semibold px-6 border-x-[1px] flex-1 text-center  md:hidden lg:block '
        >
          Jadwal
        </div>
        <div
          onClick={() => onOpen('live')}
          className='hidden sm:block text-xs font-semibold px-6 border-x-[1px] flex-1 text-center '
        >
          Livescore
        </div>
        {/* <div className=' text-xs pl-6 pr-2 text-gray-600 flex flex-row justify-center items-center gap-1 md:hidden  lg:flex lg:flex-row lg:items-center lg:justify-center  '>
          <div className=' hidden  sm:block md:hidden  lg:block '>
            {userRole}
          </div>
          <div className='  w-8 h-8 my-auto  flex flex-row items-center md:hidden lg:flex '>
            <BiUserCircle className='w-5 h-5 ' />
          </div>
        </div> */}
      </div>
    </div>
  );
};
export default DepoWdMenu;
