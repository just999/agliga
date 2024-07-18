// 'use client';

// import { Button } from '@/components/ui/button';
// import { cn } from '@/lib/utils';
// import { DepoProps, tabsAdmin, WdProps } from '@/types';
// import { useEffect, useState } from 'react';
// import DepoWdClient from './depo-wd-client';
// import { IoNotifications } from 'react-icons/io5';

// import ClockSpinner from '@/components/ui/clock-spinner';
// import { User } from '@prisma/client';

// type DepoWdTabsActiveProps = {
//   depo: (DepoProps & WdProps)[];
//   users: User[];
// };

// const DepoWdTabsActive = ({ depo, users }: DepoWdTabsActiveProps) => {
//   const [loading, setLoading] = useState(true);
//   const [tabs, setTabs] = useState(tabsAdmin);
//   const [tabVal, setTabVal] = useState(() => {
//     if (typeof window !== 'undefined') {
//       return localStorage.getItem('tabVal') || tabsAdmin[0].value;
//     }
//     return tabsAdmin[0].value;
//   });
//   useEffect(() => {
//     if (tabs) {
//       setTabs(tabs.map((tab) => ({ ...tab, active: tab.value === tabVal })));
//     }
//     setLoading(false);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [tabVal]);

//   useEffect(() => {
//     if (typeof window !== 'undefined' && tabVal) {
//       localStorage.setItem('tabVal', tabVal);
//     }
//   }, [tabVal]);
//   const newDepoCount = depo.filter(
//     (dep) => dep.depoAmount && dep.status === null && dep.status !== ''
//   ).length;
//   const newWdCount = depo.filter(
//     (wd) => wd.wdAmount && wd.status === null && wd.status !== ''
//   ).length;

//   if (!depo) return [];

//   const handleTabActive = (id: number): void => {
//     setTabs(
//       tabsAdmin.map((tab) => {
//         tab.active = false;
//         if (tab.id === id) tab.active = true;
//         if (tab.active === true) setTabVal(tab.value);
//         return tab;
//       })
//     );
//   };

//   if (loading) {
//     return (
//       <ClockSpinner className='h-full pt-32 justify-center items-center' />
//     );
//   }

//   const renderedTabsActive = tabs.map((tab) => (
//     <li
//       key={tab.id}
//       className={cn(
//         'nav-item   rounded-sm mx-auto ',
//         tab.active
//           ? ' bg-orange-100/50 w-full border-b-2 border-orange-400 '
//           : ' bg-gray-50 w-full'
//       )}
//     >
//       <Button
//         onClick={() => handleTabActive(tab.id)}
//         variant='ghost'
//         size='sm'
//         type='button'
//         className={cn(
//           `flex gap-4 text-center w-full text-gray-400  nav-link`,
//           tab.active ? 'active text-black ring-orange-400' : undefined
//         )}
//       >
//         {/* <pre>{JSON.stringify(tab, null, 2)}</pre> */}
//         {tab.label}{' '}
//         <span className='flex items-center rounded-full bg-orange-300 px-2 border border-solid border-red-400 drop-shadow-xl'>
//           <IoNotifications size={18} />{' '}
//           {tab.value === 'depo'
//             ? newDepoCount
//             : tab.value === 'wd'
//             ? newWdCount
//             : ''}
//         </span>
//       </Button>
//     </li>
//   ));

//   const filteredDepo = depo.filter(
//     (dep) => dep.depoAmount !== undefined || null
//   );
//   const filteredWd = depo.filter((wd) => wd?.wdAmount !== undefined || null);
//   return (
//     <div className='aside-block '>
//       <ul className='nav nav-pills custom-tab-nav  mb-0 flex flex-row justify-center items-center '>
//         {renderedTabsActive}
//       </ul>

//       <div className='tab-content'>
//         {tabs.map((t) => (
//           <div
//             key={t.id}
//             className={cn('tab-pane fade', t.active ? 'show active' : 'hidden')}
//           >
//             {/* <pre>{JSON.stringify(t, null, 2)}</pre> */}
//             <DepoWdClient
//               tab={t.value}
//               depo={t.value === 'depo' ? filteredDepo : filteredWd}
//               users={users}
//               footerClassName='flex flex-row gap-2 justify-between items-center bg-sky-200/60'
//               euroClassName='flex flex-wrap gap-2 justify-center group-card py-2'
//               className={cn('hidden')}
//               depoWdClassName={cn(
//                 'flex flex-row items-center justify-end right-0'
//               )}
//               euCardClassName='pt-2 px-2 gap-0 justify-start items-center bg-emerald-50 odd:bg-zinc-100 even:bg-stone-50'
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DepoWdTabsActive;

'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn, noto, poppins } from '@/lib/utils';
import { DepoProps, tabsAdmin, WdProps } from '@/types';
import { IoNotifications } from 'react-icons/io5';
import ClockSpinner from '@/components/ui/clock-spinner';
import { User } from '@prisma/client';

import DepoWdClient from './depo-wd-client';
import { useTabsStore } from '@/store/use-tabs-store';

type DepoWdTabsActiveProps = {
  depo: (DepoProps & WdProps)[];
  users: User[];
};

const DepoWdTabsActive = ({ depo, users }: DepoWdTabsActiveProps) => {
  const { tabs, tabVal, setTabs, setTabVal } = useTabsStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const cachedTabVal = localStorage.getItem('tabVal') || tabsAdmin[0].value;
      setTabs(
        tabsAdmin.map((tab) => ({ ...tab, active: tab.value === cachedTabVal }))
      );
      setTabVal(cachedTabVal);
      setLoading(false);
    }
  }, [setTabs, setTabVal]);

  useEffect(() => {
    if (typeof window !== 'undefined' && tabVal) {
      localStorage.setItem('tabVal', tabVal);
    }
  }, [tabVal]);

  const newDepoCount = depo.filter(
    (dep) => dep.depoAmount && dep.status === 'new'
  ).length;
  const newWdCount = depo.filter(
    (wd) => wd.wdAmount && wd.status === 'new'
  ).length;

  if (!depo) return null;

  const handleTabActive = (id: number): void => {
    const targetTab = tabs.find((tab) => tab.id === id);
    if (targetTab) {
      setTabVal(targetTab.value);
    }
  };

  if (loading) {
    return (
      <ClockSpinner className='h-full pt-32 justify-center items-center' />
    );
  }

  const renderedTabsActive = tabs.map((tab) => (
    <li
      key={tab.id}
      className={cn(
        'nav-item rounded-sm mx-auto border-x border-orange-200',
        tab.active
          ? 'bg-orange-300/50 w-full border-b-2 border-orange-400 drop-shadow-xl'
          : 'bg-amber-100 w-full'
      )}
    >
      <Button
        onClick={() => handleTabActive(tab.id)}
        variant='ghost'
        size='sm'
        type='button'
        className={cn(
          'flex gap-4 text-center w-full shadow-xl text-gray-400 nav-link',
          tab.active ? 'active text-black ring-orange-400' : undefined
        )}
      >
        <div className='relative px-2 border-1 border-solid border-yellow-400 flex flex-row rounded-md  items-center '>
          <span>{tab.label}</span>
          <span className='flex items-center rounded-full  p-2.5 drop-shadow-xl'>
            <IoNotifications size={15} className='text-gray-500 ' />
          </span>
          {tab.value === 'depo' ? (
            <span
              className={cn(
                'absolute top-0 right-0  text-amber-200 font-base  rounded-full bg-red-600 px-1.5 shadow-lg',
                poppins.className
              )}
            >
              <span className='text-xs '>{newDepoCount}</span>
            </span>
          ) : tab.value === 'wd' ? (
            <span
              className={cn(
                'absolute top-0 right-0  text-amber-200 font-base text-[10px] rounded-full bg-red-600 px-1.5 shadow-lg',
                poppins.className
              )}
            >
              <span className='text-xs'>{newWdCount}</span>
            </span>
          ) : (
            ''
          )}
        </div>
      </Button>
    </li>
  ));

  const filteredDepo = depo.filter(
    (dep) => dep.depoAmount !== undefined && dep.depoAmount !== null
  );
  const filteredWd = depo.filter(
    (wd) => wd.wdAmount !== undefined && wd.wdAmount !== null
  );

  return (
    <div className='aside-block'>
      <ul className='nav nav-pills custom-tab-nav mb-0 flex flex-row justify-center items-center'>
        {renderedTabsActive}
      </ul>

      <div className='tab-content'>
        {tabs.map((t) => (
          <div
            key={t.id}
            className={cn('tab-pane fade', t.active ? 'show active' : 'hidden')}
          >
            <DepoWdClient
              tab={t.value}
              depo={t.value === 'depo' ? filteredDepo : filteredWd}
              users={users}
              footerClassName='flex flex-row gap-2 justify-between items-center bg-sky-200/60'
              euroClassName='flex flex-wrap gap-2 justify-center group-card py-2'
              className={cn('hidden')}
              depoWdClassName={cn(
                'flex flex-row items-center justify-end right-0'
              )}
              euCardClassName='pt-2 px-2 gap-0 justify-start items-center bg-emerald-50 odd:bg-zinc-100 even:bg-stone-50'
              thClassName='p-0 m-0'
              euroTableClassName='hidden'
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepoWdTabsActive;
