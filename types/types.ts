// import { Comment User } from '@prisma/client';
// import { User } from 'next-auth';
import { Post, Slider, User } from '@prisma/client';
import { IconType } from 'react-icons';
import { status } from '../lib/helper';

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

export type SafeAdminChat = Omit<
  User,
  'createdAt' | 'updatedAt' | 'emailVerified' | 'password' | 'hashedPassword'
>;

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
  styles: string;
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

export type PostProps =
  | {
      id: string;
      img: string | null;
      category: {
        value: string;
        icon: IconType;
      };
      date: string | Date;
      title: string;
      brief: string | null;
      avatar: string;
      author: string | null;
      userId: string | null;
      comments?: TComment[];
      top?: boolean | null;
      topicId: string;
      trending?: boolean | null;
    }
  | any;

export type tabsProps = {
  id: number;
  name: string;
  value: string;
  label: string;
  active: boolean;
};

export const tabsData = [
  { id: 1, name: 'Popular', value: 'depo', label: 'Depo Table', active: true },
  { id: 2, name: 'Trending', value: 'wd', label: 'WD Table', active: false },
];

export const tabsAdmin = [
  { id: 1, name: 'Deposit', value: 'depo', label: 'Depo Table', active: true },
  { id: 2, name: 'Withdraw', value: 'wd', label: 'WD Table', active: false },
  {
    id: 3,
    name: 'Member',
    value: 'member',
    label: 'Member Table',
    active: false,
  },
];

export const tabsMember = [
  { id: 1, name: 'Deposit', value: 'depo', label: 'Depo Table', active: true },
  { id: 2, name: 'Withdraw', value: 'wd', label: 'WD Table', active: false },
];

export type initialPostStateProps = {
  title: string;
  img: string | null;
  category: string;
  author: string;
  brief: string;
  validate?: string;
};

interface DepoWd {
  id?: string;
  email: string | null;
  bank: string | null;
  name: string;
  accountNumber: string;
  game: string | null;
  gameUserId: string;
  status?: string;
  bankPT?: string | null;
  createdAt?: Date | null;
}

export interface Depo {
  depoAmount: number | null;
}

export interface Wd {
  wdAmount: number | null;
}

export type DepoWdProps = DepoWd & (Depo | Wd);

export type DepoProps = {
  id?: string;
  name: string;
  email: string | null;
  bank: string | null;
  game: string | null;
  gameUserId: string;
  bankPT?: string | null;
  accountNumber: string;
  depoAmount?: number | null;
  status?: string | null;
  createdAt?: Date | null;
};

export type DepoIconProps = {
  id?: string;
  name: string;
  email: string | null;
  bank: string | null;
  game: string | null;
  gameUserId: string;
  bankPT?: string | null;
  accountNumber: string;
  depoAmount?: number | null;
  status?: string | null;
  createdAt?: Date | null;
};

export type WdProps = {
  id?: string;
  name: string;
  email: string | null;
  bank: string | null;
  game: string | null;
  gameUserId: string;
  accountNumber: string;
  wdAmount?: number | null;
  status?: string | null;
  createdAt?: Date | null;
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

// export type UserProps = {
//   id: string;
//   name: string | null;
//   email: string | null;
//   active: boolean | null;
//   phone: string | null;
//   bank: string;
//   game: string;
//   accountNumber: string;
//   image: string | null;
//   password: string | null;
//   role: 'admin' | 'user';
//   favoriteIds: string[];
// };

export type UserProps = {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  phone: string | null;
  bank: string | null;
  game: string[];
  accountNumber: string | null;
  image: string | null;
  password: string | null;
  hashedPassword: string | null;
  profileComplete: boolean;
  active: boolean | null;
  role: 'admin' | 'user';
  createdAt: Date;
  updatedAt: Date;
  editorId: string | null;
  favoriteIds: string[];
  isTwoFactorEnabled: boolean | null;
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
  name: string | null;
  bank: string | null;
  accountNumber: string | null;
  email: string | null;
  game: string[];
  image: string | null;
  phone: string | null;
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

export type PostData = {
  id: string;
  title: string;
  body: string;
  author: string;
  date: string;
  comments: PostComment[];
};

export type PostComment = {
  id: string;
  text: string;
  username: string;
};

export interface AnalyticsItem {
  name: string;
  uv: number;
  pv: number;
  amt: number;
}

export type UserTest = {
  id: number;
  birthday: Date;
  email: string;
  firstName: string;
  lastName: string;
  role: 'viewer' | 'editor';
};

export type SliderFormProps = {
  id: string;
  images: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};
