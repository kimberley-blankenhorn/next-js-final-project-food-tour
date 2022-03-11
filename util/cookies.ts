// import Cookies from 'js-cookie';
import { serialize } from 'cookie';

export function createSerializedRegisterSessionTokenCookie(token: string) {
  const isProduction = process.env.NODE_ENV === 'production';

  const maxAge = 60 * 10; // 10 minute session
  return serialize('sessionToken', token, {
    maxAge: maxAge,

    expires: new Date(Date.now() + maxAge * 1000),
    // Important for security
    httpOnly: true,
    // Important for security
    // Set secure cookies on production (Heroku)
    secure: isProduction,
    path: '/',

    sameSite: 'lax',
  });
}
