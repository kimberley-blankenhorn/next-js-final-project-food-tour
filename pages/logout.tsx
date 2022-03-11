import { serialize } from 'cookie';
import { GetServerSidePropsContext } from 'next';
import { deleteSessionsByToken } from '../util/database';

export default function Logout() {
  return 'You have been logged out';
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // 1. Get the cookie from context and get the session token
  const token = context.req.cookies.sessionToken;

  if (token) {
    console.log(token);

    // 2. Delete the cookie from the database
    await deleteSessionsByToken(token);

    // 3. Set the cookie destruction
    context.res.setHeader(
      'Set-Cookie',
      serialize('sessionToken', '', {
        maxAge: -1,
        path: '/',
      }),
    );
  }

  // 4. Redirect to the page that linked logout

  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
}
