'use client';

import Link from 'next/link';
import Logo from './navbar/logo';
import Image from 'next/image';

type FooterProps = {};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='bg-neutral-50 py-4 mt-auto absolute bottom-0 w-full'>
      <div className='container mx-auto flex flex-row md:flex-row items-center justify-between px-4'>
        <div className='mb-4 md:mb-0'>
          <Image
            src='/logo.svg'
            alt='Logo'
            height={40}
            width={100}
            priority
            className='h-12 w-auto  p-2 rounded-full shadow-sm'
          />
        </div>
        <div className='flex flex-wrap justify-center md:justify-start mb-4 md:mb-0'>
          <ul className='flex space-x-4'>
            <li>
              <Link href='/'>Agen Liga</Link>
            </li>
            <li>
              <Link href='/'>Terms of Service</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className='text-sm text-gray-500 mt-2 md:mt-0'>
            © {currentYear} Agen-Liga. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
