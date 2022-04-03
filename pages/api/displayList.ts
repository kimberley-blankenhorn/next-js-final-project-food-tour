import { NextApiRequest, NextApiResponse } from 'next';
import { getSuggestionListWithRestaurantsListId } from '../../util/database';

// }
export type SingleList = { name: string };

type GetList = { selectedItem: string };

type GetNextApiRequest = Omit<NextApiRequest, 'body'> & {
  query: GetList;
};

export type GetGetListResponseBody =
  | { errors: { message: string }[] }
  | { list: GetList };

export default async function handler(
  req: GetNextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    console.log('request is', req.query);
    const displayList = await getSuggestionListWithRestaurantsListId(
      req.query.selectedItem,
    );
    console.log('see what the selected item is', req.query.selectedItem);
    console.log('returned data', displayList);

    return res.status(200).json({ list: displayList });
  }
}
