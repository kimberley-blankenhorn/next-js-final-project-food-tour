import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';

const backgroundImage = css`
  background-image: url('/images/sachertorte.jpg');
  object-fit: cover;
  width: 100vw;
  height: 100vh;
`;

const landingPageTextStyle = css`
  margin-top: 150px;
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
    font-family: 'Dancing Script', cursive;
  }
  a {
    text-decoration: none;
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
      font-weight: 700;
      box-shadow: 9px 11px 21px -4px rgba(0, 0, 0, 0.66);
      &:hover {
        -webkit-box-shadow: 0px 0px 3px 8px rgba(36, 174, 175, 0.61);
        box-shadow: 0px 0px 3px 8px rgba(36, 174, 175, 0.61);
        -webkit-transition: box-shadow 0.3s ease-in-out;
        transition: box-shadow 0.3s ease-in-out;
      }
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
        <Layout userObject={props.userObject} />
        <Head>
          <title>FoodiesUnited - A Restaurant Sharing Website</title>
          <meta
            name="description"
            content="Get restaurant recommendations in Vienna from fellow Viennese residents and visitors"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div css={landingPageTextStyle}>
          <div css={viewToursStyle}>
            <h1>Explore food around Vienna with suggestions from locals</h1>
            <Link href="/tours">
              <a>
                <button>View Tours</button>
              </a>
            </Link>
          </div>
          <div css={viewToursStyle}>
            <h2>Not a member yet? Register for free!</h2>
            <Link href="/registration">
              <a>
                <button>Register</button>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
