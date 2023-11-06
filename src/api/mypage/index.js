import { BB } from '../index.js';

export const getMypage = async (apiData) => {
  return await BB.get('/mypage', apiData);
};

export const getMySell = async (apiData) => {
  return await BB.get('/mypage/sell', apiData);
};
