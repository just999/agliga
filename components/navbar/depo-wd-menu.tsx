'use client';

import useModal from '@/hooks/use-modal';
import { useUserRole } from '@/hooks/use-user-role';
// import useModal from '@/hooks/use-modal';
// import { useUserRole } from '@/hooks/use-user-role';
import { cn } from '@/lib/utils';
import { RoutesProps } from '@/types';
import Link from 'next/link';

// import { usePathname, useRouter } from 'next/navigation';

type UserMenuProps = {
  routes: RoutesProps[];
};

const DepoWdMenu = ({ routes }: UserMenuProps) => {
  // const router = useRouter();
  // const pathname = usePathname();
  // const userRole = useUserRole();

  const { modalType, onOpen } = useModal();
  // const active =
  //   ' text-lime-700  bg-emerald-50 drop-shadow-sm border-b-[3px] border-solid px-3 border-stone-300 transition font-bold';
  // const inactive = 'text-stone-400  px-3';

  return (
    <div className='border w-full md:w-auto rounded-full shadow-sm  transition'>
      <div className=' flex flex-row items-center justify-between h-full'>
        {routes.map(
          ({ label, href, onClick, active, className, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              onClick={onClick}
              className={cn(
                // `h-full w-full  p-0 m-0 bg-emerald-900  cursor-pointer py-2 hover:shadow-md`,
                className,
                active
                  ? ' text-lime-700  bg-emerald-50 drop-shadow-sm border-b-2 border-solid px-3 border-b-emerald-600 transition font-bold'
                  : 'text-stone-400 bg-slate-100 px-3'
              )}
            >
              {/* {Icon && <Icon size={18} />} */}
              <div
                className={cn(
                  'flex flex-row gap-1 text-stone-900 text-[14px] text-center text-nowrap'
                )}
              >
                {/* <Icon size={12} /> */}
                {label}
              </div>
            </Link>
          )
        )}

        {/* <div
          onClick={() => onOpen('depo')}
          className={cn(
            'text-xs font-semibold  rounded-l-full px-6 py-2 cursor-pointer hover:shadow-md hover:bg-emerald-50',
            modalType === 'depo' ? active : inactive
          )}
        >
          Deposit
        </div>
        <div
          onClick={() => onOpen('wd')}
          className={cn(
            'hidden sm:block text-xs py-2 font-semibold px-6 border-x-[1px] flex-1 text-center cursor-pointer hover:shadow-md hover:bg-emerald-50',
            modalType === 'wd' ? active : inactive
          )}
        >
          withdrawal
        </div>
        <div
          onClick={() => router.push('/posts')}
          className={cn(
            'text-xs font-semibold px-6 py-2  md:hidden lg:block cursor-pointer hover:shadow-md hover:bg-emerald-50',
            pathname === `/posts` ? active : inactive
          )}
        >
          Berita
        </div>

        {userRole === 'admin' && (
          <>
            <div
              onClick={() => {
                onOpen('post');
              }}
              className={cn(
                'hidden sm:block text-xs font-semibold py-2 px-6 border-x-[1px] flex-1 text-center md:hidden lg:block cursor-pointer hover:shadow-md hover:bg-emerald-50',
                modalType === 'post' ? active : inactive
              )}
            >
              Post
            </div>
            <div
              onClick={() => {
                onOpen('topic');
              }}
              className={cn(
                'hidden sm:block text-xs font-semibold px-6 py-2 border-x-[1px] flex-1 text-center  md:hidden lg:block cursor-pointer hover:shadow-md hover:bg-emerald-50',
                modalType === 'topic' ? active : inactive
              )}
            >
              Topic
            </div>
            <div
              onClick={() => {
                onOpen('soccer');
              }}
              className={cn(
                'hidden whitespace-nowrap sm:block text-xs font-semibold px-6 py-2 border-x-[1px] flex-1 text-center  md:hidden lg:block cursor-pointer hover:shadow-md hover:bg-emerald-50',
                modalType === 'soccer' ? active : inactive
              )}
            >
              Input-jadwal
            </div>
            <div
              onClick={() => {
                onOpen('slider');
              }}
              className={cn(
                'hidden whitespace-nowrap sm:block text-xs font-semibold px-6 py-2 border-x-[1px] flex-1 text-center  md:hidden lg:block cursor-pointer hover:shadow-md hover:bg-emerald-50',
                modalType === 'slider' ? active : inactive
              )}
            >
              Input-slider
            </div>
          </>
        )}

        <div
          onClick={() => router.push('/soccer')}
          className={cn(
            'hidden sm:block text-xs font-semibold py-2 px-6 border-x-[1px] flex-1 text-center  md:hidden lg:block cursor-pointer hover:shadow-md hover:bg-emerald-50',
            pathname === '/soccer' ? active : inactive
          )}
        >
          Jadwal
        </div>
        <div
          onClick={() => onOpen('live')}
          className={cn(
            'hidden sm:block text-xs bg-slate-50 rounded-r-full py-2  font-semibold px-6 border-x-[1px] flex-1 text-center cursor-pointer h-full hover:shadow-md hover:bg-emerald-50',
            modalType === 'live' ? active : inactive
          )}
        >
          Livescore
        </div> */}
      </div>
    </div>
  );
};
export default DepoWdMenu;
