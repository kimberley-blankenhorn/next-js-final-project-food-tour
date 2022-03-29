import { NextApiRequest, NextApiResponse } from 'next';
import { createSuggestionList, SuggestionList } from '../../util/database';

type SuggestionListDescriptionRequestBody = {
  userId: number;
  description: string;
};

type CreateNextApiRequest = Omit<NextApiRequest, 'body'> & {
  body: SuggestionListDescriptionRequestBody;
};

export type CreateSuggestionListDescriptionResponseBody =
  | { errors: { message: string }[] }
  | { suggestionList: SuggestionList };

export default async function createSuggestionListDescriptionHandler(
  request: CreateNextApiRequest,
  response: NextApiResponse<CreateSuggestionListDescriptionResponseBody>,
) {
  if (request.method === 'POST') {
    console.log(request.body);
    const suggestionList = await createSuggestionList(
      request.body.userId,
      request.body.description,
    );
    console.log('checking the suggestionList', suggestionList);
    response.status(201).json({ suggestionList: suggestionList });
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
