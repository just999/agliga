import { IconProps } from '@/types';
import React from 'react';

export function Whatsapp({ size }: IconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
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
        <stop offset='0' stopColor='#57c75c'></stop>
        <stop offset='1' stopColor='#1b5e20'></stop>
      </linearGradient>
      <linearGradient
        id='linear-gradient-2'
        x1='34.26'
        x2='141.74'
        y1='34.26'
        y2='141.74'
        gradientUnits='userSpaceOnUse'
      >
        <stop offset='0' stopColor='#1b5e20'></stop>
        <stop offset='1' stopColor='#4caf50'></stop>
      </linearGradient>
      <linearGradient
        id='linear-gradient-3'
        x1='83.55'
        x2='136.95'
        y1='93.12'
        y2='146.52'
        gradientUnits='userSpaceOnUse'
      >
        <stop offset='0' stopColor='#1b5e20'></stop>
        <stop offset='1' stopColor='#1b5e20' stopOpacity='0'></stop>
      </linearGradient>
      <linearGradient
        id='linear-gradient-4'
        x1='66.79'
        x2='104.67'
        y1='71.28'
        y2='109.16'
        xlinkHref='#linear-gradient-3'
      ></linearGradient>
      <g data-name='Layer 2'>
        <g>
          <g data-name='09.Whatsapp'>
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
                d='M162 105.44A76 76 0 0188.32 164l-37.69-37.69L66 121.39a40 40 0 0050.61-61.32z'
              ></path>
              <path
                fill='url(#linear-gradient-4)'
                d='M109.26 104.57l-4.26 4.26c-4.48 4.48-16.36-.45-26.89-11S62.86 75.43 67.12 71l4.26-4.26a4.47 4.47 0 016.05 0L83.71 73a4.17 4.17 0 01-1.57 6.94 4.07 4.07 0 00-2.69 4.94c1.12 4.7 7.17 10.53 11.66 11.65A4.27 4.27 0 0096 93.81a4.18 4.18 0 017-1.57l6.27 6.28a4.47 4.47 0 01-.01 6.05z'
              ></path>
            </g>
            <path
              fill='#fff'
              d='M88 48a40 40 0 00-32.38 63.45l-5 14.86L66 121.39A40 40 0 1088 48zm21.25 56.57l-4.25 4.26c-4.48 4.48-16.36-.45-26.89-11S62.86 75.43 67.12 71l4.26-4.26a4.47 4.47 0 016.05 0L83.71 73a4.17 4.17 0 01-1.57 6.94 4.07 4.07 0 00-2.69 4.94c1.12 4.7 7.17 10.53 11.66 11.65A4.27 4.27 0 0096 93.81a4.18 4.18 0 017-1.57l6.27 6.28a4.47 4.47 0 01-.01 6.05z'
            ></path>
          </g>
        </g>
      </g>
    </svg>
  );
}
