import { BB } from '../index.js';

/**
 * 물품 거래 리스트 요청
 * @param {Number} apiData.phone
 */
export const getTradeProduct = async (apiData) => {
  return await BB.get('/trade/product', apiData);
};
