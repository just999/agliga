import Image from 'next/image';
import { BsDot, BsTrash, BsPen } from 'react-icons/bs';
import { Button } from '../ui/button';
import PostAuthor from './post-author';
import { PostProps } from '@/types';

import CommentsList from './comments/comments-list';

import CommentCreateForm from './comments/comment-create-form';
import EditDeletePostButton from './edit-delete-post-button';
// import ClientOnly from '@/lib/client-only';

type PostShowProps = {
  item?: PostProps;
  postId?: string;
};

const PostShow = ({ item }: PostShowProps) => {
  if (!item) return 'no post';

  // const slug = item.category;

  return (
    <>
      <div className='single-post bg-neutral-100  w-full pb-2 rounded-lg'>
        <div className='post-meta flex items-center pt-4 text-xs text-neutral-400  '>
          <span className='date text-gray-500 mr-2'>{item.category}</span>
          <span className='mx-1 '>
            <BsDot />
          </span>
          <span>{new Date(item.date).toLocaleDateString('en-US')}</span>
        </div>
        <EditDeletePostButton item={item} />

        <p className='bg-slate-50/80 '>
          <span className='firstcharacter text-2xl font-bold first-letter:text-blue-500'>
            {item.brief && item.brief.charAt(0)}
          </span>
          {item.brief && item.brief.substring(1)}
        </p>
        <figure className='my-4 p-0 '>
          {item.img && (
            <Image
              src={item.img}
              alt='image'
              height={571}
              width={900}
              // sizes='(max-width: 1024px) 100vw, 100vw'
              priority
              className='mx-auto w-full h-auto object-cover rounded-lg shadow-lg m-0 p-0'
              // style={{
              //   width: '100%',
              //   height: 'auto',
              // }}
            />
          )}
          <figcaption className='text-gray-500 '>
            {item.brief && item.brief.substring(0, 250)}...
            <PostAuthor item={item} />
          </figcaption>
        </figure>
      </div>
      {/* <CommentCreateForm postId={item.id} />
      <CommentsList postId={item.id} /> */}
      {/* <CommentContainer id={id} slug={slug} /> */}
    </>
  );
};

export default PostShow;
