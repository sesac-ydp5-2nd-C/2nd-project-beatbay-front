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

export const getMyReviews = async (apiData) => {
  return await BB.get('/mypage/mainReview', apiData);
};

export const getMyFollowers = async (apiData) => {
  return await BB.get('/mypage/mainFollower', apiData);
};

export const getMyFollowing = async (apiData) => {
  return await BB.get('/mypage/mainFollowing', apiData);
};

//회원정보 가져오기
export const getUserProfile = async (apiData) => {
  return await BB.get('/userProfile', apiData);
};

//회원정보 수정
export const patchUpdateUser = async (apiData) => {
  return await BB.patch('/updateUser', apiData);
};

//회원정보 수정
export const DeleteDeleteUser = async (apiData) => {
  return await BB.delete('/deleteUser', apiData);
};
