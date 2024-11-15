import React from 'react';

import { getPosts } from '@/actions/get-post';
import { auth } from '@/auth';
import Container from '@/components/container';
import AnalyticsChart from '@/components/dashboard/analytics-chart';
import DashboardCard from '@/components/dashboard/dashboard-card';
import { Nav } from '@/components/dashboard/members/nav';
import PostsTable from '@/components/posts/posts-table';
import { dashboardCardItems } from '@/lib/helper';

const DashboardPage = async () => {
  const session = await auth();

  const user = session?.user.curUser || {};
  const posts = await getPosts();

  const renderedMemberContainer = (
    <Container className='mx-auto flex w-full max-w-[960px]'>
      <Nav />
    </Container>
  );

  const renderedAdminContainer = (
    <>
      <div className='mb-5 flex flex-col justify-between gap-5 px-5 md:flex-row'>
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
