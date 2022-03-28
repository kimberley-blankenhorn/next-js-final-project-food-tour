import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../components/Layout';
import { getValidSessionsByToken } from '../util/database';

const errorStyles = css`
  color: red;
`;

const backgroundImage = css`
  background-image: url('/images/vienna.jpg');
  background-position: center;
  background-repeat: no-repeat;
  object-fit: contain;
  height: 100vh;
  width: 100vw;
`;

const navStyle = css`
  display: flex;
  justify-content: space-between;
  height: 70px;
  background-color: rgb(203, 204, 204, 0.9);
  margin-bottom: 50px;
  a {
    color: white;
    font-weight: 700;
    text-decoration: none;
    -webkit-transition: color 1s;
    border-bottom: 1px solid transparent;

    transition: all ease-in-out 0.5s;
    margin: 0 20px;

    &:hover {
      color: rgba(102, 199, 186);
      border-color: rgba(102, 199, 186);
    }
  }
`;
const bodyStyles = css`
  display: flex;
  align-items: center;
  margin-left: 10px;
  color: rgb(26, 19, 18);
`;

const loginStyling = css`
  display: flex;
  flex-direction: column;
  margin: 50px auto;
  height: 70vh;
  width: 60vw;
  justify-content: center;
  align-items: center;
  align-content: center;

  background-color: rgb(128, 128, 128, 0.7);
  color: white;
  border-radius: 30px;

  label {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    align-items: center;

    input {
      display: flex;
      text-align: center;
      height: 40px;
      width: 250px;
      margin: 20px;
      border-radius: 30px;
      border: none;
      -webkit-box-shadow: -4px 9px 13px 0px rgba(50, 50, 50, 0.93);
      -moz-box-shadow: -4px 9px 13px 0px rgba(50, 50, 50, 0.93);
      box-shadow: -4px 9px 13px 0px rgba(50, 50, 50, 0.93);
    }
  }
  button {
    margin: 50px;
    height: 50px;
    width: 200px;
    border-radius: 30px;
    border: none;
    background-color: rgba(102, 199, 186);
    color: white;
    font-weight: 600;
    font-size: 16px;
    &:hover {
      -webkit-box-shadow: 0px 0px 3px 8px rgba(36, 174, 175, 0.61);
      box-shadow: 0px 0px 3px 8px rgba(36, 174, 175, 0.61);
      -webkit-transition: box-shadow 0.3s ease-in-out;
      transition: box-shadow 0.3s ease-in-out;
    }
  }
`;

type Errors = { message: string }[];

export default function Login(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>([]);
  const router = useRouter();
  return (
    <div css={backgroundImage}>
      <Layout>
        <Head>
          <title>Login</title>
          <meta name="description" content="Login here for this website" />
        </Head>
        <nav>
          <div css={navStyle}>
            <div css={bodyStyles}>
              <Link href="/">
                <a>FoodiesUnited</a>
              </Link>
            </div>
            <div css={bodyStyles}>
              <Link href="/createTour">
                <a>Create Tour</a>
              </Link>
              <Link href="/tours">
                <a>Tours</a>
              </Link>
              <Link href="/registration">
                <a>Register</a>
              </Link>
            </div>
          </div>
        </nav>
        <div>
          <div css={loginStyling}>
            <h1>Login</h1>
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
                props.refreshUserProfile();
                await router.push('/users/protected-user');
              }}
            >
              <div>
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
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Redirect from HTTP to HTTPs on Heroku
  if (
    context.req.headers.host &&
    context.req.headers['x-forwarded-proto'] &&
    context.req.headers['x-forwarded-proto'] !== 'https'
  ) {
    return {
      redirect: {
        destination: `https://${context.req.headers.host}/login`,
        permanent: true,
      },
    };
  }
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
