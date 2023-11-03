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
//아이디 확인 나중에
// export const postUserIdExists = async (apiData) => {
//   const temp = {
//     userId: '?????',
//   };
//   return await BB.post('/user/isExists', apiData);
// };

export const postUserLogin = async (apiData) => {
  const temp = {
    userId: 'ethan',
    userPw: 'asdfqwerty1!',
  };
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
  const temp = {
    userId: 'ethan',
    userPw: 'asdfqwerty1!',
    emailCode: '111111',
  };
  return await BB.put('/user/findPass', apiData);
};
