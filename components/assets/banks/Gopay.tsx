import { cn } from '@/lib/utils';
import React from 'react';

type IconProps = {
  className?: string;
};

function Gopay({ className }: IconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='308'
      height='63'
      className={cn('w-6 h-auto', className)}
      viewBox='0 0 308 63'
    >
      <g fill='none' fillRule='evenodd'>
        <path
          fill='#fff'
          fillOpacity='0.01'
          d='M0 0h63v16H0z'
          transform='scale(4.889 3.938)'
        ></path>
        <g transform='scale(4.889 3.938) translate(0 1.143)'>
          <ellipse
            cx='6.811'
            cy='6.857'
            fill='#00aed6'
            fillRule='nonzero'
            rx='6.811'
            ry='6.857'
          ></ellipse>
          <path
            fill='#fff'
            d='M10.78 6.644a1.587 1.587 0 00-1.652-1.5H4.826a.285.285 0 01-.284-.286c0-.158.127-.286.284-.286h4.359a1.362 1.362 0 00-.993-1.26 10.97 10.97 0 00-3.84 0A1.82 1.82 0 002.99 4.838a13.71 13.71 0 000 4.06 1.92 1.92 0 001.552 1.526 19.13 19.13 0 004.748 0 1.669 1.669 0 001.317-1.44c.14-.772.199-1.556.173-2.34zm-1.413.96v.254a.285.285 0 01-.284.286.285.285 0 01-.284-.286v-.254a.427.427 0 01.284-.746.427.427 0 01.284.746z'
          ></path>
        </g>
        <path
          fill='#000'
          fillRule='nonzero'
          d='M18.94 11.41a2.921 2.921 0 002.545 1.252c1.187 0 2.059-.763 2.059-1.8v-.547h-.029a3.22 3.22 0 01-2.444.922 3.955 3.955 0 01-3.513-1.94 4.012 4.012 0 01-.037-4.033 3.956 3.956 0 013.478-2.002 3.39 3.39 0 012.516.892h.029v-.748h2.03v7.428c0 2.159-1.7 3.656-4.089 3.656a4.87 4.87 0 01-4.06-1.814zm4.519-4.622c0-.863-.973-1.655-2.059-1.655-1.373 0-2.288.835-2.288 2.087-.04.594.18 1.175.605 1.588a1.995 1.995 0 001.597.557c1.187 0 2.145-.748 2.145-1.684zm7.46-3.598c2.474 0 4.276 1.77 4.276 4.03s-1.802 4.031-4.276 4.031a4.005 4.005 0 01-3.692-1.935 4.063 4.063 0 010-4.191 4.005 4.005 0 013.692-1.935zm0 1.87a2.152 2.152 0 00-2.13 2.17 2.152 2.152 0 002.15 2.15 2.152 2.152 0 002.14-2.16 2.075 2.075 0 00-.605-1.562 2.045 2.045 0 00-1.555-.597zm5.374-1.654h2.03v.676h.03a3.359 3.359 0 012.444-.892c2.18.04 3.928 1.828 3.932 4.023.004 2.196-1.738 3.99-3.918 4.038-.86.02-1.7-.265-2.373-.806h-.029v3.829h-2.116zm4.176 1.67c-1.116 0-2.06.791-2.06 1.655v.964c0 .922.916 1.684 2.073 1.684a2.145 2.145 0 002.131-2.158 2.145 2.145 0 00-2.144-2.146zm8.337 1.41c1.387-.187 1.802-.388 1.802-.777 0-.504-.53-.806-1.344-.806a1.79 1.79 0 00-1.888 1.367l-2.002-.417c.286-1.555 1.874-2.663 3.832-2.663 2.216 0 3.59 1.137 3.59 2.993v4.852h-1.903V10.2h-.03a3.117 3.117 0 01-2.559 1.051c-1.673 0-2.83-.921-2.83-2.275 0-1.425.943-2.159 3.331-2.49zm1.973.806h-.028c-.187.274-.587.432-1.616.62-1.244.23-1.687.474-1.687.92 0 .461.372.663 1.172.663 1.216 0 2.16-.562 2.16-1.296v-.907zm6.044 3.326L53.32 3.406h2.331l2.302 4.98h.028l2.274-4.98H62.6l-5.247 10.87h-2.331z'
          transform='scale(4.889 3.938)'
        ></path>
      </g>
    </svg>
  );
}

export default Gopay;
