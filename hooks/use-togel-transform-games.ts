import { Form4dSetProps } from '@/components/dashboard/members/togels/togel-4d-set';
import { Form4dProps } from '@/components/dashboard/members/togels/togel-sin';
import { useState, useEffect } from 'react';

type Props = {
  sin4dSet: Form4dSetProps[];
  sin4d: Form4dProps[];
};

const useTransformGames = (sin4dSet: Form4dSetProps[]) => {
  const [games, setGames] = useState<Props | []>([]);

  useEffect(() => {
    const transformedGames: any = [];

    for (const item of sin4dSet) {
      const { d1, d2, d3, d4, bet2d, bet3d, bet4d } = item;

      if (bet4d && d1 && d2 && d3 && d4) {
        const g4 = {
          d1: d1,
          d2: d2,
          d3: d3,
          d4: d4,
          game: '4d',
          wager: bet4d,
          dis: '66%',
          net: (Number(bet4d) * (34 / 100)).toString(),
          period: '001',
          status: 'processing',
        };
        transformedGames.push(g4);
      }

      if (bet3d) {
        if (
          (d2 && d3 && d4) ||
          (d1 && d2 && d3) ||
          (d1 && d2 && d4) ||
          (d1 && d3 && d4)
        ) {
          const g3 = {
            d1: '',
            d2:
              d2 && d3 && d4
                ? d2
                : d1 && d2 && d3
                ? d1
                : d1 && d2 && d4
                ? d1
                : d1 && d3 && d4
                ? d1
                : '',
            d3:
              d2 && d3 && d4
                ? d3
                : d1 && d2 && d3
                ? d2
                : d1 && d2 && d4
                ? d2
                : d1 && d3 && d4
                ? d3
                : '',
            d4:
              d2 && d3 && d4
                ? d4
                : d1 && d2 && d3
                ? d3
                : d1 && d2 && d4
                ? d4
                : d1 && d3 && d4
                ? d4
                : '',

            game: '3d',
            wager: bet3d,
            dis: '59%',
            net: (Number(bet3d) * (41 / 100)).toString(),
            period: '001',
            status: 'processing',
          };
          transformedGames.push(g3);
        }
      }

      if (bet2d) {
        if (
          (d3 && d4) ||
          (d2 && d4) ||
          (d1 && d4) ||
          (d2 && d3) ||
          (d1 && d2) ||
          (d1 && d3)
        ) {
          const g2 = {
            d1: '',
            d2: '',
            d3:
              d3 && d4
                ? d3
                : d2 && d4
                ? d2
                : d1 && d4
                ? d1
                : d2 && d3
                ? d2
                : d1 && d2
                ? d1
                : d1 && d3
                ? d1
                : '',
            d4:
              d3 && d4
                ? d4
                : d2 && d4
                ? d4
                : d1 && d4
                ? d4
                : d2 && d3
                ? d3
                : d1 && d2
                ? d2
                : d1 && d3
                ? d3
                : '',
            game: '2d',
            wager: bet2d,
            dis: '29%',
            net: (Number(bet2d) * (71 / 100)).toString(),
            period: '001',
            status: 'processing',
          };
          transformedGames.push(g2);
        }
      }
    }

    if (transformedGames) setGames(transformedGames);
  }, [sin4dSet]);

  return games;
};

export default useTransformGames;

// import { useState, useEffect } from 'react';
// import { Form4dSetProps } from '@/components/dashboard/members/togels/togel-4d-set';
// import { Form4dProps } from '@/components/dashboard/members/togels/togel-sin';

// type Props = {
//   sin4dSet: Form4dSetProps[];
//   sin4d: Form4dProps[];
// };

// const useTransformGames = (sin4dSet: Form4dSetProps[]) => {
//   const [games, setGames] = useState<Props | []>([]);

//   useEffect(() => {
//     const transformedGames: any = [];

//     sin4dSet.forEach((item) => {
//       const {
//         d1 = '',
//         d2 = '',
//         d3 = '',
//         d4 = '',
//         bet2d = '',
//         bet3d = '',
//         bet4d = '',
//       } = item;

//       const addGame = (
//         game: string,
//         wager: string,
//         dis: string,
//         net: number,
//         d1: string,
//         d2: string,
//         d3: string,
//         d4: string
//       ) => {
//         transformedGames.push({
//           d1,
//           d2,
//           d3,
//           d4,
//           game,
//           wager,
//           dis,
//           net: net.toString(),
//           period: '001',
//           status: 'processing',
//         });
//       };

//       if (bet4d && d1 && d2 && d3 && d4) {
//         addGame('4d', bet4d, '66%', Number(bet4d) * 0.34, d1, d2, d3, d4);
//       }

//       if (
//         bet3d &&
//         ((d2 && d3 && d4) ||
//           (d1 && d2 && d3) ||
//           (d1 && d2 && d4) ||
//           (d1 && d3 && d4))
//       ) {
//         addGame(
//           '3d',
//           bet3d,
//           '59%',
//           Number(bet3d) * 0.41,
//           '',
//           d2 || d1,
//           d3 || d2,
//           d4 || d3
//         );
//       }

//       if (
//         bet2d &&
//         ((d3 && d4) ||
//           (d2 && d4) ||
//           (d1 && d4) ||
//           (d2 && d3) ||
//           (d1 && d2) ||
//           (d1 && d3))
//       ) {
//         addGame(
//           '2d',
//           bet2d,
//           '29%',
//           Number(bet2d) * 0.71,
//           '',
//           '',
//           d3 || d2 || d1,
//           d4 || d3
//         );
//       }
//     });

//     setGames(transformedGames);
//   }, [sin4dSet]);

//   return games;
// };

// export default useTransformGames;
