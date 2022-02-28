import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';

const bodyStyles = css`
  display: flex;
`;
const backgroundImage = css`
  background-image: url('/images/sachertorte.jpg');
`;

const inputStyles = css`
  width: 30px;
  height: 10px;
  display: flex;
`;
export default function Home() {
  return (
    <div css={bodyStyles}>
      <div css={backgroundImage}>
        <Head>
          <title>FoodiesUnited - A Restaurant Sharing Website</title>
          <meta
            name="description"
            content="Get restaurant recommendations in Vienna from fellow Viennese residents and visitors"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div>
          <Link href="/">
            <a>FoodiesUnited</a>
          </Link>
        </div>
        <div>
          <label>
            <p>Email:</p>
          </label>
          <input
            css={inputStyles}
            id="email"
            name="email"
            placeholder="email"
          />
        </div>
        <div>
          <label>
            <p>Email:</p>
          </label>
          <input
            css={inputStyles}
            id="password"
            name="password"
            placeholder="password"
          />
        </div>
      </div>
    </div>
  );
}
