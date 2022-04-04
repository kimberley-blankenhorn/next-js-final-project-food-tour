import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Layout from '../components/Layout';
import {
  getAllRestaurants,
  getAllSuggestionListDescriptions,
  getUserByValidSessionToken,
  Restaurant,
  SuggestionList,
} from '../util/database';
import { CreateCompleteListResponseBody } from './api/createList';
import { SingleList } from './api/displayList';
import { CreateRestaurantResponseBody } from './api/restaurant';
import { CreateSuggestionListDescriptionResponseBody } from './api/tourDescription';

const backgroundImage = css`
  background-image: url('/images/opera.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100vw;
`;

const containerStyle = css`
  /* display: flex; */
  height: 78vh;
  width: 95vw;
  border-radius: 30px;
  margin: 0 auto;
  padding-bottom: 20px;
  background-color: rgb(128, 128, 128, 0.8);
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
    line-height: 28px;
    text-align: center;
  }
`;
const mainHeaderStyle = css`
  display: flex;
  justify-content: center;
  font-size: 28px;
`;

// FORM SECTION:

const displayFormStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
`;

const formStyle = css`
  /* margin: 10px; */
  label {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 18vw;
    font-size: 16px;
    font-weight: 700;
    margin-right: 5px;

    input {
      width: 17vw;
      height: 23px;
      margin: 10px 10px;
      border-radius: 15px;
      border: none;
      overflow: hidden;
      font-size: 14px;
      box-shadow: 9px 11px 21px -4px rgba(0, 0, 0, 0.66);
    }
    select {
      width: 18vw;
      height: 4vh;
      border-radius: 30px;
      margin: 10px 0;
      box-shadow: 9px 11px 21px -4px rgba(0, 0, 0, 0.66);
    }
  }
`;

const topFormStyle = css`
  display: flex;
  justify-content: space-evenly;
`;

const bottomFormStyle = css`
  display: flex;
  justify-content: space-evenly;
  margin-top: 50px;
`;

const restaurantInputStyle = css`
  display: flex;
`;

const buttonSectionStyle = css`
  display: flex;
  justify-content: center;

  button {
    margin: 5px 20px;
    height: 4vh;
    width: 8vw;
    border-radius: 30px;
    background-color: rgba(102, 199, 186);
    box-shadow: 9px 11px 21px -4px rgba(0, 0, 0, 0.66);
    &:hover {
      -webkit-box-shadow: 0px 0px 3px 8px rgba(220, 231, 231, 0.81);
      box-shadow: 0px 0px 3px 8px rgba(199, 221, 221, 0.81);
      -webkit-transition: box-shadow 0.3s ease-in-out;
      transition: box-shadow 0.3s ease-in-out;
    }
  }
`;

const displayListStyle = css`
  background-color: rgba(86, 86, 83, 0.7);
  border: solid 2px white;
  width: 30vw;
  text-align: center;
  border-radius: 30px;
  box-shadow: 9px 11px 21px -4px rgba(0, 0, 0, 0.66);
`;

const errorStyle = css`
  height: 70vh;
  width: 70vw;
  border-radius: 30px;
  margin: auto;
  padding-bottom: 20px;
  background-color: rgb(128, 128, 128, 0.8);
  color: white;
  text-align: center;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  box-shadow: 9px 11px 21px -4px rgba(0, 0, 0, 0.66);
  a {
    color: white;
    font-weight: 700;
    font-size: 20px;
    text-decoration: none;
    -webkit-transition: color 1s;
    transition: color 0.5s;
    margin: 0 20px;

    &:hover {
      color: rgba(102, 199, 186);
      text-decoration: underline;
    }
  }
  h1 {
    font-size: 35px;
    color: orange;
  }
`;
const backButtonSection = css`
  display: flex;
  justify-content: center;
  align-content: center;
  button {
    margin: 5px 20px;
    height: 4vh;
    width: 8vw;
    border-radius: 30px;
    background-color: rgba(241, 197, 113, 0.9);
    box-shadow: 9px 11px 21px -4px rgba(0, 0, 0, 0.66);
    &:hover {
      -webkit-box-shadow: 0px 0px 3px 8px rgba(220, 231, 231, 0.81);
      box-shadow: 0px 0px 3px 8px rgba(199, 221, 221, 0.81);
      -webkit-transition: box-shadow 0.3s ease-in-out;
      transition: box-shadow 0.3s ease-in-out;
    }
  }
`;

type Props = {
  userId: number;
  userObject: { username: string };
  getAllRestaurantNames: Restaurant[];
  error?: string;
  getAllLists: { id: number; description: string; userId: string }[];
};

export default function CreateTour(props: Props) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [type, setType] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDescription, setSelectedDescription] = useState<number>(0);
  const [selectedRestaurant, setSelectedRestaurant] = useState<number>(0);
  const [restaurantNames, setRestaurantNames] = useState(
    props.getAllRestaurantNames,
  );
  const [listDescriptions, setListDescriptions] = useState(props.getAllLists);
  const [suggestionListDescription, setSuggestionListDescription] =
    useState('');
  const [list, setList] = useState<SingleList[]>([]);

  if ('error' in props) {
    console.log(props.error);
    return (
      <div css={backgroundImage}>
        <div>
          <Layout />
          <Head>
            <title>FoodiesUnited - A Restaurant Sharing Website</title>
            <meta
              name="Create recommendation list"
              content="Here you can create your own recommendation list."
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <section css={errorStyle}>
            <div>
              <div>
                {props.error}
                <h1>Oops! You need to be logged in first!</h1>
                <h2>Once you are logged in, you can create a list.</h2>
              </div>
              <div>
                <Link href="/login">
                  <a>Login</a>
                </Link>
                <Link href="/registration">
                  <a>Register</a>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
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

        <section css={containerStyle}>
          <div>
            <div css={mainHeaderStyle}>
              <h1>Create your own suggestion list</h1>
            </div>
            <div css={displayFormStyle}>
              <div css={topFormStyle}>
                <form
                  css={formStyle}
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const createSuggestionListDescriptionResponse = await fetch(
                      '/api/tourDescription',
                      {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          userId: props.userId,
                          description: description,
                        }),
                      },
                    );

                    const createSuggestionListDescriptionResponseBody =
                      (await createSuggestionListDescriptionResponse.json()) as CreateSuggestionListDescriptionResponseBody;
                    console.log(createSuggestionListDescriptionResponseBody);
                    if (
                      'errors' in createSuggestionListDescriptionResponseBody
                    ) {
                      console.log(
                        createSuggestionListDescriptionResponseBody.errors,
                      );
                      return;
                    }
                    const newSuggestionListDescriptionArray = [
                      ...listDescriptions,
                      createSuggestionListDescriptionResponseBody.suggestionList,
                    ];
                    setListDescriptions(newSuggestionListDescriptionArray);
                    setDescription('');
                  }}
                >
                  <h2>Add a description:</h2>
                  <div>
                    <label>
                      description
                      <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </label>
                  </div>
                  <div css={buttonSectionStyle}>
                    <button>Submit</button>
                  </div>
                </form>

                <form
                  css={formStyle}
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const createRestaurantResponse = await fetch(
                      '/api/restaurant',
                      {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          name: name,
                          address: address,
                          type: type,
                          url: url,
                        }),
                      },
                    );

                    const createRestaurantResponseBody =
                      (await createRestaurantResponse.json()) as CreateRestaurantResponseBody;
                    console.log(createRestaurantResponseBody);
                    if ('errors' in createRestaurantResponseBody) {
                      console.log(createRestaurantResponseBody.errors);
                      return;
                    }
                    const newRestaurantArray = [
                      ...restaurantNames,
                      createRestaurantResponseBody.restaurant,
                    ];
                    setRestaurantNames(newRestaurantArray);
                    setName('');
                    setAddress('');
                    setType('');
                    setUrl('');
                  }}
                >
                  <h2>Add Restaurants:</h2>
                  <div css={restaurantInputStyle}>
                    <div>
                      <label>
                        Name
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </label>
                    </div>
                    <div>
                      <label>
                        Address
                        <input
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </label>
                    </div>
                  </div>
                  <div css={restaurantInputStyle}>
                    <div>
                      <label>
                        Cuisine
                        <input
                          value={type}
                          onChange={(e) => setType(e.target.value)}
                        />
                      </label>
                    </div>
                    <div>
                      <label>
                        url
                        <input
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                        />
                      </label>
                    </div>
                  </div>
                  <div css={buttonSectionStyle}>
                    <button>Add</button>
                  </div>
                </form>

                <form
                  css={formStyle}
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const createSuggestionListDescriptionResponse = await fetch(
                      '/api/createList',
                      {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          suggestionListId: selectedDescription,
                          restaurantId: selectedRestaurant,
                        }),
                      },
                    );

                    const createCompleteListResponseBody =
                      (await createSuggestionListDescriptionResponse.json()) as CreateCompleteListResponseBody;
                    console.log(createCompleteListResponseBody);
                  }}
                >
                  <h2>Select List</h2>
                  <div>
                    <label>
                      Choose your list you want to add to:
                      <select
                        onChange={(e) =>
                          setSelectedDescription(
                            parseInt(e.currentTarget.value),
                          )
                        }
                      >
                        <option key="template-1" value={0}>
                          Select List
                        </option>
                        {listDescriptions.map((singleList: SuggestionList) => (
                          <option
                            key={`$Math.random()-${singleList.id}`}
                            value={singleList.id}
                          >
                            {singleList.description}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <div>
                    <label>
                      Select Restaurant to add to list:
                      <select
                        onChange={(e) =>
                          setSelectedRestaurant(parseInt(e.currentTarget.value))
                        }
                      >
                        <option key="template-2" value={0}>
                          Select Restaurant
                        </option>
                        {restaurantNames.map((singleRestaurant: Restaurant) => (
                          <option
                            key={`$Math.random()-${singleRestaurant.id}`}
                            value={singleRestaurant.id}
                          >
                            {singleRestaurant.name}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <div css={buttonSectionStyle}>
                    <button>Submit</button>
                  </div>
                </form>
              </div>
              <div css={bottomFormStyle}>
                <div css={formStyle}>
                  <label>
                    Choose the list you want to show:
                    <select
                      onChange={(e) => {
                        setSuggestionListDescription(e.currentTarget.value);
                      }}
                    >
                      <option key="template-4" value={0}>
                        Select List
                      </option>
                      {listDescriptions.map((singleList: SuggestionList) => (
                        <option
                          key={`${Math.random()}-${singleList.id}`}
                          value={singleList.description}
                        >
                          {singleList.description}
                        </option>
                      ))}
                    </select>
                  </label>
                  <div css={buttonSectionStyle}>
                    <button
                      onClick={async () => {
                        const requestResponse = await fetch(
                          `/api/displayList?selectedItem=${suggestionListDescription}`,
                          {
                            method: 'GET',
                          },
                        );
                        const listData = await requestResponse.json();
                        console.log('requesting the list', listData.list);
                        setList(listData.list);

                        return listData.list;
                      }}
                    >
                      Select
                    </button>
                  </div>
                  <div css={backButtonSection}>
                    <Link href="/tours">
                      <a>
                        <button>Back to Lists</button>
                      </a>
                    </Link>
                  </div>
                </div>
                <div css={displayListStyle}>
                  <h2>List:</h2>
                  <hr />
                  {list.map((listItem) => (
                    <div key={`${Math.random()}-${listItem.name}`}>
                      <p>{listItem.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const getAllLists = await getAllSuggestionListDescriptions();
  const getAllRestaurantNames = await getAllRestaurants();
  const sessionToken = context.req.cookies.sessionToken;
  const session = await getUserByValidSessionToken(sessionToken);
  console.log('context query', context.query);
  console.log('get all the restaurant names', getAllRestaurantNames);

  if (!session) {
    return {
      props: {
        error: 'You need to log in first',
      },
    };
  }

  return {
    props: {
      userId: session.id,
      getAllLists: getAllLists,
      getAllRestaurantNames: getAllRestaurantNames,
    },
  };
}
