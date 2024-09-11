import { getPosts } from '@/actions/get-post';

import { auth } from '@/auth';
import AnalyticsChart from '@/components/dashboard/analytics-chart';
import DashboardCard from '@/components/dashboard/dashboard-card';
import PostsTable from '@/components/posts/posts-table';

import ClientOnly from '@/lib/client-only';

import { dashboardCardItems } from '@/lib/helper';

const DashboardPage = async () => {
  const session = await auth();

  const user = session?.user.curUser || {};
  const posts = await getPosts();
  return (
    <>
      <div className='flex flex-col md:flex-row justify-between gap-5 px-5 mb-5'>
        {dashboardCardItems.map((item) => (
          <DashboardCard
            key={item.title}
            title={item.title}
            icon={item.icon}
            count={item.count}
          />
        ))}
      </div>
      <AnalyticsChart />
      {user && (
        <PostsTable title='Latest Posts' limit={5} user={user} posts={posts} />
      )}
    </>
  );
};

export default DashboardPage;
