import useGames from '@/hooks/use-games';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Noto_Color_Emoji, Orbitron, Poppins } from 'next/font/google';
import { date } from 'zod';
import { EuroWithIconProps } from '@/types';
import { format, parse } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

// const data = [
//   { value: 'SBOBET' },
//   { value: 'NotAMatch' },
//   { value: 'SBC168Casino' },
//   // ... other objects
// ];

// const targetValues = ['SBOBET', 'SBC168Casino', 'SGD777'];

// const matches = findMatchingObjects(games, targetValues);
// console.log(matches);

export const noto = Noto_Color_Emoji({
  subsets: ['emoji'],
  weight: ['400'],
  preload: true,
});

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  preload: true,
});

export const orbit = Orbitron({ subsets: ['latin'], preload: true });

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

// export type MatchesProps = {
//   home?: string;
//   away?: string;
//   result?: string;
//   group?: string;
// };
// let matches: TMatchesProps[] = [
//   { home: 'Puskas Lovers', away: 'Cruyff FC', result: '1-1' },
//   { home: 'Catenaccio', away: 'Maradona+10', result: '2-3' },
//   { home: 'Puskas Lovers', away: 'Catenaccio', result: '0-0' },
//   { home: 'Cruyff FC', away: 'Maradona+10', result: '2-0' },
//   { home: 'Catenaccio', away: 'Cruyff FC', result: '1-0' },
//   { home: 'Maradona+10', away: 'Puskas Lovers', result: '1-1' },
//   { home: 'Cruyff FC', away: 'Puskas Lovers', result: '3-3' },
//   { home: 'Maradona+10', away: 'Catenaccio', result: '1-0' },
//   { home: 'Catenaccio', away: 'Puskas Lovers', result: '1-2' },
//   { home: 'Maradona+10', away: 'Cruyff FC', result: '3-1' },
//   { home: 'Cruyff FC', away: 'Catenaccio', result: '1-1' },
//   { home: 'Puskas Lovers', away: 'Maradona+10', result: '1-0' },
// ];

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
