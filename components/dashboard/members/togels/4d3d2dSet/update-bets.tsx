import { useEffect } from 'react';
import { useForm, useWatch, Control } from 'react-hook-form';

export type Form4dSetProps = {
  d1?: string;
  d2?: string;
  d3?: string;
  d4?: string;
  bet4d?: string;
  bet3d?: string;
  bet2d?: string;
  allBet?: string;
  [key: string]: any;
};

// Example usage
const togel4dSet: Form4dSetProps[] = [
  {
    d1: '1',
    d2: '2',
    d3: '3',
    d4: '4',
    bet4d: '434',
    bet3d: '34434',
    bet2d: '343',
    allBet: '436',
  },
  {
    d1: '1',
    d2: '2',
    d4: '4',
    bet4d: '434',
    bet3d: '34434',
    bet2d: '343',
    allBet: '436',
  },
  { d1: '1', bet4d: '434', bet3d: '34434', bet2d: '343', allBet: '436' },
];
const validateObject = (obj: Form4dSetProps): boolean => {
  const keys = ['d1', 'd2', 'd3', 'd4'];
  const count = keys.reduce((acc, key: any) => (obj[key] ? acc + 1 : acc), 0);
  return count >= 2;
};

export const validateArray = (arr: Form4dSetProps[]): boolean[] => {
  return arr.map(validateObject);
};

const validationResults = validateArray(togel4dSet);
console.log('🚀 ~ TogelTable4dSet ~ validationResults:', validationResults);

export const UpdateBets = (
  control: Control<Form4dSetProps[]>,
  setValue: (name: string, value: any) => void
) => {
  const allBetValues = useWatch({
    name: control._defaultValues.map((_, index) => `bb.${index}.allBet`),
  });
  useEffect(() => {
    allBetValues.forEach((allBet, index) => {
      if (allBet) {
        const obj = control._defaultValues[index] as Form4dSetProps;

        if (validateObject(obj)) {
          setValue(`bb.${index}.bet4d`, allBet);
          setValue(`bb.${index}.bet3d`, allBet);
          setValue(`bb.${index}.bet2d`, allBet);
        }
      }
    });
  }, [allBetValues, control, setValue]);

  return allBetValues;
};
