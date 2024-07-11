import Container from '@/components/container';
import { fetchDepo } from '@/lib/queries/depo-wd';

type AdminPageProps = {};

const AdminPage = async () => {
  const depos = await fetchDepo();
  return (
    <Container className='grid text-xs w-full pt-4 max-w-[1440px]'>
      AdminPage
    </Container>
  );
};

export default AdminPage;
