import useGames from '@/hooks/use-games';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalizeFirstCharacter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export interface FileLike extends Blob {
  lastModifiedDate: Date;
  name: string;
}
export const blobToFile = (theBlob: Blob, fileName: string): FileLike => {
  const fileLike: FileLike = {
    ...theBlob,
    lastModifiedDate: new Date(),
    name: fileName,
  };
  return fileLike as FileLike;
};

export const trimFilename = (filename: string, maxLength: number) => {
  let split = filename.split('.');
  let extension = split.pop();
  let name = split.join('.');

  if (name.length > maxLength) {
    name = name.substring(0, maxLength - 3) + '...';

    let result = `${name}.${extension}`;
    return result;
  }

  return filename;
};

export const readerOneLiner = (f: Blob): Promise<string> =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsText(f);
  });

export const getBase64FromUrl = async (url: string) => {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      resolve(base64data);
    };
  });
};

type ValueIconProps = { value: string; icon: string } | Record<string, any>;

export function findDuplicateObjects(
  arr1: ValueIconProps[],
  arr2: ValueIconProps[]
) {
  const duplicates: ValueIconProps[] = [];

  for (const obj1 of arr1) {
    for (const obj2 of arr2) {
      if (
        isValueIconProps(obj1) && // Check if obj1 is a ValueIconProps
        isValueIconProps(obj2) && // Check if obj2 is a ValueIconProps
        obj1.value === obj2.value && // Access properties safely with ?.
        obj1.icon === obj2.icon &&
        !duplicates.some((dup) => compareObjects(dup, obj1))
      ) {
        duplicates.push(obj1);
      }
    }
  }

  return duplicates;
}

function compareObjects(obj1: ValueIconProps, obj2: ValueIconProps) {
  // No need for additional checks here as `isValueIconProps` ensures structure
  return obj1.value === obj2.value && obj1.icon === obj2.icon;
}

export function isValueIconProps(
  obj: any
): obj is { value: string; icon: string } {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.value === 'string' &&
    typeof obj.icon === 'string'
  );
}

// const { getGames } = useGames();
// const games = getGames();

export function findMatchingObjects(
  objects: { value: string }[],
  values: string[]
) {
  const matchingObjects: { value: string }[] = [];

  for (const obj of objects) {
    if (values.includes(obj.value)) {
      matchingObjects.push(obj);
    }
  }

  return matchingObjects;
}

// const data = [
//   { value: 'SBOBET' },
//   { value: 'NotAMatch' },
//   { value: 'SBC168Casino' },
//   // ... other objects
// ];

// const targetValues = ['SBOBET', 'SBC168Casino', 'SGD777'];

// const matches = findMatchingObjects(games, targetValues);
// console.log(matches);
