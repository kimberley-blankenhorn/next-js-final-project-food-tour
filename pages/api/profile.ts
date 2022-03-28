import { NextApiRequest, NextApiResponse } from 'next';
import { getUserByValidSessionToken } from '../../util/database';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method === 'GET') {
    const token = request.cookies.sessionToken;

    if (!token) {
      response.status(400).json({
        errors: [
          {
            message: 'No session token passed',
          },
        ],
      });
      return;
    }

    const user = await getUserByValidSessionToken(token);
    console.log(user);

    if (user) {
      response.status(200).json({
        user: user,
      });
      return;
    }

    response.status(404).json({
      errors: [
        {
          message: 'user not found or session token not valid',
        },
      ],
    });
    return;
  }

  response.status(405).json({
    errors: [
      {
        message: 'Method not supported, try GET instead',
      },
    ],
  });
}
