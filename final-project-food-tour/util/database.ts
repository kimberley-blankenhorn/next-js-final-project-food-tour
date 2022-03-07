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

type User = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  occupation: string;
  age: number;
  image: string;
  about: string;
};

export async function createUser(
  firstName: string,
  lastName: string,
  email: string,
  username: string,
  passwordHash: string,
  occupation: string,
  age: number,
  image: string,
  about: string,
) {
  const [user] = await sql<[User]>`
  INSERT INTO users
  (first_name, last_name, email, username, password_hash, occupation, age, image, about)
  VALUES
  (${firstName}, ${lastName}, ${email}, ${username}, ${passwordHash}, ${occupation}, ${age}, ${image}, ${about})
  RETURNING
  id,
  first_name,
  last_name,
  username,
  email,
  occupation,
  age,
  image,
  about
  `;
  return camelcaseKeys(user);
}
