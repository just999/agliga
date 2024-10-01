// 'use client';

// import { getAllSliders } from '@/actions/slider-actions';
// import Container from '@/components/container';

// import EditDeletePostButton from '@/components/posts/edit-delete-post-button';
// import { HeadingLogo } from '@/components/ui';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Button } from '@/components/ui/button';
// import { Skeleton } from '@/components/ui/skeleton';
// import useFormTypes from '@/hooks/use-form-types';

// import useModal from '@/hooks/use-modal';

// import { fetchSliders } from '@/lib/queries/sliders';
// import { useEffect, useState } from 'react';

// import { FcAddImage } from 'react-icons/fc';

// type SlidersProps = {
//   id: string;
//   images: string;
//   userId: string;
//   createdAt: Date;
//   updatedAt: Date;
// };

// const Sliders = () => {
//   const [images, setImages] = useState<SlidersProps[]>([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     try {
//       setLoading(true);
//       const fetchData = async () => {
//         const res = await getAllSliders();
//         if (res.data) setImages(res.data);
//       };
//       fetchData();
//     } catch (err) {
//       console.error('error fetching data');
//     } finally {
//       setLoading(false);
//     }
//   }, [setImages]);

//   const { formType, setOn } = useFormTypes((state) => ({
//     formType: state.formType,
//     setOn: state.setOn,
//   }));
//   // const handleEditSlider = (img: ImageSlider) => {
//   //   onOpen('edit-slider');
//   //   setImg('edit-slider', img);
//   // };
//   return (
//     <>
//       {loading &&
//         Array(10)
//           .fill(1)
//           .map((_, i) => (
//             <span
//               key={i + 1}
//               className='relative h-full  shadow-xl rounded-xl border-slate-600 border-1'>
//               <Avatar className='rounded-none w-auto h-20 my-auto  bg-slate-100 '>
//                 <Skeleton className='w-[100px] h-[20px] rounded-lg aspect-auto  ' />
//                 <Skeleton className='text-stone-400 w-[100px] h-[200px] text-xs bg-slate-100'></Skeleton>
//               </Avatar>
//               <Skeleton className='absolute top-0 right-0 p-0 m-0 h-5 w-5 rounded-full bg-slate-50/70 text-red-500 '>
//                 <Skeleton className='w-[100px] h-[20px] '></Skeleton>
//               </Skeleton>
//             </span>
//           ))}

//       <HeadingLogo
//         center
//         title='Hero Slider'
//         subtitle='Max image slider is 20 images'
//       />
//       <Container className='relative flex flex-wrap gap-4 pt-4 '>
//         {!loading &&
//           images.map((img: SlidersProps, i) => (
//             <span
//               key={img.id}
//               className='relative h-[80px]  rounded-xl border-slate-600 border-1 group cursor-pointer'>
//               <Avatar className='rounded-none w-auto h-20 my-auto  bg-slate-100 '>
//                 <AvatarImage
//                   src={img.images}
//                   className='w-auto h-18 rounded-lg aspect-auto  '
//                   alt='@shadcn'
//                 />
//                 <AvatarFallback className='text-stone-400 text-xs bg-slate-100'>
//                   Post image{' '}
//                 </AvatarFallback>
//               </Avatar>
//               {/* <Button
//                 size='sm'
//                 variant='ghost'
//                 onClick={() => handleEditSlider(img)}
//                 className='absolute top-0 right-0 p-0 m-0 h-5 w-5 rounded-full bg-slate-50/70 text-red-500 '
//               >
//                 <BiSolidEdit size={18} />
//               </Button> */}
//               <span className='absolute invisible group-hover:visible top-0 left-0 text-gray-100 px-1 text-xs bg-stone-100/20 rounded-full'>
//                 {i + 1}
//               </span>
//               <EditDeletePostButton
//                 img={img}
//                 className='top-0 right-0 p-0 m-0 h-5 w-5 '
//                 className2='absolute invisible group-hover:visible top-0 right-0 p-0 m-0 h-5 w-5  text-slate-50  hover:border hover:border-solid hover:border-amber-100/50 hover:bg-slate-50/50'
//               />
//               {/* <pre className='text-xl '>{JSON.stringify(img, null, 2)}</pre> */}
//             </span>
//           ))}
//         {images.length < 20 ? (
//           <Button
//             size='sm'
//             variant='ghost'
//             onClick={() => setOn('add-slider')}
//             className='w-32 h-20 m-0  shadow-xl bg-zinc-200'>
//             <Avatar className='rounded-none w-32 h-20 my-auto shadow-xl px-2 bg-slate-100 '>
//               <AvatarImage
//                 src={''}
//                 className='w-full h-auto rounded-lg aspect-auto bg-green-300 '
//                 alt='@shadcn'
//               />
//               <AvatarFallback className='text-stone-400 text-xs bg-sky-100'>
//                 <FcAddImage size={70} />
//               </AvatarFallback>
//             </Avatar>
//           </Button>
//         ) : (
//           <span />
//         )}
//       </Container>
//     </>
//   );
// };

// export default Sliders;

'use client';

// Import necessary items
import React from 'react';
import { getAllSliders } from '@/actions/slider-actions';
import Container from '@/components/container';
import EditDeletePostButton from '@/components/posts/edit-delete-post-button';
import { HeadingLogo } from '@/components/ui';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';
import { FcAddImage } from 'react-icons/fc';

// Import your zustand store
import useFormTypes from '@/hooks/use-form-types';
import SliderForm from '@/app/dashboard/admin/sliders/slider-form';
import EditDeleteButton from '../ui/edit-delete-button';
import SliderEditDeleteForm from '@/app/dashboard/admin/sliders/[sliderId]/SliderEditDeleteForm';
import { useQuery } from '@tanstack/react-query';

type SlidersProps = {
  id: string;
  images: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

const Sliders = () => {
  const [images, setImages] = useState<SlidersProps[] | []>([]);
  // const [loading, setLoading] = useState(false);

  const { setOn, formType, isOn, setOff, setImg } = useFormTypes((state) => ({
    formType: state.formType,
    isOn: state.isOn,
    setOn: state.setOn,
    setOff: state.setOff,
    setImg: state.setImg,
  }));

  const { data, isError, isLoading } = useQuery({
    queryKey: ['sliders'],
    queryFn: async () => {
      const res = await getAllSliders();
      if (res.status === 'success') {
        return {
          status: 'success',
          data: res.data,
        };
      } else {
        return res;
      }
    },
    staleTime: 2000,
  });
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);
  //       const res = await getAllSliders();
  //       if (res.status === 'success' && res.data) {
  //         setImages(res.data);
  //       }
  //     } catch (err) {
  //       console.error('Error fetching data:', err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [setLoading, setImages]);

  useEffect(() => {
    if (data?.data) setImages(data.data);
  }, [data]);
  // Function to open the form for adding a new slider
  const handleAddSlider = () => {
    setOn('add-slider');
  };

  // Function to open the form for editing a specific slider
  const handleEditSlider = (img: SlidersProps) => {
    if (img) {
      setOn('edit-slider', '_', '_', img);
      setImg('edit-slider', img);
    }
  };
  return (
    <>
      {isLoading &&
        Array(10)
          .fill(1)
          .map((_, i) => (
            <span
              key={i + 1}
              className='relative h-full  shadow-xl rounded-xl border-slate-600 border-1'>
              <Avatar className='rounded-none w-auto h-20 my-auto  bg-slate-100 '>
                <Skeleton className='w-[100px] h-[20px] rounded-lg aspect-auto  ' />
                <Skeleton className='text-stone-400 w-[100px] h-[200px] text-xs bg-slate-100'></Skeleton>
              </Avatar>
              <Skeleton className='absolute top-0 right-0 p-0 m-0 h-5 w-5 rounded-full bg-slate-50/70 text-red-500 '>
                <Skeleton className='w-[100px] h-[20px] '></Skeleton>
              </Skeleton>
            </span>
          ))}

      <HeadingLogo
        center
        title='Hero Slider'
        subtitle='Max image slider is 20 images'
      />
      <Container className='relative flex flex-col gap-4 pt-4 '>
        <div className='flex flex-wrap gap-4 items-center '>
          {!isLoading &&
            images.map((img, i) => (
              <span
                key={img.id}
                className='relative h-[80px]  rounded-xl border-slate-600 border-1 group cursor-pointer'>
                <Avatar className='rounded-none w-auto h-20 my-auto  bg-slate-100 '>
                  <AvatarImage
                    src={img.images}
                    className='w-auto h-18 rounded-lg aspect-auto  '
                    alt={`Slider ${i + 1}`}
                  />
                  <AvatarFallback className='text-stone-400 text-xs bg-slate-100'>
                    {i + 1}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size='sm'
                  variant='ghost'
                  onClick={() => handleEditSlider(img)}>
                  {/* Include your edit icon if necessary */}
                  <span className='absolute invisible group-hover:visible top-0 left-0.5 text-black px-1 text-[10px] bg-stone-300/60 rounded-full'>
                    {i + 1}
                  </span>
                </Button>
                <EditDeleteButton
                  img={img}
                  className='top-0 right-0 p-0 m-0 h-5 w-5 rounded-full'
                  className2='absolute invisible group-hover:visible top-0 right-0 p-0 m-0 h-5 w-5  text-slate-50  hover:border hover:border-solid hover:border-amber-100/50 bg-stone-300/60 hover:bg-slate-50/50'
                />
              </span>
            ))}
        </div>
        {images.length < 20 && !formType ? (
          <Button
            size='sm'
            variant='ghost'
            onClick={handleAddSlider}
            className='w-32 h-20 m-0 shadow-xl bg-zinc-200'>
            <Avatar className='rounded-none w-32 h-20 my-auto shadow-xl px-2 bg-slate-100 '>
              <AvatarImage
                src=''
                className='w-full h-auto rounded-lg aspect-auto bg-green-300 '
                alt='Add Slider'
              />
              <AvatarFallback className='text-stone-400 text-xs bg-sky-100'>
                <FcAddImage size={70} />
              </AvatarFallback>
            </Avatar>
          </Button>
        ) : formType === 'add-slider' ? (
          <SliderForm />
        ) : formType === 'delete-slider' || formType === 'edit-slider' ? (
          <SliderEditDeleteForm />
        ) : (
          ''
        )}
      </Container>
    </>
  );
};

export default Sliders;
