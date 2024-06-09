import { euros } from '@/lib/helper';

const formattedTeams = euros.map((team) => ({
  value: team.label,
  icon: team.icon,
}));

export const useEuros = () => {
  const getTeams = () => formattedTeams;

  const getByValue = (value: string) => {
    return formattedTeams.find((team) => team.value === value);
  };

  return {
    getTeams,
    getByValue,
  };
};
