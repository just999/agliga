import { IconProps } from '@/types/types';
import React from 'react';

export function Facebook({ size }: IconProps) {
  // const iconSize = size;
  if (typeof size === 'string') return parseInt(size);

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      width={size}
      height={size}
      viewBox={`0 0 176 176`}
    >
      <linearGradient
        id='linear-gradient'
        x1='25.77'
        x2='150.23'
        y1='25.77'
        y2='150.23'
        gradientUnits='userSpaceOnUse'
      >
        <stop offset='0' stopColor='#03a9f4'></stop>
        <stop offset='0.73' stopColor='#0a62b8'></stop>
        <stop offset='1' stopColor='#0d47a1'></stop>
      </linearGradient>
      <linearGradient
        id='linear-gradient-2'
        x1='34.26'
        x2='141.74'
        y1='34.26'
        y2='141.74'
        gradientUnits='userSpaceOnUse'
      >
        <stop offset='0' stopColor='#0d47a1'></stop>
        <stop offset='0.27' stopColor='#0a62b8'></stop>
        <stop offset='1' stopColor='#03a9f4'></stop>
      </linearGradient>
      <linearGradient
        id='linear-gradient-3'
        x1='81.87'
        x2='144.75'
        y1='75.84'
        y2='138.72'
        gradientUnits='userSpaceOnUse'
      >
        <stop offset='0' stopColor='#0d47a1'></stop>
        <stop offset='0.54' stopColor='#0d47a1' stopOpacity='0.44'></stop>
        <stop offset='1' stopColor='#0d47a1' stopOpacity='0'></stop>
      </linearGradient>
      <linearGradient
        id='linear-gradient-4'
        x1='69.8'
        x2='81.21'
        y1='90.06'
        y2='101.46'
        xlinkHref='#linear-gradient-3'
      ></linearGradient>
      <g data-name='Layer 2'>
        <g>
          <g data-name='01.Facebook'>
            <g>
              <circle
                cx='88'
                cy='88'
                r='88'
                fill='url(#linear-gradient)'
              ></circle>
              <circle
                cx='88'
                cy='88'
                r='76'
                fill='url(#linear-gradient-2)'
              ></circle>
            </g>
            <g>
              <path
                fill='url(#linear-gradient-3)'
                d='M162.69 102.06a76.09 76.09 0 01-51 58.18l-32.6-32.58a2.5 2.5 0 001.45.34h12.52c1.72 0 2.26-.55 2.26-2.29V93.17H107c1.65 0 2.17-.52 2.17-2.15V78.96c0-1.65-.56-2.21-2.2-2.21H95.35v-9c0-2.8 1.43-4.13 4.14-4.13s5.37-.09 8.06-.11c1.44 0 2-.6 2-2V50.1a2.12 2.12 0 00-.45-1.5z'
              ></path>
              <path
                fill='url(#linear-gradient-4)'
                d='M78.44 93.17v11.06L67 92.83a2.62 2.62 0 001.46.34z'
              ></path>
            </g>
            <path
              fill='#fff'
              d='M78.44 93.17H68.5c-1.56 0-2.12-.57-2.12-2.14V78.9c0-1.56.59-2.15 2.13-2.15h9.93V68a21.89 21.89 0 012.73-11.26 16.51 16.51 0 018.93-7.42A21.91 21.91 0 0197.75 48h9.83c1.41 0 2 .62 2 2v11.41c0 1.43-.6 2-2 2-2.69 0-5.38 0-8.06.11s-4.14 1.33-4.14 4.13c-.06 3 0 5.94 0 9h11.58c1.64 0 2.2.56 2.2 2.21v12.06c0 1.63-.52 2.14-2.17 2.15H95.32v32.54c0 1.74-.54 2.29-2.26 2.29H80.54c-1.51 0-2.1-.59-2.1-2.1z'
            ></path>
          </g>
        </g>
      </g>
    </svg>
  );
}
