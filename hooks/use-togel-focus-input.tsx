'use client';

import { BbSin4dSchema } from '@/schemas/togel-schema';

type useTogelFocusInputProps = {};

export const useTogelFocusInput = (
  field: string,
  value: string,
  i: number,
  setFocus: any
) => {
  const handleInputChange = () => {
    const valueFields =
      field === 'd1' || field === 'd2' || field === 'd3' || field === 'd4'
        ? value.length === 1
        : value.length === 5;

    if (valueFields) {
      const fields: Array<keyof BbSin4dSchema> = [
        'bbNumber',
        'bet4d',
        'bet3d',
        'bet2d',
        'allBet',
      ];
      const currentIndex = fields.indexOf(field as keyof BbSin4dSchema);
      const nextField = fields[currentIndex + 1];
      if (nextField) {
        setFocus(`bbfs.${i}.${nextField}` as const);
      }
    }
  };
  return <div>useTogelFocusInput</div>;
};
