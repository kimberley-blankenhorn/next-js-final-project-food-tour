import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import {
  getUserByValidSessionToken,
  getUserById,
  User,
} from '../../util/database';

const backgroundImage = css`
  background-image: url('/images/viennaNight.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  object-fit: cover;
  height: 100vh;
  width: 100vw;
`;

const navStyle = css`
  display: flex;
  justify-content: space-between;
  height: 70px;
  background-color: rgb(203, 204, 204, 0.5);
  a {
    color: white;
    font-weight: 700;
    text-decoration: none;
    -webkit-transition: color 1s;
    transition: color 1s;
    margin: 0 20px;

    &:hover {
      color: rgba(102, 199, 186);
    }
  }
`;
const containerStyle = css`
  height: 65vh;
  width: 90vw;
  margin: 30px auto;
  padding-bottom: 20px;
  text-align: center;
  background-color: rgb(128, 128, 128, 0.7);
  border-radius: 20px;
  color: white;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 12px;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.9);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.9);
  }
`;

const favoriteStyle = css`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin: 30px auto;
  color: white;
  text-align: center;
  font-size: 23px;
  width: 20vw;
  height: 10vh;
  border-radius: 20px;
  background-color: rgb(128, 128, 128, 0.6);
`;

const bodyStyles = css`
  display: flex;
  align-items: center;
  margin-left: 10px;
  /* width: 100vw; */

  color: rgb(26, 19, 18);
`;

type Props = {
  userObject: { username: string };
  user: {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    occupation: string;
    age: number;
    about: string;
    image: string;
  };
};

export default function ProtectedUser(props: Props) {
  console.log(props.user.image);
  return (
    <div css={backgroundImage}>
      <div>
        <Head>
          <title>
            {props.user.firstName} {props.user.lastName}
          </title>
          <meta
            name="description"
            content={`Hello ${props.user.firstName} ${props.user.lastName}. Welcome to your profile page.`}
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <nav>
          <div css={navStyle}>
            <div css={bodyStyles}>
              <Link href="/">
                <a>FoodiesUnited</a>
              </Link>
            </div>

            <div css={bodyStyles}>
              <Layout userObject={props.userObject}>
                <Link href="/createTour">
                  <a>Create Tour</a>
                </Link>
                <Link href="/tours">
                  <a>Lists</a>
                </Link>

                <a href="/logout">Logout</a>
              </Layout>
            </div>
          </div>
        </nav>

        <section>
          <div>
            <div css={favoriteStyle}>
              <h1>Profile</h1>
            </div>

            <div css={containerStyle}>
              <div>
                <h2>Welcome {props.user.username}</h2>
              </div>
              <img
                src={props.user.image}
                alt="profile"
                height="130px"
                width="100px"
              />
              <div>
                <p>First Name: {props.user.firstName}</p>
                <p>Last Name: {props.user.lastName}</p>
                <p>Occupation: {props.user.occupation}</p>
                <p>Age: {props.user.age}</p>
                <p>email: {props.user.email}</p>
                <p>about: {props.user.about}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // 1. Get a user from the cookie sessionToken
  const token = context.req.cookies.sessionToken;
  const user = await getUserByValidSessionToken(token);

  // 2. If there is a user, return and render page
  if (user) {
    return {
      props: { user: user },
    };
  }
  // 3. Otherwise redirect to login
  return {
    redirect: {
      destination: `/login?returnTo=users/protected-user`,
      permanent: false,
    },
  };
}
