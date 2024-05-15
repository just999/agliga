'use client';

import { BiSearch } from 'react-icons/bi';

type NewsProps = {};

const News = () => {
  return (
    <div
      // onClick={() => onOpen('depo')}
      className='border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer '
    >
      <div className=' flex flex-row items-center justify-between '>
        <div
          onClick={() => console.log('News')}
          className='text-sm font-semibold px-6'
        >
          Berita
        </div>
        <div
          onClick={() => console.log('Post')}
          className='hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center '
        >
          Post
        </div>
        <div className=' text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3 '>
          <div className=' hidden sm:block '>{/* {guestLabel} */}</div>
          <div className=' p-2 bg-rose-500 rounded-full text-white '>
            <BiSearch />
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
