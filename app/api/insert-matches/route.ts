// // app/api/insert-matches/route.ts

// import { NextRequest, NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';
// import { db } from '@/lib/db';

// const prisma = new PrismaClient();

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const matches = body.matches;

//     if (!Array.isArray(matches)) {
//       return NextResponse.json(
//         { message: 'Invalid data format' },
//         { status: 400 }
//       );
//     }

//     // Insert multiple matches into the database
//     const insertedMatches = await db.ePL2122.createMany({
//       data: matches,
//       // Skip entries that would cause duplicates based on the unique identifier
//     });

//     return NextResponse.json({
//       message: 'Matches inserted successfully',
//       count: insertedMatches.count,
//     });
//   } catch (error: any) {
//     // console.error('Error inserting matches:', error);
//     return NextResponse.json(
//       { message: 'Internal server error', error: error.message },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { db } from '@/lib/db';
import { parseISO } from 'date-fns';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const matches = body;

    // Validate data format: Array of objects with required properties
    if (
      !Array.isArray(matches) ||
      !matches.every((match) => isValidMatch(match))
    ) {
      return NextResponse.json(
        {
          message:
            'Invalid data format. Please provide an array of objects with required properties',
        },
        { status: 400 }
      );
    }

    // Validate and transform date fields
    const transformedMatches = matches.map((match) => {
      try {
        // Attempt to parse the date using date-fns
        const parsedDate = parseISO(match.date);

        // Return a new object with the parsed date (if valid)
        return { ...match, date: parsedDate };
      } catch (error) {
        console.error('Error parsing date for match:', match, error);
        // Optionally throw a specific error or log and skip this match
        // throw new Error('Invalid date format for match');
        return null; // Skip invalid matches (optional)
      }
    });

    // Filter out any null values from transformed matches (if applicable)
    const filteredMatches = transformedMatches.filter(
      (match) => match !== null
    );

    // Insert valid matches into the database (if any)
    if (filteredMatches.length > 0) {
      const insertedMatches = await db.ePL2324.createMany({
        data: filteredMatches,
      });

      return NextResponse.json({
        message: 'Matches inserted successfully',
        count: insertedMatches.count,
      });
    } else {
      return NextResponse.json({
        message: 'No valid matches found for insertion',
        status: 400, // Or adjust status code as needed
      });
    }
  } catch (error: any) {
    console.error('Error inserting matches:', error);

    return NextResponse.json(
      {
        message: 'Internal server error',
        error: 'An error occurred while processing your request',
      },
      { status: 500 }
    );
  }
}

// Function to validate each match object's structure
function isValidMatch(match: any) {
  const requiredProperties = [
    'name',
    'week',
    'date',
    'teamHome',
    'teamAway',
    'homeScore',
    'awayScore',
  ];
  return requiredProperties.every((prop) =>
    Object.prototype.hasOwnProperty.call(match, prop)
  );
}
