import { getPosts } from '@/actions/post-actions';
import { auth } from '@/auth';
import BackButton from '@/components/back-button';
import PostsPagination from '@/components/posts/posts-pagination';
import PostsTable from '@/components/posts/posts-table';

const MainPostsPage = async () => {
  const session = await auth();

  const user = session?.user.curUser || {};
  const posts = await getPosts();
  return (
    <>
      <BackButton text='Go Back Dashboard' link='/dashboard' />
      {user && <PostsTable user={user} posts={posts} />}
      <PostsPagination />
    </>
  );
};

export default MainPostsPage;
