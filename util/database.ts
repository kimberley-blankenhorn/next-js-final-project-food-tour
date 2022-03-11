import camelcaseKeys from 'camelcase-keys';
import { config } from 'dotenv-safe';
import postgres from 'postgres';

config();
// CONNECT TO POSTGRESQL
const sql = postgres();
export async function readUsers() {
  const users = await sql`
SELECT * FROM users
`;
  return users;
}

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
    last_name
  FROM
    users
  WHERE
    id = ${id}`;

  return user && camelcaseKeys(user);
}

type Session = {
  id: number;
  token: string;
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

export async function getValidSessionsByToken(token: string) {
  const [session] = await sql<[Session | undefined]>`
  SELECT
    *
  FROM
    sessions
  WHERE
    token = ${token}
  `;
  await deleteExpiredSessions();

  return session && camelcaseKeys(session);
}
