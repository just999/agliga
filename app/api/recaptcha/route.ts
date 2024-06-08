import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req: Request, res: Response) {
  const secretKey = process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY;

  const postData = await req.json();

  const { recaptchaToken } = postData;

  let result;

  const formData = `secret=${secretKey}&res=${recaptchaToken}`;

  try {
    result = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      formData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false });
  }

  if (result && result.data.success && result.data.score > 0.5) {
    console.log('result.data.score:', result.data.score);
    console.log('🚀 ~ POST ~ res:', result);

    return NextResponse.json({
      success: true,
      score: result.data.score,
    });
  } else {
    return NextResponse.json({ success: false });
  }
}
