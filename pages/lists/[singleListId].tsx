import { css } from '@emotion/react';
import Head from 'next/head';
import Layout from '../../components/Layout';
import { GetServerSidePropsContext } from 'next';
import { getSingleTourByDescription } from '../../util/database';

const backgroundImage = css`
  background-image: url('/images/viennaPark.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  object-fit: cover;
  height: 100vh;
  width: 100vw;
`;

const containerStyle = css`
  display: flex;
  height: 75vh;
  width: 90vw;
  border-radius: 30px;
  margin: auto;
  padding-bottom: 20px;
  /* text-align: center; */
  background-color: rgb(128, 128, 128, 0.6);
  color: rgba(0, 0, 0, 0.7);
  overflow: auto;
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
  }
`;

const leftSection = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  border: solid 2px white;
  box-shadow: 9px 11px 21px -4px rgba(0, 0, 0, 0.66);
  border-radius: 25px;
  padding: 20px;
  width: 40vw;
  height: 50vh;
  background-color: rgba(227, 227, 227, 0.6);

  img {
    object-fit: contain;
    height: 20vh;
    width: 15vw;
    border-radius: 20px;
  }
  button {
    background-color: rgba(241, 161, 175, 0.6);
    height: 6vh;
    width: 12vw;
    border-radius: 30px;
    margin-top: 10px;
    color: rgb(56, 56, 53);
    font-weight: 700;
    font-size: 16px;
    border: solid 1px white;
    &:hover {
      -webkit-box-shadow: 0px 0px 3px 8px rgba(220, 231, 231, 0.81);
      box-shadow: 0px 0px 3px 6px rgba(235, 229, 234, 0.81);
      -webkit-transition: box-shadow 0.3s ease-in-out;
      transition: box-shadow 0.3s ease-in-out;
    }
  }
`;
const listCardsStyle = css`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border: solid 2px white;
  border-radius: 25px;
  margin: auto;
  height: 10vh;
  background-color: rgba(91, 87, 87, 0.6);
  box-shadow: 9px 11px 21px -4px rgba(0, 0, 0, 0.66);
  color: #efe8ec;
  a {
    color: #efe8ec;
  }
`;
const restaurantSectionStyle = css`
  display: flex;
  flex-direction: column;
  margin: auto;
  justify-content: space-evenly;
  border: solid 2px white;
  box-shadow: 9px 11px 21px -4px rgba(0, 0, 0, 0.66);
  border-radius: 25px;
  padding: 20px;
  width: 40vw;
  height: 50vh;
  overflow: auto;
  background-color: rgba(227, 227, 227, 0.6);

  p {
    padding: 20px;
  }
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
`;

type Props = {
  userObject: { username: string };
  getSingleTourFromUser: [
    {
      name: string;
      type: string;
      username: string;
      image: string;
      description: string;
      url: string;
    },
  ];
};

export default function SingleTour(props: Props) {
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
          <div css={leftSection}>
            <h1>{props.getSingleTourFromUser[0].username}'s Favorite</h1>
            <h2>{props.getSingleTourFromUser[0].description}</h2>

            <img src={props.getSingleTourFromUser[0].image} alt="profile" />
            <div>
              <button>Add list to favorites</button>
            </div>
          </div>
          <div css={restaurantSectionStyle}>
            {props.getSingleTourFromUser.map((singleList: any) => {
              return (
                <div key={`${Math.random()}-${singleList.id}`}>
                  <div css={listCardsStyle}>
                    <h3>{singleList.name}</h3>

                    <p>{singleList.type}</p>

                    <a href={singleList.url}>{singleList.url}</a>
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
  // const getAllListsFromUsers = await getAllUsersLists();
  console.log('checking which Id is passed', context.query.singleListId);

  const userId = context.query.singleListId;

  console.log(userId);
  const getSingleTourFromUser = await getSingleTourByDescription(
    Number(userId),
  );
  console.log('showing single tour', getSingleTourFromUser);

  return {
    props: {
      // getAllListsFromUsers: getAllListsFromUsers,
      getSingleTourFromUser: getSingleTourFromUser,
    },
  };
}
