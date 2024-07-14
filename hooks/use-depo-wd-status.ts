import { status } from '@/lib/helper';

const formattedStatus = status.map((stat) => ({
  value: stat.value,
  icon: stat.icon,
}));

const useStatus = () => {
  const getStatus = () => formattedStatus;

  const getByValue = (value: string) => {
    return formattedStatus.find((stat) => stat.value === value);
  };

  return {
    getStatus,
    getByValue,
  };
};
export default useStatus;
