import { BB } from '../index.js';

/**
 * 물품 거래 리스트 요청
 * @param {Number} apiData.phone
 */
export const getTradeProduct = async (apiData) => {
  return await BB.get('/trade/product', apiData);
};

/**
 * 재능 거래 리스트 요청
 * @param {Number} apiData.phone
 */
export const getTradeAbility = async (apiData) => {
  return await BB.get('/trade/ability', apiData);
};

/**
 * 물품 거래 상세내역 요청
 * @param {Number} apiData.product_id 조회할 물품의 id
 */
export const getTradeDetailProduct = async (apiData) => {
  return await BB.get('/trade/detailProduct', apiData);
};

/**
 * 재능 거래 상세내역 요청
 * @param {Number} apiData.ability_id 조회할 재능의 id
 */
export const getTradeDetailAbility = async (apiData) => {
  return await BB.get('/trade/detailAbility', apiData);
};
