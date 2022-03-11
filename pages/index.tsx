import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';

const backgroundImage = css`
  background-image: url('/images/sachertorte.jpg');
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
`;
const navStyle = css`
  display: flex;
  justify-content: space-between;
  a {
    color: rgb(26, 19, 18);
  }
  a + a {
    margin: 0 20px;
  }
`;

const bodyStyles = css`
  display: flex;
  align-items: center;
  margin-left: 10px;
  /* width: 100vw; */
  border: solid red 1px;
  color: rgb(26, 19, 18);
`;

// const inputStyles = css`
//   width: 200px;
//   height: 25px;
//   margin: 0 15px;
//   display: flex;
//   border-radius: 30px;
//   text-align: center;
// `;

const landingPageTextStyle = css`
  width: 100vw;
  height: 93vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const viewToursStyle = css`
  display: flex;
  flex-direction: column;
  width: 50vw;
  color: white;
  justify-content: center;

  text-align: center;
  padding-bottom: 30px;
  h1 {
    font-size: 50px;
    font-weight: 600;
  }
  h2 {
  }
  button {
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    height: 40px;
    width: 200px;
    border-radius: 30px;
    font-size: 20px;
    background-color: #66c6ba;
    color: #373843;
  }
`;

export default function Home() {
  return (
    <div css={backgroundImage}>
      <div>
        <Head>
          <title>FoodiesUnited - A Restaurant Sharing Website</title>
          <meta
            name="description"
            content="Get restaurant recommendations in Vienna from fellow Viennese residents and visitors"
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
              <Link href="/login">
                <a>Login</a>
              </Link>
              <Link href="/registration">
                <a>Register</a>
              </Link>
            </div>
          </div>
        </nav>
        <div css={landingPageTextStyle}>
          <div css={viewToursStyle}>
            <h1>Explore food around Vienna with suggestions from locals</h1>
            <Link href="/tours">
              <button>View Tours</button>
            </Link>
          </div>
          <div css={viewToursStyle}>
            <h2>Not a member yet? Register for free!</h2>
            <Link href="/registration">
              <button>Register</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
