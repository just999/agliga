'use client';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from '@radix-ui/react-dropdown-menu';
import { MoreVertical, Pencil } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { PostProps, SafeUser } from '@/types';
import { BiCommentDots, BiDislike, BiLike, BiPencil } from 'react-icons/bi';
import useFavorite from '@/hooks/use-favorite';
import { useStore } from 'zustand';
// import useFavoriteStore from '@/store/use-favorite-store';
import { BsTrash, BsPen } from 'react-icons/bs';
import useModal from '@/hooks/use-modal';

type VerticalDropdownProps = {
  item: PostProps;
  currentUser?: SafeUser;
  title?: string;
};

const VerticalDropdown = ({
  item,
  currentUser,
  title,
}: VerticalDropdownProps) => {
  // const postId = item.id;
  // const { isFavorited, setIsFavorited } = useFavorite({
  //   currentUser,
  //   postId,
  // });
  // const { addFavoritePost, favoritePosts } = useStore(useFavoriteStore);
  // const favoritePosts = store.favoritePosts;
  // const handleToggleLike = (e: React.MouseEvent<SVGElement>) => {
  //   const favPostIds = currentUser;
  //   setIsFavorited(true);
  //   toggleLike(e);
  //   if (isFavorited) {
  //     addFavoritePost(postId);
  //   }
  // };
  // const handleToggleDislike = (e: React.MouseEvent<SVGElement>) => {
  //   setIsFavorited(false);
  //   toggleDislike(e);
  // };
  const { onOpen } = useModal();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='h-4  bg-neutral-100 p-0 focus:outline-none'
        >
          <span className='sr-only '>Open menu</span>
          <MoreVertical className='h-4 w-4 ' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-full flex flex-col justify-start align-middle text-xs text-center bg-stone-200 rounded-lg px-2'>
        <DropdownMenuLabel></DropdownMenuLabel>
        <div>
          <DropdownMenuItem className='w-full focus:outline-none'>
            <div className='flex flex-row justify-between gap-6 mx-4 my-2 '>
              {/* <Button
                variant='outline'
                size='sm'
                type='button'
                onClick={() => onOpen('delete', item.id)}
                className='text-neutral-400 hover:text-black hover:font-bold hover:bg-red-400/20 hover:shadow-lg bg-slate-100 '
              > */}
              <BsTrash
                className='text-neutral-400 h-4 w-4 m-0 p-0 cursor-pointer hover:text-red-500 hover:font-bold hover:shadow-lg '
                onClick={() =>
                  onOpen('delete', item.id, (title = 'Delete post'))
                }
              />
              {/* </Button> */}
              {/* <Button
                onClick={() => onOpen('edit', item.id)}
                variant='outline'
                size='sm'
                type='button'
                className='text-neutral-400 hover:text-black hover:font-bold hover:bg-sky-400/20 hover:shadow-lg  bg-slate-100  '
              > */}
              <BsPen
                className='text-neutral-400  hover:font-bold h-4 w-4 m-0 cursor-pointer hover:text-sky-500  hover:shadow-lg'
                onClick={() => onOpen('edit', item.id, (title = 'Edit post'))}
              />
              {/* </Button> */}
            </div>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default VerticalDropdown;
