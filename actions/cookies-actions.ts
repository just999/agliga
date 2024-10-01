import { NextRequest, NextResponse } from 'next/server';
import cookie, { CookieSerializeOptions } from 'cookie';

export const setCookie = async (name: string, value: string) => {
  return new Response(null, {
    status: 200,
    headers: {
      'Set-Cookie': `consent=${value}; expires=Fri, 31 Dec 2030 23:59:59 GMT; path=/; domain=your-domain.com; SameSite=Strict; Secure`,
    },
  });
};

// app/actions/cookies-actions.ts

// Define the shape of your cookie options
type CookieOptionsProps = {
  expires: Date;
  path: string;
  domain: string;
  sameSite: 'Strict' | 'Lax' | 'None'; // Specify valid SameSite values
  secure: boolean;
};

// Define the type for your request body
type SetUserCookieRequestBody = {
  name: string;
  value: string;
};

export async function setUserCookie(name: string, value: string) {
  // const { name, value }: SetUserCookieRequestBody = await req.json();
  // Use the defined cookie options
  const cookieOptions: CookieOptionsProps = {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), // 1 year
    path: '/',
    domain: 'your-domain.com', // Replace with your actual domain
    sameSite: 'Strict', // Or 'Lax' or 'None' as needed
    secure: true,
  };

  // Prepare the options for cookie serialization, ensuring types match what lib expects
  const serializedOptions: CookieSerializeOptions = {
    expires: cookieOptions.expires,
    path: cookieOptions.path,
    domain: cookieOptions.domain,
    sameSite: cookieOptions.sameSite.toLowerCase() as 'strict' | 'lax' | 'none', // Cast to appropriate case
    secure: cookieOptions.secure,
  };

  // Serialize the cookie using the 'cookie' library with converted options
  const cookies = cookie.serialize(name, value, serializedOptions);

  return NextResponse.json(
    { success: true },
    { headers: { 'Set-Cookie': cookies } }
  );
}
