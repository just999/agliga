import { IconProps } from '@/types/types';
import React from 'react';

export function Instagram({ size }: IconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      data-name='Layer 1'
      viewBox='0 0 512 512'
    >
      <linearGradient
        id='linear-gradient'
        x1='79.223'
        x2='432.777'
        y1='432.777'
        y2='79.223'
        gradientUnits='userSpaceOnUse'
      >
        <stop offset='0' stopColor='#d6b43d'></stop>
        <stop offset='0.051' stopColor='#dba93f'></stop>
        <stop offset='0.143' stopColor='#e88a45'></stop>
        <stop offset='0.164' stopColor='#eb8246'></stop>
        <stop offset='0.211' stopColor='#e7774d'></stop>
        <stop offset='0.294' stopColor='#dd5860'></stop>
        <stop offset='0.31' stopColor='#db5164'></stop>
        <stop offset='0.464' stopColor='#d2466c'></stop>
        <stop offset='0.567' stopColor='#c93b73'></stop>
        <stop offset='0.607' stopColor='#cb3179'></stop>
        <stop offset='0.733' stopColor='#a23394'></stop>
        <stop offset='0.856' stopColor='#7f35ab'></stop>
        <stop offset='0.91' stopColor='#7d35ab'></stop>
        <stop offset='0.94' stopColor='#7537aa'></stop>
        <stop offset='0.964' stopColor='#673aa9'></stop>
        <stop offset='0.985' stopColor='#533da8'></stop>
        <stop offset='1' stopColor='#4041a6'></stop>
      </linearGradient>
      <linearGradient
        id='linear-gradient-2'
        x1='127.429'
        x2='432.776'
        y1='127.429'
        y2='432.777'
        gradientUnits='userSpaceOnUse'
      >
        <stop offset='0' stopColor='#1d1d1b'></stop>
        <stop offset='0.369' stopColor='#1d1d1b' stopOpacity='0.856'></stop>
        <stop offset='0.75' stopColor='#1d1d1b' stopOpacity='0.429'></stop>
        <stop offset='1' stopColor='#1d1d1b' stopOpacity='0'></stop>
      </linearGradient>
      <circle cx='256' cy='256' r='250' fill='url(#linear-gradient)'></circle>
      <path
        fill='url(#linear-gradient-2)'
        d='M505.888 248.748L385.257 128.116c-17.489-17.3-41.038-23.746-65.035-24.933H191.778c-24 1.187-47.546 7.63-65.035 24.933-17.322 17.138-24 40.576-25.2 64.344v127.08c1.2 23.768 7.879 47.206 25.2 64.343l122.005 122.005c2.409.068 4.826.112 7.252.112 138.071 0 250-111.929 250-250 0-2.427-.044-4.843-.112-7.252zM193.4 379.862c-16.281-.447-34.738-4.5-46.338-16.89-12.054-12.88-16.542-28.441-17.071-45.846 0 0-.812-91.7 0-122.253.462-17.406 5.017-32.966 17.071-45.845 11.6-12.394 30.057-16.443 46.338-16.89 31.286-.859 93.906-.859 125.192 0 16.281.447 34.738 4.5 46.338 16.89 12.054 12.879 16.609 28.439 17.071 45.845v1.541l-32.771-32.775a16.275 16.275 0 10-23.017 23.016l55.792 55.792v24.476l-68.464-68.464A81.375 81.375 0 00198.46 313.54l66.953 66.954c-26.462.065-54.271-.146-72.013-.632z'
        opacity='0.49'
      ></path>
      <g fill='#fff'>
        <path d='M410.458 192.46c-1.2-23.768-7.879-47.206-25.2-64.344-17.489-17.3-41.038-23.746-65.035-24.933H191.778c-24 1.187-47.546 7.63-65.035 24.933-17.322 17.138-24 40.576-25.2 64.344v127.079c1.2 23.769 7.879 47.207 25.2 64.344 17.489 17.3 41.038 23.746 65.035 24.934h128.444c24-1.188 47.546-7.63 65.035-24.934 17.322-17.137 24-40.575 25.2-64.344zM130 194.874c.462-17.407 5.017-32.967 17.071-45.846 11.6-12.394 30.057-16.443 46.338-16.89 31.286-.858 93.906-.858 125.192 0 16.281.447 34.738 4.5 46.338 16.89 12.054 12.879 16.609 28.439 17.071 45.846v122.252c-.462 17.407-5.017 32.967-17.071 45.846-11.6 12.394-30.057 16.443-46.338 16.89-31.286.858-93.906.858-125.192 0-16.281-.447-34.738-4.5-46.338-16.89-12.054-12.879-16.542-28.441-17.071-45.846 0 0-.817-91.7 0-122.252z'></path>
        <circle cx='337.722' cy='175.147' r='16.275'></circle>
        <path d='M256 174.624A81.375 81.375 0 10337.375 256 81.375 81.375 0 00256 174.624zm0 133.876a52.5 52.5 0 1152.5-52.5 52.5 52.5 0 01-52.5 52.5z'></path>
      </g>
    </svg>
  );
}
