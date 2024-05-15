import { englishPL, EPL, runData } from '@/lib/helper';

const formattedTeams = englishPL.map((team) => ({
  value: team.name,
  icon: team.icon,
}));

export const useTeams = () => {
  const getTeams = () => formattedTeams;

  const getByValue = (value: string) => {
    return formattedTeams.find((team) => team.value === value);
  };

  return {
    getTeams,
    getByValue,
  };
};

const formattedRuns = runData.map((run) => ({
  value: run.value,
  icon: run.icon,
}));

export const useRuns = () => {
  const getRuns = () => formattedRuns;

  const getRunsByValue = (value: number) => {
    return formattedRuns.find((run) => run.value === value);
  };
  return { getRuns, getRunsByValue };
};
