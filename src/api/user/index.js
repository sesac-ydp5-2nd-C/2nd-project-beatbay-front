import { BB } from '../index.js';

export const postUserCertification = async (apiData) => {
  const temp = {
    email: 'dsadas@naver.com',
  };
  return await BB.post('/user/certification', apiData);
};

export const postUserEmailCodeCheck = async (apiData) => {
  const temp = {
    emailCode: '111111',
  };
  return await BB.post('/user/emailCodeCheck', apiData);
};

export const postUserSignup = async (apiData) => {
  const temp = {
    userId: 'ethan',
    userPw: 'asdfqwerty1!',
    userNickname: 'ray',
    authCode: '111111',
  };
  return await BB.post('/user/signup', apiData);
};

//이메일(아이디) 중복 확인
export const postUserIdExists = async (apiData) => {
  const temp = {
    userId: 'jck1004ee@naver.com',
  };
  return await BB.post('/user/idExists', apiData);
};

//로그인
export const postUserLogin = async (apiData) => {
  return await BB.post('/user/login', apiData);
};

/**
 * 전체 유저 조회
 * @param {Number} apiData.user
 */
export const getUser = async (apiData) => {
  return await BB.get('/user', apiData);
};

/**
 * 로그아웃
 * @param {Number} apiData.logout
 */
export const getUserLogout = async (apiData) => {
  return await BB.get('/user/logout', apiData);
};

export const putUserFindPass = async (apiData) => {
  return await BB.put('/user/findPass', apiData);
};
