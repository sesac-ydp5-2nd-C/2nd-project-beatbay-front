import { BB } from '../index.js';

export const getSellerPage = async (apiData) => {
  return await BB.get('/seller', apiData);
};

/**
 * 판매자 팔로우
 * @param {Number} apiData.following_id
 */
export const patchSellFollow = async (apiData) => {
  return await BB.patch('/sell/follow', apiData);
};
