import { games } from '@/lib/helper';

const formattedGames = games.map((game) => ({
  value: game.value,
  icon: game.icon,
}));

const useGames = () => {
  const getGames = () => formattedGames;

  const getGamesByValue = (value: string) => {
    return formattedGames.find((game) => game.value === value);
  };

  return {
    getGames,
    getGamesByValue,
  };
};

export default useGames;
