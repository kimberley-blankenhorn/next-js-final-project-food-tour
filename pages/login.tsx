import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
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

const loginStyling = css`
  display: flex;
  flex-direction: column;
  margin: 50px auto;
  height: 70vh;
  width: 60vw;
  justify-content: center;
  align-items: center;
  align-content: center;
  box-shadow: 9px 11px 21px -4px rgba(0, 0, 0, 0.66);
  background-color: rgb(128, 128, 128, 0.7);
  color: white;
  border-radius: 30px;
  h1 {
    padding-top: 20px;
    font-size: 32px;
  }

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
    background-color: rgba(102, 199, 186);
    font-weight: 600;
    font-size: 16px;
    border: solid 1px white;
    box-shadow: 9px 11px 21px -4px rgba(0, 0, 0, 0.66);
    &:hover {
      -webkit-box-shadow: 0px 0px 3px 8px rgba(218, 238, 238, 0.61);
      box-shadow: 0px 0px 3px 8px rgba(208, 224, 224, 0.61);
      -webkit-transition: box-shadow 0.3s ease-in-out;
      transition: box-shadow 0.3s ease-in-out;
    }
  }
`;

type Errors = { message: string }[];
type Props = {
  userObject: { username: string };
  refreshUserProfile: () => void;
  // cloudinaryAPI: string;
};

export default function Login(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>([]);
  const router = useRouter();
  return (
    <div css={backgroundImage}>
      <Layout userObject={props.userObject} />
      <Head>
        <title>Login</title>
        <meta name="description" content="Login here for this website" />
      </Head>

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
