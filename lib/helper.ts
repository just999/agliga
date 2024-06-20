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
  Arsenal,
  Aston,
  Bournemouth,
  Brentford,
  Brighton,
  Burnley,
  Chelsea,
  Crystal,
  Everton,
  Fulham,
  Leed,
  Leichester,
  Liverpool,
  Luton,
  Matches,
  MC,
  MU,
  Newcastle,
  Nottingham,
  Red,
  Sheffield,
  Southampton,
  Tth,
  Westham,
  Wolve,
  Yellow,
} from '@/components/assets/sports';
import {
  AgenBet,
  AgenLiga77,
  Cahaya138,
  Cahaya4d,
  Ibc,
  LiveCasino338a,
  Sbo,
} from '@/components/assets/user-games';
import { FaSwimmer, FaSkiing, FaChess } from 'react-icons/fa';
import {
  GiSoccerKick,
  GiBasketballBasket,
  GiBaseballGlove,
  GiRugbyConversion,
  GiBoxingGloveSurprise,
  GiHockey,
  GiPingPongBat,
  GiCycling,
  GiShuttlecock,
  GiCricketBat,
} from 'react-icons/gi';
import { MdKayaking, MdOutlineSurfing } from 'react-icons/md';

import {
  TbKarate,
  TbPlayVolleyball,
  TbRectangleVerticalFilled,
} from 'react-icons/tb';

export const banks = [
  {
    value: 'BCA',
    icon: Bca,
  },
  {
    value: 'MANDIRI',
    icon: Mandiri,
  },
  {
    value: 'BRI',
    icon: Bri,
  },
  {
    value: 'BNI',
    icon: Bni,
  },
  {
    value: 'CIMB',
    icon: Cimb,
  },
  {
    value: 'DANAMON',
    icon: Danamon,
  },
  {
    value: 'DANA',
    icon: Dan,
  },
  {
    value: 'OVO',
    icon: Ovo,
  },
  {
    value: 'LINKAJA',
    icon: Linkaja,
  },
  {
    value: 'GOPAY',
    icon: Gopay,
  },
];
export const games = [
  {
    value: 'Sbobet',
    icon: Sbo,
  },
  {
    value: 'Ibcbet',
    icon: Ibc,
  },
  // {
  //   value: 'SBC168',
  //   icon: Ibc,
  // },
  // {
  //   value: 'SBC168Casino',
  //   icon: '/games/sbc168casino.svg',
  // },
  // {
  //   value: 'CMDBET',
  //   icon: '/games/cmdbet.svg',
  // },
  // {
  //   value: 'M8BET',
  //   icon: '/games/m8bet.svg',
  // },
  // {
  //   value: 'SGD777',
  //   icon: '/games/sgd777.svg',
  // },
  // {
  //   value: 'ARB333Casino',
  //   icon: '/games/arb333casino.svg',
  // },
  {
    value: '338ALiveCasino',
    icon: LiveCasino338a,
  },
  {
    value: 'Cahaya4d',
    icon: Cahaya4d,
  },
  {
    value: 'AgenBet',
    icon: AgenBet,
  },
  {
    value: 'AgenLiga77',
    icon: AgenLiga77,
  },
  {
    value: 'Cahaya138',
    icon: Cahaya138,
  },
  // {
  //   value: '338ACasinoGames',
  //   icon: '/games/338alivecasinogames.svg',
  // },
  // {
  //   value: 'HolidayPalace',
  //   icon: '/games/holidaypalace.svg',
  // },
  // {
  //   value: 'GD88',
  //   icon: '/games/gd88.svg',
  // },
  // {
  //   value: '6969Bet',
  //   icon: '/games/6969bet.svg',
  // },
  // {
  //   value: 'BolaTangkas2',
  //   icon: '/games/bolatangkas2.svg',
  // },
  // {
  //   value: 'Tangkas777',
  //   icon: '/games/tangkas777.svg',
  // },
  // {
  //   value: 'BankerKing',
  //   icon: '/games/bankerking.svg',
  // },
  // {
  //   value: 'TogelToto',
  //   icon: '/games/togeltoto.svg',
  // },
  // {
  //   value: 'Barocco303',
  //   icon: '/games/barocco303.svg',
  // },
  // {
  //   value: 'LiveTogel',
  //   icon: '/games/livetogel.svg',
  // },
];

export const categories = [
  // {
  //   label: 'Select Your Topic',
  //   icon: PiCellSignalNoneThin,
  //   description: 'Sepak Bola',
  // },
  {
    label: 'soccer',
    icon: GiSoccerKick,
    description: 'Sepak Bola',
  },
  {
    label: 'basketball',
    icon: GiBasketballBasket,
    description: 'Basket ball',
  },
  {
    label: 'swimming',
    icon: FaSwimmer,
    description: 'Swimming',
  },
  {
    label: 'karate',
    icon: TbKarate,
    description: 'Karate',
  },
  {
    label: 'kayak',
    icon: MdKayaking,
    description: 'Kayak',
  },
  {
    label: 'baseball',
    icon: GiBaseballGlove,
    description: 'Baseball',
  },
  {
    label: 'volley',
    icon: TbPlayVolleyball,
    description: 'Volley-ball',
  },
  {
    label: 'skiing',
    icon: FaSkiing,
    description: 'Skiing',
  },
  {
    label: 'rugby',
    icon: GiRugbyConversion,
    description: 'Rugby',
  },
  {
    label: 'boxing',
    icon: GiBoxingGloveSurprise,
    description: 'Boxing',
  },
  {
    label: 'catur',
    icon: FaChess,
    description: 'Catur',
  },
  {
    label: 'hockey',
    icon: GiHockey,
    description: 'Hockey',
  },
  {
    label: 'surfing',
    icon: MdOutlineSurfing,
    description: 'Surfing',
  },
  {
    label: 'pingpong',
    icon: GiPingPongBat,
    description: 'Ping-pong',
  },
  {
    label: 'sepeda',
    icon: GiCycling,
    description: 'Sepeda',
  },
  {
    label: 'badminton',
    icon: GiShuttlecock,
    description: 'Badminton',
  },
  {
    label: 'cricket',
    icon: GiCricketBat,
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
  author: null || '',
  brief: null || '',
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
    name: 'Nottm Forest',
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
    id: 19,
    name: 'Leeds United',
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
    id: 22,
    name: 'Sheffield United',
    icon: '/images/sheffield.svg',
    href: 'https://team.7msport.com/44/index.shtml',
  },
  {
    id: 23,
    name: 'Burnley',
    icon: '/images/burnley.svg',
    href: 'https://team.7msport.com/498/index.shtml',
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
    icon: Aston,
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
    name: 'Nottinghamm Forest',
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
    name: 'Leeds United',
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
  group: '',
  euroTeamAway: team,
  awayPenalty: [],
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
export const uefaMatches = [
  uefaA,
  // uefaB, uefaC, uefaD, uefaE, uefaF
];

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
