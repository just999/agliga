import { euros, penalty } from '@/lib/helper';

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

const formattedPenalty = penalty.map((pen) => ({
  value: pen.value,
  icon: pen.icon,
  desc: pen.description,
  style: pen.style,
}));

export const usePenalty = () => {
  const getPenalty = () => formattedPenalty;

  const getPenaltyByValue = (value: string) => {
    return formattedPenalty.find((pen) => pen.value === value);
  };
  return { getPenalty, getPenaltyByValue };
};
