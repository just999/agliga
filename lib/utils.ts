import { usePerm } from '@/hooks/use-togel-bbfs';
import { Sin4dSetSchema } from '@/schemas/togel-schema';
import { EuroWithIconProps } from '@/types/types';
import { type ClassValue, clsx } from 'clsx';
import { differenceInYears, format, formatDistance, parse } from 'date-fns';
import {
  Asset,
  Federant,
  Noto_Color_Emoji,
  Old_Standard_TT,
  Orbitron,
  Play,
  Poppins,
  Roboto,
} from 'next/font/google';
import localFont from 'next/font/local';
import { FieldValues, Path, UseFormSetError } from 'react-hook-form';

import { twMerge } from 'tailwind-merge';
import { ZodIssue } from 'zod';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTimeOnly(date: string) {
  const formatString = 'dd MM yy h:mm a';

  const parsedDate = parse(date, formatString, new Date());

  const timeString = format(parsedDate, 'HH:mm');
  return timeString;
  // Or if you prefer a 12-hour format with AM/PM
  // const timeString12Hour = format(parsedDate, 'hh:mm a');
}

export function calculateAge(dob: Date) {
  return differenceInYears(new Date(), dob);
}

export function formatShortDateTime(date: Date) {
  return format(date, 'dd MM yy h:mm:a');
}

export function timeAgo(date: string) {
  return formatDistance(new Date(date), new Date()) + ' ago';
}

//! Step 1: Function to parse the input string into a Date object into date month
export function parseCustomDate(dateString: string) {
  // RegEx to match date and time (assumption based on given format)
  const dateTimeRegex = /^(\d{2}) (\d{2}) (\d{2}) (\d{1,2}:\d{2}):(\w{2})$/;
  const match = dateString.match(dateTimeRegex);

  if (!match) {
    throw new Error('Invalid date string format');
  }

  // Extracting matched groups
  const [, day, month, year, time, period] = match;

  // Extract time components
  const [hours, minutes] = time.split(':').map(Number);

  // Normalize hours based on AM/PM
  const normalizedHours =
    period.toLowerCase() === 'pm' ? (hours % 12) + 12 : hours % 12;

  // Create a Date object
  const date = new Date(
    2000 + Number(year), // Assuming year '24' means '2024'
    Number(month) - 1, // month is 0-indexed
    Number(day),
    normalizedHours,
    minutes
  );

  return date;
}

export const formattedDateMonthDate = (dateString: string) => {
  const dateObj = parseCustomDate(dateString);

  return format(dateObj, 'd MMMM');
};

export const normalizedDateTime = (dateString: string) => {
  // Original date string
  const originalDate = dateString.trim(); // e.g. "22 08 24 3:34:PM"

  // Split the string and parse components
  const parts: string[] = originalDate.split(' ');
  if (parts.length < 4) {
    throw new Error('Invalid date string format');
  }

  const dayPart: string = parts[0].padStart(2, '0');
  const monthPart: string = parts[1].padStart(2, '0');
  const yearPart: string = '20' + parts[2]; // 22 -> 2022
  // const monthPart: string = parts[1].padStart(2, '0'); // 08 (already in 2 digits)
  // const dayPart: string = parts[2].padStart(2, '0'); // 24 (already in 2 digits)

  // Time parsing
  const timePart = parts[3].split(':'); // Split on ':'
  if (timePart.length < 2) {
    throw new Error('Invalid time format');
  }

  let hourPartStr: string = timePart[0];
  const minutePart: string = timePart[1].replace(/PM|AM/, ''); // Minute part
  const ampm: string = timePart[1].includes('PM') ? 'PM' : 'AM'; // Get AM/PM

  // Convert hour to 24-hour format
  let hourPart: number = parseInt(hourPartStr, 10);
  if (ampm === 'PM' && hourPart !== 12) {
    hourPart += 12; // Convert to 24-hour format
  } else if (ampm === 'AM' && hourPart === 12) {
    hourPart = 0; // Handle 12 AM case
  }

  // Create the normalized date format
  const normalizedDate = `${yearPart}-${monthPart}-${dayPart}T${hourPart
    .toString()
    .padStart(2, '0')}:${minutePart.padStart(2, '0')}:00`;

  return normalizedDate; // e.g. "2022-08-24T15:34:00"
};

export const capitalizeFirstCharacter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export interface FileLike extends Blob {
  lastModifiedDate: Date;
  name: string;
}
export const blobToFile = (theBlob: Blob, fileName: string): FileLike => {
  const fileLike: FileLike = {
    ...theBlob,
    lastModifiedDate: new Date(),
    name: fileName,
  };
  return fileLike as FileLike;
};

export const trimFilename = (filename: string, maxLength: number) => {
  let split = filename.split('.');
  let extension = split.pop();
  let name = split.join('.');

  if (name.length > maxLength) {
    name = name.substring(0, maxLength - 3) + '...';

    let result = `${name}.${extension}`;
    return result;
  }

  return filename;
};

export const readerOneLiner = (f: Blob): Promise<string> =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsText(f);
  });

export const getBase64FromUrl = async (url: string) => {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      resolve(base64data);
    };
  });
};

type ValueIconProps = { value: string; icon: string } | Record<string, any>;

export function findDuplicateObjects(
  arr1: ValueIconProps[],
  arr2: ValueIconProps[]
) {
  const duplicates: ValueIconProps[] = [];

  for (const obj1 of arr1) {
    for (const obj2 of arr2) {
      if (
        isValueIconProps(obj1) && // Check if obj1 is a ValueIconProps
        isValueIconProps(obj2) && // Check if obj2 is a ValueIconProps
        obj1.value === obj2.value && // Access properties safely with ?.
        obj1.icon === obj2.icon &&
        !duplicates.some((dup) => compareObjects(dup, obj1))
      ) {
        duplicates.push(obj1);
      }
    }
  }

  return duplicates;
}

function compareObjects(obj1: ValueIconProps, obj2: ValueIconProps) {
  // No need for additional checks here as `isValueIconProps` ensures structure
  return obj1.value === obj2.value && obj1.icon === obj2.icon;
}

export function isValueIconProps(
  obj: any
): obj is { value: string; icon: string } {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.value === 'string' &&
    typeof obj.icon === 'string'
  );
}

// const { getGames } = useGames();
// const games = getGames();

export function findMatchingObjects(
  objects: { value: string }[],
  values: string[]
) {
  const matchingObjects: { value: string }[] = [];

  for (const obj of objects) {
    if (values.includes(obj.value)) {
      matchingObjects.push(obj);
    }
  }

  return matchingObjects;
}

export const noto = Noto_Color_Emoji({
  subsets: ['emoji'],
  weight: ['400'],
  preload: true,
});

export const asset = Asset({
  subsets: ['latin'],
  weight: ['400'],
  preload: true,
});

export const oldLondon = localFont({
  src: '../public/fonts/OldLondon.ttf',
  variable: '--font-oldLondon',
});

export const roboto = Roboto({
  subsets: ['latin', 'latin-ext'],
  weight: ['100', '300', '400', '500', '700', '900'],
  preload: true,
});

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  preload: true,
});

export const oldStandardTT = Old_Standard_TT({
  subsets: ['latin'],
  weight: ['400', '700'],
  preload: true,
});
export const federant = Federant({
  subsets: ['latin'],
  weight: ['400'],
  preload: true,
});

export const play = Play({
  subsets: ['latin'],
  weight: ['400', '700'],
  preload: true,
});

export const orbit = Orbitron({ subsets: ['latin'], preload: true });

export const ol = localFont({ src: '../public/fonts/oldLondon.woff2' });

export type Team = {
  country?: {
    value: string;
    icon: string;
  };
  date: string;
  group: string;
  played: number; // Played
  won: number; // Won
  draw: number; // Drawn
  lost: number; // Lost
  for: number; // Goals For
  against: number; // Goals Against
  goalDiff: number; // Goal Difference
  points: number; // Points
};

interface Match {
  euroTeamHome: {
    value: string;
    icon: string;
  };
  euroTeamAway: {
    value: string;
    icon: string;
  };
  result: string;
  date: string;
  group: string;
}

let data: Team[] = [];

export function getDataFromMatches(matches: Match[]) {
  if (!matches) throw new Error('no data');
  Array.isArray(matches) &&
    matches.forEach((match) => {
      if (!match.euroTeamHome || !match.euroTeamAway) {
        console.error('Missing home or away team in match data:', match);
        // Handle missing data (e.g., skip processing or provide defaults)
        return;
      }
      let homeTeam = match.euroTeamHome.value;
      let awayTeam = match.euroTeamAway.value;
      let homeIcon = match.euroTeamHome.icon;
      let awayIcon = match.euroTeamAway.icon;
      let group = match.group;
      // let matchedDate = match.date;
      const homeGoals = parseInt(match.result.split('-')[0], 10);
      const awayGoals = parseInt(match.result.split('-')[1], 10);

      const updateTeamData = (
        teamName: string,
        icon: string,
        group: string
        // date: string
      ): Team => {
        let index = data.findIndex(
          (team) =>
            team.country?.value === teamName &&
            team.country.icon === icon &&
            team.group === group
          // && team.date === date
        );
        // Home team non-existant in array, let's create it with default scores

        if (index === -1) {
          const newTeam: Team = {
            country: { value: teamName, icon: icon },
            group: group,
            date: match.date,
            played: 0,
            won: 0,
            draw: 0,
            lost: 0,
            for: 0,
            against: 0,
            goalDiff: 0,
            points: 0,
          };
          data.push(newTeam);
          return newTeam;
        }
        return data[index];
      };
      if (group === undefined) throw new Error('no group found');
      const homeTeamData = updateTeamData(
        homeTeam,
        homeIcon,
        group
        // matchedDate
      );
      const awayTeamData = updateTeamData(
        awayTeam,
        awayIcon,
        group
        // matchedDate
      );

      if (match.result !== '' && Date.parse(homeTeamData.date) < Date.now()) {
        homeTeamData.played += 1;
        homeTeamData.for += homeGoals;
        homeTeamData.against += awayGoals;
        homeTeamData.goalDiff = homeTeamData.for - homeTeamData.against;
        // Common data (away) - plus one played and registering the goals
      }

      if (match.result && new Date(homeTeamData.date) < new Date()) {
        awayTeamData.played += 1;
        awayTeamData.for += awayGoals;
        awayTeamData.against += homeGoals;
        awayTeamData.goalDiff = awayTeamData.for - awayTeamData.against;
      }

      if (homeGoals === awayGoals) {
        // Home team register a draw
        homeTeamData.draw += 1;
        homeTeamData.points += 1;
        // Away team register a draw
        awayTeamData.draw += 1;
        awayTeamData.points += 1;
      }
      // Home win
      if (homeGoals > awayGoals) {
        // Home team register a win
        homeTeamData.won += 1;
        homeTeamData.points += 3;
        // Away team register a loss
        awayTeamData.lost += 1;
      }
      // Away win
      if (homeGoals < awayGoals) {
        // Away team register a win
        awayTeamData.won += 1;
        awayTeamData.points += 3;
        // Home team register a loss
        homeTeamData.lost += 1;
      }
    });

  data.sort(
    (teamA, teamB) =>
      teamA.points - teamB.points ||
      teamA.goalDiff - teamB.goalDiff ||
      teamA.for - teamB.for
  );
  data.reverse();

  return data;
}

export const fixtureFiltered = (teams: EuroWithIconProps[]) => {
  const groups = teams.reduce((groups, game) => {
    const date = new Date(game.date).toLocaleDateString('id-ID').split('T')[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(game);
    return groups;
  }, {} as { [date: string]: EuroWithIconProps[] });
  // Edit: to add it in the array format instead
  const groupArrays = Object.keys(groups).map((date) => {
    return {
      date,
      games: groups[date],
    };
  });

  return groupArrays;
};

type MatchProps = {
  id?: string;
  startTime: Date;
  duration: number;
};

type MatchWithStatus = Match & {
  status: 'upcoming' | 'playing' | 'already played';
};

export const getMatchStatus = (
  match: MatchProps
): 'upcoming' | 'playing' | 'already played' => {
  const currentTime = new Date().toISOString();

  const matchStartTime = new Date(match.startTime);
  const matchEndTime = new Date(
    matchStartTime.getTime() + match.duration * 60000
  );

  if (currentTime < matchStartTime.toISOString()) {
    return 'upcoming';
  } else if (
    currentTime >= matchStartTime.toISOString() &&
    currentTime <= matchEndTime.toISOString()
  ) {
    return 'playing';
  } else {
    return 'already played';
  }
};

// Input date string
let inputDateStr = '14/09/2024 21:00';

// Split the date and time parts
let [datePart, timePart] = inputDateStr.split(' ');

// Split the day, month, and year
let [day, month, year] = datePart.split('/').map(Number);

// Split the hour and minute
let [hours, minutes] = timePart.split(':').map(Number);

// Create a new Date object
let periodDate = new Date(year, month - 1, day, hours, minutes);

// console.log(periodDate.toISOString());

export const convertDate = (date: string) => {
  let [datePart, timePart] = date.split(' ');

  // Split the day, month, and year
  let [day, month, year] = datePart.split('/').map(Number);

  // Split the hour and minute
  let [hours, minutes] = timePart.split(':').map(Number);

  let periodDate = new Date(year, month - 1, day, hours, minutes);

  return periodDate;
};

export const parseAndFormatDate = (dateStr: string) => {
  const originalFormat = 'yyyy-MM-dd HH:mm:ssX'; // Define the input format

  // Parse the original date string using date-fns
  const date = parse(dateStr, originalFormat, new Date());

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date string');
  }

  // Format the date to the desired ISO 8601 format with milliseconds and UTC offset
  const formattedDate = format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
  return formattedDate;
};

export function numberWithCommas(x: any) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, '.');
}

export function handleFormServerErrors<TFieldValues extends FieldValues>(
  errorResponse: { error: string | ZodIssue[] },
  setError: UseFormSetError<TFieldValues>
) {
  if (Array.isArray(errorResponse.error)) {
    errorResponse.error.forEach((er) => {
      const fieldName = er.path.join('.') as Path<TFieldValues>;
      setError(fieldName, { message: er.message });
    });
  } else {
    setError('root.serverError', { message: errorResponse.error });
  }
}

// export function handleFormServerErrors<TFieldValues extends FieldValues>(
//   errorResponse: { error: string | ZodIssue[] },
//   setError: UseFormSetError<TFieldValues>
// ) {
//   if (typeof errorResponse.error === 'string') {
//     setError('root.serverError', { message: errorResponse.error });
//   } else if (Array.isArray(errorResponse.error)) {
//     errorResponse.error.forEach((er) => {
//       const fieldName = er.path.join('.') as Path<TFieldValues>;
//       setError(fieldName, { message: er.message });
//     });
//   }
// }

export function transformImageUrl(imageUrl?: string | null) {
  if (!imageUrl) return null;

  if (!imageUrl.includes('cloudinary')) return imageUrl;

  const uploadIndex = imageUrl.indexOf('/upload/') + '/upload/'.length;

  const transformation = 'c_fill,w_300,h_300,g_faces/';

  return `${imageUrl.slice(0, uploadIndex)}${transformation}${imageUrl.slice(
    uploadIndex
  )}`;
}

export function truncateString(text?: string | null, num = 50) {
  if (!text) return null;
  if (text.length <= num) {
    return text;
  }
  return text.slice(0, num) + '...';
}

export function createChatId(a: string, b: string) {
  return a > b ? `${b}-${a}` : `${a}-${b}`;
}

export function getKeyByValue<T>(
  object: T,
  value: T[keyof T]
): keyof T | undefined {
  for (let prop in object) {
    if (Object.prototype.hasOwnProperty.call(object, prop)) {
      if (object[prop] === value) return prop;
    }
  }
  return undefined; // Return undefined if the value is not found
}

export function isNonNullString(value: string | null): value is string {
  return typeof value === 'string';
}

// utilities.ts
export function getOrCreateAnonymousId() {
  if (typeof sessionStorage !== 'undefined') {
    let anonymousId = sessionStorage.getItem('anonymousId');
    if (!anonymousId) {
      anonymousId = `anon-${Math.random()
        .toString(36)
        .slice(2, 2 + 9)}`;
      sessionStorage.setItem('anonymousId', anonymousId);
    }
    return anonymousId;
  } else {
    // Fallback to an alternative storage mechanism or generate a unique ID in a different way
    return `anon-${Math.random()
      .toString(36)
      .slice(2, 2 + 9)}`;
  }
}

export const safeParseFloat = (str: string) => {
  const value = Number.parseFloat(str);
  return Number.isNaN(value) ? '' : value;
};

export const validBet4dSet = (data: Sin4dSetSchema[]) => {
  const val = data.filter((obj) => {
    const dat = Object.values(obj);
    const nonEmptyValuesCount = dat.filter((item) => item !== '').length;
    return nonEmptyValuesCount >= 2;
  });
  return val;
};

export const formatInputValue = (value: string): string => {
  // Remove any non-digit characters
  const digits = value.replace(/\D/g, '');

  // Limit to 5 characters
  const limitedDigits = digits.slice(0, 5);

  // Add commas after each digit
  return limitedDigits.split('').join(',');
};

export const ReformatInputValueArray = (num: string[]) => {
  const res2 = usePerm(2, num);
  const res3 = usePerm(3, num);
  const res4 = usePerm(4, num);

  // !FORMAT NUMBER INTO 2D NUMBER
  let newRes2: any = [];
  const formatted2d = res2.reduce((acc, curr) => {
    if (curr) {
      const temp = curr.split('').map((t, i) => ({
        d3: curr[0],
        d4: curr[1],
      }));
      newRes2.push(temp);
    }
    return newRes2;
  }, []);

  const new2dArray = formatted2d.flat(1);

  const unique2dArray = Array.from(
    new Set(new2dArray.map((item) => JSON.stringify(item)))
  ).map((item) => JSON.parse(item));

  // !FORMAT NUMBER INTO 3D NUMBER
  let newRes3: any = [];
  const formatted3d = res3.reduce((acc, curr) => {
    if (curr) {
      const temp = curr.split('').map((t, i) => ({
        d2: curr[0],
        d3: curr[1],
        d4: curr[2],
      }));
      newRes3.push(temp);
    }
    return newRes3;
  }, []);

  const new3dArray = formatted2d.flat(1);

  const unique3dArray = Array.from(
    new Set(new3dArray.map((item) => JSON.stringify(item)))
  ).map((item) => JSON.parse(item));

  // !FORMAT NUMBER INTO 4D NUMBER
  let newRes4: any = [];
  const formatted4d = res4.reduce((acc, curr) => {
    if (curr) {
      const temp = curr.split('').map((t, i) => ({
        d1: curr[0],
        d2: curr[1],
        d3: curr[2],
        d4: curr[3],
      }));
      newRes4.push(temp);
    }
    return newRes4;
  }, []);
  const new4dArray = formatted4d.flat(1);

  const unique4dArray = Array.from(
    new Set(new4dArray.map((item) => JSON.stringify(item)))
  ).map((item) => JSON.parse(item));

  return { unique2dArray, unique3dArray, unique4dArray };
};

export type GameArrayItem = {
  d1?: string;
  d2?: string;
  d3?: string;
  d4?: string;
  game: '2d' | '2dt' | '2dd';
  // wager?: string;
  // dis: string;
  // net: string;
};

export const generateAndPadArray = (
  game: '2d' | '2dt' | '2dd',
  wager: string | undefined,
  length: number,
  start: number,
  step: number = 1
): GameArrayItem[] => {
  const array = Array.from({ length }, (_, k) => start + k * step);
  return array.map((num) => {
    const val = num.toString().padStart(2, '0');

    return {
      d1: game === '2dd' ? val.charAt(0) : '',
      d2: game === '2dd' ? val.charAt(1) : game === '2dt' ? val.charAt(0) : '',
      d3:
        game === '2dd'
          ? ''
          : game === '2dt'
          ? val.charAt(1)
          : game === '2d'
          ? val.charAt(0)
          : '',
      d4:
        game === '2dd'
          ? ''
          : game === '2dt'
          ? ''
          : game === '2d'
          ? val.charAt(1)
          : '',
      game,
      wager,
      dis: '29%',
      net: (Number(wager) * (71 / 100)).toFixed(),
    };
  });
};

// Generate the arrays
// const newSmall = generateAndPadArray('2d', '100', 50, 0);
// const newBig = generateAndPadArray('2d', '100', 50, 50);
// const newOdd = generateAndPadArray('2d', '100', 50, 1, 2);
// const newEven = generateAndPadArray('2d', '100', 50, 0, 2);

// console.log('newSmall:', newSmall);
// console.log('newBig:', newBig);
// console.log('newOdd:', newOdd);
// console.log('newEven:', newEven);

// !FUNCTION THAT GENERATED BY AI CLAUDE

export const generateAndPadArrayFn = (
  game: '2d' | '2dt' | '2dd',
  wager: string | undefined,
  // length: 50,
  // start: number,
  // step: number = 1
  bseo: 'big' | 'small' | 'even' | 'odd'
): GameArrayItem[] => {
  const length = 50;
  // Pre-calculate common values
  const netValue = wager ? (Number(wager) * 0.71).toFixed() : '0';
  const baseItem = {
    game,
    wager,
    dis: '29%',
    net: netValue,
  };

  const start =
    bseo === 'big' ? 50 : bseo === 'small' ? 0 : bseo === 'odd' ? 1 : 0;

  const step = bseo === 'big' || bseo === 'small' ? 1 : 2;

  return Array.from({ length }, (_, index) => {
    const num = (start + index * step).toString().padStart(2, '0');
    // Use object spread for base properties
    return {
      ...baseItem,
      ...getDigitPositions(game, num),
    };
  });
};

// Separate function to determine digit positions
const getDigitPositions = (
  game: string,
  num: string
): Pick<GameArrayItem, 'd1' | 'd2' | 'd3' | 'd4'> => {
  const [first, second] = num;
  switch (game) {
    case '2dd':
      return { d1: first, d2: second, d3: '', d4: '' };
    case '2dt':
      return { d1: '', d2: first, d3: second, d4: '' };
    case '2d':
      return { d1: '', d2: '', d3: first, d4: second };
    default:
      return { d1: '', d2: '', d3: '', d4: '' };
  }
};

export const arrayRange = (start: number, stop: number, step: number) =>
  Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
  );

// ?VALIDATE IF OBJECT CONTAINS 2 OR MORE SELECTED NUMBER
export type Form4dSetProps = {
  d1?: string;
  d2?: string;
  d3?: string;
  d4?: string;
  bet4d: string;
  bet3d: string;
  bet2d: string;
  allBet: string;
  [key: string]: any;
};

export const validateObject = (obj: Form4dSetProps): boolean => {
  const keys = ['d1', 'd2', 'd3', 'd4'];
  const count = keys.reduce((acc, key: any) => (obj[key] ? acc + 1 : acc), 0);
  return count >= 2;
};

export const updateBets = (arr: Form4dSetProps[]): Form4dSetProps[] => {
  return arr.map((obj) => {
    if (validateObject(obj) && obj.allBet) {
      return {
        ...obj,
        bet4d: obj.allBet,
        bet3d: obj.allBet,
        bet2d: obj.allBet,
      };
    }
    return obj;
  });
};

export const rp = Intl.NumberFormat('en-ID');

export function numberWithComas(x: string) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const thousands_separators = (num: number) => {
  var num_parts = num.toString().split('.');
  num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return num_parts.join('.');
};
