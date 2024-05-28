'use client';

// import useModal from '@/hooks/use-modal';
// import { useUserRole } from '@/hooks/use-user-role';
import { cn } from '@/lib/utils';
import { RoutesProps } from '@/types';
import Link from 'next/link';

// import { useRouter } from 'next/navigation';

type UserMenuProps = {
  routes: RoutesProps[];
  userRole: string;
};

const DepoWdMenu = ({ routes, userRole }: UserMenuProps) => {
  // const router = useRouter();

  // const userRole = useUserRole();

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
                `h-full w-full  p-0 m-0 bg-emerald-900  cursor-pointer py-2 hover:shadow-md`,
                className,
                active
                  ? ' text-gray-800 bg-zinc-100 drop-shadow-sm border-b-2 border-solid px-3 border-stone-300 transition font-semibold'
                  : 'text-stone-400 bg-slate-100 px-3'
              )}
            >
              {/* {Icon && <Icon size={18} />} */}
              {/* <div className={cn('text-stone-900 text-xs text-center')}> */}
              {label}
              {/* </div> */}
            </Link>
          )
        )}

        {/* <div
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
        </div> */}

        {/* {userRole === 'admin' && (
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
        )} */}

        {/* <div
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
        </div> */}
      </div>
    </div>
  );
};
export default DepoWdMenu;
