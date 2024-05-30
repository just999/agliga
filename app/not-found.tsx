'use client';

import Loader from '@/components/loader';
import Link from 'next/link';
import { Suspense } from 'react';
import { BsChevronDoubleLeft, BsExclamationTriangle } from 'react-icons/bs';

const NotFoundPage = () => {
  return (
    <div className='flex flex-row items-center justify-center h-full '>
      <div className='flex flex-col w-full justify-center items-center '>
        <div className='icon'>
          <BsExclamationTriangle size={50} className='text-rose-600 ' />
        </div>
        <div className='news text-7xl '>Page Not Found!</div>
        <Link
          href='/'
          className='cursor-pointer text-3xl flex flex-row items-center mt-10 bg-sky-50 px-3 py-2 rounded-md hover:bg-sky-50/40 hover:text-blue-600 '
        >
          <Suspense fallback={<Loader />}>
            <BsChevronDoubleLeft /> Back to Main Page
          </Suspense>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
