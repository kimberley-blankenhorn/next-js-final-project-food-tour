import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import { GetAllUsersLists, getAllUsersLists } from '../util/database';

const backgroundImage = css`
  background-image: url('/images/ferris-wheel.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  object-fit: cover;
  height: 100vh;
  width: 100vw;
`;

const containerStyle = css`
  height: 75vh;
  width: 90vw;
  border-radius: 30px;
  margin: auto;
  padding-bottom: 20px;
  text-align: center;
  background-color: rgb(128, 128, 128, 0.9);
  color: white;
  overflow: auto;
  box-shadow: 9px 11px 21px -4px rgba(0, 0, 0, 0.66);
  ::-webkit-scrollbar {
    width: 12px;
  }
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.9);
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.9);
  }
  h1 {
    font-size: 35px;
    color: #f7fcfc;
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
  background-color: rgb(91, 89, 89, 0.6);
  box-shadow: 9px 11px 21px -4px rgba(0, 0, 0, 0.66);
  /* opacity: 0.5; */

  cursor: pointer;
  a {
    text-decoration: none;
    text-align: center;
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
    object-fit: cover;
    height: 130px;
    width: 100px;
  }
  button {
    margin: 5px 20px;
    height: 5vh;
    width: 10vw;
    border-radius: 30px;
    background-color: rgba(102, 199, 186);
    font-size: 14px;
    font-weight: 700;
    box-shadow: 9px 11px 21px -4px rgba(0, 0, 0, 0.66);

    &:hover {
      -webkit-box-shadow: 0px 0px 3px 8px rgba(220, 231, 231, 0.81);
      box-shadow: 0px 0px 3px 8px rgba(199, 221, 221, 0.81);
      -webkit-transition: box-shadow 0.3s ease-in-out;
      transition: box-shadow 0.3s ease-in-out;
    }
  }
`;

const listCardsStyle = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin: 40px;
`;

type Props = {
  userObject: { username: string };
  getAllListsFromUsers: GetAllUsersLists[];
};

export default function Tours(props: Props) {
  return (
    <div css={backgroundImage}>
      <div>
        <Layout userObject={props.userObject} />
        <Head>
          <title>FoodiesUnited - A Restaurant Sharing Website</title>
          <meta
            name="description"
            content="Register for this website on this page"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div css={containerStyle}>
          <h1>Recommendation Lists</h1>
          <div css={listCardsStyle}>
            {props.getAllListsFromUsers.map((listAll) => {
              console.log('check the id', listAll.username, listAll.id);
              return (
                <div key={`Math.random()-${listAll.id}`}>
                  <div css={listStyles}>
                    <img src={listAll.image} alt="profile" />
                    <p>{listAll.username}'s favorite</p>
                    <p>{listAll.description}</p>
                    <Link href={`/lists/${listAll.id}`}>
                      <a>
                        <div>
                          <button>To {listAll.username}'s List</button>
                        </div>
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

export async function getServerSideProps() {
  const getAllListsFromUsers = await getAllUsersLists();
  console.log('looking for id', getAllUsersLists);

  return {
    props: {
      getAllListsFromUsers: getAllListsFromUsers,
    },
  };
}
