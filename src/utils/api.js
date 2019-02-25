import axios from 'axios';
import { Toast } from 'antd-mobile';
import urlList from './urlList';
import enums from './enums';
// import storage from "./storage";

const whiteList = [];

const http = axios.create({
  timeout: 60000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

/**
 * 响应拦截器
 */
http.interceptors.response.use(res => {
  const curUrl = res.config.url.replace(urlList.headerUrl, '');
  // 白名单不用考虑code
  if (
    (res.status === enums.networkStatus.successCode &&
      res.data.code === enums.networkStatus.successCode) ||
    whiteList.includes(curUrl)
  ) {
    return res.data;
  }
  if (res.status !== enums.networkStatus.successCode) {
    return Promise.reject(res);
  }
  if (res.data.code === enums.networkStatus.unauthCode) {
    // 无权限
    return Promise.reject(res.data);
  }
  if (res.data.code === enums.networkStatus.unloginCode) {
    // 未登录
    return Promise.reject(res.data);
  }
  return Promise.reject(res.data);
});

// api 调用
function apiAxios(method, url, params) {
  const headerUrl = /^\/v2\/h5/.test(url)
    ? urlList.diggerHeaderUrl
    : urlList.headerUrl;
  return http({
    method,
    url: headerUrl + url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
  })
    .then(res => res)
    .catch(err => {
      Toast.hide();
      Toast.info(err.message);
      return Promise.reject(err);
    });
}

export default {
  get: (url, params) => apiAxios('GET', url, params),
  post: (url, params) => apiAxios('POST', url, params),
  put: (url, params) => apiAxios('PUT', url, params),
  delete: (url, params) => apiAxios('DELETE', url, params),
};
