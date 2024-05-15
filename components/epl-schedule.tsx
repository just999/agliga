import React from 'react';

interface EPLScheduleProps {
  teams: EPLTeam[];
}

interface EPLTeam {
  name: string;
  // matches: { [teamName: string]: string }; // Opponent team name to match venue (home/away)
}

const EPLSchedule: React.FC<EPLScheduleProps> = ({ teams }) => {
  // Function to create a round-robin schedule for all teams
  const createRoundRobinSchedule = (teams: EPLTeam[]) => {
    const schedule: string[][] = [];

    // Create an empty schedule matrix
    for (let i = 0; i < teams.length; i++) {
      schedule.push(new Array(teams.length).fill(''));
    }

    // Loop through each team
    for (let i = 0; i < teams.length; i++) {
      const team = teams[i];

      // Schedule home and away matches for each opponent
      for (let j = 0; j < teams.length; j++) {
        if (i !== j) {
          // Avoid self-matches
          const opponent = teams[j];
          schedule[i][j] = opponent.name;
          schedule[j][i] = `${team.name} (A)`; // Mark away matches
        }
      }
    }

    return schedule;
  };

  // Function to create the schedule table rows
  const createScheduleRows = (team: EPLTeam, schedule: string[][]) => {
    const teamMatches = schedule[teams.indexOf(team)];
    return teamMatches.map((opponent, index) => (
      <tr key={`${team.name}-${index}`}>
        <td>{team.name}</td>
        <td>{opponent === '' ? '-' : opponent}</td>
        <td>{opponent.includes(' (A)') ? 'A' : 'H'}</td>
      </tr>
    ));
  };

  const schedule = createRoundRobinSchedule(teams);

  return (
    <table>
      <thead>
        <tr>
          <th>Team</th>
          <th>Opponent</th>
          <th>Venue (H/A)</th>
        </tr>
      </thead>
      <tbody>{teams.map((team) => createScheduleRows(team, schedule))}</tbody>
    </table>
  );
};

export default EPLSchedule;
