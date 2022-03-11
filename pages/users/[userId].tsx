import { css } from '@emotion/react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { getUserById, User } from '../../util/database';

const backgroundImage = css`
  background-image: url('/images/viennaNight.jpg');
  background-position: center;
  background-repeat: no-repeat;
  object-fit: contain;
  height: 100vh;
  width: 100vw;
`;

const navStyle = css`
  display: flex;
  justify-content: space-between;
  background-color: rgb(203, 204, 204, 0.7);
  a {
    color: rgb(26, 19, 18);
    font-weight: 700;
    text-decoration: none;
  }
  a + a {
    margin: 0 20px;
    padding: 20px 0;
  }
`;
const containerStyle = css`
  height: 89vh;
  width: 90vw;
  border: solid red 1px;
  margin: auto;
  padding-bottom: 20px;
  text-align: center;
  color: white;
  /* button {
    margin-top: 50px;
    height: 50px;
    width: 200px;
  } */
`;

const bodyStyles = css`
  display: flex;
  align-items: center;
  margin-left: 10px;
  /* width: 100vw; */
  border: solid red 1px;
  color: rgb(26, 19, 18);
`;

type Props = {
  user?: User;
};

export default function UserDetails(props: Props) {
  if (!props.user) {
    return (
      <div>
        <Head>
          <title>User not found</title>
          <meta name="description" content="User not found" />
        </Head>
        <h1>User not found</h1>
      </div>
    );
  }
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
              <Link href="/createTour">
                <a>Create Tour</a>
              </Link>
              <Link href="/tours">
                <a>Tours</a>
              </Link>
              <Link href="/logout">
                <a>Logout</a>
              </Link>
            </div>
          </div>
        </nav>
        <section css={containerStyle}>
          <h1>Welcome {props.user.username}</h1>
          <div>
            Hello {props.user.firstName} {props.user.lastName}
          </div>
          <h2>Favorites</h2>
        </section>
      </div>
    </div>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<{ user?: User }>> {
  const userId = context.query.userId;
  if (!userId || Array.isArray(userId)) {
    return { props: {} };
  }
  const user = await getUserById(parseInt(userId));

  if (!user) {
    context.res.statusCode = 404;
    return {
      props: {},
    };
  }

  return {
    props: {
      user: user,
    },
  };
}
