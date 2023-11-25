import { BB } from '../index.js';

export const getNotice = async (apiData) => {
  return await BB.get('/inform/notice', apiData);
};

export const getColumn = async (apiData) => {
  return await BB.get('/inform/notice', apiData);
};
