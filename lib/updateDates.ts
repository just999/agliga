import { parseISO, parse, isValid } from 'date-fns';
import { db } from './db';

export const updateDates = async () => {
  try {
    // Fetch all records (assuming you're checking for a pattern manually)
    const matches = await db.ePL2122.findMany();

    // Filter out those with date strings and not Date types
    const matchesWithDateStrings = matches.filter((match) => {
      const dateString = match.date as unknown as string;
      return typeof dateString === 'string' && !isNaN(Date.parse(dateString));
    });

    console.log(`Found ${matchesWithDateStrings.length} matches to update`);

    for (const match of matchesWithDateStrings) {
      const dateString = match.date as unknown as string; // Original date stored as a string
      // const newDate = moment(dateString, [
      //   moment.ISO_8601,
      //   'YYYY-MM-DD HH:mm:ssZ',
      // ]).toDate();
      let newDate: Date | null = null;

      newDate = parseISO(dateString);

      if (!isValid(newDate)) {
        newDate = parse(dateString, 'yyyy-MM-dd HH:mm:ssX', new Date());
      }

      if (isValid(newDate)) {
        await db.ePL2122.update({
          where: { id: match.id },
          data: { date: newDate },
        });
        console.log(`Updated match ${match.id} date to ${newDate}`);
      } else {
        console.log(
          `Failed to parse date for match ${match.id}: ${dateString}`
        );
      }
    }

    console.log('Dates updated successfully.');
  } catch (error) {
    console.error('Error updating dates:', error);
  } finally {
    await db.$disconnect();
  }
};

updateDates();
