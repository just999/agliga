import { categories, sportsCategories } from '@/lib/helper';

const formattedTopics = categories.map((topic) => ({
  value: topic.label,
  icon: topic.icon,
}));

export const useTopics = () => {
  const getTopics = () => formattedTopics;

  const getByValue = (value: string) => {
    return formattedTopics.find((topic) => topic.value === value);
  };

  return {
    getTopics,
    getByValue,
  };
};

const formattedSportCategories = sportsCategories.map((cat) => ({
  value: cat.value,
  icon: cat.icon,
}));

export const useSportCategories = () => {
  const getSportCategories = () => formattedSportCategories;

  const getByValue = (value: string) => {
    return formattedSportCategories.find((cat) => cat.value === value);
  };

  return {
    getSportCategories,
    getByValue,
  };
};
