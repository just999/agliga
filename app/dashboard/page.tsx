import { getPosts } from '@/actions/get-post';
import React from 'react';
import { auth } from '@/auth';
import AnalyticsChart from '@/components/dashboard/analytics-chart';
import DashboardCard from '@/components/dashboard/dashboard-card';
import PostsTable from '@/components/posts/posts-table';

import ClientOnly from '@/lib/client-only';

import { dashboardCardItems } from '@/lib/helper';
import { Nav } from '@/components/dashboard/members/nav';
import Container from '@/components/container';

const DashboardPage = async () => {
  const session = await auth();

  const user = session?.user.curUser || {};
  const posts = await getPosts();

  const renderedMemberContainer = (
    <Container className='w-full mx-auto max-w-[960px] flex'>
      <Nav />
    </Container>
  );

  const renderedAdminContainer = (
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

  const renderedGuestContainer = (
    <div>this location reserved only for Guest/unregistered user</div>
  );

  const renderedPage = () => {
    if (!session?.user) {
      return renderedGuestContainer;
      // } else if (session?.user.role === 'user') {
      //   return renderedMemberContainer;
    } else if (session?.user.role === 'admin') {
      return renderedAdminContainer;
    }
  };

  return renderedPage();
};

export default DashboardPage;
