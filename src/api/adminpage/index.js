import { BB } from '../index.js';

export const getAdminData = async (apiData) => {
  return await BB.get('/admin', apiData);
};

/**
 * 유저 등급 변경
 * @param {Number} apiData.user_id
 * @param {Number} apiData.user_grade
 */
export const patchAdminGrade = async (apiData) => {
  return await BB.patch('/admin/grade', apiData);
};

/**
 * 유저 삭제
 * @param {Number} apiData.user_id
 */
export const deleteAdminUser = async (apiData) => {
  return await BB.delete('/admin/userDelete', apiData);
};

/**
 * 물품 삭제
 * @param {Number} apiData.product_id
 */
export const deleteAdminProduct = async (apiData) => {
  return await BB.delete('/admin/productDelete', apiData);
};

/**
 * 재능 삭제
 * @param {Number} apiData.ability_id
 */
export const deleteAdminAbility = async (apiData) => {
  return await BB.delete('/admin/abilityDelete', apiData);
};
