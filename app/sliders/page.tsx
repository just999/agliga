'use client';

import Container from '@/components/container';
import { HeroProps } from '@/components/hero';
import Loader from '@/components/loader';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useSliderImages } from '@/hooks/use-get-slider-images';

import useModal, { ImageSlider } from '@/hooks/use-modal';

import { fetchSliders } from '@/lib/queries/sliders';
import { useEffect, useState } from 'react';
import { BiSolidEdit } from 'react-icons/bi';
import { FcAddImage } from 'react-icons/fc';

type PageProps = {
  id: string;
  images: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

const SlidersPage = () => {
  const [images, setImages] = useState<PageProps[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      setLoading(true);
      const fetchData = async () => {
        const res = await fetchSliders();
        if (res) setImages(res);
      };
      fetchData();
    } catch (err) {
      console.error('error fetching data');
    } finally {
      setLoading(false);
    }
  }, []);

  const { onOpen, setImg } = useModal();

  const handleEditSlider = (img: ImageSlider) => {
    console.log('🚀 ~ handleEditSlider ~ img:', img);
    onOpen('edit-slider');
    setImg('edit-slider', img);
  };
  return (
    <>
      {loading &&
        Array(10)
          .fill(1)
          .map((_, i) => (
            <span
              key={i + 1}
              className='relative h-full  shadow-xl rounded-xl border-slate-600 border-1'
            >
              <Avatar className='rounded-none w-auto h-20 my-auto  bg-slate-100 '>
                <Skeleton className='w-[100px] h-[20px] rounded-lg aspect-auto  ' />
                <Skeleton className='text-stone-400 w-[100px] h-[200px] text-xs bg-slate-100'></Skeleton>
              </Avatar>
              <Skeleton className='absolute top-0 right-0 p-0 m-0 h-5 w-5 rounded-full bg-slate-50/70 text-red-500 '>
                <Skeleton className='w-[100px] h-[20px] '></Skeleton>
              </Skeleton>
            </span>
          ))}

      <Container className='relative flex flex-wrap gap-4 pt-4 '>
        {!loading &&
          images.map((img: any) => (
            <span
              key={img.id}
              className='relative h-full  shadow-xl rounded-xl border-slate-600 border-1'
            >
              <Avatar className='rounded-none w-auto h-20 my-auto  bg-slate-100 '>
                <AvatarImage
                  src={img.images}
                  className='w-auto h-18 rounded-lg aspect-auto  '
                  alt='@shadcn'
                />
                <AvatarFallback className='text-stone-400 text-xs bg-slate-100'>
                  Post image{' '}
                </AvatarFallback>
              </Avatar>
              <Button
                size='sm'
                variant='ghost'
                onClick={() => handleEditSlider(img)}
                className='absolute top-0 right-0 p-0 m-0 h-5 w-5 rounded-full bg-slate-50/70 text-red-500 '
              >
                <BiSolidEdit size={18} />
              </Button>
              {/* <pre className='text-xl '>{JSON.stringify(img, null, 2)}</pre> */}
            </span>
          ))}
        <Button
          size='sm'
          variant='ghost'
          onClick={() => onOpen('add-slider')}
          className='w-32 h-20 m-0  shadow-xl bg-zinc-200'
        >
          <Avatar className='rounded-none w-32 h-20 my-auto shadow-xl px-2 bg-slate-100 '>
            <AvatarImage
              src={''}
              className='w-full h-auto rounded-lg aspect-auto bg-green-300 '
              alt='@shadcn'
            />
            <AvatarFallback className='text-stone-400 text-xs bg-sky-100'>
              <FcAddImage size={70} />
            </AvatarFallback>
          </Avatar>
        </Button>
      </Container>
    </>
  );
};

export default SlidersPage;
