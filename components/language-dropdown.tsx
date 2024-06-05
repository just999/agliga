'use client';

import { GrLanguage } from 'react-icons/gr';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Noto_Color_Emoji } from 'next/font/google';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { cn } from '@/lib/utils';

type LanguageDropdownProps = {};

const noto = Noto_Color_Emoji({
  subsets: ['emoji'],
  weight: ['400'],
  preload: true,
});

const LanguageDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='sm'>
          <span className='text-[10px] mr-2'>Eng</span>
          <GrLanguage />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <Select>
          <SelectTrigger className='w-[180px] text-[10px] h-6 '>
            <SelectValue placeholder='🌐  Language' className='text-center' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='english' className='text-[10px] cursor-pointer'>
              <span className={cn(noto.className, 'mr-2')}>🇬🇧</span> English
            </SelectItem>
            <SelectItem
              value='indonesia'
              className='text-[10px] cursor-pointer'
            >
              <span className={cn(noto.className, 'mr-2')}>🇮🇩</span> Indonesia
            </SelectItem>
            <SelectItem
              value='vietnamese'
              className='text-[10px] cursor-pointer'
            >
              <span className={cn(noto.className, 'mr-2')}>🇻🇳</span> tiếng Việt
            </SelectItem>
            <SelectItem value='china' className='text-[10px] cursor-pointer'>
              <span className={cn(noto.className, 'mr-2')}>🇨🇳</span> 中文
            </SelectItem>
          </SelectContent>
        </Select>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageDropdown;
