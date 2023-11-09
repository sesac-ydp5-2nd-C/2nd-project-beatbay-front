import { BB } from '../index.js';

/**
 * 물품 거래 리스트 요청
 * @param {Number} apiData.orderMethod  0 : createdAt(최신순), 1 : like(인기순), 2 : price(낮은가격순) 3 : price(높은가격순)
 */
export const getTradeProduct = async (apiData) => {
  return await BB.get('/trade/product', apiData);
};

/**
 * 재능 거래 리스트 요청
 * @param {Number} apiData.ability_id 조회할 재능의 id
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

/**
 * 물품 거래 삭제
 * @param {Number} apiData.files
 */
export const deleteTradeProduct = async (apiData) => {
  return await BB.delete('/trade/deleteProduct', apiData);
};

/**
 * 재능 거래 삭제
 * @param {Number} apiData.files
 */
export const deleteTradeAbility = async (apiData) => {
  return await BB.delete('/trade/deleteAbility', apiData);
};

/**
 * 물품 좋아요
 * @param {Number} apiData.product_id 조회할 재능의 id
 */
export const patchTradeLikeProduct = async (apiData) => {
  return await BB.patch('/trade/LikeProduct', apiData);
};

/**
 * 재능 좋아요
 * @param {Number} apiData.ability_id 조회할 재능의 id
 */
export const patchTradeLikeAbility = async (apiData) => {
  return await BB.patch('/trade/LikeAbility', apiData);
};

/**
 * 거래 상태 수정
 * @param {Number} apiData.type
 * @param {Number} apiData.id
 * @param {Number} apiData.update
 */
export const patchTradeUpdateStatus = async (apiData) => {
  return await BB.patch('/trade/updateStatus', apiData);
};

/**
 * 거래 등록
 * @param {Number} apiData.files
 */
export const postTradeSell = async (apiData) => {
  const headers = {};
  headers['Content-Type'] = 'multipart/form-data';
  return await BB.post('/trade/sell', apiData, { headers });
};

/**
 * 거래 수정
 * @param {Number} apiData.files
 */
export const patchTradeSell = async (apiData) => {
  const headers = {};
  headers['Content-Type'] = 'multipart/form-data';
  return await BB.patch('/trade/update', apiData, { headers });
};
