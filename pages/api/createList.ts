import { NextApiRequest, NextApiResponse } from 'next';
import {
  createSuggestionListWithRestaurants,
  ListWithRestaurants,
} from '../../util/database';

type CompleteListRequestBody = {
  suggestionListId: number;
  restaurantId: number;
};

type CreateNextApiRequest = Omit<NextApiRequest, 'body'> & {
  body: CompleteListRequestBody;
};

export type CreateCompleteListResponseBody =
  | { errors: { message: string }[] }
  | { listWithRestaurants: ListWithRestaurants };

export default async function createCompleteListHandler(
  request: CreateNextApiRequest,
  response: NextApiResponse<CreateCompleteListResponseBody>,
) {
  if (request.method === 'POST') {
    console.log(request.body);
    const completeList = await createSuggestionListWithRestaurants(
      request.body.suggestionListId,
      request.body.restaurantId,
    );
    console.log('checking the list', completeList);

    response.status(201).json({ listWithRestaurants: completeList });
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
