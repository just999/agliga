'use client';

import { BbSin4dSchema, Sin4dSchema } from '@/schemas/togel-schema';
import { useMemo, useCallback, useEffect, useState } from 'react';

type CalculatorValues = {
  bbNumber: string;
  bet4d: string;
  bet3d: string;
  bet2d: string;
};

type CalculatorResults = {
  result4d: string[];
  result3d: string[];
  result2d: string[];
  netWager: string;
};

export const useCalculator = (initialValues: CalculatorValues) => {
  const [values, setValues] = useState<CalculatorValues>(initialValues);
  const [results, setResults] = useState<CalculatorResults>({
    result4d: [],
    result3d: [],
    result2d: [],
    netWager: '',
  });

  useEffect(() => {
    const calculateResults = () => {
      const permutate = (input: string, size: number): string[] => {
        const results: string[] = [];
        const doPermute = (
          input: string[],
          output: string[],
          used: boolean[],
          size: number,
          level: number
        ) => {
          if (size === level) {
            const word = output.join('');
            results.push(word);
            return;
          }
          level++;
          for (let i = 0; i < input.length; i++) {
            if (used[i]) continue;
            used[i] = true;
            output.push(input[i]);
            doPermute(input, output, used, size, level);
            used[i] = false;
            output.pop();
          }
        };
        const chars = input.split('');
        const output: string[] = [];
        const used: boolean[] = new Array(chars.length).fill(false);
        doPermute(chars, output, used, size, 0);
        return results;
      };

      const unique = (arr: string[]): string[] => [...new Set(arr)];

      const bbNumber = values.bbNumber || '0';
      const bet2d = parseFloat(values.bet2d) || 0;
      const bet3d = parseFloat(values.bet3d) || 0;
      const bet4d = parseFloat(values.bet4d) || 0;

      const result4d = unique(permutate(bbNumber, 4).sort());
      const result3d = unique(permutate(bbNumber, 3).sort());
      const result2d = unique(permutate(bbNumber, 2).sort());
      const netWager = (-(
        result2d.length * bet2d * 0.71 +
        result3d.length * bet3d * 0.41 +
        result4d.length * bet4d * 0.29
      )).toFixed();

      setResults({ result4d, result3d, result2d, netWager });
    };

    calculateResults();
  }, [values]);

  const updateValues = (newValues: Partial<CalculatorValues>) => {
    setValues((prevValues) => ({ ...prevValues, ...newValues }));
  };

  return { results, updateValues };
};

export const makeUniqPermutations = (size: number, options: any) => {
  if (size > options.length) {
    throw new Error('Cannot make uniq permutations with that size and options');
  }

  if (size === 0) {
    return [''];
  }

  const permutations = options.reduce(
    (acc: any, option: any, index: number) => {
      const restSize = size - 1;

      const restOptions = [
        ...options.slice(0, index),
        ...options.slice(index + 1),
      ];

      const restPermutations = makeUniqPermutations(restSize, restOptions);
      const newPermutations = restPermutations.map(
        (permutation: any) => `${option}${permutation}`
      );

      return [...acc, ...newPermutations];
    },
    []
  );

  return permutations;
};

export const usePer = (size: number, options: any) => {
  const [permutations, setPermutations] = useState<string[]>([]);

  useEffect(() => {
    const makeUniqPermutations = (size: number, options: any): string[] => {
      if (size > options.length) {
        throw new Error(
          'Cannot make uniq permutations with that size and options'
        );
      }

      if (size === 0) {
        return [''];
      }

      const permutations = options.reduce(
        (acc: any, option: any, index: number) => {
          const restSize = size - 1;

          const restOptions = [
            ...options.slice(0, index),
            ...options.slice(index + 1),
          ];

          const restPermutations = makeUniqPermutations(restSize, restOptions);
          const newPermutations = restPermutations.map(
            (permutation: any) => `${option}${permutation}`
          );

          return [...acc, ...newPermutations];
        },
        []
      );

      return permutations;
    };

    setPermutations(makeUniqPermutations(size, options));
  }, [size, options]);

  return permutations;
};

export const usePerm = (size: number, options: string[]) => {
  const [permutations, setPermutations] = useState<string[]>([]);

  useEffect(() => {
    const makeUniqPermutations = (
      size: number,
      options: string[]
    ): string[] => {
      if (size > options.length) {
        return [''];
      }

      if (size === 0) {
        return [''];
      }

      if (options.length === 0) {
        return [];
      }

      const permutations = options.reduce(
        (acc: string[], option: string, index: number) => {
          const restSize = size - 1;

          const restOptions = [
            ...options.slice(0, index),
            ...options.slice(index + 1),
          ];

          const restPermutations = makeUniqPermutations(restSize, restOptions);
          const newPermutations = restPermutations.map(
            (permutation: string) => `${option}${permutation}`
          );

          return [...acc, ...newPermutations];
        },
        []
      );

      return permutations;
    };

    setPermutations(makeUniqPermutations(size, options));
  }, [size, options]);

  return permutations;
};

// ?COMBINE PERMUTATION & FORMAT RESULT ACCORDING TO HOW DIGIT OUTPUT
// export const usePermAndFormat = (options: string[], bbfs: BbSin4dSchema[]) => {
//   const [unique2dArray, setUnique2dArray] = useState<Sin4dSchema[]>([]);
//   const [unique3dArray, setUnique3dArray] = useState<Sin4dSchema[]>([]);
//   const [unique4dArray, setUnique4dArray] = useState<Sin4dSchema[]>([]);
//   useEffect(() => {
//     const makeUniqPermutationsAndFormat = (
//       size: number,
//       options: string[]
//     ): string[] => {
//       if (size > options.length) {
//         return [''];
//       }
//       if (size === 0) {
//         return [''];
//       }
//       if (options.length === 0) {
//         return [];
//       }
//       const permutations = options.reduce(
//         (acc: string[], option: string, index: number) => {
//           const restSize = size - 1;
//           const restOptions = [
//             ...options.slice(0, index),
//             ...options.slice(index + 1),
//           ];
//           const restPermutations = makeUniqPermutationsAndFormat(
//             restSize,
//             restOptions
//           );
//           const newPermutations = restPermutations.map(
//             (permutation: string) => `${option}${permutation}`
//           );
//           return [...acc, ...newPermutations];
//         },
//         []
//       );
//       return permutations;
//     };
//     const formatted2d = makeUniqPermutationsAndFormat(2, options);
//     const formatted3d = makeUniqPermutationsAndFormat(3, options);
//     const formatted4d = makeUniqPermutationsAndFormat(4, options);
//     const result2 = formatted2d.reduce<Sin4dSchema[]>((acc, curr) => {
//       if (curr && bbfs[0].bet2d) {
//         const temp = curr
//           .split('')
//           .map((t, i) => ({
//             d1: '',
//             d2: '',
//             d3: curr[0],
//             d4: curr[1],
//             game: '2d',
//             wager: bbfs[0].bet2d,
//             dis: '29%',
//             net: (Number(bbfs[0].bet2d) * (71 / 100)).toString(),
//             period: '001',
//             status: 'processing',
//           }));
//         acc.push(...temp);
//       }
//       return acc;
//     }, []);
//     const result3 = formatted3d.reduce<Sin4dSchema[]>((acc, curr) => {
//       if (curr && bbfs[0].bet3d) {
//         const temp = curr
//           .split('')
//           .map((t, i) => ({
//             d1: '',
//             d2: curr[0],
//             d3: curr[1],
//             d4: curr[2],
//             game: '3d',
//             wager: bbfs[0].bet3d,
//             dis: '59%',
//             net: (Number(bbfs[0].bet3d) * (41 / 100)).toString(),
//             period: '001',
//             status: 'processing',
//           }));
//         acc.push(...temp);
//       }
//       return acc;
//     }, []);
//     const result4 = formatted4d.reduce<Sin4dSchema[]>((acc, curr) => {
//       if (curr && bbfs[0].bet4d) {
//         const temp = curr
//           .split('')
//           .map((t, i) => ({
//             d1: curr[0],
//             d2: curr[1],
//             d3: curr[2],
//             d4: curr[3],
//             game: '4d',
//             wager: bbfs[0].bet4d,
//             dis: '66%',
//             net: (Number(bbfs[0].bet4d) * (34 / 100)).toString(),
//             period: '001',
//             status: 'processing',
//           }));
//         acc.push(...temp);
//       }
//       return acc;
//     }, []);
//     const unique2dArray = Array.from(
//       new Set(result2.map((item) => JSON.stringify(item)))
//     ).map((item) => JSON.parse(item));
//     setUnique2dArray(unique2dArray);
//     const unique3dArray = Array.from(
//       new Set(result3.map((item) => JSON.stringify(item)))
//     ).map((item) => JSON.parse(item));
//     setUnique3dArray(unique3dArray);
//     const unique4dArray = Array.from(
//       new Set(result4.map((item) => JSON.stringify(item)))
//     ).map((item) => JSON.parse(item));
//     setUnique4dArray(unique4dArray);
//   }, [options, bbfs]);
//   return { unique2dArray, unique3dArray, unique4dArray };
// };

// export const usePermAndFormat = (
//   options: string[],
//   bbfs: BbSin4dSchema[],
//   copy: boolean,
//   copyWager?: string
// ) => {
//   const [unique2dArray, setUnique2dArray] = useState<Sin4dSchema[]>([]);
//   const [unique3dArray, setUnique3dArray] = useState<Sin4dSchema[]>([]);
//   const [unique4dArray, setUnique4dArray] = useState<Sin4dSchema[]>([]);

//   const makeUniqPermutations = useCallback(
//     (size: number, options: string[]): string[] => {
//       if (size > options.length) return [];
//       if (size === 0) return [''];
//       if (options.length === 0) return [];

//       return options.reduce((acc: string[], option: string, index: number) => {
//         const restOptions = [
//           ...options.slice(0, index),
//           ...options.slice(index + 1),
//         ];
//         const restPermutations = makeUniqPermutations(size - 1, restOptions);
//         const newPermutations = restPermutations.map(
//           (permutation) => `${option}${permutation}`
//         );
//         return [...acc, ...newPermutations];
//       }, []);
//     },
//     []
//   );

//   const formatted2d = useMemo(
//     () => makeUniqPermutations(2, options),
//     [makeUniqPermutations, options]
//   );
//   const formatted3d = useMemo(
//     () => makeUniqPermutations(3, options),
//     [makeUniqPermutations, options]
//   );
//   const formatted4d = useMemo(
//     () => makeUniqPermutations(4, options),
//     [makeUniqPermutations, options]
//   );

//   useEffect(() => {
//     const formatResults = (
//       formatted: string[],
//       bet: string,
//       game: string,
//       dis: string,
//       netFactor: number
//     ) => {
//       return formatted.reduce<Sin4dSchema[]>((acc, curr) => {
//         if (curr && bet) {
//           const temp = curr.split('').map((_, i) => ({
//             d1: game === '4d' ? curr[0] : '',
//             d2: game === '4d' ? curr[1] : game === '3d' ? curr[0] : '',
//             d3: game === '4d' ? curr[2] : game === '3d' ? curr[1] : curr[0],
//             d4: game === '4d' ? curr[3] : game === '3d' ? curr[2] : curr[1],
//             game,
//             wager: copy && copyWager ? copyWager : bet,
//             dis: (Number(bet) * (1 - netFactor)).toFixed().toString(),
//             net: (Number(bet) * netFactor).toFixed().toString(),
//             period: '001',
//             status: 'processing',
//           }));
//           acc.push(...temp);
//         }
//         return acc;
//       }, []);
//     };

//     const result2 =
//       bbfs[0].bet2d &&
//       formatResults(formatted2d, bbfs[0].bet2d, '2d', '29%', 0.71);
//     const result3 =
//       bbfs[0].bet3d &&
//       formatResults(formatted3d, bbfs[0].bet3d, '3d', '59%', 0.41);
//     const result4 =
//       bbfs[0].bet4d &&
//       formatResults(formatted4d, bbfs[0].bet4d, '4d', '66%', 0.34);

//     result2 &&
//       setUnique2dArray(
//         Array.from(new Set(result2.map((item) => JSON.stringify(item)))).map(
//           (item) => JSON.parse(item)
//         )
//       );
//     result3 &&
//       setUnique3dArray(
//         Array.from(new Set(result3.map((item) => JSON.stringify(item)))).map(
//           (item) => JSON.parse(item)
//         )
//       );
//     result4 &&
//       setUnique4dArray(
//         Array.from(new Set(result4.map((item) => JSON.stringify(item)))).map(
//           (item) => JSON.parse(item)
//         )
//       );
//   }, [
//     formatted2d,
//     formatted3d,
//     formatted4d,
//     bbfs[0].bbNumber,
//     options,
//     copy,
//     copyWager,
//   ]);

//   return { unique2dArray, unique3dArray, unique4dArray };
// };

// export const usePermAndFormat = (
//   options: string[],
//   bbfs: BbSin4dSchema[],
//   copy: boolean,
//   copyWager?: string
// ) => {
//   const [unique2dArray, setUnique2dArray] = useState<Sin4dSchema[]>([]);
//   const [unique3dArray, setUnique3dArray] = useState<Sin4dSchema[]>([]);
//   const [unique4dArray, setUnique4dArray] = useState<Sin4dSchema[]>([]);

//   const b2 = bbfs[0].bet2d;
//   const b3 = bbfs[0].bet3d;
//   const b4 = bbfs[0].bet4d;
//   const makeUniqPermutations = useCallback(
//     (size: number, options: string[]): string[] => {
//       if (size > options.length) return [];
//       if (size === 0) return [''];
//       if (options.length === 0) return [];

//       return options.reduce((acc: string[], option: string, index: number) => {
//         const restOptions = [
//           ...options.slice(0, index),
//           ...options.slice(index + 1),
//         ];
//         const restPermutations = makeUniqPermutations(size - 1, restOptions);
//         const newPermutations = restPermutations.map(
//           (permutation) => `${option}${permutation}`
//         );
//         return [...acc, ...newPermutations];
//       }, []);
//     },
//     []
//   );

//   const formatted2d = useMemo(
//     () => makeUniqPermutations(2, options),
//     [makeUniqPermutations, options]
//   );
//   const formatted3d = useMemo(
//     () => makeUniqPermutations(3, options),
//     [makeUniqPermutations, options]
//   );
//   const formatted4d = useMemo(
//     () => makeUniqPermutations(4, options),
//     [makeUniqPermutations, options]
//   );

//   useEffect(() => {
//     const bet2d = bbfs[0]?.bet2d || '';
//     const bet3d = bbfs[0]?.bet3d || '';
//     const bet4d = bbfs[0]?.bet4d || '';
//     const formatResults = (
//       formatted: string[],
//       bet: string,
//       game: string,
//       dis: string,
//       netFactor: number
//     ) => {
//       return formatted.reduce<Sin4dSchema[]>((acc, curr) => {
//         if (curr && bet) {
//           const temp = curr.split('').map((_, i) => ({
//             d1: game === '4d' ? curr[0] : '',
//             d2: game === '4d' ? curr[1] : game === '3d' ? curr[0] : '',
//             d3: game === '4d' ? curr[2] : game === '3d' ? curr[1] : curr[0],
//             d4: game === '4d' ? curr[3] : game === '3d' ? curr[2] : curr[1],
//             game,
//             wager: bet,
//             dis: (Number(bet) * (1 - netFactor)).toFixed().toString(),
//             net: (Number(bet) * netFactor).toFixed().toString(),
//             period: '001',
//             status: 'processing',
//           }));
//           acc.push(...temp);
//         }
//         return acc;
//       }, []);
//     };

//     const result2 =
//       bet2d && formatResults(formatted2d, bet2d, '2d', '29%', 0.71);
//     const result3 =
//       bet3d && formatResults(formatted3d, bet3d, '3d', '59%', 0.41);
//     const result4 =
//       bet4d && formatResults(formatted4d, bet4d, '4d', '66%', 0.34);

//     result2 &&
//       setUnique2dArray(
//         Array.from(new Set(result2.map((item) => JSON.stringify(item)))).map(
//           (item) => JSON.parse(item)
//         )
//       );
//     result3 &&
//       setUnique3dArray(
//         Array.from(new Set(result3.map((item) => JSON.stringify(item)))).map(
//           (item) => JSON.parse(item)
//         )
//       );
//     result4 &&
//       setUnique4dArray(
//         Array.from(new Set(result4.map((item) => JSON.stringify(item)))).map(
//           (item) => JSON.parse(item)
//         )
//       );
//   }, [formatted2d, formatted3d, formatted4d, bbfs, options, copy, copyWager]);

//   return { unique2dArray, unique3dArray, unique4dArray };
// };

export const usePermAndFormat = (
  options: string[],
  bbfs: BbSin4dSchema[],
  copy: boolean,
  copyWager?: string
) => {
  const [unique2dArray, setUnique2dArray] = useState<Sin4dSchema[]>([]);
  const [unique3dArray, setUnique3dArray] = useState<Sin4dSchema[]>([]);
  const [unique4dArray, setUnique4dArray] = useState<Sin4dSchema[]>([]);

  const b2 = bbfs[0].bet2d;
  const b3 = bbfs[0].bet3d;
  const b4 = bbfs[0].bet4d;
  const makeUniqPermutations = useCallback(
    (size: number, options: string[]): string[] => {
      if (size > options.length) return [];
      if (size === 0) return [''];
      if (options.length === 0) return [];

      return options.reduce((acc: string[], option: string, index: number) => {
        const restOptions = [
          ...options.slice(0, index),
          ...options.slice(index + 1),
        ];
        const restPermutations = makeUniqPermutations(size - 1, restOptions);
        const newPermutations = restPermutations.map(
          (permutation) => `${option}${permutation}`
        );
        return [...acc, ...newPermutations];
      }, []);
    },
    []
  );

  const formatted2d = useMemo(
    () => makeUniqPermutations(2, options),
    [makeUniqPermutations, options]
  );
  const formatted3d = useMemo(
    () => makeUniqPermutations(3, options),
    [makeUniqPermutations, options]
  );
  const formatted4d = useMemo(
    () => makeUniqPermutations(4, options),
    [makeUniqPermutations, options]
  );

  useEffect(() => {
    const bet2d = bbfs[0]?.bet2d || '';
    const bet3d = bbfs[0]?.bet3d || '';
    const bet4d = bbfs[0]?.bet4d || '';
    const formatResults = (
      formatted: string[],
      bet: string,
      game: string,
      dis: string,
      netFactor: number
    ) => {
      if (!formatted.length) return [];

      return formatted.reduce<Sin4dSchema[]>((acc, curr) => {
        if (!curr) return acc;
        let wagerValue = '';
        if (!copy && copyWager !== undefined) {
          // When using copy functionality
          wagerValue = copyWager;
        } else {
          // When using individual bet values
          switch (game) {
            case '2d':
              wagerValue = bet2d;
              break;
            case '3d':
              wagerValue = bet3d;
              break;
            case '4d':
              wagerValue = bet4d;
              break;
            default:
              wagerValue = '';
          }
        }
        // Only calculate dis and net if we have a valid wager
        const disValue = wagerValue
          ? (Number(wagerValue) * (1 - netFactor)).toFixed().toString()
          : '';
        const netValue = wagerValue
          ? (Number(wagerValue) * netFactor).toFixed().toString()
          : '';

        // For 2D numbers
        const get2DNumbers = () => ({
          d1: '',
          d2: '',
          d3: curr[0],
          d4: curr[1],
        });

        // For 3D numbers
        const get3DNumbers = () => ({
          d1: '',
          d2: curr[0],
          d3: curr[1],
          d4: curr[2],
        });

        // For 4D numbers
        const get4DNumbers = () => ({
          d1: curr[0],
          d2: curr[1],
          d3: curr[2],
          d4: curr[3],
        });

        // Get the appropriate number format based on game type
        const numbers =
          game === '2d'
            ? get2DNumbers()
            : game === '3d'
            ? get3DNumbers()
            : get4DNumbers();

        const resultItem: Sin4dSchema = {
          ...numbers,
          game,
          wager: wagerValue,
          dis: disValue,
          net: netValue,
          period: '001',
          status: 'processing',
        };

        acc.push(resultItem);
        return acc;
      }, []);
    };
    // Process results only if we have valid options
    if (options.length > 0) {
      const result2 = formatResults(formatted2d, bet2d, '2d', '29%', 0.71);
      const result3 = formatResults(formatted3d, bet3d, '3d', '59%', 0.41);
      const result4 = formatResults(formatted4d, bet4d, '4d', '66%', 0.34);

      // Update arrays with results or empty arrays if no results
      setUnique2dArray(
        result2?.length
          ? Array.from(
              new Set(result2.map((item) => JSON.stringify(item)))
            ).map((item) => JSON.parse(item))
          : []
      );

      setUnique3dArray(
        result3?.length
          ? Array.from(
              new Set(result3.map((item) => JSON.stringify(item)))
            ).map((item) => JSON.parse(item))
          : []
      );

      setUnique4dArray(
        result4?.length
          ? Array.from(
              new Set(result4.map((item) => JSON.stringify(item)))
            ).map((item) => JSON.parse(item))
          : []
      );
    }
  }, [
    formatted2d,
    formatted3d,
    formatted4d,
    bbfs,
    options,
    copy,
    copyWager,
    b2,
    b3,
    b4,
  ]);

  return { unique2dArray, unique3dArray, unique4dArray };
};
