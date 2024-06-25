import React, { useEffect, useState } from 'react';

type Match = {
  id: string;
  startTime: string; // ISO date string for the start time
  duration: number; // Match duration in minutes
};

type MatchWithStatus = Match & {
  status: 'upcoming' | 'playing' | 'already played';
};

const getMatchStatus = (
  match: Match
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

type MatchesProps = {
  matches: Match[];
};

export const MatchesStatus: React.FC<MatchesProps> = ({ matches }) => {
  const [matchStatuses, setMatchStatuses] = useState<MatchWithStatus[]>([]);

  useEffect(() => {
    const updateMatchStatuses = () => {
      const updatedMatches = matches.map((match) => ({
        ...match,
        status: getMatchStatus(match),
      }));
      setMatchStatuses(updatedMatches);
    };

    updateMatchStatuses();

    const interval = setInterval(updateMatchStatuses, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [matches]);

  return (
    <div>
      {matchStatuses.map((match) => (
        <div key={match.id}>
          <span>{match.startTime}</span> - <span>Status: {match.status}</span>
        </div>
      ))}
    </div>
  );
};
