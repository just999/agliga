import {
  Facebook,
  Inst,
  Instagram,
  Twitter,
  Whatsapp,
  Youtube,
} from '@/components/social';
import {
  BsFacebook,
  BsInstagram,
  BsMessenger,
  BsTiktok,
  BsTwitterX,
  BsWechat,
  BsWhatsapp,
  BsYoutube,
} from 'react-icons/bs';
import {
  FcAbout,
  FcAddDatabase,
  FcContacts,
  FcHome,
  FcNews,
} from 'react-icons/fc';

import { TfiYoutube } from 'react-icons/tfi';

export const scis = [
  {
    id: 1,
    icon: BsFacebook,
    link: 'Facebook',
    color: '#3b5999',
  },
  {
    id: 2,
    icon: BsTwitterX,
    link: 'TwitterX',
    color: '#15202B',
  },
  {
    id: 3,
    icon: BsInstagram,
    link: 'Instagram',
    color: '#e4405f',
  },
  {
    id: 4,
    icon: BsWhatsapp,
    link: 'Whatsapp',
    color: '#25d366',
  },
  {
    id: 5,
    icon: TfiYoutube,
    link: 'Youtube',
    color: '#FF0000',
  },
  {
    id: 6,
    icon: BsTiktok,
    link: 'Tik-Tok',
    color: '#010101',
  },
  {
    id: 7,
    icon: BsWechat,
    link: 'Wechat',
    color: '#09B83E',
  },
  {
    id: 8,
    icon: BsMessenger,
    link: 'Messenger',
    color: '#00B2FF',
  },
];

export const heroSlides = [
  {
    id: 1,
    bgImg: 'img/post-slide-1.jpg',
    title: 'The Best Homemade Masks for Face (keep the Pimples Away)',
    brief: `
    <!--cSpell:disable -->
    Lorem ipsum dolor sit amet, consectetur adipisicing
    elit. Quidem neque est mollitia! Beatae minima assumenda
    repellat harum vero, officiis ipsam magnam obcaecati
    cumque maxime inventore repudiandae quidem
    necessitatibus rem atque.
    <!--cSpell:enable -->
    `,
  },
  {
    id: 2,
    bgImg: 'img/post-slide-2.jpg',
    title:
      '17 Pictures of Medium Length Hair in Layers That Will Inspire Your New Haircut',
    brief: `
     <!--cSpell:disable -->
    Lorem ipsum dolor sit amet, consectetur adipisicing
    elit. Quidem neque est mollitia! Beatae minima assumenda
    repellat harum vero, officiis ipsam magnam obcaecati
    cumque maxime inventore repudiandae quidem
    necessitatibus rem atque.
     <!--cSpell:enable -->
    `,
  },
  {
    id: 3,
    bgImg: 'img/post-slide-3.jpg',
    title: '9 Half-up/half-down Hairstyles for Long and Medium Hair',
    brief: `
     <!--cSpell:disable -->
    Lorem ipsum dolor sit amet, consectetur adipisicing
    elit. Quidem neque est mollitia! Beatae minima assumenda
    repellat harum vero, officiis ipsam magnam obcaecati
    cumque maxime inventore repudiandae quidem
    necessitatibus rem atque.
     <!--cSpell:enable -->
    `,
  },
  {
    id: 4,
    bgImg: 'img/post-slide-4.jpg',
    title: '13 Amazing Poems from Shel Silverstein with Valuable Life Lessons',
    brief: `
     <!--cSpell:disable -->
    Lorem ipsum dolor sit amet, consectetur adipisicing
    elit. Quidem neque est mollitia! Beatae minima assumenda
    repellat harum vero, officiis ipsam magnam obcaecati
    cumque maxime inventore repudiandae quidem
    necessitatibus rem atque.
     <!--cSpell:enable -->
    `,
  },
];

export const contact = [
  {
    id: 1,
    details: {
      name: 'Example Name',
      email: 'info@example.com',
      subject: 'Message',
      message: `
      <!--cSpell:disable -->
      Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
    velit esse cillum dolore eu fugiat nulla pariatur
    <!--cSpell:enable -->
    `,
    },
  },
];

export const tabsData = [
  { id: 1, name: 'Popular', active: true },
  { id: 2, name: 'Trending', active: false },
];
