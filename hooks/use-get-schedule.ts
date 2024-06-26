'use client';

import { fetchEuro, fetchEuroById } from '@/lib/queries/euro';
import {
  fetchEPL2122,
  fetchEPL2223,
  fetchEPL2324,
  fetchEPL2425,
} from '@/lib/queries/fixtures';
import { fetchSchedule, fetchScheduleById } from '@/lib/queries/schedule';
import useEuroStore from '@/store/use-euro-store';
import useFixturesStore from '@/store/use-fixture-store';
import useSchedulesStore from '@/store/use-schedule-store';
import { EuroWithIconProps } from '@/types';
import { id } from 'date-fns/locale';

import { useEffect } from 'react';

export const useGetSchedules = (id?: string) => {
  const {
    items,
    item,
    isLoading,
    setItems,
    error,
    setItem,
    setError,
    setIsLoading,
  } = useSchedulesStore();

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      try {
        setIsLoading(true);

        if (!id) {
          const res = await fetchSchedule();
          if (ignore) {
            return;
          }
          if (res) {
            setItems(res);
          }
        } else if (id) {
          const res = await fetchScheduleById(id);
          if (res) setItem(res);
        }
      } catch (err) {
        console.error('Error fetching data', err);
        setError('error');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    return () => {
      ignore = true;
    };
  }, [id, setError, setIsLoading, setItem, setItems]);

  return { isLoading, error, items, item, setIsLoading };
};

type Match = {
  europeTeamHome: {
    value: string;
    icon: string;
    group: string | null; // Assuming this property based on error message
  };
  euroTeamAway: {
    value: string;
    icon: string;
  };
  group: string | null; // Assuming this property based on error message
  date: string;
  homeGoals?: number | null;
  awayGoals?: number | null;
};

// export const useGetSchedules = (id?: string) => {
//   const {
//     items,
//     item,
//     isLoading,
//     setItems,
//     error,
//     setItem,
//     setError,
//     setIsLoading,
//   } = useSchedulesStore();

//   useEffect(() => {
//     let ignore = false;
//     const fetchData = async () => {
//       try {
//         setIsLoading(true);

//         if (!id) {
//           const res = await fetchSchedule();
//           if (ignore) return;
//           if (res) {
//             // Transform the data here before setting it
//             const transformed = res.map((match) => ({
//               ...match,
//               group: match.group || undefined, // Transform null to undefined
//             }));
//             setItems(transformed);
//           }
//         } else if (id) {
//           const res = await fetchScheduleById(id);
//           if (res) {
//             // Transform the single fetched item
//             const transformed = {
//               ...res,
//               group: res.group || undefined, // Transform null to undefined
//             };
//             setItem(transformed);
//           }
//         }
//       } catch (err) {
//         console.error('Error fetching data', err);
//         setError('error');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();

//     return () => {
//       ignore = true;
//     };
//   }, [id, setError, setIsLoading, setItem, setItems]);

//   return { isLoading, error, items, item, setIsLoading };
// };

// export const useGetEuros = (id?: string) => {
//   const {
//     items,
//     item,
//     isLoading,
//     error,
//     setItem,
//     setItems,
//     setError,
//     setIsLoading,
//   } = useEuroStore();

//   useEffect(() => {
//     let ignore = false;
//     const fetchData = async () => {
//       try {
//         setIsLoading(true);

//         if (!id) {
//           const res = await fetchEuro();
//           if (ignore) {
//             return;
//           }
//           if (!res) throw new Error('No data');

//           setItems(res);
//         } else if (id) {
//           const res = await fetchEuroById(id);
//           if (!res) throw new Error('No data');
//           setItem(res);
//         }
//         setIsLoading(false);
//       } catch (err) {
//         console.error('Error fetching data', err);
//         setError('error');
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchData();

//     return () => {
//       ignore = true;
//     };
//   }, [id, setError, setIsLoading, setItem, setItems]);

//   return { isLoading, error, item, items, setItems, setIsLoading };
// };

export const useGetEuros = (id?: string) => {
  const {
    items,
    item,
    isLoading,
    error,
    setItem,
    setItems,
    setError,
    setIsLoading,
  } = useEuroStore();

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const transformData = (data: any[]) => {
          return data.map((item) => ({
            ...item,
            euroTeamHome: {
              ...item.euroTeamHome,
              group: item.euroTeamHome.group ?? undefined,
            },
            euroTeamAway: {
              ...item.euroTeamAway,
              group: item.euroTeamAway.group ?? undefined,
            },
            group: item.group ?? undefined,
          }));
        };

        if (!id) {
          const res = await fetchEuro();
          if (ignore) return;
          if (!res) return null;

          const transformed = transformData(res);
          setItems(transformed);
        } else {
          const res = await fetchEuroById(id);
          if (!res) return null;

          // Transform the single item
          const transformed = {
            ...res,
            euroTeamHome: {
              ...res.euroTeamHome,
              group: res.euroTeamHome.group ?? undefined,
            },
            euroTeamAway: {
              ...res.euroTeamAway,
              group: res.euroTeamAway.group ?? undefined,
            },
            group: res.group ?? undefined,
          };
          setItem(transformed);
        }
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching data', err);
        setError('error');
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, [id, setError, setIsLoading, setItem, setItems]);

  return { isLoading, error, item, items, setItems, setIsLoading };
};

export const useGetFixtures = (id?: string, period?: string) => {
  const {
    items,
    item,
    isLoading,
    error,
    setItem,
    setItems,
    setError,
    setIsLoading,
  } = useFixturesStore();

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      try {
        setIsLoading(true);

        if (!period || !['21-22', '22-23', '23-24', '24-25'].includes(period)) {
          return null;
        }
        const apiMap = {
          '21-22': fetchEPL2122,
          '22-23': fetchEPL2223,
          '23-24': fetchEPL2324,
          '24-25': fetchEPL2425,
        } as const;

        const fetchFunction = apiMap[period as keyof typeof apiMap];

        if (id) {
          const res = (await fetchFunction(id)) as any;
          if (ignore) return;
          if (!res) return null;
          setItem(res);
        } else if (!id) {
          const res = (await fetchFunction()) as any;
          if (ignore) return;
          if (!res) return null;
          setItems(res);
        }
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching data', err);
        setError('error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, [id, period, setError, setIsLoading, setItem, setItems]);

  return { isLoading, error, item, items, setItems, setIsLoading };
};
