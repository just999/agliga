'use client';

import { getMessageThread } from '@/actions/message-actions';
import { useMessageStore } from '@/store/use-message-store';
import { set } from 'date-fns';
import { useEffect, useState } from 'react';

export const useGetMessagesThreads = (recipientId?: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [messages, setMessages] = useState({});

  // const { messages, setMessage } = useMessageStore((state) => ({
  //   messages: state.messages,
  //   setMessage: state.setMessage,
  // }));

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);

        if (!recipientId) return;
        const res = await getMessageThread(recipientId);
        if (res) setMessages(res);
      } catch (err: any) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [recipientId]);

  return { loading, error, messages };
};
