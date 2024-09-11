import { getAuthUserId, getUserRole } from '@/actions/auth-actions';

import DashboardSidebar from '@/components/dashboard/dashboard-sidebar';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const userId = await getAuthUserId();
  const userRole = await getUserRole();
  return (
    <div className='flex mx-auto'>
      <div className='hidden md:block h-[100vh] min-w-40 w-64'>
        <DashboardSidebar userId={userId} userRole={userRole} />
      </div>
      <div className='p-0 w-full h-[60vh] md:max-w-[1600px] '>{children}</div>
    </div>
  );
};

export default DashboardLayout;
