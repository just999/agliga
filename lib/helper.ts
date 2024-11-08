import {
  Bca,
  Bni,
  Bri,
  Cimb,
  Dan,
  Danamon,
  Gopay,
  Linkaja,
  Mandiri,
  Ovo,
} from '@/components/assets/banks';
import {
  Baccarat,
  Bingo,
  BlackJack,
  Craps,
  Domino,
  ESport,
  Euro24,
  Keno,
  Lotto,
  Poker,
  Roulette,
  Sicbo,
  Slot,
  SlotCherry,
  SlotGodFortune,
} from '@/components/assets/games';
import {
  Albania,
  Arsenal,
  AstonVilla,
  Bosnia,
  Bournemouth,
  Brentford,
  Brighton,
  Burnley,
  Chelsea,
  Crystal,
  Czech,
  England,
  Everton,
  Finland,
  French,
  Fulham,
  Germany,
  Greece,
  Hungary,
  Ipswich,
  Irish,
  Italy,
  Kazak,
  Leed,
  Leichester,
  Liverpool,
  Luton,
  Matches,
  MC,
  MU,
  Netherland,
  Newcastle,
  Norwegian,
  Norwich,
  Nottingham,
  PL,
  Poland,
  Portugal,
  PSSI,
  Red,
  Russia,
  Scotland,
  Sheffield,
  Southampton,
  Spain,
  Tth,
  Turkish,
  Ukraine,
  USA,
  Watford,
  Westham,
  Wolve,
  Yellow,
} from '@/components/assets/sports';
import {
  AgenBet,
  AgenLiga77,
  Cahaya4d,
  Ibc,
  LiveCasino338a,
  Sbo,
  SlotGames,
} from '@/components/assets/user-games';
import { Role } from '@prisma/client';
import {
  BadgeDollarSign,
  Banknote,
  BaselineIcon,
  CableIcon,
  CalendarDays,
  CircleDollarSign,
  CircleSlash2Icon,
  CreditCard,
  Divide,
  Folder,
  GroupIcon,
  HandCoins,
  HashIcon,
  Image,
  LayoutDashboard,
  ListChecks,
  MessageCircle,
  MessageCircleMore,
  MessageSquareMore,
  Newspaper,
  Plug,
  RecycleIcon,
  Settings,
  SlashIcon,
  TargetIcon,
  User,
  UserCog2,
  Users2,
  ZapIcon,
} from 'lucide-react';
import { BsCalendarWeek } from 'react-icons/bs';
import { FaExclamationTriangle } from 'react-icons/fa';

import {
  FcDisapprove,
  FcFullTrash,
  FcHighPriority,
  FcOk,
} from 'react-icons/fc';
import {
  GiBasketballBasket,
  GiCow,
  GiCrossMark,
  GiGoat,
  GiHorseHead,
  GiMonkey,
  GiPig,
  GiRabbit,
  GiRat,
  GiRooster,
  GiSeaDragon,
  GiSittingDog,
  GiSnake,
  GiSoccerKick,
  GiSpikedDragonHead,
  GiTigerHead,
  GiTurd,
  GiYinYang,
} from 'react-icons/gi';
import { MdOutlineFiberNew } from 'react-icons/md';
import {
  PiFlowerLotusLight,
  PiPersonSimpleSwimFill,
  PiSoccerBallLight,
} from 'react-icons/pi';

export const banks = [
  {
    value: 'BCA',
    icon: Bca,
    // styles: 'text-xs',
  },
  {
    value: 'MANDIRI',
    icon: Mandiri,
    // styles: 'text-xs',
  },
  {
    value: 'BRI',
    icon: Bri,
    // styles: 'text-xs',
  },
  {
    value: 'BNI',
    icon: Bni,
    // styles: 'text-xs',
  },
  {
    value: 'CIMB',
    icon: Cimb,
    // styles: 'text-xs',
  },
  {
    value: 'DANAMON',
    icon: Danamon,
    // styles: 'text-xs',
  },
  {
    value: 'DANA',
    icon: Dan,
    // styles: 'text-xs',
  },
  {
    value: 'OVO',
    icon: Ovo,
    // styles: 'text-xs',
  },
  {
    value: 'LINKAJA',
    icon: Linkaja,
    // styles: 'text-xs',
  },
  {
    value: 'GOPAY',
    icon: Gopay,
    // styles: 'text-xs',
  },
];
export const games = [
  {
    value: 'Sbobet',
    icon: Sbo,
    // styles: 'text-xs',
  },
  {
    value: 'Ibcbet',
    icon: Ibc,
    // styles: 'text-xs',
  },
  {
    value: '338ALiveCasino',
    icon: LiveCasino338a,
    // styles: 'text-xs',
  },
  {
    value: 'Cahaya4d',
    icon: Cahaya4d,
    // styles: 'text-xs',
  },
  {
    value: 'AgenBet',
    icon: AgenBet,
    // styles: 'text-xs',
  },
  {
    value: 'AgenLiga77',
    icon: AgenLiga77,
    // styles: 'text-xs',
  },
  {
    value: 'Cahaya138',
    icon: SlotGames,
    // styles: 'text-xs',
  },
];

export const sportsCategories = [
  {
    value: 'Soccer',
    icon: PiSoccerBallLight,
  },
  {
    value: 'Basketball',
    icon: GiBasketballBasket,
  },
  {
    value: 'Swimming',
    icon: PiPersonSimpleSwimFill,
  },
];

export const categories = [
  // {
  //   label: 'Select Your Topic',
  //   icon: PiCellSignalNoneThin,
  //   description: 'Sepak Bola',
  // },
  {
    label: 'England',
    icon: England,
    description: 'Basket ball',
  },
  {
    label: 'Albania',
    icon: Albania,
    description: 'Sepak Bola',
  },
  {
    label: 'Germany',
    icon: Germany,
    description: 'Swimming',
  },
  {
    label: 'Italy',
    icon: Italy,
    description: 'Karate',
  },
  {
    label: 'Netherland',
    icon: Netherland,
    description: 'Kayak',
  },
  {
    label: 'Portugal',
    icon: Portugal,
    description: 'Baseball',
  },
  {
    label: 'Spain',
    icon: Spain,
    description: 'Volley-ball',
  },
  {
    label: 'USA',
    icon: USA,
    description: 'Skiing',
  },
  {
    label: 'French',
    icon: French,
    description: 'Rugby',
  },
  {
    label: 'Greece',
    icon: Greece,
    description: 'Boxing',
  },
  {
    label: 'Finland',
    icon: Finland,
    description: 'Catur',
  },
  {
    label: 'Poland',
    icon: Poland,
    description: 'Hockey',
  },
  {
    label: 'Russia',
    icon: Russia,
    description: 'Surfing',
  },
  {
    label: 'Scotland',
    icon: Scotland,
    description: 'Ping-pong',
  },
  {
    label: 'Norway',
    icon: Norwegian,
    description: 'Sepeda',
  },
  {
    label: 'Ukraine',
    icon: Ukraine,
    description: 'Badminton',
  },
  {
    label: 'Turkish',
    icon: Turkish,
    description: 'Cricket',
  },
  {
    label: 'Kazakhstan',
    icon: Kazak,
    description: 'Cricket',
  },
  {
    label: 'Irish',
    icon: Irish,
    description: 'Cricket',
  },
  {
    label: 'Hungary',
    icon: Hungary,
    description: 'Cricket',
  },
  {
    label: 'Czech',
    icon: Czech,
    description: 'Cricket',
  },
  {
    label: 'Bosnia',
    icon: Bosnia,
    description: 'Cricket',
  },
  {
    label: 'PSSI',
    icon: PSSI,
    description: 'Cricket',
  },
];

export const gamesCategoriesList = [
  {
    label: 'Baccarat',
    icon: Baccarat,
    description: 'Baccarat',
  },
  {
    label: 'Blackjack',
    icon: BlackJack,
    description: 'Blackjack',
  },
  {
    label: 'Poker',
    icon: Poker,
    description: 'Poker',
  },
  {
    label: 'Roulette',
    icon: Roulette,
    description: 'Roulette',
  },
  {
    label: 'Sicbo',
    icon: Sicbo,
    description: 'Sicbo',
  },
  {
    label: 'Slot',
    icon: Slot,
    description: 'Slot',
  },
  {
    label: 'Lotto',
    icon: Lotto,
    description: 'Lotto',
  },
  {
    label: 'Bingo',
    icon: Bingo,
    description: 'Bingo',
  },
  {
    label: 'Keno',
    icon: Keno,
    description: 'Keno',
  },
  {
    label: 'Domino',
    icon: Domino,
    description: 'Domino',
  },
  {
    label: 'Slot-Cherry',
    icon: SlotCherry,
    description: 'Slot-Cherry',
  },
  {
    label: 'Craps',
    icon: Craps,
    description: 'Craps',
  },
  {
    label: 'Slot-God',
    icon: SlotGodFortune,
    description: 'Slot-God',
  },
  {
    label: 'E-Sport',
    icon: ESport,
    description: 'E-Sport',
  },
];

export const heroSlides = [
  {
    id: 1,
    bgImg: '/hero/soc5.jpg',
    title: 'The Best Homemade Masks for Face (keep the Pimples Away)',
    brief: `
    Ancient Discovery: Unearthed ruins in the Amazon rain forest hint at a lost civilization with advanced agricultural techniques. Could they be the forerunners of the Maya? (289 characters)
    Tech Breakthrough: Scientists create a new battery material that charges in minutes and lasts for weeks. This could revolutionize electric vehicles and portable electronics. (297 characters)
    Space Exploration: The James Webb telescope captures stunning images of a newly discovered exoplanet, potentially harboring conditions suitable for life. Are we alone in the universe? (298 characters)
    `,
  },
  {
    id: 2,
    bgImg: '/hero/soc6.jpg',
    title:
      '17 Pictures of Medium Length Hair in Layers That Will Inspire Your New Haircut',
    brief: `
    Hidden within a forgotten library, a book whispers forgotten tales. Its leather cover, worn smooth by countless hands, conceals fantastical creatures and forgotten lore. A curious child stumbles upon it, drawn by its faint glow. As they turn the pages, a world unfolds, filled with magic and wonder.
    `,
  },
  {
    id: 3,
    bgImg: '/hero/soc7.jpg',
    title: '9 Half-up/half-down Hairstyles for Long and Medium Hair',
    brief: `
    "In the heart of the city, a small park thrives with life. Children's laughter echoes as they chase each other around the playground. Nearby, a group of elderly people engage in a lively game of chess, their faces etched with concentration. A couple strolls along the path, their hands entwined, whispering sweet nothings. The park, a sanctuary amidst the urban jungle, continues to be a haven for all."
    `,
  },
  {
    id: 4,
    bgImg: '/hero/soc8.jpg',
    title: '13 Amazing Poems from Shel Silverstein with Valuable Life Lessons',
    brief: `
    In a bustling metropolis, a tiny bakery thrives. The aroma of fresh bread entices passersby. Inside, a young woman kneads dough with practiced hands, a secret recipe passed down for generations. Each loaf holds a story of love, family, and the simple joy of baking.
    `,
  },
  {
    id: 5,
    bgImg: '/hero/soc9.jpg',
    title: '9 Half-up/half-down Hairstyles for Long and Medium Hair',
    brief: `
    "In the heart of the city, a small park thrives with life. Children's laughter echoes as they chase each other around the playground. Nearby, a group of elderly people engage in a lively game of chess, their faces etched with concentration. A couple strolls along the path, their hands entwined, whispering sweet nothings. The park, a sanctuary amidst the urban jungle, continues to be a haven for all."
    `,
  },
  {
    id: 6,
    bgImg: '/hero/soc.jpg',
    title: '13 Amazing Poems from Shel Silverstein with Valuable Life Lessons',
    brief: `
    In a bustling metropolis, a tiny bakery thrives. The aroma of fresh bread entices passersby. Inside, a young woman kneads dough with practiced hands, a secret recipe passed down for generations. Each loaf holds a story of love, family, and the simple joy of baking.
    `,
  },
  {
    id: 7,
    bgImg: '/hero/soc1.jpg',
    title: 'The Best Homemade Masks for Face (keep the Pimples Away)',
    brief: `
    Ancient Discovery: Unearthed ruins in the Amazon rain forest hint at a lost civilization with advanced agricultural techniques. Could they be the forerunners of the Maya? (289 characters)
    Tech Breakthrough: Scientists create a new battery material that charges in minutes and lasts for weeks. This could revolutionize electric vehicles and portable electronics. (297 characters)
    Space Exploration: The James Webb telescope captures stunning images of a newly discovered exoplanet, potentially harboring conditions suitable for life. Are we alone in the universe? (298 characters)
    `,
  },
  {
    id: 8,
    bgImg: '/hero/soc2.jpg',
    title:
      '17 Pictures of Medium Length Hair in Layers That Will Inspire Your New Haircut',
    brief: `
    Hidden within a forgotten library, a book whispers forgotten tales. Its leather cover, worn smooth by countless hands, conceals fantastical creatures and forgotten lore. A curious child stumbles upon it, drawn by its faint glow. As they turn the pages, a world unfolds, filled with magic and wonder.
    `,
  },
  {
    id: 9,
    bgImg: '/hero/soc3.jpg',
    title: '9 Half-up/half-down Hairstyles for Long and Medium Hair',
    brief: `
    "In the heart of the city, a small park thrives with life. Children's laughter echoes as they chase each other around the playground. Nearby, a group of elderly people engage in a lively game of chess, their faces etched with concentration. A couple strolls along the path, their hands entwined, whispering sweet nothings. The park, a sanctuary amidst the urban jungle, continues to be a haven for all."
    `,
  },
  {
    id: 10,
    bgImg: '/hero/soc4.jpg',
    title: '13 Amazing Poems from Shel Silverstein with Valuable Life Lessons',
    brief: `
    In a bustling metropolis, a tiny bakery thrives. The aroma of fresh bread entices passersby. Inside, a young woman kneads dough with practiced hands, a secret recipe passed down for generations. Each loaf holds a story of love, family, and the simple joy of baking.
    `,
  },
  {
    id: 11,
    bgImg: '/hero/soc10.jpg',
    title: '9 Half-up/half-down Hairstyles for Long and Medium Hair',
    brief: `
    "In the heart of the city, a small park thrives with life. Children's laughter echoes as they chase each other around the playground. Nearby, a group of elderly people engage in a lively game of chess, their faces etched with concentration. A couple strolls along the path, their hands entwined, whispering sweet nothings. The park, a sanctuary amidst the urban jungle, continues to be a haven for all."
    `,
  },
  {
    id: 12,
    bgImg: '/hero/soc11.jpg',
    title: '13 Amazing Poems from Shel Silverstein with Valuable Life Lessons',
    brief: `
    In a bustling metropolis, a tiny bakery thrives. The aroma of fresh bread entices passersby. Inside, a young woman kneads dough with practiced hands, a secret recipe passed down for generations. Each loaf holds a story of love, family, and the simple joy of baking.
    `,
  },
  {
    id: 13,
    bgImg: '/hero/soc12.jpg',
    title: '13 Amazing Poems from Shel Silverstein with Valuable Life Lessons',
    brief: `
    In a bustling metropolis, a tiny bakery thrives. The aroma of fresh bread entices passersby. Inside, a young woman kneads dough with practiced hands, a secret recipe passed down for generations. Each loaf holds a story of love, family, and the simple joy of baking.
    `,
  },
];

export const initialFormState = {
  title: '',
  img: '',
  category: '',
  author: null,
  brief: null,
  validate: '',
};

export const depoInitialValues = {
  name: '',
  email: '',
  bank: null,
  game: null,
  gameUserId: '',
  bankPT: '',
  accountNumber: '',
  depoAmount: null,
};
export const wdInitialValues = {
  email: '',
  bank: null,
  accountNumber: '',
  name: '',
  game: null,
  wdAmount: null,
  gameUserId: '',
};

export const paths = {
  home() {
    return '/';
  },
  topicShow(slug: string) {
    return `/posts/topics/${slug}`;
  },
  postCreate(slug: string) {
    return `/posts/topics/${slug}/posts/new`;
  },
  postShow(slug: string, postId: string) {
    return `/posts/topics/${slug}/posts/${postId}`;
  },
};

// export const schedulePL = [
//   {
//     id: '1',
//     run: 37,
//     date: '11/05/2024 18:30',
//     teamHome: 'Fulham',
//     vs: '4-0(2-0)',
//     teamAway: 'Man City',
//     analysisIcon: '/images/calendar.svg',
//     analysis: 'https://analyse.7msport.com/4495618/index.shtml',
//   },
//   {
//     id: '2',
//     run: 37,
//     date: '11/05/2024 21:00',
//     teamHome: 'Bournemouth',
//     vs: 'VS',
//     teamAway: 'Brentford',
//     analysisIcon: '/images/calendar.svg',
//     analysis: 'https://analyse.7msport.com/4495616/index.shtml',
//   },
//   {
//     id: '3',
//     run: 37,
//     date: '11/05/2024 21:00',
//     teamHome: 'Everton',
//     vs: 'VS',
//     teamAway: 'Sheffield United',
//     analysisIcon: '/images/calendar.svg',
//     analysis: 'https://analyse.7msport.com/4495617/index.shtml',
//   },
//   {
//     id: '4',
//     run: 37,
//     date: '11/05/2024 21:00',
//     teamHome: 'Newcastle',
//     vs: 'VS',
//     teamAway: 'Brighton',
//     analysisIcon: '/images/calendar.svg',
//     analysis: 'https://analyse.7msport.com/4495620/index.shtml',
//   },
//   {
//     id: '5',
//     run: 37,
//     date: '11/05/2024 21:00',
//     teamHome: 'Tottenham',
//     vs: 'VS',
//     teamAway: 'Burnley',
//     analysisIcon: '/images/calendar.svg',
//     analysis: 'https://analyse.7msport.com/4495622/index.shtml',
//   },
//   {
//     id: '6',
//     run: 37,
//     date: '11/05/2024 21:00',
//     teamHome: 'West Ham',
//     vs: 'VS',
//     teamAway: 'Luton Town',
//     analysisIcon: '/images/calendar.svg',
//     analysis: 'https://analyse.7msport.com/4495623/index.shtml',
//   },
//   {
//     id: '7',
//     run: 36,
//     date: '11/05/2024 18:30',
//     teamHome: 'Fulham',
//     vs: 'VS',
//     teamAway: 'Man City',
//     analysisIcon: '/images/calendar.svg',
//     analysis: 'https://analyse.7msport.com/4495618/index.shtml',
//   },
//   {
//     id: '8',
//     run: 36,
//     date: '11/05/2024 21:00',
//     teamHome: 'Bournemouth',
//     vs: 'VS',
//     teamAway: 'Brentford',
//     analysisIcon: '/images/calendar.svg',
//     analysis: 'https://analyse.7msport.com/4495616/index.shtml',
//   },
//   {
//     id: '9',
//     run: 36,
//     date: '11/05/2024 21:00',
//     teamHome: 'Everton',
//     vs: 'VS',
//     teamAway: 'Sheffield United',
//     analysisIcon: '/images/calendar.svg',
//     analysis: 'https://analyse.7msport.com/4495617/index.shtml',
//   },
//   {
//     id: '10',
//     run: 36,
//     date: '11/05/2024 21:00',
//     teamHome: 'Newcastle',
//     vs: 'VS',
//     teamAway: 'Brighton',
//     analysisIcon: '/images/calendar.svg',
//     analysis: 'https://analyse.7msport.com/4495620/index.shtml',
//   },
//   {
//     id: '11',
//     run: 36,
//     date: '11/05/2024 21:00',
//     teamHome: 'Tottenham',
//     vs: 'VS',
//     teamAway: 'Burnley',
//     analysisIcon: '/images/calendar.svg',
//     analysis: 'https://analyse.7msport.com/4495622/index.shtml',
//   },
//   {
//     id: '12',
//     run: 36,
//     date: '11/05/2024 21:00',
//     teamHome: 'West Ham',
//     vs: 'VS',
//     teamAway: 'Luton Town',
//     analysisIcon: '/images/calendar.svg',
//     analysis: 'https://analyse.7msport.com/4495623/index.shtml',
//   },
//   {
//     id: '13',
//     run: 1,
//     date: '11/05/2024 18:30',
//     teamHome: 'Fulham',
//     vs: 'VS',
//     teamAway: 'Man City',
//     analysisIcon: '/images/calendar.svg',
//     analysis: 'https://analyse.7msport.com/4495618/index.shtml',
//   },
//   {
//     id: '14',
//     run: 1,
//     date: '11/05/2024 21:00',
//     teamHome: 'Bournemouth',
//     vs: 'VS',
//     teamAway: 'Brentford',
//     analysisIcon: '/images/calendar.svg',
//     analysis: 'https://analyse.7msport.com/4495616/index.shtml',
//   },
//   {
//     id: '15',
//     run: 1,
//     date: '11/05/2024 21:00',
//     teamHome: 'Everton',
//     vs: 'VS',
//     teamAway: 'Sheffield United',
//     analysisIcon: '/images/calendar.svg',
//     analysis: 'https://analyse.7msport.com/4495617/index.shtml',
//   },
//   {
//     id: '16',
//     run: 1,
//     date: '11/05/2024 21:00',
//     teamHome: 'Newcastle',
//     vs: 'VS',
//     teamAway: 'Brighton & Hove Albion',
//     analysisIcon: '/images/calendar.svg',
//     analysis: 'https://analyse.7msport.com/4495620/index.shtml',
//   },
//   {
//     id: '17',
//     run: 1,
//     date: '11/05/2024 21:00',
//     teamHome: 'Tottenham',
//     vs: 'VS',
//     teamAway: 'Burnley',
//     analysisIcon: '/images/calendar.svg',
//     analysis: 'https://analyse.7msport.com/4495622/index.shtml',
//   },
//   {
//     id: '18',
//     run: 1,
//     date: '11/05/2024 21:00',
//     teamHome: 'West Ham',
//     vs: 'VS',
//     teamAway: 'Luton Town',
//     analysisIcon: '/images/calendar.svg',
//     analysis: 'https://analyse.7msport.com/4495623/index.shtml',
//   },
// {
//   id: '19',
//   run: 37,
//   date: '11/05/2024 18:30',
//   teamHome: 'Fulham',
//   vs: 'VS',
//   teamAway: 'Manchester City',
//   analysisIcon: '/images/calendar.svg',
//   analysis: 'https://analyse.7msport.com/4495618/index.shtml',
// },
// {
//   id: '20',
//   run: 37,
//   date: '11/05/2024 21:00',
//   teamHome: 'AFC Bournemouth',
//   vs: 'VS',
//   teamAway: 'Brentford',
//   analysisIcon: '/images/calendar.svg',
//   analysis: 'https://analyse.7msport.com/4495616/index.shtml',
// },
// {
//   id: '21',
//   run: 37,
//   date: '11/05/2024 21:00',
//   teamHome: 'Everton',
//   vs: 'VS',
//   teamAway: 'Sheffield United',
//   analysisIcon: '/images/calendar.svg',
//   analysis: 'https://analyse.7msport.com/4495617/index.shtml',
// },
// {
//   id: '22',
//   run: 37,
//   date: '11/05/2024 21:00',
//   teamHome: 'NewCastle',
//   vs: 'VS',
//   teamAway: 'Brighton & Hove Albion',
//   analysisIcon: '/images/calendar.svg',
//   analysis: 'https://analyse.7msport.com/4495620/index.shtml',
// },
// {
//   id: '23',
//   run: 37,
//   date: '11/05/2024 21:00',
//   teamHome: 'Tottenham Hotspur',
//   vs: 'VS',
//   teamAway: 'Burnley',
//   analysisIcon: '/images/calendar.svg',
//   analysis: 'https://analyse.7msport.com/4495622/index.shtml',
// },
// {
//   id: '24',
//   run: 37,
//   date: '11/05/2024 21:00',
//   teamHome: 'West Ham United',
//   vs: 'VS',
//   teamAway: 'Luton Town',
//   analysisIcon: '/images/calendar.svg',
//   analysis: 'https://analyse.7msport.com/4495623/index.shtml',
// },
// {
//   id: '25',
//   run: 37,
//   date: '11/05/2024 18:30',
//   teamHome: 'Fulham',
//   vs: 'VS',
//   teamAway: 'Manchester City',
//   analysisIcon: '/images/calendar.svg',
//   analysis: 'https://analyse.7msport.com/4495618/index.shtml',
// },
// {
//   id: '26',
//   run: 37,
//   date: '11/05/2024 21:00',
//   teamHome: 'AFC Bournrmounth',
//   vs: 'VS',
//   teamAway: 'Brentford',
//   analysisIcon: '/images/calendar.svg',
//   analysis: 'https://analyse.7msport.com/4495616/index.shtml',
// },
// {
//   id: '27',
//   run: 37,
//   date: '11/05/2024 21:00',
//   teamHome: 'Everton',
//   vs: 'VS',
//   teamAway: 'Sheffield United',
//   analysisIcon: '/images/calendar.svg',
//   analysis: 'https://analyse.7msport.com/4495617/index.shtml',
// },
// {
//   id: '28',
//   run: 37,
//   date: '11/05/2024 21:00',
//   teamHome: 'NewCastle',
//   vs: 'VS',
//   teamAway: 'Brighton & Hove Albion',
//   analysisIcon: '/images/calendar.svg',
//   analysis: 'https://analyse.7msport.com/4495620/index.shtml',
// },
// {
//   id: '29',
//   run: 37,
//   date: '11/05/2024 21:00',
//   teamHome: 'Tottenham Hotspur',
//   vs: 'VS',
//   teamAway: 'Burnley',
//   analysisIcon: '/images/calendar.svg',
//   analysis: 'https://analyse.7msport.com/4495622/index.shtml',
// },
// {
//   id: '30',
//   run: 37,
//   date: '11/05/2024 21:00',
//   teamHome: 'West Ham United',
//   vs: 'VS',
//   teamAway: 'Luton Town',
//   analysisIcon: '/images/calendar.svg',
//   analysis: 'https://analyse.7msport.com/4495623/index.shtml',
// },
// ];

export const englishPL = [
  {
    id: 1,
    name: 'Man City',
    icon: '/images/mc.svg',
    href: 'https://team.7msport.com/240/index.shtml',
  },
  {
    id: 2,
    name: 'Arsenal',
    icon: '/images/arsenal.svg',
    href: 'https://team.7msport.com/567/index.shtml',
  },
  {
    id: 3,
    name: 'Man United',
    icon: '/images/mu.svg',
    href: 'https://team.7msport.com/239/index.shtml',
  },
  {
    id: 25,
    name: 'Man Utd',
    icon: '/images/mu.svg',
    href: 'https://team.7msport.com/239/index.shtml',
  },
  {
    id: 4,
    name: 'Newcastle',
    icon: '/images/newcastle.svg',
    href: 'https://team.7msport.com/200/index.shtml',
  },
  {
    id: 5,
    name: 'Liverpool',
    icon: '/images/liverpool.svg',
    href: 'https://team.7msport.com/279/index.shtml',
  },
  {
    id: 6,
    name: 'Brighton',
    icon: '/images/brighton.svg',
    href: 'https://team.7msport.com/507/index.shtml',
  },
  {
    id: 7,
    name: 'Aston Villa',
    icon: '/images/aston.svg',
    href: 'https://team.7msport.com/571/index.shtml',
  },
  {
    id: 8,
    name: 'Tottenham',
    icon: '/images/tth.svg',
    href: 'https://team.7msport.com/175/index.shtml',
  },
  {
    id: 27,
    name: 'Spurs',
    icon: '/images/tth.svg',
    href: 'https://team.7msport.com/175/index.shtml',
  },
  {
    id: 9,
    name: 'Brentford',
    icon: '/images/brentford.svg',
    href: 'https://team.7msport.com/473/index.shtml',
  },
  {
    id: 10,
    name: 'Fulham',
    icon: '/images/fulham.svg',
    href: 'https://team.7msport.com/398/index.shtml',
  },
  {
    id: 11,
    name: 'Crystal Palace',
    icon: '/images/crystal.svg',
    href: 'https://team.7msport.com/112/index.shtml',
  },
  {
    id: 12,
    name: 'Chelsea',
    icon: '/images/chelsea.svg',
    href: 'https://team.7msport.com/444/index.shtml',
  },
  {
    id: 13,
    name: 'Wolves',
    icon: '/images/wolve.svg',
    href: 'https://team.7msport.com/300/index.shtml',
  },
  {
    id: 14,
    name: 'West Ham',
    icon: '/images/westham.svg',
    href: 'https://team.7msport.com/68/index.shtml',
  },
  {
    id: 15,
    name: 'Bournemouth',
    icon: '/images/bournemouth.svg',
    href: 'https://team.7msport.com/674/index.shtml',
  },
  {
    id: 16,
    name: 'Nottingham Forest',
    icon: '/images/nottingham.svg',
    href: 'https://team.7msport.com/195/index.shtml',
  },
  {
    id: 17,
    name: 'Everton',
    icon: '/images/everton.svg',
    href: 'https://team.7msport.com/551/index.shtml',
  },
  {
    id: 18,
    name: 'Leicester City',
    icon: '/images/leicester.svg',
    href: 'https://team.7msport.com/293/index.shtml',
  },
  {
    id: 28,
    name: 'Leicester',
    icon: '/images/leicester.svg',
    href: 'https://team.7msport.com/293/index.shtml',
  },
  {
    id: 19,
    name: 'Leeds United',
    icon: '/images/leed.svg',
    href: 'https://team.7msport.com/867/index.shtml',
  },
  {
    id: 26,
    name: 'Leeds',
    icon: '/images/leed.svg',
    href: 'https://team.7msport.com/867/index.shtml',
  },
  {
    id: 20,
    name: 'Southampton',
    icon: '/images/southampton.svg',
    href: 'https://team.7msport.com/25/index.shtml',
  },
  {
    id: 21,
    name: 'Luton Town',
    icon: '/images/luton.svg',
    href: 'https://team.7msport.com/615/index.shtml',
  },
  {
    id: 29,
    name: 'Luton',
    icon: '/images/luton.svg',
    href: 'https://team.7msport.com/615/index.shtml',
  },
  {
    id: 22,
    name: 'Sheffield United',
    icon: '/images/sheffield.svg',
    href: 'https://team.7msport.com/44/index.shtml',
  },
  {
    id: 22,
    name: 'Sheffield Utd',
    icon: '/images/sheffield.svg',
    href: 'https://team.7msport.com/44/index.shtml',
  },
  {
    id: 23,
    name: 'Burnley',
    icon: '/images/burnley.svg',
    href: 'https://team.7msport.com/498/index.shtml',
  },
  {
    id: 24,
    name: 'Ipswich',
    icon: '/images/ipswich.svg',
    href: 'https://team.7msport.com/44/index.shtml',
  },
  {
    id: 30,
    name: 'Watford',
    icon: '/images/watford.svg',
    href: 'https://team.7msport.com/44/index.shtml',
  },
  {
    id: 31,
    name: 'Norwich',
    icon: '/images/norwich.svg',
    href: 'https://team.7msport.com/44/index.shtml',
  },
];
export const EPL = [
  {
    name: 'Man City',
    icon: MC,
    description: 'MC',
    href: 'https://team.7msport.com/240/index.shtml',
  },
  {
    name: 'Arsenal',
    icon: Arsenal,
    description: 'Arsenal',
    href: 'https://team.7msport.com/567/index.shtml',
  },
  {
    name: 'Man United',
    icon: MU,
    description: 'MU',
    href: 'https://team.7msport.com/239/index.shtml',
  },
  {
    name: 'Man Utd',
    icon: MU,
    description: 'MU',
    href: 'https://team.7msport.com/239/index.shtml',
  },
  {
    name: 'Newcastle',
    icon: Newcastle,
    description: 'Newcastle',
    href: 'https://team.7msport.com/200/index.shtml',
  },
  {
    name: 'Liverpool',
    icon: Liverpool,
    description: 'Liverpool',
    href: 'https://team.7msport.com/279/index.shtml',
  },
  {
    name: 'Brighton',
    icon: Brighton,
    description: 'Brighton',
    href: 'https://team.7msport.com/507/index.shtml',
  },
  {
    name: 'Aston Villa',
    icon: AstonVilla,
    description: 'Aston Villa',
    href: 'https://team.7msport.com/571/index.shtml',
  },
  {
    name: 'Tottenham',
    icon: Tth,
    description: 'Tth',
    href: 'https://team.7msport.com/175/index.shtml',
  },
  {
    name: 'Spurs',
    icon: Tth,
    description: 'Tth',
    href: 'https://team.7msport.com/175/index.shtml',
  },
  {
    name: 'Brentford',
    icon: Brentford,
    description: 'Brentford',
    href: 'https://team.7msport.com/473/index.shtml',
  },
  {
    name: 'Fulham',
    icon: Fulham,
    description: 'Fullham',
    href: 'https://team.7msport.com/398/index.shtml',
  },
  {
    name: 'Crystal Palace',
    icon: Crystal,
    description: 'Crystal',
    href: 'https://team.7msport.com/112/index.shtml',
  },
  {
    name: 'Chelsea',
    icon: Chelsea,
    description: 'Chelsea',
    href: 'https://team.7msport.com/444/index.shtml',
  },
  {
    name: 'Wolves',
    icon: Wolve,
    description: 'Wolve',
    href: 'https://team.7msport.com/300/index.shtml',
  },
  {
    name: 'West Ham',
    icon: Westham,
    description: 'Westham',
    href: 'https://team.7msport.com/68/index.shtml',
  },
  {
    name: 'Bournemouth',
    icon: Bournemouth,
    description: 'Bournemouth',
    href: 'https://team.7msport.com/674/index.shtml',
  },
  {
    name: 'Nottingham Forest',
    icon: Nottingham,
    description: 'Nottingham',
    href: 'https://team.7msport.com/195/index.shtml',
  },
  {
    name: 'Everton',
    icon: Everton,
    description: 'Everton',
    href: 'https://team.7msport.com/551/index.shtml',
  },
  {
    name: 'Leicester City',
    icon: Leichester,
    description: 'Leicester',
    href: 'https://team.7msport.com/293/index.shtml',
  },
  {
    name: 'Leicester',
    icon: Leichester,
    description: 'Leicester',
    href: 'https://team.7msport.com/293/index.shtml',
  },
  {
    name: 'Leeds United',
    icon: Leed,
    description: 'Leed',
    href: 'https://team.7msport.com/867/index.shtml',
  },
  {
    name: 'Leeds',
    icon: Leed,
    description: 'Leed',
    href: 'https://team.7msport.com/867/index.shtml',
  },
  {
    name: 'Southampton',
    icon: Southampton,
    description: 'Southampton',
    href: 'https://team.7msport.com/25/index.shtml',
  },
  {
    name: 'Luton Town',
    icon: Luton,
    description: 'Luton',
    href: 'https://team.7msport.com/615/index.shtml',
  },
  {
    name: 'Luton',
    icon: Luton,
    description: 'Luton',
    href: 'https://team.7msport.com/615/index.shtml',
  },
  {
    name: 'Sheffield Utd',
    icon: Sheffield,
    description: 'Sheffield',
    href: 'https://team.7msport.com/44/index.shtml',
  },
  {
    name: 'Sheffield United',
    icon: Sheffield,
    description: 'Sheffield',
    href: 'https://team.7msport.com/44/index.shtml',
  },
  {
    name: 'Burnley',
    icon: Burnley,
    description: 'Burnley',
    href: 'https://team.7msport.com/498/index.shtml',
  },
  {
    name: 'Ipswich',
    icon: Ipswich,
    description: 'Ipswich',
    href: 'https://team.7msport.com/498/index.shtml',
  },
  {
    name: 'Watford',
    icon: Watford,
    description: 'Watford',
    href: 'https://team.7msport.com/498/index.shtml',
  },
  {
    name: 'Norwich',
    icon: Norwich,
    description: 'Norwich',
    href: 'https://team.7msport.com/498/index.shtml',
  },
];

export type RunData = { value: number; className?: string; icon: string };

export const runData = [
  { value: 1, className: 'lsm2', icon: Matches },
  { value: 2, className: 'lsm2', icon: Matches },
  { value: 3, className: 'lsm2', icon: Matches },
  { value: 4, className: 'lsm2', icon: Matches },
  { value: 5, className: 'lsm2', icon: Matches },
  { value: 6, className: 'lsm2', icon: Matches },
  { value: 7, className: 'lsm2', icon: Matches },
  { value: 8, className: 'lsm2', icon: Matches },
  { value: 9, className: 'lsm2', icon: Matches },
  { value: 10, className: 'lsm2', icon: Matches },
  { value: 11, className: 'lsm2', icon: Matches },
  { value: 12, className: 'lsm2', icon: Matches },
  { value: 13, className: 'lsm2', icon: Matches },
  { value: 14, className: 'lsm2', icon: Matches },
  { value: 15, className: 'lsm2', icon: Matches },
  { value: 16, className: 'lsm2', icon: Matches },
  { value: 17, className: 'lsm2', icon: Matches },
  { value: 18, className: 'lsm2', icon: Matches },
  { value: 19, className: 'lsm2', icon: Matches },
  { value: 20, className: 'lsm2', icon: Matches },
  { value: 21, className: 'lsm2', icon: Matches },
  { value: 22, className: 'lsm2', icon: Matches },
  { value: 23, className: 'lsm2', icon: Matches },
  { value: 24, className: 'lsm2', icon: Matches },
  { value: 25, className: 'lsm2', icon: Matches },
  { value: 26, className: 'lsm2', icon: Matches },
  { value: 27, className: 'lsm2', icon: Matches },
  { value: 28, className: 'lsm2', icon: Matches },
  { value: 29, className: 'lsm2', icon: Matches },
  { value: 30, className: 'lsm2', icon: Matches },
  { value: 31, className: 'lsm2', icon: Matches },
  { value: 32, className: 'lsm2', icon: Matches },
  { value: 33, className: 'lsm2', icon: Matches },
  { value: 34, className: 'lsm2', icon: Matches },
  { value: 35, className: 'lsm2', icon: Matches },
  { value: 36, className: 'lsm2', icon: Matches },
  { value: 37, className: 'lsm2', icon: Matches },
  { value: 38, className: 'lsm2', icon: Matches },
];
export const runningData = [
  { value: 1, className: 'lsm2', icon: Matches },
  { value: 2, className: 'lsm2', icon: Matches },
  { value: 3, className: 'lsm2', icon: Matches },
  { value: 4, className: 'lsm2', icon: Matches },
  { value: 5, className: 'lsm2', icon: Matches },
  { value: 6, className: 'lsm2', icon: Matches },
  { value: 7, className: 'lsm2', icon: Matches },
  { value: 8, className: 'lsm2', icon: Matches },
  { value: 9, className: 'lsm2', icon: Matches },
  { value: 10, className: 'lsm2', icon: Matches },
  { value: 11, className: 'lsm2', icon: Matches },
  { value: 12, className: 'lsm2', icon: Matches },
  { value: 13, className: 'lsm2', icon: Matches },
  { value: 14, className: 'lsm2', icon: Matches },
  { value: 15, className: 'lsm2', icon: Matches },
  { value: 16, className: 'lsm2', icon: Matches },
  { value: 17, className: 'lsm2', icon: Matches },
  { value: 18, className: 'lsm2', icon: Matches },
  { value: 19, className: 'lsm2', icon: Matches },
  { value: 20, className: 'lsm2', icon: Matches },
  { value: 21, className: 'lsm2', icon: Matches },
  { value: 22, className: 'lsm2', icon: Matches },
  { value: 23, className: 'lsm2', icon: Matches },
  { value: 24, className: 'lsm2', icon: Matches },
  { value: 25, className: 'lsm2', icon: Matches },
  { value: 26, className: 'lsm2', icon: Matches },
  { value: 27, className: 'lsm2', icon: Matches },
  { value: 28, className: 'lsm2', icon: Matches },
  { value: 29, className: 'lsm2', icon: Matches },
  { value: 30, className: 'lsm2', icon: Matches },
  { value: 31, className: 'lsm2', icon: Matches },
  { value: 32, className: 'lsm2', icon: Matches },
  { value: 33, className: 'lsm2', icon: Matches },
  { value: 34, className: 'lsm2', icon: Matches },
  { value: 35, className: 'lsm2', icon: Matches },
  { value: 36, className: 'lsm2', icon: Matches },
  { value: 37, className: 'lsm2', icon: Matches },
  { value: 38, className: 'lsm2', icon: Matches },
];

export const initialScheduleFormValues = {
  run: 0,
  date: new Date(),
  teamHome: '',
  score: 'VS',
  teamAway: '',
  analysis: '',
};

export const initialFixtureFormValues = {
  id: '',
  name: '',
  date: new Date(),
  teamHome: '',
  homePenalty: [],
  homeScore: '',
  homeHTScore: '',
  week: null,
  teamAway: '',
  awayPenalty: [],
  awayScore: '',
  awayHTScore: '',
};

export const initialEuroFormValues = {
  date: new Date(),
  euroTeamHome: '',
  homePenalty: [],
  homeScore: '',
  status: '',
  awayScore: '',
  euroTeamAway: '',
  awayPenalty: [],
  group: '',
};

export const team = {
  value: '',
  icon: '',
  group: '',
};

export const initialEuroFormWithIconValues = {
  date: new Date(),
  euroTeamHome: team,
  homePenalty: [],
  homeScore: '',
  awayScore: '',
  homeHTScore: '',
  awayHTScore: '',
  group: '',
  round: '',
  qRound: '',
  euroTeamAway: team,
  awayPenalty: [],
};

export const valueWithIcon = {
  value: '',
  icon: '',
};

export const initialDepoValues = {
  name: '',
  email: null,
  bank: '',
  game: '',
  gameUserId: '',
  bankPT: '',
  accountNumber: '',
  depoAmount: null,
  status: '',
};
export const initialWdValues = {
  name: '',
  email: null,
  bank: '',
  game: '',
  gameUserId: '',
  accountNumber: '',
  wdAmount: null,
  status: '',
};

export const euros = [
  {
    id: 1,
    label: 'italy',
    icon: '🇮🇹',
    description: 'Italy',
  },
  {
    id: 2,
    label: 'albania',
    icon: '🇦🇱',
    description: 'Albania',
  },
  {
    id: 3,
    label: 'croatia',
    icon: '🇭🇷',
    description: 'Croatia',
  },
  {
    id: 4,
    label: 'spain',
    icon: '🇪🇸',
    description: 'Spain',
  },
  {
    id: 5,
    label: 'austria',
    icon: '🇦🇹',
    description: 'Austria',
  },
  {
    id: 6,
    label: 'france',
    icon: '🇫🇷',
    description: 'France',
  },
  {
    id: 7,
    label: 'poland',
    icon: '🇵🇱',
    description: 'Poland',
  },
  {
    id: 8,
    label: 'netherlands',
    icon: '🇳🇱',
    description: 'Netherlands',
  },
  {
    id: 9,
    label: 'belgium',
    icon: '🇧🇪',
    description: 'Belgium',
  },
  {
    id: 10,
    label: 'slovakia',
    icon: '🇸🇰',
    description: 'Slovakia',
  },
  {
    id: 11,
    label: 'romania',
    icon: '🇷🇴',
    description: 'Romania',
  },
  {
    id: 12,
    label: 'ukraine',
    icon: '🇺🇦',
    description: 'Ukraine',
  },
  {
    id: 13,
    label: 'portugal',
    icon: '🇵🇹',
    description: 'Portugal',
  },
  {
    id: 14,
    label: 'czechia',
    icon: '🇨🇿',
    description: 'Czechia',
  },
  {
    id: 15,
    label: 'georgia',
    icon: '🇬🇪',
    description: 'Georgia',
  },
  {
    id: 16,
    label: 'turkey',
    icon: '🇹🇷',
    description: 'Turkey',
  },
  {
    id: 17,
    label: 'denmark',
    icon: '🇩🇰',
    description: 'Denmark',
  },
  {
    id: 18,
    label: 'slovenia',
    icon: '🇸🇮',
    description: 'Slovenia',
  },
  {
    id: 19,
    label: 'england',
    icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    description: 'England',
  },
  {
    id: 20,
    label: 'serbia',
    icon: '🇷🇸',
    description: 'Serbia',
  },
  {
    id: 21,
    label: 'germany',
    icon: '🇩🇪',
    description: 'Germany',
  },
  {
    id: 22,
    label: 'scotland',
    icon: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    description: 'Scotland',
  },
  {
    id: 23,
    label: 'hungary',
    icon: '🇭🇺',
    description: 'Hungary',
  },
  {
    id: 24,
    label: 'switzerland',
    icon: '🇨🇭',
    description: 'Switzerland',
  },
];

export const euro = [
  {
    date: '15/06 02:00',
    status: 'Upcoming',
    home: 'Germany',
    homeScore: '-',
    homeFlag: '🇩🇪',
    away: 'Scotland',
    awayScore: '-',
    awayFlag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    group: 'Group A Round 1',
  },
  {
    date: '15/06 20:00',
    status: 'Upcoming',
    home: 'Hungary',
    homeScore: '-',
    homeFlag: '🇭🇺',
    away: 'Switzerland',
    awayScore: '-',
    awayFlag: '🇨🇭',
    group: 'Group A Round 1',
  },
  {
    date: '15/06 22:59',
    status: 'Upcoming',
    home: 'Spain',
    homeScore: '-',
    homeFlag: '🇪🇸',
    away: 'Croatia',
    awayScore: '-',
    awayFlag: '🇭🇷',
    group: 'Group B Round 1',
  },
  {
    date: '16/06 02:00',
    status: 'Upcoming',
    home: 'Italy',
    homeScore: '-',
    homeFlag: '🇮🇹',
    away: 'Albania',
    awayScore: '-',
    awayFlag: '🇦🇱',
    group: 'Group B Round 1',
  },
  {
    date: '16/06 20:00',
    status: 'Upcoming',
    home: 'Poland',
    homeScore: '-',
    homeFlag: '🇵🇱',
    away: 'Netherlands',
    awayScore: '-',
    awayFlag: '🇳🇱',
    group: 'Group D Round 1',
  },
  {
    date: '16/06 22:59',
    status: 'Upcoming',
    home: 'Slovenia',
    homeScore: '-',
    homeFlag: '🇸🇮',
    away: 'Denmark',
    awayScore: '-',
    awayFlag: '🇩🇰',
    group: 'Group C Round 1',
  },
  {
    date: '17/06 02:00',
    status: 'Upcoming',
    home: 'Serbia',
    homeScore: '-',
    homeFlag: '🇷🇸',
    away: 'England',
    awayScore: '-',
    awayFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    group: 'Group C Round 1',
  },
  {
    date: '17/06 20:00',
    status: 'Upcoming',
    home: 'Romania',
    homeScore: '-',
    homeFlag: '🇷🇴',
    away: 'Ukraine',
    awayScore: '-',
    awayFlag: '🇺🇦',
    group: 'Group E Round 1',
  },
  {
    date: '17/06 22:59',
    status: 'Upcoming',
    home: 'Belgium',
    homeScore: '-',
    homeFlag: '🇧🇪',
    away: 'Slovakia',
    awayScore: '-',
    awayFlag: '🇸🇰',
    group: 'Group E Round 1',
  },
  {
    date: '18/06 02:00',
    status: 'Upcoming',
    home: 'Austria',
    homeScore: '-',
    homeFlag: '🇦🇹',
    away: 'France',
    awayScore: '-',
    awayFlag: '🇫🇷',
    group: 'Group D Round 1',
  },
  {
    date: '18/06 22:59',
    status: 'Upcoming',
    home: 'Turkey',
    homeScore: '-',
    homeFlag: '🇹🇷',
    away: 'Georgia',
    awayScore: '-',
    awayFlag: '🇬🇪',
    group: 'Group F Round 1',
  },
  {
    date: '19/06 02:00',
    status: 'Upcoming',
    home: 'Portugal',
    homeScore: '-',
    homeFlag: '🇵🇹',
    away: 'Czech Republic',
    awayScore: '-',
    awayFlag: '🇨🇿',
    group: 'Group F Round 1',
  },
  {
    date: '19/06 20:00',
    status: 'Upcoming',
    home: 'Croatia',
    homeScore: '-',
    homeFlag: '🇭🇷',
    away: 'Albania',
    awayScore: '-',
    awayFlag: '🇨🇿',
    group: 'Group F Round 1',
  },
  {
    date: '19/06 22:59',
    status: 'Upcoming',
    home: 'Germany',
    homeScore: '-',
    homeFlag: '🇩🇪',
    away: 'Hungary',
    awayScore: '-',
    awayFlag: '🇭🇺',
    group: 'Group A Round 2',
  },
  {
    date: '20/06 02:00',
    status: 'Upcoming',
    home: 'Scotland',
    homeScore: '-',
    homeFlag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    away: 'Switzerland',
    awayScore: '-',
    awayFlag: '🇨🇭',
    group: 'Group A Round 2',
  },
];

// export const euroGroup = [
//   {
//     subGroup: [
//       {
//         id: '1a',
//         group: 'A',
//         country: 'germany',
//         icon: '🇩🇪',
//         style: 'odd:bg-zinc-100 even:bg-stone-50',
//       },
//       {
//         id: '2a',
//         group: 'A',
//         country: 'scotland',
//         icon: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
//         style: 'odd:bg-zinc-100 even:bg-stone-50',
//       },
//       {
//         id: '3a',
//         group: 'A',
//         country: 'hungary',
//         icon: '🇭🇺',
//         style: 'odd:bg-zinc-100 even:bg-stone-50',
//       },
//       {
//         id: '4a',
//         group: 'A',
//         country: 'switzerland',
//         icon: '🇨🇭',
//         style: 'odd:bg-zinc-100 even:bg-stone-50',
//       },
//     ],
//   },
//   {
//     subGroup: [
//       {
//         id: '1b',
//         group: 'B',
//         country: 'spain',
//         icon: '🇪🇸',
//         style: 'even:bg-zinc-100 odd:bg-stone-50',
//       },
//       {
//         id: '2b',
//         group: 'B',
//         country: 'croatia',
//         icon: '🇭🇷',
//         style: 'even:bg-zinc-100 odd:bg-stone-50',
//       },
//       {
//         id: '3b',
//         group: 'B',
//         country: 'italy',
//         icon: '🇮🇹',
//         style: 'even:bg-zinc-100 odd:bg-stone-50',
//       },
//       {
//         id: '4b',
//         group: 'B',
//         country: 'albania',
//         icon: '🇦🇱',
//         style: 'even:bg-zinc-100 odd:bg-stone-50',
//       },
//     ],
//   },
//   {
//     subGroup: [
//       {
//         id: '1c',
//         group: 'C',
//         country: 'slovenia',
//         icon: '🇸🇮',
//         style: 'odd:bg-zinc-100 even:bg-stone-50',
//       },
//       {
//         id: '2c',
//         group: 'C',
//         country: 'denmark',
//         icon: '🇩🇰',
//         style: 'odd:bg-zinc-100 even:bg-stone-50',
//       },
//       {
//         id: '3c',
//         group: 'C',
//         country: 'serbia',
//         icon: '🇷🇸',
//         style: 'odd:bg-zinc-100 even:bg-stone-50',
//       },
//       {
//         id: '4c',
//         group: 'C',
//         country: 'england',
//         icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
//         style: 'odd:bg-zinc-100 even:bg-stone-50',
//       },
//     ],
//   },
//   {
//     subGroup: [
//       {
//         id: '1d',
//         group: 'D',
//         country: 'netherlands',
//         icon: '🇳🇱',
//         style: 'even:bg-zinc-100 odd:bg-stone-50',
//       },
//       {
//         id: '2d',
//         group: 'D',
//         country: 'france',
//         icon: '🇫🇷',
//         style: 'even:bg-zinc-100 odd:bg-stone-50',
//       },
//       {
//         id: '3d',
//         group: 'D',
//         country: 'poland',
//         icon: '🇵🇱',
//         style: 'even:bg-zinc-100 odd:bg-stone-50',
//       },
//       {
//         id: '4d',
//         group: 'D',
//         country: 'austria',
//         icon: '🇦🇹',
//         style: 'even:bg-zinc-100 odd:bg-stone-50',
//       },
//     ],
//   },
//   {
//     subGroup: [
//       {
//         id: '1e',
//         group: 'E',
//         country: 'ukraine',
//         icon: '🇺🇦',
//         style: 'odd:bg-zinc-100 even:bg-stone-50',
//       },
//       {
//         id: '2e',
//         group: 'E',
//         country: 'slovakia',
//         icon: '🇸🇰',
//         style: 'odd:bg-zinc-100 even:bg-stone-50',
//       },
//       {
//         id: '3e',
//         group: 'E',
//         country: 'belgium',
//         icon: '🇧🇪',
//         style: 'odd:bg-zinc-100 even:bg-stone-50',
//       },
//       {
//         id: '4e',
//         group: 'E',
//         country: 'romania',
//         icon: '🇷🇴',
//         style: 'odd:bg-zinc-100 even:bg-stone-50',
//       },
//     ],
//   },
//   {
//     subGroup: [
//       {
//         id: '1F',
//         group: 'F',
//         country: 'portugal',
//         icon: '🇵🇹',
//         style: 'even:bg-zinc-100 odd:bg-stone-50',
//       },
//       {
//         id: '2F',
//         group: 'F',
//         country: 'czechia',
//         icon: '🇨🇿',
//         style: 'even:bg-zinc-100 odd:bg-stone-50',
//       },
//       {
//         id: '3F',
//         group: 'F',
//         country: 'georgia',
//         icon: '🇬🇪',
//         style: 'even:bg-zinc-100 odd:bg-stone-50',
//       },
//       {
//         id: '4F',
//         group: 'F',
//         country: 'turkey',
//         icon: '🇹🇷',
//         style: 'even:bg-zinc-100 odd:bg-stone-50',
//       },
//     ],
//   },
// ];

export type TMatchesSubProps = {
  group?: string;
  home?: {
    value: string;
    icon: string;
  };
  away?: {
    value: string;
    icon: string;
  };
  result?: string;
  date?: string;
};

export const uefaA = [
  {
    group: 'A',
    euroTeamHome: {
      value: 'germany',
      icon: '🇩🇪',
    },
    euroTeamAway: {
      value: 'scotland',
      icon: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    },
    date: '2024-06-14T19:00:00.000+00:00',
    // result: '5-1',
    homeGoals: 5,
    awayGoals: 1,
  },
  {
    group: 'A',
    euroTeamHome: {
      value: 'hungary',
      icon: '🇭🇺',
    },
    euroTeamAway: {
      value: 'switzerland',
      icon: '🇨🇭',
    },
    date: '2024-06-15T13:00:00.000+00:00',
    // result: '1-3',
    homeGoals: 1,
    awayGoals: 3,
  },
  {
    group: 'A',
    euroTeamHome: {
      value: 'germany',
      icon: '🇩🇪',
    },
    euroTeamAway: {
      value: 'hungary',
      icon: '🇭🇺',
    },
    date: '2024-06-19T16:00:00.000+00:00',
    // result: '2-1',
    homeGoals: 2,
    awayGoals: 1,
  },
  {
    group: 'A',
    euroTeamHome: {
      value: 'scotland',
      icon: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    },
    euroTeamAway: {
      value: 'switzerland',
      icon: '🇨🇭',
    },
    date: '2024-06-19T19:00:00.000+00:00',
    // result: '1-1',
    homeGoals: 1,
    awayGoals: 1,
  },
  {
    group: 'A',
    euroTeamHome: {
      value: 'switzerland',
      icon: '🇨🇭',
    },
    euroTeamAway: {
      value: 'germany',
      icon: '🇩🇪',
    },
    date: '2024-06-23T19:00:00.000+00:00',
    // result: '',
    homeGoals: null,
    awayGoals: null,
  },
  {
    group: 'A',
    euroTeamHome: {
      value: 'scotland',
      icon: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    },
    euroTeamAway: {
      value: 'hungary',
      icon: '🇭🇺',
    },
    date: '2024-06-23T19:00:00.000+00:00',
    // result: '',
    homeGoals: null,
    awayGoals: null,
  },
];
export const uefaB = [
  {
    group: 'B',
    euroTeamHome: {
      value: 'spain',
      icon: '🇪🇸',
    },
    euroTeamAway: {
      value: 'croatia',
      icon: '🇭🇷',
    },
    date: '2024-06-15T16:00:00.000+00:00',
    // result: '3-1',
    homeGoals: 3,
    awayGoals: 1,
  },
  {
    group: 'B',
    euroTeamHome: {
      value: 'italy',
      icon: '🇮🇹',
    },
    euroTeamAway: {
      value: 'albania',
      icon: '🇦🇱',
    },
    date: '2024-06-15T19:00:00.000+00:00',
    // result: '2-1',
    homeGoals: 2,
    awayGoals: 1,
  },
  {
    group: 'B',
    euroTeamHome: {
      value: 'croatia',
      icon: '🇭🇷',
    },
    euroTeamAway: {
      value: 'albania',
      icon: '🇦🇱',
    },
    date: '2024-06-19T13:00:00.000+00:00',
    // result: '2-2',
    homeGoals: 2,
    awayGoals: 2,
  },
  {
    group: 'B',
    euroTeamHome: {
      value: 'spain',
      icon: '🇪🇸',
    },
    euroTeamAway: {
      value: 'italy',
      icon: '🇮🇹',
    },
    date: '2024-06-20T19:00:00.000+00:00',
    // result: '',
    homeGoals: undefined,
    awayGoals: undefined,
  },
  {
    group: 'B',
    euroTeamHome: {
      value: 'albania',
      icon: '🇦🇱',
    },
    euroTeamAway: {
      value: 'spain',
      icon: '🇪🇸',
    },
    date: '2024-06-24T19:00:00.000+00:00',
    // result: '',
    homeGoals: undefined,
    awayGoals: undefined,
  },
  {
    group: 'B',
    euroTeamHome: {
      value: 'croatia',
      icon: '🇭🇷',
    },
    euroTeamAway: {
      value: 'italy',
      icon: '🇮🇹',
    },
    date: '2024-06-24T19:00:00.000+00:00',
    // result: '',
    homeGoals: undefined,
    awayGoals: undefined,
  },
];
export const uefaC = [
  {
    group: 'C',
    euroTeamHome: {
      value: 'slovenia',
      icon: '🇸🇮',
    },
    euroTeamAway: {
      value: 'denmark',
      icon: '🇩🇰',
    },
    date: '2024-06-16T16:00:00.000+00:00',
    // result: '1-1',
    homeGoals: 1,
    awayGoals: 1,
  },
  {
    group: 'C',
    euroTeamHome: {
      value: 'serbia',
      icon: '🇷🇸',
    },
    euroTeamAway: {
      value: 'england',
      icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    },
    date: '2024-06-16T19:00:00.000+00:00',
    // result: '0-1',
    homeGoals: 0,
    awayGoals: 1,
  },
  {
    group: 'C',
    euroTeamHome: {
      value: 'slovenia',
      icon: '🇸🇮',
    },
    euroTeamAway: {
      value: 'serbia',
      icon: '🇷🇸',
    },
    date: '2024-06-20T13:00:00.000+00:00',
    // result: '',
    homeGoals: undefined,
    awayGoals: undefined,
  },
  {
    group: 'C',
    euroTeamHome: {
      value: 'denmark',
      icon: '🇩🇰',
    },
    euroTeamAway: {
      value: 'england',
      icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    },
    date: '2024-06-20T16:00:00.000+00:00',
    // result: '',
    homeGoals: undefined,
    awayGoals: undefined,
  },
  {
    group: 'C',
    euroTeamHome: {
      value: 'denmark',
      icon: '🇩🇰',
    },
    euroTeamAway: {
      value: 'serbia',
      icon: '🇷🇸',
    },
    date: '2024-06-25T19:00:00.000+00:00',
    // result: '',
    homeGoals: undefined,
    awayGoals: undefined,
  },
  {
    group: 'C',
    euroTeamHome: {
      value: 'england',
      icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    },
    euroTeamAway: {
      value: 'slovenia',
      icon: '🇸🇮',
    },
    date: '2024-06-25T07:00:00.000+00:00',
    // result: '',
    homeGoals: undefined,
    awayGoals: undefined,
  },
];
export const uefaD = [
  {
    group: 'D',
    euroTeamHome: {
      value: 'poland',
      icon: '🇵🇱',
    },
    euroTeamAway: {
      value: 'netherlands',
      icon: '🇳🇱',
    },
    date: '2024-06-16T13:00:00.000+00:00',
    // result: '1-2',
    homeGoals: 1,
    awayGoals: 2,
  },
  {
    group: 'D',
    euroTeamHome: {
      value: 'austria',
      icon: '🇦🇹',
    },
    euroTeamAway: {
      value: 'france',
      icon: '🇫🇷',
    },
    date: '2024-06-17T19:00:00.000+00:00',
    // result: '0-1',
    homeGoals: 0,
    awayGoals: 1,
  },
  {
    group: 'D',
    euroTeamHome: {
      value: 'poland',
      icon: '🇵🇱',
    },
    euroTeamAway: {
      value: 'austria',
      icon: '🇦🇹',
    },
    date: '2024-06-21T16:00:00.000+00:00',
    // result: '',
    homeGoals: undefined,
    awayGoals: undefined,
  },
  {
    group: 'D',
    euroTeamHome: {
      value: 'netherlands',
      icon: '🇳🇱',
    },
    euroTeamAway: {
      value: 'france',
      icon: '🇫🇷',
    },
    date: '2024-06-21T19:00:00.000+00:00',
    // result: '',
    homeGoals: undefined,
    awayGoals: undefined,
  },
  {
    group: 'D',
    euroTeamHome: {
      value: 'netherlands',
      icon: '🇳🇱',
    },
    euroTeamAway: {
      value: 'austria',
      icon: '🇦🇹',
    },
    date: '2024-06-25T16:00:00.000+00:00',
    // result: '',
    homeGoals: undefined,
    awayGoals: undefined,
  },
  {
    group: 'D',
    euroTeamHome: {
      value: 'france',
      icon: '🇫🇷',
    },
    euroTeamAway: {
      value: 'poland',
      icon: '🇵🇱',
    },
    date: '2024-06-25T16:00:00.000+00:00',
    // result: '',
    homeGoals: undefined,
    awayGoals: undefined,
  },
];
export const uefaE = [
  {
    group: 'E',
    euroTeamHome: {
      value: 'romania',
      icon: '🇷🇴',
    },
    euroTeamAway: {
      value: 'ukraine',
      icon: '🇺🇦',
    },
    date: '2024-06-17T13:00:00.000+00:00',
    // result: '3-0',
    homeGoals: 3,
    awayGoals: 0,
  },
  {
    group: 'E',
    euroTeamHome: {
      value: 'belgium',
      icon: '🇧🇪',
    },
    euroTeamAway: {
      value: 'slovakia',
      icon: '🇸🇰',
    },
    date: '2024-06-17T16:00:00.000+00:00',
    // result: '0-1',
    homeGoals: 0,
    awayGoals: 1,
  },
  {
    group: 'E',
    euroTeamHome: {
      value: 'slovakia',
      icon: '🇸🇰',
    },
    euroTeamAway: {
      value: 'ukraine',
      icon: '🇺🇦',
    },
    date: '2024-06-21T13:00:00.000+00:00',
    // result: '',
    homeGoals: undefined,
    awayGoals: undefined,
  },
  {
    group: 'E',
    euroTeamHome: {
      value: 'belgium',
      icon: '🇧🇪',
    },
    euroTeamAway: {
      value: 'romania',
      icon: '🇷🇴',
    },
    date: '2024-06-22T19:00:00.000+00:00',
    // result: '',
    homeGoals: undefined,
    awayGoals: undefined,
  },
  {
    group: 'E',
    euroTeamHome: {
      value: 'slovakia',
      icon: '🇸🇰',
    },
    euroTeamAway: {
      value: 'romania',
      icon: '🇷🇴',
    },
    date: '2024-06-26T16:00:00.000+00:00',
    // result: '',
    homeGoals: undefined,
    awayGoals: undefined,
  },
  {
    group: 'E',
    euroTeamHome: {
      value: 'ukraine',
      icon: '🇺🇦',
    },
    euroTeamAway: {
      value: 'belgium',
      icon: '🇧🇪',
    },
    date: '2024-06-26T16:00:00.000+00:00',
    // result: '',
    homeGoals: undefined,
    awayGoals: undefined,
  },
];
export const uefaF = [
  {
    group: 'F',
    euroTeamHome: {
      value: 'turkey',
      icon: '🇹🇷',
    },
    euroTeamAway: {
      value: 'georgia',
      icon: '🇬🇪',
    },
    date: '2024-06-26T16:00:00.000+00:00',
    // result: '3-1',
    homeGoals: 3,
    awayGoals: 1,
  },
  {
    group: 'F',
    euroTeamHome: {
      value: 'portugal',
      icon: '🇵🇹',
    },
    euroTeamAway: {
      value: 'czechia',
      icon: '🇨🇿',
    },
    date: '2024-06-18T19:00:00.000+00:00',
    // result: '2-1',
    homeGoals: 2,
    awayGoals: 1,
  },
  {
    group: 'F',
    euroTeamHome: {
      value: 'georgia',
      icon: '🇬🇪',
    },
    euroTeamAway: {
      value: 'czechia',
      icon: '🇨🇿',
    },
    date: '2024-06-22T13:00:00.000+00:00',
    // result: '',
    homeGoals: undefined,
    awayGoals: undefined,
  },
  {
    group: 'F',
    euroTeamHome: {
      value: 'turkey',
      icon: '🇹🇷',
    },
    euroTeamAway: {
      value: 'portugal',
      icon: '🇵🇹',
    },
    date: '2024-06-22T16:00:00.000+00:00',
    // result: '',
    homeGoals: undefined,
    awayGoals: undefined,
  },
  {
    group: 'F',
    euroTeamHome: {
      value: 'czechia',
      icon: '🇨🇿',
    },
    euroTeamAway: {
      value: 'turkey',
      icon: '🇹🇷',
    },
    date: '2024-06-26T19:00:00.000+00:00',
    // result: '',
    homeGoals: undefined,
    awayGoals: undefined,
  },
  {
    group: 'F',
    euroTeamHome: {
      value: 'georgia',
      icon: '🇬🇪',
    },
    euroTeamAway: {
      value: 'portugal',
      icon: '🇵🇹',
    },
    date: '2024-06-26T19:00:00.000+00:00',
    // result: '',
    homeGoals: undefined,
    awayGoals: undefined,
  },
];

export const euroGroupA = [
  {
    country: 'germany',
    icon: '🇩🇪',
    group: 'A',
  },
  {
    country: 'scotland',
    icon: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    group: 'A',
  },
  {
    country: 'hungary',
    icon: '🇭🇺',
    group: 'A',
  },
  {
    country: 'switzerland',
    icon: '🇨🇭',
    group: 'A',
  },
];

export const euroGroupB = [
  {
    country: 'spain',
    icon: '🇪🇸',
    group: 'B',
  },
  {
    country: 'croatia',
    icon: '🇭🇷',
    group: 'B',
  },
  {
    country: 'italy',
    icon: '🇮🇹',
    group: 'B',
  },
  {
    country: 'albania',
    icon: '🇦🇱',
    group: 'B',
  },
];

export const euroGroupC = [
  {
    country: 'slovenia',
    icon: '🇸🇮',
    group: 'C',
  },
  {
    country: 'denmark',
    icon: '🇩🇰',
    group: 'C',
  },
  {
    country: 'serbia',
    icon: '🇷🇸',
    group: 'C',
  },
  {
    country: 'england',
    icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    group: 'C',
  },
];

export const euroGroupD = [
  {
    value: 'netherlands',
    icon: '🇳🇱',
    group: 'D',
  },
  {
    value: 'france',
    icon: '🇫🇷',
    group: 'D',
  },
  {
    value: 'poland',
    icon: '🇵🇱',
    group: 'D',
  },
  {
    value: 'austria',
    icon: '🇦🇹',
    group: 'D',
  },
];

export const euroGroupE = [
  {
    value: 'ukraine',
    icon: '🇺🇦',
    group: 'E',
  },
  {
    value: 'slovakia',
    icon: '🇸🇰',
    group: 'E',
  },
  {
    value: 'belgium',
    icon: '🇧🇪',
    group: 'E',
  },
  {
    value: 'romania',
    icon: '🇷🇴',
    group: 'E',
  },
];

export const euroGroupF = [
  {
    value: 'portugal',
    icon: '🇵🇹',
    group: 'F',
  },
  {
    value: 'czechia',
    icon: '🇨🇿',
    group: 'F',
  },
  {
    value: 'georgia',
    icon: '🇬🇪',
    group: 'F',
  },
  {
    value: 'turkey',
    icon: '🇹🇷',
    group: 'F',
  },
];
export const euroGroup = [
  euroGroupA,
  euroGroupB,
  euroGroupC,
  euroGroupD,
  euroGroupE,
  euroGroupF,
];
// export const uefaMatches = [
//   uefaA,
//   // uefaB, uefaC, uefaD, uefaE, uefaF
// ];

export const euGroup = [
  {
    group: 'A',
    icon: Euro24,
  },
  {
    group: 'B',
    icon: Euro24,
  },
  {
    group: 'C',
    icon: Euro24,
  },
  {
    group: 'D',
    icon: Euro24,
  },
  {
    group: 'E',
    icon: Euro24,
  },
  {
    group: 'F',
    icon: Euro24,
  },
];

export const penalty = [
  {
    value: '1red',
    icon: Red,
    style: 'text-sky-500',
    description: '1',
  },
  {
    value: '2red',
    icon: Red,
    style: 'text-rose-500',
    description: '2',
  },
  {
    value: '3red',
    icon: Red,
    style: 'text-rose-500',
    description: '3',
  },
  {
    value: '4red',
    icon: Red,
    style: 'text-rose-500',
    description: '4',
  },
  {
    value: '1yellow',
    icon: Yellow,
    style: 'text-amber-500',
    description: '1',
  },
  {
    value: '2yellow',
    icon: Yellow,
    style: 'text-yellow-500',
    description: '2',
  },

  {
    value: '3yellow',
    icon: Yellow,
    style: 'text-yellow-500',
    description: '3',
  },
  {
    value: '4yellow',
    icon: Yellow,
    style: 'text-yellow-500',
    description: '4',
  },
  {
    value: '5yellow',
    icon: Yellow,
    style: 'text-yellow-500',
    description: '5',
  },
  {
    value: '6yellow',
    icon: Yellow,
    style: 'text-yellow-500',
    description: '6',
  },
  {
    value: '1penalty',
    icon: GiSoccerKick,
    style: 'text-emerald-800',
    description: '1',
  },
  {
    value: '2penalty',
    icon: GiSoccerKick,
    style: 'text-emerald-800',
    description: '2',
  },
  {
    value: '3penalty',
    icon: GiSoccerKick,
    style: 'text-emerald-800',
    description: '3',
  },
  {
    value: '4penalty',
    icon: GiSoccerKick,
    style: 'text-emerald-800',
    description: '4',
  },
  {
    value: '5penalty',
    icon: GiSoccerKick,
    style: 'text-emerald-800',
    description: '5',
  },
  {
    value: '6penalty',
    icon: GiSoccerKick,
    style: 'text-emerald-800',
    description: '6',
  },
  {
    value: '7penalty',
    icon: GiSoccerKick,
    style: 'text-emerald-800',
    description: '7',
  },
  {
    value: '8penalty',
    icon: GiSoccerKick,
    style: 'text-emerald-800',
    description: '8',
  },
];

export const EPLPeriod = [
  {
    value: '21-22',
    label: '2021 - 2022',
    icon: PL,
  },
  {
    value: '22-23',
    label: '2022 - 2023',
    icon: PL,
  },
  {
    value: '23-24',
    label: '2023 - 2024',
    icon: PL,
  },
  {
    value: '24-25',
    label: '2024 - 2025',
    icon: PL,
  },
];

type TableData = { value: number; className?: string };

export const weeksTableRows: TableData[][] = [
  [
    { value: 1, className: 'lsm2' },
    { value: 2, className: 'lsm2' },
    { value: 3, className: 'lsm2' },
    { value: 4, className: 'lsm2' },
    { value: 5, className: 'lsm2' },
    { value: 6, className: 'lsm2' },
    { value: 7, className: 'lsm2' },
    { value: 8, className: 'lsm2' },
    { value: 9, className: 'lsm2' },
    { value: 10, className: 'lsm2' },
    { value: 11, className: 'lsm2' },
    { value: 12, className: 'lsm2' },
    { value: 13, className: 'lsm2' },
    { value: 14, className: 'lsm2' },
    { value: 15, className: 'lsm2' },
    { value: 16, className: 'lsm2' },
    { value: 17, className: 'lsm2' },
    { value: 18, className: 'lsm2' },
    { value: 19, className: 'lsm2' },
    { value: 20, className: 'lsm2' },
    { value: 21, className: 'lsm2' },
    { value: 22, className: 'lsm2' },
    { value: 23, className: 'lsm2' },
    { value: 24, className: 'lsm2' },
    { value: 25, className: 'lsm2' },
    { value: 26, className: 'lsm2' },
    { value: 27, className: 'lsm2' },
    { value: 28, className: 'lsm2' },
    { value: 29, className: 'lsm2' },
    { value: 30, className: 'lsm2' },
    { value: 31, className: 'lsm2' },
    { value: 32, className: 'lsm2' },
    { value: 33, className: 'lsm2' },
    { value: 34, className: 'lsm2' },
    { value: 35, className: 'lsm2' },
    { value: 36, className: 'lsm2' },
    { value: 37, className: 'lsm2' },
    { value: 38, className: 'lsm2' },
    // { value: 39, className: 'lsm2' },
  ],
];

export const weeks = [
  { value: 1, className: 'lsm2', icon: BsCalendarWeek },
  { value: 2, className: 'lsm2', icon: BsCalendarWeek },
  { value: 3, className: 'lsm2', icon: BsCalendarWeek },
  { value: 4, className: 'lsm2', icon: BsCalendarWeek },
  { value: 5, className: 'lsm2', icon: BsCalendarWeek },
  { value: 6, className: 'lsm2', icon: BsCalendarWeek },
  { value: 7, className: 'lsm2', icon: BsCalendarWeek },
  { value: 8, className: 'lsm2', icon: BsCalendarWeek },
  { value: 9, className: 'lsm2', icon: BsCalendarWeek },
  { value: 10, className: 'lsm2', icon: BsCalendarWeek },
  { value: 11, className: 'lsm2', icon: BsCalendarWeek },
  { value: 12, className: 'lsm2', icon: BsCalendarWeek },
  { value: 13, className: 'lsm2', icon: BsCalendarWeek },
  { value: 14, className: 'lsm2', icon: BsCalendarWeek },
  { value: 15, className: 'lsm2', icon: BsCalendarWeek },
  { value: 16, className: 'lsm2', icon: BsCalendarWeek },
  { value: 17, className: 'lsm2', icon: BsCalendarWeek },
  { value: 18, className: 'lsm2', icon: BsCalendarWeek },
  { value: 19, className: 'lsm2', icon: BsCalendarWeek },
  { value: 20, className: 'lsm2', icon: BsCalendarWeek },
  { value: 21, className: 'lsm2', icon: BsCalendarWeek },
  { value: 22, className: 'lsm2', icon: BsCalendarWeek },
  { value: 23, className: 'lsm2', icon: BsCalendarWeek },
  { value: 24, className: 'lsm2', icon: BsCalendarWeek },
  { value: 25, className: 'lsm2', icon: BsCalendarWeek },
  { value: 26, className: 'lsm2', icon: BsCalendarWeek },
  { value: 27, className: 'lsm2', icon: BsCalendarWeek },
  { value: 28, className: 'lsm2', icon: BsCalendarWeek },
  { value: 29, className: 'lsm2', icon: BsCalendarWeek },
  { value: 30, className: 'lsm2', icon: BsCalendarWeek },
  { value: 31, className: 'lsm2', icon: BsCalendarWeek },
  { value: 32, className: 'lsm2', icon: BsCalendarWeek },
  { value: 33, className: 'lsm2', icon: BsCalendarWeek },
  { value: 34, className: 'lsm2', icon: BsCalendarWeek },
  { value: 35, className: 'lsm2', icon: BsCalendarWeek },
  { value: 36, className: 'lsm2', icon: BsCalendarWeek },
  { value: 37, className: 'lsm2', icon: BsCalendarWeek },
  { value: 38, className: 'lsm2', icon: BsCalendarWeek },
];

export const status = [
  {
    value: 'ok',
    icon: FcOk,
  },
  {
    value: 'failed',
    icon: FcDisapprove,
  },
  // {
  //   value: 'in progress',
  //   icon: FaPersonRunning,
  // },
  {
    value: 'error',
    icon: FcHighPriority,
  },
  {
    value: 'garbage',
    icon: FcFullTrash,
  },
];
export const statuses = [
  {
    value: 'new',
    icon: MdOutlineFiberNew,
    styles: 'font-extrabold text-sky-700',
  },
  {
    value: 'success',
    icon: FcOk,
    styles: 'font-extrabold text-emerald-700',
  },
  {
    value: 'gagal',
    icon: FaExclamationTriangle,
    styles: 'font-extrabold text-pink-700',
  },
  // {
  //   value: 'in progress',
  //   icon: FaPersonRunning,
  //   styles: 'font-extrabold text-blue-700',
  // },
  {
    value: 'error',
    icon: FcHighPriority,
    styles: 'font-extrabold text-red-700',
  },
  {
    value: 'sampah',
    icon: GiTurd,
    styles: 'font-extrabold text-amber-700',
  },
];
export const processDepoWd = [
  {
    value: 'ok',
    icon: FcOk,
    styles: 'text-sky-700',
  },
  {
    value: 'no',
    icon: GiCrossMark,
    styles: 'text-gray-500',
  },
];

export const adminLinks = [
  {
    // icon: BiHome,
    label: 'Home',
    href: `/`,
    className: ' p-0 m-0 hidden',
  },
  {
    // icon: FcCurrencyExchange,
    label: 'Deposit',
    href: `/dashboard/admin/deposits`,
    modal: 'depo',
    className:
      'text-xs font-semibold  rounded-l-full px-6 py-2 cursor-pointer hover:shadow-md hover:bg-emerald-50',
  },
  {
    // icon: FcMoneyTransfer,
    label: 'WD',
    href: `/dashboard/admin/wds`,
    modal: 'wd',
    className:
      'hidden sm:block text-xs py-2 font-semibold px-6 border-x-[1px] flex-1 text-center cursor-pointer hover:shadow-md hover:bg-emerald-50',
  },
  {
    // icon: FcNews,
    label: 'Berita',
    href: `/posts`,
    modal: '',
    className:
      'hidden whitespace-nowrap sm:block text-xs font-semibold px-6 py-2 border-x-[1px] flex-1 text-center  md:hidden lg:block cursor-pointer hover:shadow-md hover:bg-emerald-50',
  },
  {
    // icon: FcDataSheet,
    label: 'Jadwal',
    href: `/soccer`,
    modal: '',
    className:
      'hidden whitespace-nowrap sm:block text-xs font-semibold px-6 py-2 border-x-[1px] flex-1 text-center  md:hidden lg:block cursor-pointer hover:shadow-md hover:bg-emerald-50',
  },
  {
    // icon: FcCalendar,
    label: 'Input-Jadwal',
    href: `/dashboard/admin/schedules`,
    modal: 'add-schedule',
    className:
      'hidden whitespace-nowrap sm:block text-xs font-semibold px-6 py-2 border-x-[1px] flex-1 text-center  md:hidden lg:block cursor-pointer hover:shadow-md hover:bg-emerald-50',
  },
  {
    // icon: FcTemplate,
    label: 'New-Post',
    href: '/dashboard/admin/posts',
    modal: 'post',
    className:
      'hidden whitespace-nowrap sm:block text-xs font-semibold px-6 py-2 border-x-[1px] flex-1 text-center  md:hidden lg:block cursor-pointer hover:shadow-md hover:bg-emerald-50',
  },
  {
    // icon: FcTemplate,
    label: 'New-Topic',
    href: `/dashboard/admin/topics`,
    modal: 'topic',
    className:
      'hidden whitespace-nowrap sm:block text-xs font-semibold px-6 py-2 border-x-[1px] flex-1 text-center  md:hidden lg:block cursor-pointer hover:shadow-md hover:bg-emerald-50',
  },
  {
    // icon: UeFa,
    label: 'Euro 2024',
    href: `/euro`,
    modal: '',
    className:
      'hidden whitespace-nowrap sm:block text-xs font-semibold px-6 py-2 border-x-[1px] flex-1 text-center  md:hidden lg:block cursor-pointer hover:shadow-md hover:bg-emerald-50',
  },
  {
    // icon: FcPanorama,
    label: 'Slider',
    href: `/dashboard/admin/sliders`,
    modal: 'add-slider',
    className:
      'hidden whitespace-nowrap sm:block text-xs font-semibold px-6 py-2 border-x-[1px] flex-1 text-center  md:hidden lg:block cursor-pointer hover:shadow-md hover:bg-emerald-50',
  },
  {
    // icon: RiAdminLine,
    label: 'Admin',
    href: `/admin`,
    modal: '',
    className:
      'hidden whitespace-nowrap sm:block text-xs font-semibold px-6 py-2 border-x-[1px] flex-1 text-center  md:hidden lg:block cursor-pointer hover:shadow-md hover:bg-emerald-50',
  },
  {
    // icon: FaUser,
    label: 'User Data',
    href: `/dashboard/admin/users`,
    modal: '',
    className:
      'hidden whitespace-nowrap sm:block text-xs font-semibold px-6 py-2 border-x-[1px] flex-1 text-center  md:hidden lg:block cursor-pointer hover:shadow-md hover:bg-emerald-50',
  },
  {
    // icon: FaUser,
    label: 'Member',
    href: `/members`,
    modal: '',
    className:
      'hidden whitespace-nowrap sm:block text-xs font-semibold px-6 py-2 border-x-[1px] flex-1 text-center  md:hidden lg:block cursor-pointer hover:shadow-md hover:bg-emerald-50',
  },
  {
    // icon: BiMessageRoundedDots,
    label: 'Messages',
    // href: `/dashboard/admin/messages`,
    href: (container: string) =>
      `/dashboard/admin/messages?container=${container}`,
    // href: `/dashboard/admin/messages?container=inbox`,
    modal: '',
    className:
      'hidden whitespace-nowrap sm:block text-xs font-semibold px-6 py-2 border-x-[1px] flex-1 text-center  md:hidden lg:block cursor-pointer hover:shadow-md hover:bg-emerald-50',
  },
  {
    // icon: BiMessageRoundedDots,
    label: 'Dashboard',
    href: `/dashboard`,
    modal: '',
    className:
      'hidden whitespace-nowrap sm:block text-xs font-semibold px-6 py-2 border-x-[1px] flex-1 text-center  md:hidden lg:block cursor-pointer hover:shadow-md hover:bg-emerald-50',
  },
  {
    // icon: TbScoreboard,
    label: 'Livescore',
    href: '/dashboard/livescore',
    modal: '',
    className:
      'hidden sm:block text-xs bg-slate-50 rounded-r-full py-2  font-semibold px-6 border-x-[1px] flex-1 text-center cursor-pointer h-full hover:shadow-md hover:bg-emerald-50',
  },
];
export const userLinks = [
  {
    // icon: BiHome,
    label: 'Home',
    href: `/`,
    className: ' p-0 m-0 hidden',
  },
  {
    // icon: FcCurrencyExchange,
    label: 'Deposit',
    href: `/dashboard/deposit`,
    modal: 'depo',
    className:
      'text-xs font-semibold  rounded-l-full px-6 py-2 cursor-pointer hover:shadow-md hover:bg-emerald-50',
  },
  {
    // icon: FcMoneyTransfer,
    label: 'WD',
    href: `/dashboard/wds`,
    modal: 'wd',
    className:
      'hidden sm:block text-xs py-2 font-semibold px-6 border-x-[1px] flex-1 text-center cursor-pointer hover:shadow-md hover:bg-emerald-50',
  },
  {
    // icon: FcNews,
    label: 'Berita',
    href: `/posts`,
    className:
      'hidden whitespace-nowrap sm:block text-xs font-semibold px-6 py-2 border-x-[1px] flex-1 text-center  md:hidden lg:block cursor-pointer hover:shadow-md hover:bg-emerald-50',
  },
  {
    // icon: FcDataSheet,
    label: 'Jadwal',
    href: `/soccer`,
    className:
      'hidden whitespace-nowrap sm:block text-xs font-semibold px-6 py-2 border-x-[1px] flex-1 text-center  md:hidden lg:block cursor-pointer hover:shadow-md hover:bg-emerald-50',
  },

  {
    // icon: UeFa,
    label: 'Euro 2024',
    href: `/euro`,
    className:
      'hidden whitespace-nowrap sm:block text-xs font-semibold px-6 py-2 border-x-[1px] flex-1 text-center  md:hidden lg:block cursor-pointer hover:shadow-md hover:bg-emerald-50',
  },
  {
    // icon: FaUser,
    label: 'User Data',
    href: `/users`,
    className:
      'hidden whitespace-nowrap sm:block text-xs font-semibold px-6 py-2 border-x-[1px] flex-1 text-center  md:hidden lg:block cursor-pointer hover:shadow-md hover:bg-emerald-50',
  },
  {
    // icon: BiMessageRoundedDots,
    label: 'Messages',
    // href: `/dashboard/messages`,
    href: (container: string) => `/dashboard/messages?container=${container}`,
    className:
      'hidden whitespace-nowrap sm:block text-xs font-semibold px-6 py-2 border-x-[1px] flex-1 text-center  md:hidden lg:block cursor-pointer hover:shadow-md hover:bg-emerald-50',
  },
  {
    // icon: FaUser,
    label: 'Member',
    href: `/members`,
    className:
      'hidden whitespace-nowrap sm:block text-xs font-semibold px-6 py-2 border-x-[1px] flex-1 text-center  md:hidden lg:block cursor-pointer hover:shadow-md hover:bg-emerald-50',
  },
  {
    // icon: BiMessageRoundedDots,
    label: 'Dashboard',
    href: `/dashboard`,
    modal: '',
    className:
      'hidden whitespace-nowrap sm:block text-xs font-semibold px-6 py-2 border-x-[1px] flex-1 text-center  md:hidden lg:block cursor-pointer hover:shadow-md hover:bg-emerald-50',
  },
  {
    // icon: TbScoreboard,
    label: 'Livescore',
    href: '/dashboard/livescore',
    className:
      'hidden sm:block text-xs bg-slate-50 rounded-r-full py-2  font-semibold px-6 border-x-[1px] flex-1 text-center cursor-pointer h-full hover:shadow-md hover:bg-emerald-50',
  },
];

export const dashboardCardItems = [
  {
    title: 'Posts',
    // icon: <Newspaper className='text-slate-500' size={72} />,
    icon: Newspaper,
    count: 100,
  },
  {
    title: 'Categories',
    // icon: <Folder className='text-slate-500' size={72} />,
    icon: Folder,
    count: 12,
  },
  {
    title: 'Users',
    // icon: <User className='text-slate-500' size={72} />,
    icon: User,
    count: 750,
  },
  {
    title: 'Deposits',
    // icon: <User className='text-slate-500' size={72} />,
    icon: Banknote,
    count: 150,
  },
  {
    title: 'Wds',
    // icon: <User className='text-slate-500' size={72} />,
    icon: HandCoins,
    count: 250,
  },
  {
    title: 'Comments',
    // icon: <MessageCircle className='text-slate-500' size={72} />,
    icon: MessageCircle,
    count: 1200,
  },
];

export const dashboardUserMenu = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    link: '/dashboard',
  },
  {
    title: 'Posts',
    icon: Newspaper,
    link: '/dashboard/posts',
  },
  {
    title: 'Categories',
    icon: Folder,
    link: '/dashboard/categories',
  },
  {
    title: 'Deposits',
    icon: BadgeDollarSign,
    link: (userId: string) => `/dashboard/deposit/${userId}`,
  },
  {
    title: 'Wds',
    icon: HandCoins,
    link: (userId: string) => `/dashboard/wds/${userId}`,
  },
  {
    title: 'Messages',
    icon: MessageCircleMore,
    // link: '/dashboard/messages',
    link: (container: string) => `/dashboard/messages?container=${container}`,
  },
];
export const dashboardSettingMenu = [
  {
    title: 'Profile',
    icon: UserCog2,
    link: '/dashboard/members/profile',
    shortcut: '⌘P',
  },
  {
    title: 'Billing',
    icon: CreditCard,
    link: '/dashboard/members/billings',
    shortcut: '⌘B',
  },
  {
    title: 'Settings',
    icon: Settings,
    link: '/dashboard/members/settings',
    shortcut: '⌘S',
  },
];

export const dashboardAdminMenu = [
  {
    title: 'Deposits',
    icon: CircleDollarSign,
    link: '/dashboard/admin/deposits',
  },
  {
    title: 'Wds',
    icon: Banknote,
    link: '/dashboard/admin/wds',
  },
  {
    title: 'Posts',
    icon: Newspaper,
    link: '/dashboard/admin/posts',
  },
  {
    title: 'Schedules',
    icon: CalendarDays,
    link: '/dashboard/admin/schedules',
  },
  {
    title: 'Topics',
    icon: ListChecks,
    link: '/dashboard/admin/topics',
  },
  {
    title: 'Sliders',
    icon: Image,
    link: '/dashboard/admin/sliders',
  },
  {
    title: 'Messages',
    icon: MessageSquareMore,
    // link: `/dashboard/admin/messages`,
    link: (container: string) =>
      `/dashboard/admin/messages?container=${container}`,
  },
  {
    title: 'Users',
    icon: Users2,
    link: '/dashboard/admin/users',
  },
];

export const adminChatProfile = {
  id: '66b5e94e1df1aa252cef500f',
  name: 'mao',
  email: 'mao@mao.com',
  // emailVerified: '2024-08-09T10:02:54.609Z',
  phone: '1111-1111-111',
  bank: 'BNI',
  game: ['AgenBet', 'Ibcbet'],
  accountNumber: '1111-1111-1111',
  image:
    'https://res.cloudinary.com/tommy08/image/upload/v1725587833/agenliga/q5vhz8nycwtffncsgecr.jpg',
  // password: null,
  // hashedPassword:
  //   '$2a$12$3bNalKKHg9CETfTOle49leBnICf2KWGyI4z51qMRfUW00qvFLnese',
  profileComplete: true,
  active: true,
  role: Role.admin,
  nonUserSessionId: null,
  // createdAt: '2024-08-09T10:02:54.610Z',
  // updatedAt: '2024-09-06T01:57:12.717Z',
  editorId: null,
  favoriteIds: [],
  isTwoFactorEnabled: null,
};

export const togelSidebar4d3d2d = [
  {
    title: '4d/3d/2d',
    icon: HashIcon,
    link: (slug: string) => `/dashboard/members/togels/${slug}/4d3d2d`,
  },
  {
    title: '4d/3d/2d Set',
    icon: GroupIcon,
    link: (slug: string) => `/dashboard/members/togels/${slug}/4d3d2d-set`,
  },
  {
    title: 'bbfs',
    icon: RecycleIcon,
    link: (slug: string) => `/dashboard/members/togels/${slug}/bbfs`,
  },
  {
    title: 'besarKecil-genapGanjil',
    icon: ZapIcon,
    link: (slug: string) => `/dashboard/members/togels/${slug}/bseo`,
  },
];
export const togelSidebarColok = [
  {
    title: 'colok bebas',
    icon: Plug,
    link: (slug: string) => `/dashboard/members/togels/${slug}/colok-bebas`,
  },
  {
    title: 'colok macau',
    icon: CableIcon,
    link: (slug: string) => `/dashboard/members/togels/${slug}/colok-macau`,
  },
  {
    title: 'colok naga',
    icon: GiSpikedDragonHead,
    link: (slug: string) => `/dashboard/members/togels/${slug}/colok-naga`,
  },
  {
    title: 'colok jitu',
    icon: TargetIcon,
    link: (slug: string) => `/dashboard/members/togels/${slug}/colok-jitu`,
  },
];
export const togelSidebar5050 = [
  {
    title: '50-50',
    icon: CircleSlash2Icon,
    link: (slug: string) => `/dashboard/members/togels/${slug}/50-50`,
  },
  {
    title: '50-50 special',
    icon: SlashIcon,
    link: (slug: string) => `/dashboard/members/togels/${slug}/50-50-special`,
  },
  {
    title: '50-50 combination',
    icon: Divide,
    link: (slug: string) => `/dashboard/members/togels/${slug}/50-50-combo`,
  },
];
export const variasiLain = [
  {
    title: 'Macau-Kombinasi',
    icon: PiFlowerLotusLight,
    link: (slug: string) => `/dashboard/members/togels/${slug}/macau-combo`,
  },
  {
    title: 'Dasar',
    icon: BaselineIcon,
    link: (slug: string) => `/dashboard/members/togels/${slug}/dasar`,
  },
  {
    title: 'Shio',
    icon: GiYinYang,
    link: (slug: string) => `/dashboard/members/togels/${slug}/shio`,
  },
];

export const togelSidebar = [
  togelSidebar4d3d2d,
  togelSidebarColok,
  togelSidebar5050,
  variasiLain,
];

export const thead4d = [
  {
    label: 'no',
  },
  {
    label: 'Nomor',
    colspan: 4,
  },

  {
    label: 'game',
  },
  {
    label: 'wager',
  },
  {
    label: 'dis%',
  },
  {
    label: 'net',
  },
];

export const thead4dData = [
  {
    label: 'no',
  },
  {
    label: 'nomor',
    colspan: 4,
  },

  {
    label: 'game',
  },
  {
    label: 'wager',
  },
  {
    label: 'dis%',
  },
  {
    label: 'net',
  },
  {
    label: 'status',
  },
];

export const thead4dSet = [
  {
    label: 'no',
  },
  {
    label: 'nomor',
    colspan: 4,
  },

  {
    label: 'bet',
    colspan: 3,
  },
  // {
  //   label: 'wager',
  // },
  // {
  //   label: 'dis%',
  // },
  // {
  //   label: 'net',
  // },
  // {
  //   label: 'status',
  // },
];

export const positionVal = ['as', 'kop', 'kepala', 'ekor'];

export const shioWithIcon = [
  {
    label: 'dragon',
    name: 'Naga',
    icon: GiSeaDragon,
  },
  {
    label: 'rabbit',
    name: 'Kelinci',
    icon: GiRabbit,
  },
  {
    label: 'tiger',
    name: 'Harimau',
    icon: GiTigerHead,
  },
  {
    label: 'ox',
    name: 'Sapi',
    icon: GiCow,
  },
  {
    label: 'rat',
    name: 'Tikus',
    icon: GiRat,
  },
  {
    label: 'swine',
    name: 'Babi',
    icon: GiPig,
  },
  {
    label: 'dog',
    name: 'Anjing',
    icon: GiSittingDog,
  },
  {
    label: 'rooster',
    name: 'Ayam',
    icon: GiRooster,
  },
  {
    label: 'monkey',
    name: 'Monyet',
    icon: GiMonkey,
  },
  {
    label: 'lamb',
    name: 'Kambing',
    icon: GiGoat,
  },
  {
    label: 'horse',
    name: 'Kuda',
    icon: GiHorseHead,
  },
  {
    label: 'snake',
    name: 'Ular',
    icon: GiSnake,
  },
];
