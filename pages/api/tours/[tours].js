import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';

const backgroundImage = css`
  background-image: url('/images/ferris-wheel.jpg');
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
`;

const bodyStyles = css`
  display: flex;
  align-items: center;
  margin-left: 10px;
  /* width: 100vw; */
  border: solid red 1px;
  color: rgb(26, 19, 18);
`;

export default function SingleTour() {
  return (
    <div css={backgroundImage}>
      <div>
        <Head>
          <title>FoodiesUnited - A Restaurant Sharing Website</title>
          <meta name="description" content="Individual tour page" />
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
              <Link href="/tours">
                <a>Profile</a>
              </Link>
              <Link href="/">
                <a>Logout</a>
              </Link>
            </div>
          </div>
        </nav>
        <section css={containerStyle}>
          <h1>individual tour</h1>
        </section>
      </div>
    </div>
  );
}
