/* eslint-disable import/no-unresolved */
import { NextApiRequest, NextApiResponse } from 'next';
// eslint-disable-next-line import/no-unresolved
import { getAllUsersLists } from '../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log('request is', req.query);
  const displayAllLists = await getAllUsersLists;
  // (req.query);
  console.log('returned data', displayAllLists);
  return res.status(200).json({ listAll: displayAllLists });
}
