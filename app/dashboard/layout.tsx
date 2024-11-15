import { getAuthUserId, getUserRole } from '@/actions/auth-actions';
import Container from '@/components/container';
import DashboardSidebar from '@/components/dashboard/dashboard-sidebar';
import { Nav } from '@/components/dashboard/members/nav';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const userId = await getAuthUserId();
  const userRole = await getUserRole();

  return (
    <div className='relative mx-auto flex'>
      <div className='hidden h-[100vh] w-64 min-w-40 md:block'>
        <DashboardSidebar userId={userId} userRole={userRole} />
      </div>
      <div className='h-full w-full p-0 md:max-w-[1600px]'>
        {/* {userRole === 'user' && ( */}
        <Container className='mx-auto flex w-full flex-col items-center'>
          <Nav />
          {children}
        </Container>
        {/* )} */}
      </div>
    </div>
  );
};

export default DashboardLayout;
