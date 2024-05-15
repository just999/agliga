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
import useFavoriteStore from '@/store/use-favorite-store';

type VerticalDropdownProps = {
  item: PostProps;
  currentUser?: SafeUser;
};

const VerticalDropdown = ({ item, currentUser }: VerticalDropdownProps) => {
  const postId = item.id;
  const { isFavorited, setIsFavorited } = useFavorite({
    currentUser,
    postId,
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='h-4 w-full bg-neutral-100 p-0 focus:outline-none'
        >
          <span className='sr-only '>Open menu</span>
          <MoreVertical className='h-4 w-4 focus:outline-none ' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-full flex flex-col justify-start align-middle text-xs text-center bg-stone-200 rounded-lg px-2'>
        <DropdownMenuLabel></DropdownMenuLabel>
        <DropdownMenuItem className='w-full focus:outline-none z-999'>
          <div className='flex flex-row justify-between gap-6 mx-4 my-2 '>
            <BiPencil
              className='h-4 w-4 m-0 cursor-pointer hover:text-sky-500 '
              onClick={() => console.log('edit')}
            />
            <BiCommentDots
              className='h-4 w-4 m-0 p-0 cursor-pointer hover:text-emerald-500'
              onClick={() => console.log('Comment')}
            />
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default VerticalDropdown;
