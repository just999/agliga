import { categories } from '@/lib/helper';

const formattedTopics = categories.map((topic) => ({
  value: topic.label,
  icon: topic.icon,
}));

const useTopics = () => {
  const getTopics = () => formattedTopics;

  const getByValue = (value: string) => {
    return formattedTopics.find((topic) => topic.value === value);
  };

  return {
    getTopics,
    getByValue,
  };
};

export default useTopics;
