'use client';

import { useState, useEffect } from 'react';

interface TimeResult {
  hours: number | string;
  minutes: number | string;
  seconds: number | string;
  milliseconds: number | string;
}

export function SubtractHoursFromLocalTime(
  hoursToSubtract: number | string
): Date | null {
  const [subtractedTime, setSubtractedTime] = useState<Date | null>(null);

  useEffect(() => {
    const now = new Date();
    const { hours, minutes, seconds, milliseconds }: TimeResult = {
      hours: now.getHours(),
      minutes: now.getMinutes(),
      seconds: now.getSeconds(),
      milliseconds: now.getMilliseconds(),
    };

    const adjustedHours = hours - Number(hoursToSubtract);
    let newHours = adjustedHours;

    // Handle negative hours by adjusting days
    if (newHours < 0) {
      newHours += 24;
      setSubtractedTime(
        new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - 1,
          newHours,
          minutes,
          seconds,
          milliseconds
        )
      );
    } else {
      setSubtractedTime(
        new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          newHours,
          minutes,
          seconds,
          milliseconds
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures useEffect runs only once

  return subtractedTime;
}
