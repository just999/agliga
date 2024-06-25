'use client';

import { fetchEuro, fetchEuroById } from '@/lib/queries/euro';
import {
  fetchFixtures,
  fetchFixtureById,
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

export const useGetEPLFixtures = (period?: string) => {
  const {
    items,
    item,
    isLoading,
    setItems,
    error,
    setItem,
    setError,
    setIsLoading,
  } = useFixturesStore();

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      if (!period) throw new Error('no period found');
      try {
        setIsLoading(true);
        let filteredEPL;
        if (period === '21-22') {
          const res = await fetchEPL2122();
          filteredEPL = res?.filter((fix) => fix.name === '21-22');
          if (ignore) return;

          if (res) setItems(res);
        } else if (period === '22-23') {
          const res = await fetchEPL2223();
          filteredEPL = res?.filter((fix) => fix.name === '22-23');
          if (ignore) return;

          if (res) setItems(res);
        } else if (period === '23-24') {
          const res = await fetchEPL2324();
          filteredEPL = res?.filter((fix) => fix.name === '23-24');
          if (ignore) return;

          if (res) setItems(res);
        } else if (period === '24-25') {
          const res = await fetchEPL2425();
          filteredEPL = res?.filter((fix) => fix.name === '24-25');
          if (ignore) return;

          if (res) setItems(res);
        }
        return filteredEPL;
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

export const useGetFixtures = (id?: string) => {
  const {
    items,
    item,
    isLoading,
    setItems,
    error,
    setItem,
    setError,
    setIsLoading,
  } = useFixturesStore();

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      try {
        setIsLoading(true);

        if (!id) {
          const res = await fetchFixtures();
          if (ignore) {
            return;
          }
          if (res) {
            const updatedRes = res.map((item) => ({
              ...item,
              date: new Date(item.date).toISOString(),
            }));
            setItems(updatedRes);
          }
        } else if (id) {
          const res = await fetchFixtureById(id);

          if (res) {
            const updatedItem = {
              ...res,
              date: new Date(res.date).toISOString(),
            };
            setItem(updatedItem);
          }
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
          if (!res) throw new Error('No data');

          const transformed = transformData(res);
          setItems(transformed);
        } else {
          const res = await fetchEuroById(id);
          if (!res) throw new Error('No data');

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
