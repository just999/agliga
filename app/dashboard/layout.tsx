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
    <div className='flex mx-auto relative'>
      <div className='hidden md:block h-[100vh] min-w-40 w-64'>
        <DashboardSidebar userId={userId} userRole={userRole} />
      </div>
      <div className='p-0 w-full h-full md:max-w-[1600px] '>
        {/* {userRole === 'user' && ( */}
        <Container className='w-full mx-auto flex flex-col items-center'>
          <Nav />
          {children}
        </Container>
        {/* )} */}
      </div>
    </div>
  );
};

export default DashboardLayout;
