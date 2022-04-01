import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Layout from '../components/Layout';
import {
  createSuggestionList,
  createSuggestionListWithRestaurants,
  deleteSessionsByToken,
  getAllRestaurants,
  getAllSuggestionListDescriptions,
  getRestaurantById,
  getSuggestionListWithRestaurantsListId,
  getUserByValidSessionToken,
  getValidSessionsByToken,
  ListWithRestaurants,
  Restaurant,
  SuggestionList,
  User,
} from '../util/database';
import { CreateCompleteListResponseBody } from './api/createList';
import { CreateRestaurantResponseBody } from './api/restaurant';
import { CreateSuggestionListDescriptionResponseBody } from './api/tourDescription';

const backgroundImage = css`
  background-image: url('/images/opera.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100vw;
`;

const navStyle = css`
  display: flex;
  justify-content: space-between;
  height: 70px;
  background-color: rgb(203, 204, 204, 0.3);
  margin-bottom: 50px;
  a {
    color: white;
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
  color: rgb(26, 19, 18);
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
    font-size: 28px;
    line-height: 28px;
    text-align: center;
  }
`;
const mainHeaderStyle = css`
  display: flex;
  justify-content: center;

  /* width: 90vw; */
  /* width: 100vw; */
`;

const displayFormStyle = css`
  display: flex;
  justify-content: center;
  margin: auto;
`;

const rightFormStyle = css`
  display: flex;
  /* flex-direction: column; */
  align-content: flex-start;
  margin: 0 auto;
  border: solid 1px red;
`;

const leftFormStyle = css`
  display: flex;
  flex-direction: column;
  margin-left: auto;

  border: solid 1px red;
`;
const restaurantInputStyle = css`
  display: flex;
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
    }
    select {
      width: 18vw;
      height: 4vh;
      border-radius: 30px;
      margin: 10px 0;
    }
  }
`;

const buttonSectionStyle = css`
  display: flex;
  justify-content: flex-start;

  button {
    margin: 5px 20px;
    height: 3vh;
    width: 8vw;
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
// const listNameStyle = css`
//   margin-left: 10px;
// `;

const errorStyle = css`
  height: 90vh;
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
  a {
    color: white;
    font-weight: 700;
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

type Props =
  | {
      userObject: { username: string };
      restaurant: Restaurant;
      getAllRestaurantNames: Restaurant[];
      listWithRestaurants: ListWithRestaurants;
      suggestionListRestaurantsId: { id: number }[];
      getAllLists: { id: number; description: string; userId: string }[];
      getAllRestaurants: [
        {
          id: number;
          name: string;
          address: string;
          type: string;
          url: string;
        },
      ];
    }
  | {
      error: string;
    };

export default function CreateTour(props: Props) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [type, setType] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  // const [restaurantNew, setRestaurantNew] = useState('');
  const [selectedDescription, setSelectedDescription] = useState<number>(0);
  const [selectedRestaurant, setSelectedRestaurant] = useState<number>(0);
  const [restaurantNames, setRestaurantNames] = useState(
    props.getAllRestaurantNames,
  );
  const [listDescriptions, setListDescriptions] = useState(props.getAllLists);
  const [suggestionListDescription, setSuggestionListDescription] =
    useState('');
  const [list, setList] = useState([]);
  // console.log('checking the list', list);
  // console.log('you selected...', suggestionListDescription);

  if ('error' in props) {
    console.log(props.error);
    return (
      <div css={backgroundImage}>
        <div>
          <Head>
            <title>FoodiesUnited - A Restaurant Sharing Website</title>
            <meta
              name="Create recommendation list"
              content="Here you can create your own recommendation list."
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
                <Layout>
                  <Link href="/tours">
                    <a>Restaurant Lists</a>
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
                  <a>Restaurant Lists</a>
                </Link>
                <Link href="/users/protected-user">
                  <a>Profile</a>
                </Link>

                <a href="/logout">Logout</a>
              </Layout>
            </div>
          </div>
        </nav>
        <section css={containerStyle}>
          <div>
            <div css={mainHeaderStyle}>
              <h1>Create your own suggestion list</h1>
            </div>
            <div css={displayFormStyle}>
              <div css={leftFormStyle}>
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
              </div>

              <div css={rightFormStyle}>
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
                            key={`single-${singleList.id}`}
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
                            key={`single-${singleRestaurant.id}`}
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
                          key={`single-${singleList.id}`}
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
                        let checkingResults;

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
                      select
                    </button>
                  </div>
                  <div>
                    List:
                    {list.map((listItem) => (
                      <p key={`${Math.random()}-${listItem.name}`}>
                        {listItem.name}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <table>
            <tbody>
              <tr>
                <th />
                <th>Restaurant Name</th>
                <th>Cuisine type</th>
                <th>URL</th>
              </tr>

              {getAllListsWithRestaurants.map((item) => (
                <tr key={item.id}>
                  <td>{item.description}</td>
                  <td>{item.name}</td>

                  <td>
                    <div>
                      <button
                      // type="button"
                      // aria-label="Remove restaurant"
                      // onClick={() => handleDelete(item.id)}
                      // id="delete"
                      >
                        Remove restaurant
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> */}
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
