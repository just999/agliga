'use client';

import {
  useState,
  useCallback,
  Key,
  useEffect,
  useRef,
  useMemo,
  MouseEvent,
} from 'react';
import { Trash2Icon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

import {
  deleteMessage,
  getMessagesByContainer,
} from '@/actions/message-actions';
import { Button, Spinner } from '@/components/ui';
import { useMessageStore } from '@/store/use-message-store';
import { MessageDto } from '@/types';
import { cn, createChatId, truncateString } from '@/lib/utils';
import PresenceAvatar from '@/components/presence-avatar';
import { useChatStore } from '@/store/use-chat-store';

export const useMessages = (
  initialMessages: MessageDto[],
  nextCursor?: string
) => {
  const cursorRef = useRef(nextCursor);

  const { data: session } = useSession();
  const role = session?.user.role;
  const user = session?.user.curUser;

  const router = useRouter();

  const {
    setMessage,
    remove,
    messages,
    updateUnreadCount,
    resetMessages,
    setUser,
  } = useMessageStore((state) => ({
    setMessage: state.setMessage,
    setUser: state.setUser,
    remove: state.remove,
    messages: state.messages,
    updateUnreadCount: state.updateUnreadCount,
    resetMessages: state.resetMessages,
  }));
  const searchParams = useSearchParams();
  const isOutbox = searchParams.get('container') === 'outbox';
  const container = searchParams.get('container');
  const [isDeleting, setIsDeleting] = useState({ id: '', loading: false });
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    if (initialMessages && initialMessages.length) {
      setMessage(initialMessages);
    }
    cursorRef.current = nextCursor;

    return () => {
      resetMessages();
    };
  }, [initialMessages, nextCursor, resetMessages, setMessage]);

  const loadMore = useCallback(async () => {
    if (cursorRef.current) {
      setLoadingMore(true);
      const { messages, nextCursor } = await getMessagesByContainer(
        container,
        cursorRef.current
      );
      setMessage(messages);
      cursorRef.current = nextCursor;
      setLoadingMore(false);
    }
  }, [container, setMessage]);

  const handleDeleteMessage = useCallback(
    async (e: MouseEvent<HTMLButtonElement>, message: MessageDto) => {
      // Local loading state for the delete operation
      e.preventDefault();
      e.stopPropagation();
      setIsDeleting({ id: message.id, loading: true });
      try {
        await deleteMessage(message.id, isOutbox);

        remove(message.id);

        if (!message.dateRead && !isOutbox) updateUnreadCount(-1);
      } finally {
        setIsDeleting({ id: '', loading: false });
      }
    },
    [isOutbox, remove, updateUnreadCount]
  );

  const {
    isToggle,
    setIsToggle,
    chatId,
    setChatId,
    tab,
    setTab,
    setSenderId,
    setRecipientId,
    showBubbleChat,
    setShowBubbleChat,
  } = useChatStore((state) => ({
    setSenderId: state.setSenderId,
    chatId: state.chatId,
    tab: state.tab,
    setChatId: state.setChatId,
    setTab: state.setTab,
    setRecipientId: state.setRecipientId,
    setIsToggle: state.setIsToggle,
    setShowBubbleChat: state.setShowBubbleChat,
    isToggle: state.isToggle,
    showBubbleChat: state.showBubbleChat,
  }));

  const urlPrefix =
    role === 'admin' ? '/dashboard/admin/messages' : '/dashboard/messages';

  const handleRowSelect = useCallback(
    (e: MouseEvent<HTMLButtonElement>, key: Key) => {
      console.log(
        '🚀 ~ key:=====>> handle row select on use messages hook',
        key
      );
      e.stopPropagation();
      const message = messages.find((m) => m.id === key);
      const url = `${urlPrefix}?container=${container}`;

      console.log('🚀 ~ url:', url);
      // router.push(url);

      if (container && message?.senderId && message.recipientId) {
        const chatId = createChatId(message?.senderId, message?.recipientId);
        setChatId(chatId);
        setTab(message.senderId);
      }

      setIsToggle(true);
      setShowBubbleChat(false);

      // if (role === 'admin' && isOutbox && message) {
      //   const chatId = createChatId();
      // }

      router.refresh();
      setIsToggle(true);
      setShowBubbleChat(false);
      setUser(user);
      setTimeout(() => {
        setShowBubbleChat(false);
      }, 500);
    },
    [
      container,
      isOutbox,
      messages,
      router,
      setChatId,
      setIsToggle,
      setShowBubbleChat,
      setTab,
      setUser,
      urlPrefix,
      user,
    ]
  );
  //   const url = isOutbox
  //     ? `/dashboard/chat/${message?.recipientId}`
  //     : `/dashboard/chat/${message?.senderId}`;
  //   router.push(url);
  // };
  const messageColumns = useMemo(
    () => [
      {
        accessorKey: isOutbox ? 'recipientName' : 'senderName',
        header: isOutbox ? 'recipientName' : 'senderName',
        cell: ({ row }: any) => (
          <div className='flex items-center gap-2 px-2 cursor-pointer'>
            <PresenceAvatar
              userId={
                isOutbox ? row.original.recipientId : row.original.senderId
              }
              src={
                isOutbox
                  ? row.original.recipientImage
                  : row.original.senderImage
              }
              className='w-auto h-10 flex items-center'
              dotClassName='w-2 h-2 ring-0 bg-emerald-400 z-999'
              avatarClass='h-8 w-8 object-cover rounded-full shadow-xl'
            />
            <span>
              {isOutbox ? row.original.recipientName : row.original.senderName}{' '}
            </span>
          </div>
        ),
      },
      {
        accessorKey: 'text',
        header: 'Message',
        cell: ({ row }: any) => (
          <>
            <div
              className={cn(
                'text-xs truncate',
                row.original.dateRead
                  ? 'font-extralight'
                  : '!text-white text-sm font-extrabold !bg-stone-800 text-shadow'
              )}>
              {truncateString(row.original.text, 30)}
            </div>
            {/* <pre>{JSON.stringify(row.original, null, 2)}</pre> */}
          </>
        ),
      },
      {
        accessorKey: 'created',
        header: isOutbox ? 'Date sent' : 'Date received',
        cell: ({ row }: any) => (
          <div className='text-xs '>{row.original.created}</div>
        ),
      },

      {
        id: 'actions',
        cell: ({ row }: any) => (
          <Button
            variant='ghost'
            onClick={(e) => handleDeleteMessage(e, row.original)}
            className='bg-stone-100 w-full cursor-pointer hover:bg-red-50 rounded-sm'>
            {isDeleting.id === row.original.id && isDeleting.loading ? (
              <Spinner />
            ) : (
              <Trash2Icon size={18} className='text-rose-600 svg' />
            )}
          </Button>
        ),
      },
    ],
    [handleDeleteMessage, isDeleting.id, isDeleting.loading, isOutbox]
  );

  return {
    isOutbox,
    // columns,
    messageColumns,
    deleteMessage: handleDeleteMessage,
    selectRow: (e: MouseEvent<HTMLButtonElement>, key: Key) =>
      handleRowSelect(e, key),
    isDeleting, // Pass isDeleting state to MessageTableCell
    messages,
    loadMore,
    loadingMore,
    hasMore: !!cursorRef.current,
  };
};
