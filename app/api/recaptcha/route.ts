import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request, response: Response) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) throw new Error('No secret key found!');

  const postData = await request.json();

  const { recaptchaToken } = postData;

  let res;

  const formData = `secret=${secretKey}&response=${recaptchaToken}`;
  try {
    res = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      formData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
  } catch (err) {
    return NextResponse.json({ success: false });
  }

  if (res && res.data?.success && res.data?.score > 0.5) {
    return NextResponse.json({
      success: true,
      score: res.data.score,
    });
  } else {
    return NextResponse.json({ success: false });
  }
}
