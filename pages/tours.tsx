import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import { GetServerSidePropsContext } from 'next';
import {
  GetAllUsersLists,
  getAllUsersLists,
  getUserByValidSessionToken,
} from '../util/database';
import Image from 'next/image';

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
const listStyles = css`
  /* display: flex;
  flex-direction: row; */
  display: inline-block;
  border-radius: 5px;
  border: 1px solid #f3f7f2;
  border-radius: 30px;
  padding: 15px;
  margin: 20px 30px;
  width: 200px;
  height: 300px;
  background-color: rgb(91, 89, 89, 0.8);
  /* opacity: 0.5; */

  cursor: pointer;
  a {
    text-decoration: none;
    text-align: center;
    /* margin-left: 55px; */
    color: rgb(11, 3, 0);
    font-size: 25px;
    &:hover {
      color: #b76742;
      transition: color 0.5s ease-in-out;
      text-decoration: underline;
    }
  }
  &:hover {
    box-shadow: 0px 0px 9px 7px #d5c5b2;

    transition: 0.6s ease-in-out;
  }
  img {
    border-radius: 20px;
  }
  button {
    margin: 5px 20px;
    height: 5vh;
    width: 10vw;
    border-radius: 30px;
    border: none;
    background-color: rgba(102, 199, 186);
    font-size: 14px;
    font-weight: 700;
    color: white;

    &:hover {
      -webkit-box-shadow: 0px 0px 3px 8px rgba(220, 231, 231, 0.81);
      box-shadow: 0px 0px 3px 8px rgba(199, 221, 221, 0.81);
      -webkit-transition: box-shadow 0.3s ease-in-out;
      transition: box-shadow 0.3s ease-in-out;
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
const listCardsStyle = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;

  margin: 40px;
  border: solid 1px green;
`;

type Props = {
  userObject: { username: string };
  getAllListsFromUsers: GetAllUsersLists[];
};

export default function Tours(props: Props) {
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
        <div css={containerStyle}>
          <h1>Recommendation Lists</h1>
          <div css={listCardsStyle}>
            {props.getAllListsFromUsers.map((listAll) => {
              return (
                <div key={`listAll-${listAll.id}`}>
                  <div css={listStyles}>
                    <img
                      src={listAll.image}
                      alt="profile"
                      height="130px"
                      width="100px"
                    />
                    <p>{listAll.username}'s favorite</p>
                    <p>{listAll.description}</p>
                    <Link href={`/lists/${listAll.id}`}>
                      <a>
                        <button>To Tour</button>
                      </a>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const getAllListsFromUsers = await getAllUsersLists();

  return {
    props: {
      getAllListsFromUsers: getAllListsFromUsers,
    },
  };
}
