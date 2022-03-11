import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { getValidSessionsByToken } from '../util/database';

const errorStyles = css`
  color: red;
`;
const bodyStyles = css`
  display: flex;
  align-items: center;
  margin-left: 10px;
  /* width: 100vw; */
  border: solid red 1px;
  color: rgb(26, 19, 18);
`;

type Errors = { message: string }[];

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>([]);
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login here for this website" />
      </Head>

      <h1>Login</h1>
      <div>
        <form
          onSubmit={async (event) => {
            event.preventDefault();

            const loginResponse = await fetch('/api/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                username: username,
                password: password,
              }),
            });

            const loginResponseBody = await loginResponse.json();
            if ('errors' in loginResponseBody) {
              setErrors(loginResponseBody.errors);
              return;
            }

            const returnTo = router.query.returnTo;

            if (
              returnTo &&
              !Array.isArray(returnTo) &&
              /^\/[a-zA-Z0-9-?=/]*$/.test(returnTo)
            ) {
              await router.push(returnTo);
              return;
            }

            await router.push(`/users/${loginResponseBody.user.id}`);
          }}
        >
          <div css={bodyStyles}>
            <label>
              Username:
              <input
                value={username}
                placeholder="Username"
                onChange={(event) => setUsername(event.currentTarget.value)}
              />
            </label>

            <label>
              Password:
              <input
                value={password}
                type="password"
                placeholder="Password"
                onChange={(event) => setPassword(event.currentTarget.value)}
              />
            </label>

            <button>Login</button>
          </div>
        </form>
      </div>
      <div css={errorStyles}>
        {errors.map((error) => {
          return <div key={`error-${error.message}`}>{error.message}</div>;
        })}
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // 1. Check if there is a token and if it is valid
  const token = context.req.cookies.sessionToken;

  if (token) {
    // 2. If the cookie is valid and redirect.
    const session = await getValidSessionsByToken(token);

    if (session) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
  }

  // 3. otherwise, render the page
  return {
    props: {},
  };
}
