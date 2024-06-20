// import { useState, useEffect } from 'react';

// type Match = {
//   euroTeamHome: {
//     value: string;
//     icon: string;
//   };
//   euroTeamAway: {
//     value: string;
//     icon: string;
//   };
//   group: string;
//   homeGoals: number;
//   awayGoals: number;
// };

// export type TeamStats = {
//   name: string;
//   team: {
//     value: string;
//     icon: string;
//   };
//   played: number;
//   [team: string]: {};
//   won: number;
//   lost: number;
//   drawn: number;
//   points: number;
//   goalsScored: number;
//   goalsAgainst: number;
//   goalDifference: number;
//   group: string;
// };

// const calculateTeamStats = (match: Match, teamStats: TeamStats): TeamStats => {
//   const { euroTeamHome, euroTeamAway, homeGoals, awayGoals } = match;

//   if (
//     euroTeamHome.value === teamStats.team.value &&
//     euroTeamHome.icon === teamStats.team.icon &&
//     homeGoals !== undefined &&
//     awayGoals !== undefined
//   ) {
//     teamStats.played++;
//     if (homeGoals) {
//       teamStats.goalsScored += homeGoals;
//       teamStats.goalsAgainst += awayGoals || 0;
//     }
//     if (homeGoals! > awayGoals!) {
//       teamStats.won++;
//       teamStats.points += 3;
//     } else if (homeGoals === awayGoals) {
//       teamStats.drawn++;
//       teamStats.points += 1;
//     }
//   } else if (euroTeamAway.value === teamStats.name) {
//     teamStats.played++;
//     if (awayGoals) {
//       teamStats.goalsScored += awayGoals;
//       teamStats.goalsAgainst += homeGoals || 0;
//     }
//     if (awayGoals! > homeGoals!) {
//       teamStats.won++;
//       teamStats.points += 3;
//     } else if (homeGoals === awayGoals) {
//       teamStats.drawn++;
//       teamStats.points += 1;
//     }
//   }
//   teamStats.goalDifference = teamStats.goalsScored - teamStats.goalsAgainst;
//   return teamStats;
// };

// const useLeague = (matches: Match[]): TeamStats[] => {
//   const [table, setTable] = useState<TeamStats[]>([]);

//   useEffect(() => {
//     const initialTable: { [teamName: string]: TeamStats } = {};
//     matches.forEach((match) => {
//       const { euroTeamHome, euroTeamAway, group } = match;
//       if (!initialTable[euroTeamHome.value]) {
//         initialTable[euroTeamHome.value] = {
//           name: euroTeamHome.value,
//           team: euroTeamHome,
//           played: 0,
//           won: 0,
//           lost: 0,
//           drawn: 0,
//           points: 0,
//           goalsScored: 0,
//           goalsAgainst: 0,
//           goalDifference: 0,
//           group: group,
//         };
//       }
//       if (!initialTable[euroTeamAway.value]) {
//         initialTable[euroTeamAway.value] = {
//           name: euroTeamAway.value,
//           team: euroTeamAway,
//           played: 0,
//           won: 0,
//           lost: 0,
//           drawn: 0,
//           points: 0,
//           goalsScored: 0,
//           goalsAgainst: 0,
//           goalDifference: 0,
//           group: group,
//         };
//       }
//       initialTable[euroTeamHome.value] = calculateTeamStats(
//         match,
//         initialTable[euroTeamHome.value]
//       );
//       initialTable[euroTeamAway.value] = calculateTeamStats(
//         match,
//         initialTable[euroTeamAway.value]
//       );
//     });

//     setTable(Object.values(initialTable));
//   }, [matches]); // Dependency on matches

//   return table;
// };

// export default useLeague;

// const calculateTeamStats = (match: Match, teamStats: TeamStats) => {
//   const { euroTeamHome, euroTeamAway, homeGoals, awayGoals } = match;

//   // Check if the current team is home or away team
//   let isHomeTeam = euroTeamHome.value === teamStats.team.value;
//   let isAwayTeam = euroTeamAway.value === teamStats.team.value;

//   if (!isHomeTeam && !isAwayTeam) {
//     // If the team is neither home nor away in this match, return without changes
//     return teamStats;
//   }

//   teamStats.played++;

//   if (isHomeTeam) {
//     teamStats.goalsScored += homeGoals;
//     teamStats.goalsAgainst += awayGoals;

//     if (homeGoals > awayGoals) {
//       teamStats.won++;
//       teamStats.points += 3;
//     } else if (homeGoals === awayGoals) {
//       teamStats.drawn++;
//       teamStats.points += 1;
//     } else {
//       teamStats.lost++;
//     }
//   } else if (isAwayTeam) {
//     teamStats.goalsScored += awayGoals;
//     teamStats.goalsAgainst += homeGoals;

//     if (awayGoals > homeGoals) {
//       teamStats.won++;
//       teamStats.points += 3;
//     } else if (awayGoals === homeGoals) {
//       teamStats.drawn++;
//       teamStats.points += 1;
//     } else {
//       teamStats.lost++;
//     }
//   }

//   teamStats.goalDifference = teamStats.goalsScored - teamStats.goalsAgainst;
//   return teamStats;
// };

// const useLeague = (matches: Match[]): TeamStats[] => {
//   const [table, setTable] = useState<TeamStats[]>([]);

//   useEffect(() => {
//     const initialTable: { [teamName: string]: TeamStats } = {};

//     matches.forEach((match) => {
//       const { euroTeamHome, euroTeamAway, group } = match;

//       if (!initialTable[euroTeamHome.value]) {
//         initialTable[euroTeamHome.value] = {
//           name: euroTeamHome.value,
//           team: euroTeamHome,
//           played: 0,
//           won: 0,
//           lost: 0,
//           drawn: 0,
//           points: 0,
//           goalsScored: 0,
//           goalsAgainst: 0,
//           goalDifference: 0,
//           group: group,
//         };
//       }

//       if (!initialTable[euroTeamAway.value]) {
//         initialTable[euroTeamAway.value] = {
//           name: euroTeamAway.value,
//           team: euroTeamAway,
//           played: 0,
//           won: 0,
//           lost: 0,
//           drawn: 0,
//           points: 0,
//           goalsScored: 0,
//           goalsAgainst: 0,
//           goalDifference: 0,
//           group: group,
//         };
//       }

//       initialTable[euroTeamHome.value] = calculateTeamStats(
//         match,
//         initialTable[euroTeamHome.value]
//       );

//       initialTable[euroTeamAway.value] = calculateTeamStats(
//         match,
//         initialTable[euroTeamAway.value]
//       );
//     });

//     setTable(Object.values(initialTable));
//   }, [matches]);

//   return table;
// };

// export default useLeague;

// import { useState, useEffect } from 'react';

// type Match = {
//   euroTeamHome: {
//     value: string;
//     icon: string;
//   };
//   euroTeamAway: {
//     value: string;
//     icon: string;
//   };
//   group: string;
//   homeGoals: number;
//   awayGoals: number;
// };

// export type TeamStats = {
//   name: string;
//   team: {
//     value: string;
//     icon: string;
//   };
//   played: number;
//   won: number;
//   lost: number;
//   drawn: number;
//   points: number;
//   goalsScored: number;
//   goalsAgainst: number;
//   goalDifference: number;
//   group: string;
// };

// const calculateTeamStats = (match: Match, teamStats: TeamStats): TeamStats => {
//   const { euroTeamHome, euroTeamAway, homeGoals, awayGoals } = match;
//   const isHomeTeam = euroTeamHome.value === teamStats.team.value;
//   const isAwayTeam = euroTeamAway.value === teamStats.team.value;

//   if (isHomeTeam || isAwayTeam) {
//     console.log(`Updating stats for ${teamStats.name}`);
//     teamStats.played++;
//     const goalsFor = isHomeTeam ? homeGoals : awayGoals;
//     const goalsAgainst = isHomeTeam ? awayGoals : homeGoals;

//     teamStats.goalsScored += goalsFor;
//     teamStats.goalsAgainst += goalsAgainst;

//     if (goalsFor > goalsAgainst) {
//       teamStats.won++;
//       teamStats.points += 3;
//     } else if (goalsFor === goalsAgainst) {
//       teamStats.drawn++;
//       teamStats.points += 1;
//     } else {
//       teamStats.lost++;
//     }

//     teamStats.goalDifference = teamStats.goalsScored - teamStats.goalsAgainst;
//   }

//   return teamStats;
// };

// const useLeague = (matches: Match[]): TeamStats[] => {
//   const [table, setTable] = useState<TeamStats[]>([]);

//   useEffect(() => {
//     const initialTable: { [teamName: string]: TeamStats } = {};
//     console.log('Initial Table:', initialTable);

//     matches.forEach((match) => {
//       const { euroTeamHome, euroTeamAway, group } = match;

//       if (!initialTable[euroTeamHome.value]) {
//         console.log(
//           'Match:',
//           match,
//           'Team Stats Before:',
//           initialTable[euroTeamHome.value],
//           initialTable[euroTeamAway.value]
//         );
//         initialTable[euroTeamHome.value] = {
//           name: euroTeamHome.value,
//           team: euroTeamHome,
//           played: 0,
//           won: 0,
//           lost: 0,
//           drawn: 0,
//           points: 0,
//           goalsScored: 0,
//           goalsAgainst: 0,
//           goalDifference: 0,
//           group: group,
//         };
//       }

//       if (!initialTable[euroTeamAway.value]) {
//         initialTable[euroTeamAway.value] = {
//           name: euroTeamAway.value,
//           team: euroTeamAway,
//           played: 0,
//           won: 0,
//           lost: 0,
//           drawn: 0,
//           points: 0,
//           goalsScored: 0,
//           goalsAgainst: 0,
//           goalDifference: 0,
//           group: group,
//         };
//       }

//       initialTable[euroTeamHome.value] = calculateTeamStats(
//         match,
//         initialTable[euroTeamHome.value]
//       );

//       initialTable[euroTeamAway.value] = calculateTeamStats(
//         match,
//         initialTable[euroTeamAway.value]
//       );
//     });

//     setTable(Object.values(initialTable));
//   }, [matches]);

//   return table;
// };

// export default useLeague;

// import { icon } from 'leaflet';
// import { useState, useEffect } from 'react';

// type Match = {
//   euroTeamHome: {
//     value: string;
//     icon: string;
//   };
//   euroTeamAway: {
//     value: string;
//     icon: string;
//   };
//   group: string;
//   date: string;
//   homeGoals?: number | null;
//   awayGoals?: number | null;
// };

// export type TeamStats = {
//   name: string;
//   team: {
//     value: string;
//     icon: string;
//   };
//   played?: number;
//   won?: number;
//   lost?: number;
//   drawn?: number;
//   points?: number;
//   goalsScored?: number;
//   goalsAgainst?: number;
//   goalDifference?: number;
//   group: string;
// };

// const initializeTeamStats = (
//   team: string,
//   icon: string,
//   group: string
// ): TeamStats => ({
//   name: team,
//   team: {
//     value: team,
//     icon: icon,
//   },
//   played: 0,
//   won: 0,
//   lost: 0,
//   drawn: 0,
//   points: 0,
//   goalsScored: 0,
//   goalsAgainst: 0,
//   goalDifference: 0,
//   group: group,
// });

// const calculateTeamStats = (match: Match, teamStats: TeamStats) => {
//   const { euroTeamHome, euroTeamAway, homeGoals, awayGoals } = match;
//   const isHomeTeam = euroTeamHome.value === teamStats.team.value;
//   const isAwayTeam = euroTeamAway.value === teamStats.team.value;

//   if (isHomeTeam || isAwayTeam) {
//     teamStats.played++;

//     const goalsFor = isHomeTeam ? homeGoals : awayGoals;
//     const goalsAgainst = isHomeTeam ? awayGoals : homeGoals;

//     teamStats.goalsScored += goalsFor ?? 0;
//     teamStats.goalsAgainst += goalsAgainst ?? 0;
//     if (!goalsFor || !goalsAgainst) return;
//     if (goalsFor > goalsAgainst) {
//       teamStats.won++;
//       teamStats.points += 3;
//     } else if (goalsFor === goalsAgainst) {
//       teamStats.drawn++;
//       teamStats.points += 1;
//     } else {
//       teamStats.lost++;
//     }

//     teamStats.goalDifference = teamStats.goalsScored - teamStats.goalsAgainst;
//   }

//   return teamStats;
// };

// const useLeague = (matches: Match[]): TeamStats[] => {
//   const [table, setTable] = useState<TeamStats[]>([]);

//   useEffect(() => {
//     const initialTable: { [teamName: string]: TeamStats } = {};

//     matches.forEach((match) => {
//       const { euroTeamHome, euroTeamAway, group } = match;

//       if (!initialTable[euroTeamHome.value]) {
//         initialTable[euroTeamHome.value] = initializeTeamStats(
//           euroTeamHome.value,
//           euroTeamHome.icon,

//           group
//         );
//       }

//       if (!initialTable[euroTeamAway.value]) {
//         initialTable[euroTeamAway.value] = initializeTeamStats(
//           euroTeamAway.value,
//           euroTeamAway.icon,
//           group
//         );
//       }

//       console.log(
//         'Before update:',
//         initialTable[euroTeamHome.value],
//         initialTable[euroTeamAway.value]
//       );

//       initialTable[euroTeamHome.value] = calculateTeamStats(
//         match,
//         initialTable[euroTeamHome.value]
//       );

//       initialTable[euroTeamAway.value] = calculateTeamStats(
//         match,
//         initialTable[euroTeamAway.value]
//       );

//       console.log(
//         'After update:',
//         initialTable[euroTeamHome.value],
//         initialTable[euroTeamAway.value]
//       );
//     });

//     setTable(Object.values(initialTable));
//   }, [matches]);

//   return table;
// };

// export default useLeague;

import { useState, useEffect } from 'react';

type Match = {
  euroTeamHome: {
    value: string;
    icon: string;
  };
  euroTeamAway: {
    value: string;
    icon: string;
  };
  group: string;
  homeScore?: number | null; // Indicate it might be unplayed
  awayScore?: number | null; // Indicate it might be unplayed
  date: string; // Date of the match in ISO format
};

export type TeamStats = {
  name: string;
  team: {
    value: string;
    icon: string;
  };
  played: number;
  won: number;
  lost: number;
  drawn: number;
  points: number;
  goalsScored: number;
  goalsAgainst: number;
  goalDifference: number;
  group: string;
};

const initializeTeamStats = (
  team: string,
  icon: string,
  group: string
): TeamStats => ({
  name: team,
  team: {
    value: team,
    icon: icon,
  },
  played: 0,
  won: 0,
  lost: 0,
  drawn: 0,
  points: 0,
  goalsScored: 0,
  goalsAgainst: 0,
  goalDifference: 0,
  group: group,
});

const calculateTeamStats = (match: Match, teamStats: TeamStats): TeamStats => {
  const { euroTeamHome, euroTeamAway, homeScore, awayScore } = match;
  const isHomeTeam = euroTeamHome.value === teamStats.team.value;
  const isAwayTeam = euroTeamAway.value === teamStats.team.value;

  if (isHomeTeam || isAwayTeam) {
    teamStats.played++;

    const goalsFor = isHomeTeam
      ? Number(homeScore) || 0
      : Number(awayScore) || 0;
    console.log(
      '🚀 ~ calculateTeamStats ~ goalsFor:',
      isHomeTeam,
      goalsFor,
      euroTeamHome.value,
      euroTeamAway.value
    );
    const goalsAgainst = isHomeTeam
      ? Number(awayScore) || 0
      : Number(homeScore) || 0;

    teamStats.goalsScored += Number(goalsFor);
    teamStats.goalsAgainst += Number(goalsAgainst);

    if (Number(goalsFor) > Number(goalsAgainst)) {
      console.log(
        '🚀 ~ calculateTeamStats ~ goalsFor:',
        euroTeamHome.value,
        goalsFor,
        '>',
        goalsAgainst,
        euroTeamAway.value
      );
      teamStats.won++;
      teamStats.points += +3;
    } else if (Number(goalsFor) === Number(goalsAgainst)) {
      teamStats.drawn++;
      teamStats.points += 1;
    } else {
      teamStats.lost++;
    }

    teamStats.goalDifference =
      Number(teamStats.goalsScored) - Number(teamStats.goalsAgainst);
  }

  return teamStats;
};

const useLeague = (matches: Match[]): TeamStats[] => {
  const [table, setTable] = useState<TeamStats[]>([]);

  useEffect(() => {
    const initialTable: { [teamName: string]: TeamStats } = {};
    const now = new Date();

    matches.forEach((match) => {
      const { euroTeamHome, euroTeamAway, group, date, homeScore, awayScore } =
        match;
      const matchDate = new Date(date);

      console.log('🚀 ~ matches.forEach ~ match:', match);
      // Skip matches that haven't been played yet
      if (matchDate > now) {
        return;
      }

      // Initialize team stats if not already present
      if (!initialTable[euroTeamHome.value]) {
        initialTable[euroTeamHome.value] = initializeTeamStats(
          euroTeamHome.value,
          euroTeamHome.icon,
          group
        );
      }
      if (!initialTable[euroTeamAway.value]) {
        initialTable[euroTeamAway.value] = initializeTeamStats(
          euroTeamAway.value,
          euroTeamAway.icon,
          group
        );
      }

      // console.log(
      //   'Before update:',
      //   initialTable[euroTeamHome.value],
      //   initialTable[euroTeamAway.value]
      // );

      // Only calculate stats for matches that have scores (indicating they were played)
      if (
        Number(homeScore) !== undefined &&
        Number(homeScore) !== null &&
        Number(awayScore) !== undefined &&
        Number(awayScore) !== null
      ) {
        initialTable[euroTeamHome.value] = calculateTeamStats(
          match,
          initialTable[euroTeamHome.value]
        );
        initialTable[euroTeamAway.value] = calculateTeamStats(
          match,
          initialTable[euroTeamAway.value]
        );
      }

      // console.log(
      //   'After update:',
      //   initialTable[euroTeamHome.value],
      //   initialTable[euroTeamAway.value]
      // );
    });

    setTable(Object.values(initialTable));
  }, [matches]);

  return table;
};

export default useLeague;
