'use client';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from '@radix-ui/react-dropdown-menu';
import { MoreVertical } from 'lucide-react';
import { Button } from '../ui/button';

import { PostProps, SafeUser } from '@/types';

// import useFavoriteStore from '@/store/use-favorite-store';
import { BsTrash, BsPen } from 'react-icons/bs';
import useModal, { ImageSlider } from '@/hooks/use-modal';
import { useParams } from 'next/navigation';
import { Slider } from '@prisma/client';
import { cn } from '@/lib/utils';

type VerticalDropdownProps = {
  item?: PostProps;
  currentUser?: SafeUser;
  title?: string;
  img?: Slider;
  className?: string;
};

const VerticalDropdown = ({
  item,
  currentUser,
  title,
  img,
  className,
}: VerticalDropdownProps) => {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : item?.id;

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
  const { onOpen, modalType, setImg } = useModal();

  const handleEditSlider = (img: any) => {
    onOpen('edit-slider');
    setImg('edit-slider', img);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={cn(className, 'z-99')}>
        <Button
          variant='ghost'
          className='h-4 p-0 focus:outline-none hover:text-emerald-700 hover:bg-stone-200'
        >
          <span className='sr-only '>Open menu</span>
          <MoreVertical className='h-5 w-5 text-slate-500  ' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='w-full flex flex-col bg-slate-200 justify-between  text-xs text-center  rounded-lg  mx-2 my-1'
      >
        <DropdownMenuLabel></DropdownMenuLabel>
        <DropdownMenuItem className='w-full focus:outline-none'>
          <div className='flex flex-row justify-between w-full gap-2 px-2 py-1'>
            {/* <Button
                variant='outline'
                size='sm'
                type='button'
                onClick={() => onOpen('delete', item.id)}
                className='text-neutral-400 hover:text-black hover:font-bold hover:bg-red-400/20 hover:shadow-lg bg-slate-100 '
              > */}
            {item?.id && (
              <BsTrash
                className='text-neutral-400 h-4 w-4 m-0 p-0 cursor-pointer hover:text-red-500 hover:font-bold hover:shadow-lg '
                onClick={() =>
                  onOpen('delete', item?.id, (title = 'Delete post'))
                }
              />
            )}
            {img?.id && (
              <BsTrash
                className='text-gray-700 h-3 w-3 m-0 p-0 cursor-pointer hover:text-red-500 hover:font-bold hover:shadow-lg '
                onClick={() =>
                  onOpen(
                    'delete-slider',
                    img?.id,
                    (title = 'Delete image slider')
                  )
                }
              />
            )}
            {/* </Button> */}
            {/* <Button
                onClick={() => onOpen('edit', item.id)}
                variant='outline'
                size='sm'
                type='button'
                className='text-neutral-400 hover:text-black hover:font-bold hover:bg-sky-400/20 hover:shadow-lg  bg-slate-100  '
              > */}
            {item?.id && (
              <BsPen
                className='text-neutral-400  hover:font-bold h-4 w-4 m-0 cursor-pointer hover:text-sky-500  hover:shadow-lg'
                onClick={() => onOpen('edit', id, (title = 'Edit post'))}
              />
            )}
            {img?.id && (
              <BsPen
                className='text-gray-700  hover:font-bold h-3 w-3 m-0 cursor-pointer hover:text-sky-500  hover:shadow-lg'
                onClick={() => handleEditSlider(img)}
              />
            )}
            {/* </Button> */}
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default VerticalDropdown;
