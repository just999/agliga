import { EPL, EPLPeriod, runData, weeks } from '@/lib/helper';

const formattedTeams = EPL.map((team) => ({
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

const formattedWeeks = weeks.map((week) => ({
  value: week.value,
  icon: week.icon,
}));

export const useWeeks = () => {
  const getWeeks = () => formattedWeeks;

  const getWeeksByValue = (value: number) => {
    return formattedWeeks.find((week) => week.value === value);
  };
  return { getWeeks, getWeeksByValue };
};

const formattedEPLPeriod = EPLPeriod.map((per) => ({
  label: per.label,
  value: per.value,
  icon: per.icon,
}));

export const useEPLPeriods = () => {
  const getPeriods = () => formattedEPLPeriod;

  const getPeriodsByValue = (value: string) => {
    return formattedEPLPeriod.find((period) => period.value === value);
  };
  return { getPeriods, getPeriodsByValue };
};
