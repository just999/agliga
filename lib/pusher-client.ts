// pusherClient.js
import Pusher from 'pusher-js';

const pusherClientPublic = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
});

export default pusherClientPublic;