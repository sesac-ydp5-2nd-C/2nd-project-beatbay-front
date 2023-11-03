import { BB } from '../index.js';

export const postUserCertification = async (apiData) => {
  const temp = {
    email: 'dsadas@naver.com',
  };
  return await BB.post('/user/certification', apiData);
};
