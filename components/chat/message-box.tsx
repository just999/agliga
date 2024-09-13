'use client';

import PresenceAvatar from '@/components/presence-avatar';

import { cn, timeAgo, transformImageUrl } from '@/lib/utils';
import { MessageDto } from '@/types';
import { User } from '@prisma/client';

import { format, formatISO, parse } from 'date-fns';
import { Check, CheckCheck } from 'lucide-react';

import { useEffect, useRef } from 'react';

type MessageBoxProps = {
  user: User;
  message: MessageDto;
  currentUserId: string;
};

const MessageBox = ({ message, currentUserId, user }: MessageBoxProps) => {
  const isCurrentUserSender = message.senderId === currentUserId;
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageEndRef.current)
      messageEndRef.current.scrollIntoView({ behavior: 'instant' });
  }, [messageEndRef]);

  const renderAvatar = () => (
    <div className='self-end'>
      <PresenceAvatar
        user={user}
        className='w-10 h-10 object-cover'
        src={transformImageUrl(message.senderImage) || '/images/user.png'}
        userId={message.senderId}
        dotClassName='hidden'
      />
    </div>
  );
  const messageContentClasses = cn(
    'flex max-w-[250px] justify-between text-white',
    isCurrentUserSender
      ? 'rounded-l-lg items-end rounded-tr-xl bg-blue-600'
      : 'rounded-r-lg items-end rounded-tl-xl border-gray-200 px-1 bg-emerald-600'
  );
  // const messageContentClasses = clsx('flex flex-col w-[50%] px-2 py-1 ', {
  //   'rounded-l-xl rounded-tr-xl text-white bg-blue-100': isCurrentUserSender,
  //   'rounded-r-xl rounded-tl-xl border-gry-200 bg-green-100':
  //     !isCurrentUserSender,
  // });

  // const dateString = message.dateRead;
  // const formatString = 'dd MM yy h:mm:a';

  // const parsedDate = parse(dateString, formatString, new Date());
  // const isoDate = formatISO(parsedDate);
  // Handle nullable dateString
  let isoDate = '';
  const dateString = message.dateRead;

  const timeString = message.created;
  const formatString = 'dd MM yy h:mm:a';

  const parsedDate = parse(timeString, formatString, new Date());

  const newTime = format(parsedDate, 'HH:mm');

  if (dateString) {
    try {
      const parsedDate = parse(dateString, formatString, new Date());
      isoDate = formatISO(parsedDate);
    } catch (error) {
      console.error('Error parsing date:', error);
    }
  }

  // const renderMessageHeader = () => (
  //   <div
  //     className={cn(
  //       'flex items-center w-full',
  //       isCurrentUserSender && 'justify-between'
  //     )}>
  //     {message.dateRead && message.recipientId !== currentUserId ? (
  //       <span className='text-[10px] text-gray-300 italic '>
  //         (read {timeAgo(isoDate)})
  //       </span>
  //     ) : (
  //       <div></div>
  //     )}

  //     <div className='flex'>
  //       <span className='text-sm font-semibold text-gray-900 '>
  //         {message.senderName}
  //       </span>
  //       <span className='text-xs text-gray-400 ml-2'>{newTime}</span>
  //     </div>
  //   </div>
  // );

  const renderMessageContent = () => (
    <div className={messageContentClasses}>
      {/* {renderMessageHeader()} */}

      <span className='flex flex-row justify-between items-end w-full gap-1 relative'>
        <p className='text-xs h-full  py-2 pl-2 text-shadow'>{message.text}</p>
        <span
          className={cn(
            isCurrentUserSender
              ? ' h-full text-[10px]  '
              : ' text-[10px] ml-1 right-0 bottom-0'
          )}>
          <span className='flex flex-row justify-end gap-1 relative'>
            <div className='flex flex-row justify-end h-full items-center align-text-bottom'>
              <span
                className={cn(
                  'flex text-gray-300 items-end h-full pr-1 text-[8px]'
                )}>
                {newTime}
                {/* {message.dateRead ? (
              <IoCheckmarkDoneSharp className='w-3 text-emerald-600' />
              ) : (
                <IoCheckmarkSharp className='w-3 text-emerald-600' />
            )} */}
              </span>
              {isCurrentUserSender &&
                (message.dateRead ? (
                  <CheckCheck className='flex items-end h-full w-3 svg text-orange-500 ' />
                ) : (
                  <Check className='flex items-end h-full w-3 svg text-orange-500 ' />
                ))}
            </div>
          </span>
        </span>
      </span>
    </div>
  );

  return (
    <div className='grid grid-rows-1 gap-2'>
      <div
        className={cn(
          'flex items-end h-full',
          isCurrentUserSender
            ? 'justify-end gap-1 items-center'
            : 'justify-start'
        )}>
        {/* {!isCurrentUserSender && renderAvatar()} */}
        {renderMessageContent()}
        {isCurrentUserSender && renderAvatar()}
      </div>
      <div ref={messageEndRef} />
    </div>
  );
};

export default MessageBox;
