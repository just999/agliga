// pages/api/verify-password.ts

import bcrypt from 'bcryptjs'; // Assuming you're using bcrypt for password hashing
import getCurrentUser from '@/actions/get-user';
import { NextResponse } from 'next/server';

interface VerifyPasswordRequest {
  password: string;
  email: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { password, email } = body;
    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.error();

    if (currentUser.email !== email) throw new Error('user not authorized');

    // Replace with your logic to get the user's hashed password
    const hashedPassword = currentUser.hashedPassword; // Replace with actual retrieval

    if (!hashedPassword) {
      return new Response(
        JSON.stringify({ message: 'Password not set for user' })
      );
    }
    // Verify the provided password against the hashed password
    const isValid = await bcrypt.compare(password, hashedPassword);
    if (!isValid) return NextResponse.error();

    return NextResponse.json(
      { isValid, message: 'user verified' },
      { status: 200 }
    );
  } catch (err) {
    return new Response(JSON.stringify({ message: 'Server Error' }), {
      status: 500,
    });
  }
}
