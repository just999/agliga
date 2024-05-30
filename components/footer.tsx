'use client';

import Link from 'next/link';
import Logo from './navbar/logo';

type FooterProps = {};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='bg-neutral-50 py-4 mt-auto fixed bottom-0 w-full left-0'>
      <div className='container mx-auto flex flex-row md:flex-row items-center justify-between px-10'>
        <div className='mb-4 md:mb-0'>
          <Logo
            className='w-30 h-auto'
            styles={{ width: '70%', height: 'auto' }}
          />
        </div>
        <div className='flex flex-wrap justify-center md:justify-start mb-4 md:mb-0'>
          <ul className='flex space-x-4 text-xs'>
            <li>
              <Link href='/'>AgenLiga</Link>
            </li>
            <li>
              <Link href='/'>Terms of Service</Link>
            </li>
            <li>
              <Link href='/sitemap'>Sitemap</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className='flex flex-row  items-center justify-center gap-1 text-sm text-gray-500 mt-2 md:mt-0'>
            © {currentYear}{' '}
            <Logo
              className='w-10 h-auto '
              styles={{ width: '8%', height: 'auto' }}
            />
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
