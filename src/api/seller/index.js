import { BB } from '../index.js';

export const getSellerPage = async (apiData) => {
  return await BB.get('/seller', apiData);
};
