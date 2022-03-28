import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';

const backgroundImage = css`
  background-image: url('/images/ferris-wheel.jpg');
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
  background-color: rgb(203, 204, 204, 0.9);
  margin-bottom: 50px;
  a {
    color: black;
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
const containerStyle = css`
  height: 75vh;
  width: 90vw;
  border-radius: 30px;
  margin: auto;
  padding-bottom: 20px;
  text-align: center;
  background-color: rgb(128, 128, 128, 0.5);
  color: white;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 12px;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.9);
  }
  h1 {
    font-size: 35px;
  }
`;

const bodyStyles = css`
  display: flex;
  align-items: center;
  margin-left: 10px;
  /* width: 100vw; */
  color: rgb(26, 19, 18);
`;

export default function Tours(props) {
  return (
    <div css={backgroundImage}>
      <div>
        <Head>
          <title>FoodiesUnited - A Restaurant Sharing Website</title>
          <meta
            name="description"
            content="Register for this website on this page"
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
                  <a>Create List</a>
                </Link>
                <Link href="/tours">
                  <a>Lists</a>
                </Link>
                <Link href="/users/protected-user">
                  <a>Profile</a>
                </Link>
                <Link href="/login">
                  <a>Login</a>
                </Link>
              </Layout>
            </div>
          </div>
        </nav>
        <section css={containerStyle}>
          <h1>Recommendation Lists</h1>
        </section>
      </div>
    </div>
  );
}
