import { usePathname } from 'next/navigation';

export default function useCustomPathname() {
  const pathname = usePathname();

  // Optional: You can return a function to handle pathname changes
  // const handlePathnameChange = (newPathname) => {
  //   setPathname(newPathname);
  // };

  // return { pathname, handlePathnameChange }; // If using the function

  return pathname; // Return only the pathname
}
