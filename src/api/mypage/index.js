import { BB } from '../index.js';

export const getMypage = async (apiData) => {
  return await BB.get('/mypage', apiData);
};

export const getMySell = async (apiData) => {
  return await BB.get('/mypage/sell', apiData);
};

export const getMyPurchase = async (apiData) => {
  return await BB.get('/mypage/buy', apiData);
};

export const getMyLikes = async (apiData) => {
  return await BB.get('/mypage/like', apiData);
};
