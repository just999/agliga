import { banks } from '@/lib/helper';

const formattedBanks = banks.map((bank) => ({
  value: bank.value,
  icon: bank.icon,
}));

const useBanks = () => {
  const getBanks = () => formattedBanks;

  const getByValue = (value: string) => {
    return formattedBanks.find((bank) => bank.value === value);
  };

  return {
    getBanks,
    getByValue,
  };
};

export default useBanks;
