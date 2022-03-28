import { NextApiRequest, NextApiResponse } from 'next';
import { createRestaurant, Restaurant } from '../../util/database';

type RestaurantRequestBody = {
  name: string;
  address: string;
  type: string;
  url: string;
};

type CreateNextApiRequest = Omit<NextApiRequest, 'body'> & {
  body: RestaurantRequestBody;
};

export type CreateRestaurantResponseBody =
  | { errors: { message: string }[] }
  | { restaurant: Restaurant };

export default async function createRestaurantHandler(
  request: CreateNextApiRequest,
  response: NextApiResponse<CreateRestaurantResponseBody>,
) {
  if (request.method === 'POST') {
    const restaurant = await createRestaurant(
      request.body.name,
      request.body.address,
      request.body.type,
      request.body.url,
    );

    response.status(201).json({ restaurant: restaurant });
    return;
  }

  response.status(405).json({
    errors: [
      {
        message: 'Method not supported, try POST instead',
      },
    ],
  });
}
