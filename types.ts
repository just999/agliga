// import { Comment User } from '@prisma/client';
// import { User } from 'next-auth';
import { Post, Slider, User } from '@prisma/client';
import { IconType } from 'react-icons';

// export type SafeListing = Omit<Listing, 'createdAt'> & {
//   createdAt: string;
// };

export type SafeUser = Omit<
  User,
  'createdAt' | 'updatedAt' | 'emailVerified'
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type SafeSliderImage = Omit<Slider, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};

// export type SafeReservation = Omit<
//   Reservation,
//   'createdAt' | 'startDate' | 'endDate' | 'listing'
// > & {
//   createdAt: string;
//   startDate: string;
//   endDate: string;
//   listing: SafeListing;
// };

export type ValueIconProps = {
  value: string;
  icon: string;
};
export type RunIconProps = {
  value: number;
  icon: string;
};

export type BanksProps = {
  value: string;
  icon: string;
};

export type GameProps = {
  value: string;
  icon: string;
};

export type CategoryProps = {
  value: string;
  icon: string;
};

type TComment = {
  id: string;
  content: string;
};

export type PostProps = {
  author: string | null;
  avatar: string;
  brief: string | null;
  category: string;
  comments?: TComment[];
  date: string | Date;
  id: string;
  img: string | null;
  title: string;
  top: boolean | null;
  topicId: string;
  trending?: boolean | null;
};

export const tabsData = [
  { id: 1, name: 'Popular', active: true },
  { id: 2, name: 'Trending', active: false },
];

export type initialPostStateProps = {
  title: string;
  img: string | null;
  category: string;
  author: string;
  brief: string;
  validate?: string;
};

export type DepoWdProps = {
  name: string;
  email: string;
  bank: string | null;
  game: string | null;
  gameUserId: string;
  bankPT?: string;
  accountNumber: string;
  depoAmount?: number;
  wdAmount?: number;
};

export type SosMedProps = {
  width?: string;
  height?: string;
};

export type CommentProps = {
  id: string;
  content: string;
  parentId?: string;
  postId: string;
};

export interface IconProps {
  size?: number | string | undefined;
}

export type PostFormState = {
  title: string;
  img: string | null;
  category: string;
  author: string;
  brief: string;
  validate: string;
};

export type anything = {
  id: string;
  img: string | null;
  category: string;
  title: string;
  date: Date;
  brief: string | null;
  avatar: string;
  author: string | null;
  top: boolean | null;
  trending: boolean | null;
  userId: string;
  createdAt: Date;
  topicId: string;
};

export type UserProps = {
  id: string;
  name: string | null;
  email: string | null;
  // emailVerified: Date | null;
  phone: string | null;
  bank: string;
  game: string;
  accountNumber: string;
  image: string | null;
  hashedPassword: string | null;
  role: 'admin' | 'user';
  // createdAt: Date;
  // updatedAt: Date;
  favoriteIds: string[];
};

export type ScheduleProps = {
  run: number;
  date: Date;
  teamHome: string;
  score: string;
  teamAway: string;
  analysis: string;
};

export type InitialPostProps = {
  title: string;
  img: string | null;
  category: string;
  author: string | null;
  brief: string | null;
};

// types.ts
export type TImage = {
  id?: string; // For edit form
  file?: File;
  url?: string; // For previewing uploaded images
};

// interface PostProps {
//   title: string;
//   description: string;
//   images: Image[];
// }

export type ProfileProps = {
  name: string;
  bank: string;
  accountNumber: string;
  email: string;
  game: string[];
  image?: string;
  phone: string;
};

export type RoutesProps = {
  onClick: () => void;
  icon: IconType;
  label: string;
  className: string;
  href: string;
  active: boolean;
  admin?: any;
};

export type EuroTeamSubGroupProps = {
  value: string;
  icon: string;
  group?: string | null;
};
export type EuroProps = {
  id?: string;
  date: Date;
  euroTeamHome: EuroTeamSubGroupProps;
  homePenalty?: string[];
  homeScore?: string | null;
  group?: string;
  round?: string;
  euroTeamAway: EuroTeamSubGroupProps;
  awayPenalty?: string[];
  awayScore?: string | null;
};
export type EuroWithIconProps = {
  id?: string;
  date: Date;
  euroTeamHome: EuroTeamSubGroupProps;
  homePenalty?: string[];
  homeScore?: string | null;
  homeHTScore?: string | null;
  group?: string | undefined | null;
  round?: string | undefined | null;
  qRound?: string | undefined | null;
  euroTeamAway: EuroTeamSubGroupProps;
  awayPenalty?: string[];
  awayScore?: string | null;
  awayHTScore?: string | null;
};

export type TeamProps = {
  value: string;
  icon: string;
  group?: string | null;
  week?: string | null;
};

// src/types/index.ts
export type FixtureProps = {
  id: string;
  name: string;
  date: Date;
  week: number | null;
  teamHome: string | null;
  homePenalty: string[];
  homeScore: string | null;
  homeHTScore: string | null;
  teamAway: string | null;
  awayPenalty: string[];
  awayScore: string | null;
  awayHTScore: string | null;
};

export type EuroGroupProps = [
  EuroTeamSubGroupProps,
  EuroTeamSubGroupProps,
  EuroTeamSubGroupProps,
  EuroTeamSubGroupProps
];

export type EuroTeamGroupProps = [
  euroGroupA: EuroGroupProps[],
  euroGroupB: EuroGroupProps[],
  euroGroupC: EuroGroupProps[],
  euroGroupD: EuroGroupProps[],
  euroGroupE: EuroGroupProps[],
  euroGroupF: EuroGroupProps[]
];
