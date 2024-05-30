import { Baccarat } from '@/components/assets/games/baccarat';
import { Bingo } from '@/components/assets/games/bingo';
import { BlackJack } from '@/components/assets/games/black-jack';
import { Craps } from '@/components/assets/games/craps';
import { Domino } from '@/components/assets/games/domino';
import { ESport } from '@/components/assets/games/e-sport';
import { Keno } from '@/components/assets/games/keno';
import { Lotto } from '@/components/assets/games/lotto';
import { Poker } from '@/components/assets/games/poker';
import { Roulette } from '@/components/assets/games/roulette';
import { Sicbo } from '@/components/assets/games/Sicbo';
import { Slot } from '@/components/assets/games/slot';
import { SlotCherry } from '@/components/assets/games/slot-cherry';
import { SlotGodFortune } from '@/components/assets/games/slot-god-fortune';
import { Arsenal } from '@/components/assets/sports';
import { Aston } from '@/components/assets/sports/aston';
import { Bournemouth } from '@/components/assets/sports/bournemouth';
import { Brentford } from '@/components/assets/sports/brentford';
import { Brighton } from '@/components/assets/sports/brighton';
import { Burnley } from '@/components/assets/sports/burnley';
import { Chelsea } from '@/components/assets/sports/chelsea';
import { Crystal } from '@/components/assets/sports/crystal';
import { Everton } from '@/components/assets/sports/everton';
import { Fulham } from '@/components/assets/sports/fulham';
import { Leed } from '@/components/assets/sports/leed';
import { Leichester } from '@/components/assets/sports/leicester';
import { Liverpool } from '@/components/assets/sports/liverpool';
import { Luton } from '@/components/assets/sports/luton';
import { MC } from '@/components/assets/sports/mc';
import { MU } from '@/components/assets/sports/mu';
import { Newcastle } from '@/components/assets/sports/newcastle';
import { Nottingham } from '@/components/assets/sports/nottingham';
import { Sheffield } from '@/components/assets/sports/sheffield';
import { Southampton } from '@/components/assets/sports/southampton';
import { Tth } from '@/components/assets/sports/tth';
import { Westham } from '@/components/assets/sports/westham';
import { Wolve } from '@/components/assets/sports/wolve';

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

import { TbKarate, TbPlayVolleyball } from 'react-icons/tb';

export const banks = [
  {
    value: 'BCA',
    icon: '/images/bca.svg',
  },
  {
    value: 'MANDIRI',
    icon: '/images/mandiri.svg',
  },
  {
    value: 'BRI',
    icon: '/images/bri.svg',
  },
  {
    value: 'BNI',
    icon: '/images/bni.svg',
  },
  {
    value: 'CIMB',
    icon: '/images/cimb.svg',
  },
  {
    value: 'DANAMON',
    icon: '/images/danamon.svg',
  },
  {
    value: 'DANA',
    icon: '/images/dana.svg',
  },
  {
    value: 'OVO',
    icon: '/images/ovo.svg',
  },
  {
    value: 'LINKAJA',
    icon: '/images/linkaja.svg',
  },
  {
    value: 'GOPAY',
    icon: '/images/gopay.svg',
  },
];
export const games = [
  {
    value: 'SBOBET',
    icon: '/games/sbobet.svg',
  },
  {
    value: 'IBCBET',
    icon: '/games/ibcbet.svg',
  },
  {
    value: 'SBC168',
    icon: '/games/sbc168.svg',
  },
  {
    value: 'SBC168Casino',
    icon: '/games/sbc168casino.svg',
  },
  {
    value: 'CMDBET',
    icon: '/games/cmdbet.svg',
  },
  {
    value: 'M8BET',
    icon: '/games/m8bet.svg',
  },
  {
    value: 'SGD777',
    icon: '/games/sgd777.svg',
  },
  {
    value: 'ARB333Casino',
    icon: '/games/arb333casino.svg',
  },
  {
    value: '338ALiveCasino',
    icon: '/games/338alivecasino.svg',
  },
  {
    value: '338ACasinoGames',
    icon: '/games/338alivecasinogames.svg',
  },
  {
    value: 'HolidayPalace',
    icon: '/games/holidaypalace.svg',
  },
  {
    value: 'GD88',
    icon: '/games/gd88.svg',
  },
  {
    value: '6969Bet',
    icon: '/games/6969bet.svg',
  },
  {
    value: 'BolaTangkas2',
    icon: '/games/bolatangkas2.svg',
  },
  {
    value: 'Tangkas777',
    icon: '/games/tangkas777.svg',
  },
  {
    value: 'BankerKing',
    icon: '/games/bankerking.svg',
  },
  {
    value: 'TogelToto',
    icon: '/games/togeltoto.svg',
  },
  {
    value: 'Barocco303',
    icon: '/games/barocco303.svg',
  },
  {
    value: 'LiveTogel',
    icon: '/games/livetogel.svg',
  },
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

export const schedulePL = [
  {
    id: '1',
    run: 37,
    date: '11/05/2024 18:30',
    teamHome: 'Fulham',
    vs: '4-0(2-0)',
    teamAway: 'Man City',
    analysisIcon: '/images/calendar.svg',
    analysis: 'https://analyse.7msport.com/4495618/index.shtml',
  },
  {
    id: '2',
    run: 37,
    date: '11/05/2024 21:00',
    teamHome: 'Bournemouth',
    vs: 'VS',
    teamAway: 'Brentford',
    analysisIcon: '/images/calendar.svg',
    analysis: 'https://analyse.7msport.com/4495616/index.shtml',
  },
  {
    id: '3',
    run: 37,
    date: '11/05/2024 21:00',
    teamHome: 'Everton',
    vs: 'VS',
    teamAway: 'Sheffield United',
    analysisIcon: '/images/calendar.svg',
    analysis: 'https://analyse.7msport.com/4495617/index.shtml',
  },
  {
    id: '4',
    run: 37,
    date: '11/05/2024 21:00',
    teamHome: 'Newcastle',
    vs: 'VS',
    teamAway: 'Brighton',
    analysisIcon: '/images/calendar.svg',
    analysis: 'https://analyse.7msport.com/4495620/index.shtml',
  },
  {
    id: '5',
    run: 37,
    date: '11/05/2024 21:00',
    teamHome: 'Tottenham',
    vs: 'VS',
    teamAway: 'Burnley',
    analysisIcon: '/images/calendar.svg',
    analysis: 'https://analyse.7msport.com/4495622/index.shtml',
  },
  {
    id: '6',
    run: 37,
    date: '11/05/2024 21:00',
    teamHome: 'West Ham',
    vs: 'VS',
    teamAway: 'Luton Town',
    analysisIcon: '/images/calendar.svg',
    analysis: 'https://analyse.7msport.com/4495623/index.shtml',
  },
  {
    id: '7',
    run: 36,
    date: '11/05/2024 18:30',
    teamHome: 'Fulham',
    vs: 'VS',
    teamAway: 'Man City',
    analysisIcon: '/images/calendar.svg',
    analysis: 'https://analyse.7msport.com/4495618/index.shtml',
  },
  {
    id: '8',
    run: 36,
    date: '11/05/2024 21:00',
    teamHome: 'Bournemouth',
    vs: 'VS',
    teamAway: 'Brentford',
    analysisIcon: '/images/calendar.svg',
    analysis: 'https://analyse.7msport.com/4495616/index.shtml',
  },
  {
    id: '9',
    run: 36,
    date: '11/05/2024 21:00',
    teamHome: 'Everton',
    vs: 'VS',
    teamAway: 'Sheffield United',
    analysisIcon: '/images/calendar.svg',
    analysis: 'https://analyse.7msport.com/4495617/index.shtml',
  },
  {
    id: '10',
    run: 36,
    date: '11/05/2024 21:00',
    teamHome: 'Newcastle',
    vs: 'VS',
    teamAway: 'Brighton',
    analysisIcon: '/images/calendar.svg',
    analysis: 'https://analyse.7msport.com/4495620/index.shtml',
  },
  {
    id: '11',
    run: 36,
    date: '11/05/2024 21:00',
    teamHome: 'Tottenham',
    vs: 'VS',
    teamAway: 'Burnley',
    analysisIcon: '/images/calendar.svg',
    analysis: 'https://analyse.7msport.com/4495622/index.shtml',
  },
  {
    id: '12',
    run: 36,
    date: '11/05/2024 21:00',
    teamHome: 'West Ham',
    vs: 'VS',
    teamAway: 'Luton Town',
    analysisIcon: '/images/calendar.svg',
    analysis: 'https://analyse.7msport.com/4495623/index.shtml',
  },
  {
    id: '13',
    run: 1,
    date: '11/05/2024 18:30',
    teamHome: 'Fulham',
    vs: 'VS',
    teamAway: 'Man City',
    analysisIcon: '/images/calendar.svg',
    analysis: 'https://analyse.7msport.com/4495618/index.shtml',
  },
  {
    id: '14',
    run: 1,
    date: '11/05/2024 21:00',
    teamHome: 'Bournemouth',
    vs: 'VS',
    teamAway: 'Brentford',
    analysisIcon: '/images/calendar.svg',
    analysis: 'https://analyse.7msport.com/4495616/index.shtml',
  },
  {
    id: '15',
    run: 1,
    date: '11/05/2024 21:00',
    teamHome: 'Everton',
    vs: 'VS',
    teamAway: 'Sheffield United',
    analysisIcon: '/images/calendar.svg',
    analysis: 'https://analyse.7msport.com/4495617/index.shtml',
  },
  {
    id: '16',
    run: 1,
    date: '11/05/2024 21:00',
    teamHome: 'Newcastle',
    vs: 'VS',
    teamAway: 'Brighton & Hove Albion',
    analysisIcon: '/images/calendar.svg',
    analysis: 'https://analyse.7msport.com/4495620/index.shtml',
  },
  {
    id: '17',
    run: 1,
    date: '11/05/2024 21:00',
    teamHome: 'Tottenham',
    vs: 'VS',
    teamAway: 'Burnley',
    analysisIcon: '/images/calendar.svg',
    analysis: 'https://analyse.7msport.com/4495622/index.shtml',
  },
  {
    id: '18',
    run: 1,
    date: '11/05/2024 21:00',
    teamHome: 'West Ham',
    vs: 'VS',
    teamAway: 'Luton Town',
    analysisIcon: '/images/calendar.svg',
    analysis: 'https://analyse.7msport.com/4495623/index.shtml',
  },
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
];

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
  { label: 'Man City', icon: MC, description: 'MC' },
  { label: 'Arsenal', icon: Arsenal, description: 'Arsenal' },
  { label: 'Man United', icon: MU, description: 'MU' },
  { label: 'Newcastle', icon: Newcastle, description: 'Newcastle' },
  { label: 'Liverpool', icon: Liverpool, description: 'Liverpool' },
  { label: 'Brighton', icon: Brighton, description: 'Brighton' },
  { label: 'Aston Villa', icon: Aston, description: 'Aston Villa' },
  { label: 'Tottenham', icon: Tth, description: 'Tth' },
  { label: 'Brentford', icon: Brentford, description: 'Brentford' },
  { label: 'Fulham', icon: Fulham, description: 'Fullham' },
  { label: 'Crystal Palace', icon: Crystal, description: 'Crystal' },
  { label: 'Chelsea', icon: Chelsea, description: 'Chelsea' },
  { label: 'Wolves', icon: Wolve, description: 'Wolve' },
  { label: 'West Ham', icon: Westham, description: 'Westham' },
  { label: 'Bournemouth', icon: Bournemouth, description: 'Bournemouth' },
  { label: 'Nottinghamm Forest', icon: Nottingham, description: 'Nottingham' },
  { label: 'Everton', icon: Everton, description: 'Everton' },
  { label: 'Leicester City', icon: Leichester, description: 'Leicester' },
  { label: 'Leeds United', icon: Leed, description: 'Leed' },
  { label: 'Southampton', icon: Southampton, description: 'Southampton' },
  { label: 'Luton Town', icon: Luton, description: 'Luton' },
  { label: 'Sheffield United', icon: Sheffield, description: 'Sheffield' },
  { label: 'Burnley', icon: Burnley, description: 'Burnley' },
];

export type RunData = { value: number; className?: string; icon: string };

export const runData = [
  { value: 1, className: 'lsm2', icon: '/images/match.svg' },
  { value: 2, className: 'lsm2', icon: '/images/match.svg' },
  { value: 3, className: 'lsm2', icon: '/images/match.svg' },
  { value: 4, className: 'lsm2', icon: '/images/match.svg' },
  { value: 5, className: 'lsm2', icon: '/images/match.svg' },
  { value: 6, className: 'lsm2', icon: '/images/match.svg' },
  { value: 7, className: 'lsm2', icon: '/images/match.svg' },
  { value: 8, className: 'lsm2', icon: '/images/match.svg' },
  { value: 9, className: 'lsm2', icon: '/images/match.svg' },
  { value: 10, className: 'lsm2', icon: '/images/match.svg' },
  { value: 11, className: 'lsm2', icon: '/images/match.svg' },
  { value: 12, className: 'lsm2', icon: '/images/match.svg' },
  { value: 13, className: 'lsm2', icon: '/images/match.svg' },
  { value: 14, className: 'lsm2', icon: '/images/match.svg' },
  { value: 15, className: 'lsm2', icon: '/images/match.svg' },
  { value: 16, className: 'lsm2', icon: '/images/match.svg' },
  { value: 17, className: 'lsm2', icon: '/images/match.svg' },
  { value: 18, className: 'lsm2', icon: '/images/match.svg' },
  { value: 19, className: 'lsm2', icon: '/images/match.svg' },
  { value: 20, className: 'lsm2', icon: '/images/match.svg' },
  { value: 21, className: 'lsm2', icon: '/images/match.svg' },
  { value: 22, className: 'lsm2', icon: '/images/match.svg' },
  { value: 23, className: 'lsm2', icon: '/images/match.svg' },
  { value: 24, className: 'lsm2', icon: '/images/match.svg' },
  { value: 25, className: 'lsm2', icon: '/images/match.svg' },
  { value: 26, className: 'lsm2', icon: '/images/match.svg' },
  { value: 27, className: 'lsm2', icon: '/images/match.svg' },
  { value: 28, className: 'lsm2', icon: '/images/match.svg' },
  { value: 29, className: 'lsm2', icon: '/images/match.svg' },
  { value: 30, className: 'lsm2', icon: '/images/match.svg' },
  { value: 31, className: 'lsm2', icon: '/images/match.svg' },
  { value: 32, className: 'lsm2', icon: '/images/match.svg' },
  { value: 33, className: 'lsm2', icon: '/images/match.svg' },
  { value: 34, className: 'lsm2', icon: '/images/match.svg' },
  { value: 35, className: 'lsm2', icon: '/images/match.svg' },
  { value: 36, className: 'lsm2', icon: '/images/match.svg' },
  { value: 37, className: 'lsm2', icon: '/images/match.svg' },
  { value: 38, className: 'lsm2', icon: '/images/match.svg' },
];

export const initialScheduleFormValues = {
  run: 0,
  date: new Date(),
  teamHome: '',
  score: 'VS',
  teamAway: '',
  analysis: '',
};
