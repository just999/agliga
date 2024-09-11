export async function getCaptchaToken() {
  return new Promise<string | null>((resolve) => {
    grecaptcha.ready(async () => {
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

      if (!siteKey) return;

      const token = await grecaptcha.execute(siteKey, {
        action: 'contact',
      });

      resolve(token);
    });
  });
}

type CaptchaDataProps =
  | {
      success: true;
      challenge_ts: string;
      hostname: string;
      score: number;
      action: string;
      'error-codes': string[];
    }
  | {
      success: false;
      'error-codes': ErrorCodesProps[];
    };

type ErrorCodesProps =
  | 'missing-input-secret'
  | 'invalid-input-secret'
  | 'missing-input-response'
  | 'invalid-input-response'
  | 'bad-request'
  | 'timeout-or-duplicate';

export async function verifyCaptchaToken(token: string) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) throw new Error('No Key found');

  const url = new URL('https://www.google.com/recaptcha/api/siteverify');

  url.searchParams.append('secret', secretKey);
  url.searchParams.append('response', token);

  const res = await fetch(url, { method: 'POST' });

  const captchaData: CaptchaDataProps = await res.json();
  if (!res.ok) return null;

  return captchaData;
}
