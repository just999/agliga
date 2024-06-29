'use client';

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
  homeScore: number | null; // Indicate it might be unplayed
  awayScore: number | null; // Indicate it might be unplayed
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
  const { euroTeamHome, euroTeamAway, homeScore, awayScore, date } = match;
  const isHomeTeam = euroTeamHome.value === teamStats.team.value;
  const isAwayTeam = euroTeamAway.value === teamStats.team.value;

  if (
    (isHomeTeam || isAwayTeam) &&
    (homeScore !== null || awayScore !== null)
  ) {
    teamStats.played++;

    const goalsFor = isHomeTeam
      ? Number(homeScore) || 0
      : Number(awayScore) || 0;
    const goalsAgainst = isHomeTeam
      ? Number(awayScore) || 0
      : Number(homeScore) || 0;

    teamStats.goalsScored += Number(goalsFor);
    teamStats.goalsAgainst += Number(goalsAgainst);

    if (Number(goalsFor) > Number(goalsAgainst)) {
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
      // Skip matches that haven't been played yet
      // if (matchDate > now) {
      //   return;
      // }

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
