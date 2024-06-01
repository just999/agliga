export function convertDateTime(dateTimeString: string): string {
  // Parse the date string using Date object
  const date = new Date(dateTimeString);

  // Ensure valid date parsing
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date string provided.');
  }

  // Get year, month (0-indexed), day, hours, minutes
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Pad month with leading zero
  const day = String(date.getDate()).padStart(2, '0'); // Pad day with leading zero
  const hours = String(date.getHours()).padStart(2, '0'); // Pad hours with leading zero
  const minutes = String(date.getMinutes()).padStart(2, '0'); // Pad minutes with leading zero

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

const originalDateTime = 'Mon May 19 2024 22:00:00 GMT+0700 (Indochina Time)';
const formattedDateTime = convertDateTime(originalDateTime);
