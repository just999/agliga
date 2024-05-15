import { IconProps } from '@/types';
import React from 'react';

export function Twitter({ size }: IconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 176 176'
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
        x1='80.06'
        x2='142.94'
        y1='77.65'
        y2='140.54'
        gradientUnits='userSpaceOnUse'
      >
        <stop offset='0' stopColor='#0d47a1'></stop>
        <stop offset='1' stopColor='#0d47a1' stopOpacity='0'></stop>
      </linearGradient>
      <g data-name='Layer 2'>
        <g>
          <g data-name='04.Twitter'>
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
            <path
              fill='url(#linear-gradient-3)'
              d='M164 88a76 76 0 01-76 76h-4.17l-45.06-45.06a56.79 56.79 0 0031 9.06c37.15 0 57.46-30.77 57.46-57.44 0-.89 0-1.75-.07-2.61a40.16 40.16 0 0010.11-10.48 42 42 0 01-11.63 3.19 20.06 20.06 0 008.88-11.16l28.88 28.92A75.82 75.82 0 01164 88z'
            ></path>
            <path
              fill='#fff'
              d='M137.23 57.47a42 42 0 01-11.63 3.19 20.06 20.06 0 008.88-11.16 40.32 40.32 0 01-12.8 4.89 20.18 20.18 0 00-34.92 13.8 20.87 20.87 0 00.47 4.6 57.16 57.16 0 01-41.61-21.11 20.2 20.2 0 006.21 27 19.92 19.92 0 01-9.12-2.49v.22a20.28 20.28 0 0016.17 19.82 20.13 20.13 0 01-5.29.66 18 18 0 01-3.83-.34 20.39 20.39 0 0018.87 14.06 40.59 40.59 0 01-25 8.61 36.45 36.45 0 01-4.83-.28 56.79 56.79 0 0031 9.06c37.15 0 57.46-30.77 57.46-57.44 0-.89 0-1.75-.07-2.61a40.16 40.16 0 0010.04-10.48z'
            ></path>
          </g>
        </g>
      </g>
    </svg>
  );
}
