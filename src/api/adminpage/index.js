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

/**
 * 공지사항 등록
 * @param {Number} apiData.notice_title
 * @param {Number} apiData.notice_content
 */
export const postNotice = async (apiData) => {
  return await BB.post('/admin/notice', apiData);
};

/**
 * 공지 수정
 * @param {Number} apiData.notice_id
 * @param {Number} apiData.notice_title
 * @param {Number} apiData.notice_content
 */
export const patchNotice = async (apiData) => {
  return await BB.patch('/admin/updateNotice', apiData);
};

/**
 * 공지 삭제
 * @param {Number} apiData.notice_id
 */
export const deleteNotice = async (apiData) => {
  return await BB.delete('/admin/deleteNotice', apiData);
};

/**
 * 칼럼 등록
 * @param {Number} apiData.column_title
 * @param {Number} apiData.column_content
 * @param {Number} apiData.column_url
 */
export const postColumn = async (apiData) => {
  return await BB.post('/admin/column', apiData);
};

/**
 * 공지 수정
 * @param {Number} apiData.column_id
 * @param {Number} apiData.column_title
 * @param {Number} apiData.column_content
 */
export const patchColumn = async (apiData) => {
  return await BB.patch('/admin/updateColumn', apiData);
};

/**
 * 칼럼 삭제
 * @param {Number} apiData.column_id
 */
export const deleteColumn = async (apiData) => {
  return await BB.delete('/admin/deleteColumn', apiData);
};
