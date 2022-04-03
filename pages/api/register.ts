import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { createSerializedRegisterSessionTokenCookie } from '../../util/cookies';
import {
  createSession,
  createUser,
  getUserByUsername,
} from '../../util/database';

export default async function registerHandler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method === 'POST') {
    if (
      typeof request.body.username !== 'string' ||
      !request.body.username ||
      typeof request.body.password !== 'string' ||
      !request.body.password
    ) {
      response.status(400).json({
        errors: [
          {
            message: 'Username or password not provided',
          },
        ],
      });
      return;
    }

    if (await getUserByUsername(request.body.username)) {
      response.status(409).json({
        errors: [
          {
            message: 'Username unavailable',
          },
        ],
      });
      return;
    }

    const passwordHash = await bcrypt.hash(request.body.password, 12);

    const user = await createUser(
      request.body.firstName,
      request.body.lastName,
      request.body.username,
      request.body.email,
      passwordHash,
      request.body.occupation,
      request.body.age,
      request.body.about,
      request.body.image,
    );

    // Create a unique token
    const token = crypto.randomBytes(64).toString('base64');

    // Create the session
    const session = await createSession(token, user.id);

    // Serialize the cookie
    const serializedCookie = await createSerializedRegisterSessionTokenCookie(
      session.token,
    );

    // Add the cookie to the header response

    response
      .status(201)
      .setHeader('Set-Cookie', serializedCookie)
      .json({ user: user });
    return;
  }

  response.status(405).json({ errors: [{ message: 'Method not supported' }] });
}
