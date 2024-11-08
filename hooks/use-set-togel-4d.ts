import { useCallback, useMemo } from 'react';

const useAutoSetValues = (
  sin4dSet: any,
  watchAllInputs: any,
  watch: any,
  setValue: any
) => {
  const { copy, copyWager } = watchAllInputs;
  useCallback(() => {
    sin4dSet.forEach((sin: any, i: number) => {
      const { bet4d, bet3d, bet2d, allBet, ...rest } = sin;
      const countSin = Object.values(rest).filter((val) => val !== '').length;

      if (copy && copyWager && countSin === 2) {
        setValue(`sin4dSet.${i}.bet2d`, copyWager);
      }
      if (
        copy &&
        copyWager &&
        countSin === 3 &&
        !(rest.d1 && rest.d2 && rest.d3)
      ) {
        setValue(`sin4dSet.${i}.bet2d`, copyWager);
        setValue(`sin4dSet.${i}.bet3d`, copyWager);
      }
      if (copy && copyWager && countSin === 4) {
        setValue(`sin4dSet.${i}.bet2d`, copyWager);
        setValue(`sin4dSet.${i}.bet3d`, copyWager);
        setValue(`sin4dSet.${i}.bet4d`, copyWager);
      }

      if (countSin === 2 && allBet) {
        setValue(`sin4dSet.${i}.bet2d`, allBet);
      }
      if (countSin === 3 && allBet && !(rest.d1 && rest.d2 && rest.d3)) {
        setValue(`sin4dSet.${i}.bet2d`, allBet);
        setValue(`sin4dSet.${i}.bet3d`, allBet);
      }
      if (countSin === 4 && allBet) {
        setValue(`sin4dSet.${i}.bet2d`, allBet);
        setValue(`sin4dSet.${i}.bet3d`, allBet);
        setValue(`sin4dSet.${i}.bet4d`, allBet);
      }
    });
  }, [
    watchAllInputs.copy,
    watchAllInputs.copyWager,
    sin4dSet,
    setValue,
    ...useMemo(
      () => sin4dSet.map((_: any, i: number) => watch(`sin4dSet.${i}.allBet`)),
      [sin4dSet]
    ),
  ]);

  return {};
};

export default useAutoSetValues;
