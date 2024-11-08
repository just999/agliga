import { useMemo } from 'react';

type Togel4dProps = {
  value: {
    d1: string;
    d2: string;
    d3: string;
    d4: string;
    // game: string;
    // wager: string;
    // dis: string;
    // net: string;
  };
  type: 'game' | 'dis' | 'net' | 'sin4dSet';
};

export const useTogel4d = ({ value, type }: Togel4dProps) => {
  const { d1, d2, d3, d4 } = value;

  const game4d = useMemo(() => {
    const inputs = [d1, d2, d3, d4];
    const filledInputs = inputs.filter((input) => input).length;

    switch (filledInputs) {
      case 4:
        return type === 'game' || type === 'sin4dSet'
          ? '4d'
          : type === 'dis'
          ? '66%'
          : '';
      case 3:
        if (d2 && d3 && d4)
          return type === 'game' || type === 'sin4dSet'
            ? '3d'
            : type === 'dis'
            ? '59%'
            : '';
        if (d1 && d2 && d3) return ' ';
      case 2:
        if (d1 && d2)
          return type === 'game' || type === 'sin4dSet'
            ? '2dd'
            : type === 'dis'
            ? '29%'
            : '';
        if (d2 && d3)
          return type === 'game' || type === 'sin4dSet'
            ? '2dt'
            : type === 'dis'
            ? '29%'
            : '';
        if (d3 && d4)
          return type === 'game' || type === 'sin4dSet'
            ? '2d'
            : type === 'dis'
            ? '29%'
            : '';
        break;
      default:
        return ' ';
    }
  }, [d1, d2, d3, d4, type]);

  return game4d;
};

// *snippet from copilot
// const game4d = useMemo(() => {
//   const inputs = [d1, d2, d3, d4];
//   const filledInputs = inputs.filter((input) => input).length;

//   switch (filledInputs) {
//     case 4:
//       return '4d';
//     case 3:
//       if (d2 && d3 & d4) return '3d';
//       if (d1 && d2 && d3) return ' ';
//     case 2:
//       if (d1 && d2) return '2dd';
//       if (d2 && d3) return '2dt';
//       if (d3 && d4) return '2d';
//       break;
//     default:
//       return '';
//   }
// }, [d1, d2, d3, d4]);

// !Snippet from our own
// const game4d = useMemo(() => {
//   let value;
//   if (d1 && d2 && !d3 && !d4 && wager) {
//     value = '2dd';
//   } else if (!d1 && d2 && d3 && !d4) {
//     value = '2dt';
//   } else if (!d1 && !d2 && d3 && d4) {
//     value = '2d';
//   } else if (d1 && d2 && d3 && !d4) {
//     value = ' ';
//   } else if (!d1 && d2 && d3 && d4) {
//     value = '3d';
//   } else if (d1 && d2 && d3 && d4) {
//     value = '4d';
//   }
//   return value;
// }, [d1, d2, d3, d4]);

// const disc = useMemo(() => {
//   if (
//     (d1 && d2 && !d3 && !d4) ||
//     (!d1 && d2 && d3 && !d4) ||
//     (!d1 && !d2 && d3 && d4)
//   )
//     return '29%';
//   if (!d1 && d2 && d3 && d4) return '59%';
//   if (d1 && d2 && d3 && d4) return '66%';

//   return '';
// }, [d1, d2, d3, d4]);
