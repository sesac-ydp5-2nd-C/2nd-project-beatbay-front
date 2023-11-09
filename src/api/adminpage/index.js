import { BB } from '../index.js';

export const getAdminData = async (apiData) => {
  return await BB.get('/admin', apiData);
};
