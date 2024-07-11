import Container from '@/components/container';
import { DataTable } from '@/components/ui/data-table';
// import DepoWdTable from '@/components/ui/depo-wd-table';
import { Table } from '@/components/ui/table';
import { fetchDepo } from '@/lib/queries/depo-wd';

type AdminPageProps = {};

const AdminPage = async () => {
  const depos = await fetchDepo();
  return (
    <Container className='grid text-xs w-full pt-4 max-w-[1440px]'>
      {/* <DepoWdTable /> */}
      admin page table
    </Container>
  );
};

export default AdminPage;
