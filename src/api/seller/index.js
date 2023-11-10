import { BB } from '../index.js';

export const getSellerPage = async (apiData) => {
  return await BB.get('/seller', apiData);
};

export const getSellerFollowers = async (apiData) => {
  return await BB.get('/seller/follower', apiData);
};

export const getSellerReviews = async (apiData) => {
  return await BB.get('/seller/sellerReview', apiData);
};

/**
 * 판매자 팔로우
 * @param {Number} apiData.following_id
 */
export const patchSellFollow = async (apiData) => {
  return await BB.patch('/seller/follow', apiData);
};
