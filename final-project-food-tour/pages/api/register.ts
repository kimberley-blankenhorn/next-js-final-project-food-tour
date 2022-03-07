import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { createUser } from '../../util/database';

export default async function registerHandler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method === 'POST') {
    console.log(request.body);
    const passwordHash = await bcrypt.hash(request.body.password, 12);

    const user = await createUser(
      request.body.firstName,
      request.body.lastName,
      request.body.email,
      request.body.username,
      request.body.occupation,
      request.body.age,
      request.body.image,
      request.body.about,
      passwordHash,
    );
    response.status(201).json({ user: user });
    return;
  }
  response.status(405).json({ error: [{ message: 'Method not supported' }] });
}
