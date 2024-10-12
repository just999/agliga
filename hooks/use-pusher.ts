import { useState, useEffect } from 'react';
import { pusherClient } from '@/lib/pusher';
import { Channel } from 'pusher-js';

export function usePusher(channelName: string) {
  const [channel, setChannel] = useState<Channel | null>(null);

  useEffect(() => {
    const presenceChannel = pusherClient.subscribe(
      `presence-${channelName}`
    ) as Channel;
    setChannel(presenceChannel);

    return () => {
      pusherClient.unsubscribe(`presence-${channelName}`);
    };
  }, [channelName]);

  return channel;
}
