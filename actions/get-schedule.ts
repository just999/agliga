export const getSchedules = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/soccer', {
      cache: 'no-store',
    });

    if (!res.ok) throw new Error('Failed to fetch data');

    return res.json();
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getSchedule = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/soccer/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch data');
    return res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};
