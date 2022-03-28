import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';

const backgroundImage = css`
  background-image: url('/images/sachertorte.jpg');
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
`;
const navStyle = css`
  display: flex;
  justify-content: space-between;
  height: 70px;
  background-color: rgb(203, 204, 204, 0.3);
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

const bodyStyles = css`
  display: flex;
  align-items: center;
  margin-left: 10px;
  /* width: 100vw; */
  color: rgb(26, 19, 18);
`;

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
    font-size: 18px;
    background-color: #66c6ba;
    color: white;
    font-weight: 700;
    border: none;
    &:hover {
      -webkit-box-shadow: 0px 0px 3px 8px rgba(36, 174, 175, 0.61);
      box-shadow: 0px 0px 3px 8px rgba(36, 174, 175, 0.61);
      -webkit-transition: box-shadow 0.3s ease-in-out;
      transition: box-shadow 0.3s ease-in-out;
    }
  }
`;

type Props = {
  userObject: { username: string };
};

export default function Home(props: Props) {
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
              <Layout userObject={props.userObject}>
                <Link href="/tours">
                  <a>Tours</a>
                </Link>

                <Link href="/login">
                  <a>Login</a>
                </Link>
                <Link href="/registration">
                  <a>Register</a>
                </Link>
              </Layout>
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
