// // type Team = {
// //   name: string;
// //   played: number;
// //   won: number;
// //   lost: number;
// //   drawn: number;
// //   points: number;
// //   goalsScored: number;
// //   goalsAgainst: number;
// //   goalDifference: number;
// // };

// import { Table } from '@tanstack/react-table';

// // type Match = {
// //   homeTeam: string;
// //   awayTeam: string;
// //   homeGoals: number;
// //   awayGoals: number;
// // };

// // type TableType = {
// //   [key: string]: Team;
// // };

// // const addToTable = (table: TableType, team: string): void => {
// //   table[team] = {
// //       name: team,
// //       played: 0,
// //       won: 0,
// //       lost: 0,
// //       drawn: 0,
// //       points: 0,
// //       goalsScored: 0,
// //       goalsAgainst: 0,
// //       goalDifference: 0
// //   };
// // };

// // const increasePlayed = (table: TableType, teams: string[]): void => {
// //   teams.forEach(team => {
// //       table[team].played = table[team].won + table[team].lost + table[team].drawn;
// //   });
// // };

// // const setResults = (table: TableType, match: Match): void => {
// //   const {
// //       homeTeam,
// //       awayTeam,
// //       homeGoals,
// //       awayGoals
// //   } = match;

// //   if (homeGoals) {
// //       table[homeTeam].goalsScored += homeGoals;
// //       table[awayTeam].goalsAgainst += homeGoals;
// //   }

// //   if (awayGoals) {
// //       table[awayTeam].goalsScored += awayGoals;
// //       table[homeTeam].goalsAgainst += awayGoals;
// //   }

// //   table[homeTeam].goalDifference = table[homeTeam].goalsScored - table[homeTeam].goalsAgainst;
// //   table[awayTeam].goalDifference = table[awayTeam].goalsScored - table[awayTeam].goalsAgainst;

// //   if (homeGoals > awayGoals) {
// //       table[homeTeam].won++;
// //       table[homeTeam].points += 3;
// //       table[awayTeam].lost++;
// //   } else if (homeGoals < awayGoals) {
// //       table[awayTeam].won++;
// //       table[awayTeam].points += 3;
// //       table[homeTeam].lost++;
// //   } else if (homeGoals === awayGoals) {
// //       table[awayTeam].drawn++;
// //       table[homeTeam].drawn++;
// //       table[awayTeam].points += 1;
// //       table[homeTeam].points += 1;
// //   }
// // };

// // const getStandings = (matches: Match[]): TableType => {
// //   const table: TableType = {};

// //   matches.forEach(match => {
// //       const { homeTeam, awayTeam } = match;

// //       if (!table[homeTeam]) addToTable(table, homeTeam);
// //       if (!table[awayTeam]) addToTable(table, awayTeam);

// //       increasePlayed(table, [homeTeam, awayTeam]);
// //       setResults(table, match);
// //   });

// //   return table;
// // };

// // export { getStandings };

// export interface ITable {
//   [team: string]: {
//     name: string;
//     played: number;
//     won: number;
//     lost: number;
//     drawn: number;
//     points: number;
//     goalsScored: number;
//     goalsAgainst: number;
//     goalDifference: number;
//     group: string;
//   };
// }

// interface Match {
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
// }

// export function useLeague(matches: Match[]) {
//   const table: Table = {};

//   function addToTable(team: string) {
//     table[team] = {
//       name: team,
//       played: 0,
//       group: '',
//       won: 0,
//       lost: 0,
//       drawn: 0,
//       points: 0,
//       goalsScored: 0,
//       goalsAgainst: 0,
//       goalDifference: 0,
//     };
//   }

//   function increasePlayed(teams: string[]) {
//     teams.forEach(
//       (team) =>
//         (table[team].played =
//           table[team].won + table[team].lost + table[team].drawn)
//     );
//   }

//   function setResults(match: Match) {
//     const { euroTeamHome, euroTeamAway, homeGoals, awayGoals } = match;

//     if (homeGoals) {
//       table[euroTeamHome.value].goalsScored += homeGoals;
//       table[euroTeamAway.value].goalsAgainst += homeGoals;
//     }

//     if (awayGoals) {
//       table[euroTeamAway.value].goalsScored += awayGoals;
//       table[euroTeamHome.value].goalsAgainst += awayGoals;
//     }

//     table[euroTeamHome.value].goalDifference =
//       table[euroTeamHome.value].goalsScored -
//       table[euroTeamHome.value].goalsAgainst;
//     table[euroTeamAway.value].goalDifference =
//       table[euroTeamAway.value].goalsScored -
//       table[euroTeamAway.value].goalsAgainst;

//     if (homeGoals > awayGoals) {
//       table[euroTeamHome.value].won++;
//       table[euroTeamHome.value].points += 3;
//       table[euroTeamAway.value].lost++;
//     } else if (homeGoals < awayGoals) {
//       table[euroTeamAway.value].won++;
//       table[euroTeamAway.value].points += 3;
//       table[euroTeamHome.value].lost++;
//     } else if (homeGoals === awayGoals) {
//       table[euroTeamAway.value].drawn++;
//       table[euroTeamHome.value].drawn++;
//       table[euroTeamAway.value].points += 1;
//       table[euroTeamHome.value].points += 1;
//     }
//   }

//   matches.forEach((match) => {
//     const { euroTeamHome, euroTeamAway } = match;

//     if (!table[euroTeamHome.value]) addToTable(euroTeamHome.value);
//     if (!table[euroTeamAway.value]) addToTable(euroTeamAway.value);

//     increasePlayed([euroTeamHome.value, euroTeamAway.value]);
//     setResults(match);
//   });

//   return table;
// }

// export default useLeague;

import { icon } from 'leaflet';
import React from 'react';

export interface ITable {
  [team: string]: {
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
}

interface Match {
  euroTeamHome: {
    value: string;
    icon: string;
  };
  euroTeamAway: {
    value: string;
    icon: string;
  };
  group: string;
  homeGoals: number;
  awayGoals: number;
}

function useLeague(matches: Match[]) {
  const table: ITable = {};

  function addToTable(team: string, icon: string) {
    table[team] = {
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
      group: '',
    };
  }

  function increasePlayed(teams: string[]) {
    teams.forEach((team) => {
      table[team].played =
        table[team].won + table[team].lost + table[team].drawn;
    });
  }

  function setResults(match: Match) {
    const { euroTeamHome, euroTeamAway, homeGoals, awayGoals, group } = match;

    if (homeGoals) {
      table[euroTeamHome.value].goalsScored += homeGoals;
      table[euroTeamAway.value].goalsAgainst += homeGoals;
    }

    if (awayGoals) {
      table[euroTeamAway.value].goalsScored += awayGoals;
      table[euroTeamHome.value].goalsAgainst += awayGoals;
    }

    table[euroTeamHome.value].goalDifference =
      table[euroTeamHome.value].goalsScored -
      table[euroTeamHome.value].goalsAgainst;
    table[euroTeamAway.value].goalDifference =
      table[euroTeamAway.value].goalsScored -
      table[euroTeamAway.value].goalsAgainst;

    if (homeGoals > awayGoals) {
      table[euroTeamHome.value].won++;
      table[euroTeamHome.value].points += 3;
      table[euroTeamAway.value].lost++;
    } else if (homeGoals < awayGoals) {
      table[euroTeamAway.value].won++;
      table[euroTeamAway.value].points += 3;
      table[euroTeamHome.value].lost++;
    } else if (homeGoals === awayGoals) {
      table[euroTeamAway.value].drawn++;
      table[euroTeamHome.value].drawn++;
      table[euroTeamAway.value].points += 1;
      table[euroTeamHome.value].points += 1;
    }

    table[euroTeamHome.value].group = group;
    table[euroTeamAway.value].group = group;
  }

  matches.forEach((match) => {
    const { euroTeamHome, euroTeamAway } = match;

    if (!table[euroTeamHome.value])
      addToTable(euroTeamHome.value, euroTeamHome.icon);
    if (!table[euroTeamAway.value])
      addToTable(euroTeamAway.value, euroTeamAway.icon);

    increasePlayed([euroTeamHome.value, euroTeamAway.value]);
    setResults(match);
  });

  return [table];
}

export default useLeague;
