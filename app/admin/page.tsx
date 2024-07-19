import Container from '@/components/container';
import DepoWdClient from '@/components/table/depo-wd/depo-wd-client';
import DepoWdTabsActive from '@/components/table/depo-wd/depo-wd-tabs-active';
import { DataTable } from '@/components/ui/data-table';
// import DepoWdTable from '@/components/ui/depo-wd-table';
import { Table } from '@/components/ui/table';
import { currentRole } from '@/lib/auth';
import { fetchDepo, fetchWd } from '@/lib/queries/depo-wd';
import { fetchUsers } from '@/lib/queries/users';
import { cn } from '@/lib/utils';
import { redirect } from 'next/navigation';

type AdminPageProps = {};

const AdminPage = async () => {
  const depos = await fetchDepo();
  if (!depos || depos.length === 0) return [];

  const role = await currentRole();
  if (role !== 'admin') {
    redirect('/');
  }
  const wds = await fetchWd();
  if (!wds || wds.length === 0) return [];

  const users = await fetchUsers();
  if (!users || users.length === 0) return [];

  Array.prototype.push.apply(depos, wds);

  return (
    <Container className='grid text-xs w-full max-w-[1440px]'>
      {/* <DepoWdClient
        // key={i}
        depo={depos}
        footerClassName='flex flex-row gap-2 justify-between items-center bg-sky-200/60'
        euroClassName='flex flex-wrap gap-2 justify-center group-card py-2'
        className={cn('hidden')}
        depoWdClassName={cn('flex flex-row items-center justify-end right-0')}
        // tableCellClassName='bg-orange-100/50'
        euCardClassName='pt-2 px-2 gap-0 justify-start items-center bg-emerald-50 odd:bg-zinc-100 even:bg-stone-50'
      /> */}
      <DepoWdTabsActive depo={depos} users={users} role={role} />
    </Container>
  );
};

export default AdminPage;
