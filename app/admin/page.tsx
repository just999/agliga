import Container from '@/components/container';
import DepoWdClient from '@/components/table/depo-wd/depo-wd-client';
import { DataTable } from '@/components/ui/data-table';
// import DepoWdTable from '@/components/ui/depo-wd-table';
import { Table } from '@/components/ui/table';
import { fetchDepo, fetchWd } from '@/lib/queries/depo-wd';
import { cn } from '@/lib/utils';

type AdminPageProps = {};

const AdminPage = async () => {
  const depos = await fetchDepo();
  if (!depos || depos.length === 0) return [];

  const wds = await fetchWd();
  if (!wds || wds.length === 0) return [];

  Array.prototype.push.apply(depos, wds);
  return (
    <Container className='grid text-xs w-full pt-4 max-w-[1440px]'>
      <DepoWdClient
        // key={i}
        depo={depos}
        footerClassName='flex flex-row gap-2 justify-between items-center bg-sky-200/60'
        euroClassName='flex flex-wrap gap-2 justify-center group-card py-2'
        className={cn('hidden')}
        depoWdClassName={cn('flex flex-row items-center justify-end right-0')}
        // tableCellClassName='bg-orange-100/50'
        euCardClassName='pt-2 px-2 gap-0 justify-start items-center bg-emerald-50 odd:bg-zinc-100 even:bg-stone-50'
      />
    </Container>
  );
};

export default AdminPage;
