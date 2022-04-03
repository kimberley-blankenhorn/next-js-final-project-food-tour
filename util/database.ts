import camelcaseKeys from 'camelcase-keys';
import { config } from 'dotenv-safe';
import postgres from 'postgres';
import setPostgresDefaultsOnHeroku from './setPostgresDefaultsOnHeroku';

setPostgresDefaultsOnHeroku();

config();

// Type needed for the connection function below
declare module globalThis {
  let postgresSqlClient: ReturnType<typeof postgres> | undefined;
}

// Connect only once to the database
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
function connectOneTimeToDatabase() {
  let sql;

  if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL) {
    sql = postgres();
    // Heroku needs SSL connections but
    // has an "unauthorized" certificate
    // https://devcenter.heroku.com/changelog-items/852
    sql = postgres({ ssl: { rejectUnauthorized: false } });
  } else {
    if (!globalThis.postgresSqlClient) {
      globalThis.postgresSqlClient = postgres();
    }
    sql = globalThis.postgresSqlClient;
  }
  return sql;
}
// CONNECT TO POSTGRESQL
const sql = connectOneTimeToDatabase();

export async function readUsers() {
  const users = await sql`
SELECT * FROM users
`;
  return users;
}

// module.exports = function setPostgresDefaultsOnHeroku() {
//   if (process.env.DATABASE_URL) {
//     const { parse } = require('pg-connection-string');

//     // Extract the connection information from the Heroku environment variable
//     const { host, database, user, password } = parse(process.env.DATABASE_URL);

//     // Set standard environment variables
//     process.env.PGHOST = host;
//     process.env.PGDATABASE = database;
//     process.env.PGUSERNAME = user;
//     process.env.PGPASSWORD = password;
//   }
// };
// User section: Create and Get...Need to update and delete

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  occupation: string;
  age: number;
  about: string;
  image: string;
};

type UserWithPasswordHash = User & { passwordHash: string };

export async function getUserByUsername(username: string) {
  const [user] = await sql<[{ id: number } | undefined]>`
  SELECT id FROM users WHERE username = ${username}`;

  return user && camelcaseKeys(user);
}

export async function getUserWithPasswordHashByUsername(username: string) {
  const [user] = await sql<[UserWithPasswordHash | undefined]>`
    SELECT
      id,
      username,
      password_hash
    FROM
      users
    WHERE
      username = ${username}`;

  return user && camelcaseKeys(user);
}

export async function createUser(
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  passwordHash: string,
  occupation: string,
  age: number,
  about: string,
  image: string,
) {
  const [user] = await sql<[User]>`
  INSERT INTO users
  (first_name, last_name, username, email,password_hash, occupation, age, about, image )
  VALUES
  (${firstName}, ${lastName}, ${username},  ${email}, ${passwordHash}, ${occupation}, ${age},  ${about}, ${image})
  RETURNING
  id,
  username
  `;
  return camelcaseKeys(user);
}

export async function getUserById(id: number) {
  const [user] = await sql<[User | undefined]>`
  SELECT
    id,
    username,
    first_name,
    last_name,
    image
  FROM
    users
  WHERE
    id = ${id}`;

  return user && camelcaseKeys(user);
}

// Creating Session section

type Session = {
  id: number;
  token: string;
  username: string;
  first_name: string;
  last_name: string;
  user_id: number;
};

export async function createSession(token: string, userId: number) {
  const [session] = await sql<[Session]>`
  INSERT INTO sessions
    (token, user_id)
  VALUES
    (${token}, ${userId})
  RETURNING
    id,
    token


  `;

  await deleteExpiredSessions();

  return camelcaseKeys(session);
}

export async function deleteSessionsByToken(token: string) {
  const [session] = await sql<[Session | undefined]>`
  DELETE FROM
    sessions
  WHERE
    token = ${token}
  RETURNING *
  `;
  return session && camelcaseKeys(session);
}

export async function deleteExpiredSessions() {
  const sessions = await sql<Session[]>`
    DELETE FROM
      sessions
    WHERE
      expiry_timestamp < NOW()
    RETURNING *
  `;
  return sessions.map((session) => camelcaseKeys(session));
}

export async function getValidSessionsByToken(token: string | undefined) {
  if (!token) return undefined;
  const [session] = await sql<[Session | undefined]>`
  SELECT
    *
  FROM
    sessions
  WHERE
    token = ${token} AND
    expiry_timestamp > now()
  `;
  await deleteExpiredSessions();

  return session && camelcaseKeys(session);
}

export async function getUserByValidSessionToken(token: string | undefined) {
  if (!token) return undefined;
  const [user] = await sql<[User | undefined]>`
    SELECT
      users.id,
      users.username,
      users.first_name,
      users.last_name,
      users.email,
      users.occupation,
      users.age,
      users.about,
      users.image
    FROM
      users,
      sessions

    WHERE
      sessions.token = ${token} AND
      sessions.user_id = users.id AND
      sessions.expiry_timestamp > now()
  `;
  return user && camelcaseKeys(user);
}

// Creating the individual restaurant to enter into the database

export type Restaurant = {
  id: number;
  name: string;
  address: string;
  type: string;
  url: string;
};

export async function createRestaurant(
  name: string,
  address: string,
  type: string,
  url: string,
) {
  const [restaurant] = await sql<[Restaurant]>`
  INSERT INTO restaurant
  (name, address, type, url )
  VALUES
  (${name}, ${address}, ${type},  ${url})
  RETURNING
  name,
  type
  `;
  return camelcaseKeys(restaurant);
}

// To get the individual restaurant by Id

export async function getRestaurantById(id: number) {
  const [restaurant] = await sql<[Restaurant | undefined]>`
  SELECT
    name,
    type
  FROM
    restaurant
  WHERE
    id = ${id}`;

  return restaurant && camelcaseKeys(restaurant);
}

// Delete Restaurants from database

export async function deleteRestaurantById(id: number) {
  const [restaurant] = await sql<[Restaurant | undefined]>`
  DELETE FROM
    restaurant
  WHERE
    id = ${id}
  RETURNING *
  `;
  return restaurant && camelcaseKeys(restaurant);
}

// Create the suggestion list description

export type SuggestionList = {
  id: number;
  userId: string;
  description: string;
};

export async function createSuggestionList(
  user_id: number,
  description: string,
) {
  const [suggestionList] = await sql<[SuggestionList]>`
  INSERT INTO suggestion_list
  ( user_id, description)
  VALUES
  ( ${user_id}, ${description})
  RETURNING
  *

  `;
  return camelcaseKeys(suggestionList);
}

// Getting the suggestion list description by Id

export async function getSuggestionListDescriptionId(id: number) {
  const [suggestionList] = await sql<[SuggestionList | undefined]>`
  SELECT
    description
  FROM
    suggestion_list
  WHERE
    id = ${id}`;

  return suggestionList && camelcaseKeys(suggestionList);
}

// To retrieve all the suggestion list descriptions

export async function getAllSuggestionListDescriptions() {
  const suggestionList = await sql<SuggestionList[]>`
  SELECT * from suggestion_list;
  `;
  return suggestionList.map((suggestion) => camelcaseKeys(suggestion));
}

// To retrieve all restaurants entered in the database

export async function getAllRestaurants() {
  const restaurants = await sql<Restaurant[]>`
  SELECT * from restaurant;
  `;
  return restaurants.map((singleRestaurant) => camelcaseKeys(singleRestaurant));
}

// Create the suggestion list with restaurants with the description and with the restaurant

export type ListWithRestaurants = {
  id: number;
  suggestionListId: number;
  restaurantId: number;
};

export async function createSuggestionListWithRestaurants(
  suggestionListId: number,
  restaurantId: number,
) {
  const [listWithRestaurants] = await sql<[ListWithRestaurants]>`
  INSERT INTO suggestion_list_restaurants
    (suggestion_list_id, restaurant_id)
  VALUES
    (${suggestionListId}, ${restaurantId})
  RETURNING
  *
  `;
  return camelcaseKeys(listWithRestaurants);
}

// Get suggestion list with restaurants

export type List = string;

export async function getSuggestionListWithRestaurantsListId(
  suggestionListDescription: string,
) {
  const listWithRestaurants = await sql<List[]>`
  SELECT
    restaurant.name
  FROM
    suggestion_list,
    restaurant,
    suggestion_list_restaurants
  WHERE
  suggestion_list.description = ${suggestionListDescription}
  AND
  suggestion_list_restaurants.suggestion_list_id = suggestion_list.id
  AND
  suggestion_list_restaurants.restaurant_id= restaurant.id
    `;

  return listWithRestaurants.map((listWithRestaurant) =>
    camelcaseKeys(listWithRestaurant),
  );
}

export type GetAllUsersLists = {
  id: number;
  username: string;
  description: string;
  image: string;
};
export async function getAllUsersLists() {
  const allUsersLists = await sql<GetAllUsersLists[]>`
  SELECT
    *
  FROM
    users,
    suggestion_list
  WHERE
    users.image = users.image
    AND
    suggestion_list.user_id = users.id
    AND
    suggestion_list.description = suggestion_list.description
`;
  return allUsersLists.map((allLists) => camelcaseKeys(allLists));
}

export type GetSingleTourByDescription = {
  name: string;
  type: string;
  username: string;
  image: string;
  description: string;
};
export async function getSingleTourByDescription(id: number) {
  const singleRestaurantListByUser = await sql<GetSingleTourByDescription[]>`
  SELECT
   restaurant.name,
   restaurant.type,
   restaurant.url,
   users.username,
   users.image,
   suggestion_list.description
FROM
  restaurant,
  users,
  suggestion_list,
  suggestion_list_restaurants
Where
 restaurant.id = suggestion_list_restaurants.restaurant_id
AND
 suggestion_list.id = suggestion_list_restaurants.suggestion_list_id
AND
 suggestion_list.user_id = users.id
AND
suggestion_list.id = ${id}
`;

  return singleRestaurantListByUser.map((singleList) =>
    camelcaseKeys(singleList),
  );
}
