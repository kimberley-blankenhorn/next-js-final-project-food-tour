// import { NextApiRequest, NextApiResponse } from 'next';
// import {
//   getSuggestionListWithRestaurantsListId,
//   ListWithRestaurants,
// } from '../../util/database';

import { NextApiRequest, NextApiResponse } from 'next';
import { getSuggestionListWithRestaurantsListId } from '../../util/database';

// type ShowListRequestBody = {
//   suggestionListDescription: string;
// };

// type CreateNextApiRequest = Omit<NextApiRequest, 'body'> & {
//   body: ShowListRequestBody;
// };

// export type CreateShowListResponseBody =
//   | { errors: { message: string }[] }
//   | { displayList: string[] };

// export default async function createShowListHandler(
//   request: CreateNextApiRequest,
//   response: NextApiResponse<CreateShowListResponseBody>,
// ) {
//   if (request.method === 'GET') {
//     console.log('testing', request.query);

//     console.log('checking the list', displayList);

//     response.status(201).json({ displayList });
//     return;
//   }

//   response.status(405).json({
//     errors: [
//       {
//         message: 'Method not supported, try POST instead',
//       },
//     ],
//   });
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log('request is', req.query);
  const displayList = await getSuggestionListWithRestaurantsListId(
    req.query.selectedItem,
  );
  console.log('returned data', displayList);
  return res.status(200).json({ list: displayList });
}
