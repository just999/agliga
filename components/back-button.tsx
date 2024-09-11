'use client';

import { ArrowLeftCircle } from 'lucide-react';
import Link from 'next/link';

type BackButtonProps = {
  text: string;
  link: string;
};

const BackButton = ({ text, link }: BackButtonProps) => {
  return (
    <Link
      href={link}
      className='text-blue-500 hover:underline hover:text-blue-400/80 flex items-center gap-1 font-bold mb-5 px-2'>
      <ArrowLeftCircle size={18} /> {text}
    </Link>
  );
};

export default BackButton;
