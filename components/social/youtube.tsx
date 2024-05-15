import { IconProps } from '@/types';
import React from 'react';

export function Youtube({ size }: IconProps) {
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
        <stop offset='0' stopColor='#f55244'></stop>
        <stop offset='0.87' stopColor='#d90b09'></stop>
        <stop offset='1' stopColor='#d50000'></stop>
      </linearGradient>
      <linearGradient
        id='linear-gradient-2'
        x1='34.26'
        x2='141.74'
        y1='34.26'
        y2='141.74'
        gradientUnits='userSpaceOnUse'
      >
        <stop offset='0' stopColor='#d50000'></stop>
        <stop offset='0.13' stopColor='#d90b09'></stop>
        <stop offset='1' stopColor='#f55244'></stop>
      </linearGradient>
      <linearGradient
        id='linear-gradient-3'
        x1='73.53'
        x2='90.21'
        y1='79.67'
        y2='96.36'
        gradientUnits='userSpaceOnUse'
      >
        <stop offset='0' stopColor='#d50000'></stop>
        <stop offset='0.65' stopColor='#d60101' stopOpacity='0.34'></stop>
        <stop offset='1' stopColor='#d60101' stopOpacity='0'></stop>
      </linearGradient>
      <linearGradient
        id='linear-gradient-4'
        x1='83.68'
        x2='141.78'
        y1='83.6'
        y2='141.69'
        xlinkHref='#linear-gradient-3'
      ></linearGradient>
      <g data-name='Layer 2'>
        <g>
          <g data-name='02.YouTube'>
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
                d='M98.54 88.03l-21.08 12.23V75.74z'
              ></path>
              <path
                fill='url(#linear-gradient-4)'
                d='M162.55 102.82a76.07 76.07 0 01-59.55 59.7l-49.1-49.1a15 15 0 009.27 3.17h49.74A15.13 15.13 0 00128 101.45v-26.9A15.08 15.08 0 00123.74 64z'
              ></path>
            </g>
            <path
              fill='#fff'
              d='M112.87 59.41H63.13A15.13 15.13 0 0048 74.55v26.9a15.13 15.13 0 0015.13 15.14h49.74A15.13 15.13 0 00128 101.45v-26.9a15.13 15.13 0 00-15.13-15.14zm-35.41 40.85V75.74L98.54 88z'
            ></path>
          </g>
        </g>
      </g>
    </svg>
  );
}
