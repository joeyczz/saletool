/*
 * action 类型
 */
export const ACTIVE_STORE = 'ACTIVE_STORE';
export const USER_INFO = 'USER_INFO';

/**
 * 设置当前门店
 * @param {*} item 
 */
export const setActiveStore = store => ({ type: ACTIVE_STORE, store });

export const setUserInfo = user => ({ type: USER_INFO, user})
